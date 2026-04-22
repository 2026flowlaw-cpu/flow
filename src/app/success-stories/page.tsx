"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import RealFooter from '@/components/Footer/Footer';
import styles from './page.module.css';

const categories = ['전체보기', '아파트 하자', '오피스텔/상가', '일반건축물', '손해배상'];

export default function SuccessStoriesPage() {
  const [successCases, setSuccessCases] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('전체보기');

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch('/api/success-stories');
        const data = await res.json();
        setSuccessCases(data);
      } catch (error) {
        console.error('Failed to fetch stories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStories();
  }, []);

  const filteredCases = activeTab === '전체보기' 
    ? successCases 
    : successCases.filter(c => c.category === activeTab);

  return (
    <div className={styles.page}>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={`${styles.heroContent} container`}>
            <span className={styles.heroSubtitle}>OUR TRACK RECORD</span>
            <h1 className={styles.heroTitle}>주요 성공사례</h1>
            <p className={styles.heroText}>
              법무법인 플로우는 건설 하자 소송의 정밀한 분석과 압도적인 전문성으로 의뢰인의 권익을 완벽하게 보호합니다.
            </p>
          </div>
          <div className={styles.heroBg}></div>
          <Image 
            src="/images/philosophy_bg.png" 
            alt="Hero Background" 
            fill 
            className={styles.heroImg}
          />
        </section>

        {/* Filter & Search */}
        <div className="container">
          <div className={styles.filterContainer}>
            <div className={styles.filterTabs}>
              {categories.map((cat) => (
                <button 
                  key={cat} 
                  className={`${styles.filterTab} ${activeTab === cat ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className={styles.searchBox}>
              <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" placeholder="사례 검색" className={styles.searchInput} />
            </div>
          </div>

          {/* Grid */}
          <div className={styles.grid}>
            {isLoading ? (
              <div className={styles.loading}>로딩 중...</div>
            ) : filteredCases.length > 0 ? (
              filteredCases.map((item, index) => (
                <Link href={`/success-stories/${item.id}`} key={index} className={styles.card}>
                  <div className={styles.cardImageWrapper}>
                    <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} />
                    <div className={styles.cardBadge}>{item.badge}</div>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardCategory}>
                      <span className={styles.categoryTag}>{item.category}</span>
                      <span className={styles.caseId}>{item.displayId}</span>
                    </div>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDesc}>{item.description}</p>
                    
                    <div className={styles.lawyerProfile}>
                      <div className={styles.lawyerInfo}>
                        <div className={styles.lawyerAvatar}>{item.lawyer?.initials || '??'}</div>
                        <span className={styles.lawyerName}>{item.lawyer?.name || '담당 변호사'}</span>
                      </div>
                      <div className={styles.viewBtn}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className={styles.noData}>등록된 성공사례가 없습니다.</div>
            )}
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <button className={`${styles.pageBtn} ${styles.navPageBtn}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button className={`${styles.pageBtn} ${styles.activePage}`}>1</button>
            <button className={styles.pageBtn}>2</button>
            <button className={styles.pageBtn}>3</button>
            <button className={`${styles.pageBtn} ${styles.navPageBtn}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* CTA Section */}
        <section className={styles.ctaWrapper}>
          <div className="container">
            <h2 className={styles.ctaTitle}>당신의 권리를 보호하는 확실한 흐름 (Flow)</h2>
            <p className={styles.ctaText}>
              수많은 성공 사례가 증명합니다. 법무법인 플로우는 건설 소송의<br />
              처음부터 끝까지 의뢰인과 함께하며 최선의 결과를 만들어냅니다.
            </p>
            <div className={styles.ctaBtns}>
              <button className={styles.primaryBtn}>온라인 상담 신청</button>
              <button className={styles.secondaryBtn}>전화 상담 예약</button>
            </div>
          </div>
        </section>
      </main>

      <RealFooter />
    </div>
  );
}
