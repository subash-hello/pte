import { NextRequest, NextResponse } from 'next/server';
import { extractUserFromRequest } from '@/lib/auth';
import { supabaseStore } from '@/server/db/supabaseStore';

export async function GET(request: NextRequest) {
  const authUser = await extractUserFromRequest(request);
  if (!authUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section');
  const limit = Math.min(50, Number(searchParams.get('limit') || 20));

  try {
    const allResponses = await supabaseStore.getCollection<any>('practice_responses');
    const uid = authUser.userId || authUser.id;
    const email = (authUser.email || '').toLowerCase();

    let history = allResponses.filter(
      r => r.userId === uid || (r.userEmail && r.userEmail.toLowerCase() === email)
    );

    if (section && section !== 'all') {
      history = history.filter(r => (r.section || '').toLowerCase() === section.toLowerCase());
    }

    return NextResponse.json({ success: true, history: history.slice(0, limit) });
  } catch (error: any) {
    return NextResponse.json({ success: true, history: [] });
  }
}
