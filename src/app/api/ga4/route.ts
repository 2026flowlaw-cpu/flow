import { NextRequest, NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

// GA4 Data API 클라이언트 캐싱
let analyticsClient: BetaAnalyticsDataClient | null = null;

function getAnalyticsClient() {
  if (analyticsClient) return analyticsClient;

  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    return null;
  }

  // private_key 포맷 정리 (줄바꿈 처리)
  privateKey = privateKey.replace(/\\n/g, '\n');

  analyticsClient = new BetaAnalyticsDataClient({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
  });

  return analyticsClient;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const client = getAnalyticsClient();
  const propertyId = searchParams.get('propertyId') || process.env.GA4_PROPERTY_ID;

  if (!client || !propertyId) {
    return NextResponse.json({ 
      success: false, 
      configured: false,
      message: 'GA4 서비스 계정 환경변수가 설정되지 않았거나 속성 ID가 누락되었습니다.' 
    });
  }

  let startDate = searchParams.get('startDate') || '7daysAgo';
  let endDate = searchParams.get('endDate') || 'today';

  try {
    const parentProperty = `properties/${propertyId}`;

    // 병렬로 GA4 데이터 요청 실행
    const [
      [trendResponse],
      [sourcesResponse],
      [pagesResponse],
      [sourceTrendResponse],
      [sourcesDetailedResponse],
      [locationResponse],
      [summaryResponse],
      [eventsResponse],
      [scrollResponse]
    ] = await Promise.all([
      // 1. 트렌드 (일별 활성 사용자 & 세션)
      client.runReport({
        property: parentProperty,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'date' }],
        metrics: [{ name: 'activeUsers' }, { name: 'sessions' }],
      }),
      // 2. 트래픽 소스 비중
      client.runReport({
        property: parentProperty,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'sessionSource' }],
        metrics: [{ name: 'activeUsers' }],
        limit: 5,
      }),
      // 3. 인기 페이지 리포트
      client.runReport({
        property: parentProperty,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
        metrics: [{ name: 'screenPageViews' }, { name: 'userEngagementDuration' }],
        limit: 10,
      }),
      // 4. 매체별 일별 세션 추이
      client.runReport({
        property: parentProperty,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'date' }, { name: 'sessionSource' }],
        metrics: [{ name: 'sessions' }],
        limit: 100,
      }),
      // 5. 매체별 상세 리포트
      client.runReport({
        property: parentProperty,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'sessionSourceMedium' }],
        metrics: [
          { name: 'activeUsers' }, 
          { name: 'sessions' }, 
          { name: 'engagedSessions' }, 
          { name: 'userEngagementDuration' }
        ],
        limit: 15,
      }),
      // 6. 지역별 유입 리포트 (City)
      client.runReport({
        property: parentProperty,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'city' }],
        metrics: [{ name: 'activeUsers' }],
        limit: 15,
      }),
      // 7. 요약 정보 (평균 세션 시간, 이탈률 등)
      client.runReport({
        property: parentProperty,
        dateRanges: [{ startDate, endDate }],
        metrics: [{ name: 'averageSessionDuration' }, { name: 'bounceRate' }],
      }),
      // 8. 맞춤 이벤트별 발생 빈도 및 활성 사용자 (GTM 연동 추적용)
      client.runReport({
        property: parentProperty,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'eventName' }],
        metrics: [{ name: 'eventCount' }, { name: 'activeUsers' }],
        limit: 30,
      }),
      // 9. 페이지별 상세 스크롤 분석 리포트 (GTM 연동용)
      client.runReport({
        property: parentProperty,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'pagePath' }, { name: 'percentScrolled' }],
        metrics: [{ name: 'eventCount' }],
        dimensionFilter: {
          filter: {
            fieldName: 'eventName',
            stringFilter: {
              matchType: 'EXACT',
              value: 'scroll'
            }
          }
        },
        limit: 100
      })
    ]);

    // 1. 일별 트렌드 데이터 가공
    let totalUsers = 0;
    let totalSessions = 0;
    const formattedTrend = trendResponse.rows?.map((row: any) => {
      const u = Number(row.metricValues?.[0]?.value || 0);
      const s = Number(row.metricValues?.[1]?.value || 0);
      totalUsers += u;
      totalSessions += s;
      const rawDate = row.dimensionValues?.[0]?.value || '';
      return {
        rawDate,
        date: rawDate.slice(4).replace(/(\d{2})(\d{2})/, '$1.$2'),
        users: u,
        sessions: s,
      };
    }).sort((a: any, b: any) => a.rawDate.localeCompare(b.rawDate)) || [];

    // 2. 트래픽 소스 비중 가공
    const colors = ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
    const formattedSources = sourcesResponse.rows?.map((row: any, i: number) => ({
      name: row.dimensionValues?.[0]?.value || '(unknown)',
      value: Number(row.metricValues?.[0]?.value || 0),
      color: colors[i % colors.length]
    })) || [];

    // 3. 인기 페이지 리포트 가공
    const formattedPages = pagesResponse.rows?.map((row: any) => {
      const totalDuration = Number(row.metricValues?.[1]?.value || 0);
      const views = Number(row.metricValues?.[0]?.value || 0);
      const avgTime = views > 0 ? Math.floor(totalDuration / views) : 0;
      return {
        page: row.dimensionValues?.[0]?.value || '/',
        title: row.dimensionValues?.[1]?.value || '제목 없음',
        views: views,
        time: `${Math.floor(avgTime / 60)}m ${avgTime % 60}s`
      };
    }) || [];

    // 4. 매체별 세션 추이 가공 (Multi-line chart 용)
    const datesMap: Record<string, any> = {};
    const topSourceSet = new Set<string>();
    sourceTrendResponse.rows?.forEach((row: any) => {
      const date = row.dimensionValues?.[0]?.value || '';
      const source = row.dimensionValues?.[1]?.value || '';
      const sessions = Number(row.metricValues?.[0]?.value || 0);
      
      if (!datesMap[date]) {
        datesMap[date] = { 
          rawDate: date,
          date: date.slice(4).replace(/(\d{2})(\d{2})/, '$1.$2') 
        };
      }
      datesMap[date][source] = sessions;
      topSourceSet.add(source);
    });
    const formattedSourceTrend = Object.values(datesMap).sort((a: any, b: any) => a.rawDate.localeCompare(b.rawDate));

    // 5. 매체별 상세 리포트 가공
    const formattedDetailedSources = sourcesDetailedResponse.rows?.map((row: any) => {
      const users = Number(row.metricValues?.[0]?.value || 0);
      const sess = Number(row.metricValues?.[1]?.value || 0);
      const engaged = Number(row.metricValues?.[2]?.value || 0);
      const totalDuration = Number(row.metricValues?.[3]?.value || 0);
      const avgTime = sess > 0 ? Math.floor(totalDuration / sess) : 0;
      
      return {
        name: row.dimensionValues?.[0]?.value || '(unknown)',
        users,
        sessions: sess,
        engagedSessions: engaged,
        engagementRate: sess > 0 ? ((engaged / sess) * 100).toFixed(1) + '%' : '0%',
        avgTime: `${Math.floor(avgTime / 60)}분 ${avgTime % 60}초`
      };
    }) || [];

    // 6. 지역별 유입 리포트 가공
    const formattedLocation = locationResponse.rows?.map((row: any) => ({
      city: row.dimensionValues?.[0]?.value || '(not set)',
      users: Number(row.metricValues?.[0]?.value || 0)
    })) || [];

    // 7. 요약 지표 가공 (평균 세션 시간, 이탈률)
    const avgSessionSec = Math.floor(Number(summaryResponse.rows?.[0]?.metricValues?.[0]?.value || 0));
    const bounceRate = (Number(summaryResponse.rows?.[0]?.metricValues?.[1]?.value || 0) * 100).toFixed(1);

    // 8. 맞춤 이벤트 추적 가공 (GTM용)
    const formattedEvents = eventsResponse.rows?.map((row: any) => {
      const name = row.dimensionValues?.[0]?.value || '';
      const count = Number(row.metricValues?.[0]?.value || 0);
      const users = Number(row.metricValues?.[1]?.value || 0);
      return {
        name,
        count,
        users
      };
    }) || [];

    // 9. 상세 스크롤 깊이 분석 가공
    const scrollMap: Record<string, Record<string, number>> = {};
    scrollResponse.rows?.forEach((row: any) => {
      const page = row.dimensionValues?.[0]?.value || '/';
      const pct = row.dimensionValues?.[1]?.value || '90';
      const count = Number(row.metricValues?.[0]?.value || 0);

      if (!scrollMap[page]) {
        scrollMap[page] = { '25': 0, '50': 0, '75': 0, '90': 0 };
      }
      if (pct.includes('25')) scrollMap[page]['25'] += count;
      else if (pct.includes('50')) scrollMap[page]['50'] += count;
      else if (pct.includes('75')) scrollMap[page]['75'] += count;
      else if (pct.includes('90')) scrollMap[page]['90'] += count;
      else {
        const num = parseInt(pct, 10);
        if (!isNaN(num)) {
          if (num >= 90) scrollMap[page]['90'] += count;
          else if (num >= 75) scrollMap[page]['75'] += count;
          else if (num >= 50) scrollMap[page]['50'] += count;
          else if (num >= 25) scrollMap[page]['25'] += count;
        }
      }
    });

    const formattedScroll = Object.entries(scrollMap).map(([page, pcts]) => {
      return {
        page,
        pct25: pcts['25'] || 0,
        pct50: pcts['50'] || 0,
        pct75: pcts['75'] || 0,
        pct90: pcts['90'] || 0
      };
    }).sort((a, b) => (b.pct25 + b.pct50) - (a.pct25 + a.pct50)).slice(0, 5);

    const summaryStats = {
      activeUsers: totalUsers || Number(trendResponse.rows?.reduce((sum: number, r: any) => sum + Number(r.metricValues?.[0]?.value || 0), 0) || 0),
      totalSessions: totalSessions || Number(summaryResponse.rows?.[0]?.metricValues?.[4]?.value || 0),
      avgSessionTime: `${Math.floor(avgSessionSec / 60)}분 ${avgSessionSec % 60}초`,
      bounceRate: `${bounceRate}%`
    };

    return NextResponse.json({
      success: true,
      configured: true,
      stats: summaryStats,
      data: {
        dailyActiveUsers: formattedTrend,
        trafficSources: formattedSources,
        sourceTrend: formattedSourceTrend,
        topPages: formattedPages,
        sourcesDetailed: formattedDetailedSources,
        topLocations: formattedLocation,
        events: formattedEvents,
        scrollAnalysis: formattedScroll,
        topSourceNames: Array.from(topSourceSet).slice(0, 5) // 상위 5개 소스 표시
      }
    });

  } catch (error: any) {
    console.error('GA4 API fetch error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'GA4 데이터를 가져오는 도중 에러가 발생했습니다: ' + error.message 
    }, { status: 500 });
  }
}
