/**
 * PTE Academic Authentic 30 Full Mock Exam Collection & Assembly
 */

import { PTEPracticeQuestions } from './practice-questions';

export interface MockTestSection {
  sectionName: string;
  estimatedDurationMinutes: number;
  timerMode: string;
  items: {
    itemType: string;
    code: string;
    itemCount: number;
    timerRule: string;
    questionData: any[];
  }[];
}

export interface PTEMockTest {
  id: string;
  testTitle: string;
  version: string;
  totalDurationMinutes: number;
  totalScoredItemTypes: number;
  sections: MockTestSection[];
}

// Helper to filter fully formatted practice questions by item type with offset
const getFormattedItems = (type: string, count: number, offset: number = 0) => {
  const matches = PTEPracticeQuestions.filter((q) => q.type === type);
  if (matches.length === 0) return [];
  
  const result = [];
  for (let i = 0; i < count; i++) {
    const idx = (offset + i) % matches.length;
    result.push({
      ...matches[idx],
      id: `${matches[idx].id}_m${offset + 1}`
    });
  }
  return result;
};

export const createMockTest = (testNumber: number): PTEMockTest => {
  const offset = (testNumber - 1) * 3;
  const numStr = testNumber.toString().padStart(2, '0');

  return {
    id: `pte_mock_test_${numStr}`,
    testTitle: `PTE Academic Full Practice Mock Exam ${testNumber}`,
    version: '2026.1 Official 2-Hour Exam Paper',
    totalDurationMinutes: 120,
    totalScoredItemTypes: 20,
    sections: [
      {
        sectionName: 'Speaking & Writing',
        estimatedDurationMinutes: 54,
        timerMode: 'Mixed',
        items: [
          {
            itemType: 'Read Aloud',
            code: 'RA',
            itemCount: 6,
            timerRule: '35-40s prep, 35-40s recording per item',
            questionData: getFormattedItems('read_aloud', 6, offset)
          },
          {
            itemType: 'Repeat Sentence',
            code: 'RS',
            itemCount: 10,
            timerRule: '3-5s audio, 15s recording window',
            questionData: getFormattedItems('repeat_sentence', 10, offset)
          },
          {
            itemType: 'Describe Image',
            code: 'DI',
            itemCount: 4,
            timerRule: '25s prep, 40s recording per item',
            questionData: getFormattedItems('describe_image', 4, offset)
          },
          {
            itemType: 'Re-tell Lecture',
            code: 'RL',
            itemCount: 2,
            timerRule: '60-90s audio, 10s prep, 40s recording',
            questionData: getFormattedItems('retell_lecture', 2, offset)
          },
          {
            itemType: 'Answer Short Question',
            code: 'ASQ',
            itemCount: 6,
            timerRule: '3-9s audio, 10s recording window',
            questionData: getFormattedItems('answer_short_question', 6, offset)
          },
          {
            itemType: 'Summarize Written Text',
            code: 'SWT',
            itemCount: 1,
            timerRule: 'Strict 10:00 dedicated item timer',
            questionData: getFormattedItems('summarize_written_text', 1, offset)
          },
          {
            itemType: 'Write Essay',
            code: 'WE',
            itemCount: 1,
            timerRule: 'Strict 20:00 dedicated item timer',
            questionData: getFormattedItems('write_essay', 1, offset)
          }
        ]
      },
      {
        sectionName: 'Reading',
        estimatedDurationMinutes: 30,
        timerMode: 'Section Countdown Pool',
        items: [
          {
            itemType: 'Fill in the Blanks (Reading & Writing)',
            code: 'FIB-RW',
            itemCount: 5,
            timerRule: 'Shared Section Timer (~2.5 mins per item)',
            questionData: getFormattedItems('fib_reading_writing', 5, offset)
          },
          {
            itemType: 'Multiple Choice, Multiple Answers (Reading)',
            code: 'MCMA-R',
            itemCount: 2,
            timerRule: 'Shared Section Timer (~1.5 mins per item)',
            questionData: getFormattedItems('mcma_reading', 2, offset)
          },
          {
            itemType: 'Re-order Paragraphs',
            code: 'ROP',
            itemCount: 2,
            timerRule: 'Shared Section Timer (~2 mins per item)',
            questionData: getFormattedItems('reorder_paragraphs', 2, offset)
          },
          {
            itemType: 'Fill in the Blanks (Reading)',
            code: 'FIB-R',
            itemCount: 4,
            timerRule: 'Shared Section Timer (~1.5 mins per item)',
            questionData: getFormattedItems('fib_reading', 4, offset)
          },
          {
            itemType: 'Multiple Choice, Single Answer (Reading)',
            code: 'MCSA-R',
            itemCount: 2,
            timerRule: 'Shared Section Timer (~1 min per item)',
            questionData: getFormattedItems('mcsa_reading', 2, offset)
          }
        ]
      },
      {
        sectionName: 'Listening',
        estimatedDurationMinutes: 36,
        timerMode: 'Mixed',
        items: [
          {
            itemType: 'Summarize Spoken Text',
            code: 'SST',
            itemCount: 1,
            timerRule: 'Strict 10:00 dedicated item timer including audio',
            questionData: getFormattedItems('summarize_spoken_text', 1, offset)
          },
          {
            itemType: 'Multiple Choice, Multiple Answers (Listening)',
            code: 'MCMA-L',
            itemCount: 2,
            timerRule: 'Shared Section Timer (~1.5 mins per item)',
            questionData: getFormattedItems('mcma_listening', 2, offset)
          },
          {
            itemType: 'Fill in the Blanks (Listening)',
            code: 'FIB-L',
            itemCount: 3,
            timerRule: 'Shared Section Timer (~2 mins per item)',
            questionData: getFormattedItems('fib_listening', 3, offset)
          },
          {
            itemType: 'Highlight Correct Summary',
            code: 'HCS',
            itemCount: 2,
            timerRule: 'Shared Section Timer (~2 mins per item)',
            questionData: getFormattedItems('highlight_correct_summary', 2, offset)
          },
          {
            itemType: 'Multiple Choice, Single Answer (Listening)',
            code: 'MCSA-L',
            itemCount: 2,
            timerRule: 'Shared Section Timer (~1 min per item)',
            questionData: getFormattedItems('mcsa_listening', 2, offset)
          },
          {
            itemType: 'Select Missing Word',
            code: 'SMW',
            itemCount: 2,
            timerRule: 'Shared Section Timer (~1 min per item)',
            questionData: getFormattedItems('select_missing_word', 2, offset)
          },
          {
            itemType: 'Highlight Incorrect Words',
            code: 'HIW',
            itemCount: 3,
            timerRule: 'Shared Section Timer (~2 mins per item)',
            questionData: getFormattedItems('highlight_incorrect_words', 3, offset)
          },
          {
            itemType: 'Write from Dictation',
            code: 'WFD',
            itemCount: 4,
            timerRule: 'Shared Section Timer (~1 min per item)',
            questionData: getFormattedItems('write_from_dictation', 4, offset)
          }
        ]
      }
    ]
  };
};

export const PTE_MOCK_TEST_1 = createMockTest(1);
export const PTE_MOCK_TEST_2 = createMockTest(2);

// Collection of 30 Full Mock Exam Papers
export const MOCK_TESTS_COLLECTION: PTEMockTest[] = Array.from({ length: 30 }, (_, i) => createMockTest(i + 1));
