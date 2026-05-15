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


      <section className={styles.painSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>보증금을 지키기 위한 긴급 점검</h2>
          </div>
          <div className={styles.painGrid}>
            <div className={styles.painCard}>
              <p>"집주인이 연락이 안 되고 등기부에 경매 통지가 떴어요.."</p>
            </div>
            <div className={styles.painCard}>
              <p>"입주할 땐 몰랐는데, 건물 전체에 선순위 채권이 가득해요.."</p>
            </div>
            <div className={styles.painCard}>
              <p>"계약한 집주인이 아닌 낯선 사람으로 명의가 바뀌어 있어요.."</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.serviceSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>전세사기 전담팀의 핵심 대응 분야</h2>
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

      <section className={styles.strengthSection}>
        <div className="container">
          <div className={styles.strengthGrid}>
            <div className={styles.strengthContent}>
              <h2 className={styles.strengthTitle}>
                보증금 회수의 <br />
                <span>압도적 데이터</span>
              </h2>
              <div className={styles.strengthList}>
                <div className={styles.strengthItem}>
                  <h4>가장 빠른 가압류/가처분</h4>
                  <p>상담 당일 증거 수집부터 보전 처분 신청까지 신속하게 진행합니다.</p>
                </div>
                <div className={styles.strengthItem}>
                  <h4>임대차 승계 거부 전략</h4>
                  <p>바지사장으로의 명의 변경을 원천 무효화하거나 책임을 묻는 법리를 구사합니다.</p>
                </div>
                <div className={styles.strengthItem}>
                  <h4>형사 고소 병행</h4>
                  <p>단순 민사를 넘어 형사적 압박을 통해 합의 및 자산 회수율을 높입니다.</p>
                </div>
              </div>
            </div>
            <div className={styles.strengthImage}>
              <div className={styles.imagePlaceholder}>
                <span>SAFE<br />HOME</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      
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
