import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const draftsDir = path.join(root, 'seo-drafts', 'columns');
const outputPath = path.join(root, 'reports', 'column-seo-audit.json');
const minTextLength = Number(process.env.COLUMN_AUDIT_MIN_TEXT_LENGTH || 2800);

function extractCodeBlock(markdown, heading) {
  const escapedHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return markdown.match(new RegExp(`${escapedHeading}\\s*\\n\`\`\`html\\n([\\s\\S]*?)\\n\`\`\``))?.[1]?.trim() || '';
}

function frontmatterValue(markdown, key) {
  return markdown.match(new RegExp(`^${key}:\\s*["']?([^"']*)["']?\\s*$`, 'm'))?.[1]?.trim() || '';
}

function visibleTextLength(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim().length;
}

function auditDraft(fileName, markdown) {
  const content = extractCodeBlock(markdown, '### content');
  const faq = extractCodeBlock(markdown, '## FAQ JSON-LD Draft');
  const title = frontmatterValue(markdown, 'title');
  const summary = frontmatterValue(markdown, 'summary');
  const keywords = frontmatterValue(markdown, 'keywords');
  const imageSrcs = Array.from(content.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi), (match) => match[1]);
  const imageAlts = Array.from(content.matchAll(/<img[^>]+alt=["']([^"']+)["'][^>]*>/gi), (match) => match[1]);
  const h2Count = (content.match(/<h2\b/gi) || []).length;
  const h3Count = (content.match(/<h3\b/gi) || []).length;
  const textLength = visibleTextLength(content);

  const issues = [];
  if (title.length < 18 || title.length > 80) issues.push('title_length');
  if (summary.length < 80 || summary.length > 220) issues.push('summary_length');
  if (keywords.split(',').map((item) => item.trim()).filter(Boolean).length < 8) issues.push('keyword_count');
  if (textLength < minTextLength) issues.push('content_length');
  if (h2Count < 5) issues.push('h2_count');
  if (h3Count < 3) issues.push('h3_count');
  if (imageSrcs.length === 0) issues.push('image_missing');
  if (imageSrcs.some((src) => !src.endsWith('.webp'))) issues.push('non_webp_image');
  if (imageAlts.length !== imageSrcs.length || imageAlts.some((alt) => alt.trim().length < 8)) issues.push('alt_text');
  if (!faq.includes('"@type": "FAQPage"')) issues.push('faq_json_ld');

  return {
    file: fileName,
    title,
    summary_length: summary.length,
    keyword_count: keywords.split(',').map((item) => item.trim()).filter(Boolean).length,
    text_length: textLength,
    h2_count: h2Count,
    h3_count: h3Count,
    image_count: imageSrcs.length,
    issues,
    passed: issues.length === 0,
  };
}

const files = (await readdir(draftsDir)).filter((fileName) => fileName.endsWith('.md')).sort();
const results = [];

for (const fileName of files) {
  const markdown = await readFile(path.join(draftsDir, fileName), 'utf8');
  results.push(auditDraft(fileName, markdown));
}

const payload = {
  generated_at: new Date().toISOString(),
  total_drafts: results.length,
  passed: results.filter((result) => result.passed).length,
  failed: results.filter((result) => !result.passed).length,
  issue_summary: results.reduce((summary, result) => {
    for (const issue of result.issues) {
      summary[issue] = (summary[issue] || 0) + 1;
    }
    return summary;
  }, {}),
  results,
};

await writeFile(outputPath, JSON.stringify(payload, null, 2), 'utf8');

console.log(`Audited ${payload.total_drafts} draft(s).`);
console.log(`Passed: ${payload.passed}`);
console.log(`Failed: ${payload.failed}`);
console.log(`Wrote ${outputPath}`);
