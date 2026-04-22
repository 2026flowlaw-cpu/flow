import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import InquiryForm from '@/components/Location/InquiryForm/InquiryForm';
import styles from '../resale-cancellation/ResaleCancellation.module.css';

const EduLawPage = () => {
  const categories = [
    { title: '학원 경영 컨설팅', desc: '설립, 인가, 노무 등 학원 운영 전반에 걸친 법률 리스크 선제적 관리' },
    { title: '강사 경업금지', desc: '핵심 강사의 무단 이직 및 인근 개원으로 인한 경영권 침해 방어' },
    { title: '교습비 및 세정', desc: '교습비 조정, 허위 기재 방지 및 학원 조세 관련 법률 자문' },
    { title: '학폭 및 청소년 분쟁', desc: '학원 내 사고 및 학생 간 분쟁 발생 시 원만한 조율과 법적 대리' },
    { title: '프랜차이즈 계약', desc: '교육 브랜드 가맹 계약의 독소 조항 검토 및 분쟁 해결' },
    { title: '개인정보 보호', desc: '학생 및 학부모 정보 관리 규정 준수 및 유출 사고 대응' },
  ];

  return (
    <div className={styles.page}>
      <Header />
      
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.label}>Educational Law & Ethics</span>
          <h1 className={styles.title}>
            교육의 본질에 집중하도록,<br />
            <span>경영의 리스크</span>를 제거합니다.
          </h1>
          <p className={styles.description}>
            에듀법률센터는 교육 현장을 가장 잘 이해합니다. <br />
            복잡한 규제 속에서 학원의 가치를 지키는 파트너가 되어드리겠습니다.
          </p>
        </div>
      </section>

      <section className={styles.serviceSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>에듀법률센터 전문 컨설팅 분야</h2>
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

export default EduLawPage;
