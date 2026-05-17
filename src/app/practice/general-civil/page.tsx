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
    title: '차용증 없는 투자 사기 및 미반환 대여금 2억 원 반환 청구 소송',
    countText: '개인 의뢰인 대리',
    statusText: '진행중',
    description: '차용금 약정을 입증할 직접적 계약서 부재 상태에서 이체 내역 및 문자 메시지 교차 분석을 통해 적법한 대여 의무 확정'
  },
  {
    id: 2,
    title: 'IT 벤처 창업 동업 해지에 따른 미정산 수익배분금 3억 5천만 원 청구',
    countText: '주주간 공동 소송',
    statusText: '인용완료',
    description: '동업자의 고의 매출 축소 정황을 회계 장부 열람 가처분으로 확보하여 미정산 수익금 3억 5천만 원 전액 배상 인용'
  },
  {
    id: 3,
    title: '상가 임대인의 무단 신규 임차인 거절로 인한 권리금 회수 방해 손해배상',
    countText: '상가 임차인 대리',
    statusText: '진행중',
    description: '상가임대차법상 주선 의무 해태 정황 및 신규 임차인의 계약 불성립 귀책사유가 임대인에게 있음을 법원에 입증'
  },
  {
    id: 4,
    title: '부동산 매매계약 해제에 따른 계약금 반환 및 위약금 1억 원 청구 소송',
    countText: '매수인 단독 대리',
    statusText: '인용완료',
    description: '시행사의 무단 설계 변경 및 기망 약정에 따른 원인 무효 입증으로 납부된 계약금 전액 반환 및 위약금 판결 승소'
  },
  {
    id: 5,
    title: '채무자의 친인척 명의 부동산 허위 증여 사해행위 취소 및 원상회복 소송',
    countText: '채권자 대리 수행',
    statusText: '진행중',
    description: '강제집행을 해할 목적으로 고의 매매 계약을 가장한 사해행위를 입증하여 은닉 재산의 채무자 명의 복구 선제 조치'
  },
  {
    id: 6,
    title: '법률상 원인 없는 오송금 및 명의 도용 자금 1억 2천만 원 부당이득 반환',
    countText: '송금인 단독 소송',
    statusText: '인용완료',
    description: '상대방의 부당한 자금 보관 사실 및 금융 법률상 실익 없음을 증명하여 신속하게 예금 압류 및 반환 판결 조치'
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
              label: '금전채권',
              coreDiagnosis: '관련 실무: 대여금반환, 투자금반환, 구상금청구, 보증채무, 채권압류 및 추심, 지연손해금, 공탁금 출급',
              legalStrategy: '대여금 및 투자금 반환 등 정당한 채권을 확보하기 위해 치밀한 증거 분석과 신속한 보전처분으로 자산 회수 솔루션을 제공합니다.'
            },
            {
              id: 2,
              label: '상거래 계약',
              coreDiagnosis: '관련 실무: 가맹계약분쟁, 프랜차이즈 분쟁, 물품대금청구, 용역비정산, 계약해제·해지, 위약금 청구',
              legalStrategy: '가맹 및 물품대금 등 복잡한 상거래 분쟁에서 계약 해석의 우위를 점하고 전략적 대응을 통해 의뢰인의 비즈니스 실익을 극대화합니다.'
            },
            {
              id: 3,
              label: '동업계약',
              coreDiagnosis: '관련 실무: 수익배분 분쟁, 동업해지 및 청산, 정산금 청구, 동업자 탈퇴·제명, 투자금 반환, 동업계약서 정비',
              legalStrategy: '수익 배분 및 정산을 둘러싼 갈등 상황에서 객관적인 진단과 법률 분석을 바탕으로 투명하고 공정한 청산 및 분쟁 해결 전략을 제시합니다.'
            },
            {
              id: 4,
              label: '일반불법행위',
              coreDiagnosis: '관련 실무: 손해배상청구, 위자료청구, 명예훼손·모욕, 사생활 침해, 사용자 책임, 과실책임 입증',
              legalStrategy: '명예훼손 및 사생활 침해 등 불법행위로 인한 피해에 대해 인과관계를 명확히 입증하여 정당한 손해배상과 위자료를 이끌어냅니다.'
            },
            {
              id: 5,
              label: '소송절차',
              coreDiagnosis: '관련 실무: 가압류·가처분, 지급명령신청, 강제집행, 증거보전, 소장 작성 및 대응, 항소·상고, 소송비용 확정',
              legalStrategy: '가압류부터 소장 작성, 강제집행까지 민사소송 전 과정의 절차적 리스크를 완벽히 관리하여 판결 이후의 실효성까지 책임지고 케어합니다.'
            },
            {
              id: 6,
              label: '소멸시효',
              coreDiagnosis: '관련 실무: 채권 소멸시효 완성, 시효중단 조치, 상사시효, 단기소멸시효, 확정판결 시효연장',
              legalStrategy: '채권의 소멸시효 완성 여부를 정밀 진단하고 시효 중단 조치 및 연장 전략을 통해 사라질 뻔한 의뢰인의 소중한 권리를 안전하게 지켜드립니다.'
            }
          ]}
        />

        {/* 2.8. Verdict Proof Documents Grid (Gam-myeong reference style) */}
        <VerdictSection 
          kicker="승소, 결코 우연이 아닙니다"
          mainTitle="모두가 불가능하다고 했던 사건, 법무법인 플로우는 결과로 증명했습니다!"
          descText="데이터가 증명하는 압도적 실력"
          verdicts={[
            {
              id: 1,
              court: '서울중앙지방법원',
              caseNo: '2023가단51082',
              plaintiff: '원고 이XX (의뢰인)',
              orderText: '피고는 원고에게 차용 원금 1억 8천만 원 및 이에 대한 지연손해금을 즉각 지급하라.',
              stampText: '대여금 원금 전액 인용'
            },
            {
              id: 2,
              court: '서울동부지방법원',
              caseNo: '2023가합80491',
              plaintiff: '원고 정XX (동업자)',
              orderText: '피고는 동업 계약 해지에 따른 정산금으로 원고에게 3억 2천만 원을 지급하라.',
              stampText: '정산금 청구 완승'
            },
            {
              id: 3,
              court: '수원지방법원',
              caseNo: '2024가합10283',
              plaintiff: '원고 주식회사 XX (상인)',
              orderText: '피고의 불법행위 책임을 인정하며, 영업 손실액 2억 1천만 원을 원고에게 즉각 배상하라.',
              stampText: '불법행위 손배 인용'
            },
            {
              id: 4,
              court: '인천지방법원',
              caseNo: '2022가합30894',
              plaintiff: '원고 최XX (매수인)',
              orderText: '계약 해제에 따른 위약금이 부당하게 과다하므로 피고는 원고에게 계약금 8천만 원을 반환하라.',
              stampText: '계약 위약금 반환 성공'
            }
          ]}
        />



        {/* 4. Defect Cases Rolling */}
        <section className={styles.sectionCases}>
          <div className={styles.container}>
            
            <div className={styles.sectionHeader}>
              <h2 className={styles.panelTitle}>일반 민사 실시간 진행 현황</h2>
              <p className={styles.panelSubtitle}>
                전국 각지의 의뢰인들이 법무법인 플로우 민사 분쟁 전담 TF와 함께 소중한 재산과 권리를 완벽하게 되찾고 있습니다.
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
