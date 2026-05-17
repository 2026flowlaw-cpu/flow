"use client";

import React from 'react';
import styles from './DefectStrategyGrid.module.css';

interface StrategyItem {
  id: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export default function DefectStrategyGrid() {
  const strategies: StrategyItem[] = [
    {
      id: 1,
      title: '건설전문변호사 직접 상담',
      desc: '건축공학전공 건설전문변호사가 하자상태를 정밀 진단하고 합리적인 해법을 제안합니다.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      )
    },
    {
      id: 2,
      title: '건설전문 기술진 협업 대응',
      desc: '단순 법리 주장을 넘어 건설 전문 기술 인력과의 협업을 통해 하자 발생의 원인과 시공사의 책임 소재를 객관적으로 입증합니다.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      )
    },
    {
      id: 3,
      title: '철저한 실태조사',
      desc: '법에서 규정한 객관적 하자 외 주관적하자에 속하는 부분까지(분양계약위반, 허위/과장광고, 준공도면대비 하향/변경시공 등) 철저히 실태조사하여 하자소송에 반영합니다.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      )
    },
    {
      id: 4,
      title: '입주민 비용 부담 최소화',
      desc: '하자진단 및 하자소송에 수반되는 비용을 합의 및 소송 종결 후 사후 정산하여 입주민의 지출 비용을 최소화합니다.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      )
    },
    {
      id: 5,
      title: '확실한 사후케어',
      desc: '승소 판결에 그치지 않고 입주민에게 실질적인 손해배상금 지급이 이뤄질 때까지 끝까지 책임지고 조력합니다.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      )
    },
    {
      id: 6,
      title: '원스톱 올인원 통합하자관리',
      desc: '하자진단부터 건설사 원만한 협의, 증거 확보 소송 및 보수공사 업체 연계까지 소송 전 단계의 복잡한 절차를 완벽 대행합니다.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
        </svg>
      )
    }
  ];

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>
        
        {/* Header Block (Image 1 replica with Image 2 Text) */}
        <div className={styles.headerArea}>
          <span className={styles.kicker}>[법무법인 플로우만의 '하자소송' 필승 전략]</span>
          <h2 className={styles.mainTitle}>
            경험의 차이가 결과의 차이를 만듭니다.<br />
            포기하지 마세요. 플로우가 돕겠습니다.
          </h2>
          <p className={styles.descBlock}>
            <span className={styles.descLine}>최고의 전문가들로 구성된 전문 파트너십을 기반으로, 하자진단부터 합의,</span>
            <span className={styles.descLine}>소송 및 완벽한 사후정산에 이르기까지 국내 유일 올인원 통합하자관리 서비스를 가동합니다.</span>
          </p>
        </div>

        {/* 6-Card Deep Navy Grid (Image 1 layout) */}
        <div className={styles.strategyGrid}>
          {strategies.map((item) => (
            <div className={styles.strategyCard} key={item.id}>
              <div className={styles.iconBox}>
                {item.icon}
              </div>
              <h4 className={styles.cardTitle}>{item.title}</h4>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom Caption Summary Block (Image 2 text footer) */}
        <div className={styles.bottomSummary}>
          <p className={styles.summaryText}>
            법무법인 플로우는 다수의 아파트, 빌라, 상가건물 하자소송에서 독보적인 실적과 실무 노하우를 보유하고 있으며, 
            수천 건에 이르는 건설·부동산 분쟁 케이스를 분석하여 의뢰인의 소중한 주거 가치를 보호하는데 앞장서고 있습니다. 
            여러분의 사례가 승소 사례가 될 수 있도록 조력하겠습니다.
          </p>
        </div>

      </div>
    </section>
  );
}
