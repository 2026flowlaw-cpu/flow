"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

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
            <p>법무법인 플로우의 전문적인 법률 지식과 조언을 나누어 드립니다.</p>
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
            <div style={{ padding: '100px 0', textAlign: 'center', fontSize: '20px' }}>플로우의 가치 있는 지식들을 불러오는 중입니다...</div>
          ) : columns.length > 0 ? (
            <div className={styles.grid}>
              {columns.map((col) => (
                <Link href={`/columns/${col.id}`} key={col.id} className={styles.card}>
                  <div className={styles.cardImage}>
                    <Image 
                      src={col.image_url || '/images/philosophy_bg.png'} 
                      alt={col.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div className={styles.cardOverlay}>
                       <span>칼럼 읽기</span>
                    </div>
                  </div>
                  <div className={styles.cardContent}>
                    <span className={styles.cardCategory}>{col.category}</span>
                    <h3 className={styles.cardTitle}>{col.title}</h3>
                    <p className={styles.cardDescription}>{col.summary || '상세 내용을 확인하세요.'}</p>
                    <div className={styles.cardFooter}>
                      <span className={styles.lawyerName}>by {col.author_name}</span>
                      <span className={styles.cardDate}>{new Date(col.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ padding: '100px 0', textAlign: 'center' }}>
              <p style={{ fontSize: '20px', color: '#666' }}>아직 등록된 법률칼럼이 없습니다.</p>
              <p style={{ marginTop: '10px' }}>전문가들의 조언이 곧 준비될 예정입니다.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
