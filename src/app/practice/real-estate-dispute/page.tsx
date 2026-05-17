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

export default function RealEstateDisputePage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        
        {/* 1. Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroContentGrid}>
              
              <div className={styles.heroLeft}>
                <h1 className={styles.heroMainTitle}>
                  부동산 분쟁,<br />
                  <span className={styles.goldHighlight}>법리만으로는</span> 부족합니다
                </h1>
                <div className={styles.heroSubtitles}>
                  <span className={styles.titleSub1}>수많은 이해관계와 복잡한 권리관계... 부동산소송은 단순하지 않습니다.</span>
                  <span className={styles.titleSub2}>법무법인 플로우는 갈등의 본질과 권리관계의 실체를 정확히 파악하여 여러분의 재산을 지킵니다.</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. Strengths & Promises (Hexagon & Count-up Section) */}
        <DefectPromise 
          kicker="NUMBERS & PROMISES"
          sectionTitle="부동산분쟁 특화 로펌 · 권리관계 분석 토탈 솔루션"
          sectionSubtitle="계약파기 · 임대차 · 권리금 · 하자담보책임 · 명도소송 등 각 사안마다 적용 법리와 대응 방식이 다르기 때문에 상황별 / 유형별 / 입장별 솔루션이 필요합니다."
          counters={[
            {
              id: 0,
              target: 3000,
              suffix: '건+',
              title: '부동산 분쟁 수행 및 자문 건수',
              desc: '소송, 조정, 합의를 아우르는 풍부한 자문 및 소송 수행 실적'
            },
            {
              id: 1,
              target: 25,
              suffix: '년+',
              title: '부동산 전문 TF팀',
              desc: '변호사, 세무사, 공인중개사가 유기적으로 결합된 완벽한 솔루션'
            },
            {
              id: 2,
              target: 100,
              suffix: '%',
              title: '현장 중심의 정밀 분석',
              desc: '실제 현장을 직접 확인하고 입체적 분석을 기반으로 실질적인 해결책을 제시합니다.'
            },
            {
              id: 3,
              target: 3,
              suffix: '대 핵심 전략',
              title: '입체적 분쟁 솔루션',
              desc: '말이 통하는 전문가단이 예기치 못한 모든 변수까지 완벽하게 대비합니다.'
            }
          ]}
          promises={[
            {
              id: 0,
              title: '부동산 분쟁 특화 로펌',
              desc: '계약파기, 임대차 분쟁, 권리금 반환 등 정밀한 권리관계 분석을 통해 법률 분쟁을 실질적이고 명쾌하게 해결합니다.',
              iconType: 'lawyer'
            },
            {
              id: 1,
              title: '상황별 최적 솔루션',
              desc: '임대인과 임차인, 매도인과 매수인 등 각 의뢰인이 처한 사안에 알맞은 정교한 법리적 협상 및 변론을 가동합니다.',
              iconType: 'tech'
            },
            {
              id: 2,
              title: '유형별 정밀 대처',
              desc: '명도소송, 하자담보책임 등 소송 유형에 따라 오랜 기간 축적해 온 최적의 승소 가이드라인을 제공합니다.',
              iconType: 'twotrack'
            },
            {
              id: 3,
              title: '입장별 밀착 변론',
              desc: '의뢰인의 처한 환경과 입장을 최우선으로 고려하며, 다각적인 사실관계 검토로 소중한 재산과 권리를 철저하게 지켜냅니다.',
              iconType: 'custom'
            }
          ]}
        />

        {/* 2.5. Specialized Defect Cases Pill Grid (Image 1 layout) */}
        <DefectCasesGrid 
          kicker="LAW FIRM FLOW"
          mainTitle="부동산분쟁 특화 로펌 · 권리관계 분석 토탈 솔루션"
          descLines={[
            '계약파기 · 임대차 · 권리금 · 하자담보책임 · 명도소송 등',
            '각 사안마다 적용 법리와 대응 방식이 다르기 때문에',
            '상황별 / 유형별 / 입장별 솔루션이 필요합니다.'
          ]}
          difficultyTitle="* 현재 어떤 부동산 법률 분쟁으로 고민하고 계신가요?"
          difficultySubtitle="법무법인 플로우 부동산 TF팀은 모든 성공 사례를 축적하고 있습니다."
          customCases={[
            {
              id: 1,
              label: '계약 해제 및 해지',
              coreDiagnosis: '가계약금 지급 후 단순 변심 파기, 일방적 중도금 입금 전 해제 등 해약금 해제 조항과 약정 해제 요건을 면밀히 분석해야 정밀한 권리 보전이 가능합니다.',
              legalStrategy: '이행 착수 시점(중도금 지급 등)을 입증하여 상대방의 부당한 일방 계약 파기를 무력화하고, 귀책사유에 따른 계약 해제 및 손해배상(위약금 청구)을 적법하게 수행합니다.'
            },
            {
              id: 2,
              label: '상가 권리금 소송',
              coreDiagnosis: '상가임대차보호법에 규정된 임차인의 권리금 회수 기회를 임대인이 방해한 경우, 명확한 신규 임차인 주선 행위와 방해 행위의 인과관계를 객과적으로 입증해야 합니다.',
              legalStrategy: '계약 만료 6개월 전부터 신규 임차인을 적극 주선한 과정과 임대인의 거절 의사를 채록/증거화하여 대법원 판례 기준에 입각한 정당한 권리금 상당 손해배상액을 산정하여 청구합니다.'
            },
            {
              id: 3,
              label: '임대차 보증금 반환',
              coreDiagnosis: '임대인의 연락 두절, 임대차 목적물의 경매 개시, 임대인의 신규 분양 보증금 미반환 등 시급을 다투는 보증금 미반환 사건은 권리 보존 조치가 최우선되어야 합니다.',
              legalStrategy: '적법한 계약 해지 통보(내용증명, 문자 등) 후 즉각 임차권등기명령을 신청하여 우선변제권과 대항력을 유지하고, 보증금 반환 청구 소송과 함께 강제경매 및 임대인 재산 가압류를 신속하게 단행합니다.'
            },
            {
              id: 4,
              label: '상가 제소전화해',
              coreDiagnosis: '제소전화해는 체결 시 확정판결과 동일한 효력이 있으므로, 사전에 독소조항을 차단하지 않으면 향후 임대인의 부당한 조치에 무방비로 강제집행을 당할 위험이 큽니다.',
              legalStrategy: '강행법규 위반(예: 3기 차임 연체 전 해지 불가 등) 조항을 정밀 모니터링하여 법원 심사 단계에서 기각/보정 명령이 나오지 않도록 조율하고, 조서 작성부터 확정 단계까지 대리 조력합니다.'
            },
            {
              id: 5,
              label: '토지 경계 및 인도',
              coreDiagnosis: '인접 토지의 무단 점유, 경계 침범으로 인한 담장 설치 등 경계 침범 분쟁은 점유취득시효(20년) 완성 여부와 자주점유 추정 번복 여부가 핵심 쟁점입니다.',
              legalStrategy: '정밀 지적측량 결과를 기반으로 무단 침범 부위의 면적을 특정하고, 상대방의 타주점유(경계 침범 인지 등)를 입증하여 장벽 철거 및 토지 인도 청구와 부당이득반환(임료) 소송을 성공시킵니다.'
            },
            {
              id: 6,
              label: '부동산 명도 소송',
              coreDiagnosis: '임대차 종료, 차임 연체에도 불구하고 무단 점유 중인 임차인을 내보내는 명도 소송은 점유 이전을 원천 차단하는 보전 처분이 수반되지 않으면 판결문이 무용지물이 될 수 있습니다.',
              legalStrategy: '소제기 전 최우선으로 부동산점유이전금지가처분을 신청/집행하여 제3자로의 무단 명의 변경을 차단하고, 축적된 명도 판결 노하우를 가동해 빠르고 적법한 명도 강제집행 절차까지 대리합니다.'
            },
            {
              id: 7,
              label: '매매 하자담보책임',
              coreDiagnosis: '부동산 매매 계약 이후 목적물에 중대한 하자(누수, 균열, 지반 침하 등)가 발견되었을 때 매도인의 무과실 책임인 하자담보책임을 묻는 사건입니다.',
              legalStrategy: '하자 안 날로부터 6개월 이내에 권리를 행사해야 하므로 즉시 내용증명을 발송하고, 감정 평가를 통해 하자의 보수 가능성 유무에 따라 계약 해제 또는 대금 감액 및 보수 비용 청구를 수행합니다.'
            },
            {
              id: 8,
              label: '부동산 사해행위',
              coreDiagnosis: '채무자가 채권자를 해할 의도로 유일한 재산인 부동산을 타인에게 증여하거나 허위 매매하는 등 적극적 처분 행위로 채권 회수를 불가능하게 만든 분쟁입니다.',
              legalStrategy: '채무자와 수익자 간의 악의성(사해의사)을 입증하여 부동산 매매/증여 계약을 취소시키고, 원상회복으로서 명의를 채무자 앞으로 돌려놓아 채권자의 강제집행 재원을 확실히 보전합니다.'
            },
            {
              id: 9,
              label: '공유물분할 소송',
              coreDiagnosis: '공동 상속 또는 공동 투자로 취득한 공유 부동산에 대해 소유자 간 분할 협의가 결렬된 경우, 공유자 1인의 청구로 법원의 판결을 통해 공유 관계를 강제로 정리해야 합니다.',
              legalStrategy: '부동산의 현황, 가치, 이용 상태에 맞춰 현물분할 또는 대금분할(경매) 방식 중 의뢰인에게 가장 극대화된 이익을 보장하는 최선의 현금화 및 분할 비율을 관철시킵니다.'
            },
            {
              id: 10,
              label: '공인중개사 책임',
              coreDiagnosis: '중개대상물의 선순위 권리관계나 세금 체납, 근저당 한도 등을 허위로 고지하거나 누락하여 임차인 또는 매수인에게 회복 불가능한 손해를 입힌 사건입니다.',
              legalStrategy: '공인중개사법상 확인·설명의무 위반을 입증하여 중개업자 본인에 대한 손해배상청구 소송을 진행하고, 한국공인중개사협회 공제금 청구를 통해 실질적인 손해배상금을 변제받습니다.'
            },
            {
              id: 11,
              label: '상가 권리 의무 양도',
              coreDiagnosis: '상가 및 사업체 포괄 양도양수 계약 과정에서 발생한 매출 조작 기망, 행정처분 누락 등 신의칙상 고지의무 위반 및 부당이득 청구 분쟁입니다.',
              legalStrategy: '영업 장부 및 세무 신고 내역 조차를 다각적으로 분석하여 기망 행위를 명확히 규명하고, 계약 해제에 따른 양도대금 전액 반환 및 위약금/손해배상 판결을 성공시킵니다.'
            },
            {
              id: 12,
              label: '집합건물 관리단 분쟁',
              coreDiagnosis: '오피스텔, 지식산업센터, 대형 상가 등에서 발생하는 무단 관리비 징수, 적법하지 않은 관리인 선임 및 관리규약 개정에 따른 구분소유자 간 극심한 법률적 대립입니다.',
              legalStrategy: '집합건물법 요건에 의거하여 관리단 집회의 하자를 규명하고, 관리인 직무집행정지가처분 및 결의 무효 확인 소송을 단행하여 상가 행정 및 소유권 지분을 합법적으로 원상 복구시킵니다.'
            }
          ]}
        />

        {/* 2.8. Verdict Proof Documents Grid (Gam-myeong reference style) */}
        <VerdictSection />



        {/* 4. Defect Cases Rolling */}
        <section className={styles.sectionCases}>
          <div className={styles.container}>
            
            <div className={styles.sectionHeader}>
              <h2 className={styles.panelTitle}>부동산 실시간 진행 현황</h2>
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
