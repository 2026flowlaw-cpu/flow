import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('consultations')
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
    
    // Admin action: 상태 업데이트 (대기중 -> 진행중 -> 완료)
    if (body.id && body.action === 'update_status') {
      const { error } = await supabase
        .from('consultations')
        .update({ status: body.status })
        .eq('id', body.id);
      if (error) throw error;
      return NextResponse.json({ success: true });
    }
    
    // 신규 등록 로직 (만약 클라이언트에서 API 라우트를 직접 탈 경우를 대비한 백업 안전장치)
    const { error } = await supabase
      .from('consultations')
      .insert([{
        name: body.name,
        phone: body.phone,
        email: body.email || '',
        case_type: body.case_type || '지정안됨',
        location: body.location || '',
        details: body.details || '',
        appointment_time: body.appointment_time || '',
        status: '대기중'
      }]);
      
    if (error) throw error;
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
      .from('consultations')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
