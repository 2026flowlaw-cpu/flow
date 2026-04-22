import React from 'react';
import styles from './Stats.module.css';

const stats = [
  { label: '누적 업무 사례', value: '1,542', suffix: '+' },
  { label: '승소 및 해결 확률', value: '92', suffix: '%' },
  { label: '전문 변호사 수', value: '10', suffix: '명' },
  { label: '월 평균 상담 건수', value: '439', suffix: '건' },
];

const Stats = () => {
  return (
    <section className={styles.statsSection}>
      <div className={`${styles.container} container`}>
        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <h3 className={styles.value}>
                {stat.value}<span className={styles.suffix}>{stat.suffix}</span>
              </h3>
              <p className={styles.label}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
