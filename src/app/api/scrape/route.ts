import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'no-cache'
      }
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch the URL' }, { status: 500 });
    }

    const html = await response.text();

    // 🕵️ 초정밀 조각 탐색기 (Split & Search Strategy)
    // 정규표현식이 놓치는 불규칙한 공백이나 속성 순서를 100% 잡아냅니다.
    const findMetadata = (keys: string[]) => {
      const metas = html.split('<meta');
      for (const meta of metas) {
        const lowerMeta = meta.toLowerCase();
        // 타겟 키(title, site_name 등)가 포함된 메타 태그인지 확인
        if (keys.some(k => lowerMeta.includes(k))) {
          // 해당 태그 내에서 content="..." 부분을 추출
          const contentMatch = meta.match(/content=["']([\s\S]*?)["']/i);
          if (contentMatch && contentMatch[1].trim()) {
            return contentMatch[1].trim();
          }
        }
      }
      return '';
    };

    // 📰 1. 제목 (og:title, twitter:title, name="title", <title> 순서)
    let title = findMetadata(['og:title', 'twitter:title', 'name="title"', 'property="title"']);
    
    if (!title) {
      const rawTitle = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      title = rawTitle ? rawTitle[1].trim() : '';
    }

    // 제목 정제 (인코딩 및 부가 정보 제거)
    title = title.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'");
    title = title.split(' : ')[0].split(' - ')[0].split(' | ')[0].trim();

    // 📡 2. 언론사명 (site_name, og:author, twitter:creator 등)
    let pressName = findMetadata(['og:site_name', 'og:author', 'twitter:site', 'name="author"']);
    
    if (!pressName || pressName.length > 20) {
      // 도메인 기반 유추 필살기
      try {
        const domain = new URL(url).hostname.replace('www.', '').toLowerCase();
        if (domain.includes('asiae')) pressName = "아시아경제";
        else if (domain.includes('newsis')) pressName = "뉴시스";
        else if (domain.includes('naver')) pressName = "네이버뉴스";
        else if (domain.includes('daum')) pressName = "다음뉴스";
        else if (domain.includes('chosun')) pressName = "조선일보";
        else if (domain.includes('kbs')) pressName = "KBS뉴스";
        else if (domain.includes('mbc')) pressName = "MBC뉴스";
        else if (domain.includes('sbs')) pressName = "SBS뉴스";
        else pressName = domain.split('.')[0].toUpperCase();
      } catch {
        pressName = "언론사 직접 입력";
      }
    }

    // 📝 3. 상세 내용
    const description = findMetadata(['og:description', 'twitter:description', 'name="description"']);
    
    // 🖼️ 4. 이미지
    const imageUrl = findMetadata(['og:image', 'twitter:image']);

    return NextResponse.json({
      title: title || '제목을 불러오지 못했습니다.',
      press_name: pressName,
      content: description || '내용을 불러오지 못했습니다.',
      image_url: imageUrl
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
