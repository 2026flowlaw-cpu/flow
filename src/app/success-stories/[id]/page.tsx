import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { supabase } from '@/lib/supabase';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

async function getCaseData(id: string) {
  // 1. Try to fetch from Supabase (if it's a numeric ID)
  if (!isNaN(Number(id))) {
    const { data, error } = await supabase
      .from('success_stories')
      .select('*')
      .eq('id', Number(id))
      .single();
    
    if (!error && data) {
      return {
        id: `Case #${data.id}`,
        badge: data.badge || '승소',
        title: data.title,
        image: data.image_url || '/images/success_apartment.png',
        category: data.category,
        lawyer_name: data.lawyer_name,
        overview: {
          text1: data.description,
          text2: data.content
        },
        strategies: [
          {
            title: '철저한 법리 검토',
            desc: '해당 분야 전문 변호사가 직접 판례를 분석하여 최선의 결과를 도출했습니다.',
            icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            )
          }
        ],
        verdict: {
          label: 'FINAL VERDICT',
          title: data.badge,
          compensation: '상세 판결 완료',
          defectItems: '입증 완료'
        }
      };
    }
  }

  // 2. Fallback to hardcoded mock data for original cases
  const cases: Record<string, any> = {
    '2024-002': {
      id: 'Case No. 2023-가합-589212',
      badge: 'FULL WIN',
      title: '송도 OO아파트 전 세대 공용부분 하자보수 청구 승소',
      image: '/images/success_apartment.png',
      overview: {
        text1: "본 사건의 의뢰인들은 인천 송도국제도시에 위치한 'OO아파트' 입주자대표회의로, 준공 후 3년 차에 접어들며 단지 내 지하주차장 균열, 외벽 누수, 그리고 공용부분 승강기 오작동 등 심각한 구조적 하자가 발생하여 시공사에 보수를 요청하였습니다.",
        text2: "그러나 시공사는 '관리 부실'을 이유로 면책을 주장하며 보수를 거부하였고, 입주민들은 생활의 안전을 위협받는 긴박한 상황에서 법무법인 일신를 찾았습니다."
      },
      strategies: [
        {
          title: '기술 전문가 합동 현장 진단',
          desc: '법무법인 일신와 파트너십을 맺은 건축구조 기술사들과 함께 현장을 직접 정밀 진단했습니다. 단순 육안 검사를 넘어 균열의 깊이와 철근 부식 상태를 데이터화하여 시공 단계에서의 결함을 입증했습니다.',
          icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          )
        }
      ],
      verdict: {
        label: 'FINAL VERDICT',
        title: '시공사 책임 95% 인정, 하자보수금 약 42억 원 배상 판결',
        compensation: '₩ 4,200,000,000',
        defectItems: '124 Categories'
      }
    }
  };

  const key = id.replace('Case-', '');
  return cases[key] || cases['2024-002'];
}

export default async function CaseDetailPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const { id } = await paramsPromise;
  const data = await getCaseData(id);

  if (!data) notFound();

  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.container}>
        {/* Breadcrumbs */}
        <nav className={styles.breadcrumbs}>
          <Link href="/">HOME</Link>
          <span className={styles.breadcrumbSeparator}>{'>'}</span>
          <Link href="/success-stories">SUCCESS CASES</Link>
          <span className={styles.breadcrumbSeparator}>{'>'}</span>
          <span>CASE DETAIL</span>
        </nav>

        {/* Header Section */}
        <header className={styles.header}>
          <div>
            <span className={styles.badge}>{data.badge}</span>
            <span className={styles.caseId}>{data.id}</span>
          </div>
          <h1 className={styles.title}>{data.title}</h1>
          <div className={styles.underline}></div>
        </header>

        {/* Main Image */}
        <div className={styles.mainImageWrapper}>
          <Image 
            src={data.image} 
            alt={data.title} 
            fill 
            className={styles.mainImage}
            priority
          />
        </div>

        {/* Content Layout */}
        <div className={styles.contentGrid}>
          <div className={styles.mainContent}>
            
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>01</span>
                <h2 className={styles.sectionTitle}>사건 개요</h2>
              </div>
              <div className={styles.overviewBox}>
                <p className={styles.overviewText}>{data.overview.text1}</p>
                <div className={styles.contentDivider}></div>
                <p className={styles.overviewText} style={{ whiteSpace: 'pre-wrap' }}>{data.overview.text2}</p>
              </div>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>02</span>
                <h2 className={styles.sectionTitle}>대응 전략</h2>
              </div>
              <div className={styles.strategyList}>
                {data.strategies.map((s: any, i: number) => (
                  <div key={i} className={styles.strategyItem}>
                    <div className={styles.strategyIcon}>{s.icon}</div>
                    <div className={styles.strategyContent}>
                      <h3 className={styles.strategyTitle}>{s.title}</h3>
                      <p className={styles.strategyDesc}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>03</span>
                <h2 className={styles.sectionTitle}>결과 보고</h2>
              </div>
              <div className={styles.resultBox}>
                <div className={styles.resultInner}>
                  <span className={styles.resultLabel}>{data.verdict.label}</span>
                  <h2 className={styles.resultTitle}>{data.verdict.title}</h2>
                  <div className={styles.resultStats}>
                    <div>
                      <span className={styles.statLabel}>COMPENSATION</span>
                      <span className={styles.statValue}>{data.verdict.compensation}</span>
                    </div>
                    <div>
                      <span className={styles.statLabel}>CASE CATEGORY</span>
                      <span className={styles.statValue}>{data.category || '기타'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>담당 변호사</h3>
              <div className={styles.lawyerCard}>
                <div className={styles.lawyerAvatar}>{data.lawyer_name?.[0] || '일'}</div>
                <div>
                  <h4 className={styles.lawyerName}>{data.lawyer_name || '법무법인 일신'}</h4>
                  <p className={styles.lawyerRole}>건설 하자 전문 변호사</p>
                </div>
              </div>
            </div>

            <div className={styles.sidebarCTA}>
              <h3 className={styles.ctaTitle}>유사한 문제로 고민 중이신가요?</h3>
              <p className={styles.ctaDesc}>
                일신의 건설 특화 변호사들이 구조적인 해결책을 제시합니다.
              </p>
              <Link href="/consult" className={styles.ctaBtn}>무료 법률 상담 신청</Link>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
