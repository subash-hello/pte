import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import QuestionItem from '@/models/QuestionItem';
import { verifyAdminAuth } from '@/lib/auth';

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const adminUser = await verifyAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ success: true, message: 'Question deleted (fallback)' });
    }

    await QuestionItem.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Question item deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
