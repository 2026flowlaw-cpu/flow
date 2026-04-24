"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../youtube/admin-youtube.module.css';
import { uploadImage } from '@/lib/upload';
import Editor from '@/components/Editor/Editor';
import { supabase } from '@/lib/supabase';

export default function AdminPressEditPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const params = React.use(paramsPromise);
  const articleId = params.id;

  const [loading, setLoading] = useState(false);
  const [isScraping, setIsScraping] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    press_name: '',
    publish_date: '',
    external_url: '',
    image_url: '',
    content: ''
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/press-releases');
        const data = await res.json();
        const found = data.find((item: any) => item.id.toString() === articleId);
        if (found) setFormData(found);
      } catch (err) {
        console.error('Failed to load article:', err);
      }
    }
    fetchData();
  }, [articleId]);

  // 🌐 [마법의 스크레이핑] 정보 갱신/가져오기
  const handleScrape = async () => {
    if (!formData.external_url) {
      alert('기사 원문 링크를 먼저 입력해주세요.');
      return;
    }

    try {
      setIsScraping(true);
      const res = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: formData.external_url })
      });

      const data = await res.json();
      if (res.ok) {
        setFormData(prev => ({
          ...prev,
          title: (data.title && !data.title.includes('못했습니다')) ? data.title : (prev.title || data.title),
          press_name: (data.press_name && data.press_name !== '언론사 확인 필요') ? data.press_name : (prev.press_name || data.press_name),
          content: (data.content && !data.content.includes('못했습니다')) ? data.content : (prev.content || data.content),
          image_url: data.image_url || prev.image_url
        }));
        alert('최신 정보를 성공적으로 불러왔습니다!');
      } else {
        alert('정보를 가져오는 데 실패했습니다.');
      }
    } catch (err) {
      alert('오류 발생');
    } finally {
      setIsScraping(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setLoading(true);
      const url = await uploadImage(file);
      setFormData({ ...formData, image_url: url });
      alert('이미지가 교체되었습니다.');
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
        body: JSON.stringify({ ...formData, id: articleId })
      });
      if (res.ok) {
        alert('수정되었습니다.');
        router.push('/admin/press-releases');
      } else {
        const errorData = await res.json();
        alert(`수정 실패: ${errorData.error || '알 수 없는 오류'}`);
      }
    } catch (error) {
      alert('수정 중 오류 발생');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>기사 정보 수정</h1>
      
      <div className={styles.card} style={{ padding: '40px' }}>
        <form onSubmit={handleSubmit}>

          <div className={styles.inputGroup}>
            <label>기사 원문 링크 (URL)</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="url" 
                value={formData.external_url}
                onChange={(e) => setFormData({...formData, external_url: e.target.value})}
                style={{ flex: 1 }}
              />
              <button 
                type="button" 
                onClick={handleScrape}
                disabled={isScraping}
                style={{ 
                  backgroundColor: '#0066cc', 
                  color: 'white', 
                  border: 'none', 
                  padding: '10px 20px', 
                  borderRadius: '6px', 
                  fontWeight: '700', 
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {isScraping ? '불러오는 중...' : '🌐 정보 갱신하기'}
              </button>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>기사 제목 *</label>
            <input 
              type="text" 
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
            <label>대표 이미지 (썸네일)</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {formData.image_url && (
              <div style={{ marginTop: '10px' }}>
                <img src={formData.image_url} alt="Preview" style={{ height: '100px', borderRadius: '4px' }} />
              </div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>상세 내용</label>
            <Editor 
              value={formData.content}
              onChange={(val) => setFormData({...formData, content: val})}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <button 
              type="button" 
              onClick={() => router.back()} 
              style={{ backgroundColor: 'white', border: '1px solid #ddd', padding: '12px 30px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', color: '#666' }}
            >
              취소
            </button>
            <button 
              type="submit" 
              disabled={loading} 
              style={{ backgroundColor: loading ? '#ccc' : '#0A1B39', color: 'white', border: 'none', padding: '12px 40px', borderRadius: '6px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(10, 27, 57, 0.2)' }}
            >
              {loading ? '처리 중...' : '수정 완료하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
