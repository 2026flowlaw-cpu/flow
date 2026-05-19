"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import styles from '../../add/page.module.css'; // Reusing add page styles

export default function AdminSuccessStoryEditPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const params = React.use(paramsPromise);
  const storyId = params.id;
  
  const [formData, setFormData] = useState({
    id: '',
    displayId: '',
    category: '분양계약해제',
    title: '',
    description: '',
    content: '',
    badge: '승소 (FULL WIN)',
    lawyerName: '',
    custom_meta: '',
  });
  
  const [lawyers, setLawyers] = useState<any[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  
  useEffect(() => {
    async function checkRole() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.user_metadata?.role === 'super_admin') {
        setIsSuperAdmin(true);
      }
    }
    checkRole();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Lawyers
        const lRes = await fetch('/api/lawyers');
        const lData = await lRes.json();
        setLawyers(lData);

        // Fetch Story
        const sRes = await fetch('/api/success-stories');
        const sData = await sRes.json();
        const currentStory = sData.find((s: any) => s.id.toString() === storyId.toString());
        
        if (currentStory) {
          setFormData({
            id: currentStory.id.toString(),
            displayId: currentStory.displayId || `Case #DB-${currentStory.id}`,
            category: currentStory.category,
            title: currentStory.title,
            description: currentStory.description || '',
            content: currentStory.content || currentStory.description || '',
            badge: currentStory.badge,
            lawyerName: currentStory.lawyer?.name || currentStory.lawyer_name || '',
            custom_meta: currentStory.custom_meta || ''
          });
          setImagePreview(currentStory.image || currentStory.image_url);
        } else {
          alert('사례를 찾을 수 없습니다.');
          router.push('/admin/success-stories');
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [storyId, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return alert('제목을 입력해주세요.');
    setIsSaving(true);
    
    try {
      const payload = {
        ...formData,
        image: imagePreview,
      };

      const res = await fetch('/api/success-stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert('성공사례가 수정되었습니다.');
        router.push('/admin/success-stories');
        router.refresh();
      } else {
        const errorData = await res.json();
        alert('수정 실패: ' + (errorData.error || '알 수 없는 오류'));
      }
    } catch (err) {
      alert('수정 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className={styles.loading}>데이터 불러오는 중...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <button onClick={() => router.back()} className={styles.backBtn}>← 뒤로가기</button>
          <span>/ 성공사례 관리 / 사례 수정</span>
        </div>
        <h1 className={styles.title}>성공사례 수정</h1>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div className={styles.imageSection}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>대표 이미지</h2>
              <div 
                className={styles.imageUploadArea}
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <div className={styles.previewContainer}>
                    <Image 
                      src={imagePreview} 
                      alt="Preview" 
                      fill 
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ) : (
                  <div className={styles.uploadPlaceholder}>
                    <span>📷</span>
                    <p>이미지 추가</p>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                className={styles.hiddenInput}
                accept="image/*"
              />
            </div>

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>상태 정보</h2>
              <div className={styles.inputGroup}>
                <label>사례 ID (수정 불가)</label>
                <input 
                  type="text" 
                  value={formData.id}
                  disabled
                  readOnly
                />
              </div>
              <div className={styles.inputGroup}>
                <label>표시 ID</label>
                <input 
                  type="text" 
                  value={formData.displayId}
                  onChange={(e) => setFormData({...formData, displayId: e.target.value})}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>결과 배지</label>
                <select 
                  value={formData.badge}
                  onChange={(e) => setFormData({...formData, badge: e.target.value})}
                >
                  <option>승소 (FULL WIN)</option>
                  <option>일부승소 (SIGNIFICANT)</option>
                  <option>화해권고결정</option>
                  <option>조정성립</option>
                  <option>기각 (DEFENSE SUCCESS)</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.contentSection}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>상세 내용</h2>
              <div className={styles.inputGroup}>
                <label>카테고리</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option>분양계약해제</option>
                  <option>건설</option>
                  <option>부동산</option>
                  <option>임대차</option>
                  <option>HR</option>
                  <option>민사 일반</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>사례 제목</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label>요약 설명 (목록 노출용)</label>
                <textarea 
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                ></textarea>
              </div>
              <div className={styles.inputGroup}>
                <label>상세 내용 (본문)</label>
                <textarea 
                  rows={10}
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  required
                ></textarea>
              </div>
              <div className={styles.inputGroup}>
                <label>담당 변호사</label>
                <select 
                  value={formData.lawyerName}
                  onChange={(e) => setFormData({...formData, lawyerName: e.target.value})}
                >
                  <option value="">담당 변호사 선택</option>
                  {lawyers.map(l => (
                    <option key={l.name} value={l.name}>{l.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 🔐 [슈퍼 어드민 전용] 개별 성공사례 코드 주입기 */}
            {isSuperAdmin && (
              <div style={{ marginTop: '20px', padding: '25px', backgroundColor: '#fcfcfd', border: '1px dashed #bd9d62', borderRadius: '15px' }}>
                <label style={{ color: '#0A1B39', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }}>
                  🚀 개별 성공사례 특수 코드 / 메타데이터 주입
                </label>
                <textarea 
                  rows={4}
                  placeholder='이 성공사례에만 적용될 SEO, GEO, 트래킹 코드를 입력하세요.'
                  value={(formData as any).custom_meta || ''}
                  onChange={(e) => setFormData({...formData, custom_meta: e.target.value} as any)}
                  style={{ fontFamily: 'monospace', fontSize: '12px', marginTop: '10px', width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }}
                ></textarea>
                <p style={{ color: '#666', fontSize: '12px', marginTop: '8px' }}>
                  * 최고 관리자 전용 기능입니다. 주입된 코드는 해당 게시물 헤드 섹션에 반영됩니다.
                </p>
              </div>
            )}

            <div className={styles.actions}>
              <button 
                type="button" 
                onClick={() => router.back()} 
                className={styles.cancelBtn}
              >
                취소
              </button>
              <button 
                type="submit" 
                className={styles.saveBtn}
                disabled={isSaving}
              >
                {isSaving ? '수정 중...' : '사례 수정 완료'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
