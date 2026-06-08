"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminSuccessStoriesListingPage() {
  const { data: stories, error, mutate } = useSWR('/api/success-stories', fetcher);
  const isLoading = !stories && !error;

  const fetchStories = () => {
    mutate(); // Revalidate data
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`'${title}' 사례를 정말로 삭제하시겠습니까?`)) {
      try {
        const res = await fetch(`/api/success-stories?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          alert('삭제되었습니다.');
          fetchStories();
        } else {
          alert('삭제 실패');
        }
      } catch (error) {
        alert('오류 발생');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>성공사례 관리</h1>
          <p className={styles.subtitle}>공개 페이지에 노출될 주요 성공사례들을 관리합니다.</p>
        </div>
        <Link href="/admin/success-stories/add" className={styles.addBtn}>
          + 성공사례 추가하기
        </Link>
      </div>

      <div className={styles.card}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>이미지</th>
                <th>카테고리</th>
                <th>사례 제목</th>
                <th>담당 변호사</th>
                <th>상태(배지)</th>
                <th>액션</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className={styles.center}>로딩 중...</td></tr>
              ) : stories.length > 0 ? (
                stories.map((story: any) => (
                  <tr key={story.id}>
                    <td>
                      <div className={styles.thumbnail}>
                        <Image
                          src={story.image || '/images/hero_bg.webp'}
                          alt={story.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    </td>
                    <td><span className={styles.categoryTag}>{story.category}</span></td>
                    <td className={styles.storyTitle}>{story.title}</td>
                    <td>{story.lawyer?.name || '-'}</td>
                    <td><span className={styles.badge}>{story.badge}</span></td>
                    <td>
                      <div className={styles.rowActions}>
                        <a
                          href={`/success-stories/${story.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.viewBtn}
                        >
                          보기
                        </a>
                        <Link href={`/admin/success-stories/edit/${story.id}`} className={styles.editBtn}>
                          수정
                        </Link>
                        <button
                          onClick={() => handleDelete(story.id, story.title)}
                          className={styles.deleteBtn}
                        >
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} className={styles.center}>등록된 성공사례가 없습니다.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
