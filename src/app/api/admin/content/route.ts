import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';
import { supabaseStore, INITIAL_QUESTION_ITEMS } from '@/server/db/supabaseStore';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section');
  const type = searchParams.get('type');
  const search = searchParams.get('search');

  try {
    let results = await supabaseStore.getCollection<any>('question_items');
    if (!results || results.length === 0) {
      results = [...INITIAL_QUESTION_ITEMS];
    }

    if (section && section !== 'all') {
      results = results.filter(q => (q.section || '').toLowerCase() === section.toLowerCase());
    }
    if (type) {
      results = results.filter(q => (q.type || '').toLowerCase().includes(type.toLowerCase()));
    }
    if (search) {
      const s = search.toLowerCase();
      results = results.filter(
        q =>
          (q.title || '').toLowerCase().includes(s) ||
          (q.code || '').toLowerCase().includes(s)
      );
    }

    return NextResponse.json({ success: true, questions: results });
  } catch (error: any) {
    return NextResponse.json({ success: true, questions: INITIAL_QUESTION_ITEMS });
  }
}

export async function POST(request: NextRequest) {
  const adminUser = await verifyAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { code, section, type, title, difficulty, promptText, referenceAnswer, keywords } = body;

    if (!section || !type || !title || !promptText) {
      return NextResponse.json({ success: false, message: 'Missing required question fields' }, { status: 400 });
    }

    const itemCode = code || `${section.substring(0, 2).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    const newQ = await supabaseStore.insertItem('question_items', {
      _id: `q_${Date.now()}`,
      code: itemCode,
      section: section.toLowerCase(),
      type,
      title,
      difficulty: difficulty || 'Medium',
      promptText,
      referenceAnswer: referenceAnswer || '',
      keywords: keywords || [],
      testedCount: 0,
      isActive: true,
    });

    return NextResponse.json({ success: true, question: newQ }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
