"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../../youtube/admin-youtube.module.css';

import { uploadImage } from '@/lib/upload';
import Editor from '@/components/Editor/Editor';
import { supabase } from '@/lib/supabase';
import { COLUMN_PUBLISH_CATEGORIES, DEFAULT_COLUMN_CATEGORY, normalizeColumnCategory } from '@/lib/columnCategories';

type ColumnDraft = {
  title?: string;
  summary?: string;
  content?: string;
  category?: string;
  author_name?: string;
  image_url?: string;
  custom_meta?: string;
  keywords?: string;
  faq_json_ld?: string;
  error?: string;
};

function hasSuperAdminRole(session: unknown) {
  const role = (session as { user?: { user_metadata?: { role?: string } } } | null)?.user?.user_metadata?.role;
  return role === 'super_admin';
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

function scrollToColumnForm(behavior: ScrollBehavior = 'smooth') {
  const target = document.getElementById('column-form');
  if (!target) return;

  target.scrollIntoView({ behavior, block: 'start' });
}

function scheduleColumnFormScroll() {
  window.requestAnimationFrame(() => {
    window.setTimeout(() => scrollToColumnForm(), 80);
  });
}

export default function AdminColumnAddPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const draftId = searchParams.get('draft');
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: DEFAULT_COLUMN_CATEGORY,
    author_name: '대표변호사',
    image_url: '',
    custom_meta: '' // 🚀 슈퍼 어드민 전용 메타 코드
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ type: 'error' | 'success' | '', text: string }>({ type: '', text: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [draftNotice, setDraftNotice] = useState('');

  // 🛡️ [강력한 권한 확인] 슈퍼 어드민 여부를 실시간으로 감지합니다.
  useEffect(() => {
    if (!supabase) return;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: unknown, session: unknown) => {
      if (hasSuperAdminRole(session)) {
        setIsSuperAdmin(true);
      }
    });

    // 초기 로드 시에도 확인
    const checkInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (hasSuperAdminRole(session)) {
        setIsSuperAdmin(true);
      }
    };
    checkInitialSession();

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!draftId) {
      if (window.location.hash === '#column-form') scheduleColumnFormScroll();
      return;
    }
    const normalizedDraftId = draftId;

    let ignore = false;

    async function loadDraft() {
      setStatusMsg({ type: '', text: 'SEO 초안을 불러오는 중입니다...' });

      try {
        const res = await fetch(`/api/column-drafts?draft=${encodeURIComponent(normalizedDraftId)}`);
        const draft = await res.json() as ColumnDraft;

        if (!res.ok) {
          throw new Error(draft.error || '초안을 찾을 수 없습니다.');
        }

        if (ignore) return;

        const seoPayload = JSON.stringify({
          keywords: draft.keywords || draft.custom_meta || '',
          faqJsonLd: draft.faq_json_ld || '',
        });

        setFormData((prev) => ({
          ...prev,
          title: draft.title || prev.title,
          summary: draft.summary || prev.summary,
          content: draft.content || prev.content,
          category: normalizeColumnCategory(draft.category || prev.category),
          author_name: draft.author_name || prev.author_name,
          image_url: draft.image_url || prev.image_url,
          custom_meta: seoPayload,
        }));
        setDraftNotice(`"${draft.title}" SEO 초안이 작성 화면에 배치되었습니다. H1은 제목으로 자동 생성되고, 메타 키워드와 FAQ JSON-LD도 백단 데이터로 함께 저장됩니다.`);
        setStatusMsg({ type: 'success', text: 'SEO 초안을 불러왔습니다. 내용 확인 후 발행하세요.' });
        if (window.location.hash === '#column-form') {
          scheduleColumnFormScroll();
        }
      } catch (err: unknown) {
        if (!ignore) {
          setStatusMsg({ type: 'error', text: '초안 불러오기 실패: ' + getErrorMessage(err) });
        }
      }
    }

    loadDraft();

    return () => {
      ignore = true;
    };
  }, [draftId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      setStatusMsg({ type: 'error', text: '제목과 내용을 모두 입력해주세요.' });
      return;
    }
    
    setIsSaving(true);
    setStatusMsg({ type: '', text: '저장 중...' });
    
    try {
      let finalImageUrl = formData.image_url;

      if (selectedFile) {
        setStatusMsg({ type: '', text: '사진 업로드 중...' });
        finalImageUrl = await uploadImage(selectedFile);
      }

      const res = await fetch('/api/columns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, image_url: finalImageUrl })
      });

      const result = await res.json();

      if (res.ok) {
        setStatusMsg({ type: 'success', text: '칼럼이 성공적으로 등록되었습니다!' });
        setTimeout(() => router.push('/admin/columns'), 1500);
      } else {
        setStatusMsg({ 
          type: 'error', 
          text: `등록 실패: ${result.error || '알 수 없는 오류'}` 
        });
      }
    } catch (err: unknown) {
      setStatusMsg({ type: 'error', text: '오류 발생: ' + getErrorMessage(err) });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <button onClick={() => router.back()} className={styles.backBtn}>← 뒤로가기</button>
          <span>/ 법률칼럼 관리 / 칼럼 작성</span>
        </div>
        <h1 className={styles.title}>새 법률칼럼 작성</h1>
      </div>

      {draftNotice && (
        <div className={styles.draftNotice}>
          {draftNotice}
        </div>
      )}

      <form id="column-form" className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>칼럼 내용 입력</h2>
          
          <div className={styles.inputGroup}>
            <label>칼럼 제목 *</label>
            <input 
              type="text" 
              placeholder="칼럼의 제목을 입력하세요"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({...prev, title: e.target.value}))}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>대표 이미지 *</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
              style={{ padding: '8px' }}
            />
            <p className={styles.helpText}>칼럼 목록과 상세 페이지 상단에 보일 사진을 직접 업로드합니다.</p>
          </div>

          <div className={styles.inputGroup}>
            <label>요약 (목록 노출용)</label>
            <textarea 
              rows={2}
              placeholder="목록에서 보여줄 짧은 요약글을 입력하세요 (SEO 최적화에 도움이 됩니다)"
              value={formData.summary}
              onChange={(e) => setFormData((prev) => ({...prev, summary: e.target.value}))}
            ></textarea>
          </div>

          <div className={styles.inputGroup}>
            <label>상세 내용 (본문) *</label>
            <Editor 
              value={formData.content}
              onChange={(val) => setFormData((prev) => ({...prev, content: val}))}
            />
          </div>

          <div className={styles.themeToggle}>
            <div className={styles.inputGroup} style={{ flex: 1 }}>
              <label>카테고리</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({...prev, category: e.target.value}))}
              >
                {COLUMN_PUBLISH_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.inputGroup} style={{ flex: 1 }}>
              <label>작성자</label>
              <input 
                type="text"
                value={formData.author_name}
                onChange={(e) => setFormData((prev) => ({...prev, author_name: e.target.value}))}
              />
            </div>
          </div>

          {/* 🤫 [슈퍼 어드민 전용 섹션] 고급 SEO/GEO 설정 */}
          {isSuperAdmin && (
            <div className={styles.inputGroup} style={{ marginTop: '40px', padding: '25px', backgroundColor: '#fcfcfd', border: '1px dashed #ced4da', borderRadius: '12px' }}>
              <label style={{ color: '#0A1B39', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🔒 고급 SEO / GEO 메타데이터 설정 (Super Admin Only)
              </label>
              <textarea 
                rows={4}
                placeholder='<meta name="geo.region" content="KR-11" /> 등 커스텀 메타 코드를 입력하세요.'
                value={formData.custom_meta}
                onChange={(e) => setFormData((prev) => ({...prev, custom_meta: e.target.value}))}
                style={{ fontFamily: 'monospace', fontSize: '13px', marginTop: '10px' }}
              ></textarea>
              <p className={styles.helpText} style={{ color: '#666', marginTop: '8px' }}>
                * 입력한 HTML 코드는 해당 칼럼 상세 페이지의 Head 섹션에 직접 삽입됩니다.
              </p>
            </div>
          )}

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
            {isSaving ? '저장 중...' : '칼럼 발행하기'}
          </button>
        </div>
      </form>
    </div>
  );
}
