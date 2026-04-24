"use client";

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

export default function GroupPage() {
  const entities = [
    {
      name: '법무법인 플로우',
      tag: 'LEGAL EXPERTISE',
      desc: '건설, 부동산, 민사 소송의 압도적 전문성을 바탕으로 의뢰인의 승소를 설계합니다.',
      features: ['건설/하자소송 전담팀', '부동산 분쟁 해결', '기업 법률 자문'],
      icon: '🏛️'
    },
    {
      name: '플로우 중개법인',
      tag: 'REAL ESTATE STRATEGY',
      desc: '단순 중개를 넘어 정밀한 권리 분석과 시장 데이터를 기반으로 최적의 자산을 매칭합니다.',
      features: ['부동산 매칭 시스템', '권리 분석 보고서', '자산 가치 극대화'],
      icon: '🏢'
    },
    {
      name: '플로우 기술법인',
      tag: 'TECHNICAL DIAGNOSIS',
      desc: '건축구조기술사 및 정밀진단 전문가들이 법률적 판단의 객관적 근거를 구축합니다.',
      features: ['건축 구조 정밀진단', '하자 판정 기술지원', '현장 감정 분석'],
      icon: '📐'
    }
  ];

  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <span className={styles.label}>FLOW GROUP STRUCTURE</span>
            <h1 className={styles.title}>유기적인 결합으로 완성되는<br /><span>토탈 솔루션 네트워크</span></h1>
            <p className={styles.desc}>
              법무법인 플로우는 각 분야의 경계를 허물고 전문 지식을 융합하여,<br />
              의뢰인에게 가장 효율적이고 강력한 해결책을 제시합니다.
            </p>
          </div>
        </section>

        {/* Synergy Diagram Section */}
        <section className={styles.synergySection}>
          <div className={styles.synergyContent}>
            <div className={styles.coreCircle}>
              <span className={styles.coreText}>Client Success</span>
            </div>
            <div className={`${styles.entityCircle} ${styles.pos1}`}>법률</div>
            <div className={`${styles.entityCircle} ${styles.pos2}`}>기술</div>
            <div className={`${styles.entityCircle} ${styles.pos3}`}>중개</div>
            <div className={styles.connectorLine}></div>
          </div>
        </section>

        {/* Entity Grid */}
        <section className={styles.entitySection}>
          <div className={styles.entityGrid}>
            {entities.map((entity, i) => (
              <div key={i} className={styles.entityCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.entityIcon}>{entity.icon}</span>
                  <span className={styles.entityTag}>{entity.tag}</span>
                </div>
                <h3>{entity.name}</h3>
                <p className={styles.entityDesc}>{entity.desc}</p>
                <ul className={styles.featureList}>
                  {entity.features.map((f, j) => (
                    <li key={j}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* One-Stop Section */}
        <section className={styles.oneStopSection}>
          <div className={styles.oneStopCard}>
            <div className={styles.oneStopInfo}>
              <h2>Flow One-Stop System</h2>
              <p>각 법인의 전문가들이 실시간으로 협력하여 한 번의 상담으로 모든 문제를 해결합니다.</p>
            </div>
            <div className={styles.stepGrid}>
              <div className={styles.step}>
                <span className={styles.stepNum}>01</span>
                <h4>상담 및 진단</h4>
                <p>법률/기술 전문가 법률 검토</p>
              </div>
              <div className={styles.arrow}>→</div>
              <div className={styles.step}>
                <span className={styles.stepNum}>02</span>
                <h4>전략 수립</h4>
                <p>중개/데이터 가치 분석</p>
              </div>
              <div className={styles.arrow}>→</div>
              <div className={styles.step}>
                <span className={styles.stepNum}>03</span>
                <h4>최상의 결과</h4>
                <p>승소 및 자산 보호</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
