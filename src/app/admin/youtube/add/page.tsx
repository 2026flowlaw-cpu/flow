"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../admin-youtube.module.css';

export default function AdminYouTubeAddPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtube_id: '',
    category: '하자소송',
    theme: 'light'
  });
  const [statusMsg, setStatusMsg] = useState<{ type: 'error' | 'success' | '', text: string }>({ type: '', text: '' });
  const [isSaving, setIsSaving] = useState(false);

  // Helper to extract YouTube ID from URL
  const extractId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const handleUrlChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    const id = extractId(url);
    setFormData(prev => ({ ...prev, youtube_id: id }));
    setStatusMsg({ type: '', text: '' });

    if (id && id.length === 11) {
      try {
        const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`);
        if (res.ok) {
          const data = await res.json();
          setFormData(prev => ({ 
            ...prev, 
            title: data.title || prev.title,
            description: data.author_name ? `${data.author_name} - 유튜브 영상` : prev.description
          }));
        }
      } catch (err) {
        console.error('Failed to fetch YouTube metadata:', err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.youtube_id) {
      setStatusMsg({ type: 'error', text: '필수 항목을 입력해주세요.' });
      return;
    }
    setIsSaving(true);
    setStatusMsg({ type: '', text: '저장 중...' });
    
    try {
      const res = await fetch('/api/youtube', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (res.ok) {
        setStatusMsg({ type: 'success', text: '영상이 성공적으로 등록되었습니다!' });
        setTimeout(() => router.push('/admin/youtube'), 1500);
      } else {
        setStatusMsg({ 
          type: 'error', 
          text: `등록 실패: ${result.error || '알 수 없는 오류'} (수파베이스 테이블을 확인해주세요.)` 
        });
      }
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: '오류 발생: ' + err.message });
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

          {/* Status Message Display */}
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
            {isSaving ? '저장 중...' : '영상 등록 완료'}
          </button>
        </div>
      </form>
    </div>
  );
}
