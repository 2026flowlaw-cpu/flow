import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch the URL' }, { status: 500 });
    }

    const html = await response.text();

    // 🕵️ 메타 태그 추출기 (Regex 기반)
    const extractMeta = (pattern: RegExp) => {
      const match = html.match(pattern);
      return match ? match[1] : '';
    };

    // 📰 구체적인 정보 긁어오기
    const title = 
      extractMeta(/<meta property="og:title" content="([^"]+)"/i) || 
      extractMeta(/<title>([^<]+)<\/title>/i);

    const pressName = 
      extractMeta(/<meta property="og:site_name" content="([^"]+)"/i) || 
      extractMeta(/<meta name="twitter:site" content="([^"]+)"/i) ||
      "언론사 확인 필요";

    const description = 
      extractMeta(/<meta property="og:description" content="([^"]+)"/i) || 
      extractMeta(/<meta name="description" content="([^"]+)"/i);

    const imageUrl = extractMeta(/<meta property="og:image" content="([^"]+)"/i);

    return NextResponse.json({
      title: title.trim(),
      press_name: pressName.trim(),
      content: description.trim(),
      image_url: imageUrl
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
