"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../add/page.module.css';

export default function AdminYouTubeEditPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const params = React.use(paramsPromise);
  const videoId = params.id;

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    youtube_id: '',
    category: '하자소송',
    theme: 'light'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch('/api/youtube');
        const data = await res.json();
        const currentVideo = data.find((v: any) => v.id.toString() === videoId.toString());
        
        if (currentVideo) {
          setFormData({
            id: currentVideo.id,
            title: currentVideo.title,
            description: currentVideo.description || '',
            youtube_id: currentVideo.youtube_id,
            category: currentVideo.category,
            theme: currentVideo.theme
          });
        } else {
          alert('영상을 찾을 수 없습니다.');
          router.push('/admin/youtube');
        }
      } catch (error) {
        console.error('Failed to fetch video:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideo();
  }, [videoId, router]);

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
    setIsSaving(true);
    
    try {
      const res = await fetch('/api/youtube', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert('영상이 수정되었습니다.');
        router.push('/admin/youtube');
      } else {
        alert('수정 실패');
      }
    } catch (err) {
      alert('오류가 발생했습니다.');
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
          <span>/ 유튜브 관리 / 영상 수정</span>
        </div>
        <h1 className={styles.title}>영상 정보 수정</h1>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>영상 정보 편집</h2>
          
          <div className={styles.inputGroup}>
            <label>영상 제목 *</label>
            <input 
              type="text" 
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
              value={`https://www.youtube.com/watch?v=${formData.youtube_id}`}
              onChange={handleUrlChange}
              required
            />
            <p className={styles.helpText}>현재 ID: {formData.youtube_id}</p>
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
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" onClick={() => router.back()} className={styles.cancelBtn}>취소</button>
          <button type="submit" className={styles.saveBtn} disabled={isSaving}>
            {isSaving ? '수정 중...' : '영상 수정 완료'}
          </button>
        </div>
      </form>
    </div>
  );
}
