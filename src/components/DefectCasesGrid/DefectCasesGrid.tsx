"use client";

import React, { useState } from 'react';
import styles from './DefectCasesGrid.module.css';

interface CasePill {
  id: number;
  label: string;
  detail: string;
}

export default function DefectCasesGrid() {
  const [selectedId, setSelectedId] = useState<number>(1); // Default to first item

  const cases: CasePill[] = [
    {
      id: 1,
      label: '사용검사 전후 하자',
      detail: '준공 승인 전 발생한 하자와 승인 후 나타난 하자를 구분하여 각 항목에 맞는 최적의 소송 전략을 수립합니다.'
    },
    {
      id: 2,
      label: '미시공 · 오시공 하자',
      detail: '설계도면과 달리 시공되지 않았거나 잘못 설치된 부분들을 전수 조사하여 원래 계획된 주거 가치를 되찾아 드립니다.'
    },
    {
      id: 3,
      label: '균열 및 누수 하자',
      detail: '건물 외벽이나 내부의 크랙, 물이 새는 현상은 구조적 안전과 직결되므로 정밀 진단을 통한 확실한 보수비 청구가 필요합니다.'
    },
    {
      id: 4,
      label: '전용 및 공용부분 결함',
      detail: '세대 내부뿐만 아니라 엘리베이터, 옥상 등 입주민 공동 공간에서 발견된 모든 결함을 체계적으로 입증합니다.'
    },
    {
      id: 5,
      label: '시공사 보수이행 거부',
      detail: '정당한 보수 요청을 묵살하거나 차일피일 미루는 시공사를 상대로 강력한 법적 조치를 취해 이행을 강제합니다.'
    },
    {
      id: 6,
      label: '하자보수보증금 청구',
      detail: '시공사가 보수 책임을 회피할 경우, 보증공사를 상대로 보증금을 직접 청구하여 신속한 수리 재원을 확보합니다.'
    },
    {
      id: 7,
      label: '마감불량 및 부실공사',
      detail: '도배, 타일, 가구 등 눈에 보이는 마감 미흡부터 보이지 않는 부실 공사까지 꼼꼼히 체크해 정당한 보상을 이끌어냅니다.'
    },
    {
      id: 8,
      label: '설계도면과 다른 시공',
      detail: '분양 당시 약속한 마감재나 구조가 실제와 다르게 적용된 경우, 계약 위반에 따른 손해배상을 청구할 수 있습니다.'
    },
    {
      id: 9,
      label: '소방 · 전기 시설 불량',
      detail: '입주민의 생명 및 안전과 직결되는 소방 설비와 전기 시스템의 오작동 및 미비점을 전문 기술진이 정밀 점검합니다.'
    },
    {
      id: 10,
      label: '단지 내 조경 하자',
      detail: '고사된 수목이나 부실한 단지 내 시설물 등 단지의 가치를 떨어뜨리는 조경 하자를 정확히 파악해 보수를 요구합니다.'
    },
    {
      id: 11,
      label: '지하주차장 결로 및 균열',
      detail: '습기로 인한 결로와 바닥 균열 등 지하주차장의 고질적인 문제를 근본적으로 해결하기 위한 법적 근거를 마련합니다.'
    },
    {
      id: 12,
      label: '입주 전 사전점검 분쟁',
      detail: '사전점검에서 발견된 하자가 입주 시점까지 개선되지 않아 발생하는 갈등을 법률적으로 명확히 해결해 드립니다.'
    }
  ];

  const currentCase = cases.find(c => c.id === selectedId) || cases[0];

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>
        
        {/* Section Header */}
        <div className={styles.headerArea}>
          <span className={styles.kicker}>하자소송 전문로펌 · 공동주택 및 집합건물 하자 분쟁</span>
          <h2 className={styles.mainTitle}>"현장을 알아야 이깁니다"</h2>
          <div className={styles.goldDivider}></div>
          <div className={styles.descBlock}>
            <span className={styles.descLine}>법리에 기술을 더한 법무법인 플로우만의 토탈 솔루션!</span>
            <span className={styles.descLine}>로펌 내 자체 기술인력이 숨은 하자까지 정밀 진단합니다.</span>
            <span className={styles.descLine}>800여 단지에서 축적한 실무 데이터를 기반으로 거대 건설사의 주장을 완벽 방어합니다.</span>
          </div>
        </div>

        {/* Difficulty Area */}
        <div className={styles.difficultyArea}>
          <h3 className={styles.difficultyTitle}>* 현재 어떤 어려움을 겪고 계신가요?</h3>
          <p className={styles.difficultySubtitle}>아래 하자 분류를 클릭하시면 법률 및 엔지니어링 실무 해법을 조회하실 수 있습니다.</p>
        </div>

        {/* 12-Pill Grid */}
        <div className={styles.pillsGrid}>
          {cases.map((item) => (
            <div 
              key={item.id}
              className={`${styles.pillCard} ${selectedId === item.id ? styles.pillActive : ''}`}
              onClick={() => setSelectedId(item.id)}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* Dynamic Detail Card */}
        <div className={styles.detailBox}>
          <div className={styles.detailHeader}>
            <span className={styles.detailBadge}>CASE {currentCase.id.toString().padStart(2, '0')}</span>
            <h4 className={styles.detailTitle}>{currentCase.label}</h4>
          </div>
          <p className={styles.detailContent}>{currentCase.detail}</p>
        </div>

      </div>
    </section>
  );
}
