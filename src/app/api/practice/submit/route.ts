import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import PracticeResponse from '@/models/PracticeResponse';
import User from '@/models/User';
import { extractUserFromRequest } from '@/lib/auth';
import { fallbackDb } from '@/lib/fallbackDb';

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

    const db = await connectToDatabase();

    if (!db) {
      // Fallback in-memory update
      if (userId) {
        const u = fallbackDb.findById(userId);
        if (u) {
          const newXp = (u.xp || 0) + earnedXp;
          const completedCount = (u.progress?.completedCount || 0) + 1;
          const currentStreak = Math.max(1, u.streak || 1);
          
          fallbackDb.updateUser(userId, {
            xp: newXp,
            streak: currentStreak,
            progress: {
              ...u.progress,
              completedCount,
              xp: newXp,
              streak: currentStreak,
              [section.toLowerCase()]: Math.round(
                ((u.progress?.[section.toLowerCase()] || 70) * 0.8) + (overallScore * 0.2)
              )
            }
          });
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Practice response recorded',
        earnedXp,
        overallScore,
      });
    }

    // Save Practice Response
    const responseDoc = await PracticeResponse.create({
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

    // Update User Progress, XP and Streak
    if (userId) {
      const user = await User.findById(userId);
      if (user) {
        user.xp = (user.xp || 0) + earnedXp;
        user.streak = Math.max(1, (user.streak || 0));
        
        // Update section average
        const sectionKey = section.toLowerCase();
        if (['speaking', 'writing', 'reading', 'listening'].includes(sectionKey)) {
          const userAny = user as any;
          const currentScore = userAny[sectionKey] || 70;
          userAny[sectionKey] = Math.min(90, Math.max(10, Math.round((currentScore * 0.85) + (overallScore * 0.15))));
        }

        await user.save();
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
