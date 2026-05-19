"use client";

import React, { useState, useMemo } from 'react';
import useSWR from 'swr';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell
} from 'recharts';
import { 
  MessageSquare, AlertCircle, CheckCircle2, Calendar, ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type DatePreset = 'today' | 'yesterday' | 'this_week' | 'last_week' | 'recent_7_inc' | 'recent_7_exc' | 'this_month' | 'last_month' | 'recent_30_inc' | 'recent_30_exc' | 'recent_90' | 'custom';

const mockAnalyticsData = {
  sourceTrend: [
    { date: '05.13', '(direct)': 8, 'ig': 4, 'localhost:3000': 4 },
    { date: '05.14', '(direct)': 2, 'ig': 6, 'localhost:3000': 2 },
    { date: '05.15', '(direct)': 2, 'ig': 6, 'localhost:3000': 1 },
    { date: '05.16', '(direct)': 1, 'ig': 1 },
    { date: '05.17', '(direct)': 1, 'ig': 1, 'threads': 3 },
    { date: '05.18', '(direct)': 1, 'ig': 1, 'threads': 2 }
  ],
  topSourceNames: ['(direct)', 'ig', 'localhost:3000', 'threads'],
  trafficSources: [
    { name: 'google', value: 6, color: '#6366f1' },
    { name: '(direct)', value: 5, color: '#818cf8' },
    { name: 'threads', value: 3, color: '#a5b4fc' },
    { name: 'ig', value: 2, color: '#c7d2fe' },
    { name: 'bing', value: 1, color: '#e0e7ff' }
  ],
  topPages: [
    { page: '/dashboard', views: 62, time: '0m 45s' },
    { page: '/', views: 53, time: '0m 13s' },
    { page: '/lawyers', views: 37, time: '1m 23s' }
  ],
  topLocations: [
    { city: 'Seoul', users: 10 },
    { city: 'Cheonan-si', users: 5 }
  ],
  sourcesDetailed: [
    { name: '(direct) / (none)', users: 5, sessions: 14, engagedSessions: 7, engagementRate: '50.0%', avgTime: '6분 52초' },
    { name: 'google / organic', users: 5, sessions: 6, engagedSessions: 5, engagementRate: '83.3%', avgTime: '0분 40초' },
    { name: 'threads / social', users: 3, sessions: 5, engagedSessions: 1, engagementRate: '20.0%', avgTime: '0분 0초' },
    { name: 'ig / social', users: 2, sessions: 3, engagedSessions: 0, engagementRate: '0.0%', avgTime: '0분 0초' },
    { name: 'bing / organic', users: 1, sessions: 1, engagedSessions: 1, engagementRate: '100.0%', avgTime: '11분 16초' },
    { name: 'google / cpc', users: 1, sessions: 1, engagedSessions: 0, engagementRate: '0.0%', avgTime: '0분 0초' },
    { name: 'link.naver.com / referral', users: 1, sessions: 1, engagedSessions: 0, engagementRate: '0.0%', avgTime: '0분 0초' },
    { name: 'localhost:3000 / referral', users: 1, sessions: 7, engagedSessions: 5, engagementRate: '71.4%', avgTime: '5분 6초' },
    { name: 'naver / organic', users: 1, sessions: 18, engagedSessions: 9, engagementRate: '50.0%', avgTime: '0분 20초' }
  ]
};

const mockStats = {
  activeUsers: 27,
  totalSessions: 56,
  avgSessionTime: '9분 58초',
  bounceRate: '50.0%',
  consultationsCount: 12,
  kakaoConversions: 8,
  totalConversions: 20
};

const getPageKoreanName = (path: string) => {
  const cleanPath = path.split('?')[0];

  const routeMap: Record<string, string> = {
    '/': '메인 홈페이지 (홈화면)',
    '/practice': '소송 분야 전체 목록',
    '/practice/criminal-law': '형사사건 전문 센터',
    '/practice/jeonse-fraud': '전세사기 대응 센터',
    '/practice/class-action': '집단소송 대응 센터',
    '/practice/resale-cancellation': '분양계약 취소/해제 센터',
    '/practice/construction-dispute': '공사대금 분쟁 해결 센터',
    '/practice/defect-litigation': '아파트/상가 하자소송 센터',
    '/news/press': '언론 보도자료 뉴스',
    '/admin/dashboard': '어드민 통계 대시보드',
    '/admin/consultations': '상담 신청 접수 관리',
    '/admin/press-releases': '보도자료 등록/편집',
    '/admin/columns': '법률 칼럼 등록/편집',
    '/admin/login': '관리자 로그인 화면',
    '/admin/success-stories': '성공사례 등록/관리',
    '/admin/defect-reviews': '하자 기획 심사 관리',
  };

  if (routeMap[cleanPath]) {
    return routeMap[cleanPath];
  }

  // 예외 처리 및 어드민/상세 처리
  if (cleanPath.startsWith('/practice/')) {
    const sub = cleanPath.replace('/practice/', '');
    return `${sub} 상세 페이지`;
  }
  if (cleanPath.startsWith('/admin/')) {
    const sub = cleanPath.replace('/admin/', '');
    return `관리자 - ${sub}`;
  }

  return path;
};

export default function AdminDashboardMainPage() {
  const { data: consultations } = useSWR('/api/consultations', fetcher);
  const { data: pressReleases } = useSWR('/api/press-releases', fetcher);

  const isConsultArray = Array.isArray(consultations);
  const isPressArray = Array.isArray(pressReleases);

  const totalCount = isConsultArray ? consultations.length : 0;
  const pendingCount = isConsultArray ? consultations.filter((c: any) => c.status === '대기중').length : 0;
  const completedCount = isConsultArray ? consultations.filter((c: any) => c.status === '상담완료').length : 0;
  const totalPressCount = isPressArray ? pressReleases.length : 0;

  const adminStats = [
    { label: '전체 상담 신청', value: totalCount, icon: MessageSquare, color: '#4f46e5' },
    { label: '언론보도 자료', value: totalPressCount, icon: Calendar, color: '#bd9d62' },
    { label: '현재 대기 중', value: pendingCount, icon: AlertCircle, color: '#ef4444' },
    { label: '상담 완료 건수', value: completedCount, icon: CheckCircle2, color: '#22c55e' },
  ];

  const [datePreset, setDatePreset] = useState<DatePreset>('recent_7_inc');
  const [dateRangeObj, setDateRangeObj] = useState<{ from: Date | undefined; to?: Date }>({
    from: subDays(new Date(), 6),
    to: new Date()
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const startStr = dateRangeObj.from ? format(dateRangeObj.from, 'yyyy-MM-dd') : '7daysAgo';
  const endStr = dateRangeObj.to ? format(dateRangeObj.to, 'yyyy-MM-dd') : 'today';

  // SWR로 GA4 API 연동
  const { data: ga4Res, error: ga4Error, isValidating: ga4Validating, mutate: mutateGa4 } = useSWR(
    `/api/ga4?startDate=${startStr}&endDate=${endStr}`,
    fetcher,
    { revalidateOnFocus: false }
  );

  const isConfigured = ga4Res?.configured !== false;
  const isLive = ga4Res?.success && isConfigured;

  // 실시간 데이터 또는 데모 데이터 폴백 설정
  const isLoading = ga4Validating;
  const activeStats = isLoading 
    ? { 
        activeUsers: '-', 
        totalSessions: '-', 
        avgSessionTime: '-', 
        bounceRate: '-',
        consultationsCount: '-',
        kakaoConversions: '-',
        totalConversions: '-'
      }
    : (isLive ? ga4Res.stats : mockStats);

  const analyticsData = isLoading
    ? {
        dailyActiveUsers: [],
        trafficSources: [],
        sourceTrend: [],
        topPages: [],
        sourcesDetailed: [],
        topLocations: [],
        topSourceNames: []
      }
    : (isLive ? ga4Res.data : mockAnalyticsData);

  // 선택한 기간 내의 DB 상담 신청 건수 필터링 (실시간 무지연 집계용)
  const filteredDbConsultCount = useMemo(() => {
    if (!isConsultArray) return 0;
    if (!dateRangeObj.from) return consultations.length;
    
    const start = new Date(dateRangeObj.from);
    start.setHours(0, 0, 0, 0);
    const end = dateRangeObj.to ? new Date(dateRangeObj.to) : new Date();
    end.setHours(23, 59, 59, 999);
    
    return consultations.filter((c: any) => {
      const created = new Date(c.created_at);
      return created >= start && created <= end;
    }).length;
  }, [consultations, isConsultArray, dateRangeObj]);

  const totalConversionsCombined = useMemo(() => {
    const kakao = activeStats.kakaoConversions;
    if (kakao === '-') return '-';
    return filteredDbConsultCount + Number(kakao);
  }, [filteredDbConsultCount, activeStats.kakaoConversions]);

  const conversionRateCombined = useMemo(() => {
    const sessions = activeStats.totalSessions;
    if (sessions === '-' || totalConversionsCombined === '-') return '-';
    const sessNum = Number(sessions);
    if (isNaN(sessNum) || sessNum === 0) return '0.0%';
    const convNum = Number(totalConversionsCombined);
    return `${((convNum / sessNum) * 100).toFixed(1)}%`;
  }, [totalConversionsCombined, activeStats.totalSessions]);
  const topSourceNames = (analyticsData.topSourceNames && analyticsData.topSourceNames.length > 0)
    ? analyticsData.topSourceNames 
    : ['(direct)', 'ig', 'localhost:3000', 'threads'];

  const currentRange = useMemo(() => {
    const start = dateRangeObj.from || new Date();
    const end = dateRangeObj.to || start;
    return { 
      displayStr: `${format(start, 'yyyy.MM.dd.')} → ${format(end, 'yyyy.MM.dd.')}`
    };
  }, [dateRangeObj]);

  const presetOptions = [
    { value: 'today', label: '오늘' },
    { value: 'yesterday', label: '어제' },
    { value: 'this_week', label: '이번주' },
    { value: 'last_week', label: '지난주' },
    { value: 'recent_7_inc', label: '최근 7일(오늘 포함)' },
    { value: 'recent_7_exc', label: '최근 7일(오늘 제외)' },
    { value: 'this_month', label: '이번달' },
    { value: 'last_month', label: '지난달' },
    { value: 'recent_30_inc', label: '최근 30일(오늘 포함)' },
    { value: 'recent_30_exc', label: '최근 30일(오늘 제외)' },
    { value: 'recent_90', label: '최근 3개월(최대)' },
  ];

  const handlePresetClick = (preset: DatePreset) => {
    setDatePreset(preset);
    const today = new Date();
    let start, end;
    switch (preset) {
      case 'today': start = today; end = today; break;
      case 'yesterday': start = subDays(today, 1); end = subDays(today, 1); break;
      case 'this_week': start = startOfWeek(today, { weekStartsOn: 1 }); end = today; break;
      case 'last_week': start = startOfWeek(subDays(today, 7), { weekStartsOn: 1 }); end = endOfWeek(subDays(today, 7), { weekStartsOn: 1 }); break;
      case 'recent_7_inc': start = subDays(today, 6); end = today; break;
      case 'recent_7_exc': start = subDays(today, 7); end = subDays(today, 1); break;
      case 'this_month': start = startOfMonth(today); end = today; break;
      case 'last_month': start = startOfMonth(subMonths(today, 1)); end = endOfMonth(subMonths(today, 1)); break;
      case 'recent_30_inc': start = subDays(today, 29); end = today; break;
      case 'recent_30_exc': start = subDays(today, 30); end = subDays(today, 1); break;
      case 'recent_90': start = subDays(today, 89); end = today; break;
      default: start = subDays(today, 6); end = today;
    }
    setDateRangeObj({ from: start, to: end });
    setIsDropdownOpen(false);
  };

  return (
    <div className="analytics-container">
      {/* 1. 실시간 운영 현황 헤더 & 운영 지표 */}
      <div className="analytics-header">
        <div className="title-area">
          <h1>실시간 운영 현황 <span className="sub-title">Dashboard</span></h1>
          <p>법무법인 일신의 유입 통계 및 상담 현황을 한눈에 관리합니다.</p>
        </div>
        <div className="header-actions">
          <div className="status-badge" style={{ background: 'white' }}>
            <span className="dot active"></span> 
            <span style={{ color: '#1e293b' }}>시스템 정상 작동 중</span>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        {adminStats.map((stat, i) => (
          <div key={i} className="stat-card glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div style={{ background: `${stat.color}10`, padding: '14px', borderRadius: '16px' }}>
                    <stat.icon size={26} color={stat.color} />
                </div>
                <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>전일 대비</span>
                    <p style={{ fontSize: '13px', color: '#22c55e', fontWeight: 600 }}>+12.4% ↑</p>
                </div>
            </div>
            <p className="desc" style={{ marginBottom: '6px' }}>{stat.label}</p>
            <h3 style={{ fontSize: '34px', fontWeight: 600, color: '#0A1B39', margin: 0 }}>{stat.value}</h3>
          </div>
        ))}
      </div>

      <div style={{ height: '40px' }}></div>

      {/* 2. 웹사이트 분석 섹션 헤더 */}
      <div className="analytics-header">
        <div className="title-area">
          <h1 style={{ fontSize: '1.8rem' }}>실시간 웹사이트 분석</h1>
          <p>GA4 데이터를 기반으로 한 사용자 행동 및 유입 경로 분석입니다.</p>
        </div>
        <div className="header-actions">
          <div className="date-picker-wrapper">
            <button className="date-display-btn" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              {currentRange.displayStr} ▾
            </button>
            
            {isDropdownOpen && (
              <div className="date-dropdown-menu split-view">
                <div className="preset-list">
                  {presetOptions.map(opt => (
                    <div key={opt.value} className={`dropdown-item ${datePreset === opt.value ? 'active' : ''}`} 
                         onClick={() => handlePresetClick(opt.value as DatePreset)}>
                      {opt.label}
                    </div>
                  ))}
                </div>
                <div className="calendar-panel">
                  <div className="calendar-header-range">
                    <div className="range-box">{dateRangeObj.from ? format(dateRangeObj.from, 'yyyy.MM.dd') : '시작일'}</div>
                    <span className="arrow">→</span>
                    <div className="range-box">{dateRangeObj.to ? format(dateRangeObj.to, 'yyyy.MM.dd') : '종료일'}</div>
                  </div>
                  
                  <DayPicker
                    mode="range"
                    selected={dateRangeObj}
                    onSelect={(range: any) => {
                      setDatePreset('custom');
                      setDateRangeObj(range || { from: undefined, to: undefined });
                    }}
                    locale={ko}
                    numberOfMonths={1}
                    className="custom-calendar"
                  />
                  
                  <div className="calendar-footer">
                    <button className="btn-cancel" onClick={() => setIsDropdownOpen(false)}>취소</button>
                    <button className="btn-apply" onClick={() => setIsDropdownOpen(false)}>확인</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <select className="property-selector">
            <option>법무법인 일신 GA4</option>
          </select>
          <div className="status-badge" style={{ background: '#f8fafc' }}>
            <span className={`dot ${isLive ? 'active' : ''}`}></span> 
            {isLive ? 'GA4 실시간 연동 완료' : 'GA4 연동 대기 (데모)'}
          </div>
          <button className="btn-refresh" onClick={() => mutateGa4()} disabled={ga4Validating}>
            {ga4Validating ? '로딩 중...' : '데이터 업데이트'}
          </button>
        </div>
      </div>

      {/* GA4 서비스 계정 연동 가이드 (환경 변수 누락 시에만 노출) */}
      {!isConfigured && (
        <div className="setup-guide-box glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <AlertCircle size={24} color="#d97706" />
            <h4 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: '#92400e' }}>Google Analytics 4 (GA4) 서비스 계정 연동 가이드</h4>
          </div>
          <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#b45309', lineHeight: 1.6 }}>
            현재 페이지의 웹사이트 통계는 <strong>데모 데이터</strong>로 구성되어 있습니다. 아래 연동 절차를 완료하시면 법무법인 일신의 GA4 분석 데이터가 실시간으로 자동 수집됩니다!
          </p>
          <ol style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px', color: '#78350f', lineHeight: 1.5 }}>
            <li>
              <strong>구글 클라우드 서비스 계정 생성 및 비밀 키 다운로드</strong>:
              <br />구글 클라우드 콘솔에 로그인한 뒤 서비스 계정을 생성하고, 해당 계정의 <strong>비밀 키를 JSON 형태</strong>로 만들어 컴퓨터에 안전하게 다운로드합니다.
            </li>
            <li>
              <strong>GA4 속성에 서비스 계정 이메일 등록</strong>:
              <br />다운로드한 JSON 파일에 적힌 <code>"client_email"</code> 주소를 복사합니다. 그 다음, 구글 애널리틱스 4(GA4) 관리자 페이지의 <strong>[속성 액세스 관리]</strong> 메뉴에서 해당 이메일을 <strong>뷰어(조회 권한)</strong>로 추가해 줍니다.
            </li>
            <li>
              <strong>프로젝트 환경변수(.env.local) 설정</strong>:
              <br />법무법인 일신 프로젝트 루트 폴더에 있는 <code>.env.local</code> 파일을 열고, 아래 변수 이름에 맞게 각각 발급받은 값을 입력해 주세요. (입력 후 로컬 서버를 재시작해야 반영됩니다.)
              <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '14px 20px', borderRadius: '12px', marginTop: '10px', fontSize: '12px', fontFamily: 'monospace', overflowX: 'auto', border: '1px solid rgba(255,255,255,0.05)' }}>
{`GA4_PROPERTY_ID="여기에_GA4_속성_ID_입력 (예: 401234567)"
GOOGLE_CLIENT_EMAIL="여기에_다운로드한_JSON의_client_email_주소_입력"
GOOGLE_PRIVATE_KEY="여기에_다운로드한_JSON의_private_key_전체_복사 (-----BEGIN PRIVATE KEY-----\\n... 로 시작하는 값)"`}
              </pre>
            </li>
          </ol>
        </div>
      )}

      {/* 3. 로딩 상태 래퍼 */}
      <div className="analytics-content-wrapper">
        {ga4Validating && (
          <div className="loading-overlay">
            <div className="spinner-wrapper">
              <div className="loading-spinner"></div>
              <p>실시간 GA4 데이터 불러오는 중...</p>
            </div>
          </div>
        )}

        <div style={{ 
          opacity: ga4Validating ? 0.38 : 1, 
          transition: 'opacity 0.25s ease',
          pointerEvents: ga4Validating ? 'none' : 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}>
          {/* 핵심 전환 지표 (4카드) */}
          <div>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '15.5px', fontWeight: 700, color: '#bd9d62', display: 'flex', alignItems: 'center', gap: '8px' }}>
              📊 핵심 비즈니스 전환 지표 (Google Tag Manager 연동 성과)
            </h3>
            <p style={{ margin: '0 0 18px 0', fontSize: '12.5px', color: '#64748b', fontWeight: 500, lineHeight: 1.5 }}>
              💡 <strong>안내</strong>: "온라인 상담 신청 완료"는 DB 조회를 통해 <strong>실시간(즉시) 반영</strong>되며, "카카오톡 문의 클릭"은 구글 서버 처리 정책에 따라 약 24~48시간의 지연이 있을 수 있습니다.
            </p>
            <div className="stats-grid">
              <div className="stat-card glass-card" style={{ borderTop: '4px solid #4f46e5' }}>
                <label>온라인 상담 신청 완료</label>
                <div className="value-group">
                  <h2 style={{ color: '#4f46e5' }}>
                    {filteredDbConsultCount.toLocaleString()}
                  </h2>
                </div>
                <p className="desc">실시간 DB 직접 조회 (지연 없음)</p>
              </div>
              
              <div className="stat-card glass-card" style={{ borderTop: '4px solid #f59e0b' }}>
                <label>카카오톡 문의 클릭</label>
                <div className="value-group">
                  <h2 style={{ color: '#f59e0b' }}>
                    {typeof activeStats.kakaoConversions === 'number' ? activeStats.kakaoConversions.toLocaleString() : activeStats.kakaoConversions}
                  </h2>
                </div>
                <p className="desc">GA4 카카오 링크 이동 수</p>
              </div>

              <div className="stat-card glass-card" style={{ borderTop: '4px solid #10b981' }}>
                <label>총 전환 건수</label>
                <div className="value-group">
                  <h2 style={{ color: '#10b981' }}>
                    {typeof totalConversionsCombined === 'number' ? totalConversionsCombined.toLocaleString() : totalConversionsCombined}
                  </h2>
                </div>
                <p className="desc">실시간 상담 + 카카오 클릭 합계</p>
              </div>

              <div className="stat-card glass-card" style={{ borderTop: '4px solid #bd9d62' }}>
                <label>문의 전환율 (CVR)</label>
                <div className="value-group">
                  <h2 style={{ color: '#bd9d62' }}>
                    {conversionRateCombined}
                  </h2>
                </div>
                <p className="desc">세션 대비 문의(전환) 비중</p>
              </div>
            </div>
          </div>

          {/* 웹사이트 방문 지표 (4카드) */}
          <div>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '15.5px', fontWeight: 700, color: '#475569' }}>
              👥 기본 사이트 트래픽 지표
            </h3>
            <div className="stats-grid">
              <div className="stat-card glass-card">
                <label>선택 기간 방문자</label>
                <div className="value-group">
                  <h2 className={isLive ? "live-value" : ""}>
                    {typeof activeStats.activeUsers === 'number' ? activeStats.activeUsers.toLocaleString() : activeStats.activeUsers}
                  </h2>
                </div>
                <p className="desc">사용자 합계</p>
              </div>
              <div className="stat-card glass-card">
                <label>선택 기간 세션</label>
                <div className="value-group">
                  <h2>
                    {typeof activeStats.totalSessions === 'number' ? activeStats.totalSessions.toLocaleString() : activeStats.totalSessions}
                  </h2>
                </div>
                <p className="desc">방문 횟수</p>
              </div>
              <div className="stat-card glass-card">
                <label>평균 세션 시간</label>
                <div className="value-group">
                  <h2>{activeStats.avgSessionTime}</h2>
                </div>
                <p className="desc">전체 평균</p>
              </div>
              <div className="stat-card glass-card">
                <label>이탈률 (Bounce Rate)</label>
                <div className="value-group">
                  <h2>{activeStats.bounceRate}</h2>
                </div>
                <p className="desc">낮을수록 긍정적</p>
              </div>
            </div>
          </div>

          {/* 4. 차트 레이아웃 */}
          <div className="charts-main-grid">
            {/* 매체별 유입 추이 차트 */}
            <div className="chart-card glass-card wide">
              <h3>시간 경과에 따른 매체별 세션수</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={320}>
                  <LineChart data={analyticsData.sourceTrend}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                    {topSourceNames.map((name: string, i: number) => {
                      const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#a855f7'];
                      return (
                        <Line 
                          key={name} 
                          type="monotone" 
                          dataKey={name} 
                          stroke={colors[i % colors.length]} 
                          strokeWidth={3} 
                          dot={{ r: 4, strokeWidth: 2 }}
                          activeDot={{ r: 6 }}
                        />
                      );
                    })}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 유입 경로 파이 차트 */}
            <div className="chart-card glass-card">
              <h3>트래픽 소스 비중</h3>
              <div className="chart-container pie-container">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={analyticsData.trafficSources}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {analyticsData.trafficSources.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pie-legend">
                  {analyticsData.trafficSources.map((source: any, i: number) => (
                    <div key={i} className="legend-item">
                      <span className="dot" style={{ backgroundColor: source.color }}></span>
                      <span className="name">{source.name}</span>
                      <span className="val">{source.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 5. 테이블 레이아웃 (페이지 리포트, 최근상담) */}
          <div className="tables-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="table-section glass-card">
              <h3>인기 페이지 리포트</h3>
              <table className="analytics-table">
                <thead>
                  <tr>
                    <th>페이지 제목</th>
                    <th>조회수</th>
                    <th>평균 체류 시간</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.topPages.map((page: any, i: number) => (
                    <tr key={i}>
                      <td style={{ padding: '16px' }}>
                        <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '14px', marginBottom: '4px' }}>
                          {getPageKoreanName(page.page)}
                        </div>
                        <div className="page-path" style={{ fontSize: '11.5px', color: '#94a3b8', fontStyle: 'normal' }}>
                          {page.page}
                        </div>
                      </td>
                      <td className="bold" style={{ padding: '16px' }}>{page.views.toLocaleString()}</td>
                      <td style={{ padding: '16px' }}>{page.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-section glass-card" style={{ padding: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h3 style={{ margin: 0 }}>최근 상담 접수</h3>
                <Link href="/admin/consultations" style={{ 
                    fontSize: '14px', color: '#4f46e5', fontWeight: 600, textDecoration: 'none',
                    display: 'flex', alignItems: 'center', gap: '4px'
                }}>전체보기 <ChevronRight size={16} /></Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#f1f5f9', borderRadius: '16px', overflow: 'hidden' }}>
                {isConsultArray && consultations.length > 0 ? (
                  consultations.slice(0, 4).map((item: any, i: number) => (
                    <div key={i} style={{ 
                      padding: '18px 24px', 
                      background: i % 2 === 0 ? '#ffffff' : '#f8fafc',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                          <span style={{ fontWeight: 600, fontSize: '15px', color: '#1e293b' }}>{item.name}</span>
                          <span style={{ 
                              fontSize: '11px', padding: '3px 8px', borderRadius: '6px', fontWeight: 600,
                              background: item.status === '대기중' ? '#ef444415' : '#22c55e15',
                              color: item.status === '대기중' ? '#ef4444' : '#22c55e'
                          }}>{item.status}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
                          <span>{item.case_type}</span>
                          <span style={{ color: '#cbd5e1' }}>|</span>
                          <span>{item.phone}</span>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>{new Date(item.created_at).toLocaleDateString().slice(5)}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '40px', textAlign: 'center', background: 'white' }}>
                    <p style={{ color: '#94a3b8', fontWeight: 600, fontSize: '14px' }}>접수된 내역이 없습니다.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 6. 매체별 상세 리포트 */}
          <div className="table-section glass-card wide-table-card" style={{ marginTop: '30px' }}>
            <h3>매체별 유입 및 참여 리포트 상세 (Source / Medium)</h3>
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>유입 소스 / 매체</th>
                  <th>사용자</th>
                  <th>세션수</th>
                  <th>전환수 (문의)</th>
                  <th>참여 세션</th>
                  <th>참여율</th>
                  <th>평균 참여시간</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.sourcesDetailed.map((src: any, i: number) => (
                  <tr key={i}>
                    <td className="source-name">🔗 {src.name}</td>
                    <td className="bold">{src.users.toLocaleString()}</td>
                    <td>{src.sessions.toLocaleString()}</td>
                    <td className="bold" style={{ color: '#4f46e5' }}>{src.conversions?.toLocaleString() || 0}</td>
                    <td>{src.engagedSessions.toLocaleString()}</td>
                    <td>
                      <span className={`badge ${parseFloat(src.engagementRate) > 50 ? 'high' : ''}`}>
                        {src.engagementRate}
                      </span>
                    </td>
                    <td>{src.avgTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style jsx>{`
        .analytics-container { padding: 40px 60px; display: flex; flex-direction: column; gap: 2rem; color: #1e293b; background: #f8fafc; min-height: 100vh; font-family: Pretendard, sans-serif; }
        
        /* 로딩 오버레이 스타일 */
        .analytics-content-wrapper {
          position: relative;
          transition: all 0.3s ease;
        }
        .loading-overlay {
          position: absolute;
          top: -15px; left: -15px; right: -15px; bottom: -15px;
          background: rgba(248, 250, 252, 0.45);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 28px;
        }
        .spinner-wrapper {
          background: white;
          padding: 24px 40px;
          border-radius: 20px;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.08), 0 10px 10px -5px rgba(0,0,0,0.04);
          border: 1px solid #edf2f7;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .loading-spinner {
          width: 32px;
          height: 32px;
          border: 3.5px solid #e2e8f0;
          border-top-color: #6366f1;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spinner-wrapper p {
          margin: 0;
          font-size: 13.5px;
          font-weight: 700;
          color: #4f46e5;
          letter-spacing: -0.01em;
        }

        .analytics-header { display: flex; justify-content: space-between; align-items: flex-end; }
        .title-area h1 { font-size: 36px; font-weight: 600; margin-bottom: 10px; color: #0A1B39; letter-spacing: -0.02em; display: flex; align-items: center; }
        .sub-title { color: #bd9d62; font-size: 24px; font-weight: 400; margin-left: 10px; }
        .title-area p { color: #64748b; font-size: 16px; font-weight: 400; }
        
        .header-actions { display: flex; gap: 1rem; align-items: center; }
        
        .date-picker-wrapper { position: relative; }
        .date-display-btn { background: white; color: #1e293b; padding: 0.6rem 1.2rem; border-radius: 12px; font-weight: 700; border: 1px solid rgba(0,0,0,0.05); cursor: pointer; min-width: 240px; text-align: left; box-shadow: 0 2px 10px rgba(0,0,0,0.05); transition: all 0.2s; }
        .date-display-btn:hover { background: #f8fafc; border-color: #6366f1; }
        
        .date-dropdown-menu.split-view { 
          position: absolute; top: 110%; right: 0; background: white; border-radius: 16px; 
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1); 
          display: flex; z-index: 1000; overflow: hidden; border: 1px solid #e2e8f0; width: max-content;
          color: #1e293b;
        }
        .preset-list { width: 180px; background: #f8fafc; border-right: 1px solid #e2e8f0; max-height: 450px; overflow-y: auto; padding: 0.5rem 0; }
        .dropdown-item { padding: 0.7rem 1.25rem; font-size: 0.85rem; color: #475569; cursor: pointer; transition: all 0.2s; font-weight: 600; }
        .dropdown-item:hover { background: #f1f5f9; color: #6366f1; }
        .dropdown-item.active { background: #e0e7ff; color: #4f46e5; font-weight: 800; border-right: 3px solid #4f46e5; }
        
        .calendar-panel { padding: 1.5rem; display: flex; flex-direction: column; background: white; color: #000000; }
        .calendar-header-range { display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #e2e8f0; }
        .range-box { padding: 0.4rem 0.8rem; border: 1px solid #cbd5e1; border-radius: 8px; font-weight: 700; color: #1e293b; font-size: 0.85rem; min-width: 110px; text-align: center; }
        .arrow { color: #94a3b8; font-weight: bold; }
        
        .calendar-footer { display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1rem; border-top: 1px solid #e2e8f0; padding-top: 1rem; }
        .btn-cancel { padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid #cbd5e1; background: white; color: #64748b; font-weight: 700; cursor: pointer; font-size: 0.85rem; }
        .btn-apply { padding: 0.5rem 1rem; border-radius: 8px; border: none; background: #6366f1; color: white; font-weight: 700; cursor: pointer; font-size: 0.85rem; }

        .custom-calendar { margin: 0; }
        .custom-calendar :global(.rdp) {
          --rdp-cell-size: 40px;
          --rdp-accent-color: #6366f1;
          --rdp-background-color: #f5f3ff;
        }
        .custom-calendar :global(.rdp-day) { color: #334155 !important; font-weight: 600; }
        .custom-calendar :global(.rdp-day_selected),
        .custom-calendar :global(.rdp-day_range_start),
        .custom-calendar :global(.rdp-day_range_end) { background-color: #6366f1 !important; color: #ffffff !important; }
        .custom-calendar :global(.rdp-day_range_middle) { background-color: #f5f3ff !important; color: #6366f1 !important; }
        .custom-calendar :global(.rdp-caption_label),
        .custom-calendar :global(.rdp-head_cell) { color: #0f172a !important; font-weight: 700; }

        .status-badge { padding: 0.6rem 1.2rem; border-radius: 16px; font-size: 0.9rem; font-weight: 600; display: flex; align-items: center; gap: 10px; color: #64748b; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .status-badge .dot { width: 8px; height: 8px; background: #f59e0b; border-radius: 50%; box-shadow: 0 0 10px #f59e0b; }
        .status-badge .dot.active { background: #10b981; box-shadow: 0 0 8px #22c55e; }
        .btn-refresh { padding: 0.6rem 1.2rem; background: #6366f1; border: none; border-radius: 12px; color: white; font-weight: 700; cursor: pointer; font-size: 0.9rem; box-shadow: 0 4px 6px -1px rgba(99,102,241,0.2); }
        .btn-refresh:disabled { background: #a5b4fc; cursor: not-allowed; }
        
        .property-selector { 
          padding: 0.6rem 1rem; 
          background: white; 
          border: 1px solid rgba(0, 0, 0, 0.05); 
          border-radius: 12px; 
          color: #1e293b; 
          font-weight: 600; 
          outline: none;
          cursor: pointer;
          font-size: 0.9rem;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
        }

        .setup-guide-box {
          background: #fffbeb;
          border: 1.5px solid #fde68a;
          border-radius: 20px;
          padding: 26px 32px;
          margin-bottom: 30px;
          box-shadow: 0 10px 15px -3px rgba(217, 119, 6, 0.03);
        }

        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; }
        .stat-card { padding: 32px; border-radius: 24px; }
        .stat-card label { font-size: 0.9rem; color: #64748b; font-weight: 600; }
        .value-group { display: flex; align-items: baseline; gap: 0.75rem; margin: 10px 0; }
        .value-group h2 { font-size: 34px; font-weight: 600; color: #0A1B39; letter-spacing: -0.03em; margin: 0; }
        .live-value { color: #10b981 !important; }
        .desc { font-size: 0.8rem; color: #94a3b8; margin: 0; }

        .charts-main-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 30px; }
        .chart-card { padding: 32px; border-radius: 24px; }
        .chart-card h3 { margin: 0 0 30px 0; font-size: 1.2rem; font-weight: 600; color: #0A1B39; }
        
        .tables-grid { display: grid; gap: 30px; }
        
        .pie-container { display: flex; flex-direction: column; align-items: center; }
        .pie-legend { width: 100%; margin-top: 20px; display: flex; flex-direction: column; gap: 12px; }
        .legend-item { display: flex; align-items: center; font-size: 0.9rem; }
        .legend-item .dot { width: 10px; height: 10px; border-radius: 3px; margin-right: 12px; }
        .legend-item .name { flex: 1; color: #64748b; font-weight: 500; }
        .legend-item .val { font-weight: 700; color: #1e293b; }

        .table-section { padding: 32px; border-radius: 24px; }
        .table-section h3 { margin: 0 0 25px 0; font-size: 1.2rem; font-weight: 600; color: #0A1B39; }
        .analytics-table { width: 100%; border-collapse: collapse; }
        .analytics-table th { text-align: left; padding: 16px; color: #64748b; font-size: 0.9rem; border-bottom: 1px solid #edf2f7; font-weight: 600; }
        .analytics-table td { padding: 18px 16px; border-bottom: 1px solid #edf2f7; font-size: 0.95rem; color: #1e293b; }
        .page-path { font-family: monospace; color: #4f46e5; }
        .bold { font-weight: 700; color: #0A1B39; }
        .source-name { font-weight: 600; color: #1e293b; }
        .badge { padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: 700; background: #f1f5f9; color: #475569; display: inline-block; }
        .badge.high { background: #dcfce7; color: #15803d; }

        .glass-card { background: white; border: 1px solid #edf2f7; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.02); }
      `}</style>
    </div>
  );
}
