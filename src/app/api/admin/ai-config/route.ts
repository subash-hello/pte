import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';
import { supabaseStore } from '@/server/db/supabaseStore';

const DEFAULT_AI_CONFIG = {
  _id: 'default_ai_config',
  id: 'default_ai_config',
  model: 'gemini-2.5-flash',
  temperature: 0.4,
  scoringRubric: `You are an official Pearson PTE Academic GSE (10-90 scale) Examiner AI. Evaluate student Speaking (Content, Pronunciation, Oral Fluency) and Writing (Content, Form, Grammar, Vocabulary, Spelling) with strict correlation to Pearson Academic scoring guidelines. Provide constructive band-boosting feedback and actionable tips.`,
  updatedAt: new Date().toISOString(),
};

export async function GET(request: NextRequest) {
  const adminUser = await verifyAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const items = await supabaseStore.getCollection<any>('ai_config');
    return NextResponse.json({
      success: true,
      config: items[0] || DEFAULT_AI_CONFIG,
    });
  } catch {
    return NextResponse.json({ success: true, config: DEFAULT_AI_CONFIG });
  }
}

export async function POST(request: NextRequest) {
  const adminUser = await verifyAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const config = {
      ...DEFAULT_AI_CONFIG,
      ...body,
      updatedAt: new Date().toISOString(),
    };
    await supabaseStore.saveCollection('ai_config', [config]);
    return NextResponse.json({ success: true, config });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
