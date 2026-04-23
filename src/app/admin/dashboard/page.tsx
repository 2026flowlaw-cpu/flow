"use client";

import React from 'react';
import useSWR from 'swr';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  MessageSquare, AlertCircle, CheckCircle2, 
  TrendingUp, Calendar, ArrowRight 
} from 'lucide-react';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// 시뮬레이션용 GA4 방문자 데이터
const visitorData = [
  { name: '04.17', visitors: 120, pageviews: 450 },
  { name: '04.18', visitors: 210, pageviews: 890 },
  { name: '04.19', visitors: 180, pageviews: 620 },
  { name: '04.20', visitors: 340, pageviews: 1200 },
  { name: '04.21', visitors: 290, pageviews: 1100 },
  { name: '04.22', visitors: 420, pageviews: 1540 },
  { name: '04.23', visitors: 380, pageviews: 1420 },
];

export default function AdminDashboardMainPage() {
  const { data: consultations } = useSWR('/api/consultations', fetcher);
  const { data: pressReleases } = useSWR('/api/press-releases', fetcher);

  // 상담 통계 계산 (안전하게 배열인지 확인 후 계산)
  const isConsultArray = Array.isArray(consultations);
  const totalCount = isConsultArray ? consultations.length : 0;
  const pendingCount = isConsultArray ? consultations.filter((c: any) => c.status === '대기중').length : 0;
  const completedCount = isConsultArray ? consultations.filter((c: any) => c.status === '상담완료').length : 0;
  
  // 언론보도 통계 (안전하게 배열인지 확인 후 계산)
  const isPressArray = Array.isArray(pressReleases);
  const totalPressCount = isPressArray ? pressReleases.length : 0;

  const stats = [
    { label: '전체 상담 신청', value: totalCount, icon: MessageSquare, color: '#4f46e5' },
    { label: '언론보도 자료', value: totalPressCount, icon: Calendar, color: '#bd9d62' },
    { label: '현재 대기 중', value: pendingCount, icon: AlertCircle, color: '#ef4444' },
    { label: '상담 완료 건수', value: completedCount, icon: CheckCircle2, color: '#22c55e' },
  ];

  return (
    <div style={{ padding: '40px', background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#0A1B39', marginBottom: '8px' }}>관리자 대시보드</h1>
        <p style={{ color: '#64748b' }}>법무법인 일신 웹사이트의 주요 활동 지표를 한눈에 확인하세요.</p>
      </div>

      {/* 통계 카드 그리드 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ 
            background: 'white', padding: '24px', borderRadius: '16px', 
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '20px'
          }}>
            <div style={{ background: `${stat.color}15`, padding: '12px', borderRadius: '12px' }}>
              <stat.icon size={28} color={stat.color} />
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 600, marginBottom: '4px' }}>{stat.label}</p>
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b' }}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        {/* 방문자 통계 그래프 */}
        <div style={{ background: 'white', padding: '32px', borderRadius: '20px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0A1B39' }}>방문자 추이 (GA4)</h2>
            <div style={{ fontSize: '14px', color: '#64748b' }}>최근 7일 지표</div>
          </div>
          <div style={{ width: '100%', height: '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitorData}>
                <defs>
                  <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="visitors" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorVis)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 최근 상담 신청 요약 */}
        <div style={{ background: 'white', padding: '32px', borderRadius: '20px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0A1B39' }}>최근 상담 신청</h2>
            <Link href="/admin/consultations" style={{ fontSize: '13px', color: '#4f46e5', textDecoration: 'none', fontWeight: 600 }}>전체보기</Link>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {isConsultArray && consultations.length > 0 ? (
              consultations.slice(0, 5).map((item: any, i: number) => (
                <div key={i} style={{ 
                  padding: '16px', borderRadius: '12px', background: '#f8fafc', 
                  border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>{item.name} 님</h4>
                    <p style={{ fontSize: '12px', color: '#64748b' }}>{item.case_type}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ 
                      fontSize: '11px', padding: '4px 8px', borderRadius: '4px', fontWeight: 700,
                      background: item.status === '대기중' ? '#ffebee' : '#e8f5e9',
                      color: item.status === '대기중' ? '#ef4444' : '#22c55e'
                    }}>
                      {item.status}
                    </span>
                    <p style={{ fontSize: '10px', color: '#94a3b8', marginTop: '6px' }}>{new Date(item.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', color: '#94a3b8', padding: '40px 0' }}>상담 신청 내역이 없습니다.</p>
            )}
          </div>

          <Link href="/admin/consultations" style={{ 
            marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', 
            background: '#0A1B39', color: 'white', padding: '14px', borderRadius: '12px', 
            textDecoration: 'none', fontSize: '14px', fontWeight: 700 
          }}>
            상담 내역 전체 관리하러 가기 <ArrowRight size={18} />
          </Link>
        </div>

        {/* 하단 줄: 언론보도 퀵 요약 */}
        <div style={{ background: 'white', padding: '32px', borderRadius: '20px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', marginTop: '32px', gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0A1B39' }}>언론보도 최근 내역</h2>
            <Link href="/admin/press-releases/add" style={{ 
              background: '#bd9d62', color: 'white', padding: '8px 20px', borderRadius: '8px', 
              textDecoration: 'none', fontSize: '13px', fontWeight: 700 
            }}>+ 새 기사 등록</Link>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {isPressArray && pressReleases.length > 0 ? (
              pressReleases.slice(0, 3).map((item: any) => (
                <div key={item.id} style={{ display: 'flex', gap: '15px', alignItems: 'center', padding: '15px', background: '#fcfcfc', border: '1px solid #eee', borderRadius: '12px' }}>
                  <div style={{ width: '60px', height: '40px', position: 'relative', borderRadius: '4px', overflow: 'hidden' }}>
                      <img src={item.image_url || '/images/hero_bg.png'} alt="news" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</h4>
                    <p style={{ fontSize: '12px', color: '#bd9d62' }}>{item.press_name} | {item.publish_date}</p>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: '#999', padding: '20px 0' }}>최근 등록된 기사가 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
