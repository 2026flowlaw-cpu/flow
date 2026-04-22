import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import InquiryForm from '@/components/Location/InquiryForm/InquiryForm';
import styles from './ResaleCancellation.module.css';

const ResaleCancellationPage = () => {
  const categories = [
    { title: '거래 중요사항 미고지', desc: '주변 혐오시설, 쓰레기 매립장 등 계약 시 알리지 않은 결함' },
    { title: '미시공 · 부실시공', desc: '설계도와 다른 시공 및 구조적 부실이 의심되는 경우' },
    { title: '착오 · 기망에 의한 취소', desc: '거짓 정보나 중대한 착오에 의해 체결된 계약' },
    { title: '대출불발로 인한 해제', desc: '보장되었던 대출이 거부되어 잔금 마련이 불가능한 경우' },
    { title: '허위 · 과장광고', desc: '수익률 과장, 허위 인프라 정보 등 비정상적 유인' },
    { title: '무단 설계변경', desc: '수분양자의 동의 없는 중대한 설계 및 용도 변경' },
    { title: '사기분양', desc: '처음부터 속일 의도가 다분한 기획 단계의 사기' },
    { title: '입주 · 공사지연', desc: '약정된 날짜를 현격히 초과하여 권리 침해가 발생한 경우' },
    { title: '계약금 반환 소송', desc: '정당한 해제 사유에 따른 계약금 및 중도금 회수' },
    { title: '청약 철회', desc: '법적 기간 내 정당한 권리 행사를 통한 청약 취소' },
  ];

  return (
    <div className={styles.page}>
      <Header />
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.label}>Real Estate Law Center</span>
          <h1 className={styles.title}>
            분양계약해제,<br />
            <span>정당한 사유</span>가 있다면 가능합니다.
          </h1>
          <p className={styles.description}>
            혼자 고민하지 마십시오. 법무법인 일신은 건설 현장의 실무와 법리를 꿰뚫어 <br />
            의뢰인의 소중한 자산을 지키는 가장 확실한 전략을 제시합니다.
          </p>
        </div>
      </section>

      {/* Pain Point Section */}
      <section className={styles.painSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>이런 고민으로 밤을 지새우고 계신가요?</h2>
          </div>
          <div className={styles.painGrid}>
            <div className={styles.painCard}>
              <p>"수익률 보장된다더니, 알고보니 전부 거짓말이었어요.."</p>
            </div>
            <div className={styles.painCard}>
              <p>"입주가 반년 넘게 밀리고 있는데 보상 한마디 없네요.."</p>
            </div>
            <div className={styles.painCard}>
              <p>"공사 현장에 갔더니 벽이 갈라져 있고 엉망이에요.."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className={styles.serviceSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>법무법인 일신의 10대 핵심 대응 분야</h2>
            <p className={styles.sectionSubtitle}>각 분야의 전문 변호사가 의뢰인의 상황에 맞는 최적의 해법을 찾습니다.</p>
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

      {/* Strength Section */}
      <section className={styles.strengthSection}>
        <div className="container">
          <div className={styles.strengthGrid}>
            <div className={styles.strengthContent}>
              <h2 className={styles.strengthTitle}>
                왜 분양해제는 <br />
                <span>법무법인 일신</span>인가?
              </h2>
              <div className={styles.strengthList}>
                <div className={styles.strengthItem}>
                  <h4>현장을 알아야 이깁니다</h4>
                  <p>단순 법률 검토를 넘어 건설 현장의 실무적 하자와 흠결을 정확히 찾아냅니다.</p>
                </div>
                <div className={styles.strengthItem}>
                  <h4>전략적 압박과 합의</h4>
                  <p>무조건 소송만이 답은 아닙니다. 시행사의 오류를 포착하여 소송 전 합의를 이끌어내는 전략을 우선합니다.</p>
                </div>
                <div className={styles.strengthItem}>
                  <h4>풍부한 승소 사례</h4>
                  <p>오산, 강릉, 서울 등 전국 각지의 수익형 부동산 및 아파트 해제 판결문을 보유하고 있습니다.</p>
                </div>
              </div>
            </div>
            <div className={styles.strengthImage}>
              <div className={styles.imagePlaceholder}>
                <span>ILSHIN<br />LAW FIRM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Inquiry */}
      <InquiryForm />

      <Footer />
    </div>
  );
};

export default ResaleCancellationPage;
