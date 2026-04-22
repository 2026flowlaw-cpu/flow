"use client";

import React from 'react';
import Header from '@/components/Header/Header';
import RealFooter from '@/components/Footer/Footer';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const sections = [
  {
    theme: 'light',
    title: '하자소송',
    videos: [
      { id: 'v1', title: '아파트 \'하자 소송\' 하는 게 이득일까?', desc: '아파트 하자 소송 하는 게 이득일까?', youtubeId: 'VIDEO_ID_1' },
      { id: 'v2', title: '아파트 \'하자 소송\' 하는 게 이득일까?', desc: '아파트 하자 소송 하는 게 이득일까?', youtubeId: 'VIDEO_ID_2' },
    ]
  },
  {
    theme: 'dark',
    title: '하자소송',
    videos: [
      { id: 'v3', title: '아파트 \'하자 소송\' 하는 게 이득일까?', desc: '아파트 하자 소송 하는 게 이득일까?', youtubeId: 'VIDEO_ID_3' },
      { id: 'v4', title: '아파트 \'하자 소송\' 하는 게 이득일까?', desc: '아파트 하자 소송 하는 게 이득일까?', youtubeId: 'VIDEO_ID_4' },
      { id: 'v5', title: '아파트 \'하자 소송\' 하는 게 이득일까?', desc: '아파트 하자 소송 하는 게 이득일까?', youtubeId: 'VIDEO_ID_5' },
      { id: 'v6', title: '아파트 \'하자 소송\' 하는 게 이득일까?', desc: '아파트 하자 소송 하는 게 이득일까?', youtubeId: 'VIDEO_ID_6' },
    ]
  },
  {
    theme: 'light',
    title: '하자소송',
    videos: [
      { id: 'v7', title: '아파트 \'하자 소송\' 하는 게 이득일까?', desc: '아파트 하자 소송 하는 게 이득일까?', youtubeId: 'VIDEO_ID_7' },
      { id: 'v8', title: '아파트 \'하자 소송\' 하는 게 이득일까?', desc: '아파트 하자 소송 하는 게 이득일까?', youtubeId: 'VIDEO_ID_8' },
    ]
  }
];

export default function YouTubePage() {
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

        {/* Dynamic Sections */}
        {sections.map((section, sIdx) => (
          <section key={sIdx} className={`${styles.section} ${section.theme === 'dark' ? styles.darkTheme : ''}`}>
            <div className="container">
              <h2 className={styles.sectionHeading}>{section.title}</h2>
              <div className={styles.grid}>
                {section.videos.map((video) => (
                  <div key={video.id} className={styles.videoCard}>
                    <div className={styles.thumbnailArea}>
                      <Image 
                        src="/images/success_apartment.png" 
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
                      <p className={styles.videoDesc}>{video.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

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
