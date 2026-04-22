"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import styles from './page.module.css';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      if (!supabase) {
        throw new Error('수파베이스 클라이언트가 초기화되지 않았습니다. 환경 변수를 확인해주세요.');
      }
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('Login Response:', { data, error });

      if (error) {
        // Show detailed error from Supabase
        setErrorMessage(error.message === 'Invalid login credentials' 
          ? '이메일 또는 비밀번호가 올바르지 않습니다.' 
          : error.message);
        console.error('Supabase Login Error:', error.message);
        return;
      }

      if (data.user) {
        console.log('Login Success! User:', data.user);
        router.push('/admin/dashboard');
      }
    } catch (err: any) {
      console.error('Unexpected Login Error:', err);
      setErrorMessage(err.message || '로그인 처리 중 알 수 없는 오류가 발생했습니다.');
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
