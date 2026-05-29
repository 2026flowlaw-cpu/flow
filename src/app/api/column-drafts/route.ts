import { readdir, readFile } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_COLUMN_CATEGORY, normalizeColumnCategory } from '@/lib/columnCategories';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type DraftFields = Record<string, string>;

const draftsDirectory = path.join(process.cwd(), 'seo-drafts', 'columns');

function cleanYamlValue(value: string) {
  const trimmed = value.trim();
  return trimmed.replace(/^["']|["']$/g, '');
}

function parseFrontmatter(markdown: string) {
  const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---/);
  const fields: DraftFields = {};

  if (!frontmatterMatch) return fields;

  for (const line of frontmatterMatch[1].split('\n')) {
    const fieldMatch = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!fieldMatch) continue;

    const [, key, rawValue] = fieldMatch;
    if (!rawValue.trim()) continue;
    fields[key] = cleanYamlValue(rawValue);
  }

  const firstImageMatch = frontmatterMatch[1].match(/-\s+src:\s*["']([^"']+)["']/);
  if (firstImageMatch) {
    fields.image_url = firstImageMatch[1];
  }

  return fields;
}

function extractCodeBlock(markdown: string, heading: string) {
  const escapedHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const blockMatch = markdown.match(new RegExp(`${escapedHeading}\\s*\\n\`\`\`html\\n([\\s\\S]*?)\\n\`\`\``));
  return blockMatch?.[1].trim() || '';
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

async function readDraftFile(fileName: string) {
  const filePath = path.join(draftsDirectory, fileName);
  const markdown = await readFile(filePath, 'utf8');
  const fields = parseFrontmatter(markdown);
  const id = fileName.replace(/^\d+-/, '').replace(/\.md$/, '');
  const content = extractCodeBlock(markdown, '### content');
  const faqJsonLd = extractCodeBlock(markdown, '## FAQ JSON-LD Draft');

  return {
    id,
    slug: fields.slug || id,
    title: fields.title || '제목 없는 SEO 초안',
    summary: fields.summary || '',
    category: normalizeColumnCategory(fields.category || DEFAULT_COLUMN_CATEGORY),
    author_name: fields.author_name || '대표변호사',
    image_url: fields.image_url || '',
    custom_meta: fields.keywords || '',
    keywords: fields.keywords || '',
    status: fields.status || 'draft',
    created_at: fields.created_at || '',
    preview_url: `/seo-preview/${id}.html`,
    content,
    faq_json_ld: faqJsonLd,
  };
}

async function getDrafts() {
  const files = await readdir(draftsDirectory);
  const markdownFiles = files
    .filter((fileName) => fileName.endsWith('.md'))
    .sort((a, b) => a.localeCompare(b));

  return Promise.all(markdownFiles.map(readDraftFile));
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const draftId = searchParams.get('draft');
    const drafts = await getDrafts();

    if (draftId) {
      const draft = drafts.find((item) => item.id === draftId || item.slug === draftId);

      if (!draft) {
        return NextResponse.json({ error: 'Draft not found' }, { status: 404 });
      }

      return NextResponse.json(draft);
    }

    return NextResponse.json(
      drafts.map((draft) => ({
        id: draft.id,
        slug: draft.slug,
        title: draft.title,
        summary: draft.summary,
        category: draft.category,
        author_name: draft.author_name,
        image_url: draft.image_url,
        custom_meta: draft.custom_meta,
        keywords: draft.keywords,
        status: draft.status,
        created_at: draft.created_at,
        preview_url: draft.preview_url,
      }))
    );
  } catch (error: unknown) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
