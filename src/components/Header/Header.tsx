"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

const menuData = [
  {
    title: '회사 소개',
    href: '/about/intro',
    subItems: [
      { name: '법무법인 플로우', href: '/about/intro' },
      { name: '대표이사 인사말', href: '/about/greetings' },
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
    href: '/practice',
    subItems: [
      { name: '분양계약해제센터', href: '/practice/resale-cancellation' },
      { name: '전세사기센터', href: '/practice/jeonse-fraud' },
      { name: '부동산분쟁센터', href: '/practice/real-estate-dispute' },
      { name: '건설분쟁센터', href: '/practice/construction-dispute' },
      { name: '하자소송센터', href: '/practice/defect-litigation' },
      { name: '집단소송센터', href: '/practice/class-action' },
      { name: '민사일반센터', href: '/practice/general-civil' },
      { name: '에듀법률센터', href: '/practice/edu-law' },
      { name: '형사소송센터', href: '/practice/criminal-law/overview' },
    ]
  },
  {
    title: '플로우 소식',
    href: '/news/press',
    subItems: [
      { name: '성공사례', href: '/success-stories' },
      { name: '언론보도', href: '/news/press' },
      { name: '유튜브', href: '/news/youtube' },
      { name: '법률칼럼', href: '/columns' },
      { name: '법률 정보', href: '/news/legal-info' },
      { name: '네이버 블로그', href: 'https://blog.naver.com/flowlaw' },
    ]
  },
  {
    title: '상담게시판',
    href: '/consult',
    subItems: [
      { name: '상담신청', href: '/consult' },
      { name: '고객 후기', href: '/#reviews' },
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

  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  }, [pathname]);

  // 관리자 페이지에서는 헤더를 렌더링하지 않습니다.
  if (pathname.startsWith('/admin')) return null;

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    document.body.style.overflow = newState ? 'hidden' : 'unset';
  };

  const handleMobileSubmenu = (title: string) => {
    setActiveSubmenu(activeSubmenu === title ? null : title);
  };

  // 메인 페이지이거나 상단에 어두운 배너(Hero)가 있는 페이지들은 투명 헤더로 시작합니다.
  const hasDarkHero = pathname === '/' || pathname.startsWith('/practice') || pathname.startsWith('/about');
  const isTransparentMode = hasDarkHero && !isScrolled;
  
  // 동적으로 메뉴 데이터 변경 (형사 전담 페이지인 경우)
  const isCriminalPage = pathname.startsWith('/practice/criminal-law');
  
  const currentMenuData = menuData.map(item => {
    if (item.title === '업무분야' && isCriminalPage) {
      return {
        ...item,
        href: '/practice/criminal-law/overview', // 제목 클릭 시 개요 페이지로 이동
        subItems: [
          { name: '성범죄센터', href: '/practice/criminal-law/sex-offense' },
          { name: '음주·교통센터', href: '/practice/criminal-law/dui-traffic' },
          { name: '마약센터', href: '/practice/criminal-law/drugs' },
          { name: '보이스피싱센터', href: '/practice/criminal-law/voice-phishing' },
          { name: '건설형사센터', href: '/practice/criminal-law/construction' },
          { name: '경제범죄센터', href: '/practice/criminal-law/economic' },
          { name: '소년학폭센터', href: '/practice/criminal-law/juvenile' },
          { name: '일반형사센터', href: '/practice/criminal-law/general' },
        ]
      };
    }
    if (item.title === '플로우 소식' && isCriminalPage) {
      return {
        ...item,
        subItems: item.subItems.map(sub => {
          if (sub.name === '성공사례') {
            return { ...sub, href: '/success-stories?category=형사' };
          }
          return sub;
        })
      };
    }
    return item;
  });

  return (
    <header className={`${styles.header} ${!isTransparentMode ? styles.scrolled : ''}`}>
      <div className={`${styles.container} container`}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>법무법인 <span className="accent-text">플로우</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          {currentMenuData.map((item, index) => (
            <div key={index} className={styles.navItem}>
              {item.subItems ? (
                <span 
                  className={styles.navLink} 
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => e.preventDefault()}
                >
                  {item.title}
                </span>
              ) : (
                <Link href={item.href} className={styles.navLink}>
                  {item.title}
                </Link>
              )}
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
          <Link href="/consult" className={styles.consultButton}>
            간편상담 신청
          </Link>

          <Link href="/admin/login" className={styles.loginBtn}>
            로그인
          </Link>
          
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
            {currentMenuData.map((item, index) => (
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
