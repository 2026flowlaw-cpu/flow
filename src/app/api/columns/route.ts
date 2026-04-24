import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('legal_columns')
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
        .from('legal_columns')
        .update({
          title: body.title,
          summary: body.summary,
          content: body.content,
          category: body.category,
          author_name: body.author_name,
          image_url: body.image_url,
          custom_meta: body.custom_meta
        })
        .eq('id', body.id);
      if (error) throw error;
    } else {
      // Insert
      const { error } = await supabase
        .from('legal_columns')
        .insert([{
          title: body.title,
          summary: body.summary,
          content: body.content,
          category: body.category,
          author_name: body.author_name,
          image_url: body.image_url,
          custom_meta: body.custom_meta
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
      .from('legal_columns')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
