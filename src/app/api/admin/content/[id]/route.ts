import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';
import { supabaseStore } from '@/server/db/supabaseStore';

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const adminUser = await verifyAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await supabaseStore.deleteItem('question_items', id);
    return NextResponse.json({ success: true, message: 'Question item deleted from Supabase' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
