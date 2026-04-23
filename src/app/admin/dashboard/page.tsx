"use client";

import React from 'react';
import useSWR from 'swr';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  MessageSquare, AlertCircle, CheckCircle2, 
  TrendingUp, Calendar, ArrowRight, Phone, FileText, User 
} from 'lucide-react';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const visitorData = [
  { name: '04.17', visitors: 120 },
  { name: '04.18', visitors: 210 },
  { name: '04.19', visitors: 180 },
  { name: '04.20', visitors: 340 },
  { name: '04.21', visitors: 290 },
  { name: '04.22', visitors: 420 },
  { name: '04.23', visitors: 380 },
];

export default function AdminDashboardMainPage() {
  const { data: consultations } = useSWR('/api/consultations', fetcher);
  const { data: pressReleases } = useSWR('/api/press-releases', fetcher);

  const isConsultArray = Array.isArray(consultations);
  const isPressArray = Array.isArray(pressReleases);

  const totalCount = isConsultArray ? consultations.length : 0;
  const pendingCount = isConsultArray ? consultations.filter((c: any) => c.status === '대기중').length : 0;
  const completedCount = isConsultArray ? consultations.filter((c: any) => c.status === '상담완료').length : 0;
  const totalPressCount = isPressArray ? pressReleases.length : 0;

  const stats = [
    { label: '전체 상담 신청', value: totalCount, icon: MessageSquare, color: '#4f46e5' },
    { label: '언론보도 자료', value: totalPressCount, icon: Calendar, color: '#bd9d62' },
    { label: '현재 대기 중', value: pendingCount, icon: AlertCircle, color: '#ef4444' },
    { label: '상담 완료 건수', value: completedCount, icon: CheckCircle2, color: '#22c55e' },
  ];

  return (
    <div style={{ padding: '40px', background: '#f8fafc', minHeight: '100vh', fontFamily: 'Pretendard, sans-serif' }}>
      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#0A1B39', marginBottom: '8px' }}>관리자 대시보드</h1>
          <p style={{ color: '#64748b' }}>법무법인 일신 웹사이트의 실시간 현황을 보고합니다.</p>
        </div>
        <div style={{ background: 'white', padding: '10px 20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', fontSize: '14px', color: '#64748b', fontWeight: 600 }}>
          <TrendingUp size={16} style={{ marginRight: '8px', color: '#22c55e' }} /> 실시간 데이터 동기화 중
        </div>
      </div>

      {/* 통계 카드 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ 
            background: 'white', padding: '28px', borderRadius: '20px', 
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ background: `${stat.color}15`, padding: '12px', borderRadius: '12px' }}>
                    <stat.icon size={24} color={stat.color} />
                </div>
                <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700 }}>+8.2%</span>
            </div>
            <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 600, marginBottom: '4px' }}>{stat.label}</p>
            <h3 style={{ fontSize: '28px', fontWeight: 900, color: '#1e293b' }}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* 메인 그래프 (전체 너비로 확장) */}
      <div style={{ background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', marginBottom: '32px', border: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0A1B39' }}>방문자 유입 트래픽 (GA4)</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ fontSize: '13px', padding: '6px 14px', background: '#f1f5f9', borderRadius: '20px', color: '#64748b', fontWeight: 700 }}>최근 7일</span>
          </div>
        </div>
        <div style={{ width: '100%', height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={visitorData}>
              <defs>
                <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={15} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="visitors" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorVis)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 최근 상담 신청 (전체 너비로 확장하여 최우선 노출) */}
      <div style={{ background: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0A1B39' }}>실시간 상담 접수 현황</h2>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#64748b' }}>최근 6건 표시</span>
            <Link href="/admin/consultations" style={{ color: '#4f46e5', textDecoration: 'none', fontSize: '14px', fontWeight: 700, padding: '8px 16px', background: '#eef2ff', borderRadius: '10px' }}>전체 관리 페이지로 이동 →</Link>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {isConsultArray && consultations.length > 0 ? (
            consultations.slice(0, 6).map((item: any, i: number) => (
              <div key={i} style={{ 
                padding: '24px', borderRadius: '18px', background: '#fcfcfc', 
                border: '1px solid #f1f5f9', display: 'flex', transition: 'all 0.2s'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                      <span style={{ fontWeight: 800, fontSize: '17px', color: '#1e293b' }}>{item.name} 님</span>
                      <span style={{ 
                          fontSize: '11px', padding: '3px 10px', borderRadius: '6px', fontWeight: 800,
                          background: item.status === '대기중' ? '#ffebee' : '#e8f5e9',
                          color: item.status === '대기중' ? '#ef4444' : '#22c55e'
                      }}>{item.status}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '20px', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748b' }}>
                          <Phone size={14} /> {item.phone}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748b' }}>
                          <FileText size={14} /> {item.case_type}
                      </div>
                  </div>
                  <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.details || '내용이 없습니다.'}
                  </p>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <p style={{ fontSize: '12px', color: '#94a3b8' }}>{new Date(item.created_at).toLocaleDateString()}</p>
                    <Link href="/admin/consultations" style={{ color: '#0A1B39', fontSize: '12px', fontWeight: 800, marginTop: '8px', textDecoration: 'none' }}>문의 상세 🔍</Link>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}>새로 접수된 상담이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}
