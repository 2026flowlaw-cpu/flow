"use client";

import React from 'react';
import InquiryForm from '@/components/Location/InquiryForm/InquiryForm';
import DefectPromise from '@/components/DefectPromise/DefectPromise';
import DefectCasesGrid from '@/components/DefectCasesGrid/DefectCasesGrid';
import VerdictSection from '@/components/VerdictSection/VerdictSection';
import DefectStrategyGrid from '@/components/DefectStrategyGrid/DefectStrategyGrid';
import DefectReviews from '@/components/DefectReviews/DefectReviews';
import DefectFaq from '@/components/DefectFaq/DefectFaq';
import styles from './page.module.css';

interface DefectCaseItem {
  id: number;
  title: string;
  countText: string;
  statusText: string;
  description: string;
}

const defectCases: DefectCaseItem[] = [
  {
    id: 1,
    title: '김포 XXX 아파트 외벽 균열 및 결로 부실시공 손해배상청구',
    countText: '1,240세대 공동소송',
    statusText: '모집중',
    description: '외벽 균열 누수 및 세대 내 결로 곰팡이 피해에 따른 시공사 대상 하자보수 손해배상청구'
  },
  {
    id: 2,
    title: '용인 XXX 아파트 지하주차장 철근 누락 및 보수보증금 청구',
    countText: '980세대 전체 참여',
    statusText: '모집완료',
    description: '구조안전 진단 결과 기둥 무단 철근 탈락 입증 및 25억 보증금 증액 판결 성공'
  },
  {
    id: 3,
    title: '인천 XXX 아파트 외벽 마감 대리석 탈락 및 구조안전 진단 청구',
    countText: '850세대 공동소송',
    statusText: '모집중',
    description: '외장재 탈락으로 인한 안전사고 위험 해결 및 전면 재시공 공사 청구'
  },
  {
    id: 4,
    title: '수원 XXX 아파트 조경 식재 고사 및 지반 균열 손해배상청구',
    countText: '680세대 판결금 확보',
    statusText: '모집완료',
    description: '조경 수목 무단 미식재 및 고사, 단지 지반 침하 균열 입증 손해배상금 승소'
  },
  {
    id: 5,
    title: '양주 XXX 신축빌라 단지 결로 및 부실 마감 하자 기망 손해배상',
    countText: '120세대 소제기 완료',
    statusText: '모집중',
    description: '설계도면과 상이한 저가 마감재 무단 변경 사용 입증 및 계약 위반 손해배상'
  },
  {
    id: 6,
    title: '천안 XXX 상가 동별 오배수관 역류 및 배관 부실 하자보수청구',
    countText: '320개 점포 연합소송',
    statusText: '모집완료',
    description: '상가 지하공간 오수관 구배 위반 부실 시공 및 상습 역류 하자 보수 비용 청구'
  }
];

export default function ResaleCancellationPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        
        {/* 1. Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroContentGrid}>
              
              <div className={styles.heroLeft}>
                <h1 className={styles.heroMainTitle}>
                  분양권해제 특화,<br />
                  <span className={styles.goldHighlight}>ONE STOP</span> 종합 법률서비스
                </h1>
                <div className={styles.heroSubtitles}>
                  <span className={styles.titleSub1}>분양계약해제 케이스를 분석한 빅데이터와 독보적인 승소 노하우를 보유하고 있습니다.</span>
                  <span className={styles.titleSub2}>불가능해 보이는 그 사건도 법무법인 플로우와 함께라면 가능합니다.</span>
                </div>
                <div className={styles.slashDivider}>\</div>
                <p className={styles.heroDescription}>
                  분양계약해제 전담 TF · 현장 밀착 법률 서비스<br />
                  상가 · 오피스텔 · 지산 · 생숙 · 라이브오피스 등 분양계약해제 사례 다수<br />
                  부동산 · 건설 기술인력 자체 보유
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 2. Strengths & Promises (Hexagon & Count-up Section) */}
        <DefectPromise />

        {/* 2.5. Specialized Defect Cases Pill Grid (Image 1 layout) */}
        <DefectCasesGrid 
          hideKicker={true}
          mainTitle="분양계약해제 토탈 솔루션"
          descLines={[
            '계약해제 = 계약금 몰수라고 생각하기 쉽습니다.',
            '그러나 분양사의 귀책이나 위법성이 입증되면 계약금 손실없이 계약취소 할 수 있습니다.',
            '오랜 실무경험을 바탕으로 의뢰인의 상황과 입장에 맞는 최적의 솔루션을 제안합니다.'
          ]}
          difficultyTitle="* 현재 어떤 어려움을 겪고 계신가요?"
          difficultySubtitle="법무법인 플로우는 모든 케이스를 축적하고 있습니다."
        />

        {/* 2.8. Verdict Proof Documents Grid (Gam-myeong reference style) */}
        <VerdictSection />



        {/* 4. Defect Cases Rolling */}
        <section className={styles.sectionCases}>
          <div className={styles.container}>
            
            <div className={styles.sectionHeader}>
              <h2 className={styles.panelTitle}>분양계약해제 실시간 진행 현황</h2>
              <p className={styles.panelSubtitle}>
                전국 대규모 단지 및 상가 입주민들이 플로우 하자 전담 TF와 함께 정당한 가치를 찾고 있습니다.
              </p>
            </div>

            <div className={styles.casesGrid}>
              
              {/* Left Column: Vertical Defect Marquee */}
              <div>
                <div className={styles.verticalMarqueeWrapper}>
                  <div className={styles.verticalMarqueeTrack}>
                    
                    {/* 1st copy */}
                    {defectCases.map((item) => {
                      const key = `${item.id}-defect-orig`;
                      const isCompleted = item.statusText === '모집완료';
                      return (
                        <div 
                          key={key} 
                          className={`${styles.caseCard} ${isCompleted ? styles.completedCard : ''}`}
                        >
                          <div className={styles.cardTitleRow}>
                            <h3 className={styles.cardTitle}>{item.title}</h3>
                            <span className={styles.countBadge}>
                              {item.countText}, <span className={isCompleted ? styles.statusClosed : styles.statusHighlight}>{item.statusText}</span>
                            </span>
                          </div>
                          <p className={styles.cardDesc}>{item.description}</p>
                        </div>
                      );
                    })}

                    {/* 2nd copy */}
                    {defectCases.map((item) => {
                      const key = `${item.id}-defect-dup`;
                      const isCompleted = item.statusText === '모집완료';
                      return (
                        <div 
                          key={key} 
                          className={`${styles.caseCard} ${isCompleted ? styles.completedCard : ''}`}
                        >
                          <div className={styles.cardTitleRow}>
                            <h3 className={styles.cardTitle}>{item.title}</h3>
                            <span className={styles.countBadge}>
                              {item.countText}, <span className={isCompleted ? styles.statusClosed : styles.statusHighlight}>{item.statusText}</span>
                            </span>
                          </div>
                          <p className={styles.cardDesc}>{item.description}</p>
                        </div>
                      );
                    })}

                  </div>
                </div>
                <div className={styles.marqueeNotice}>
                  * 사건 카드에 마우스를 올리시면(Hover) 위로 올라가는 롤링이 일시정지됩니다.
                </div>
              </div>

              {/* Right Column: Dark Navy Info Card */}
              <div className={styles.rightCol}>
                <div className={styles.navyPanel}>
                  <div className={styles.panelWatermark}>
                    <svg width="240" height="240" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                      <path d="M12 6V18" />
                      <path d="M6 12H18" />
                    </svg>
                  </div>

                  <div className={styles.panelWatermarkTitle}>성공적 하자보수 보증금 확보 완료</div>
                  <p className={styles.panelWatermarkSubtitle}>건축 기술적 입증을 바탕으로 시공사 보상을 확실하게 매듭지었습니다.</p>

                  <div className={styles.closedCaseList}>
                    <div className={styles.closedCaseRow}>
                      <div className={styles.closedDot}></div>
                      <div className={styles.closedCaseInfo}>
                        <strong className={styles.closedTitle}>용인 XXX 아파트 지하주차장 철근 누락 및 보수보증금 청구</strong>
                        <span className={styles.closedMeta}>모집 완료 (980세대 전체 완료)</span>
                      </div>
                    </div>

                    <div className={styles.closedCaseRow}>
                      <div className={styles.closedDot}></div>
                      <div className={styles.closedCaseInfo}>
                        <strong className={styles.closedTitle}>수원 XXX 아파트 조경 식재 고사 및 지반 균열 손해배상청구</strong>
                        <span className={styles.closedMeta}>모집 완료 (680세대 전체 완료)</span>
                      </div>
                    </div>

                    <div className={styles.closedCaseRow}>
                      <div className={styles.closedDot}></div>
                      <div className={styles.closedCaseInfo}>
                        <strong className={styles.closedTitle}>천안 XXX 상가 동별 오배수관 역류 및 배관 부실 하자보수청구</strong>
                        <span className={styles.closedMeta}>모집 완료 (320개 점포 전체 완료)</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.divider}></div>

                  <div className={styles.shinmoongoBox}>
                    <div className={styles.shinmoongoHeader}>
                      <div className={styles.shinmoongoIconBox}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                          <path d="M12 16v-4"/>
                          <path d="M12 8h.01"/>
                        </svg>
                      </div>
                      <div className={styles.shinmoongoHeaderText}>
                        <h5 className={styles.shinmoongoTitle}>하자 피해 자가진단 신고센터</h5>
                        <span className={styles.shinmoongoSubtitle}>무료 결함 계측 및 변호사 기술 진단</span>
                      </div>
                    </div>
                    <p className={styles.shinmoongoDesc}>
                      단지 내 지하주차장 천장 누수, 세대 벽면 대량 결로, 타일 파손 등 보수 요청을 거부당하신 경우 플로우 진단 신고 센터로 즉시 신고 접수해 주시면 특화 진단을 제공해 드립니다.
                    </p>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 4.5. Specialized Win Strategy Grid (Image 1 layout) */}
        <DefectStrategyGrid />

        {/* 4.6. Real Client Testimonial Reviews (Interactive filter grid) */}
        <DefectReviews />

        {/* 4.8. Frequently Asked Questions (Image 1 Accordion FAQ) */}
        <DefectFaq />

        {/* 5. Inquire Form Section */}
        <div style={{ backgroundColor: '#f8fafc', padding: '80px 0' }}>
          <div className="container">
            <InquiryForm />
          </div>
        </div>

      </main>
    </div>
  );
}
