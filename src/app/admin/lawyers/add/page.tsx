"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';

export default function AdminLawyerAddPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    experience: '',
    history: '',
    activities: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    if (!formData.name) return alert('이름을 입력해주세요.');
    setIsLoading(true);
    
    try {
      const payload = {
        name: formData.name,
        title: formData.title,
        experience: formData.experience.split('\n').filter(s => s.trim()),
        history: formData.history.split('\n').filter(s => s.trim()),
        activities: formData.activities.split('\n').filter(s => s.trim()),
        image: imagePreview || '/images/lawyer1.png' // Default image
      };

      const res = await fetch('/api/lawyers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert('새 변호사가 등록되었습니다.');
        router.push('/admin/lawyers');
        router.refresh();
      } else {
        alert('등록 실패');
      }
    } catch (err) {
      alert('등록 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <button onClick={() => router.back()} className={styles.backBtn}>← 뒤로가기</button>
          <span>/ 변호사 관리 / 신규 등록</span>
        </div>
        <h1 className={styles.title}>새로운 변호사 추가</h1>
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
          </div>

          <div className={styles.contentSection}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>기본 정보</h2>
              <div className={styles.inputGroup}>
                <label>이름</label>
                <input 
                  type="text" 
                  placeholder="예: 홍길동"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label>직함</label>
                <input 
                  type="text" 
                  placeholder="예: 소속 변호사"
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
                  placeholder="목록 페이지에 노출될 대표 경력들..."
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                ></textarea>
              </div>
              <div className={styles.inputGroup}>
                <label>약력</label>
                <textarea 
                  rows={10}
                  placeholder="상세 연약 및 경력 사항..."
                  value={formData.history}
                  onChange={(e) => setFormData({...formData, history: e.target.value})}
                ></textarea>
              </div>
              <div className={styles.inputGroup}>
                <label>학력 및 활동</label>
                <textarea 
                  rows={5}
                  placeholder="학력, 수상 내역, 주요 활동..."
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
                {isLoading ? '등록 중...' : '변호사 등록'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
