"use client";

import React, { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      if (!supabase) {
        throw new Error('Supabase client is not initialized. Please check your environment variables.');
      }
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage('이메일 또는 비밀번호가 일치하지 않거나 권한이 없습니다.');
        return;
      }

      if (data.user) {
        // Redirect to dashboard on success
        window.location.href = '/admin/dashboard';
      }
    } catch (err) {
      setErrorMessage('로그인 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.logoArea}>
          <Link href="/" className={styles.logo}>
            법무법인 <span className={styles.accent}>일신</span>
          </Link>
          <p className={styles.subtitle}>ADMIN CONSOLE</p>
        </div>

        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">관리자 이메일</label>
            <input 
              type="email" 
              id="email" 
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">비밀번호</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMessage && <p className={styles.error}>{errorMessage}</p>}

          <button type="submit" className={styles.loginBtn} disabled={isLoading}>
            {isLoading ? '인증 중...' : '로그인'}
          </button>
        </form>

        <div className={styles.footer}>
          <p>© 2026 Law Firm Ilshin. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
