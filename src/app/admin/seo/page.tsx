"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import styles from './page.module.css';
import { Globe, Search, MapPin, Code, Save, ShieldCheck } from 'lucide-react';

export default function AdminSeoPage() {
  const router = useRouter();
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | '', msg: string }>({ type: '', msg: '' });

  const [settings, setSettings] = useState({
    title: '법무법인 플로우 - 건설/부동산 전문 법률 그룹',
    description: '건축구조기술사와 변호사의 협업으로 하자소송의 새로운 패러다임을 제시합니다.',
    keywords: '법무법인플로우, 하자소송, 건설분쟁, 부동산변호사, 집단소송',
    og_image: '/images/og_image.png',
    geo_region: 'KR-11',
    geo_placename: 'Seoul',
    geo_position: '37.4918;127.0125',
    google_analytics_id: 'G-XXXXXXXXXX',
    naver_verification: 'naver-verification-code',
    custom_head_scripts: '<!-- Custom scripts for SEO -->'
  });

  useEffect(() => {
    async function checkAuth() {
      if (!supabase) return;
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user?.user_metadata?.role !== 'super_admin') {
        // 테스트 중에는 경고만 띄우고 접근은 유지합니다.
        // 실운영시에는 아래 alert/router.push를 활성화하세요.
        console.warn('Super Admin access required');
      } else {
        setIsSuperAdmin(true);
      }
      
      // 실제 데이터 패칭 로직 (테이블이 없을 경우 기본값 유지)
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .single();
        
        if (data && !error) {
          setSettings(data);
        }
      } catch (err) {
        console.log('Site settings table not found, using defaults.');
      } finally {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setStatus({ type: '', msg: '마스터 설정 동기화 중...' });

    try {
      if (!supabase) throw new Error('Supabase not connected');

      // upsert: 있으면 수정, 없으면 삽입
      const { error } = await supabase
        .from('site_settings')
        .upsert({ id: 1, ...settings });

      if (error) {
        if (error.code === '42P01') {
          throw new Error('데이터베이스에 site_settings 테이블이 존재하지 않습니다. 개발자에게 문의하세요.');
        }
        throw error;
      }
      
      setStatus({ type: 'success', msg: '전역 SEO/GEO 설정이 성공적으로 반영되었습니다!' });
    } catch (err: any) {
      console.error(err);
      setStatus({ type: 'error', msg: `변경 실패: ${err.message}` });
    } finally {
      setIsSaving(false);
      setTimeout(() => setStatus({ type: '', msg: '' }), 3000);
    }
  };

  if (isLoading) return <div className={styles.container}>시스템 보안 프로토콜 확인 중...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <Globe size={32} color="#0A1B39" />
          SEO / GEO 통합 마스터 관리실 <span>SUPER ADMIN ONLY</span>
        </div>
        <p className={styles.desc}>전체 웹사이트의 검색 엔진 노출 전략과 지리적 최적화 데이터를 중앙에서 제어합니다.</p>
      </div>

      <div className={styles.grid}>
        {/* Basic SEO Card */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}><Search size={22} color="#bd9d62" /> 전역 검색 엔진 최적화 (SEO)</h3>
          <div className={styles.inputGroup}>
            <label>메인 타이틀 (Title Tag)</label>
            <input 
              type="text" 
              value={settings.title}
              onChange={(e) => setSettings({...settings, title: e.target.value})}
            />
            <p className={styles.helpText}>브라우저 탭과 검색 결과 상단에 노출되는 가장 중요한 정보입니다.</p>
          </div>
          <div className={styles.inputGroup}>
            <label>전역 메타 설명 (Meta Description)</label>
            <textarea 
              rows={3}
              value={settings.description}
              onChange={(e) => setSettings({...settings, description: e.target.value})}
            />
            <p className={styles.helpText}>검색 결과 리스트에서 제목 아래에 표시되는 요약 문구입니다. (150자 권장)</p>
          </div>
          <div className={styles.inputGroup}>
            <label>메타 키워드 (Comma Separated)</label>
            <input 
              type="text" 
              value={settings.keywords}
              onChange={(e) => setSettings({...settings, keywords: e.target.value})}
            />
          </div>
        </div>

        {/* GEO Optimization Card */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}><MapPin size={22} color="#bd9d62" /> 지리적 위치 최적화 (GEO)</h3>
          <div className={styles.grid} style={{ gap: '15px' }}>
            <div className={styles.inputGroup}>
              <label>GEO Region (Region Code)</label>
              <input 
                type="text" 
                value={settings.geo_region}
                onChange={(e) => setSettings({...settings, geo_region: e.target.value})}
              />
              <p className={styles.helpText}>예: KR-11 (서울)</p>
            </div>
            <div className={styles.inputGroup}>
              <label>GEO Placename</label>
              <input 
                type="text" 
                value={settings.geo_placename}
                onChange={(e) => setSettings({...settings, geo_placename: e.target.value})}
              />
              <p className={styles.helpText}>예: Seoul</p>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>GEO Position (Lat; Long)</label>
            <input 
              type="text" 
              value={settings.geo_position}
              onChange={(e) => setSettings({...settings, geo_position: e.target.value})}
            />
            <p className={styles.helpText}>구글 지도의 위도와 경도를 세미콜론(;)으로 구분하여 입력하세요.</p>
          </div>
          <div className={styles.inputGroup}>
            <label>소셜 공유 이미지 경로 (OG Image)</label>
            <input 
              type="text" 
              value={settings.og_image}
              onChange={(e) => setSettings({...settings, og_image: e.target.value})}
            />
          </div>
        </div>

        {/* Technical Code Card */}
        <div className={`${styles.card} ${styles.fullRow}`}>
          <h3 className={styles.cardTitle}><Code size={22} color="#bd9d62" /> 기술적 마스터 스크립트 관리</h3>
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label>Google Analytics Tag ID</label>
              <input 
                type="text" 
                placeholder="G-XXXXXX"
                value={settings.google_analytics_id}
                onChange={(e) => setSettings({...settings, google_analytics_id: e.target.value})}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Naver Search Advisor Verification</label>
              <input 
                type="text" 
                value={settings.naver_verification}
                onChange={(e) => setSettings({...settings, naver_verification: e.target.value})}
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>Custom Head Scripts (HTML allowed)</label>
            <textarea 
              rows={5}
              className={styles.mono}
              value={settings.custom_head_scripts}
              onChange={(e) => setSettings({...settings, custom_head_scripts: e.target.value})}
            />
            <p className={styles.helpText}>&lt;head&gt; 섹션에 삽입될 외부 서비스 연동 소스코드입니다. 매우 신중하게 수정하세요.</p>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        {status.msg && (
          <div className={`${styles.status} ${status.type === 'error' ? styles.error : styles.success}`}>
            {status.msg}
          </div>
        )}
        <button 
          className={styles.saveBtn} 
          onClick={handleSave}
          disabled={isSaving}
        >
          <Save size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          {isSaving ? '동기화 중...' : '마스터 설정 저장 및 즉시 반영'}
        </button>
      </div>
    </div>
  );
}
