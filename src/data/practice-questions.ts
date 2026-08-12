/**
 * PTE Academic Master Practice Question Bank
 * Comprehensive question sets across all 20 exam item types
 */

export interface ReadAloudQuestion {
  id: string;
  title: string;
  text: string;
  wordCount: number;
  prepTimeSeconds: number;
  recordTimeSeconds: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  phoneticFocusWords: string[];
}

export interface RepeatSentenceQuestion {
  id: string;
  audioTranscript: string;
  wordCount: number;
  audioDurationSeconds: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  keywords: string[];
}

export interface DescribeImageQuestion {
  id: string;
  title: string;
  type: 'bar_chart' | 'line_graph' | 'pie_chart' | 'process_diagram' | 'map' | 'table';
  imageUrl: string;
  keyPointsToCover: string[];
  sampleModelAnswer: string;
}

export interface RetellLectureQuestion {
  id: string;
  title: string;
  audioTranscript: string;
  imageUrl?: string;
  keyPoints: string[];
  sampleModelAnswer: string;
}

export interface AnswerShortQuestion {
  id: string;
  questionAudioTranscript: string;
  correctAnswer: string;
  acceptableSynonyms: string[];
}

export interface SummarizeWrittenTextQuestion {
  id: string;
  title: string;
  passageText: string;
  keyPoints: string[];
  modelSummarySentence: string;
  modelWordCount: number;
}

export interface WriteEssayQuestion {
  id: string;
  title: string;
  promptText: string;
  category: string;
  keyArguments: string[];
  sampleBand9Essay: string;
}

export interface FIBDropdownQuestion {
  id: string;
  title: string;
  passageTemplate: string;
  blanks: {
    id: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }[];
}

export interface MCMAQuestion {
  id: string;
  section: 'Reading' | 'Listening';
  title: string;
  passageOrTranscript: string;
  questionText: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation: string;
}

export interface ReorderParagraphsQuestion {
  id: string;
  title: string;
  jumbledParagraphs: { id: string; text: string }[];
  correctSequenceIds: string[];
  correctPairs: string[];
  explanation: string;
}

export interface FIBDragDropQuestion {
  id: string;
  title: string;
  passageTextWithPlaceholders: string;
  wordBank: string[];
  correctMapping: Record<string, string>;
  explanation: string;
}

export interface MCSAQuestion {
  id: string;
  section: 'Reading' | 'Listening';
  title: string;
  passageOrTranscript: string;
  questionText: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation: string;
}

export interface SummarizeSpokenTextQuestion {
  id: string;
  title: string;
  audioTranscript: string;
  keyConcepts: string[];
  modelSummary: string;
  modelWordCount: number;
}

export interface ListeningFIBQuestion {
  id: string;
  title: string;
  audioTranscriptWithBlanks: string;
  blanks: { id: string; correctAnswer: string }[];
}

export interface HighlightCorrectSummaryQuestion {
  id: string;
  title: string;
  audioTranscript: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation: string;
}

export interface SelectMissingWordQuestion {
  id: string;
  title: string;
  audioTranscript: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation: string;
}

export interface HighlightIncorrectWordsQuestion {
  id: string;
  title: string;
  audioTranscript: string;
  displayedTranscriptTokens: { word: string; isIncorrect: boolean; correctWord?: string }[];
}

export interface WriteFromDictationQuestion {
  id: string;
  sentenceText: string;
  wordCount: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

// Re-export question banks from modular files
export {
  PRACTICE_READ_ALOUD,
  PRACTICE_REPEAT_SENTENCE,
  PRACTICE_DESCRIBE_IMAGE,
  PRACTICE_RETELL_LECTURE,
  PRACTICE_ANSWER_SHORT_QUESTION
} from './questions/speaking';

export {
  PRACTICE_SUMMARIZE_WRITTEN_TEXT,
  PRACTICE_WRITE_ESSAY
} from './questions/writing';

export {
  PRACTICE_FIB_DROPDOWN,
  PRACTICE_MCMA_READING,
  PRACTICE_REORDER_PARAGRAPHS,
  PRACTICE_FIB_DRAG_DROP,
  PRACTICE_MCSA_READING
} from './questions/reading';

export {
  PRACTICE_SUMMARIZE_SPOKEN_TEXT,
  PRACTICE_MCMA_LISTENING,
  PRACTICE_FIB_LISTENING,
  PRACTICE_HIGHLIGHT_CORRECT_SUMMARY,
  PRACTICE_MCSA_LISTENING,
  PRACTICE_SELECT_MISSING_WORD,
  PRACTICE_HIGHLIGHT_INCORRECT_WORDS,
  PRACTICE_WRITE_FROM_DICTATION
} from './questions/listening';

import {
  PRACTICE_READ_ALOUD,
  PRACTICE_REPEAT_SENTENCE,
  PRACTICE_DESCRIBE_IMAGE,
  PRACTICE_RETELL_LECTURE,
  PRACTICE_ANSWER_SHORT_QUESTION
} from './questions/speaking';

import {
  PRACTICE_SUMMARIZE_WRITTEN_TEXT,
  PRACTICE_WRITE_ESSAY
} from './questions/writing';

import {
  PRACTICE_FIB_DROPDOWN,
  PRACTICE_MCMA_READING,
  PRACTICE_REORDER_PARAGRAPHS,
  PRACTICE_FIB_DRAG_DROP,
  PRACTICE_MCSA_READING
} from './questions/reading';

import {
  PRACTICE_SUMMARIZE_SPOKEN_TEXT,
  PRACTICE_MCMA_LISTENING,
  PRACTICE_FIB_LISTENING,
  PRACTICE_HIGHLIGHT_CORRECT_SUMMARY,
  PRACTICE_MCSA_LISTENING,
  PRACTICE_SELECT_MISSING_WORD,
  PRACTICE_HIGHLIGHT_INCORRECT_WORDS,
  PRACTICE_WRITE_FROM_DICTATION
} from './questions/listening';

// Unified 1,000+ PTE Academic Practice Questions Array across 20 Item Types
export const PTEPracticeQuestions = [
  ...PRACTICE_READ_ALOUD.map(q => ({
    ...q,
    type: 'read_aloud',
    section: 'Speaking',
    itemCategory: 'Read Aloud',
    title: q.title || 'Read Aloud Practice',
    instruction: 'Look at the text below. In 35 seconds, you must read this text aloud as naturally and clearly as possible.',
    passage: q.text,
    timeLimitMinutes: 1
  })),
  ...PRACTICE_REPEAT_SENTENCE.map(q => ({
    ...q,
    type: 'repeat_sentence',
    section: 'Speaking',
    itemCategory: 'Repeat Sentence',
    title: 'Repeat Sentence Practice',
    instruction: 'You will hear a sentence. Please repeat the sentence exactly as you hear it.',
    audioScript: q.audioTranscript,
    timeLimitMinutes: 1
  })),
  ...PRACTICE_DESCRIBE_IMAGE.map(q => ({
    ...q,
    type: 'describe_image',
    section: 'Speaking',
    itemCategory: 'Describe Image',
    title: q.title || 'Describe Image Practice',
    instruction: 'Look at the chart below. In 25 seconds, please speak into the microphone and describe in detail what the chart is showing.',
    timeLimitMinutes: 1
  })),
  ...PRACTICE_RETELL_LECTURE.map(q => ({
    ...q,
    type: 'retell_lecture',
    section: 'Speaking',
    itemCategory: 'Re-tell Lecture',
    title: q.title || 'Re-tell Lecture Practice',
    instruction: 'You will hear a lecture. After listening to the lecture, in 10 seconds, please speak into the microphone and retell what you have just heard.',
    lectureScript: q.audioTranscript,
    timeLimitMinutes: 1
  })),
  ...PRACTICE_ANSWER_SHORT_QUESTION.map(q => ({
    ...q,
    type: 'answer_short_question',
    section: 'Speaking',
    itemCategory: 'Answer Short Question',
    title: 'Answer Short Question',
    instruction: 'You will hear a question. Please give a simple and short answer.',
    audioScript: q.questionAudioTranscript,
    answerKey: q.correctAnswer,
    timeLimitMinutes: 1
  })),
  ...PRACTICE_SUMMARIZE_WRITTEN_TEXT.map(q => ({
    ...q,
    type: 'summarize_written_text',
    section: 'Writing',
    itemCategory: 'Summarize Written Text',
    title: q.title || 'Summarize Written Text',
    instruction: 'Read the passage below and summarize it using one sentence (10-75 words).',
    passage: q.passageText,
    timeLimitMinutes: 10
  })),
  ...PRACTICE_WRITE_ESSAY.map(q => ({
    ...q,
    type: 'write_essay',
    section: 'Writing',
    itemCategory: 'Write Essay',
    title: q.title || 'Write Essay',
    instruction: 'You will have 20 minutes to plan, write and revise an essay about the topic below (200-300 words).',
    passage: q.promptText,
    timeLimitMinutes: 20
  })),
  ...PRACTICE_FIB_DROPDOWN.map(q => ({
    ...q,
    type: 'fib_reading_writing',
    section: 'Reading',
    itemCategory: 'FIB (Reading & Writing)',
    title: q.title || 'Fill in the Blanks (R&W)',
    instruction: 'Below is a text with a number of blanks. Click each blank to select the correct word.',
    timeLimitMinutes: 2
  })),
  ...PRACTICE_MCMA_READING.map(q => ({
    ...q,
    type: 'mcma_reading',
    section: 'Reading',
    itemCategory: 'MCMA (Reading)',
    title: q.title || 'Multiple Choice (Multiple Answers)',
    instruction: 'Read the text and answer the question by selecting all correct responses.',
    passage: q.passageOrTranscript,
    timeLimitMinutes: 2
  })),
  ...PRACTICE_REORDER_PARAGRAPHS.map(q => ({
    ...q,
    type: 'reorder_paragraphs',
    section: 'Reading',
    itemCategory: 'Re-order Paragraphs',
    title: q.title || 'Re-order Paragraphs',
    instruction: 'The text boxes below have been placed in random order. Restore the original order.',
    jumbledParagraphs: q.jumbledParagraphs.map(p => p.text),
    correctOrder: q.jumbledParagraphs.map(p => p.text),
    timeLimitMinutes: 2
  })),
  ...PRACTICE_FIB_DRAG_DROP.map(q => ({
    ...q,
    type: 'fib_reading',
    section: 'Reading',
    itemCategory: 'FIB (Reading)',
    title: q.title || 'Fill in the Blanks (Reading)',
    instruction: 'Drag words from the box to fill in the missing blanks in the text.',
    timeLimitMinutes: 2
  })),
  ...PRACTICE_MCSA_READING.map(q => ({
    ...q,
    type: 'mcsa_reading',
    section: 'Reading',
    itemCategory: 'MCSA (Reading)',
    title: q.title || 'Multiple Choice (Single Answer)',
    instruction: 'Read the text and answer the multiple-choice question by selecting the correct response.',
    passage: q.passageOrTranscript,
    timeLimitMinutes: 2
  })),
  ...PRACTICE_SUMMARIZE_SPOKEN_TEXT.map(q => ({
    ...q,
    type: 'summarize_spoken_text',
    section: 'Listening',
    itemCategory: 'Summarize Spoken Text',
    title: q.title || 'Summarize Spoken Text',
    instruction: 'You will hear a short lecture. Write a summary for a fellow student who was not present (50-70 words).',
    timeLimitMinutes: 10
  })),
  ...PRACTICE_MCMA_LISTENING.map(q => ({
    ...q,
    type: 'mcma_listening',
    section: 'Listening',
    itemCategory: 'MCMA (Listening)',
    title: q.title || 'Multiple Choice (Multiple Answers)',
    instruction: 'Listen to the audio and answer the question by selecting all correct responses.',
    audioScript: q.passageOrTranscript,
    timeLimitMinutes: 2
  })),
  ...PRACTICE_FIB_LISTENING.map(q => ({
    ...q,
    type: 'fib_listening',
    section: 'Listening',
    itemCategory: 'FIB (Listening)',
    title: q.title || 'Fill in the Blanks (Listening)',
    instruction: 'You will hear a recording. Type the missing words into each blank.',
    timeLimitMinutes: 2
  })),
  ...PRACTICE_HIGHLIGHT_CORRECT_SUMMARY.map(q => ({
    ...q,
    type: 'highlight_correct_summary',
    section: 'Listening',
    itemCategory: 'Highlight Correct Summary',
    title: q.title || 'Highlight Correct Summary',
    instruction: 'Listen to the recording and select the summary that best matches the audio.',
    audioScript: q.audioTranscript,
    timeLimitMinutes: 2
  })),
  ...PRACTICE_MCSA_LISTENING.map(q => ({
    ...q,
    type: 'mcsa_listening',
    section: 'Listening',
    itemCategory: 'MCSA (Listening)',
    title: q.title || 'Multiple Choice (Single Answer)',
    instruction: 'Listen to the audio and select the best answer.',
    audioScript: q.passageOrTranscript,
    timeLimitMinutes: 2
  })),
  ...PRACTICE_SELECT_MISSING_WORD.map(q => ({
    ...q,
    type: 'select_missing_word',
    section: 'Listening',
    itemCategory: 'Select Missing Word',
    title: q.title || 'Select Missing Word',
    instruction: 'You will hear a recording. Select the option that completes the recording.',
    audioScript: q.audioTranscript,
    timeLimitMinutes: 2
  })),
  ...PRACTICE_HIGHLIGHT_INCORRECT_WORDS.map(q => ({
    ...q,
    type: 'highlight_incorrect_words',
    section: 'Listening',
    itemCategory: 'Highlight Incorrect Words',
    title: q.title || 'Highlight Incorrect Words',
    instruction: 'You will hear a recording. Below is a transcript of the recording. Click on words that differ from what you hear.',
    audioScript: q.audioTranscript,
    displayedText: q.displayedTranscriptTokens.map(t => t.word).join(" "),
    timeLimitMinutes: 2
  })),
  ...PRACTICE_WRITE_FROM_DICTATION.map(q => ({
    ...q,
    type: 'write_from_dictation',
    section: 'Listening',
    itemCategory: 'Write from Dictation',
    title: 'Write from Dictation',
    instruction: 'You will hear a sentence. Type the sentence in the box below exactly as you hear it.',
    audioScript: q.sentenceText,
    timeLimitMinutes: 1
  }))
];
