"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../youtube/admin-youtube.module.css';
import { uploadImage } from '@/lib/upload';

export default function AdminColumnEditPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const params = React.use(paramsPromise);
  const colId = params.id;

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    summary: '',
    content: '',
    category: '법률칼럼',
    author_name: '대표변호사',
    image_url: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState<{ type: 'error' | 'success' | '', text: string }>({ type: '', text: '' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchColumn = async () => {
      try {
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
            image_url: currentCol.image_url || ''
          });
        } else {
          alert('칼럼을 찾을 수 없습니다.');
          router.push('/admin/columns');
        }
      } catch (error) {
        console.error('Failed to fetch column:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchColumn();
  }, [colId, router]);

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
        setStatusMsg({ type: 'error', text: '수정 실패 (데이터베이스 연결을 확인해주세요.)' });
      }
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: '오류 발생: ' + err.message });
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
            {selectedFile && <p className={styles.helpText}>선택된 새 파일: {selectedFile.name}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label>요약 (목록 노출용)</label>
            <textarea 
              rows={2}
              value={formData.summary}
              onChange={(e) => setFormData({...formData, summary: e.target.value})}
            ></textarea>
          </div>

          <div className={styles.inputGroup}>
            <label>상세 내용 (본문) *</label>
            <textarea 
              rows={15}
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              required
            ></textarea>
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
