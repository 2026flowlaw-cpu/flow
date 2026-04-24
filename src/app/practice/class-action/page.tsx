"use client";

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

export default function ClassActionPage() {
  const features = [
    { title: '대규모 소송단 관리 시스템', desc: '자체 개발한 플랫폼을 통해 수천 명의 의뢰인과 실시간으로 소통하고 자료를 통합 관리합니다.' },
    { title: '건설/부동산 빅데이터 분석', desc: '과거 10년간의 유사 판례와 하자가 분석 데이터를 활용해 정교한 승소 전략을 수립합니다.' },
    { title: '분 분야 전문가 융합 TF', desc: '변호사, 건축구조기술사, 손해배상전문가들이 하나의 팀으로 집단 소송의 법리를 완성합니다.' }
  ];

  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        {/* Banner Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <span className={styles.label}>COLLECTIVE LITIGATION CENTER</span>
            <h1 className={styles.title}>흩어진 힘을 하나로,<br /><span>집단소송의 새로운 기준</span>을 세웁니다.</h1>
            <p className={styles.desc}>
              다수의 권리가 침해된 현장, 법무법인 플로우가 체계적인 시스템과 <br />
              압도적인 전문성으로 가장 강력한 목소리를 냅니다.
            </p>
            <a href="/consult" className={styles.mainCta}>집단소송 의뢰/참여 문의 ➔</a>
          </div>
        </section>

        {/* Feature Grid */}
        <section className={styles.featureSection}>
          <div className={styles.featureGrid}>
            {features.map((f, i) => (
              <div key={i} className={styles.featureCard}>
                <div className={styles.cardNum}>{i + 1}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* System Section */}
        <section className={styles.systemSection}>
          <div className={styles.systemCard}>
            <div className={styles.systemInfo}>
              <h2>Flow Group Action Platform</h2>
              <p>법무법인 플로우는 대규모 소송 인원을 효율적으로 관리하고 투명하게 진행 과정을 공유하는 자체 전산 시스템을 운영합니다.</p>
            </div>
            <ul className={styles.systemList}>
              <li>개별 의뢰인 맞춤형 진행 알림 서비스</li>
              <li>온라인 증거 자료 통합 업로드 시스템</li>
              <li>소송 단계별 리포트 자동 생성</li>
              <li>전용 메신저를 통한 실시간 Q&A 운영</li>
            </ul>
          </div>
        </section>

        {/* Case Section */}
        <section className={styles.caseSection}>
          <div className={styles.sectionHeader}>
            <h2>Practice Areas</h2>
            <p>플로우가 강점을 가진 집단소송 분야</p>
          </div>
          <div className={styles.caseGrid}>
            <div className={styles.caseCard}>
              <h4>아파트 하자 소송</h4>
              <p>대규모 단지의 공용부 및 전용부 하자 판정 및 손해배상 청구</p>
            </div>
            <div className={styles.caseCard}>
              <h4>분양계약 해제/취소</h4>
              <p>허위·과장 광고 및 입주 지연에 따른 집단 계약 해제 대응</p>
            </div>
            <div className={styles.caseCard}>
              <h4>부동산 금전 소비대차</h4>
              <p>건설사/시행사 부당 이득 반환 및 다수 피해자 구제</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
