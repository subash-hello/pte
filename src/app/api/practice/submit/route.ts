import { NextRequest, NextResponse } from 'next/server';
import { extractUserFromRequest } from '@/lib/auth';
import { supabaseStore } from '@/server/db/supabaseStore';
import { supabaseAuthAdapter } from '@/server/services/supabaseAuthAdapter';

export async function POST(request: NextRequest) {
  try {
    const authUser = await extractUserFromRequest(request);
    const body = await request.json();

    const {
      questionId,
      questionType,
      section,
      userAnswerText,
      audioTranscript,
      overallScore,
      enablingSkills,
      feedbackDetails,
      explanation,
      aiEvaluated,
    } = body;

    if (!questionId || !questionType || !section || overallScore === undefined) {
      return NextResponse.json({ success: false, message: 'Missing required practice fields' }, { status: 400 });
    }

    const userId = authUser?.userId || authUser?.id || '';
    const userEmail = authUser?.email || '';
    const earnedXp = 15;

    // 1. Save Practice Response in Supabase
    const responseDoc = await supabaseStore.insertItem('practice_responses', {
      _id: `pr_${Date.now()}`,
      userId,
      userEmail,
      branch: authUser?.branch || 'Kathmandu Central Campus',
      questionId,
      questionType,
      section: section.toLowerCase(),
      userAnswerText: userAnswerText || '',
      audioTranscript: audioTranscript || '',
      overallScore: Number(overallScore),
      enablingSkills: enablingSkills || {},
      feedbackDetails: feedbackDetails || [],
      explanation: explanation || '',
      aiEvaluated: Boolean(aiEvaluated),
    });

    // 2. Update User Progress, XP and Streak in Supabase Auth
    if (userId) {
      const u = await supabaseAuthAdapter.getUserById(userId);
      if (u) {
        const newXp = (u.xp || 0) + earnedXp;
        const completedCount = (u.progress?.completedCount || 0) + 1;
        const currentStreak = Math.max(1, u.streak || 1);
        const sectionKey = section.toLowerCase();

        await supabaseAuthAdapter.updateUser(userId, {
          xp: newXp,
          streak: currentStreak,
          progress: {
            ...u.progress,
            completedCount,
            xp: newXp,
            streak: currentStreak,
            [sectionKey]: Math.round(
              ((u.progress?.[sectionKey] || 70) * 0.8) + (Number(overallScore) * 0.2)
            ),
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      responseId: responseDoc._id,
      earnedXp,
      overallScore,
    });
  } catch (error: any) {
    console.error('Practice submit error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Server error' }, { status: 500 });
  }
}
