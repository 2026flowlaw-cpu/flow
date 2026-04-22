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

  if (isLoading) return <div className={styles.loading}>칼럼을 읽어오는 중...</div>;
  if (!column) return <div className={styles.error}>칼럼을 찾을 수 없습니다.</div>;

  return (
    <div className={styles.page}>
      <Header />
      
      <main className="container">
        <article className={styles.article}>
          <div className={styles.header}>
            <span className={styles.category}>{column.category}</span>
            <h1 className={styles.title}>{column.title}</h1>
            <div className={styles.meta}>
              <span className={styles.author}>{column.author_name}</span>
              <span className={styles.divider}>|</span>
              <span className={styles.date}>{new Date(column.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          <div className={styles.featuredImage}>
            <Image 
              src={column.image_url || '/images/philosophy_bg.png'} 
              alt={column.title}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className={styles.content}>
            {column.content.split('\n').map((line: string, i: number) => (
              <p key={i}>{line || '\u00A0'}</p>
            ))}
          </div>

          <div className={styles.actions}>
            <button onClick={() => router.push('/columns')} className={styles.listBtn}>목록으로</button>
            <button onClick={() => router.push('/consult')} className={styles.consultBtn}>법률 상담 예약하기</button>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
