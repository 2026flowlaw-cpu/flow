"use client";

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import useSWR from 'swr';
import styles from './page.module.css';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PressDetailPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = React.use(paramsPromise);
  const articleId = params.id;
  
  const { data: articles, error } = useSWR('/api/press-releases', fetcher);
  
  const article = articles?.find((item: any) => item.id.toString() === articleId);
  const isLoading = !articles && !error;

  if (isLoading) return <div className={styles.loading}>기사를 불러오는 중입니다...</div>;
  if (!article) return <div className={styles.loading}>기사를 찾을 수 없습니다.</div>;

  return (
    <div className={styles.page}>
      {/* 🚀 [슈퍼 어드민 커스텀 메타] 저장된 SEO/GEO 코드를 헤드에 주입 */}
      {article.custom_meta && (
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
