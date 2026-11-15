import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, sanitizeUser } from '@/lib/auth';
import { supabaseAuthAdapter } from '@/server/services/supabaseAuthAdapter';
import { supabaseStore } from '@/server/db/supabaseStore';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const adminUser = await verifyAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    const targetSupaUser = await supabaseAuthAdapter.getUserById(id);
    if (targetSupaUser) {
      if (
        adminUser.role === 'branch_admin' &&
        !(targetSupaUser.branch || '').toLowerCase().includes((adminUser.branch || '').toLowerCase().split(' ')[0])
      ) {
        return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
      }

      const updatePayload = { ...body };
      if (body.extendDays) {
        updatePayload.accessDurationDays = (Number(targetSupaUser.accessDurationDays) || 30) + Number(body.extendDays);
        updatePayload.status = 'approved';
        delete updatePayload.extendDays;
      }

      const updatedSupa = await supabaseAuthAdapter.updateUser(id, updatePayload);
      if (updatedSupa) {
        await supabaseStore.updateItem('users', id, updatedSupa).catch(() => {});
        return NextResponse.json({ success: true, user: sanitizeUser(updatedSupa) });
      }
    }

    const { fallbackDb } = await import('@/lib/fallbackDb');
    const updated = fallbackDb.updateUser(id, body);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, user: sanitizeUser(updated) });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const adminUser = await verifyAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;

    if (adminUser.role === 'branch_admin') {
      const targetUser = await supabaseAuthAdapter.getUserById(id);
      if (targetUser && !(targetUser.branch || '').toLowerCase().includes((adminUser.branch || '').toLowerCase().split(' ')[0])) {
        return NextResponse.json({ success: false, message: 'Forbidden: User belongs to another branch' }, { status: 403 });
      }
    }

    const deletedSupa = await supabaseAuthAdapter.deleteUser(id);
    await supabaseStore.deleteItem('users', id).catch(() => {});
    if (deletedSupa) {
      return NextResponse.json({ success: true, message: 'User deleted from Supabase' });
    }

    const { fallbackDb } = await import('@/lib/fallbackDb');
    fallbackDb.deleteUser(id);
    return NextResponse.json({ success: true, message: 'User deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
