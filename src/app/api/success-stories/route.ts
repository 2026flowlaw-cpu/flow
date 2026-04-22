import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { supabase } from '@/lib/supabase';

const DATA_PATH = path.join(process.cwd(), 'src/data/success-stories.json');

// Helper to read data
const readData = () => {
  if (!fs.existsSync(DATA_PATH)) return [];
  const jsonData = fs.readFileSync(DATA_PATH, 'utf8');
  return JSON.parse(jsonData);
};

// Helper to write data
const writeData = (data: any) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
};

export async function GET() {
  try {
    const localStories = readData();
    const { data: dbStories, error } = await supabase
      .from('success_stories')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', error);
      return NextResponse.json(localStories);
    }

    const formattedDbStories = (dbStories || []).map((story: any) => ({
      ...story,
      image: story.image_url || '/images/success_apartment.png',
      lawyer: { name: story.lawyer_name }
    }));

    return NextResponse.json([...formattedDbStories, ...localStories]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch success stories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. If it's a numeric ID, it's an update to an existing Supabase story
    if (body.id && !isNaN(Number(body.id))) {
      const { error } = await supabase
        .from('success_stories')
        .update({
          title: body.title,
          category: body.category,
          description: body.description,
          content: body.content || body.description,
          badge: body.badge,
          lawyer_name: body.lawyer?.name || body.lawyer_name,
          image_url: body.image || body.image_url
        })
        .eq('id', Number(body.id));

      if (error) throw error;
      return NextResponse.json({ success: true });
    }

    // 2. If it's a legacy string ID (e.g. Case-XXX), update local JSON
    const localData = readData();
    if (body.id && localData.some((item: any) => item.id.toString() === body.id.toString())) {
      const index = localData.findIndex((item: any) => item.id.toString() === body.id.toString());
      localData[index] = { ...localData[index], ...body };
      writeData(localData);
      return NextResponse.json({ success: true });
    }

    // 3. Otherwise, it's a NEW story -> Save to Supabase by default!
    const { error: insertError } = await supabase
      .from('success_stories')
      .insert([{
        title: body.title,
        category: body.category,
        description: body.description,
        content: body.content || body.description,
        badge: body.badge,
        lawyer_name: body.lawyer?.name || body.lawyerName || body.lawyer_name,
        image_url: body.image || body.image_url
      }]);

    if (insertError) throw insertError;
    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Save error:', error);
    return NextResponse.json({ error: error.message || 'Failed to save success story' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    if (!isNaN(Number(id))) {
      const { error } = await supabase
        .from('success_stories')
        .delete()
        .eq('id', Number(id));

      if (error) throw error;
      return NextResponse.json({ success: true });
    }

    const data = readData();
    const filteredData = data.filter((item: any) => item.id.toString() !== id.toString());
    writeData(filteredData);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete success story' }, { status: 500 });
  }
}
