import React from 'react';
import Link from 'next/link';
import styles from './FloatingConsult.module.css';

const FloatingConsult = () => {
  return (
    <div className={styles.floating}>
      <Link href="/consult" className={styles.button}>
        <div className={styles.icon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </div>
        <span className={styles.text}>실시간 상담신청</span>
      </Link>
      
      <Link href="https://blog.naver.com" target="_blank" className={styles.button}>
        <div className={styles.icon} style={{ background: '#2DB400' }}>
          <span style={{ fontSize: '18px', fontWeight: '900' }}>N</span>
        </div>
        <span className={styles.text}>네이버 예약</span>
      </Link>
    </div>
  );
};

export default FloatingConsult;
