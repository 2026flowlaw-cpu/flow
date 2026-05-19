"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';

export default function AdminSuccessStoryAddPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    id: '',
    displayId: '',
    category: '분양계약해제',
    title: '',
    description: '',
    badge: '승소 (FULL WIN)',
    lawyerName: '',
  });
  
  const [lawyers, setLawyers] = useState<any[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const res = await fetch('/api/lawyers');
        const data = await res.json();
        setLawyers(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, lawyerName: data[0].name }));
        }
      } catch (error) {
        console.error('Failed to fetch lawyers:', error);
      }
    };
    fetchLawyers();
  }, []);

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
    setIsLoading(true);
    
    try {
      const selectedLawyer = lawyers.find(l => l.name === formData.lawyerName);
      const payload = {
        ...formData,
        id: formData.id || `CASE-${Date.now()}`,
        image: imagePreview || '/images/hero_bg.png',
        lawyer: {
          name: formData.lawyerName,
          initials: selectedLawyer ? selectedLawyer.name.substring(0, 2).toUpperCase() : 'JD'
        }
      };

      const res = await fetch('/api/success-stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert('성공사례가 등록되었습니다.');
        router.push('/admin/success-stories');
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
          <span>/ 성공사례 관리 / 신규 등록</span>
        </div>
        <h1 className={styles.title}>새로운 성공사례 추가</h1>
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
                    <p>이미지 추가 (600x400 권장)</p>
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
                <label>사례 일련번호 (자동생성 가능)</label>
                <input 
                  type="text" 
                  placeholder="예: 2024-001"
                  value={formData.id}
                  onChange={(e) => setFormData({...formData, id: e.target.value})}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>표시 ID</label>
                <input 
                  type="text" 
                  placeholder="예: Case #2024-001"
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
                  <option>성범죄</option>
                  <option>음주교통</option>
                  <option>마약</option>
                  <option>보이스피싱</option>
                  <option>건설형사</option>
                  <option>경제범죄</option>
                  <option>소년학폭</option>
                  <option>일반형사</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>사례 제목</label>
                <input 
                  type="text" 
                  placeholder="사례의 핵심 내용을 입력하세요"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label>사례 요약 설명</label>
                <textarea 
                  rows={5}
                  placeholder="사건의 개요 및 결과를 요약하여 입력하세요..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                ></textarea>
              </div>
              <div className={styles.inputGroup}>
                <label>담당 변호사</label>
                <select 
                  value={formData.lawyerName}
                  onChange={(e) => setFormData({...formData, lawyerName: e.target.value})}
                >
                  {lawyers.map(l => (
                    <option key={l.name} value={l.name}>{l.name}</option>
                  ))}
                  {lawyers.length === 0 && <option>정미우 대표변호사</option>}
                </select>
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
                {isLoading ? '등록 중...' : '성공사례 등록'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
