"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminLawyersListingPage() {
  const { data: lawyers, error, mutate } = useSWR('/api/lawyers', fetcher);
  const isLoading = !lawyers && !error;

  const fetchLawyers = () => mutate();

  const handleDelete = async (id: number, name: string) => {
    if (confirm(`${name} 변호사 정보를 정말로 삭제하시겠습니까?`)) {
      try {
        const res = await fetch(`/api/lawyers?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          alert('삭제되었습니다.');
          fetchLawyers();
        } else {
          alert('삭제 실패');
        }
      } catch (error) {
        alert('오류 발생');
      }
    }
  };

  const handleReorder = async (lawyerId: number, direction: 'up' | 'down') => {
    try {
      const res = await fetch('/api/lawyers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reorder', lawyerId, direction })
      });
      if (res.ok) {
        fetchLawyers();
      }
    } catch (error) {
      console.error('Reorder failed:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>변호사 관리</h1>
          <p className={styles.subtitle}>전체 변호사 프로필 및 연혁을 수정할 수 있습니다.</p>
        </div>
        <Link href="/admin/lawyers/add" className={styles.addBtn}>
          + 변호사 추가하기
        </Link>
      </div>

      <div className={styles.card}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>순서</th>
                <th>사진</th>
                <th>이름</th>
                <th>직함</th>
                <th>대표 약력</th>
                <th>액션</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6}>로딩 중...</td></tr>
              ) : (
                (lawyers || []).map((lawyer: any, index: number) => (
                  <tr key={lawyer.id}>
                    <td>
                      <div className={styles.orderControls}>
                        <button 
                          onClick={() => handleReorder(lawyer.id, 'up')}
                          disabled={index === 0}
                          className={styles.orderBtn}
                        >
                          🔼
                        </button>
                        <button 
                          onClick={() => handleReorder(lawyer.id, 'down')}
                          disabled={index === lawyers.length - 1}
                          className={styles.orderBtn}
                        >
                          🔽
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className={styles.avatar}>
                        <Image 
                          src={lawyer.image || '/images/lawyer1.png'} 
                          alt={lawyer.name} 
                          fill 
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    </td>
                    <td className={styles.lawyerName}>{lawyer.name}</td>
                    <td className={styles.lawyerTitle}>{lawyer.title}</td>
                    <td>
                      <div className={styles.experienceTags}>
                        {lawyer.experience && lawyer.experience.slice(0, 1).map((exp: string, idx: number) => (
                          <span key={idx} className={styles.tag}>{exp}</span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className={styles.rowActions}>
                        <Link href={`/admin/lawyers/edit/${lawyer.slug}`} className={styles.editBtn}>
                          수정
                        </Link>
                        <button 
                          onClick={() => handleDelete(lawyer.id, lawyer.name)} 
                          className={styles.deleteBtn}
                        >
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
