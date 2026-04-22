"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../youtube/admin-youtube.module.css';

export default function AdminColumnsListingPage() {
  const [columns, setColumns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchColumns = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/columns');
      const data = await res.json();
      setColumns(data || []);
    } catch (error) {
      console.error('Failed to fetch columns:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchColumns();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`'${title}' 칼럼을 정말로 삭제하시겠습니까?`)) {
      try {
        const res = await fetch(`/api/columns?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          alert('삭제되었습니다.');
          fetchColumns();
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
          <h1 className={styles.title}>법률칼럼 관리</h1>
          <p className={styles.subtitle}>일신 법률 사무소의 전문성이 담긴 칼럼을 관리합니다.</p>
        </div>
        <Link href="/admin/columns/add" className={styles.addBtn}>
          + 칼럼 작성하기
        </Link>
      </div>

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
              ) : columns.length > 0 ? (
                columns.map((col) => (
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
                    <td>{new Date(col.created_at).toLocaleDateString()}</td>
                    <td>
                      <div className={styles.rowActions}>
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
