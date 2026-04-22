import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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

import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // 1. Get local JSON stories
    const localStories = readData();
    
    // 2. Get Supabase stories
    const { data: dbStories, error } = await supabase
      .from('success_stories')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', error);
      return NextResponse.json(localStories);
    }

    // Format DB stories for the UI
    const formattedDbStories = (dbStories || []).map((story: any) => ({
      ...story,
      image: story.image_url || '/images/success_apartment.png',
      lawyer: { name: story.lawyer_name }
    }));

    // Combined data (DB stories first)
    return NextResponse.json([...formattedDbStories, ...localStories]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch success stories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = readData();

    if (body.id && data.some((item: any) => item.id === body.id)) {
      // Update existing
      const index = data.findIndex((item: any) => item.id === body.id);
      data[index] = { ...data[index], ...body };
    } else {
      // Create new
      // Generate a simple ID if not provided (e.g. 2024-XXX)
      const newId = body.id || `CASE-${Date.now()}`;
      const newStory = {
        ...body,
        id: newId,
        displayId: body.displayId || `Case #${newId}`,
        createdAt: new Date().toISOString()
      };
      data.unshift(newStory); // Add to the beginning for "latest first"
    }

    writeData(data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save success story' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const data = readData();
    const filteredData = data.filter((item: any) => item.id !== id);
    
    if (data.length === filteredData.length) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    writeData(filteredData);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete success story' }, { status: 500 });
  }
}
