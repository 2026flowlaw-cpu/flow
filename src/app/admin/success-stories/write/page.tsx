"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSafeUser, supabase } from '@/lib/supabase';
import styles from './write.module.css';

const CATEGORIES = ['분양계약해제', '건설', '부동산', '임대차', 'HR', '민사 일반', '성범죄', '음주교통', '마약', '보이스피싱', '건설형사', '경제범죄', '소년학폭', '일반형사'];

export default function SuccessStoryWritePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: '분양계약해제',
    description: '',
    content: '',
    badge: '승소 (FULL WIN)',
    lawyer_name: '',
    image_url: ''
  });

  // Admin check
  useEffect(() => {
    const checkUser = async () => {
      const user = await getSafeUser();
      if (!user) {
        alert('관리자 로그인이 필요합니다.');
        router.push('/admin/login');
      } else {
        setIsAdmin(true);
      }
    };
    checkUser();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `success-images/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('success-stories')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('success-stories')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, image_url: publicUrl }));
      alert('이미지 업로드 성공!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('이미지 업로드 중 오류가 발생했습니다. (버킷 권한 확인 필요)');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      alert('제목과 상세 내용은 필수입니다.');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('success_stories')
        .insert([formData]);

      if (error) throw error;

      alert('성공사례가 등록되었습니다.');
      router.push('/success-stories');
    } catch (error: any) {
      console.error('Error saving:', error);
      alert('저장 중 오류가 발생했습니다: ' + (error.message || '알 수 없는 오류'));
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAdmin) return <div className={styles.loading}>인증 확인 중...</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>성공사례 작성</h1>
        <button onClick={() => router.back()} className={styles.backBtn}>뒤로가기</button>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.section}>
          <label>제목</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="예: 송도 OO자이 아파트 하자보수 청구 승소"
            required
          />
        </div>

        <div className={styles.row}>
          <div className={styles.section}>
            <label>분야</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className={styles.section}>
            <label>뱃지 (결과)</label>
            <input 
              type="text" 
              name="badge" 
              value={formData.badge} 
              onChange={handleChange} 
              placeholder="예: 승소, 일부승소 등"
            />
          </div>
        </div>

        <div className={styles.section}>
          <label>대표 이미지</label>
          <div className={styles.uploadArea}>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {formData.image_url && <img src={formData.image_url} alt="Preview" className={styles.preview} />}
          </div>
        </div>

        <div className={styles.section}>
          <label>요약 설명 (목록 노출용)</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="리스트 페이지에 노출될 짧은 설명을 입력하세요."
            rows={3}
          />
        </div>

        <div className={styles.section}>
          <label>상세 소송 내용</label>
          <textarea 
            name="content" 
            value={formData.content} 
            onChange={handleChange} 
            placeholder="상세한 승소 사례 내용을 입력하세요."
            rows={15}
            required
          />
        </div>

        <div className={styles.section}>
          <label>담당 변호사</label>
          <input 
            type="text" 
            name="lawyer_name" 
            value={formData.lawyer_name} 
            onChange={handleChange} 
            placeholder="성함을 입력하세요 (예: 정미우 대표변호사)"
          />
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? '저장 중...' : '기록 저장하기'}
          </button>
        </div>
      </form>
    </div>
  );
}
