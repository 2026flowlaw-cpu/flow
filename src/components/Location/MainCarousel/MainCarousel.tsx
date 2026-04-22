import React from 'react';
import styles from './MainCarousel.module.css';

const MainCarousel = () => {
  return (
    <section className={styles.mainVisual}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <div className={styles.image}></div>
          <div className={styles.dots}>
            <span className={`${styles.dot} ${styles.active}`}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCarousel;
