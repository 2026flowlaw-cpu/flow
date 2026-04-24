import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

// 🚀 [SEO 최적화] 메타데이터 생성
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  
  if (!supabase) return { title: '언론보도 | 법무법인 플로우' };

  const { data: article } = await supabase
    .from('press_releases')
    .select('title, press_name, content, custom_meta')
    .eq('id', id)
    .single();

  if (!article) return { title: '기사를 찾을 수 없습니다 | 법무법인 플로우' };

  const isPlainTextKeywords = article.custom_meta && !article.custom_meta.includes('<');

  return {
    title: `${article.title} | ${article.press_name} - 법무법인 플로우`,
    description: article.content ? article.content.replace(/<[^>]*>?/gm, '').slice(0, 160) : '법무법인 플로우 언론보도입니다.',
    keywords: isPlainTextKeywords ? article.custom_meta : undefined,
  };
}

export default async function PressDetailPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = await paramsPromise;
  const articleId = params.id;
  
  if (!supabase) return <div className={styles.loading}>DB Connection Required.</div>;

  const { data: article, error } = await supabase
    .from('press_releases')
    .select('*')
    .eq('id', articleId)
    .single();

  if (error || !article) return <div className={styles.loading}>기사를 찾을 수 없습니다.</div>;

  return (
    <div className={styles.page}>
      {/* 🚀 [슈퍼 어드민 커스텀 메타] HTML/스크립트 코드가 있을 때만 바디에 렌더링 */}
      {article.custom_meta && article.custom_meta.includes('<') && (
        <div dangerouslySetInnerHTML={{ __html: article.custom_meta }} style={{ display: 'none' }} />
      )}
      
      <main className={styles.articleContainer}>
        <header className={styles.header}>
          <span className={styles.pressName}>{article.press_name}</span>
          <h1 className={styles.title}>{article.title}</h1>
          <div className={styles.meta}>
            <span>발행일: {article.publish_date}</span>
          </div>
        </header>

        {article.image_url && (
          <div style={{ marginBottom: '40px', textAlign: 'center' }}>
            <img 
              src={article.image_url} 
              alt={article.title} 
              style={{ maxWidth: '100%', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} 
            />
          </div>
        )}

        {/* 📰 기사 본문 영역 */}
        <div 
          className={styles.mainContent}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* 🔗 하단 원문 링크 섹션 */}
        {article.external_url && (
          <div className={styles.sourceLink}>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '15px' }}>본 기사는 언론사 원문에서도 확인하실 수 있습니다.</p>
            <a 
              href={article.external_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.linkBtn}
            >
              기사 원문보기 ➔
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
