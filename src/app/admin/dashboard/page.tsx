"use client";

import React from 'react';
import useSWR from 'swr';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  MessageSquare, AlertCircle, CheckCircle2, 
  TrendingUp, Calendar, ArrowRight, Phone, FileText, User, ChevronRight
} from 'lucide-react';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const visitorData = [
  { name: '05.06', visitors: 150 },
  { name: '05.07', visitors: 230 },
  { name: '05.08', visitors: 210 },
  { name: '05.09', visitors: 380 },
  { name: '05.10', visitors: 320 },
  { name: '05.11', visitors: 450 },
  { name: '05.12', visitors: 410 },
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
    <div style={{ padding: '40px 60px', background: '#f8fafc', minHeight: '100vh', fontFamily: 'Pretendard, sans-serif' }}>
      {/* 상단 헤더 섹션 */}
      <div style={{ marginBottom: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '36px', fontWeight: 600, color: '#0A1B39', marginBottom: '10px', letterSpacing: '-0.02em' }}>
            실시간 운영 현황 <span style={{ color: '#bd9d62', fontSize: '24px', fontWeight: 400, marginLeft: '10px' }}>Dashboard</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '16px', fontWeight: 400 }}>법무법인 플로우의 유입 통계 및 상담 현황을 한눈에 관리합니다.</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ background: 'white', padding: '12px 24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }}></div>
            <span style={{ fontSize: '14px', color: '#1e293b', fontWeight: 600 }}>시스템 정상 작동 중</span>
          </div>
        </div>
      </div>

      {/* 4분할 통계 카드 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px', marginBottom: '50px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ 
            background: 'white', padding: '32px', borderRadius: '24px', 
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.02)', border: '1px solid #edf2f7',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div style={{ background: `${stat.color}10`, padding: '14px', borderRadius: '16px' }}>
                    <stat.icon size={26} color={stat.color} />
                </div>
                <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>전일 대비</span>
                    <p style={{ fontSize: '13px', color: '#22c55e', fontWeight: 600 }}>+12.4% ↑</p>
                </div>
            </div>
            <p style={{ fontSize: '15px', color: '#64748b', fontWeight: 600, marginBottom: '6px' }}>{stat.label}</p>
            <h3 style={{ fontSize: '34px', fontWeight: 600, color: '#0A1B39', letterSpacing: '-0.03em' }}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* 퍼널 섹션 추가 (RoasOne 디자인 적용) */}
      <div className="funnel-section" style={{ marginBottom: '50px' }}>
        {/* 홈페이지 유입 및 구매 전환 퍼널 */}
        <div style={{ background: 'white', borderRadius: '32px', padding: '45px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.03)', border: '1px solid #edf2f7' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: '#0A1B39' }}>홈페이지 유입 및 전환 퍼널 ⓘ</h3>
            <span style={{ fontSize: '0.85rem', color: '#64748b', background: '#f1f5f9', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>GA4 연동 대기중</span>
          </div>
          <div className="funnel-wrapper" style={{ marginTop: '2rem' }}>
            {[
              { name: '홈페이지 방문', count: 1250, color: '#e0e7ff', drop: 0 },
              { name: '상세페이지 조회', count: 980, color: '#c7d2fe', drop: 21.6 },
              { name: '상담 안내 확인', count: 420, color: '#a5b4fc', drop: 57.1 },
              { name: '전화/폼 클릭', count: 180, color: '#818cf8', drop: 57.1 },
              { name: '상담 접수 완료', count: totalCount, color: '#6366f1', drop: 0 },
              { name: '상담 및 수임완료', count: completedCount, color: '#4f46e5', drop: 0 },
            ].map((step, idx) => {
              const maxCount = 1250;
              const width = Math.max((step.count / maxCount) * 100, 1);
              return (
                <div className="funnel-row" key={idx}>
                  <div className="funnel-label">
                    <div className="label-top">
                      <span className="name">{step.name}</span>
                      <span className="percent">{idx === 0 ? '100%' : `${width.toFixed(1)}%`}</span>
                    </div>
                    <span className="count">{step.count.toLocaleString()}건</span>
                  </div>
                  <div className="funnel-bar-wrapper">
                    <div className="funnel-bar" style={{ width: `${width}%`, backgroundColor: step.color }}></div>
                    {idx > 0 && step.drop !== undefined && Number(step.drop) > 0 && (
                      <span className="funnel-drop">이탈률 {step.drop}%</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 메인 섹션: 그래프 & 최근 내역 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '40px' }}>
        
        {/* 방문자 통계 그래프 */}
        <div style={{ background: 'white', padding: '45px', borderRadius: '32px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.03)', border: '1px solid #edf2f7' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '45px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#0A1B39', display: 'flex', alignItems: 'center', gap: '10px' }}>
               방문자 유입 분석 <span style={{ fontSize: '12px', color: '#bd9d62', fontWeight: 600, background: '#bd9d6215', padding: '4px 10px', borderRadius: '8px' }}>GA4 LIVE</span>
            </h2>
          </div>
          <div style={{ width: '100%', height: '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitorData}>
                <defs>
                  <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13, fontWeight: 600}} dy={20} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13, fontWeight: 600}} />
                <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', padding: '15px' }} 
                    itemStyle={{ fontWeight: 600, color: '#4f46e5' }}
                />
                <Area type="monotone" dataKey="visitors" stroke="#4f46e5" strokeWidth={5} fillOpacity={1} fill="url(#colorVis)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 엇갈린 배경색의 실시간 상담 리스트 */}
        <div style={{ background: 'white', padding: '45px', borderRadius: '32px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.03)', border: '1px solid #edf2f7' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#0A1B39' }}>최근 상담 접수</h2>
            <Link href="/admin/consultations" style={{ 
                fontSize: '14px', color: '#4f46e5', fontWeight: 600, textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: '4px'
            }}>전체보기 <ChevronRight size={16} /></Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#f1f5f9', borderRadius: '24px', overflow: 'hidden', border: '1px solid #f1f5f9' }}>
            {isConsultArray && consultations.length > 0 ? (
              consultations.slice(0, 5).map((item: any, i: number) => (
                <div key={i} style={{ 
                  padding: '25px 30px', 
                  background: i % 2 === 0 ? '#ffffff' : '#f8fafc', // 엇갈린 배경색 적용
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 600, fontSize: '17px', color: '#1e293b' }}>{item.name}</span>
                      <span style={{ 
                          fontSize: '11px', padding: '3px 10px', borderRadius: '6px', fontWeight: 600,
                          background: item.status === '대기중' ? '#ef444415' : '#22c55e15',
                          color: item.status === '대기중' ? '#ef4444' : '#22c55e'
                      }}>{item.status}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '15px', fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
                      <span>{item.case_type}</span>
                      <span style={{ color: '#cbd5e1' }}>|</span>
                      <span>{item.phone}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>{new Date(item.created_at).toLocaleDateString().slice(5)}</p>
                    <p style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: 400 }}>{new Date(item.created_at).toLocaleTimeString().slice(0, 5)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: '60px', textAlign: 'center', background: 'white' }}>
                <p style={{ color: '#94a3b8', fontWeight: 600 }}>접수된 내역이 없습니다.</p>
              </div>
            )}
          </div>

          <Link href="/admin/consultations" style={{ 
            display: 'block', width: '100%', padding: '18px', marginTop: '30px',
            borderRadius: '16px', background: '#0A1B39', color: 'white',
            textAlign: 'center', textDecoration: 'none', fontWeight: 600, fontSize: '15px',
            boxShadow: '0 10px 15px -3px rgba(10, 27, 57, 0.2)'
          }}>상담 마스터 관리하기</Link>
        </div>

      </div>
    </div>
  );
}
