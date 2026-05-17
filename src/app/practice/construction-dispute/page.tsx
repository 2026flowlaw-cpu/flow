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

export default function ConstructionDisputePage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        
        {/* 1. Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroContentGrid}>
              
              <div className={styles.heroLeft}>
                <h1 className={styles.heroMainTitle}>
                  현장을 압니다.<br />
                  그래서 <span className={styles.goldHighlight}>강합니다.</span>
                </h1>
                <p className={styles.heroDescription} style={{ fontSize: '20px', lineHeight: '1.8' }}>
                  수많은 이해관계인과 복잡한 공정, 외부 변수까지... <br />
                  건설현장은 교과서적 지식으로 해결할 수 없는 일 투성이입니다. <br />
                  건설소송은 현장의 생리와 특성을 아는 진짜 건설전문변호사와 함께 해야 합니다.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 2. Strengths & Promises (Hexagon & Count-up Section) */}
        <DefectPromise 
          sectionSubtitle="건설 현장의 복잡한 이해관계 속에서 의뢰인의 권익을 끝까지 보호하는 법무법인 플로우의 정밀 소송 전략입니다. 압도적인 지표와 최고의 맨파워를 직접 증명합니다."
          counters={[
            {
              id: 0,
              target: 2000,
              suffix: '건+',
              title: '건설 분쟁 수행 및 자문',
              desc: '다양한 건설 소송 및 자문 등을 성공적으로 해결하며 축적한 실적'
            },
            {
              id: 1,
              target: 25,
              suffix: '년+ 경력',
              title: '전문가 결합 TF팀',
              desc: '변호사, 시공기술사, 건축기사로 구성된 건설분쟁 TF팀의 밀착 협업'
            },
            {
              id: 2,
              target: 20,
              suffix: '억 원+',
              title: '단일 사건 최대 승소액',
              desc: '플로우가 철저한 기술 감정 입증을 통해 받아낸 단일 사건 최대 승소액'
            },
            {
              id: 3,
              target: 100,
              suffix: '% 직접상담',
              title: '건설전문변호사 밀착 케어',
              desc: '대한변협등록 건설전문변호사가 모든 초기 상담부터 책임지고 직접 조력'
            }
          ]}
        />

        {/* 2.5. Specialized Defect Cases Pill Grid (Image 1 layout) */}
        <DefectCasesGrid 
          hideKicker={true}
          mainTitle="건설전문변호사 건설소송 토탈 솔루션"
          descLines={[
            "천문학적 금액이 오가는 건설 분쟁, 현장을 모르면 결코 이길 수 없습니다.",
            "건설소송은 법무법인 플로우가 정답입니다."
          ]}
          customCases={[
            {
              id: 1,
              label: '공사대금',
              coreDiagnosis: '📌 주요 관련 키워드\n공사대금청구, 추가공사비, 설계비, 감리비, 간접공사비, 기성고 정산, 공사비 과지급\n\n💡 법무법인 플로우의 해결 솔루션\n공사 합의 여부, 기성고 등을 정밀 분석하여 실제 투입된 공사 비용에 대한 정당한 정산 및 미지급 대금 회수를 조력합니다.'
            },
            {
              id: 2,
              label: '공사금지가처분',
              coreDiagnosis: '📌 주요 관련 키워드\n공사중지가처분, 공사방해금지가처분, 일조권·조망권 피해, 건물균열 등 인접지 피해\n\n💡 법무법인 플로우의 해결 솔루션\n인접지 공사로 인한 물리적 피해나 일조권·조망권 침해의 실체를 규명하여, 공사중단 필요성을 검토하거나 부당한 중단 요구를 방어합니다.'
            },
            {
              id: 3,
              label: '공사계약파기',
              coreDiagnosis: '📌 주요 관련 키워드\n공사도급계약해지, 공사계약위반, 부실시공, 공사지연, 공사타절, 타절합의서\n\n💡 법무법인 플로우의 해결 솔루션\n공사지연이나 부실시공 등 계약해지의 책임 소재를 명확히 가려내고, 공사타절 과정에서 발생하는 여러 리스크에 대한 솔루션을 제안합니다.'
            },
            {
              id: 4,
              label: '지체상금·손해배상',
              coreDiagnosis: '📌 주요 관련 키워드\n공기지연, 지체상금청구, 건축주 과실, 지체상금 면책·감액, 공사비 상계\n\n💡 법무법인 플로우의 해결 솔루션\n공기지연의 실질적인 원인이 누구에게 있는지 분석하여, 부당한 지체상금 청구를 방어하거나 적정 지연보상금을 산정합니다.'
            },
            {
              id: 5,
              label: '공사하자',
              coreDiagnosis: '📌 주요 관련 키워드\n누수·결로·곰팡이·크랙, 하자로 인한 계약해지, 하자 진단 및 감정, 하자보수비청구\n\n💡 법무법인 플로우의 해결 솔루션\n건물에 발생한 하자의 원인과 실태를 정밀 진단하고, 이에 상응하는 보수 비용이나 손해배상을 청구합니다.'
            },
            {
              id: 6,
              label: '인테리어 분쟁',
              coreDiagnosis: '📌 주요 관련 키워드\n인테리어사기, 인테리어하자, 공사중단, 계약금반환, 계약불이행, 추가공사비 청구\n\n💡 법무법인 플로우의 해결 솔루션\n인테리어 공사계약 불이행, 하자 등 사태의 본질을 파악하여 의뢰인의 권리회복에 앞장섭니다.'
            }
          ]}
        />

        {/* 2.8. Verdict Proof Documents Grid (Gam-myeong reference style) */}
        <VerdictSection />



        {/* 4. Defect Cases Rolling */}
        <section className={styles.sectionCases}>
          <div className={styles.container}>
            
            <div className={styles.sectionHeader}>
              <h2 className={styles.panelTitle}>건설 실시간 진행 현황</h2>
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
