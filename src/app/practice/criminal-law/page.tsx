import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import InquiryForm from '@/components/Location/InquiryForm/InquiryForm';
import styles from '../resale-cancellation/ResaleCancellation.module.css';

const CriminalLawPage = () => {
  const categories = [
    { title: '건설 · 기업 형사', desc: '산업안전보건법 위반, 배임, 횡령 등 비즈니스 과정의 형사 리스크 방어' },
    { title: '성범죄 전담팀', desc: '강제추행, 디지털 성범죄 등 민감한 사건에 대한 철저한 비밀 유지 및 변론' },
    { title: '강력 · 재산 범죄', desc: '상해, 보이스피싱, 대형 사기 등 중대 사건에 대한 수사 초기 집중 조력' },
    { title: '교통사고 형사', desc: '음주운전, 뺑소니, 중과실 사고에 따른 인신 구속 방어 및 원만한 합의' },
    { title: '수사 초기 대응', desc: '경찰 조사 전 시뮬레이션 및 동행을 통한 불리한 진술 원천 차단' },
    { title: '영장실질심사', desc: '구속 위기 상황에서 구속 사유 부존재를 증명하여 불구속 상태 확보' },
  ];

  return (
    <div className={styles.page}>
      <Header />
      
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.label}>Criminal Defense Center</span>
          <h1 className={styles.title}>
            결정적 순간의 선택,<br />
            <span>최상의 변론</span>으로 증명합니다.
          </h1>
          <p className={styles.description}>
            형사 사건은 초기 대응이 전부입니다. <br />
            수사 단계부터 재판까지, 당신의 곁에서 가장 강력한 방어막이 되어드립니다.
          </p>
        </div>
      </section>

      <section className={styles.serviceSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>형사소송센터 수사 단계별 밀착 조력</h2>
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

export default CriminalLawPage;
