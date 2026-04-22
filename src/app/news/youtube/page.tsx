"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header/Header';
import RealFooter from '@/components/Footer/Footer';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function YouTubePage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/youtube');
        const data = await res.json();
        // Defensive check: ensure data is an array
        setVideos(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load videos:', err);
        setVideos([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Group videos by categories (defensive check added)
  const groupedVideos = (Array.isArray(videos) ? videos : []).reduce((acc: any, video: any) => {
    const cat = video.category || '하자소송';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(video);
    return acc;
  }, {});

  const categories = Object.keys(groupedVideos);

  return (
    <div className={styles.page}>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>플로우 Tube</h1>
            <div className={styles.heroButtons}>
              <Link href="/practice/construction-dispute" className={styles.heroBtnOutline}>전문분과 확인하기</Link>
              <Link href="/consult" className={styles.heroBtnOutline}>문의하기</Link>
            </div>
          </div>
          <Image 
            src="/images/philosophy_bg.png" 
            alt="Hero Background" 
            fill 
            className={styles.heroImg}
            priority
          />
          <div className={styles.heroOverlay}></div>
        </section>

        {/* Dynamic Sections from DB */}
        {isLoading ? (
          <div style={{ padding: '100px 0', textAlign: 'center', fontSize: '20px' }}>영상을 불러오는 중입니다...</div>
        ) : categories.length > 0 ? (
          categories.map((cat, idx) => (
            <section 
              key={cat} 
              className={`${styles.section} ${groupedVideos[cat][0]?.theme === 'dark' ? styles.darkTheme : ''}`}
            >
              <div className="container">
                <h2 className={styles.sectionHeading}>{cat}</h2>
                <div className={styles.grid}>
                  {groupedVideos[cat].map((video: any) => (
                    <a 
                      key={video.id} 
                      href={`https://www.youtube.com/watch?v=${video.youtube_id}`} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.videoCard}
                    >
                      <div className={styles.thumbnailArea}>
                        <Image 
                          src={`https://img.youtube.com/vi/${video.youtube_id}/maxresdefault.jpg`} 
                          alt={video.title}
                          fill
                          className={styles.thumbImg}
                        />
                        <div className={styles.playIcon}>
                          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                            <circle cx="30" cy="30" r="30" fill="white" fillOpacity="0.8"/>
                            <path d="M40 30L25 38.6603L25 21.3397L40 30Z" fill="#0A1B39"/>
                          </svg>
                        </div>
                      </div>
                      <div className={styles.videoMeta}>
                        <h3 className={styles.videoTitle}>{video.title}</h3>
                        <p className={styles.videoDesc}>{video.description || '플로우 법률 사무소 영상 콘텐츠'}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          ))
        ) : (
          <div style={{ padding: '100px 0', textAlign: 'center' }}>
            <p style={{ fontSize: '20px', color: '#666' }}>아직 등록된 영상이 없습니다.</p>
            <p style={{ marginTop: '10px' }}>관리자 페이지에서 영상을 등록해주세요.</p>
          </div>
        )}

        {/* Partner Logos */}
        <section className={styles.partnerSection}>
          <div className={`${styles.partnerContainer} container`}>
            <div className={styles.partnerTrack}>
               <Image src="/images/logo_court.png" alt="대법원" width={60} height={60} />
               <Image src="/images/logo_police.png" alt="경찰청" width={60} height={60} />
               <Image src="/images/logo_prosecutor.png" alt="검찰청" width={60} height={60} />
               <Image src="/images/logo_court.png" alt="대법원" width={60} height={60} />
               <Image src="/images/logo_police.png" alt="경찰청" width={60} height={60} />
               <Image src="/images/logo_prosecutor.png" alt="검찰청" width={60} height={60} />
               <Image src="/images/logo_court.png" alt="대법원" width={60} height={60} />
            </div>
          </div>
        </section>
      </main>

      <RealFooter />
    </div>
  );
}
