import React, { useState } from 'react';
import styles from './ClassActionCases.module.css';

interface CaseItem {
  id: number;
  title: string;
  countText: string;
  statusText: string;
  description: string;
}

const ClassActionCases = () => {
  // Live toggle state for high-fidelity interactive feel
  const [toggleStates, setToggleStates] = useState<{ [key: number]: boolean }>({
    1: true,
    2: true,
    3: true
  });

  const handleToggle = (id: number) => {
    setToggleStates((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const activeCases: CaseItem[] = [
    {
      id: 1,
      title: '인천 ㅇㅇㅇ 지역주택조합 부당이득금반환청구',
      countText: '412명 소제기',
      statusText: '추가 모집중',
      description: '인천 ㅇㅇㅇ 지역주택조합 허위·과장 광고 및 사업 지연에 따른 분양 납입금 반환 소송단 모집'
    },
    {
      id: 2,
      title: '천안 ㅇㅇㅇ 아파트 입주지연 분양계약해제',
      countText: '285명 소제기',
      statusText: '1차 마감임박',
      description: '시공사 사정으로 인한 대규모 입주 지연 사태에 따른 계약 취소 및 지연 위약금 청구 집단 소송'
    },
    {
      id: 3,
      title: '광주 ㅇㅇㅇ 상가 설계변경에 따른 손해배상',
      countText: '154명 소제기',
      statusText: '실시간 접수중',
      description: '가맹본사 및 분양 대행사의 무단 설계 변경 및 상가 면적 축소에 따른 차액 손해배상 청구'
    }
  ];

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
          
          {/* Left Column: 3 active cases with interactive toggles */}
          <div className={styles.leftCol}>
            {activeCases.map((item) => (
              <div 
                key={item.id} 
                className={`${styles.caseCard} ${toggleStates[item.id] ? styles.activeCard : ''}`}
                onClick={() => handleToggle(item.id)}
              >
                <div className={styles.cardContent}>
                  <div className={styles.cardTitleRow}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <span className={styles.countBadge}>
                      {item.countText}, <span className={styles.statusHighlight}>{item.statusText}</span>
                    </span>
                  </div>
                  <p className={styles.cardDesc}>{item.description}</p>
                </div>

                {/* IOS-style toggle switch */}
                <div className={styles.toggleWrapper}>
                  <div className={`${styles.switch} ${toggleStates[item.id] ? styles.switchOn : ''}`}>
                    <div className={styles.switchHandle}></div>
                  </div>
                </div>
              </div>
            ))}
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
                    <strong className={styles.closedTitle}>평택 ㅇㅇㅇ 지식산업센터 분양계약취소 집단소송</strong>
                    <span className={styles.closedMeta}>모집 완료 (1,240명 소제기 완료)</span>
                  </div>
                </div>

                {/* Case 2 */}
                <div className={styles.closedCaseRow}>
                  <div className={styles.closedDot}></div>
                  <div className={styles.closedCaseInfo}>
                    <strong className={styles.closedTitle}>용인 ㅇㅇㅇ 아파트 할인분양 손해배상청구</strong>
                    <span className={styles.closedMeta}>모집 완료 (980명 소제기 완료)</span>
                  </div>
                </div>

                {/* Case 3 */}
                <div className={styles.closedCaseRow}>
                  <div className={styles.closedDot}></div>
                  <div className={styles.closedCaseInfo}>
                    <strong className={styles.closedTitle}>수원 ㅇㅇㅇ 재개발 아파트 등기지연 손해배상청구</strong>
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
