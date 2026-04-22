import React from 'react';
import styles from './LocationVision.module.css';

const LocationVision = () => {
  return (
    <section className={styles.vision}>
      <div className="container">
        <span className={styles.kicker}>OUR VISION</span>
        <h2 className={styles.title}>
          어느곳 보다 편하게<br />
          상담할 수 있도록 노력합니다.
        </h2>
      </div>
    </section>
  );
};

export default LocationVision;
