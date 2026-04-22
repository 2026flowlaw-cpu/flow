import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import InquiryForm from '@/components/Location/InquiryForm/InquiryForm';
import styles from '../resale-cancellation/ResaleCancellation.module.css';

const RealEstateDisputePage = () => {
  const categories = [
    { title: '위반건축물 미고지', desc: '불법 개조, 쪼개기 등 건축물 대장과 다른 실태 미고지 시 계약 취소' },
    { title: '토지매매 계약분쟁', desc: '허위/과장 광고에 의한 토지 거래 및 경계 침범 소송 대응' },
    { title: '점유취득시효', desc: '장기간 점유에 따른 소유권 주장 및 방어, 경계 확정 분쟁' },
    { title: '명도 소송', desc: '정당한 권원 없는 점유자에 대한 퇴거 요청 및 강제 집행 절차' },
    { title: '상가 권리금 분쟁', desc: '임대인의 정당한 이유 없는 신규 임차인 거절 및 권리금 회수 방해' },
    { title: '공동소유 지분 분쟁', desc: '공유물 분할 청구 및 지분권 행사를 둘러싼 권리 관계 조정' },
  ];

  return (
    <div className={styles.page}>
      <Header />
      
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.label}>Property Law Division</span>
          <h1 className={styles.title}>
            복잡한 부동산 분쟁,<br />
            <span>법리의 정수</span>로 해결합니다.
          </h1>
          <p className={styles.description}>
            부동산은 가장 큰 자산입니다. <br />
            이해관계가 얽힌 권리 관계를 명확히 해석하여 의뢰인의 승소를 이끌어냅니다.
          </p>
        </div>
      </section>

      <section className={styles.serviceSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>부동산분쟁센터 핵심 조력 분야</h2>
          </div>
          <div className={styles.serviceGrid}>
            {categories.map((cat, idx) => (
              <div key={idx} className={styles.serviceCard}>
                <div className={styles.cardIndex}>0{idx + 1}</div>
                <h3 className={styles.cardTitle}>{cat.title}</h3>
                <p className={styles.cardDesc}>{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InquiryForm />
      <Footer />
    </div>
  );
};

export default RealEstateDisputePage;
