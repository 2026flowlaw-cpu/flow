import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('press_releases')
      .select('*')
      .order('publish_date', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (body.id) {
      // 수정 (Update)
      const { error } = await supabase
        .from('press_releases')
        .update({
          title: body.title,
          press_name: body.press_name,
          publish_date: body.publish_date,
          external_url: body.external_url,
          image_url: body.image_url,
          content: body.content
        })
        .eq('id', body.id);
      if (error) throw error;
    } else {
      // 신규 등록 (Insert)
      const { error } = await supabase
        .from('press_releases')
        .insert([{
          title: body.title,
          press_name: body.press_name,
          publish_date: body.publish_date,
          external_url: body.external_url,
          image_url: body.image_url,
          content: body.content
        }]);
      if (error) throw error;
    }
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) throw new Error('ID is required');

    const { error } = await supabase
      .from('press_releases')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
