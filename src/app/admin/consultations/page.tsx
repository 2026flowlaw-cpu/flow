"use client";

import React, { useState } from 'react';
import styles from '../youtube/admin-youtube.module.css';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminConsultationsPage() {
  const { data: consultations, error, mutate } = useSWR('/api/consultations', fetcher);
  const isLoading = !consultations && !error;
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const fetchConsultations = () => mutate();

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`'${name}' 님의 상담 내역을 파기하시겠습니까? (이 작업은 되돌릴 수 없습니다)`)) {
      try {
        const res = await fetch(`/api/consultations?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          alert('상담 내역이 삭제되었습니다.');
          fetchConsultations();
        } else {
          alert('삭제 실패. 데이터베이스 권한을 확인해주세요.');
        }
      } catch (error) {
        alert('오류 발생');
      }
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_status', id, status: newStatus })
      });
      if (res.ok) {
        fetchConsultations(); // 새로고침
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>상담 내역 확인/관리</h1>
          <p className={styles.subtitle}>홈페이지를 통해 접수된 고객들의 소중한 문의 내역입니다.</p>
        </div>
        <button onClick={fetchConsultations} className={styles.addBtn} style={{ background: '#bd9d62' }}>
          새로고침 ↻
        </button>
      </div>

      <div className={styles.card}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>접수 일시</th>
                <th>의뢰인</th>
                <th>사건 유형</th>
                <th>연락처</th>
                <th>상태</th>
                <th>액션</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className={styles.center}>불러오는 중...</td></tr>
              ) : consultations.length > 0 ? (
                consultations.map((item: any) => (
                  <tr key={item.id} style={{ background: item.status === '대기중' ? '#fdf8f6' : 'transparent' }}>
                    <td>{new Date(item.created_at).toLocaleString('ko-KR')}</td>
                    <td className={styles.storyTitle}>{item.name}</td>
                    <td><span className={styles.categoryTag}>{item.case_type || '지정안됨'}</span></td>
                    <td style={{ fontWeight: 600 }}>{item.phone}</td>
                    <td>
                      <select 
                        value={item.status} 
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '4px',
                          border: `1px solid ${item.status === '대기중' ? '#ffcdd2' : '#c8e6c9'}`,
                          background: item.status === '대기중' ? '#ffebee' : '#e8f5e9',
                          color: item.status === '대기중' ? '#c62828' : '#2e7d32',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        <option value="대기중">🚨 대기중</option>
                        <option value="확인중">👀 확인중</option>
                        <option value="상담완료">✅ 상담완료</option>
                      </select>
                    </td>
                    <td>
                      <div className={styles.rowActions}>
                        <button onClick={() => setSelectedItem(item)} className={styles.viewBtn}>
                          상세보기
                        </button>
                        <button onClick={() => handleDelete(item.id, item.name)} className={styles.deleteBtn}>
                          파기
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} className={styles.center}>접수된 상담 내역이 없습니다. (수파베이스 테이블 연동 상태를 확인해 주세요)</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 내용 상세보기 팝업 모달 */}
      {selectedItem && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.5)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            background: 'white', width: '90%', maxWidth: '600px', 
            borderRadius: '12px', padding: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            maxHeight: '90vh', overflowY: 'auto'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '20px', color: '#0A1B39', borderBottom: '2px solid #eee', paddingBottom: '15px' }}>
              상담 신청 상세 내역
            </h2>
            
            <div style={{ marginBottom: '15px', display: 'flex', borderBottom: '1px solid #f5f5f5', paddingBottom: '10px' }}>
              <strong style={{ width: '120px', color: '#666' }}>의뢰인명:</strong>
              <span>{selectedItem.name}</span>
            </div>
            <div style={{ marginBottom: '15px', display: 'flex', borderBottom: '1px solid #f5f5f5', paddingBottom: '10px' }}>
              <strong style={{ width: '120px', color: '#666' }}>연락처:</strong>
              <span style={{ fontWeight: 600 }}>{selectedItem.phone}</span>
            </div>
            <div style={{ marginBottom: '15px', display: 'flex', borderBottom: '1px solid #f5f5f5', paddingBottom: '10px' }}>
              <strong style={{ width: '120px', color: '#666' }}>이메일:</strong>
              <span>{selectedItem.email || '미입력'}</span>
            </div>
            <div style={{ marginBottom: '15px', display: 'flex', borderBottom: '1px solid #f5f5f5', paddingBottom: '10px' }}>
              <strong style={{ width: '120px', color: '#666' }}>사건 유형:</strong>
              <span>{selectedItem.case_type}</span>
            </div>
            <div style={{ marginBottom: '15px', display: 'flex', borderBottom: '1px solid #f5f5f5', paddingBottom: '10px' }}>
              <strong style={{ width: '120px', color: '#666' }}>부동산 위치:</strong>
              <span>{selectedItem.location || '미입력'}</span>
            </div>
            <div style={{ marginBottom: '15px', display: 'flex', borderBottom: '1px solid #f5f5f5', paddingBottom: '10px' }}>
              <strong style={{ width: '120px', color: '#666' }}>희망 상담시간:</strong>
              <span>{selectedItem.appointment_time || '미입력'}</span>
            </div>
            
            <div style={{ marginTop: '20px', background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
              <strong style={{ display: 'block', marginBottom: '10px', color: '#333' }}>[상세 내용]</strong>
              <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', color: '#444' }}>
                {selectedItem.details || '내용 없음'}
              </p>
            </div>

            <div style={{ marginTop: '30px', textAlign: 'right' }}>
              <button 
                onClick={() => setSelectedItem(null)}
                style={{ padding: '12px 30px', background: '#0A1B39', color: 'white', borderRadius: '6px', border: 'none', fontWeight: 600, cursor: 'pointer' }}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
