"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../youtube/admin-youtube.module.css';
import { uploadImage } from '@/lib/upload';
import Editor from '@/components/Editor/Editor';

export default function AdminPressAddPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    press_name: '',
    publish_date: new Date().toISOString().split('T')[0],
    external_url: '',
    image_url: '',
    content: ''
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setLoading(true);
      const url = await uploadImage(file);
      setFormData({ ...formData, image_url: url });
      alert('이미지가 업로드되었습니다.');
    } catch (error) {
      alert('업로드 실패');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/press-releases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert('등록되었습니다.');
        router.push('/admin/press-releases');
      }
    } catch (error) {
      alert('등록 중 오류 발생');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>새 언론보도 등록</h1>
      
      <div className={styles.card} style={{ padding: '40px' }}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>기사 제목 *</label>
            <input 
              type="text" 
              placeholder="뉴스 기사의 제목을 입력하세요."
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className={styles.inputGroup}>
              <label>언론사명 *</label>
              <input 
                type="text" 
                placeholder="예: 조선일보, KBS뉴스"
                value={formData.press_name}
                onChange={(e) => setFormData({...formData, press_name: e.target.value})}
                required 
              />
            </div>
            <div className={styles.inputGroup}>
              <label>발행일 *</label>
              <input 
                type="date" 
                value={formData.publish_date}
                onChange={(e) => setFormData({...formData, publish_date: e.target.value})}
                required 
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>기사 원문 링크 (URL)</label>
            <input 
              type="url" 
              placeholder="https://news.naver.com/..."
              value={formData.external_url}
              onChange={(e) => setFormData({...formData, external_url: e.target.value})}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>대표 이미지 (썸네일)</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {formData.image_url && (
              <div style={{ marginTop: '10px' }}>
                <img src={formData.image_url} alt="Preview" style={{ height: '100px', borderRadius: '4px' }} />
              </div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>상세 내용 (원문 링크가 없을 경우 직접 입력)</label>
            <Editor 
              value={formData.content}
              onChange={(val) => setFormData({...formData, content: val})}
            />
          </div>

          <div className={styles.formActions}>
            <button type="button" onClick={() => router.back()} className={styles.cancelBtn}>취소</button>
            <button type="submit" disabled={loading} className={styles.submitBtn}>
              {loading ? '처리 중...' : '기사 등록하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
