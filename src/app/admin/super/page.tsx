"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSafeUser, supabase } from '@/lib/supabase';
import styles from './page.module.css';

export default function SuperAdminPage() {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [adminUser, setAdminUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      if (!supabase) return;
      
      const user = await getSafeUser();
      
      // 🛡️ [강력한 보안] 슈퍼 어드민 권한이 없으면 대시보드로 즉시 추방
      if (!user || user.user_metadata?.role !== 'super_admin') {
        setIsAuthorized(false);
        router.push('/admin/dashboard');
        return;
      }

      setAdminUser(user);
      setIsAuthorized(true);
    }
    checkAuth();
  }, [router]);

  if (isAuthorized === null) return <div className={styles.loading}>보안 확인 중...</div>;
  if (isAuthorized === false) return null;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>🔒 시스템 권한 설정 (슈퍼 어드민)</h1>
        <p className={styles.subtitle}>이 페이지는 오직 법무법인 플로우의 최상위 관리자에게만 노출됩니다.</p>
      </header>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>현재 관리자 정보</h2>
          <div className={styles.infoCard}>
            <p><strong>이메일:</strong> {adminUser.email}</p>
            <p><strong>권한 레벨:</strong> <span className={styles.badge}>SUPER_ADMIN</span></p>
            <p><strong>최근 로그인:</strong> {new Date(adminUser.last_sign_in_at).toLocaleString()}</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>관리자 권한 부여 가이드</h2>
          <div className={styles.guideBox}>
            <p>새로운 관리자에게 슈퍼 권한을 부여하려면 **Supabase Dashboard**의 **Authentication &gt; Users**에서 아래 메타데이터를 추가하세요:</p>
            <code>
              {`{ "role": "super_admin" }`}
            </code>
            <p className={styles.warning}>* 이 설정은 시스템의 핵심 보안을 담당하므로 주의가 필요합니다.</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>시스템 로그 (준비 중)</h2>
          <div className={styles.placeholder}>
            향후 관리자들의 활동 내역 및 중요한 변경 사항이 이곳에 기록됩니다.
          </div>
        </section>
      </div>
    </div>
  );
}
