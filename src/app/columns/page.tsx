"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../success-stories/page.module.css'; // Reusing styles

export default function ColumnsPage() {
  const [columns, setColumns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/columns');
        const data = await res.json();
        setColumns(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load columns:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className={styles.page}>
      <Header />
      
      <main>
        {/* Banner */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>법률칼럼</h1>
            <p>법무법인 일신의 전문적인 법률 지식과 조언을 나누어 드립니다.</p>
          </div>
          <Image 
            src="/images/philosophy_bg.png" 
            alt="Law Banner" 
            fill 
            className={styles.heroImg}
            priority
          />
        </section>

        <div className="container">
          {isLoading ? (
            <div style={{ padding: '100px 0', textAlign: 'center' }}>칼럼을 불러오는 중입니다...</div>
          ) : columns.length > 0 ? (
            <div className={styles.grid}>
              {columns.map((col) => (
                <Link href={`/columns/${col.id}`} key={col.id} className={styles.card}>
                  <div className={styles.cardImage}>
                    <Image 
                      src={col.image_url || '/images/success_apartment.png'} 
                      alt={col.title}
                      fill
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardTop}>
                      <span className={styles.cardCategory}>{col.category}</span>
                      <span className={styles.cardDate}>{new Date(col.created_at).toLocaleDateString()}</span>
                    </div>
                    <h3 className={styles.cardTitle}>{col.title}</h3>
                    <p className={styles.cardDescription}>{col.summary || '상세 내용을 확인하세요.'}</p>
                    <div className={styles.cardFooter}>
                      <span className={styles.lawyerName}>{col.author_name}</span>
                      <span className={styles.moreBtn}>자세히 보기 →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ padding: '100px 0', textAlign: 'center' }}>아직 등록된 법률칼럼이 없습니다.</div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
