import React from 'react';
import styles from './PartnerCarousel.module.css';

const institutions = [
  '대법원', '경찰청', '검찰청', '법무부', '국세청', '교육부', '대한합계협회', '정부24'
];

const PartnerCarousel = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.carouselWrapper}>
          <div className={styles.track}>
            {[...institutions, ...institutions].map((inst, index) => (
              <div key={index} className={styles.logoItem}>
                <div className={styles.logoCircle}>
                  <span className={styles.instName}>{inst}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerCarousel;
