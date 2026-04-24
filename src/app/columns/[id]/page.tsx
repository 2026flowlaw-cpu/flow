import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';
import styles from './page.module.css';

// 🚀 [SEO 최적화] 각 칼럼 페이지마다 고유한 제목과 설명을 생성합니다.
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  
  if (!supabase) return { title: '법률칼럼 | 법무법인 플로우' };

  const { data: column } = await supabase
    .from('legal_columns')
    .select('title, summary, custom_meta')
    .eq('id', id)
    .single();

  if (!column) return { title: '칼럼을 찾을 수 없습니다 | 법무법인 플로우' };

  const isPlainTextKeywords = column.custom_meta && !column.custom_meta.includes('<');

  return {
    title: `${column.title} | 법무법인 플로우 법률칼럼`,
    description: column.summary || '법무법인 플로우의 전문적인 법률 지식과 조언을 만나보세요.',
    keywords: isPlainTextKeywords ? column.custom_meta : undefined,
    openGraph: {
      title: column.title,
      description: column.summary,
      type: 'article',
      siteName: '법무법인 플로우',
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
        <Header />
        <div className={styles.errorContainer}>
          <p className={styles.error}>칼럼을 찾을 수 없습니다.</p>
          <Link href="/columns" className={styles.listBtn}>목록으로 돌아가기</Link>
        </div>
        <Footer />
      </div>
    );
  }

  // 🧠 [구조화 데이터] 구글 검색 결과에서 리치 스니펫(Rich Snippet)을 노출하기 위한 JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": column.title,
    "description": column.summary,
    "image": column.image_url || 'https://ilshin-law.com/images/default_column.png',
    "author": {
      "@type": "Person",
      "name": `${column.author_name} 변호사`
    },
    "publisher": {
      "@type": "Organization",
      "name": "법무법인 플로우",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ilshin-law.com/logo.png"
      }
    },
    "datePublished": column.created_at
  };

  return (
    <div className={styles.page}>
      {/* JSON-LD 삽입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 🚀 [슈퍼 어드민 커스텀 메타] HTML/스크립트 코드가 있을 때만 렌더링 */}
      {column.custom_meta && column.custom_meta.includes('<') && (
        <div dangerouslySetInnerHTML={{ __html: column.custom_meta }} style={{ display: 'none' }} />
      )}
      
      <main>
        {/* Cinematic Hero */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.category}>{column.category}</span>
            <h1 className={styles.title}>{column.title}</h1>
            <div className={styles.meta}>
              <div className={styles.author}>{column.author_name} 변호사</div>
              <span>|</span>
              <div className={styles.date}>
                {new Date(column.created_at).toLocaleDateString('ko-KR', { 
                  year: 'numeric', month: 'long', day: 'numeric' 
                })}
              </div>
            </div>
          </div>
          <Image 
            src={column.image_url || '/images/philosophy_bg.png'} 
            alt={column.title} 
            fill 
            className={styles.heroImg}
            priority
          />
          <div className={styles.heroOverlay}></div>
        </section>

        {/* Floating Article Content */}
        <article className={styles.article}>
          <div 
            className={`${styles.content} ql-editor`}
            dangerouslySetInnerHTML={{ __html: column.content }} 
          />

          <footer className={styles.footerArea}>
            <div className={styles.consultBox}>
              <h3 className={styles.consultTitle}>본 칼럼의 내용과 관련하여 궁금한 점이 있으신가요?</h3>
              <p>플로우의 전문 변호사팀이 명쾌한 해답을 드립니다.</p>
            </div>
            
            <div className={styles.actions}>
              <Link href="/columns" className={styles.listBtn}>목록으로</Link>
              <Link href="/consult" className={styles.consultBtn}>1:1 무료 상담 신청 ✉️</Link>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
}
