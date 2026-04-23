"use client";

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Image from 'next/image';
import useSWR from 'swr';
import styles from './page.module.css';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PublicPressPage() {
  const { data: articles, error } = useSWR('/api/press-releases', fetcher);
  const isLoading = !articles && !error;

  return (
    <div className={styles.page}>
      <Header />
      
      <main>
        {/* Banner */}
        <section className={styles.hero}>
          <div className={styles.heroImg}>
            <Image 
              src="/images/philosophy_bg.png" 
              alt="Press Banner" 
              fill 
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <div className={styles.heroOverlay}></div>
          <div className={styles.heroContent}>
            <h1>언론보도</h1>
            <p>법무법인 플로우의 언론 방송 출연 및 기사 보도 내역을 전해드립니다.</p>
          </div>
        </section>

        <section className="container" style={{ paddingBottom: '100px' }}>
          {isLoading ? (
            <div className={styles.loading}>기사를 불러오는 중입니다...</div>
          ) : articles && articles.length > 0 ? (
            <div className={styles.grid}>
              {articles.map((item: any) => (
                <a 
                  key={item.id} 
                  href={item.external_url || `/news/press/${item.id}`} 
                  target={item.external_url ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className={styles.card}
                >
                  <div className={styles.imageBox}>
                    <Image 
                      src={item.image_url || '/images/hero_bg.png'} 
                      alt={item.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div className={styles.pressLabel}>{item.press_name}</div>
                  </div>
                  <div className={styles.contentBox}>
                    <span className={styles.date}>{item.publish_date}</span>
                    <h3 className={styles.articleTitle}>{item.title}</h3>
                    <span className={styles.moreLink}>기사 원문보기 →</span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>등록된 언론보도가 없습니다.</div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
