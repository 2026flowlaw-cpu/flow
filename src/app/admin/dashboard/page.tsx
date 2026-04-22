import React from 'react';

export default function AdminDashboardPage() {
  return (
    <div style={{ padding: '40px', background: '#f5f7fb', minHeight: '100vh' }}>
      <h1 style={{ color: '#0A1B39', marginBottom: '20px' }}>관리자 대시보드</h1>
      <p style={{ color: '#666' }}>상태: 로그인 성공</p>
      <div style={{ marginTop: '40px', padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <p>환영합니다, 관리자님! 여기에서 칼럼, 성공사례, 변호사 프로필을 관리하실 수 있습니다.</p>
        <p style={{ marginTop: '20px', fontSize: '14px', color: '#999' }}>(곧 기능이 업데이트될 예정입니다.)</p>
      </div>
    </div>
  );
}
