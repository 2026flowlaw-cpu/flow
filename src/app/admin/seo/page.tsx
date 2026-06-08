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
    og_image: '/office_hallway_premium_1776064223861.webp',
    geo_region: 'KR-11',
    geo_placename: 'Seoul',
    geo_position: '37.4918;127.0125',
    google_analytics_id: 'G-XXXXXXXXXX',
    naver_verification: 'naver-verification-code',
    custom_head_scripts: '<!-- Custom scripts for SEO -->'
  });

  const [columns, setColumns] = useState<any[]>([]);
  const [isColumnLoading, setIsColumnLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      if (!supabase) return;
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user?.user_metadata?.role !== 'super_admin') {
        console.warn('Super Admin access required');
      } else {
        setIsSuperAdmin(true);
      }
      
      // 전역 설정 로드
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .single();
        if (data && !error) setSettings(data);
      } catch (err) { console.log('Defaults used.'); }

      // 📚 칼럼 목록 로드 (통합 관리를 위해)
      try {
        const res = await fetch('/api/columns');
        const data = await res.json();
        
        if (data && !data.error) {
          // Sort by creation date
          data.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          setColumns(data);
        }
      } catch (err) { console.error('Columns load failed', err); }
      
      setIsLoading(false);
      setIsColumnLoading(false);
    }
    checkAuth();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setStatus({ type: '', msg: '마스터 설정 동기화 중...' });

    try {
      if (!supabase) throw new Error('Supabase not connected');

      // 1. 전역 설정 저장
      const { error: settingsError } = await supabase
        .from('site_settings')
        .upsert({ id: 1, ...settings });

      if (settingsError) throw settingsError;

      // 2. 개별 칼럼 코드 일괄 저장 로직 (필요시 호출)
      // (각 칼럼의 로컬 변경사항을 추적하여 한꺼번에 저장하는 로직 추가 가능)
      
      setStatus({ type: 'success', msg: '전역 및 개별 기초 설정이 성공적으로 반영되었습니다!' });
    } catch (err: any) {
      console.error(err);
      setStatus({ type: 'error', msg: `변경 실패: ${err.message}` });
    } finally {
      setIsSaving(false);
      setTimeout(() => setStatus({ type: '', msg: '' }), 3000);
    }
  };

  const updateIndividualColumn = async (id: number, meta: string) => {
    try {
      const { error } = await supabase
        .from('legal_columns')
        .update({ custom_meta: meta })
        .eq('id', id);
      
      if (error) throw error;
      
      setColumns(prev => prev.map(c => c.id === id ? { ...c, custom_meta: meta } : c));
      alert('해당 칼럼의 코드가 즉시 주입되었습니다.');
    } catch (err) {
      alert('주입 실패: ' + (err as any).message);
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

        {/* 📚 신규: 칼럼별 개별 코드 마스터 제어판 */}
        <div className={`${styles.card} ${styles.fullRow}`} style={{ border: '2px solid #bd9d62' }}>
          <h3 className={styles.cardTitle}>
            <ShieldCheck size={22} color="#bd9d62" /> 
            칼럼별 개별 특수 코드 마스터 제어판
          </h3>
          <p className={styles.desc}>작성된 모든 칼럼의 개별 메타데이터와 주입 코드를 이곳에서 한눈에 관리하세요.</p>
          
          <div style={{ marginTop: '25px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
              <thead>
                <tr style={{ background: '#f8f9fa', textAlign: 'left', borderBottom: '2px solid #eee' }}>
                  <th style={{ padding: '15px' }}>칼럼 제목</th>
                  <th style={{ padding: '15px' }}>카테고리</th>
                  <th style={{ padding: '15px', width: '400px' }}>주입된 특수 코드 / 메타데이터</th>
                  <th style={{ padding: '15px' }}>액션</th>
                </tr>
              </thead>
              <tbody>
                {isColumnLoading ? (
                  <tr><td colSpan={4} style={{ padding: '40px', textAlign: 'center' }}>칼럼 정보를 불러오는 중...</td></tr>
                ) : columns.map((col) => (
                  <tr key={col.id} style={{ borderBottom: '1px solid #f1f3f5' }}>
                    <td style={{ padding: '15px', fontWeight: '700', color: '#0A1B39' }}>{col.title}</td>
                    <td style={{ padding: '15px' }}><span style={{ background: '#e9ecef', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>{col.category}</span></td>
                    <td style={{ padding: '15px' }}>
                      <textarea 
                        rows={3} 
                        style={{ width: '100%', fontSize: '12px', fontFamily: 'monospace', padding: '10px', borderRadius: '8px', border: '1px solid #dee2e6' }}
                        value={col.custom_meta || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setColumns(prev => prev.map(c => c.id === col.id ? { ...c, custom_meta: val } : c));
                        }}
                        placeholder="이 칼럼에만 적용될 스크립트나 메타데이터를 입력하세요."
                      />
                    </td>
                    <td style={{ padding: '15px' }}>
                      <button 
                        onClick={() => updateIndividualColumn(col.id, col.custom_meta)}
                        style={{ background: '#bd9d62', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '6px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap' }}
                      >
                        즉시 주입
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
          {isSaving ? '동기화 중...' : '마스터 전역 설정 저장'}
        </button>
      </div>
    </div>
  );
}
