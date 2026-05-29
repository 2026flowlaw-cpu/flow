"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../youtube/admin-youtube.module.css';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type ColumnItem = {
  id: string | number;
  title: string;
  summary?: string;
  category?: string;
  author_name?: string;
  image_url?: string;
  created_at?: string;
};

type DraftItem = {
  id: string;
  title: string;
  summary: string;
  category: string;
  author_name?: string;
  image_url?: string;
  preview_url: string;
  custom_meta?: string;
  keywords?: string;
};

type DraftDetail = DraftItem & {
  content?: string;
  faq_json_ld?: string;
  error?: string;
};

export default function AdminColumnsListingPage() {
  const { data: columns, error, mutate } = useSWR('/api/columns', fetcher);
  const { data: draftData } = useSWR('/api/column-drafts', fetcher);
  const isLoading = !columns && !error;
  const columnList: ColumnItem[] = Array.isArray(columns) ? columns : [];
  const drafts: DraftItem[] = Array.isArray(draftData) ? draftData : [];
  const [publishingDraftId, setPublishingDraftId] = useState<string | null>(null);
  const [publishNotice, setPublishNotice] = useState<{ type: 'success' | 'error' | '', text: string }>({ type: '', text: '' });

  const fetchColumns = () => mutate();

  const isRegisteredDraft = (draft: DraftItem) => {
    const draftTitle = draft.title.trim();
    return columnList.some((column) => column.title.trim() === draftTitle);
  };

  const pendingDrafts = isLoading ? [] : drafts.filter((draft) => !isRegisteredDraft(draft));

  const buildSeoPayload = (draft: DraftDetail) => JSON.stringify({
    keywords: draft.keywords || draft.custom_meta || '',
    faqJsonLd: draft.faq_json_ld || '',
  });

  const handlePublishDraft = async (draft: DraftItem) => {
    if (isRegisteredDraft(draft)) {
      setPublishNotice({ type: 'error', text: '이미 등록된 초안입니다. 칼럼 목록에서 확인해 주세요.' });
      return;
    }

    setPublishingDraftId(draft.id);
    setPublishNotice({ type: '', text: '초안을 칼럼으로 등록하는 중입니다...' });

    try {
      const draftRes = await fetch(`/api/column-drafts?draft=${encodeURIComponent(draft.id)}`);
      const draftDetail = await draftRes.json() as DraftDetail;

      if (!draftRes.ok) {
        throw new Error(draftDetail.error || '초안을 불러오지 못했습니다.');
      }

      const publishRes = await fetch('/api/columns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: draftDetail.title,
          summary: draftDetail.summary,
          content: draftDetail.content,
          category: draftDetail.category,
          author_name: draftDetail.author_name || '대표변호사',
          image_url: draftDetail.image_url,
          custom_meta: buildSeoPayload(draftDetail),
        }),
      });

      const result = await publishRes.json();

      if (!publishRes.ok) {
        throw new Error(result.error || '칼럼 등록에 실패했습니다.');
      }

      setPublishNotice({ type: 'success', text: `"${draftDetail.title}" 칼럼이 등록되었습니다.` });
      await mutate();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setPublishNotice({ type: 'error', text: `등록 실패: ${message}` });
    } finally {
      setPublishingDraftId(null);
    }
  };

  const handleDelete = async (id: string | number, title: string) => {
    if (confirm(`'${title}' 칼럼을 정말로 삭제하시겠습니까?`)) {
      try {
        const res = await fetch(`/api/columns?id=${encodeURIComponent(String(id))}`, { method: 'DELETE' });
        if (res.ok) {
          alert('삭제되었습니다.');
          fetchColumns();
        } else {
          alert('삭제 실패');
        }
      } catch {
        alert('오류 발생');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>법률칼럼 관리</h1>
          <p className={styles.subtitle}>플로우 법률 사무소의 전문성이 담긴 칼럼을 관리합니다.</p>
        </div>
        <Link href="/admin/columns/add" className={styles.addBtn}>
          + 칼럼 작성하기
        </Link>
      </div>

      {pendingDrafts.length > 0 && (
        <div className={`${styles.card} ${styles.draftPanel}`}>
          <div className={styles.draftHeader}>
            <div>
              <h2 className={styles.cardTitle}>게시 전 SEO 초안</h2>
              <p className={styles.subtitle}>검수 후 작성 화면으로 보내서 바로 칼럼으로 발행할 수 있습니다.</p>
            </div>
            <span className={styles.draftCount}>{pendingDrafts.length}건 대기</span>
          </div>

          {publishNotice.text && (
            <div className={`${styles.inlineStatus} ${publishNotice.type === 'error' ? styles.inlineError : styles.inlineSuccess}`}>
              {publishNotice.text}
            </div>
          )}

          <div className={styles.draftGrid}>
            {pendingDrafts.map((draft) => {
              const isPublishing = publishingDraftId === draft.id;

              return (
                <div key={draft.id} className={styles.draftCard}>
                  <div className={styles.draftThumb}>
                    <Image
                      src={draft.image_url || '/images/philosophy_bg.png'}
                      alt={draft.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className={styles.draftBody}>
                    <div className={styles.draftMeta}>
                      <span className={styles.categoryTag}>{draft.category}</span>
                      <span>게시 전 초안</span>
                    </div>
                    <h3 className={styles.draftTitle}>{draft.title}</h3>
                    <p className={styles.draftSummary}>{draft.summary}</p>
                    <div className={styles.rowActions}>
                      <a
                        href={draft.preview_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.viewBtn}
                      >
                        미리보기
                      </a>
                      <a href={`/admin/columns/add?draft=${draft.id}#column-form`} className={styles.editBtn}>
                        작성 화면으로
                      </a>
                      <button
                        type="button"
                        onClick={() => handlePublishDraft(draft)}
                        className={styles.publishBtn}
                        disabled={isPublishing}
                      >
                        {isPublishing ? '등록 중...' : '등록하기'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className={styles.card}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>썸네일</th>
                <th>카테고리</th>
                <th>칼럼 제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>액션</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className={styles.center}>로딩 중...</td></tr>
              ) : columnList.length > 0 ? (
                columnList.map((col) => (
                  <tr key={col.id}>
                    <td>
                      <div className={styles.thumbnail}>
                        <Image 
                          src={col.image_url || '/images/philosophy_bg.png'}
                          alt={col.title} 
                          fill 
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    </td>
                    <td><span className={styles.categoryTag}>{col.category}</span></td>
                    <td className={styles.storyTitle}>{col.title}</td>
                    <td>{col.author_name}</td>
                    <td>{col.created_at ? new Date(col.created_at).toLocaleDateString() : '-'}</td>
                    <td>
                      <div className={styles.rowActions}>
                        <Link href={`/columns/${col.id}`} className={styles.viewBtn}>
                          보기
                        </Link>
                        <Link href={`/admin/columns/edit/${col.id}`} className={styles.editBtn}>
                          수정
                        </Link>
                        <button 
                          onClick={() => handleDelete(col.id, col.title)} 
                          className={styles.deleteBtn}
                        >
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} className={styles.center}>등록된 칼럼이 없습니다.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
