import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import QuestionItem from '@/models/QuestionItem';
import { verifyAdminAuth } from '@/lib/auth';

const fallbackQuestions = [
  { _id: 'q_01', section: 'speaking', type: 'Read Aloud', code: 'RA-104', title: 'Climate Dynamics in Sub-Saharan Africa', difficulty: 'Medium', promptText: 'Climate variability in sub-Saharan Africa creates severe agricultural vulnerabilities...', testedCount: 342 },
  { _id: 'q_02', section: 'speaking', type: 'Repeat Sentence', code: 'RS-208', title: 'Library Operating Hours Exam Period', difficulty: 'Easy', promptText: 'The university library will remain open throughout the exam period.', testedCount: 512 },
  { _id: 'q_03', section: 'writing', type: 'Write Essay', code: 'WE-402', title: 'AI and Future Employment Structures', difficulty: 'Hard', promptText: 'Discuss how generative artificial intelligence impacts workforce employment.', testedCount: 289 },
  { _id: 'q_04', section: 'writing', type: 'Summarize Written Text', code: 'SWT-301', title: 'Urbanization Patterns and Renewable Energy Transitions', difficulty: 'Medium', promptText: 'Rapid urbanization throughout developing countries necessitates renewable grids...', testedCount: 195 },
  { _id: 'q_05', section: 'reading', type: 'Fill in Blanks (R&W)', code: 'FIB-RW-112', title: 'Cognitive Neuroscience and Human Memory Retainability', difficulty: 'Hard', promptText: 'Neuroscience reveals synaptic plasticity is the primary driver of long-term memory...', testedCount: 420 },
  { _id: 'q_06', section: 'reading', type: 'Re-order Paragraphs', code: 'ROP-205', title: 'Historical Evolution of Printing Press Mechanization', difficulty: 'Medium', promptText: 'Before the invention of the movable type printing press by Johannes Gutenberg...', testedCount: 310 },
  { _id: 'q_07', section: 'listening', type: 'Summarize Spoken Text', code: 'SST-504', title: 'Deep Ocean Biodiversity and Marine Protected Zones', difficulty: 'Hard', promptText: 'Marine biologists have surveyed deep ocean trenches discovering thousands of organisms...', testedCount: 260 },
  { _id: 'q_08', section: 'listening', type: 'Write from Dictation', code: 'WFD-619', title: 'Departmental Assignment Guidelines', difficulty: 'Easy', promptText: 'All submitted assignments must follow the departmental formatting guidelines.', testedCount: 680 },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section');
  const type = searchParams.get('type');
  const search = searchParams.get('search');

  try {
    const db = await connectToDatabase();
    if (!db) {
      let results = [...fallbackQuestions];
      if (section && section !== 'all') {
        results = results.filter(q => q.section.toLowerCase() === section.toLowerCase());
      }
      if (type) {
        results = results.filter(q => q.type.toLowerCase().includes(type.toLowerCase()));
      }
      if (search) {
        const s = search.toLowerCase();
        results = results.filter(q => q.title.toLowerCase().includes(s) || q.code.toLowerCase().includes(s));
      }
      return NextResponse.json({ success: true, questions: results });
    }

    const query: any = { isActive: true };
    if (section && section !== 'all') query.section = section.toLowerCase();
    if (type) query.type = { $regex: type, $options: 'i' };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } },
      ];
    }

    const questions = await QuestionItem.find(query).sort({ createdAt: -1 });
    if (!questions || questions.length === 0) {
      return NextResponse.json({ success: true, questions: fallbackQuestions });
    }

    return NextResponse.json({ success: true, questions });
  } catch (error: any) {
    return NextResponse.json({ success: true, questions: fallbackQuestions });
  }
}

export async function POST(request: NextRequest) {
  const adminUser = await verifyAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { code, section, type, title, difficulty, promptText, referenceAnswer, keywords } = body;

    if (!section || !type || !title || !promptText) {
      return NextResponse.json({ success: false, message: 'Missing required question fields' }, { status: 400 });
    }

    const itemCode = code || `${section.substring(0, 2).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    const db = await connectToDatabase();
    if (!db) {
      const newQ = {
        _id: `q_${Date.now()}`,
        code: itemCode,
        section: section.toLowerCase(),
        type,
        title,
        difficulty: difficulty || 'Medium',
        promptText,
        referenceAnswer,
        keywords: keywords || [],
        testedCount: 0,
      };
      fallbackQuestions.unshift(newQ as any);
      return NextResponse.json({ success: true, question: newQ }, { status: 201 });
    }

    const newQuestion = new QuestionItem({
      code: itemCode,
      section: section.toLowerCase(),
      type,
      title,
      difficulty: difficulty || 'Medium',
      promptText,
      referenceAnswer: referenceAnswer || '',
      keywords: keywords || [],
      testedCount: 0,
      isActive: true,
    });

    await newQuestion.save();

    return NextResponse.json({ success: true, question: newQuestion }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
