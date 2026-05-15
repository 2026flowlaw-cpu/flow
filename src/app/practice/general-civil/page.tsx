import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import InquiryForm from '@/components/Location/InquiryForm/InquiryForm';
import styles from '../resale-cancellation/ResaleCancellation.module.css';

import Stats from '@/components/Stats/Stats';
import SuccessStories from '@/components/SuccessStories/SuccessStories';
import FAQ from '@/components/FAQ/FAQ';
import PhilosophyMessage from '@/components/PhilosophyMessage/PhilosophyMessage';
import CustomerReviews from '@/components/CustomerReviews/CustomerReviews';
import CTA from '@/components/CTA/CTA';
import PracticeCases from '@/components/PracticeCases/PracticeCases';


const GeneralCivilPage = () => {
  const categories = [
    { title: '손해배상 청구', desc: '불법 행위나 계약 위반으로 발생한 경제적, 정신적 피해에 대한 정당한 보상' },
    { title: '대여금 · 채권 회수', desc: '빌려준 돈, 미수금 등 정당한 재산권을 되찾기 위한 강력한 법적 집행' },
    { title: '부당이득 반환', desc: '법률상 원인 없이 타인의 재산으로 얻은 이익에 대한 원상 복구 청구' },
    { title: '이혼 및 상속', desc: '재산 분할, 양육권, 유산 상속 분쟁 등 가사 사건의 전략적 조율' },
    { title: '계약 해지 및 효력', desc: '일방적인 계약 해지나 불공정 거래에 따른 계약 효력 다툼' },
    { title: '교통사고 소송', desc: '사고 후 대물, 대인 보상 금액 산정 및 보험사 상대 소송 수행' },
  ];

  return (
    <div className={styles.page}>
      <Header />
      
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.label}>General Litigation Services</span>
          <h1 className={styles.title}>
            당신의 평온한 일상,<br />
            <span>법의 울타리</span>가 지킵니다.
          </h1>
          <p className={styles.description}>
            어떤 민사 문제라도 괜찮습니다. <br />
            의뢰인의 입장에서 가장 합리적이고 유리한 결과를 도출해낼 것을 약속드립니다.
          </p>
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
  
      <Footer />
    </div>
  );
};

export default GeneralCivilPage;
