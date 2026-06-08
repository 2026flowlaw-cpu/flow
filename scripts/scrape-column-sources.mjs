import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const inputPath = path.join(root, 'reports', 'column-source-links.json');
const outputPath = path.join(root, 'reports', 'column-source-scrape.json');
const concurrency = Number(process.env.COLUMN_SCRAPE_CONCURRENCY || 4);
const limit = Number(process.env.COLUMN_SCRAPE_LIMIT || 0);
const timeoutMs = Number(process.env.COLUMN_SCRAPE_TIMEOUT_MS || 14000);

function decodeHtml(value = '') {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
}

function normalizeText(value = '') {
  return decodeHtml(value)
    .replace(/\u200b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripHtml(html = '') {
  return normalizeText(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
      .replace(/<(br|p|div|section|article|h[1-6]|li|tr|figure|blockquote)\b[^>]*>/gi, '\n')
      .replace(/<[^>]+>/g, ' ')
  );
}

function matchMeta(html, key) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const patterns = [
    new RegExp(`<meta[^>]+(?:property|name)=["']${escapedKey}["'][^>]+content=["']([^"']*)["'][^>]*>`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name)=["']${escapedKey}["'][^>]*>`, 'i'),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return normalizeText(match[1]);
  }

  return '';
}

function matchTitle(html) {
  return normalizeText(
    matchMeta(html, 'og:title') ||
      html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ||
      ''
  ).replace(/\s*:\s*네이버\s*블로그\s*$/i, '');
}

function toFetchUrl(source) {
  if (source.source_kind !== 'naver_blog') return source.url;

  const match = source.url.match(/blog\.naver\.com\/([^/?#]+)\/(\d+)/);
  if (!match) return source.url;

  return `https://m.blog.naver.com/${match[1]}/${match[2]}`;
}

function extractImages(html) {
  const values = [
    ...Array.from(html.matchAll(/data-lazy-src=["']([^"']+)["']/gi), (match) => match[1]),
    ...Array.from(html.matchAll(/src=["']([^"']+)["']/gi), (match) => match[1]),
    matchMeta(html, 'og:image'),
  ];

  const imageUrls = [];
  const seen = new Set();

  for (const rawValue of values) {
    const value = decodeHtml(rawValue || '').replace(/\?type=w80_blur$/, '?type=w800');
    if (!/^https?:\/\//.test(value)) continue;
    if (!/\.(png|jpe?g|webp)|pstatic\.net|imweb\.me|cdn/i.test(value)) continue;
    if (seen.has(value)) continue;

    seen.add(value);
    imageUrls.push(value);
  }

  return imageUrls.slice(0, 5);
}

function extractKeywords(source, title, description, text) {
  const haystack = `${source.source_case} ${title} ${description} ${text}`.replace(/\s+/g, '');
  const candidates = [
    source.source_case,
    source.category_hint,
    '변호사',
    '법률상담',
    '소송',
    '손해배상',
    '계약해제',
    '계약취소',
    '내용증명',
    '가처분',
    '형사처벌',
    '경찰조사',
    '합의',
    '증거자료',
  ];

  return [...new Set(candidates.filter((keyword) => keyword && haystack.includes(keyword.replace(/\s+/g, ''))))].slice(0, 12);
}

async function fetchHtml(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 AppleWebKit/537.36 Chrome/125 Safari/537.36',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.8',
      },
    });

    const html = await response.text();

    return {
      ok: response.ok,
      status: response.status,
      finalUrl: response.url,
      html,
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function scrapeSource(source) {
  const fetchUrl = toFetchUrl(source);

  try {
    const response = await fetchHtml(fetchUrl);
    const title = matchTitle(response.html);
    const description = normalizeText(
      matchMeta(response.html, 'og:description') || matchMeta(response.html, 'description')
    );
    const text = stripHtml(response.html);
    const contentExcerpt = normalizeText(
      text
        .replace(/^.*?본문\s+바로가기\s*/i, '')
        .replace(/이웃추가\s+본문\s+기타\s+기능\s*/i, '')
    ).slice(0, 1200);
    const images = extractImages(response.html);

    return {
      ...source,
      fetch_url: fetchUrl,
      fetch_status: response.status,
      fetch_ok: response.ok,
      final_url: response.finalUrl,
      source_title: title || source.source_case,
      source_description: description,
      source_keywords: extractKeywords(source, title, description, contentExcerpt),
      source_image_count: images.length,
      source_images: images,
      content_excerpt: contentExcerpt,
      scrape_error: '',
    };
  } catch (error) {
    return {
      ...source,
      fetch_url: fetchUrl,
      fetch_status: 0,
      fetch_ok: false,
      final_url: '',
      source_title: source.source_case,
      source_description: '',
      source_keywords: extractKeywords(source, source.source_case, '', ''),
      source_image_count: 0,
      source_images: [],
      content_excerpt: '',
      scrape_error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function runPool(items) {
  const results = new Array(items.length);
  let cursor = 0;

  async function worker() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await scrapeSource(items[index]);
      const status = results[index].fetch_ok ? 'ok' : `fail:${results[index].fetch_status || results[index].scrape_error}`;
      console.log(`[${index + 1}/${items.length}] ${status} ${items[index].source_case}`);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  return results;
}

const sourcePayload = JSON.parse(await readFile(inputPath, 'utf8'));
const items = limit > 0 ? sourcePayload.sources.slice(0, limit) : sourcePayload.sources;
const scrapedSources = await runPool(items);

const payload = {
  generated_at: new Date().toISOString(),
  input_path: inputPath,
  total_sources: sourcePayload.total_sources,
  scraped_sources: scrapedSources.length,
  fetch_ok: scrapedSources.filter((source) => source.fetch_ok).length,
  fetch_failed: scrapedSources.filter((source) => !source.fetch_ok).length,
  sources: scrapedSources,
};

await writeFile(outputPath, JSON.stringify(payload, null, 2), 'utf8');
console.log(`Wrote ${outputPath}`);
