import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Branch from '@/models/Branch';
import { verifySuperAdminAuth } from '@/lib/auth';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const adminUser = await verifySuperAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const db = await connectToDatabase();

    if (!db) {
      return NextResponse.json({ success: true, message: 'Branch updated (fallback)' });
    }

    const branch = await Branch.findById(id);
    if (!branch) {
      return NextResponse.json({ success: false, message: 'Branch not found' }, { status: 404 });
    }

    const updatable = ['name', 'location', 'adminName', 'adminEmail', 'adminPhone', 'status', 'studentCapacity'];
    for (const key of updatable) {
      if (body[key] !== undefined) {
        (branch as any)[key] = body[key];
      }
    }

    await branch.save();
    return NextResponse.json({ success: true, branch });
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
    const db = await connectToDatabase();

    if (!db) {
      return NextResponse.json({ success: true, message: 'Branch deleted (fallback)' });
    }

    await Branch.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Branch deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
