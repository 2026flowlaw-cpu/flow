"use client";

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Stats from '@/components/Stats/Stats';
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

        {/* 1. 실적 카드 */}
        <Stats />

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
