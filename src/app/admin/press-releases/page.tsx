"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../youtube/admin-youtube.module.css'; // 공통 스타일 재사용
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminPressListingPage() {
  const { data: articles, error, mutate } = useSWR('/api/press-releases', fetcher);
  const isLoading = !articles && !error;

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`'${title}' 기사를 정말로 삭제하시겠습니까?`)) {
      try {
        const res = await fetch(`/api/press-releases?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          alert('삭제되었습니다.');
          mutate();
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
          <h1 className={styles.title}>언론보도 관리</h1>
          <p className={styles.subtitle}>법무법인 플로우의 방송 출연 및 언론 기사 내역을 관리합니다.</p>
        </div>
        <Link href="/admin/press-releases/add" className={styles.addBtn}>
          + 새 기사 등록하기
        </Link>
      </div>

      <div className={styles.card}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>이미지</th>
                <th>언론사</th>
                <th>기사 제목</th>
                <th>발행일</th>
                <th>액션</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={5} className={styles.center}>불러오는 중...</td></tr>
              ) : articles && articles.length > 0 ? (
                articles.map((item: any) => (
                  <tr key={item.id}>
                    <td>
                      <div className={styles.thumbnail}>
                        <Image
                          src={item.image_url || '/images/hero_bg.webp'}
                          alt={item.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    </td>
                    <td><span className={styles.categoryTag}>{item.press_name}</span></td>
                    <td className={styles.storyTitle}>{item.title}</td>
                    <td>{item.publish_date}</td>
                    <td>
                      <div className={styles.rowActions}>
                        <Link
                          href={`/news/press/${item.id}`}
                          target="_blank"
                          className={styles.viewBtn}
                        >
                          기사보기
                        </Link>
                        <Link href={`/admin/press-releases/edit/${item.id}`} className={styles.editBtn}>
                          수정
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          className={styles.deleteBtn}
                        >
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={5} className={styles.center}>등록된 언론보도가 없습니다.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
