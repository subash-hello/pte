// PTE Question Types
export type PTESection = 'speaking-writing' | 'reading' | 'listening';

export type SpeakingWritingType =
  | 'read-aloud'
  | 'repeat-sentence'
  | 'describe-image'
  | 'retell-lecture'
  | 'answer-short-question'
  | 'summarize-group-discussion'
  | 'respond-to-situation'
  | 'summarize-written-text'
  | 'write-essay';

export type ReadingType =
  | 'rw-fill-blanks'
  | 'mcq-multiple'
  | 'reorder-paragraphs'
  | 'reading-fill-blanks'
  | 'mcq-single';

export type ListeningType =
  | 'summarize-spoken-text'
  | 'listening-mcq-multiple'
  | 'listening-fill-blanks'
  | 'highlight-correct-summary'
  | 'listening-mcq-single'
  | 'select-missing-word'
  | 'highlight-incorrect-words'
  | 'write-from-dictation';

export type QuestionType = SpeakingWritingType | ReadingType | ListeningType;

// Score types
export interface PTEScore {
  overall: number; // 10-90
  communicativeSkills: {
    speaking: number;
    writing: number;
    reading: number;
    listening: number;
  };
  enablingSkills: {
    grammar: number;
    oralFluency: number;
    pronunciation: number;
    spelling: number;
    vocabulary: number;
    writtenDiscourse: number;
  };
}

export interface TaskScore {
  content: number;
  oralFluency?: number;
  pronunciation?: number;
  form?: number;
  grammar?: number;
  vocabulary?: number;
  spelling?: number;
  writtenDiscourse?: number;
  structureCoherence?: number;
  total: number;
  maxTotal: number;
  feedback: string;
  improvements: string[];
}

// Question interfaces
export interface BaseQuestion {
  id: string;
  type: QuestionType;
  section: PTESection;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ReadAloudQuestion extends BaseQuestion {
  type: 'read-aloud';
  text: string;
  prepTime: number; // seconds
  recordTime: number;
}

export interface RepeatSentenceQuestion extends BaseQuestion {
  type: 'repeat-sentence';
  audioUrl: string;
  transcript: string;
  recordTime: number;
}

export interface DescribeImageQuestion extends BaseQuestion {
  type: 'describe-image';
  imageUrl: string;
  imageType: 'graph' | 'chart' | 'map' | 'diagram' | 'photo';
  sampleAnswer: string;
  prepTime: number;
  recordTime: number;
}

export interface RetellLectureQuestion extends BaseQuestion {
  type: 'retell-lecture';
  audioUrl: string;
  imageUrl?: string;
  transcript: string;
  prepTime: number;
  recordTime: number;
}

export interface AnswerShortQuestion extends BaseQuestion {
  type: 'answer-short-question';
  audioUrl: string;
  questionText: string;
  correctAnswer: string;
  acceptableAnswers: string[];
  recordTime: number;
}

export interface SummarizeGroupDiscussionQuestion extends BaseQuestion {
  type: 'summarize-group-discussion';
  audioUrl: string;
  speakers: string[];
  transcript: string;
  prepTime: number;
  recordTime: number;
}

export interface RespondToSituationQuestion extends BaseQuestion {
  type: 'respond-to-situation';
  scenario: string;
  context: string;
  prepTime: number;
  recordTime: number;
}

export interface SummarizeWrittenTextQuestion extends BaseQuestion {
  type: 'summarize-written-text';
  passage: string;
  timeLimit: number; // 10 minutes in seconds
  wordRange: { min: number; max: number };
}

export interface WriteEssayQuestion extends BaseQuestion {
  type: 'write-essay';
  prompt: string;
  essayType: 'argumentative' | 'opinion' | 'problem-solution';
  timeLimit: number; // 20 minutes in seconds
  wordRange: { min: number; max: number };
}

// Reading types
export interface RWFillBlanksQuestion extends BaseQuestion {
  type: 'rw-fill-blanks';
  passage: string; // with {{BLANK_1}}, {{BLANK_2}} markers
  blanks: {
    id: string;
    options: string[];
    correctAnswer: string;
  }[];
}

export interface MCQMultipleQuestion extends BaseQuestion {
  type: 'mcq-multiple';
  passage: string;
  question: string;
  options: { id: string; text: string }[];
  correctAnswers: string[];
  hasNegativeMarking: boolean;
}

export interface ReorderParagraphsQuestion extends BaseQuestion {
  type: 'reorder-paragraphs';
  paragraphs: { id: string; text: string }[];
  correctOrder: string[];
}

export interface ReadingFillBlanksQuestion extends BaseQuestion {
  type: 'reading-fill-blanks';
  passage: string; // with {{BLANK_1}}, {{BLANK_2}} markers
  wordBank: string[];
  blanks: {
    id: string;
    correctAnswer: string;
  }[];
}

export interface MCQSingleQuestion extends BaseQuestion {
  type: 'mcq-single';
  passage?: string;
  audioUrl?: string;
  question: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
}

// Listening types
export interface SummarizeSpokenTextQuestion extends BaseQuestion {
  type: 'summarize-spoken-text';
  audioUrl: string;
  transcript: string;
  timeLimit: number;
  wordRange: { min: number; max: number };
}

export interface ListeningMCQMultipleQuestion extends BaseQuestion {
  type: 'listening-mcq-multiple';
  audioUrl: string;
  question: string;
  options: { id: string; text: string }[];
  correctAnswers: string[];
  hasNegativeMarking: boolean;
}

export interface ListeningFillBlanksQuestion extends BaseQuestion {
  type: 'listening-fill-blanks';
  audioUrl: string;
  transcript: string; // with {{BLANK}} markers
  blanks: {
    id: string;
    correctAnswer: string;
  }[];
}

export interface HighlightCorrectSummaryQuestion extends BaseQuestion {
  type: 'highlight-correct-summary';
  audioUrl: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
}

export interface ListeningMCQSingleQuestion extends BaseQuestion {
  type: 'listening-mcq-single';
  audioUrl: string;
  question: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
}

export interface SelectMissingWordQuestion extends BaseQuestion {
  type: 'select-missing-word';
  audioUrl: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
}

export interface HighlightIncorrectWordsQuestion extends BaseQuestion {
  type: 'highlight-incorrect-words';
  audioUrl: string;
  transcript: string;
  incorrectWords: { index: number; displayed: string; spoken: string }[];
  hasNegativeMarking: boolean;
}

export interface WriteFromDictationQuestion extends BaseQuestion {
  type: 'write-from-dictation';
  audioUrl: string;
  correctSentence: string;
}

// Union type for all questions
export type PTEQuestion =
  | ReadAloudQuestion
  | RepeatSentenceQuestion
  | DescribeImageQuestion
  | RetellLectureQuestion
  | AnswerShortQuestion
  | SummarizeGroupDiscussionQuestion
  | RespondToSituationQuestion
  | SummarizeWrittenTextQuestion
  | WriteEssayQuestion
  | RWFillBlanksQuestion
  | MCQMultipleQuestion
  | ReorderParagraphsQuestion
  | ReadingFillBlanksQuestion
  | MCQSingleQuestion
  | SummarizeSpokenTextQuestion
  | ListeningMCQMultipleQuestion
  | ListeningFillBlanksQuestion
  | HighlightCorrectSummaryQuestion
  | ListeningMCQSingleQuestion
  | SelectMissingWordQuestion
  | HighlightIncorrectWordsQuestion
  | WriteFromDictationQuestion;

// Practice session
export interface PracticeSession {
  id: string;
  userId: string;
  questionType: QuestionType;
  questionId: string;
  startedAt: Date;
  completedAt?: Date;
  score?: TaskScore;
  userResponse: string | string[] | Record<string, string>;
}

// User profile
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  targetScore: number;
  currentScore?: PTEScore;
  joinedAt: Date;
  subscription: 'free' | 'weekly' | 'monthly' | 'ultimate';
  practiceStats: {
    totalSessions: number;
    totalTime: number; // minutes
    streak: number;
    lastPractice?: Date;
  };
}

// Module info
export interface ModuleInfo {
  id: string;
  type: QuestionType;
  name: string;
  section: PTESection;
  sectionLabel: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  skillsAssessed: string[];
  timeInfo: string;
  questionCount: string;
  hasNegativeMarking: boolean;
  isNew?: boolean;
}

// Navigation
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
  children?: NavItem[];
}
