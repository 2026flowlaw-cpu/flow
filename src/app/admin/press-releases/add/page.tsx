"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../youtube/admin-youtube.module.css';
import { uploadImage } from '@/lib/upload';
import Editor from '@/components/Editor/Editor';

export default function AdminPressAddPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isScraping, setIsScraping] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    press_name: '',
    publish_date: new Date().toISOString().split('T')[0],
    external_url: '',
    image_url: '',
    content: ''
  });

  // 🌐 [마법의 스크레이핑] 링크로 정보 가져오기
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
        setFormData({
          ...formData,
          title: data.title || formData.title,
          press_name: data.press_name || formData.press_name,
          content: data.content || formData.content,
          image_url: data.image_url || formData.image_url
        });
        alert('기사 정보를 성공적으로 불러왔습니다!');
      } else {
        alert('정보를 가져오는 데 실패했습니다. 링크를 확인해 주세요.');
      }
    } catch (err) {
      alert('스크레이핑 중 오류 발생');
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
      } else {
        const errorData = await res.json();
        alert(`등록 실패: ${errorData.error || '알 수 없는 오류'}`);
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
            <label>기사 원문 링크 (URL)</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="url" 
                placeholder="https://news.naver.com/..."
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
                {isScraping ? '불러오는 중...' : '🌐 정보 가져오기'}
              </button>
            </div>
            <p className={styles.helpText}>기사 링크를 입력하고 버튼을 누르면 제목과 내용을 자동으로 긁어옵니다.</p>
          </div>

          <div className={styles.inputGroup}>
            <label>기사 제목 *</label>
            <input 
              type="text" 
              placeholder="정보 가져오기를 누르면 자동 입력됩니다."
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
            <label>대표 이미지 (썸네일)</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {formData.image_url && (
              <div style={{ marginTop: '10px' }}>
                <img src={formData.image_url} alt="Preview" style={{ height: '100px', borderRadius: '4px' }} />
              </div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>상세 내용 (원문 링크 자동 요약)</label>
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
              {loading ? '처리 중...' : '기사 등록하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
