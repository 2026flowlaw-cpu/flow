import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
      }
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch the URL' }, { status: 500 });
    }

    const html = await response.text();

    // 🕵️ 양방향 속성 탐지 (Attribute-Agnostic Scraper)
    // content가 앞에 있든 property가 앞에 있든 모두 찾아냅니다.
    const extractMeta = (target: string) => {
      // 패턴: 어떤 속성이든 target(title, site_name 등)을 포함하고 그 옆에 content가 있는 경우
      const regex = new RegExp(`<(?:meta|link)[^>]*(?:property|name|itemprop)=["'][^"']*(?:og:|twitter:)?${target}["'][^>]*content=["']([^"']+)["']|<(?:meta|link)[^>]*content=["']([^"']+)["'][^>]*(?:property|name|itemprop)=["'][^"']*(?:og:|twitter:)?${target}["']`, 'i');
      const match = html.match(regex);
      return match ? (match[1] || match[2] || '').trim() : '';
    };

    // 📰 1. 제목 추출 (우선순서: og:title -> twitter:title -> <title> 태그)
    let title = extractMeta('title');
    if (!title) {
      const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      title = titleMatch ? titleMatch[1].trim() : '';
    }
    // 인코딩 및 불필요한 장식 제거
    title = title.replace(/&quot;/g, '"').replace(/&amp;/g, '&').split(' : ')[0].split(' - ')[0].trim();

    // 📡 2. 언론사명 추출 (우선순서: site_name -> author -> URL 호스트명 유추)
    let pressName = extractMeta('site_name') || extractMeta('author');
    
    if (!pressName) {
      // URL에서 도메인만 추출해서 보여주기 (최후의 수단)
      try {
        const domain = new URL(url).hostname.replace('www.', '');
        pressName = domain.split('.')[0].toUpperCase();
      } catch {
        pressName = "언론사 직접 입력";
      }
    }

    // 📝 3. 본문/상세내용
    const description = extractMeta('description') || extractMeta('text');
    
    // 🖼️ 4. 이미지
    const imageUrl = extractMeta('image');

    return NextResponse.json({
      title: title || '제목을 불러오지 못했습니다. 직접 입력해주세요.',
      press_name: pressName,
      content: description || '내용을 불러오지 못했습니다. 직접 입력해주세요.',
      image_url: imageUrl
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
