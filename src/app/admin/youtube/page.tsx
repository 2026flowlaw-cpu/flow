"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../admin-youtube.module.css';

export default function AdminYouTubeListingPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/youtube');
      const data = await res.json();
      setVideos(data || []);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`'${title}' 영상을 정말로 삭제하시겠습니까?`)) {
      try {
        const res = await fetch(`/api/youtube?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          alert('삭제되었습니다.');
          fetchVideos();
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
          <h1 className={styles.title}>유튜브 관리</h1>
          <p className={styles.subtitle}>플로우 Tube 페이지에 노출될 영상 콘텐츠를 관리합니다.</p>
        </div>
        <Link href="/admin/youtube/add" className={styles.addBtn}>
          + 영상 추가하기
        </Link>
      </div>

      <div className={styles.card}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>썸네일</th>
                <th>카테고리</th>
                <th>영상 제목</th>
                <th>배경 테마</th>
                <th>액션</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={5} className={styles.center}>로딩 중...</td></tr>
              ) : videos.length > 0 ? (
                videos.map((video) => (
                  <tr key={video.id}>
                    <td>
                      <div className={styles.thumbnail}>
                        <Image 
                          src={`https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`}
                          alt={video.title} 
                          fill 
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    </td>
                    <td><span className={styles.categoryTag}>{video.category}</span></td>
                    <td className={styles.storyTitle}>{video.title}</td>
                    <td>{video.theme === 'dark' ? '딥 블루' : '화이트'}</td>
                    <td>
                      <div className={styles.rowActions}>
                        <Link href={`/admin/youtube/edit/${video.id}`} className={styles.editBtn}>
                          수정
                        </Link>
                        <button 
                          onClick={() => handleDelete(video.id, video.title)} 
                          className={styles.deleteBtn}
                        >
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={5} className={styles.center}>등록된 영상이 없습니다.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
