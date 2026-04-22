import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Image from 'next/image';
import styles from './page.module.css';

const videoCategories = [
  {
    title: '하자소송',
    videos: [
      { id: 'v1', title: '아파트 하자 소송, 하는 게 이득일까?', thumbnail: '/images/youtube_thumb1.png', youtubeId: 'VIDEO_ID_1' },
      { id: 'v2', title: '아파트 하자 소송 승소 가능성 높이는 법', thumbnail: '/images/youtube_thumb2.png', youtubeId: 'VIDEO_ID_2' },
    ]
  },
  {
    title: '부동산/민사',
    videos: [
      { id: 'v3', title: '전세사기 피해자들을 위한 법률 조언', thumbnail: '/images/youtube_thumb3.png', youtubeId: 'VIDEO_ID_3' },
      { id: 'v4', title: '상가 권리금 분쟁 완벽 가이드', thumbnail: '/images/youtube_thumb4.png', youtubeId: 'VIDEO_ID_4' },
      { id: 'v5', title: '분양 계약 해제 가능한 케이스는?', thumbnail: '/images/youtube_thumb5.png', youtubeId: 'VIDEO_ID_5' },
      { id: 'v6', title: '토지 수용 보상금 증액 노하우', thumbnail: '/images/youtube_thumb6.png', youtubeId: 'VIDEO_ID_6' },
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
          <div className={`${styles.heroContent} container`}>
            <span className={styles.heroSubtitle}>FLOW LAW FIRM</span>
            <h1 className={styles.heroTitle}>플로우 <span className={styles.accent}>Tube</span></h1>
            <p className={styles.heroDescription}>
              최동원 변호사가 직접 설명하는 명쾌한 법률 지식,<br />
              플로우 Tube에서 지금 확인하세요.
            </p>
            <a 
              href="https://www.youtube.com/channel/UCboq3NUp5UX8jYQShMqsQ" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.subscribeBtn}
            >
              <span>YouTube 채널 구독하기</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"></path>
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
              </svg>
            </a>
          </div>
          <div className={styles.heroOverlay}></div>
          <Image 
            src="/images/philosophy_bg.png" 
            alt="YouTube Header Background" 
            fill 
            className={styles.heroBg}
            priority
          />
        </section>

        {/* Video Grid Section */}
        <div className="container">
          {videoCategories.map((category, idx) => (
            <section key={idx} className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{category.title}</h2>
                <div className={styles.titleUnderline}></div>
              </div>
              <div className={styles.grid}>
                {category.videos.map((video) => (
                  <div key={video.id} className={styles.videoCard}>
                    <div className={styles.thumbnailWrapper}>
                      <Image 
                        src="/images/success_apartment.png" // Placeholder or mapped thumbnail
                        alt={video.title}
                        fill
                        className={styles.thumbnail}
                      />
                      <div className={styles.playOverlay}>
                        <div className={styles.playIcon}></div>
                      </div>
                    </div>
                    <div className={styles.videoInfo}>
                      <h3 className={styles.videoTitle}>{video.title}</h3>
                      <p className={styles.videoHost}>플로우 법률 사무소 | 최동원 변호사</p>
                    </div>
                    <a 
                      href={`https://www.youtube.com/watch?v=${video.youtubeId}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.videoLink}
                    >
                      영상 시청하기
                    </a>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Partner Section (Bottom carousel style) */}
        <section className={styles.partnerSection}>
          <div className="container">
            <div className={styles.partnerLogos}>
              {/* This would be the icons from point 5 in the design */}
              <div className={styles.logoItem}><Image src="/images/logo_court.png" alt="대법원" width={100} height={40} /></div>
              <div className={styles.logoItem}><Image src="/images/logo_police.png" alt="경찰청" width={100} height={40} /></div>
              <div className={styles.logoItem}><Image src="/images/logo_prosecutor.png" alt="검찰청" width={100} height={40} /></div>
              {/* Add more logos as needed */}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
