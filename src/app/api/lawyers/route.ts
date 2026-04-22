import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src/data/lawyers.json');

// Helper to read data
const readData = () => {
  const jsonData = fs.readFileSync(DATA_PATH, 'utf8');
  return JSON.parse(jsonData).sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
};

// Helper to write data
const writeData = (data: any) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
};

export async function GET() {
  try {
    const data = readData();
    // Return only necessary fields for listing (Optimization)
    const summaryData = data.map((l: any) => ({
      id: l.id,
      slug: l.slug,
      name: l.name,
      title: l.title,
      image: l.image,
      experience: l.experience ? l.experience.slice(0, 3) : []
    }));
    return NextResponse.json(summaryData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = readData();

    if (body.id) {
      // Update existing
      const index = data.findIndex((l: any) => l.id === body.id);
      if (index !== -1) {
        data[index] = { ...data[index], ...body };
      } else {
        return NextResponse.json({ error: 'Lawyer not found' }, { status: 404 });
      }
    } else {
      // Create new
      const newId = data.length > 0 ? Math.max(...data.map((l: any) => l.id)) + 1 : 1;
      const newOrder = data.length > 0 ? Math.max(...data.map((l: any) => l.order || 0)) + 1 : 1;
      const newLawyer = {
        ...body,
        id: newId,
        order: newOrder,
        slug: body.name.toLowerCase().replace(/\s+/g, '-'),
        experience: body.experience || [],
        history: body.history || [],
        activities: body.activities || [],
        blogs: []
      };
      data.push(newLawyer);
    }

    writeData(data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { action, lawyerId, direction } = await request.json();
    let data = readData();

    if (action === 'reorder') {
      const index = data.findIndex((l: any) => l.id === lawyerId);
      if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex >= 0 && targetIndex < data.length) {
        // Swap orders
        const currentOrder = data[index].order;
        const targetOrder = data[targetIndex].order;
        
        data[index].order = targetOrder;
        data[targetIndex].order = currentOrder;
        
        // Re-sort and write
        data.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
        writeData(data);
        return NextResponse.json({ success: true, data });
      }
    }
    return NextResponse.json({ error: 'Invalid action or position' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to reorder' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '');
    
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const data = readData();
    const filteredData = data.filter((l: any) => l.id !== id);
    
    if (data.length === filteredData.length) {
      return NextResponse.json({ error: 'Lawyer not found' }, { status: 404 });
    }

    writeData(filteredData);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
  }
}
