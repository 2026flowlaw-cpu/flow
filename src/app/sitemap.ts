import type { MetadataRoute } from 'next';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { lawyers } from '@/constants/lawyers';

export const revalidate = 3600;

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://flowlaw.kr').replace(/\/$/, '');
const sitemapBatchSize = 1000;

type SitemapFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;

type SitemapRow = {
  id: number | string;
  created_at?: string | null;
  publish_date?: string | null;
};

type StaticRoute = {
  path: string;
  changeFrequency: SitemapFrequency;
  priority: number;
};

const publicRoutes: StaticRoute[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/about/intro', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/about/greetings', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/about/group', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/about/careers', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/about/location', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/lawyers/profiles', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/practice', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/practice/defect-litigation', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/practice/class-action', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/practice/construction-dispute', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/practice/real-estate-dispute', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/practice/resale-cancellation', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/practice/jeonse-fraud', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/practice/general-civil', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/practice/edu-law', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/practice/criminal-law', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/practice/criminal-law/overview', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/practice/criminal-law/sex-offense', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/practice/criminal-law/dui-traffic', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/practice/criminal-law/drugs', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/practice/criminal-law/voice-phishing', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/practice/criminal-law/construction', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/practice/criminal-law/economic', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/practice/criminal-law/juvenile', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/practice/criminal-law/general', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/columns', changeFrequency: 'daily', priority: 0.85 },
  { path: '/success-stories', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/news/press', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/news/youtube', changeFrequency: 'weekly', priority: 0.65 },
  { path: '/consult', changeFrequency: 'monthly', priority: 0.8 },
];

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });
}

async function fetchRows<T extends SitemapRow>(
  supabase: SupabaseClient,
  table: string,
  selectColumns: string,
  orderColumn: string
) {
  const rows: T[] = [];

  for (let from = 0; ; from += sitemapBatchSize) {
    const to = from + sitemapBatchSize - 1;
    const { data, error } = await supabase
      .from(table)
      .select(selectColumns)
      .order(orderColumn, { ascending: false })
      .range(from, to);

    if (error) {
      console.error(`Failed to load ${table} for sitemap:`, error.message);
      return rows;
    }

    if (!data || data.length === 0) {
      return rows;
    }

    rows.push(...(data as unknown as T[]));

    if (data.length < sitemapBatchSize) {
      return rows;
    }
  }
}

function createEntry(
  path: string,
  changeFrequency: SitemapFrequency,
  priority: number,
  lastModified?: string | Date | null
): MetadataRoute.Sitemap[number] {
  return {
    url: `${siteUrl}${path}`,
    lastModified: lastModified ? new Date(lastModified) : new Date(),
    changeFrequency,
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = publicRoutes.map((route) => (
    createEntry(route.path, route.changeFrequency, route.priority)
  ));

  const lawyerEntries = lawyers.map((lawyer) => (
    createEntry(`/lawyers/profiles/${lawyer.slug}`, 'monthly', 0.65)
  ));

  const supabase = getSupabaseClient();

  if (!supabase) {
    return [...staticEntries, ...lawyerEntries];
  }

  const [columns, successStories, pressReleases] = await Promise.all([
    fetchRows<SitemapRow>(supabase, 'legal_columns', 'id,created_at', 'created_at'),
    fetchRows<SitemapRow>(supabase, 'success_stories', 'id,created_at', 'created_at'),
    fetchRows<SitemapRow>(supabase, 'press_releases', 'id,publish_date', 'publish_date'),
  ]);

  const columnEntries = columns.map((column) => (
    createEntry(`/columns/${column.id}`, 'weekly', 0.75, column.created_at)
  ));

  const successStoryEntries = successStories.map((story) => (
    createEntry(`/success-stories/${story.id}`, 'monthly', 0.65, story.created_at)
  ));

  const pressEntries = pressReleases.map((article) => (
    createEntry(`/news/press/${article.id}`, 'monthly', 0.6, article.publish_date)
  ));

  return [
    ...staticEntries,
    ...lawyerEntries,
    ...columnEntries,
    ...successStoryEntries,
    ...pressEntries,
  ];
}
