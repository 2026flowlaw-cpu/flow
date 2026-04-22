"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function ColumnDetailPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const params = React.use(paramsPromise);
  const colId = params.id;

  const [column, setColumn] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/columns');
        const data = await res.json();
        const found = data.find((c: any) => c.id.toString() === colId.toString());
        setColumn(found);
      } catch (err) {
        console.error('Failed to load column:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [colId]);

  if (isLoading) return <div className={styles.loading}>일신의 전문 칼럼을 불러오는 중입니다...</div>;
  if (!column) return <div className={styles.error}>칼럼을 찾을 수 없습니다.</div>;

  return (
    <div className={styles.page}>
      <Header />
      
      <main>
        {/* Cinematic Hero */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.category}>{column.category}</span>
            <h1 className={styles.title}>{column.title}</h1>
            <div className={styles.meta}>
              <div className={styles.author}>{column.author_name} 변호사</div>
              <span>|</span>
              <div className={styles.date}>{new Date(column.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>
          </div>
          <Image 
            src={column.image_url || '/images/philosophy_bg.png'} 
            alt="Hero Background" 
            fill 
            className={styles.heroImg}
            priority
          />
          <div className={styles.heroOverlay}></div>
        </section>

        {/* Floating Article Content */}
        <article className={styles.article}>
          <div className={styles.content}>
            {column.content.split('\n').map((line: string, i: number) => (
              <p key={i}>{line || '\u00A0'}</p>
            ))}
          </div>

          <footer className={styles.footerArea}>
            <div className={styles.consultBox}>
              <h3 className={styles.consultTitle}>본 칼럼의 내용과 관련하여 궁금한 점이 있으신가요?</h3>
              <p>일신의 전문 변호사팀이 명쾌한 해답을 드립니다.</p>
            </div>
            
            <div className={styles.actions}>
              <button onClick={() => router.push('/columns')} className={styles.listBtn}>목록으로</button>
              <button onClick={() => router.push('/consult')} className={styles.consultBtn}>1:1 무료 상담 신청 ✉️</button>
            </div>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}
