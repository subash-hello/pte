import pteQuestionsData from '../data/pteQuestions.json';
import { PTEPracticeQuestions } from '../data/practice-questions';

export interface PTEQuestion {
  id?: string;
  taskType: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeLimit: number;
  promptText?: string | null;
  audioScript?: string | null;
  imageDescription?: string | null;
  imagePrompt?: string | null;
  options?: any[];
  correctAnswer?: any;
  sampleAnswer?: string | null;
  keywords?: string[];
  explanation?: string;
  keyPoints?: string[];
  rawDetails?: any;
}

// Convert PTEPracticeQuestions items to PTEQuestion format
const convertedPracticeQuestions: PTEQuestion[] = PTEPracticeQuestions.map((q: any) => {
  return {
    id: q.id,
    taskType: q.itemCategory || q.type || 'Practice Question',
    title: q.title || q.itemCategory || 'Practice Item',
    difficulty: q.difficulty || 'Medium',
    timeLimit: (q.timeLimitMinutes ? q.timeLimitMinutes * 60 : 60),
    promptText: q.passage || q.passageTemplate || q.passageTextWithPlaceholders || q.passageOrTranscript || q.promptText || q.instruction || q.audioScript || q.sentenceText || null,
    audioScript: q.audioScript || q.lectureScript || q.audioTranscript || null,
    imagePrompt: q.imageUrl || null,
    options: q.options || q.blanks || q.wordBank || q.jumbledParagraphs || null,
    correctAnswer: q.correctAnswer || q.correctMapping || q.correctOrder || q.correctSequenceIds || q.answerKey || null,
    sampleAnswer: q.sampleModelAnswer || q.sampleBand9Essay || q.modelSummary || q.sampleAnswer || null,
    keywords: q.phoneticFocusWords || q.keywords || q.keyPointsToCover || q.keyArguments || q.keyPoints || null,
    explanation: q.explanation || null,
    rawDetails: q
  };
});

export const allQuestions: PTEQuestion[] = [
  ...convertedPracticeQuestions,
  ...(pteQuestionsData as PTEQuestion[])
];

export function getQuestionsByTaskType(taskType: string): PTEQuestion[] {
  const normalized = taskType.toLowerCase().trim();
  
  const matches = allQuestions.filter(q => {
    const qType = q.taskType.toLowerCase().trim();
    if (qType === normalized) return true;
    
    // Speaking
    if (normalized.includes('read aloud') && qType.includes('read aloud')) return true;
    if (normalized.includes('repeat sentence') && qType.includes('repeat sentence')) return true;
    if (normalized.includes('describe image') && qType.includes('describe image')) return true;
    if (normalized.includes('retell') && qType.includes('retell')) return true;
    if (normalized.includes('answer short') && qType.includes('answer short')) return true;
    
    // Writing
    if (normalized.includes('summarize written') && qType.includes('summarize written')) return true;
    if (normalized.includes('essay') && qType.includes('essay')) return true;
    
    // Reading specific distinction
    if ((normalized.includes('r&w') || normalized.includes('reading & writing') || normalized.includes('dropdown')) && 
        (qType.includes('r&w') || qType.includes('reading & writing') || qType.includes('fib_reading_writing'))) return true;
    if ((normalized.includes('fib (reading)') || normalized.includes('fill in the blanks (reading)') || normalized.includes('drag')) && 
        (qType.includes('fib (reading)') || qType.includes('fill in the blanks (reading)') || qType.includes('fib_reading')) &&
        !qType.includes('r&w') && !qType.includes('writing')) return true;
    if (normalized.includes('reorder') || normalized.includes('re-order')) {
      if (qType.includes('re-order') || qType.includes('reorder')) return true;
    }
    if ((normalized.includes('multiple choice') && normalized.includes('multiple')) || normalized.includes('mcma')) {
      if (qType.includes('multiple') && (qType.includes('mcma') || qType.includes('multiple choice'))) return true;
    }
    if ((normalized.includes('multiple choice') && normalized.includes('single')) || normalized.includes('mcsa')) {
      if (qType.includes('single') && (qType.includes('mcsa') || qType.includes('multiple choice'))) return true;
    }
    
    // Listening
    if (normalized.includes('dictation') && qType.includes('dictation')) return true;
    if (normalized.includes('spoken text') && qType.includes('spoken text')) return true;
    if (normalized.includes('correct summary') && qType.includes('correct summary')) return true;
    if (normalized.includes('missing word') && qType.includes('missing word')) return true;
    if (normalized.includes('incorrect words') && qType.includes('incorrect words')) return true;
    if (normalized.includes('fib (listening)') && (qType.includes('fib (listening)') || qType.includes('fib_listening'))) return true;
    
    return false;
  });

  if (matches.length > 0) return matches;

  return allQuestions.filter(q => q.taskType.toLowerCase().includes(normalized));
}

export function getRandomMockTestSet() {
  const speakingTasks = ['Read Aloud', 'Repeat Sentence', 'Describe Image', 'Re-tell Lecture', 'Answer Short Question'];
  const writingTasks = ['Summarize Written Text', 'Essay'];
  const readingTasks = ['Reading & Writing Fill in the Blanks', 'Re-order Paragraphs', 'Multiple Choice (Single Answer)', 'Multiple Choice (Multiple Answers)'];
  const listeningTasks = ['Summarize Spoken Text', 'Highlight Correct Summary', 'Select Missing Word', 'Write From Dictation'];

  const pickRandom = (type: string): PTEQuestion | null => {
    const list = getQuestionsByTaskType(type);
    if (list.length === 0) return null;
    return list[Math.floor(Math.random() * list.length)];
  };

  const speaking = speakingTasks.map(t => pickRandom(t)).filter((q): q is PTEQuestion => q !== null);
  const writing = writingTasks.map(t => pickRandom(t)).filter((q): q is PTEQuestion => q !== null);
  const reading = readingTasks.map(t => pickRandom(t)).filter((q): q is PTEQuestion => q !== null);
  const listening = listeningTasks.map(t => pickRandom(t)).filter((q): q is PTEQuestion => q !== null);

  return {
    speaking,
    writing,
    reading,
    listening,
  };
}
