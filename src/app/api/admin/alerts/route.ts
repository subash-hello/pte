import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';
import { supabaseStore, INITIAL_ANNOUNCEMENTS } from '@/server/db/supabaseStore';

export async function GET() {
  try {
    const announcements = await supabaseStore.getCollection('announcements');
    return NextResponse.json({
      success: true,
      announcements: announcements.length ? announcements : INITIAL_ANNOUNCEMENTS,
    });
  } catch (error: any) {
    return NextResponse.json({ success: true, announcements: INITIAL_ANNOUNCEMENTS });
  }
}

export async function POST(request: NextRequest) {
  const adminUser = await verifyAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, body: alertBody, target, isImportant } = body;

    if (!title || !alertBody) {
      return NextResponse.json({ success: false, message: 'Missing title or body' }, { status: 400 });
    }

    const newA = await supabaseStore.insertItem('announcements', {
      _id: `a_${Date.now()}`,
      title,
      body: alertBody,
      target: target || 'all',
      senderName: adminUser.name || 'Admin',
      senderRole: adminUser.role || 'super_admin',
      isImportant: Boolean(isImportant),
    });

    return NextResponse.json({ success: true, announcement: newA }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
