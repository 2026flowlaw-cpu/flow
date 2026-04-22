import React from 'react';
import styles from './LocationGallery.module.css';

const LocationGallery = () => {
  return (
    <section className={styles.gallery}>
      <div className={styles.grid}>
        <div className={styles.item}>
          <div className={`${styles.image} ${styles.img1}`}></div>
        </div>
        <div className={styles.item}>
          <div className={`${styles.image} ${styles.img2}`}></div>
        </div>
        <div className={styles.item}>
          <div className={`${styles.image} ${styles.img3}`}></div>
        </div>
      </div>
    </section>
  );
};

export default LocationGallery;
