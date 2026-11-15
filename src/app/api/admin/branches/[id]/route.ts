import { NextRequest, NextResponse } from 'next/server';
import { verifySuperAdminAuth } from '@/lib/auth';
import { supabaseStore } from '@/server/db/supabaseStore';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const adminUser = await verifySuperAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await supabaseStore.updateItem('branches', id, body);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Branch not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, branch: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const adminUser = await verifySuperAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await supabaseStore.deleteItem('branches', id);
    return NextResponse.json({ success: true, message: 'Branch deleted from Supabase' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
