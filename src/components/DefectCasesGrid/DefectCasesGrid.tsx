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
      detail: '준공(사용검사) 전에 발생한 시공상의 미비점 및 도면 변경 사항과 준공 후에 나타난 구조적 균열, 기능적 파손 등의 모든 연차별 결함을 포착하여 청구합니다.'
    },
    {
      id: 2,
      label: '미시공 · 오시공 하자',
      detail: '설계도면대로 아예 시공을 누락했거나(미시공), 설계도와 다른 저가 부적합 마감재로 대체 시공(오시공)하여 건축물의 분양 품질을 하락시킨 위법 행위를 정밀 추적합니다.'
    },
    {
      id: 3,
      label: '균열 및 누수 하자',
      detail: '단지 콘크리트 외벽, 세대 천장 및 베란다 벽면, 옥상 공용부 등에서 발생하는 유해 균열을 과학적으로 계측하고 향후 재발 방지를 위한 전면 방수 공사비를 확실하게 요구합니다.'
    },
    {
      id: 4,
      label: '전용 및 공용부분 결함',
      detail: '개별 세대 내부(전용)의 벽지 결로, 타일 들뜸, 새시 부실 등부터 지하주차장, 기계실, 엘리베이터실(공용)의 구조 결함까지 빈틈없이 분리 산정하여 청구 금액을 극대화합니다.'
    },
    {
      id: 5,
      label: '시공사 보수이행 거부',
      detail: '입주민들의 정당한 하자 요청에 대해 건설사가 단순 땜질식 임시방편 보수만 반복하거나 면피성으로 일관하는 경우, 이를 보수 지연 채무불이행으로 규정하고 즉각 소송을 제기합니다.'
    },
    {
      id: 6,
      label: '하자보수보증금 청구',
      detail: '시공사가 경영 악화로 도산하거나 하자 보수 능력이 전무한 상황일 때, 하자보수보증증권을 발행한 HUG(주택도시보증공사)나 건설공제조합 등을 상대로 정당한 보증금을 일괄 적립 확보합니다.'
    },
    {
      id: 7,
      label: '마감불량 및 부실공사',
      detail: '가구의 심각한 이격 뒤틀림, 도배 들뜸, 욕실 구배 불량으로 인한 배수 정체 등 입주민들이 일상생활 속에서 쾌적함을 누리지 못하게 만드는 생활 밀착형 부실 마감을 철저히 단죄합니다.'
    },
    {
      id: 8,
      label: '설계도면과 다른 시공',
      detail: '사업승인도면, 착공도면, 준공도면을 다각도로 정밀 크로스 분석하여, 건설사가 보이지 않는 내장재나 소방재 사양을 낮추어 불법적으로 공사비를 절감한 차액을 계산해냅니다.'
    },
    {
      id: 9,
      label: '소방 · 전기 시설 불량',
      detail: '소방 감지기 무단 불통 오작동, 단지 내 스프링클러 배관 파손 누수, 전기 차단기 반복 단선 등 입주민의 소중한 생명 및 주거 안전과 직결되는 필수 방재 설비의 결함을 적발합니다.'
    },
    {
      id: 10,
      label: '단지 내 조경 하자',
      detail: '도면상의 명품 소나무 대신 조악한 잡목을 심었거나, 단지 지반 침하 및 배수 설계 불량으로 단지 내 고가의 식재 수목들이 집단 고사한 조경 하자액을 정확하게 감정 청구합니다.'
    },
    {
      id: 11,
      label: '지하주차장 결로 및 균열',
      detail: '제습/환기 송풍 시설의 용량 미달 설계 부실로 인한 주차장 결로 현상, 골조 균열로 지하수가 용출되어 차량을 훼손하고 주차 환경을 파괴하는 만성적인 시공 결함을 보강 조치시킵니다.'
    },
    {
      id: 12,
      label: '입주 전 사전점검 분쟁',
      detail: '신축 단지 입주 예정일 전 사전점검에서 무더기 부실시공이 발각되어 잔금 납부 거부 및 입주 예정자들이 겪는 극심한 혼란 속에서, 입예협과 연대하여 시공사의 배상을 법적으로 관철합니다.'
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
