"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import styles from './page.module.css';

const defaultCategories = ['전체보기', '분양계약해제', '건설', '부동산', '임대차', 'HR', '민사 일반'];
const criminalCategoriesList = ['전체보기', '성범죄', '음주교통', '마약', '보이스피싱', '건설형사', '경제범죄', '소년학폭', '일반형사'];

const isCriminalStory = (storyCategory: string) => {
  const norm = (storyCategory || '').replace(/[\s·]/g, '');
  const criminalNorms = ['성범죄', '음주교통', '마약', '보이스피싱', '건설형사', '경제범죄', '소년학폭', '일반형사', '형사', '형사소송'];
  return criminalNorms.includes(norm);
};

export default function SuccessStoriesPage() {
  const [isCriminalMode, setIsCriminalMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('전체보기');
  const [tabCategories, setTabCategories] = useState(defaultCategories);
  const [allCases, setAllCases] = useState<any[]>([]);
  const [filteredCases, setFilteredCases] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // 1. Fetch from Supabase
        const { data: dbStories, error } = await supabase
          .from('success_stories')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        const formattedDbStories = (dbStories || []).map((story: any) => ({
          ...story,
          image: story.image_url || '/images/success_apartment.webp',
          displayId: `Case #DB-${story.id}`,
          lawyer: { name: story.lawyer_name }
        }));

        setAllCases(formattedDbStories);
        setFilteredCases(formattedDbStories);
      } catch (error) {
        console.error('Failed to load success stories:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category');
      if (catParam === '형사') {
        setIsCriminalMode(true);
        setTabCategories(criminalCategoriesList);
        setActiveCategory('전체보기');
      } else if (catParam) {
        setActiveCategory(catParam);
        if (!defaultCategories.includes(catParam)) {
          setTabCategories([...defaultCategories, catParam]);
        }
      }
    }
  }, [allCases]);

  useEffect(() => {
    if (isCriminalMode) {
      const criminalCases = allCases.filter(c => isCriminalStory(c.category));
      if (activeCategory === '전체보기') {
        setFilteredCases(criminalCases);
      } else {
        setFilteredCases(criminalCases.filter(c => {
          const cNorm = (c.category || '').replace(/[\s·]/g, '');
          const aNorm = (activeCategory || '').replace(/[\s·]/g, '');
          return cNorm === aNorm;
        }));
      }
    } else {
      if (activeCategory === '전체보기') {
        setFilteredCases(allCases);
      } else {
        setFilteredCases(allCases.filter(c => c.category === activeCategory));
      }
    }
  }, [activeCategory, allCases, isCriminalMode]);

  return (
    <div className={styles.page}>
      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={`${styles.heroContent} container`}>
            <span className={styles.heroSubtitle}>OUR TRACK RECORD</span>
            <h1 className={styles.heroTitle}>
              {isCriminalMode ? '주요 성공사례' : '법무법인 플로우 성공사례'}
            </h1>
            <p className={styles.heroText}>
              {isCriminalMode ? (
                <>결과로만 말합니다. 처음부터 끝까지, 의뢰인의 편에서만 싸운 기록입니다.</>
              ) : (
                <>
                  승소, 결코 우연이 아닙니다.<br />
                  의뢰인의 소중한 권리를 지켜온 플로우의 남다른 노하우를 직접 확인해 보세요.
                </>
              )}
            </p>
          </div>
          <div className={styles.heroBg}></div>
          <Image
            src="/images/philosophy_bg.webp"
            alt="Hero Background"
            fill
            className={styles.heroImg}
            priority
          />
        </section>

        <div className="container">
          {/* Filter Tabs */}
          <div className={styles.filterContainer}>
            <div className={styles.filterTabs}>
              {tabCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`${styles.filterTab} ${cat === activeCategory ? styles.activeTab : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className={styles.grid}>
            {isLoading ? (
              <div className={styles.loading}>로딩 중...</div>
            ) : filteredCases.length > 0 ? (
              filteredCases.map((item: any, index: number) => (
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
                    <p className={styles.cardDesc}>{(item.description || '').substring(0, 150)}...</p>

                    <div className={styles.lawyerProfile}>
                      <div className={styles.lawyerInfo}>
                        <div className={styles.lawyerAvatar}>{item.lawyer?.name?.[0] || '일'}</div>
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
              <div className={styles.noData}>해당 카테고리의 성공사례가 없습니다.</div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <section className={styles.ctaWrapper}>
          <div className="container">
            <h2 className={styles.ctaTitle}>당신의 재산권을 보호하는 정당한 사유, 법무법인 플로우</h2>
            <p className={styles.ctaText}>
              수많은 성공 사례가 증명합니다. 법무법인 플로우은 건설 소송의<br />
              처음부터 끝까지 의뢰인과 함께하며 최선의 결과를 만들어냅니다.
            </p>
            <div className={styles.ctaBtns}>
              <Link href="/consult" className={styles.primaryBtn}>온라인 상담 신청</Link>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
