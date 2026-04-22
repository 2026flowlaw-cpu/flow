import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('youtube_videos')
      .select('*')
      .order('created_at', { ascending: false });

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
      // Update
      const { error } = await supabase
        .from('youtube_videos')
        .update({
          title: body.title,
          description: body.description,
          youtube_id: body.youtube_id,
          category: body.category,
          theme: body.theme
        })
        .eq('id', body.id);
      if (error) throw error;
    } else {
      // Insert
      const { error } = await supabase
        .from('youtube_videos')
        .insert([{
          title: body.title,
          description: body.description,
          youtube_id: body.youtube_id,
          category: body.category,
          theme: body.theme
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
      .from('youtube_videos')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
