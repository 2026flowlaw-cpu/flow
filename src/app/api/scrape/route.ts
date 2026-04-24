import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
      }
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch the URL' }, { status: 500 });
    }

    const html = await response.text();

    // 🕵️ 훨씬 강력해진 메타 태그 추출기 (속성 순서 무관)
    const getMeta = (property: string) => {
      // 패턴 1: <meta property="og:title" content="제목">
      const pattern1 = new RegExp(`<meta[^>]*property=["']og:${property}["'][^>]*content=["']([^"']+)["']`, 'i');
      // 패턴 2: <meta content="제목" property="og:title">
      const pattern2 = new RegExp(`<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:${property}["']`, 'i');
      // 패턴 3: (일반 네임태그) <meta name="title" content="제목">
      const pattern3 = new RegExp(`<meta[^>]*name=["'](?:twitter:)?${property}["'][^>]*content=["']([^"']+)["']`, 'i');

      const match = html.match(pattern1) || html.match(pattern2) || html.match(pattern3);
      return match ? match[1] : '';
    };

    // 📰 정보 긁어오기 (우선순위 부여)
    let title = getMeta('title') || 
                (html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] || '');
    
    // 제목에서 언론사명이 붙어있는 경우 정리 (예: "기사제목 : 네이버 뉴스")
    title = title.split(' : ')[0].split(' - ')[0].trim();

    let pressName = getMeta('site_name') || 
                    getMeta('author') || 
                    "언론사 확인 필요";

    // 언론사명이 너무 길거나 URL인 경우 예외처리
    if (pressName.includes('http') || pressName.length > 20) {
      pressName = "언론사 확인 필요";
    }

    const description = getMeta('description');
    const imageUrl = getMeta('image');

    return NextResponse.json({
      title: title || '제목을 불러오지 못했습니다. 직접 입력해주세요.',
      press_name: pressName,
      content: description || '본문 내용을 불러오지 못했습니다. 직접 입력해주세요.',
      image_url: imageUrl
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
