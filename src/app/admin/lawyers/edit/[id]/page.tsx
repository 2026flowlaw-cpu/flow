"use client";

import React, { useState, useEffect, useRef, use } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';

export default function AdminLawyerEditPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    id: null as number | null,
    name: '',
    title: '',
    slug: '',
    experience: '',
    history: '',
    activities: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const res = await fetch('/api/lawyers');
        const data = await res.json();
        const decodedId = decodeURIComponent(params.id);
        const lawyer = data.find((l: any) => l.slug === decodedId || l.name === decodedId);
        
        if (lawyer) {
          setFormData({
            id: lawyer.id,
            name: lawyer.name || '',
            title: lawyer.title || '',
            slug: lawyer.slug || '',
            experience: (lawyer.experience || []).join('\n'),
            history: (lawyer.history || []).join('\n'),
            activities: (lawyer.activities || []).join('\n'),
          });
          setImagePreview(lawyer.image || null);
        }
      } catch (error) {
        console.error('Failed to fetch lawyer:', error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchLawyer();
  }, [params.id]);

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
    setIsLoading(true);
    
    try {
      const payload = {
        ...formData,
        experience: formData.experience.split('\n').filter(s => s.trim()),
        history: formData.history.split('\n').filter(s => s.trim()),
        activities: formData.activities.split('\n').filter(s => s.trim()),
        image: imagePreview
      };

      const res = await fetch('/api/lawyers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert('성공적으로 저장되었습니다.');
        router.push('/admin/lawyers');
        router.refresh();
      } else {
        alert('저장 실패');
      }
    } catch (err) {
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) return <div className={styles.container}>로딩 중...</div>;

  return (
    <div className={styles.container}>
      {/* ... (rest of the form remains same) */}
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <button onClick={() => router.back()} className={styles.backBtn}>← 뒤로가기</button>
          <span>/ 변호사 관리 / 프로필 수정</span>
        </div>
        <h1 className={styles.title}>{formData.name} 수정</h1>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div className={styles.imageSection}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>프로필 사진</h2>
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
                    <div className={styles.overlay}>사진 변경</div>
                  </div>
                ) : (
                  <div className={styles.uploadPlaceholder}>
                    <span>📷</span>
                    <p>이미지 클릭</p>
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
          </div>

          <div className={styles.contentSection}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>기본 정보</h2>
              <div className={styles.inputGroup}>
                <label>이름</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>직함</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
            </div>

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>상세 내용 (줄바꿈 구분)</h2>
              <div className={styles.inputGroup}>
                <label>대표 경력</label>
                <textarea 
                  rows={3}
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                ></textarea>
              </div>
              <div className={styles.inputGroup}>
                <label>약력</label>
                <textarea 
                  rows={10}
                  value={formData.history}
                  onChange={(e) => setFormData({...formData, history: e.target.value})}
                ></textarea>
              </div>
              <div className={styles.inputGroup}>
                <label>학력 및 활동</label>
                <textarea 
                  rows={5}
                  value={formData.activities}
                  onChange={(e) => setFormData({...formData, activities: e.target.value})}
                ></textarea>
              </div>
            </div>

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
                disabled={isLoading}
              >
                {isLoading ? '저장 중...' : '변경 사항 저장'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
