import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const quality = Number(process.env.WEBP_QUALITY || 82);
const sourceExtensions = new Set(['.png', '.jpg', '.jpeg']);
const skippedDirs = new Set(['reports', 'seo-preview']);

function isTopLevelPublicImage(relativePath) {
  return path.dirname(relativePath) === 'public';
}

function isManagedPublicImage(relativePath) {
  return (
    relativePath.startsWith('public/images/') ||
    relativePath.startsWith('public/seo/') ||
    relativePath.startsWith('public/verdicts/') ||
    isTopLevelPublicImage(relativePath)
  );
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);
    const relativePath = path.relative(root, absolutePath);

    if (entry.isDirectory()) {
      if (directory === publicDir && skippedDirs.has(entry.name)) continue;
      files.push(...await walk(absolutePath));
      continue;
    }

    if (!entry.isFile()) continue;
    if (!sourceExtensions.has(path.extname(entry.name).toLowerCase())) continue;
    if (!isManagedPublicImage(relativePath)) continue;

    files.push(absolutePath);
  }

  return files;
}

function webpPathFor(sourcePath) {
  return sourcePath.replace(/\.(png|jpe?g)$/i, '.webp');
}

async function shouldSkip(sourcePath, outputPath) {
  if (process.argv.includes('--force')) return false;

  try {
    const [sourceInfo, outputInfo] = await Promise.all([
      stat(sourcePath),
      stat(outputPath),
    ]);

    return outputInfo.size > 0 && outputInfo.mtimeMs >= sourceInfo.mtimeMs;
  } catch {
    return false;
  }
}

const sourceFiles = await walk(publicDir);
let converted = 0;
let skipped = 0;
let originalBytes = 0;
let webpBytes = 0;

for (const sourcePath of sourceFiles) {
  const outputPath = webpPathFor(sourcePath);

  if (await shouldSkip(sourcePath, outputPath)) {
    skipped += 1;
    continue;
  }

  const sourceInfo = await stat(sourcePath);

  await sharp(sourcePath)
    .rotate()
    .webp({ quality, effort: 5, smartSubsample: true })
    .toFile(outputPath);

  const outputInfo = await stat(outputPath);

  converted += 1;
  originalBytes += sourceInfo.size;
  webpBytes += outputInfo.size;
}

const savedBytes = originalBytes - webpBytes;
const savedPercent = originalBytes > 0 ? Math.round((savedBytes / originalBytes) * 100) : 0;

console.log(`Converted ${converted} image(s), skipped ${skipped}.`);
console.log(`Source: ${(originalBytes / 1024 / 1024).toFixed(1)} MB`);
console.log(`WebP: ${(webpBytes / 1024 / 1024).toFixed(1)} MB`);
console.log(`Saved: ${(savedBytes / 1024 / 1024).toFixed(1)} MB (${savedPercent}%)`);
