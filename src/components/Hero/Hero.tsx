import React from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={`${styles.container} container`}>
        <div className={styles.content}>
          <p className={styles.subheading}>CONSTRUCTION DEFECT LAW FIRM ILSHIN</p>
          <h1 className={styles.title}>
            하자소송의 명확한 해답,<br />
            법무법인 플로우
          </h1>
          <p className={styles.description}>
            건설 소송 분석 및 전략 수립에 특화된 풍부한 실무 경험과<br />
            전문 지식으로 당신의 소중한 자산과 권리를 지킵니다.
          </p>
          <div className={styles.ctaGroup}>
            <Link href="/consult" className={styles.primaryBtn}>
              무료 법률 상담신청
            </Link>
            <Link href="/success-stories" className={styles.secondaryBtn}>
              최신 성공 사례 보기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
