import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import PracticeResponse from '@/models/PracticeResponse';
import { extractUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const authUser = await extractUserFromRequest(request);
  if (!authUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section');
  const limit = Math.min(50, Number(searchParams.get('limit') || 20));

  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ success: true, history: [] });
    }

    const query: any = {
      $or: [
        { userId: authUser.userId || authUser.id },
        { userEmail: authUser.email },
      ],
    };

    if (section && section !== 'all') {
      query.section = section.toLowerCase();
    }

    const history = await PracticeResponse.find(query)
      .sort({ createdAt: -1 })
      .limit(limit);

    return NextResponse.json({ success: true, history });
  } catch (error: any) {
    return NextResponse.json({ success: true, history: [] });
  }
}
