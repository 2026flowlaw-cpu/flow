"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

const menuData = [
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
    title: '업무분야',
    href: '/practice/construction-dispute',
    subItems: [
      { name: '아파트 하자소송', href: '/practice/construction-dispute' },
      { name: '분양계약 해제', href: '/practice/resale-cancellation' },
      { name: '전세사기 전담대응', href: '/practice/jeonse-fraud' },
      { name: '집단소송 센터', href: '/practice/class-action' },
      { name: '부동산 일반', href: '/practice/real-estate-dispute' },
    ]
  },
  {
    title: '성공사례',
    href: '/success-stories',
    subItems: [
      { name: '하자소송 성공사례', href: '/success-stories?category=하자소송' },
      { name: '계약해제 성공사례', href: '/success-stories?category=계약해제' },
    ]
  },
  {
    title: '뉴스/칼럼',
    href: '/news/press',
    subItems: [
      { name: '언론보도', href: '/news/press' },
      { name: '전문칼럼', href: '/columns' },
    ]
  }
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 페이지 이동 시 메뉴 닫기
  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  }, [pathname]);

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    document.body.style.overflow = newState ? 'hidden' : 'unset';
  };

  const handleMobileSubmenu = (title: string) => {
    setActiveSubmenu(activeSubmenu === title ? null : title);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.container} container`}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>법무법인 <span className="accent-text">플로우</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          {menuData.map((item, index) => (
            <div key={index} className={styles.navItem}>
              <Link href={item.href} className={styles.navLink}>
                {item.title}
              </Link>
              <div className={styles.dropdown}>
                <div className={styles.dropdownContent}>
                  {item.subItems.map((sub, sIndex) => (
                    <Link key={sIndex} href={sub.href} className={styles.dropdownLink}>
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>

        <div className={styles.rightActions}>
          <Link href="/consult" className={styles.consultBtn}>
            간편상담 신청
          </Link>
          
          {/* Mobile Hamburger Toggle */}
          <button 
            className={`${styles.mobileToggle} ${isMobileMenuOpen ? styles.active : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.open : ''}`}>
        <div className={styles.mobileMenuContent}>
          <div className={styles.mobileNav}>
            {menuData.map((item, index) => (
              <div key={index} className={styles.mobileNavItem}>
                <div 
                  className={styles.mobileNavHeader}
                  onClick={() => item.subItems ? handleMobileSubmenu(item.title) : null}
                >
                  <Link 
                    href={item.href} 
                    className={styles.mobileNavLink}
                    onClick={(e) => {
                      if (item.subItems) {
                        e.preventDefault();
                      }
                    }}
                  >
                    {item.title}
                  </Link>
                  {item.subItems && (
                    <span className={`${styles.arrow} ${activeSubmenu === item.title ? styles.arrowUp : ''}`}>
                      ▼
                    </span>
                  )}
                </div>
                
                {item.subItems && (
                  <div className={`${styles.mobileSubmenu} ${activeSubmenu === item.title ? styles.submenuOpen : ''}`}>
                    {item.subItems.map((sub, sIndex) => (
                      <Link 
                        key={sIndex} 
                        href={sub.href} 
                        className={styles.mobileSubLink}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className={styles.mobileFooter}>
            <Link href="/consult" className={styles.mobileConsultBtn}>
              지금 바로 상담하기
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
