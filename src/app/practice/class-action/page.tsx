"use client";

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Stats from '@/components/Stats/Stats';
import PainPoints from '@/components/PainPoints/PainPoints';
import SuccessStories from '@/components/SuccessStories/SuccessStories';
import FAQ from '@/components/FAQ/FAQ';
import PhilosophyMessage from '@/components/PhilosophyMessage/PhilosophyMessage';
import CustomerReviews from '@/components/CustomerReviews/CustomerReviews';
import CTA from '@/components/CTA/CTA';
import InquiryForm from '@/components/Location/InquiryForm/InquiryForm';
import styles from './page.module.css';
import PracticeCases from '@/components/PracticeCases/PracticeCases';

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
          <div className={styles.heroContentGrid}>
            
            {/* Left side: Definition & Description */}
            <div className={styles.heroLeft}>
              <div className={styles.blueSquare}></div>
              <h1 className={styles.heroMainTitle}>집단소송<span className={styles.titleSub}>(단체소송)</span> 이란?</h1>
              <p className={styles.heroDescription}>
                다수의 피해자가 함께 모여 동일하거나 유사한 위법행위로 인한 손해를 구제받기 위해 공동으로 하나의 소송을 통해 권리를 행사하는 것
              </p>
              <div className={styles.heroUrl}>www.flowlaw-classaction.com</div>
            </div>

            {/* Right side: 2x2 Glassmorphic Feature Cards */}
            <div className={styles.heroRight}>
              <div className={styles.glassCard}>
                <h3 className={styles.glassCardTitle}>담합·불공정거래</h3>
                <p className={styles.glassCardDesc}>기업 간 담합으로 인한 가격인상 피해</p>
              </div>
              <div className={styles.glassCard}>
                <h3 className={styles.glassCardTitle}>차액가맹금 전가</h3>
                <p className={styles.glassCardDesc}>가맹본사의 차액가맹금 부당 전가</p>
              </div>
              <div className={styles.glassCard}>
                <h3 className={styles.glassCardTitle}>개인정보 유출</h3>
                <p className={styles.glassCardDesc}>수만~수천만 명의 대규모 정보 유출</p>
              </div>
              <div className={styles.glassCard}>
                <h3 className={styles.glassCardTitle}>구조적 피해</h3>
                <p className={styles.glassCardDesc}>개인이 대기업 상대소송이 어려운 구조</p>
              </div>
            </div>

          </div>
        </section>

        {/* 1. 실적 카드 */}
        <Stats />
      <PainPoints />

        {/* 2. 케이스 */}
        <PracticeCases />

        {/* 3. 성공사례(판결문) */}
        <SuccessStories />

        {/* 4. FAQ */}
        <FAQ />

        {/* 5. 회사 강점소개 */}
        <PhilosophyMessage />

        {/* 6. 의뢰인후기 */}
        <CustomerReviews />

        {/* 7. 상담 */}
        <div style={{ backgroundColor: '#f8fafc', padding: '80px 0' }}>
          <div className="container">
            <InquiryForm />
          </div>
        </div>
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
