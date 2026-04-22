"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './AdminSidebar.module.css';

const menuItems = [
  { name: '대시보드', href: '/admin/dashboard', icon: '📊' },
  { name: '변호사 관리', href: '/admin/lawyers', icon: '🤵‍♂️' },
  { name: '칼럼 관리', href: '/admin/columns', icon: '✍️' },
  { name: '성공사례 관리', href: '/admin/success-stories', icon: '🏆' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoArea}>
        <Link href="/" className={styles.logo}>
          법무법인 <span className={styles.accent}>플로우</span>
        </Link>
        <p className={styles.label}>ADMIN</p>
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
      </nav>

      <div className={styles.footer}>
        <button onClick={() => window.location.href = '/admin/login'} className={styles.logoutBtn}>
          로그아웃
        </button>
      </div>
    </aside>
  );
}
