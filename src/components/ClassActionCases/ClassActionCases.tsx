import React from 'react';
import styles from './ClassActionCases.module.css';

interface CaseItem {
  id: number;
  title: string;
  countText: string;
  statusText: string;
  description: string;
}

const scrollingCases: CaseItem[] = [
  {
    id: 1,
    title: '평택 XXX 지식산업센터 분양계약취소 집단소송',
    countText: '1,240명 참여',
    statusText: '모집완료',
    description: '지식산업센터 분양 기망행위 규명 및 분양대금 전액 반환 청구 소송단'
  },
  {
    id: 2,
    title: '용인 XXX 아파트 할인분양 손해배상청구',
    countText: '980명 참여',
    statusText: '모집완료',
    description: '미분양 세대 무단 소급 할인 분양에 따른 수분양자 자산가치 하락 보상'
  },
  {
    id: 3,
    title: '수원 XXX 재개발 아파트 등기지연 손해배상청구',
    countText: '850명 참여',
    statusText: '모집완료',
    description: '조합 및 시공사 분쟁으로 인한 소유권 보존등기 지연 피해 배상 청구'
  },
  {
    id: 4,
    title: '인천 XXX 지역주택조합 부당이득금반환청구',
    countText: '412명 소제기',
    statusText: '모집중',
    description: '지역주택조합 허위 광고 및 조합원 가입 대금 전액 부당이득금 반환 소송'
  },
  {
    id: 5,
    title: '천안 XXX 입주지연 분양계약해제 집단소송',
    countText: '285명 소제기',
    statusText: '모집중',
    description: '입주 지정일 지연에 따른 정당한 분양 계약 취소 및 지연 위약금 청구'
  },
  {
    id: 6,
    title: '광주 XXX 상가 설계변경에 따른 손해배상',
    countText: '154명 소제기',
    statusText: '모집중',
    description: '상가 동의 없는 무단 설계 변경 및 분양 면적 임의 감소 손해배상 청구'
  }
];

const ClassActionCases = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.blueSquare}></div>
          <h2 className={styles.sectionTitle}>주요 진행 사건 현황</h2>
          <p className={styles.sectionSubtitle}>
            집단소송 TF팀 구성 & 압도적 조직력과 전문성! <br />
            <strong>5,000명 이상의 의뢰인</strong>이 증명하는 실력! 여러분도 권리를 찾을 수 있습니다.
          </p>
        </div>

        {/* 2-Column Grid Layout */}
        <div className={styles.grid}>
          
          {/* Left Column: ENDLESS VERTICAL ROLLING CASES (사건이 위로 올라가는 느낌) */}
          <div className={styles.leftCol}>
            <div className={styles.verticalMarqueeWrapper}>
              <div className={styles.verticalMarqueeTrack}>
                
                {/* 1st copy of cases */}
                {scrollingCases.map((item) => {
                  const key = `${item.id}-orig`;
                  const isCompleted = item.statusText === '모집완료';
                  return (
                    <div 
                      key={key} 
                      className={`${styles.caseCard} ${isCompleted ? styles.completedCard : ''}`}
                    >
                      <div className={styles.cardContent}>
                        <div className={styles.cardTitleRow}>
                          <h3 className={styles.cardTitle}>{item.title}</h3>
                          <span className={styles.countBadge}>
                            {item.countText}, <span className={isCompleted ? styles.statusClosed : styles.statusHighlight}>{item.statusText}</span>
                          </span>
                        </div>
                        <p className={styles.cardDesc}>{item.description}</p>
                      </div>
                    </div>
                  );
                })}

                {/* 2nd copy of cases for seamless vertical loop */}
                {scrollingCases.map((item) => {
                  const key = `${item.id}-dup`;
                  const isCompleted = item.statusText === '모집완료';
                  return (
                    <div 
                      key={key} 
                      className={`${styles.caseCard} ${isCompleted ? styles.completedCard : ''}`}
                    >
                      <div className={styles.cardContent}>
                        <div className={styles.cardTitleRow}>
                          <h3 className={styles.cardTitle}>{item.title}</h3>
                          <span className={styles.countBadge}>
                            {item.countText}, <span className={isCompleted ? styles.statusClosed : styles.statusHighlight}>{item.statusText}</span>
                          </span>
                        </div>
                        <p className={styles.cardDesc}>{item.description}</p>
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>
            
            <div className={styles.marqueeNotice}>
              * 사건 카드에 마우스를 올리시면(Hover) 위로 올라가는 롤링이 일시정지됩니다.
            </div>
          </div>

          {/* Right Column: Dark navy status overview banner */}
          <div className={styles.rightCol}>
            <div className={styles.navyPanel}>
              {/* Decorative wireframe background watermark */}
              <div className={styles.panelWatermark}>
                <svg width="240" height="240" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                  <path d="M12 6V18" />
                  <path d="M6 12H18" />
                </svg>
              </div>

              <div className={styles.panelHeader}>
                <h4 className={styles.panelTitle}>성공적 소송단 모집 완료 사례</h4>
                <p className={styles.panelSubtitle}>법무법인 플로우가 증명한 압도적인 결집 사례입니다.</p>
              </div>

              <div className={styles.closedCaseList}>
                {/* Case 1 */}
                <div className={styles.closedCaseRow}>
                  <div className={styles.closedDot}></div>
                  <div className={styles.closedCaseInfo}>
                    <strong className={styles.closedTitle}>평택 XXX 지식산업센터 분양계약취소 집단소송</strong>
                    <span className={styles.closedMeta}>모집 완료 (1,240명 소제기 완료)</span>
                  </div>
                </div>

                {/* Case 2 */}
                <div className={styles.closedCaseRow}>
                  <div className={styles.closedDot}></div>
                  <div className={styles.closedCaseInfo}>
                    <strong className={styles.closedTitle}>용인 XXX 아파트 할인분양 손해배상청구</strong>
                    <span className={styles.closedMeta}>모집 완료 (980명 소제기 완료)</span>
                  </div>
                </div>

                {/* Case 3 */}
                <div className={styles.closedCaseRow}>
                  <div className={styles.closedDot}></div>
                  <div className={styles.closedCaseInfo}>
                    <strong className={styles.closedTitle}>수원 XXX 재개발 아파트 등기지연 손해배상청구</strong>
                    <span className={styles.closedMeta}>모집 완료 (850명 소제기 완료)</span>
                  </div>
                </div>
              </div>

              <div className={styles.divider}></div>

              {/* Bottom Shinmoongo Banner */}
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
                    <h5 className={styles.shinmoongoTitle}>집단소송 신문고 운영</h5>
                    <span className={styles.shinmoongoSubtitle}>무료 구조 및 권리 침해 진단 서비스</span>
                  </div>
                </div>
                <p className={styles.shinmoongoDesc}>
                  유사한 집단 피해를 겪고 있으나 대처 방안을 찾지 못한 경우, 플로우 집단소송 신문고에 피해 사실을 제보해 주시면 즉각 분석 및 특화 솔루션을 제공해 드립니다.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ClassActionCases;
