import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { preferWebpImageUrl, preferWebpInHtml } from '@/lib/imageOptimization';
import { Metadata } from 'next';
import styles from './page.module.css';
import ColumnScrollGuard from '@/components/ColumnScrollGuard/ColumnScrollGuard';

type StructuredData = Record<string, unknown>;
type ArticleHeading = {
  id: string;
  text: string;
};

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://flowlaw.kr').replace(/\/$/, '');

function absoluteUrl(url?: string | null) {
  const optimizedUrl = preferWebpImageUrl(url, siteUrl);

  if (!optimizedUrl) return `${siteUrl}/images/philosophy_bg.webp`;
  if (optimizedUrl.startsWith('http://') || optimizedUrl.startsWith('https://')) return optimizedUrl;
  return `${siteUrl}${optimizedUrl.startsWith('/') ? optimizedUrl : `/${optimizedUrl}`}`;
}

function extractJsonLdScripts(html: string) {
  const jsonLdItems: StructuredData[] = [];
  const scriptPattern = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

  for (const match of html.matchAll(scriptPattern)) {
    try {
      const parsed = JSON.parse(match[1].trim()) as StructuredData | StructuredData[];
      if (Array.isArray(parsed)) {
        jsonLdItems.push(...parsed);
      } else {
        jsonLdItems.push(parsed);
      }
    } catch {
      // Ignore malformed draft JSON-LD instead of breaking the article page.
    }
  }

  return jsonLdItems;
}

function parseColumnSeo(customMeta?: string | null) {
  const raw = customMeta?.trim();
  const fallback = { keywords: undefined as string | undefined, headHtml: '', jsonLdItems: [] as StructuredData[] };

  if (!raw) return fallback;

  if (raw.startsWith('{')) {
    try {
      const parsed = JSON.parse(raw) as {
        keywords?: string;
        faqJsonLd?: string;
        headHtml?: string;
        jsonLd?: StructuredData | StructuredData[];
      };
      const inlineJsonLd = parsed.jsonLd ? (Array.isArray(parsed.jsonLd) ? parsed.jsonLd : [parsed.jsonLd]) : [];

      return {
        keywords: parsed.keywords,
        headHtml: parsed.headHtml || '',
        jsonLdItems: [
          ...inlineJsonLd,
          ...(parsed.faqJsonLd ? extractJsonLdScripts(parsed.faqJsonLd) : []),
        ],
      };
    } catch {
      return fallback;
    }
  }

  if (raw.includes('<')) {
    return {
      keywords: undefined,
      headHtml: raw,
      jsonLdItems: extractJsonLdScripts(raw),
    };
  }

  return {
    keywords: raw,
    headHtml: '',
    jsonLdItems: [],
  };
}

function stripHtml(value: string) {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractArticleHeadings(html?: string | null) {
  if (!html) return [];

  return Array.from(html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)).map((match, index) => ({
    id: `section-${index + 1}`,
    text: stripHtml(match[1]),
  })).filter((heading) => heading.text);
}

function addHeadingIds(html: string, headings: ArticleHeading[]) {
  let index = 0;

  return html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (match, attributes, content) => {
    const heading = headings[index];
    index += 1;

    if (!heading || /\sid=["']/.test(attributes)) return match;
    return `<h2${attributes} id="${heading.id}">${content}</h2>`;
  });
}

// 🚀 [SEO 최적화] 각 칼럼 페이지마다 고유한 제목과 설명을 생성합니다.
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  
  if (!supabase) return { title: '법률칼럼 | 법무법인 플로우' };

  const { data: column } = await supabase
    .from('legal_columns')
    .select('title, summary, custom_meta, image_url')
    .eq('id', id)
    .single();

  if (!column) return { title: '칼럼을 찾을 수 없습니다 | 법무법인 플로우' };

  const seoData = parseColumnSeo(column.custom_meta);
  const canonicalUrl = `${siteUrl}/columns/${id}`;

  return {
    title: `${column.title} | 법무법인 플로우 법률칼럼`,
    description: column.summary || '법무법인 플로우의 전문적인 법률 지식과 조언을 만나보세요.',
    keywords: seoData.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: column.title,
      description: column.summary,
      type: 'article',
      siteName: '법무법인 플로우',
      url: canonicalUrl,
      images: [absoluteUrl(column.image_url)],
    },
    twitter: {
      card: 'summary_large_image',
      title: column.title,
      description: column.summary,
      images: [absoluteUrl(column.image_url)],
    }
  };
}

export default async function ColumnDetailPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = await paramsPromise;
  const colId = params.id;

  if (!supabase) {
    return <div className={styles.error}>데이터베이스 연결 설정이 필요합니다.</div>;
  }

  // 🏛️ [서버 사이드 데이터 페칭] 로봇이 즉시 읽을 수 있도록 서버에서 직접 데이터를 가져옵니다.
  const { data: column, error } = await supabase
    .from('legal_columns')
    .select('*')
    .eq('id', colId)
    .single();

  if (error || !column) {
    return (
      <div className={styles.page}>
        <div className={styles.errorContainer}>
          <p className={styles.error}>칼럼을 찾을 수 없습니다.</p>
          <Link href="/columns" className={styles.listBtn}>목록으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  const canonicalUrl = `${siteUrl}/columns/${colId}`;
  const seoData = parseColumnSeo(column.custom_meta);
  const articleHeadings = extractArticleHeadings(column.content);
  const articleContent = preferWebpInHtml(addHeadingIds(column.content || '', articleHeadings), siteUrl);
  const heroImage = preferWebpImageUrl(column.image_url, siteUrl) || '/images/philosophy_bg.webp';

  // 🧠 [구조화 데이터] 구글 검색 결과에서 리치 스니펫(Rich Snippet)을 노출하기 위한 JSON-LD
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalArticle",
    "mainEntityOfPage": canonicalUrl,
    "headline": column.title,
    "description": column.summary,
    "image": absoluteUrl(column.image_url),
    "articleSection": column.category,
    "author": {
      "@type": "Person",
      "name": `${column.author_name} 변호사`
    },
    "publisher": {
      "@type": "Organization",
      "name": "법무법인 플로우",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "datePublished": column.created_at,
    "dateModified": column.updated_at || column.created_at,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "홈",
        "item": siteUrl,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "법률칼럼",
        "item": `${siteUrl}/columns`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": column.title,
        "item": canonicalUrl,
      },
    ],
  };

  const structuredData = [
    articleJsonLd,
    breadcrumbJsonLd,
    ...seoData.jsonLdItems,
  ];

  return (
    <div className={styles.page}>
      <ColumnScrollGuard />

      {/* JSON-LD 삽입 */}
      {structuredData.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
      
      {/* 🚀 [슈퍼 어드민 커스텀 메타] HTML/스크립트 코드가 있을 때만 렌더링 */}
      {seoData.headHtml && (
        <div dangerouslySetInnerHTML={{ __html: seoData.headHtml }} style={{ display: 'none' }} />
      )}
      
      <main className={styles.main}>
        <article className={styles.articleShell} itemScope itemType="https://schema.org/LegalArticle">
          <meta itemProp="datePublished" content={column.created_at} />
          <meta itemProp="dateModified" content={column.updated_at || column.created_at} />
          <header className={styles.hero}>
            <Image
              src={heroImage}
              alt={column.title}
              fill
              className={styles.heroImg}
              priority
              itemProp="image"
            />
            <div className={styles.heroOverlay}></div>
            <div className={styles.heroContent}>
              <nav className={styles.breadcrumb} aria-label="칼럼 경로">
                <Link href="/">홈</Link>
                <span>/</span>
                <Link href="/columns">법률칼럼</Link>
              </nav>
              <p className={styles.category} itemProp="articleSection">{column.category}</p>
              <h1 className={styles.title} itemProp="headline">{column.title}</h1>
              {column.summary && (
                <p className={styles.description} itemProp="description">{column.summary}</p>
              )}
              <dl className={styles.meta}>
                <div>
                  <dt>작성자</dt>
                  <dd itemProp="author" itemScope itemType="https://schema.org/Person">
                    <span itemProp="name">{column.author_name} 변호사</span>
                  </dd>
                </div>
              </dl>
            </div>
          </header>

          <div className={styles.articleLayout}>
            {articleHeadings.length > 0 && (
              <nav className={styles.toc} aria-label="칼럼 목차">
                <strong>목차</strong>
                <ol>
                  {articleHeadings.map((heading) => (
                    <li key={heading.id}>
                      <a href={`#${heading.id}`}>{heading.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <section className={styles.articleCard} aria-label="칼럼 본문">
              <div
                className={`${styles.content} ql-editor`}
                itemProp="articleBody"
                dangerouslySetInnerHTML={{ __html: articleContent }}
              />

              <aside className={styles.consultBox} aria-labelledby="column-consult-title">
                <h2 id="column-consult-title" className={styles.consultTitle}>이 사안과 비슷한 고민이 있으신가요?</h2>
                <p>계약서, 분양자료, 현장 사진을 함께 검토해 계약취소와 손해배상 가능성을 판단해 드립니다.</p>
              </aside>

              <nav className={styles.actions} aria-label="칼럼 관련 이동">
                <Link href="/columns" className={styles.listBtn}>목록으로</Link>
                <Link href="/consult" className={styles.consultBtn}>1:1 상담 신청</Link>
              </nav>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
}
