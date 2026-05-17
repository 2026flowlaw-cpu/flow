"use client";

import React from 'react';
import ClassActionSuccess from '@/components/ClassActionSuccess/ClassActionSuccess';
import InquiryForm from '@/components/Location/InquiryForm/InquiryForm';
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

export default function DefectLitigationPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        
        {/* 1. Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroContentGrid}>
              
              <div className={styles.heroLeft}>
                <div className={styles.blueSquare}></div>
                <h1 className={styles.heroMainTitle}>
                  아파트·상가 하자소송
                  <span className={styles.titleSub}>신속하고 정밀하게, 승소로 설계합니다</span>
                </h1>
                <p className={styles.heroDescription}>
                  아파트 단지와 상가의 부실시공 및 하자는 입주민의 자산 가치와 안전을 위협합니다. <br />
                  법무법인 플로우는 자체 상주하는 <strong>건축구조기술사 직계 융합 TF</strong>를 통해 하자를 과학적으로 분석하고, 계산사 수행팀의 시너지를 결합해 단 한 치의 손해도 없이 완벽한 보상을 청구합니다.
                </p>
                <div className={styles.heroUrl}>www.flowlaw-defect.com</div>
              </div>

              <div className={styles.heroRight}>
                <div className={styles.glassCard}>
                  <h3 className={styles.glassCardTitle}>정밀 하자 감정</h3>
                  <p className={styles.glassCardDesc}>건축구조기술사 상주 및 첨단 계측 장비를 활용한 미세 하자 포착</p>
                </div>
                <div className={styles.glassCard}>
                  <h3 className={styles.glassCardTitle}>보증금 최대 증액</h3>
                  <p className={styles.glassCardDesc}>법원 감정 단계에서의 적극적 변론을 통한 하자보수보증금 극대화</p>
                </div>
                <div className={styles.glassCard}>
                  <h3 className={styles.glassCardTitle}>공용·전유 완벽 입증</h3>
                  <p className={styles.glassCardDesc}>단지 외벽, 지하 주차장부터 세대 내 결로, 균열까지 꼼꼼한 조사</p>
                </div>
                <div className={styles.glassCard}>
                  <h3 className={styles.glassCardTitle}>시공사 기망 단호 대응</h3>
                  <p className={styles.glassCardDesc}>설계도면과 다른 저가 자재 무단 교체 및 미시공 하자 단죄</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. Strengths Section */}
        <section className={styles.strengthWrapper}>
          <div className={styles.container}>
            <div className={styles.ivoryPanel}>
              
              <div className={styles.panelHeader}>
                <h2 className={styles.panelTitle}>하자소송, 왜 법무법인 플로우여야 하는가?</h2>
                <p className={styles.panelSubtitle}>
                  대기업 건설사와 보증기관을 상대로 한 소송은 일반적인 법리 주장만으로는 승소하기 어렵습니다. <br />
                  기술적 입증 능력과 탄탄한 소송 관리 시스템을 보유한 플로우가 귀하의 재산을 지켜드립니다.
                </p>
              </div>

              <div className={styles.designGrid}>
                <div className={styles.designCard}>
                  <div className={styles.cardAccentLine}></div>
                  <h4 className={styles.designCardTitle}>과학적 기술 감정</h4>
                  <p className={styles.designCardDesc}>
                    제휴 건축안전진단기관 및 자체 건축 엔지니어와의 상주 협업으로 눈에 보이지 않는 구조적 결함까지 정밀 감정합니다.
                  </p>
                </div>

                <div className={styles.designCard}>
                  <div className={styles.cardAccentLine}></div>
                  <h4 className={styles.designCardTitle}>판결 증액 계산사 전담</h4>
                  <p className={styles.designCardDesc}>
                    수년간의 판례 데이터를 기반으로 법원 감정인의 하자 평가액을 정교하게 검토 및 보완하여 소송 판결액을 대폭 증액시킵니다.
                  </p>
                </div>

                <div className={styles.designCard}>
                  <div className={styles.cardAccentLine}></div>
                  <h4 className={styles.designCardTitle}>투명한 실시간 소송 현황</h4>
                  <p className={styles.designCardDesc}>
                    동 대표 및 입주민 대표 회의와의 긴밀한 핫라인 소통망 구축으로 감정 일정, 재판 진행 상황을 투명하게 실시간 공개합니다.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. Success Stories Carousel */}
        <ClassActionSuccess />

        {/* 4. Defect Cases Rolling */}
        <section className={styles.sectionCases}>
          <div className={styles.container}>
            
            <div className={styles.sectionHeader}>
              <div className={styles.blueSquare}></div>
              <h2 className={styles.panelTitle}>하자소송 실시간 진행 현황</h2>
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
