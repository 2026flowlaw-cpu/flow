"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../youtube/admin-youtube.module.css';
import { uploadImage } from '@/lib/upload';
import Editor from '@/components/Editor/Editor';
import { supabase } from '@/lib/supabase';

export default function AdminColumnEditPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const params = React.use(paramsPromise);
  const colId = params.id;

  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    summary: '',
    content: '',
    category: '법률칼럼',
    author_name: '대표변호사',
    image_url: '',
    custom_meta: '' // 🚀 슈퍼 어드민 전용 메타 코드
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState<{ type: 'error' | 'success' | '', text: string }>({ type: '', text: '' });
  const [isSaving, setIsSaving] = useState(false);

  // 🛡️ [강력한 권한 및 데이터 확인] 슈퍼 어드민 여부를 실시간 감지합니다.
  useEffect(() => {
    if (!supabase) return;

    // 1. 실시간 권한 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      if (session?.user?.user_metadata?.role === 'super_admin') {
        setIsSuperAdmin(true);
      }
    });

    // 2. 초기 로드 및 데이터 페칭
    const fetchData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.user_metadata?.role === 'super_admin') {
          setIsSuperAdmin(true);
        }

        const res = await fetch('/api/columns');
        const data = await res.json();
        const currentCol = data.find((c: any) => c.id.toString() === colId.toString());
        
        if (currentCol) {
          setFormData({
            id: currentCol.id,
            title: currentCol.title,
            summary: currentCol.summary || '',
            content: currentCol.content,
            category: currentCol.category,
            author_name: currentCol.author_name,
            image_url: currentCol.image_url || '',
            custom_meta: currentCol.custom_meta || ''
          });
        }
      } catch (error) {
        console.error('Data sync failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    return () => subscription.unsubscribe();
  }, [colId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMsg({ type: '', text: '수정 사항 저장 중...' });
    
    try {
      let finalImageUrl = formData.image_url;

      if (selectedFile) {
        setStatusMsg({ type: '', text: '새 이미지 업로드 중...' });
        finalImageUrl = await uploadImage(selectedFile);
      }

      const res = await fetch('/api/columns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, image_url: finalImageUrl })
      });

      if (res.ok) {
        setStatusMsg({ type: 'success', text: '칼럼이 성공적으로 수정되었습니다!' });
        setTimeout(() => router.push('/admin/columns'), 1500);
      } else {
        const errorData = await res.json();
        setStatusMsg({ type: 'error', text: `수정 실패: ${errorData.error || '데이터베이스 필드를 확인해주세요.'}` });
      }
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: '네트워크 오류 발생: ' + err.message });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className={styles.loading}>칼럼 데이터를 불러오는 중...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <button onClick={() => router.back()} className={styles.backBtn}>← 뒤로가기</button>
          <span>/ 법률칼럼 관리 / 칼럼 수정</span>
        </div>
        <h1 className={styles.title}>법률칼럼 수정</h1>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>칼럼 정보 편집</h2>
          
          <div className={styles.inputGroup}>
            <label>칼럼 제목 *</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>대표 이미지 (변경시에만 선택)</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
              style={{ padding: '8px' }}
            />
            {formData.image_url && !selectedFile && (
              <p className={styles.helpText}>현재 설정된 이미지가 있습니다. 파일을 선택하면 교체됩니다.</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>요약 (목록 노출용)</label>
            <textarea 
              rows={2}
              value={formData.summary}
              onChange={(e) => setFormData({...formData, summary: e.target.value})}
              placeholder="SEO 및 목록 미리보기에 활용됩니다."
            ></textarea>
          </div>

          <div className={styles.inputGroup}>
            <label>상세 내용 (본문) *</label>
            <Editor 
              value={formData.content}
              onChange={(val) => setFormData({...formData, content: val})}
            />
          </div>

          <div className={styles.themeToggle}>
            <div className={styles.inputGroup} style={{ flex: 1 }}>
              <label>카테고리</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option>법률칼럼</option>
                <option>부동산 소식</option>
                <option>하자기술정보</option>
              </select>
            </div>
            <div className={styles.inputGroup} style={{ flex: 1 }}>
              <label>작성자</label>
              <input 
                type="text"
                value={formData.author_name}
                onChange={(e) => setFormData({...formData, author_name: e.target.value})}
              />
            </div>
          </div>

          {/* 🔐 [슈퍼 어드민 전담] 개별 칼럼 특수 코드 주입기 */}
          {isSuperAdmin && (
            <div style={{ 
              marginTop: '40px', 
              padding: '30px', 
              backgroundColor: '#f8fafc', 
              border: '2px dashed #bd9d62', 
              borderRadius: '20px',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-15px',
                left: '20px',
                background: '#bd9d62',
                color: 'white',
                padding: '4px 15px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '900'
              }}>SUPER ADMIN ONLY</div>
              <label style={{ color: '#0A1B39', fontWeight: '800', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🚀 개별 칼럼 특수 코드 / 메타데이터 주입
              </label>
              <textarea 
                rows={5}
                placeholder='이 칼럼에만 적용될 <meta>, <script>, 또는 JSON-LD 코드를 입력하세요.'
                value={formData.custom_meta}
                onChange={(e) => setFormData({...formData, custom_meta: e.target.value})}
                style={{ 
                  fontFamily: 'monospace', 
                  fontSize: '13px', 
                  marginTop: '15px', 
                  width: '100%',
                  padding: '15px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0'
                }}
              ></textarea>
              <p style={{ color: '#64748b', fontSize: '13px', marginTop: '10px' }}>
                * 입력한 코드는 해당 칼럼 상세 페이지의 헤더 섹션에 즉시 삽입됩니다. GEO 태그나 특정 트래킹 픽셀 심기에 활용하세요.
              </p>
            </div>
          )}

          {statusMsg.text && (
            <div style={{ 
              marginTop: '20px', 
              padding: '15px', 
              borderRadius: '6px',
              backgroundColor: statusMsg.type === 'error' ? '#fff5f5' : '#f0fff4',
              color: statusMsg.type === 'error' ? '#ff4d4d' : '#2f855a',
              border: `1px solid ${statusMsg.type === 'error' ? '#ffe3e3' : '#c6f6d5'}`,
              fontWeight: '600'
            }}>
              {statusMsg.text}
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <button type="button" onClick={() => router.back()} className={styles.cancelBtn}>취소</button>
          <button type="submit" className={styles.saveBtn} disabled={isSaving}>
            {isSaving ? '저장 중...' : '칼럼 수정 완료'}
          </button>
        </div>
      </form>
    </div>
  );
}
