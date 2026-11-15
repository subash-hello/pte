import { NextResponse } from 'next/server';
import { supabaseStore } from '@/server/db/supabaseStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { mockTestId, testTitle, overallScore, communicativeSkills, enablingSkills } = body;

    const scorecard = await supabaseStore.insertItem('scorecards', {
      _id: `sc_${Date.now()}`,
      mockTestId,
      testTitle,
      overallScore,
      communicativeSkills,
      enablingSkills,
    });

    return NextResponse.json({ success: true, scorecardId: scorecard._id });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to save scorecard' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const scorecards = await supabaseStore.getCollection('scorecards');
    return NextResponse.json({ success: true, scorecards: scorecards.slice(0, 10) });
  } catch (error: any) {
    return NextResponse.json({ success: false, scorecards: [] });
  }
}
