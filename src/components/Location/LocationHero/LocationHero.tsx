import React from 'react';
import styles from './LocationHero.module.css';

const LocationHero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={`${styles.content} container`}>
        <span className={styles.kicker}>THE ARCHITECT PLAN</span>
        <h1 className={styles.title}>
          하자 소송<br />
          <span>법무법인 일신가 함께합니다.</span>
        </h1>
        <div className={styles.actions}>
          <button className={styles.primaryBtn}>전문가 상담하기</button>
          <button className={styles.secondaryBtn}>둘러보기</button>
        </div>
      </div>
    </section>
  );
};

export default LocationHero;
