"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getSafeSession, supabase } from '@/lib/supabase';
import styles from './page.module.css';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    // 세션이 이미 있는지 확인
    const checkSession = async () => {
      const session = await getSafeSession();
      if (session) {
        router.push('/admin/dashboard');
      }
    };
    checkSession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    console.log('로그인 시도:', email);

    try {
      if (!supabase) {
        setErrorMessage('수파베이스 클라이언트 설정 오류');
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('수파베이스 응답:', { data, error });

      if (error) {
        // 상세 에러 노출 (영문 그대로 노출하여 원인 파악)
        setErrorMessage(`로그인 실패: ${error.message} (${error.status})`);
        return;
      }

      if (data.user) {
        console.log('로그인 성공!');
        router.push('/admin/dashboard');
      }
    } catch (err: any) {
      console.error('로그인 에러:', err);
      setErrorMessage(`오류 발생: ${err.message || '알 수 없는 에러'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.logoArea}>
          <Link href="/" className={styles.logo}>
            법무법인 <span className={styles.accent}>플로우</span>
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

          {errorMessage && (
            <div className={styles.errorBox}>
               <p className={styles.error}>{errorMessage}</p>
               <p className={styles.help}>* 비밀번호가 맞는데 안된다면 수파베이스에서 유저 Confirm을 확인해주세요.</p>
            </div>
          )}

          <button type="submit" className={styles.loginBtn} disabled={isLoading}>
            {isLoading ? '인증 중...' : '로그인'}
          </button>
        </form>

        <div className={styles.footer}>
          <p>© 2026 Law Firm Flow. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
