import React from 'react';
import styles from './CTA.module.css';

const CTA = () => {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={styles.grid}>
          <a href="https://pf.kakao.com" target="_blank" rel="noopener noreferrer" className={`${styles.card} ${styles.kakaoCard}`}>
            <div className={styles.content}>
              <span className={styles.label}>Quick Contact</span>
              <h3 className={styles.title}>카카오톡 상담</h3>
              <p className={styles.text}>카카오톡으로 빠르고 간편하게 상담 예약을 남겨보세요. 변호사가 직접 확인 후 답변드립니다.</p>
            </div>
            <div className={styles.actionBtn}>
              <span>채팅 상담하기</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </a>

          <a href="tel:02-123-4567" className={`${styles.card} ${styles.phoneCard}`}>
            <div className={styles.content}>
              <span className={styles.label}>Direct Call</span>
              <h3 className={styles.title}>365일 실시간 상담</h3>
              <p className={styles.text}>24시간 언제나 변호사의 직접 상담이 가능합니다. 긴급한 법률 도움이 필요하신가요?</p>
            </div>
            <div className={styles.actionBtn}>
              <span>지금 전화하기</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
