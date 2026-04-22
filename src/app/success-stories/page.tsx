import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import RealFooter from '@/components/Footer/Footer';
import fs from 'fs';
import path from 'path';
import styles from './page.module.css';

const categories = ['전체보기', '아파트 하자', '오피스텔/상가', '일반건축물', '손해배상'];

import { supabase } from '@/lib/supabase';

async function getSuccessStories() {
  const DATA_PATH = path.join(process.cwd(), 'src/data/success-stories.json');
  let localStories = [];
  
  // 1. Get local JSON stories
  try {
    const jsonData = fs.readFileSync(DATA_PATH, 'utf8');
    localStories = JSON.parse(jsonData);
  } catch (error) {
    console.error('Failed to load local success stories:', error);
  }

  // 2. Get Supabase stories
  try {
    const { data: dbStories, error } = await supabase
      .from('success_stories')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    // Combine both (DB stories come first as they are newer)
    const formattedDbStories = (dbStories || []).map((story: any) => ({
      ...story,
      image: story.image_url || '/images/success_apartment.png',
      displayId: `Case #${story.id.substring(0, 8).toUpperCase()}`,
      lawyer: { name: story.lawyer_name }
    }));

    return [...formattedDbStories, ...localStories];
  } catch (error) {
    console.error('Failed to load DB success stories:', error);
    return localStories;
  }
}

export default async function SuccessStoriesPage() {
  const successCases = await getSuccessStories();

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
              법무법인 일신은 건설 하자 소송의 정밀한 분석과 압도적인 전문성으로 의뢰인의 권익을 완벽하게 보호합니다.
            </p>
          </div>
          <div className={styles.heroBg}></div>
          <Image 
            src="/images/philosophy_bg.png" 
            alt="Hero Background" 
            fill 
            className={styles.heroImg}
            priority
          />
        </section>

        {/* Filter (Note: Server Component filter can be added via Query Params if needed, 
            but for now we display all or keep simple) */}
        <div className="container">
          <div className={styles.filterContainer}>
            <div className={styles.filterTabs}>
              {categories.map((cat) => (
                <button 
                  key={cat} 
                  className={`${styles.filterTab} ${cat === '전체보기' ? styles.activeTab : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className={styles.grid}>
            {successCases.length > 0 ? (
              successCases.map((item: any, index: number) => (
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
                    <p className={styles.cardDesc}>{item.description.substring(0, 150)}...</p>
                    
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
              <div className={styles.noData}>등록된 성공사례가 없습니다.</div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <section className={styles.ctaWrapper}>
          <div className="container">
            <h2 className={styles.ctaTitle}>당신의 재산권을 보호하는 정당한 사유, 법무법인 일신</h2>
            <p className={styles.ctaText}>
              수많은 성공 사례가 증명합니다. 법무법인 일신은 건설 소송의<br />
              처음부터 끝까지 의뢰인과 함께하며 최선의 결과를 만들어냅니다.
            </p>
            <div className={styles.ctaBtns}>
              <Link href="/consult" className={styles.primaryBtn}>온라인 상담 신청</Link>
            </div>
          </div>
        </section>
      </main>

      <RealFooter />
    </div>
  );
}
