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

export default function GeneralCivilPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        
        {/* 1. Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroContentGrid}>
              
              <div className={styles.heroLeft}>
                <h1 className={styles.heroMainTitle}>
                  여러분이 고민하고 계신 그 사건,<br />
                  <span className={styles.goldHighlight}>이미 이겨봤습니다</span>
                </h1>
                <p className={styles.heroDescription}>
                  대여금, 손해배상, 부당이득반환 등 민사 분쟁은 우리 삶과 가장 밀접한 사건이지만, <br />
                  원하는 결과를 얻기 위해서는 고단한 싸움을 각오해야 합니다. <br />
                  법무법인 플로우는 치밀한 분석과 날카로운 법리로 의뢰인의 일상 회복을 조력합니다.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 2. Strengths & Promises (Hexagon & Count-up Section) */}
        <DefectPromise 
          kicker="NUMBERS & PROMISES"
          sectionTitle="법무법인 플로우의 압도적 경험과 실력"
          sectionSubtitle="의뢰인의 소중한 권익과 소송 승리를 위해 법무법인 플로우는 단 한 순간도 타협하지 않습니다. 치밀한 분석과 완벽한 지표로 최고의 법률 서비스를 증명합니다."
          counters={[
            {
              id: 0,
              target: 10000,
              suffix: '건+',
              title: '민사소송 및 자문 수행건수',
              desc: '다양한 소송 사례를 통해 축적된 플로우만의 독보적인 소송 통계 자료 보유'
            },
            {
              id: 1,
              target: 14,
              suffix: '일 이내',
              title: '소장 접수까지 신속 대응',
              desc: '사건 수임 시점부터 평균 14일 이내 신속한 소장 작성 및 법원 제출 완료'
            },
            {
              id: 2,
              target: 24,
              suffix: '시간',
              title: '언제 어디서든 간편 상담 접수',
              desc: '전화, 카카오톡, 웹 문의 등 의뢰인이 편리한 경로로 항시 상담 연계'
            },
            {
              id: 3,
              target: 365,
              suffix: '일',
              title: '민사소송 긴급 대응 TF팀 운영',
              desc: '풍부한 실무 능력을 갖춘 전담 TF가 365일 실시간 상주하며 신속 지원'
            }
          ]}
          promises={[
            {
              id: 0,
              title: '민사 전문 변호사 직접 상담',
              desc: '풍부한 소송 실무를 거친 전담 변호사가 초기 면담부터 서면 작성, 변론까지 외주 없이 100% 밀착 진행합니다.',
              iconType: 'lawyer'
            },
            {
              id: 1,
              title: '치밀한 사실관계 입증',
              desc: '모호한 법률 해석에만 의존하지 않고, 정밀한 계좌 분석, 계약 분석을 통하여 확실한 승소 증거를 구축합니다.',
              iconType: 'tech'
            },
            {
              id: 2,
              title: '상황 맞춤형 분쟁 솔루션',
              desc: '무조건적인 소송 남발 대신 가압류, 가처분, 협의 대리 등 의뢰인의 실리 극대화를 최우선으로 결정합니다.',
              iconType: 'consult'
            },
            {
              id: 3,
              title: '압도적인 승소 데이터',
              desc: '수천 건의 민사 집행 및 채권 회수 성공 레코드를 바탕으로, 판결문 획득을 넘어 실질적 재산 보전을 이뤄냅니다.',
              iconType: 'twotrack'
            }
          ]}
        />

        {/* 2.5. Specialized Defect Cases Pill Grid (Image 1 layout) */}
        <DefectCasesGrid 
          hideKicker={true}
          mainTitle="민사분쟁 원스톱 종합 솔루션"
          descLines={[
            "사안마다 얽혀있는 이해관계와 법률 쟁점이 다르기 때문에",
            "상황별 / 원인별 / 단계별 솔루션이 필요합니다."
          ]}
          difficultyTitle="* 현재 어떤 어려움을 겪고 계신가요?"
          difficultySubtitle="법무법인 플로우는 민사 소송 전 영역의 솔루션을 제공합니다."
          reportSubtitle="법무법인 플로우(FLOW) 일반 민사 분쟁 정밀 분석 보고서"
          customCases={[
            {
              id: 1,
              label: '대여금 반환 청구',
              coreDiagnosis: '대여금 사건은 차용증이나 영수증의 유무, 이자 약정 여부, 채권 소멸시효(10년 또는 5년) 경과 여부에 따라 소송 승패와 실질적 회수율이 판가름 납니다.',
              legalStrategy: '거래 내역서, 문자 메시지, 송금 내역 등을 면밀히 검토해 채무관계를 분명히 입증하며, 채무자의 은닉 재산을 방지하기 위해 부동산 가압류 및 거래은행 가처분 조치를 선제적으로 집행합니다.'
            },
            {
              id: 2,
              label: '손해배상 청구',
              coreDiagnosis: '불법행위나 계약 위반으로 발생한 손해는 가해자의 고의·과실, 손해액의 구체적 산정, 인과관계를 철저히 규명하지 않으면 법원에서 인정받기 극히 어렵습니다.',
              legalStrategy: '손해 발생 원인을 다각도로 분석하여 입증 자료를 수집하고, 발생한 통상손해는 물론 예견 가능한 특별손해까지 치밀하게 산출하여 배상 범위를 극대화합니다.'
            },
            {
              id: 3,
              label: '부당이득 반환 청구',
              coreDiagnosis: '법률상 원인 없이 타인의 재산으로 이익을 얻고 이로 인해 타인에게 손해를 가한 사건으로, 부당이득의 실제 귀속처와 정확한 이득액을 증명하는 것이 핵심 쟁점입니다.',
              legalStrategy: '회계 장부, 금융 거래 정보 제출 명령 등을 활용하여 자금의 흐름을 역추적하고, 상대방이 취득한 부당이득을 정밀하게 입증하여 전액 반환을 청구합니다.'
            },
            {
              id: 4,
              label: '계약 해제 및 원상회복',
              coreDiagnosis: '부동산 분양 계약, 매매 계약 등 중도 계약 파기 시 위약금 조항의 효력 여부, 귀책사유 소재를 놓고 계약금 몰수나 해제 효력이 쟁점으로 대립합니다.',
              legalStrategy: '계약 위반 사항(이행지체, 이행불능)에 대한 최고 및 적법한 계약 해제 통지 이력을 확보하고, 부당하게 과다한 위약금 약정의 경우 법원의 직권 감액 결정을 유도합니다.'
            },
            {
              id: 5,
              label: '사해행위 취소 소송',
              coreDiagnosis: '채무자가 채권자를 해함을 알면서도 자신의 유일한 부동산을 친인척에게 증여·매매하는 등 재산을 은닉하는 행위로, 채무자의 사해의사와 법률행위를 특정하여 취소시켜야 합니다.',
              legalStrategy: '수익자 또는 전득자의 악의(사해의사) 추정을 근거로 은닉 재산을 채무자 명의로 원상 복구시키는 판결을 받아내어, 확실한 채권 회수 기반을 마련합니다.'
            },
            {
              id: 6,
              label: '채권추심 및 강제집행',
              coreDiagnosis: '판결문을 받아내는 것보다 채무자의 재산에서 실제로 대금을 회수하는 것이 실질적 종결입니다. 신속하고 정밀한 재산 조사가 선행되지 않으면 무용지물이 됩니다.',
              legalStrategy: '판결 즉시 채무자 재산명시 신청 및 재산조회 시스템을 활용하고, 채무자의 예금 압류, 채권 압류 및 추심명령, 부동산 경매 등을 신속히 실행해 대금을 강제 집행합니다.'
            }
          ]}
        />

        {/* 2.8. Verdict Proof Documents Grid (Gam-myeong reference style) */}
        <VerdictSection />



        {/* 4. Defect Cases Rolling */}
        <section className={styles.sectionCases}>
          <div className={styles.container}>
            
            <div className={styles.sectionHeader}>
              <h2 className={styles.panelTitle}>일반 민사 실시간 진행 현황</h2>
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
