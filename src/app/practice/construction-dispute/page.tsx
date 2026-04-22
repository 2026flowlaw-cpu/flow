import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import InquiryForm from '@/components/Location/InquiryForm/InquiryForm';
import styles from '../resale-cancellation/ResaleCancellation.module.css';

const ConstructionDisputePage = () => {
  const categories = [
    { title: '건축물 하자 소송', desc: '아파트, 상가, 빌라 등 노후 및 부실 시공에 따른 손해배상 및 하자보수' },
    { title: '공사대금 청구', desc: '미지급된 공사 대금 회수 및 증액분을 둘러싼 계약 이행 분쟁' },
    { title: '일조권 · 조망권 침해', desc: '인근 건설 프로젝트로 인한 환경권 침해 보상 및 공사 중단 가처분' },
    { title: '설계 변경 및 추가공사', desc: '구두 계약 후 거부되는 추가 공사비에 대한 법리적 입증 및 청구' },
    { title: '건설사 도산 대응', desc: '건설사 부도 시 수분양자의 권리 확보 및 승계 시공 관련 자문' },
    { title: '건설 형사 사고', desc: '현장 인명 사고 및 안전 보전 조치 위반에 따른 법적 방어 및 선임' },
  ];

  return (
    <div className={styles.page}>
      <Header />
      
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.label}>Building & Construction Experts</span>
          <h1 className={styles.title}>
            건설 현장을 아는 변호사,<br />
            <span>승소의 설계도</span>가 다릅니다.
          </h1>
          <p className={styles.description}>
            법무법인 일신은 대한민국 대표 건설 로펌입니다. <br />
            수많은 아파트 단지의 하자를 진단하고 승소시킨 압도적 경험을 제공합니다.
          </p>
        </div>
      </section>

      <section className={styles.serviceSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>대한민국 1위 건설분쟁센터의 해결력</h2>
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

export default ConstructionDisputePage;
