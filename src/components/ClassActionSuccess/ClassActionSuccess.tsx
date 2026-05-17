import React from 'react';
import styles from './ClassActionSuccess.module.css';

const caseList = [
  { type: '동기지연', title: '인천 ㅇㅇ 아파트 동기지연 손해배상청구', court: '인천지법 2024가단297***' },
  { type: '매매대금반환', title: '세종시 ㅇㅇ상가 분양계약 관련 매매대금반환', court: '서울고법 2022나2037***' },
  { type: '하자소송', title: '당동 ㅇㅇ 아파트 하자소송', court: '서울중앙지법 2024가합115***' },
  { type: '하자소송', title: '논산 ㅇㅇ 아파트 하자소송', court: '서울중앙지법 2023가합96***' },
  { type: '분양계약해제', title: '인천 ㅇㅇ 생활형숙박시설 부당이득반환청구', court: '서울중앙지법 2020가합570***' },
  { type: '일조권침해', title: '광주 ㅇㅇ 일조권침해 손해배상', court: '광주지법 2023가합50***' },
  { type: '하자소송', title: '강릉 ㅇㅇ 아파트 하자소송', court: '서울중앙지법 2023가단5320***' },
  { type: '분양계약해제', title: '세종 ㅇㅇ 근린생활시설 분양계약해제', court: '수원지법 2022가합21***' }
];

const judgments = [
  {
    court: '인천지방법원',
    caseNo: '2024가단297*** 손해배상(기)',
    plaintiff: '김** 외 142명',
    defendant: '주식회사 **디앤씨',
    order: '1. 피고는 원고들에게 각 기재된 지연손해금 및 배상금을 지급하라.\n2. 소송비용은 피고가 부담한다.',
    stamp: '동기지연\n손해배상 승소'
  },
  {
    court: '서울고등법원',
    caseNo: '2022나2037*** 매매대금반환',
    plaintiff: '이** 외 87명',
    defendant: '주식회사 **개발',
    order: '1. 피고의 항소를 기각한다.\n2. 항소비용은 피고가 부담한다.',
    stamp: '세종 상가\n대금반환 승소'
  },
  {
    court: '서울중앙지방법원',
    caseNo: '2024가합115*** 하자보수청구',
    plaintiff: '당동 ㅇㅇ아파트 입주자대표회의',
    defendant: '주식회사 **건설',
    order: '1. 피고는 원고에게 하자보수에 갈음한 손해배상금 15억 원을 지급하라.',
    stamp: '하자소송\n15억 보상 판결'
  },
  {
    court: '서울중앙지방법원',
    caseNo: '2023가합96*** 하자보수보증금',
    plaintiff: '논산 ㅇㅇ아파트 입주자대표회의',
    defendant: '건설공제조합',
    order: '1. 피고는 원고에게 9억 8천만 원 및 이에 대한 지연손해금을 지급하라.',
    stamp: '하자소송\n9.8억 승소'
  },
  {
    court: '서울중앙지방법원',
    caseNo: '2020가합570*** 부당이득반환',
    plaintiff: '박** 외 54명',
    defendant: '주식회사 **신탁',
    order: '1. 원고들과 피고 사이에 체결된 분양계약을 모두 해제한다.\n2. 피고는 기납부 대금을 반환하라.',
    stamp: '생활형숙박시설\n계약해제/전액반환'
  },
  {
    court: '광주지방법원',
    caseNo: '2023가합50*** 일조권침해배상',
    plaintiff: '정** 외 33명',
    defendant: '주식회사 **주택',
    order: '1. 피고는 일조권 침해로 인한 정신적/재산적 손해배상금 총 6억 원을 원고들에게 지급하라.',
    stamp: '일조권 침해\n손해배상 승소'
  },
  {
    court: '서울중앙지방법원',
    caseNo: '2023가단5320*** 하자보수배상',
    plaintiff: '강릉 ㅇㅇ아파트 입주자대표회의',
    defendant: '주식회사 **종합건설',
    order: '1. 피고는 원고에게 4억 2천만 원을 지급하라.',
    stamp: '하자소송\n4.2억 조정 성립'
  },
  {
    court: '수원지방법원',
    caseNo: '2022가합21*** 분양계약해제',
    plaintiff: '최** 외 21명',
    defendant: '주식회사 **산업개발',
    order: '1. 기망으로 인한 분양계약 취소를 인정한다.\n2. 피고는 계약금을 전액 반환하라.',
    stamp: '근린생활시설\n계약취소/반환'
  }
];

const ClassActionSuccess = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        
        {/* Two Column Unified Layout */}
        <div className={styles.mainGrid}>
          
          {/* Left Column: 집단소송 주요 수행사례 리스트 */}
          <div className={styles.leftCol}>
            <div className={styles.header}>
              <span className={styles.kicker}>BUSINESS CASE</span>
              <h2 className={styles.title}>집단소송 주요 수행사례</h2>
              <p className={styles.subtitle}>
                전국 각지에서 축적한 다년간의 분야별 소송 노하우와 압도적인 실적 데이터로 증명합니다.
              </p>
            </div>

            {/* List View */}
            <div className={styles.caseListContainer}>
              {caseList.map((item, idx) => (
                <div key={idx} className={styles.caseRow}>
                  <span className={styles.caseTag}>{item.type}</span>
                  <div className={styles.caseInfo}>
                    <strong className={styles.caseTitle}>{item.title}</strong>
                    <span className={styles.caseCourt}>{item.court}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 성공사례 판결문 롤링 카루셀 */}
          <div className={styles.rightCol}>
            <div className={styles.carouselHeader}>
              <span className={styles.carouselKicker}>DECISION DOCUMENTS</span>
              <h3 className={styles.carouselTitle}>실제 법원 판결문</h3>
              <p className={styles.carouselSubtitle}>
                투명하게 입증된 주문과 판결 결과를 통해 소송 승률을 예측합니다.
              </p>
            </div>

            {/* Infinite Horizontal Scrolling Marquee (판결문 옆으로 롤링되는 연출) */}
            <div className={styles.marqueeWrapper}>
              <div className={styles.marqueeTrack}>
                {/* Double arrays for perfect loop seamless scroll */}
                {[...judgments, ...judgments].map((item, idx) => (
                  <div key={idx} className={styles.documentCard}>
                    <div className={styles.docHeader}>
                      <span className={styles.docCourt}>{item.court}</span>
                      <span className={styles.docSub}>민사부 판결</span>
                    </div>
                    <div className={styles.docBody}>
                      <div className={styles.docLine}><span className={styles.docLabel}>사 건</span> {item.caseNo}</div>
                      <div className={styles.docLine}><span className={styles.docLabel}>원 고</span> {item.plaintiff}</div>
                      <div className={styles.docLine}><span className={styles.docLabel}>피 고</span> {item.defendant}</div>
                      <div className={styles.docDivider}></div>
                      <div className={styles.docLineBold}>주 문</div>
                      <p className={styles.docOrderText}>{item.order}</p>
                    </div>
                    
                    {/* Premium Red Stamp Overlay */}
                    <div className={styles.stamp}>
                      <div className={styles.stampInner}>{item.stamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.rollingNotice}>
              * 판결문 카드에 마우스를 올리시면(Hover) 롤링이 일시정지됩니다.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ClassActionSuccess;
