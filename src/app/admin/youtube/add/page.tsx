"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../add/page.module.css'; // Reusing common form styles

export default function AdminYouTubeAddPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtube_id: '',
    category: '하자소송',
    theme: 'light'
  });
  const [isSaving, setIsSaving] = useState(false);

  // Helper to extract YouTube ID from URL
  const extractId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = extractId(e.target.value);
    setFormData({ ...formData, youtube_id: id });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.youtube_id) return alert('필수 항목을 입력해주세요.');
    setIsSaving(true);
    
    try {
      const res = await fetch('/api/youtube', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert('영상이 등록되었습니다.');
        router.push('/admin/youtube');
      } else {
        alert('등록 실패');
      }
    } catch (err) {
      alert('오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <button onClick={() => router.back()} className={styles.backBtn}>← 뒤로가기</button>
          <span>/ 유튜브 관리 / 영상 추가</span>
        </div>
        <h1 className={styles.title}>새 영상 추가</h1>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>영상 정보 입력</h2>
          
          <div className={styles.inputGroup}>
            <label>영상 제목 *</label>
            <input 
              type="text" 
              placeholder="영상 제목을 입력하세요"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>유튜브 URL 또는 ID *</label>
            <input 
              type="text" 
              placeholder="https://www.youtube.com/watch?v=..."
              onChange={handleUrlChange}
              required
            />
            <p className={styles.helpText}>유튜브 주소를 붙여넣으시면 자동으로 ID가 추출됩니다. (추출된 ID: {formData.youtube_id})</p>
          </div>

          <div className={styles.inputGroup}>
            <label>카테고리</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option>하자소송</option>
              <option>부동산/민사</option>
              <option>형사소송</option>
              <option>법률칼럼</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>배경 테마 선택</label>
            <div className={styles.themeToggle}>
              <label className={styles.radioLabel}>
                <input 
                  type="radio" 
                  name="theme" 
                  value="light" 
                  checked={formData.theme === 'light'} 
                  onChange={(e) => setFormData({...formData, theme: e.target.value})}
                /> 화이트 배경
              </label>
              <label className={styles.radioLabel}>
                <input 
                  type="radio" 
                  name="theme" 
                  value="dark" 
                  checked={formData.theme === 'dark'} 
                  onChange={(e) => setFormData({...formData, theme: e.target.value})}
                /> 딥 블루 배경
              </label>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>상세 설명 (소식/보도 등)</label>
            <textarea 
              rows={4}
              placeholder="영상에 대한 짧은 설명을 입력하세요..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" onClick={() => router.back()} className={styles.cancelBtn}>취소</button>
          <button type="submit" className={styles.saveBtn} disabled={isSaving}>
            {isSaving ? '저장 중...' : '영상 등록 완료'}
          </button>
        </div>
      </form>
    </div>
  );
}
