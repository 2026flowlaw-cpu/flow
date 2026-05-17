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

export default function EduLawPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        
        {/* 1. Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroContentGrid}>
              
              <div className={styles.heroLeft}>
                <h1 className={styles.heroMainTitle}>
                  학원 문제는<br />
                  <span className={styles.goldHighlight}>학원전문변호사</span>에게
                </h1>
                <div className={styles.heroSubtitles}>
                  <span className={styles.titleSub1}>학원업계 특성에 기반한 맞춤 솔루션!</span>
                  <span className={styles.titleSub2}>학원전문변호사라 가능합니다. 법무법인 플로우이기에 가능합니다.</span>
                </div>
                <p className={styles.heroDescription}>
                  학원 설립 및 인허가, 강사 고용·계약서 분쟁, 학원 권리금 및 동업 갈등부터 지식재산권 보호까지 학원 운영의 전 과정에서 발생하는 법률 리스크를 선제적으로 진단하고 해결합니다. 학원 산업의 독특한 생태계와 메커니즘을 완벽하게 이해하는 전담 TF가 의뢰인의 소중한 교육 사업을 안전하게 조력합니다.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 2. Strengths & Promises (Hexagon & Count-up Section) */}
        <DefectPromise 
          sectionTitle="법무법인 플로우 에듀법률센터의 압도적 실력"
          sectionSubtitle="학원업계의 독특한 사업 구조와 법적 리스크를 완벽하게 꿰뚫어 보며, 신속하고 영민한 대처로 원장님의 소중한 교육 사업을 안전하게 보호합니다."
          counters={[
            {
              id: 0,
              target: 1000,
              suffix: '건+',
              title: '학원 사건 수행 건수',
              desc: '설립, 노무, 양도양수, 형사 고발까지 축적된 압도적 소송 데이터'
            },
            {
              id: 1,
              target: 1,
              suffix: '개 전문센터',
              title: '에듀법률센터 별도 운영',
              desc: '학원 행정 및 분쟁 해결만을 위해 조직된 전문 브랜드'
            },
            {
              id: 2,
              target: 1,
              suffix: '팀 전담 가동',
              title: '학원분쟁 전담 TF팀 조직',
              desc: '법률 분석팀과 노무 연계 시스템이 상시 연대하여 신속 방어'
            },
            {
              id: 3,
              target: 100,
              suffix: '% 직행 상담',
              title: '강남학원연합회 자문변호사',
              desc: '강남구 학원연합회 공식 자문을 직접 수행 중인 변호사가 직접 담당'
            }
          ]}
          promises={[
            {
              id: 0,
              title: '학원전문변호사 책임 상담',
              desc: '강남구 학원연합회 공식 자문변호사 등 학원/에듀 법률 분야의 독보적 실무 경력을 지닌 전담 변호사가 외주 없이 100% 밀착하여 소통합니다.',
              iconType: 'lawyer'
            },
            {
              id: 1,
              title: '에듀 특화 전담 TF팀 가동',
              desc: '설립 인허가, 교육청 행정조치, 강사 노무 계약, 동업 해지 정산금 및 형사 대응까지 원스톱으로 명쾌한 솔루션을 제공합니다.',
              iconType: 'tech'
            },
            {
              id: 2,
              title: '운영 맞춤형 컨설팅',
              desc: '학원 양도양수 권리금 보전, 허위 광고 및 명예훼손, 학파라치(무신고 포상금) 대응 등 학원 운영 현장 맞춤형 솔루션 패키지를 가동합니다.',
              iconType: 'custom'
            },
            {
              id: 3,
              title: '철저한 영업권 및 지식재산 보호',
              desc: '강사의 무단 수강생 스카웃, 학원 상표권 및 교육 교재 무단 도용, 가맹 프랜차이즈 계약 해지 갈등 등에서 원장님의 영업권을 완벽히 수호합니다.',
              iconType: 'custom'
            }
          ]}
        />

        {/* 2.5. Specialized Defect Cases Pill Grid (Image 1 layout) */}
        <DefectCasesGrid 
          kicker="학원분쟁 특화 로펌 · 교육업계 맞춤형 토탈 솔루션"
          mainTitle="학원의 특수성과 생리를 알아야 이깁니다"
          descLines={[
            '학원가는 여타 업종과는 달리 특수한 관행과 생리가 지배하는 공간입니다.',
            '학원 운영과 생존을 고민하는 원장님부터, 자신의 가치와 권리를 지키고자 하는 강사님까지',
            '법무법인 플로우를 찾아주시는 이유, 남다른 실전 노하우 때문입니다.'
          ]}
          difficultyTitle="* 현재 학원 운영에 어떤 어려움이 있으신가요?"
          difficultySubtitle="법무법인 플로우 에듀TF는 모든 학원 분쟁 분과별 데이터베이스를 보유하고 있습니다."
          reportSubtitle="법무법인 플로우(FLOW) 학원·에듀 서비스 상세 안내서"
          diagnosisLabel="주요 세부 쟁점"
          diagnosisEnglishLabel="Key Issues"
          diagnosisBadge="ISSUES"
          legalStrategyLabel="제공 서비스 내용"
          legalStrategyEnglishLabel="Provided Services"
          legalStrategyBadge="SERVICES"
          customCases={[
            {
              id: 1,
              label: '학원 운영',
              coreDiagnosis: '세부 쟁점: 학원법률자문·컨설팅, 학원법위반, 과태료, 행정처분, 학원인수합병, 교육청 점검 대응 등',
              legalStrategy: '학원법위반 리스크를 사전 점검하고 행정처분에 대비할 수 있도록 학원 맞춤 법률 컨설팅 서비스를 제공합니다.'
            },
            {
              id: 2,
              label: '인사/노무 갈등',
              coreDiagnosis: '세부 쟁점: 부당해고, 부당징계, 임금체불, 노동청진정, 노동청조사, 무단퇴사, 직장내괴롭힘 등',
              legalStrategy: '원내 인사/노무 체계의 취약점을 진단하고 현행 노동법에 기반한 실무 자문을 제공합니다.'
            },
            {
              id: 3,
              label: '경업금지',
              coreDiagnosis: '세부 쟁점: 경쟁학원 이직, 경업금지약정, 경업금지위반, 전속계약위반, 강의금지가처분, 위약금·위약벌 등',
              legalStrategy: '강사 이직 및 전원 과정에서 문제가 되는 경업금지 약정의 효력과 범위를 정밀 진단하여, 학원의 영업권 보호 및 강사의 권익 보호를 위한 전략적 대응을 제안합니다.'
            },
            {
              id: 4,
              label: '퇴직금',
              coreDiagnosis: '세부 쟁점: 학원강사 근로자성, 3.3% 프리랜서 강사 퇴직금, 비율제강사 퇴직금, 사업소득세, 대표이사 퇴직금 등',
              legalStrategy: '비율제/프리랜서 강사의 근로자성 여부를 객관적으로 검토하고, 퇴직금 지급 의무와 수령 권리에 대한 명쾌한 솔루션을 제안합니다.'
            },
            {
              id: 5,
              label: '동업 및 권리금',
              coreDiagnosis: '세부 쟁점: 학원양도양수, 학원권리금, 학원가맹계약해지, 동업해지 및 청산, 동업자 퇴직금 등',
              legalStrategy: '학원 인수·양도양수·동업해지 및 학원가맹계약 관련 종합법률 서비스를 제공합니다.'
            },
            {
              id: 6,
              label: '형사 분쟁',
              coreDiagnosis: '세부 쟁점: 학원 명예훼손, 업무방해, 부정경쟁방지법위반, 저작권 침해, 아동학대, 학원 내 성범죄, 횡령·배임 등',
              legalStrategy: '업무방해, 저작권 침해, 부정경쟁행위, 아동학대, 성범죄 사건 등 학원 내 특수한 형사사건에 대한 최적의 솔루션을 제안합니다.'
            }
          ]}
        />

        {/* 2.8. Verdict Proof Documents Grid (Gam-myeong reference style) */}
        <VerdictSection />



        {/* 4. Defect Cases Rolling */}
        <section className={styles.sectionCases}>
          <div className={styles.container}>
            
            <div className={styles.sectionHeader}>
              <h2 className={styles.panelTitle}>에듀 실시간 진행 현황</h2>
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
