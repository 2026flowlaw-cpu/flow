import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const scrapePath = path.join(root, 'reports', 'column-source-scrape.json');
const draftsDir = path.join(root, 'seo-drafts', 'columns');
const articlesDir = path.join(root, 'public', 'seo', 'articles');
const reportPath = path.join(root, 'reports', 'column-source-image-import.json');
const imageLimit = Number(process.env.COLUMN_SOURCE_IMAGE_LIMIT || 5);
const concurrency = Number(process.env.COLUMN_SOURCE_IMAGE_CONCURRENCY || 5);
const quality = Number(process.env.COLUMN_SOURCE_IMAGE_QUALITY || 82);
const timeoutMs = Number(process.env.COLUMN_SOURCE_IMAGE_TIMEOUT_MS || 14000);

function normalizeUrl(url = '') {
  const match = url.match(/blog\.naver\.com\/([^/?#]+)\/(\d+)/);
  if (match) return `https://blog.naver.com/${match[1]}/${match[2]}`;
  return url.trim();
}

function normalizeSpaces(value = '') {
  return String(value).replace(/\s+/g, ' ').trim();
}

function htmlEscape(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function yamlEscape(value = '') {
  return String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function frontmatterValue(markdown, key) {
  return markdown.match(new RegExp(`^${key}:\\s*["']?([^"']*)["']?\\s*$`, 'm'))?.[1]?.trim() || '';
}

function replaceAttribute(tag, attribute, value) {
  const escapedValue = htmlEscape(value);
  const pattern = new RegExp(`\\s${attribute}=["'][^"']*["']`, 'i');
  if (pattern.test(tag)) return tag.replace(pattern, ` ${attribute}="${escapedValue}"`);
  return tag.replace(/<img/i, `<img ${attribute}="${escapedValue}"`);
}

function replaceNumericAttribute(tag, attribute, value) {
  const pattern = new RegExp(`\\s${attribute}=["'][^"']*["']`, 'i');
  if (pattern.test(tag)) return tag.replace(pattern, ` ${attribute}="${value}"`);
  return tag.replace(/<img/i, `<img ${attribute}="${value}"`);
}

function safeImageUrl(url) {
  return url
    .replace(/\?type=w80_blur$/i, '?type=w800')
    .replace(/&amp;/g, '&')
    .trim();
}

async function fetchBuffer(url, referer) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 AppleWebKit/537.36 Chrome/125 Safari/537.36',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.8',
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        Referer: referer || 'https://m.blog.naver.com/',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return Buffer.from(await response.arrayBuffer());
  } finally {
    clearTimeout(timeout);
  }
}

async function readDraftsBySourceUrl() {
  const drafts = new Map();
  const files = (await readdir(draftsDir)).filter((fileName) => fileName.endsWith('.md'));

  for (const fileName of files) {
    const filePath = path.join(draftsDir, fileName);
    const markdown = await readFile(filePath, 'utf8');
    const sourceUrl = normalizeUrl(frontmatterValue(markdown, 'source_url'));
    const slug = frontmatterValue(markdown, 'slug') || fileName.replace(/^\d+-/, '').replace(/\.md$/, '');

    if (sourceUrl) {
      drafts.set(sourceUrl, {
        fileName,
        filePath,
        markdown,
        slug,
      });
    }
  }

  return drafts;
}

async function downloadImagesForSource(source, draft) {
  const imageUrls = [...new Set((source.source_images || []).map(safeImageUrl))]
    .filter((url) => /^https?:\/\//.test(url))
    .slice(0, imageLimit);
  const outputDir = path.join(articlesDir, draft.slug);
  const imported = [];

  await mkdir(outputDir, { recursive: true });

  for (const [index, url] of imageUrls.entries()) {
    try {
      const inputBuffer = await fetchBuffer(url, source.fetch_url || source.url);
      const image = sharp(inputBuffer).rotate();
      const metadata = await image.metadata();

      if (!metadata.width || !metadata.height || metadata.width < 260 || metadata.height < 160) {
        throw new Error(`Image too small: ${metadata.width || 0}x${metadata.height || 0}`);
      }

      const outputName = `image-${String(index + 1).padStart(2, '0')}.webp`;
      const outputPath = path.join(outputDir, outputName);

      await image
        .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
        .webp({ quality, effort: 5, smartSubsample: true })
        .toFile(outputPath);

      const outputMeta = await sharp(outputPath).metadata();
      const outputInfo = await stat(outputPath);

      imported.push({
        src: `/seo/articles/${draft.slug}/${outputName}`,
        alt: `${normalizeSpaces(source.source_case)} 관련 법률칼럼 이미지 ${index + 1}`,
        width: outputMeta.width || metadata.width,
        height: outputMeta.height || metadata.height,
        source_url: url,
        bytes: outputInfo.size,
      });
    } catch (error) {
      imported.push({
        src: '',
        alt: '',
        width: 0,
        height: 0,
        source_url: url,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return imported.filter((image) => image.src);
}

function updateImagesBlock(markdown, images) {
  const yamlImages = images
    .map((image) => `  - src: "${image.src}"\n    alt: "${yamlEscape(image.alt)}"`)
    .join('\n');
  const replacement = `images:\n${yamlImages}`;

  if (/^images:\n(?:  - [\s\S]*?)(?=\n[A-Za-z0-9_]+:|\n---)/m.test(markdown)) {
    return markdown.replace(/^images:\n(?:  - [\s\S]*?)(?=\n[A-Za-z0-9_]+:|\n---)/m, replacement);
  }

  return markdown.replace(/^status:/m, `${replacement}\nstatus:`);
}

function updateContentImages(markdown, images) {
  if (images.length === 0) return markdown;

  let imageIndex = 0;

  return markdown.replace(/<img\b[^>]*>/gi, (tag) => {
    const image = images[imageIndex % images.length];
    imageIndex += 1;

    let nextTag = replaceAttribute(tag, 'src', image.src);
    nextTag = replaceAttribute(nextTag, 'alt', image.alt);
    nextTag = replaceNumericAttribute(nextTag, 'width', image.width || 1200);
    nextTag = replaceNumericAttribute(nextTag, 'height', image.height || 800);

    return nextTag;
  });
}

async function importSourceImages(source, draft) {
  const images = await downloadImagesForSource(source, draft);

  if (images.length === 0) {
    return {
      index: source.index,
      source_case: source.source_case,
      url: source.url,
      slug: draft.slug,
      imported: 0,
      updated_draft: false,
    };
  }

  let markdown = updateImagesBlock(draft.markdown, images);
  markdown = updateContentImages(markdown, images);
  await writeFile(draft.filePath, markdown, 'utf8');

  return {
    index: source.index,
    source_case: source.source_case,
    url: source.url,
    slug: draft.slug,
    imported: images.length,
    updated_draft: true,
    images: images.map(({ src, source_url, bytes }) => ({ src, source_url, bytes })),
  };
}

async function runPool(items, handler) {
  const results = new Array(items.length);
  let cursor = 0;

  async function worker() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await handler(items[index], index);
      console.log(
        `[${index + 1}/${items.length}] imported ${results[index].imported} ${items[index].source.source_case}`
      );
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  return results;
}

const scrapePayload = JSON.parse(await readFile(scrapePath, 'utf8'));
const draftsBySourceUrl = await readDraftsBySourceUrl();
const jobs = scrapePayload.sources
  .map((source) => ({
    source,
    draft: draftsBySourceUrl.get(normalizeUrl(source.url)),
  }))
  .filter((job) => job.draft && (job.source.source_images || []).length > 0);

const results = await runPool(jobs, ({ source, draft }) => importSourceImages(source, draft));
const report = {
  generated_at: new Date().toISOString(),
  image_limit: imageLimit,
  total_sources: scrapePayload.sources.length,
  sources_with_drafts_and_images: jobs.length,
  updated_drafts: results.filter((result) => result.updated_draft).length,
  imported_images: results.reduce((sum, result) => sum + result.imported, 0),
  results,
};

await writeFile(reportPath, JSON.stringify(report, null, 2), 'utf8');
console.log(`Imported ${report.imported_images} source image(s).`);
console.log(`Updated ${report.updated_drafts} draft(s).`);
console.log(`Wrote ${reportPath}`);
