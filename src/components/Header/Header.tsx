"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

interface SubItem {
  name: string;
  href: string;
  isExternal?: boolean;
}

interface MenuItem {
  title: string;
  href: string;
  subItems: SubItem[];
}

const menuData: MenuItem[] = [
  {
    title: '회사소개',
    href: '/about/intro',
    subItems: [
      { name: '법무법인 플로우', href: '/about/intro' },
      { name: '대표인사말', href: '/about/greetings' },
      { name: '그룹구성(중개법인)', href: '/about/group' },
      { name: '오시는길', href: '/about/location' },
      { name: '인재채용', href: '/about/careers' },
    ]
  },
  {
    title: '구성원소개',
    href: '/lawyers/profiles',
    subItems: [
      { name: '변호사 소개', href: '/lawyers/profiles' },
    ]
  },
  {
    title: '업무분야',
    href: '#practice',
    subItems: [
      { name: '분양계약해제센터', href: '/practice/resale-cancellation' },
      { name: '전세사기센터', href: '/practice/jeonse-fraud' },
      { name: '부동산분쟁센터', href: '/practice/real-estate-dispute' },
      { name: '아파트 하자소송', href: '/practice/construction-dispute' },
      { name: '분양계약 해제', href: '/practice/resale-cancellation' },
      { name: '전세사기 전담대응', href: '/practice/jeonse-fraud' },
      { name: '집단소송 센터', href: '/practice/class-action' },
      { name: '건설분쟁센터', href: '/practice/construction-dispute' },
      { name: '민사일반센터', href: '/practice/general-civil' },
      { name: '에듀법률센터', href: '/practice/edu-law' },
      { name: '형사소송센터', href: '/practice/criminal-law' },
    ]
  },
  {
    title: '플로우 소식',
    href: '/success-stories',
    subItems: [
      { name: '성공사례', href: '/success-stories' },
      { name: '언론보도', href: '/news/press' },
      { name: '유튜브', href: '/news/youtube' },
      { name: '법률칼럼', href: '/columns' },
      { name: '네이버 블로그', href: 'https://blog.naver.com', isExternal: true },
    ]
  },
  {
    title: '상담게시판',
    href: '/consult',
    subItems: [
      { name: '상담신청', href: '/consult' },
    ]
  }
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when a link is clicked
  const handleLinkClick = () => {
    setHoveredIndex(null);
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const handleMobileSubmenu = (title: string) => {
    setActiveSubmenu(activeSubmenu === title ? null : title);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  }, [pathname]);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.container} container`}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>법무법인 <span className="accent-text">플로우</span></span>
        </Link>

        <nav className={styles.nav}>
          {menuData.map((item, index) => (
            <div key={index} className={styles.navItem}>
              <Link href={item.href} className={styles.navLink}>
                {item.title}
              </Link>
              <div className={styles.dropdown}>
                <div className={styles.dropdownContent}>
                  {item.subItems.map((sub, sIndex) => (
                    <Link 
                      key={sIndex} 
                      href={sub.href} 
                      className={styles.subLink}
                      target={sub.isExternal ? "_blank" : undefined}
                      onClick={handleLinkClick}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>
        <div className={styles.actions}>
          <Link href="/admin/login" className={styles.loginBtn} onClick={handleLinkClick}>
            로그인
          </Link>
          <Link href="/consult" className={styles.consultButton} onClick={handleLinkClick}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>상담예약</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
