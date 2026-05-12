"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './PracticeAreas.module.css';

const categories = {
  civil: {
    name: '민사',
    count: 9,
    areas: [
      {
        title: '명도소송',
        description: '점유이전금지가처분, 명도소송, 명도집행 등 부동산 명도사건에 대한 많은 경험, 노하우로 의뢰인의 이익을 대변합니다.',
        href: '/practice/real-estate-dispute'
      },
      {
        title: '임대차 분쟁',
        description: '보증금, 권리금, 원상회복 등 모든 유형의 임대차분쟁에 대한 많은 경험/노하우/압도적인 전문성으로 임대차분쟁을 해결합니다.',
        href: '/practice/real-estate-dispute'
      },
      {
        title: '분양취소, 탈퇴 등',
        description: '허위광고로 인한 분양 취소 소송, 지역주택조합 탈퇴 등 부동산 계약 취소에 대해 많은 경험/노하우/압도적인 전문성으로 문제를 해결해 드립니다.',
        href: '/practice/resale-cancellation'
      },
      {
        title: '건설/건축 분쟁',
        description: '부동산 계약, 공유물분할, 명의신탁, 시효취득, 소유권/저당권/지상권 다툼 등 각종 부동산 권리 분쟁에 대한 많은 경험/노하우/압도적인 전문성으로 분쟁을 해결해 드립니다.',
        href: '/practice/construction-dispute'
      },
      {
        title: '집합건물 사건',
        description: '관리단 관련 분쟁, 관리업체의 분쟁, 관리비 분쟁, 관리단장 비리 분쟁, 상가업종 제한 분쟁 등 다수 이해관계들이 관련된 복잡한 분쟁을 많은 경험/노하우/압도적인 전문성으로 해결합니다.',
        href: '/practice/class-action'
      },
      {
        title: '재개발/재건축',
        description: '재개발/재건축 절차, 지역주택조합 관련 분쟁에 대한 많은 경험/노하우/압도적인 전문성으로 분쟁을 해결합니다.',
        href: '/practice/real-estate-dispute'
      },
      {
        title: '부동산 권리 분쟁',
        description: '하자보수, 건설/건축 계약, 공사대금, 타절협의, 공사소음/진동/일조권/조망권 등 각종 건설/건축분쟁에 대한 많은 경험/노하우/압도적인 전문성으로 건설/건축 분쟁을 해결합니다.',
        href: '/practice/construction-dispute'
      },
      {
        title: '전세사기',
        description: '전세 사기 피해자의 소중한 보증금을 회수하기 위한 민형사상의 총체적인 솔루션을 제공합니다.',
        href: '/practice/jeonse-fraud'
      },
      {
        title: '민사 일반',
        description: '손해배상, 채권채무 등 일상생활의 모든 민사적 고충에 대해 최적의 법률 전략을 제시합니다.',
        href: '/practice/general-civil'
      }
    ]
  },
  criminal: {
    name: '형사',
    count: 8,
    areas: [
      {
        title: '부동산 형사사건',
        description: '보증금 사기, 기획 부동산 사기 등 각종 부동산 관련 형사사건에 대한 많은 경험, 노하우로 의뢰인을 조력합니다.',
        href: '/practice/criminal-law'
      },
      {
        title: '경제범죄',
        description: '사기, 횡령, 배임 등 복잡한 경제 범죄 사건에서 치밀한 법리 구성을 통해 최선의 결과를 이끌어냅니다.',
        href: '/practice/criminal-law'
      },
      {
        title: '성범죄',
        description: '억울한 혐의를 벗거나 과도한 처벌을 피할 수 있도록 수사 단계부터 철저히 대응합니다.',
        href: '/practice/criminal-law'
      },
      {
        title: '교통사고',
        description: '음주운전, 뺑소니, 중과실 사고 등 교통 법규 위반 사건에서 의뢰인의 권익을 보호합니다.',
        href: '/practice/criminal-law'
      },
      {
        title: '강력범죄',
        description: '폭행, 상해 등 강력 사건에서 정당방위 입증 및 합의 유도를 통해 처벌 수위를 낮춥니다.',
        href: '/practice/criminal-law'
      },
      {
        title: '소년범죄',
        description: '청소년기의 실수로 인한 낙인이 찍히지 않도록 선도 및 재활 중심의 변론을 제공합니다.',
        href: '/practice/criminal-law'
      },
      {
        title: '명예훼손',
        description: '온라인 및 오프라인에서의 명예훼손, 모욕 사건에서 사실관계 확정 및 법적 방어를 수행합니다.',
        href: '/practice/criminal-law'
      },
      {
        title: '형사 일반',
        description: '고소 대리 및 피의자/피고인 변론 등 모든 종류의 형사 사건에서 전문적인 도움을 드립니다.',
        href: '/practice/criminal-law'
      }
    ]
  }
};

const PracticeAreas = () => {
  const [activeTab, setActiveTab] = useState<'civil' | 'criminal'>('civil');

  const getCardStyle = (index: number) => {
    // 4-column checkerboard logic
    const row = Math.floor(index / 4);
    const col = index % 4;
    const isDark = (row + col) % 2 === 0;
    return isDark ? styles.cardDark : styles.cardWhite;
  };

  return (
    <section id="practice" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>업무분야</h2>
          <p className={styles.categoryInfo}>
            ( 민사 {categories.civil.count}개 / 형사 {categories.criminal.count}개 )
          </p>
        </div>

        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'civil' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('civil')}
          >
            민사 사건
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'criminal' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('criminal')}
          >
            형사 사건
          </button>
        </div>

        <div className={styles.grid}>
          {categories[activeTab].areas.map((area, index) => (
            <Link 
              key={index} 
              href={area.href}
              className={`${styles.card} ${getCardStyle(index)}`}
            >
              <h3 className={styles.cardTitle}>{area.title}</h3>
              <p className={styles.cardDescription}>{area.description}</p>
              <div className={styles.footer}>
                <span className={styles.more}>바로가기 →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
