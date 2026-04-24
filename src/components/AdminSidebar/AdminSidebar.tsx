"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import styles from './AdminSidebar.module.css';

const menuItems = [
  { name: '대시보드', href: '/admin/dashboard', icon: '📊' },
  { name: '상담 내역 확인', href: '/admin/consultations', icon: '📞' },
  { name: '성공사례 관리', href: '/admin/success-stories', icon: '🏆' },
  { name: '변호사 관리', href: '/admin/lawyers', icon: '🤵‍♂️' },
  { name: '유튜브 관리', href: '/admin/youtube', icon: '🎬' },
  { name: '칼럼 관리', href: '/admin/columns', icon: '✍️' },
  { name: '언론보도 관리', href: '/admin/press-releases', icon: '📰' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [clickCount, setClickCount] = useState(0);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [showHiddenMenu, setShowHiddenMenu] = useState(false);

  useEffect(() => {
    async function checkRole() {
      if (!supabase) return;
      const { data: { user } } = await supabase.auth.getUser();
      // 유저 메타데이터에서 super_admin 권한 확인
      if (user?.user_metadata?.role === 'super_admin') {
        setIsSuperAdmin(true);
      }
    }
    checkRole();
  }, []);

  const handleSecretTrigger = () => {
    if (!isSuperAdmin) return;
    
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    // 5번 연속 클릭 시 숨겨진 메뉴 노출
    if (newCount >= 5) {
      setShowHiddenMenu(true);
      setClickCount(0);
    }

    // 3초 후 클릭 초기화 (연속 클릭 유도)
    setTimeout(() => setClickCount(0), 3000);
  };

  const handleLogout = async () => {
    try {
      if (supabase) {
        await supabase.auth.signOut();
      }
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Logout failed:', error);
      window.location.href = '/admin/login';
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoArea}>
        <Link href="/" className={styles.logo}>
          법무법인 <span className={styles.accent}>플로우</span>
        </Link>
        <p 
          className={styles.label} 
          onClick={handleSecretTrigger}
          style={{ cursor: isSuperAdmin ? 'pointer' : 'default', userSelect: 'none' }}
        >
          ADMIN {showHiddenMenu && <span style={{ fontSize: '10px', color: 'var(--accent)' }}>●</span>}
        </p>
      </div>

      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
          >
            <span className={styles.icon}>{item.icon}</span>
            {item.name}
          </Link>
        ))}

        {/* 🤫 수퍼 어드민 전용 숨겨진 메뉴 */}
        {showHiddenMenu && (
          <Link 
            href="/admin/super" 
            className={`${styles.navItem} ${styles.superItem} ${pathname === '/admin/super' ? styles.active : ''}`}
            style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}
          >
            <span className={styles.icon}>🔐</span>
            시스템 권한 설정
          </Link>
        )}
      </nav>

      <div className={styles.footer}>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          로그아웃
        </button>
      </div>
    </aside>
  );
}
