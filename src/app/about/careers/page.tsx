"use client";

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

export default function CareersPage() {
  const processes = [
    { step: '01', title: '서류 접수', desc: '자유 양식의 이력서 및 자기소개서 접수' },
    { step: '02', title: '서류 심사', desc: '전문성 및 법인 문화 적합성 검토' },
    { step: '03', title: '면접 전형', desc: '실무진 및 파트너 변호사 심층 인터뷰' },
    { step: '04', title: '처우 협의', desc: '역량에 따른 최고 수준의 예우 협의' },
    { step: '05', title: '최종 합격', desc: '법무법인 플로우의 일원으로 합류' },
  ];

  const positions = [
    { title: '변호사 (경력/신입)', dept: '건설/부동산/하자소송팀', type: '상시채용' },
    { title: '전문위원 (구조진단/기술)', dept: '기술법률 융합센터', type: '상시채용' },
    { title: '법률 사무원', dept: '송무지원실', type: '진행중' },
    { title: '브랜드 마케팅', dept: '경영전략본부', type: '상시채용' },
  ];

  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        {/* Title Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <span className={styles.label}>CAREERS AT FLOW</span>
            <h1 className={styles.title}>법률의 흐름을 바꾸는<br /><span>최고의 파이오니어</span>를 모십니다.</h1>
            <p className={styles.desc}>
              법무법인 플로우는 단순한 법률 자문을 넘어, 기술과 실무의 경계를 허무는 <br />
              새로운 법률 에코시스템을 함께 설계할 인재를 찾습니다.
            </p>
          </div>
        </section>

        {/* Culture Section */}
        <section className={styles.cultureSection}>
          <div className={styles.sectionHeader}>
            <h2>Why Flow?</h2>
            <p>플로우만의 독보적인 근무 환경</p>
          </div>
          <div className={styles.cultureGrid}>
            <div className={styles.cultureCard}>
              <div className={styles.cardIcon}>⚖️</div>
              <h3>전문성의 확장</h3>
              <p>건축구조기술사, 정밀진단팀과의 유기적인 협업을 통해 법률 영역을 넘어선 진정한 전문가로 성장합니다.</p>
            </div>
            <div className={styles.cultureCard}>
              <div className={styles.cardIcon}>🚀</div>
              <h3>혁신적인 보상</h3>
              <p>개인의 역량과 성과를 정교하게 측정하여 업계 최고 수준의 처우와 인센티브를 제공합니다.</p>
            </div>
            <div className={styles.cultureCard}>
              <div className={styles.cardIcon}>☕</div>
              <h3>창의적 환경</h3>
              <p>자유로운 커뮤니케이션과 수평적인 문화 속에서 최고의 퍼포먼스를 낼 수 있는 인프라를 지원합니다.</p>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className={styles.processSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.light}>Recruitment Process</h2>
          </div>
          <div className={styles.processList}>
            {processes.map((p) => (
              <div key={p.step} className={styles.processItem}>
                <div className={styles.stepNum}>{p.step}</div>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Position Section */}
        <section className={styles.positionSection}>
          <div className={styles.sectionHeader}>
            <h2>Open Positions</h2>
          </div>
          <div className={styles.positionGrid}>
            {positions.map((pos, i) => (
              <div key={i} className={styles.positionCard}>
                <div className={styles.posInfo}>
                  <span className={styles.posType}>{pos.type}</span>
                  <h3>{pos.title}</h3>
                  <p>{pos.dept}</p>
                </div>
                <a 
                  href="https://www.saramin.co.kr/zf_user/company-info/view?csn=..." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.applyBtn}
                >
                  지원하기
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <h2>당신의 경험이 플로우의 가치가 됩니다.</h2>
            <p>사람인 채용 공고를 통해 지금 바로 지원하세요.</p>
            <div className={styles.contactInfo}>
              <a href="https://www.saramin.co.kr/..." target="_blank" rel="noopener noreferrer" className={styles.saraminCta}>
                사람인 공고 보러가기 ➔
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
