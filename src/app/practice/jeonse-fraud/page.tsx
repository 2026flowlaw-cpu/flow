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


const JeonseFraudPage = () => {
  const categories = [
    { title: '집주인 무단 변경', desc: '수분양자 동의 없는 임대인 명의 변경 및 바지사장 대응' },
    { title: '임대인 잠적 및 경매', desc: '임대인 연락 두절 후 법원 경매 통지 시 보증금 보호 조치' },
    { title: '깡통주택 (공동담보)', desc: '계약 시 파악하지 못한 과도한 근저당 및 선순위 채권 해결' },
    { title: '보증금 반환 거부', desc: '임대차 종료 후에도 정당한 이유 없이 보증금을 돌려주지 않는 경우' },
    { title: '신탁부동산 사기', desc: '신탁 등기된 부동산의 법적 권리 관계 분석 및 피해 구제' },
    { title: '장래이행의 소', desc: '보증금 반환이 확실치 않은 상황에서 선제적인 법적 권리 확보' },
  ];

  return (
    <div className={styles.page}>
      <Header />
      
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.label}>Residental Safety Center</span>
          <h1 className={styles.title}>
            전세사기 피해,<br />
            <span>확실한 골든타임</span>이 답변입니다.
          </h1>
          <p className={styles.description}>
            시간이 지체될수록 자산 회수는 어려워집니다. <br />
            법무법인 플로우의 전세사기 전담팀이 가장 빠르고 강력한 보전 조치를 시작합니다.
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

export default JeonseFraudPage;
