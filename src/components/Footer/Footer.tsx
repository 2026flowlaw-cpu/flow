"use client";

import React from 'react';
import styles from './Footer.module.css';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();

  // 관리자 페이지와 상담 페이지 등 일부 특수 페이지에서는 푸터를 숨깁니다.
  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <h3 className={styles.footerLogo}>법무법인 <span className="accent-text">플로우</span></h3>
            <p className={styles.footerAddress}>
              서울특별시 서초구 서초대로 314, 12층<br />
              (서초동, 법조타워)<br /><br />
              대표전화: 02-123-4567<br />
              팩스: 02-123-4568<br />
              이메일: contact@lawfirmilshin.com
            </p>
          </div>
          <div>
            <h4 className={styles.footerTitle}>ABOUT</h4>
            <ul className={styles.footerLinks}>
              <li>법인소개</li>
              <li>오시는길</li>
              <li>인재채용</li>
            </ul>
          </div>
          <div>
            <h4 className={styles.footerTitle}>PRACTICE</h4>
            <ul className={styles.footerLinks}>
              <li>아파트 하자소송</li>
              <li>건설 분쟁/자문</li>
              <li>민사/상사 전담</li>
              <li>계산사 수행팀</li>
            </ul>
          </div>
          <div>
            <h4 className={styles.footerTitle}>COMMUNITY</h4>
            <ul className={styles.footerLinks}>
              <li>성공사례</li>
              <li>언론보도</li>
              <li>법률칼럼</li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>© 2026 Law Firm Flow. All rights reserved.</div>
          <div className={styles.footerLegal}>이용약관 | 개인정보처리방침</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
