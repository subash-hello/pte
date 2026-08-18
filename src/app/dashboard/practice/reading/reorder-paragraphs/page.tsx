'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, ChevronRight, BookOpen, ArrowUp, ArrowDown, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';
import { getQuestionsByTaskType, PTEQuestion } from '../../../../../lib/questions';

interface ParagraphItem {
  id: string;
  text: string;
}

export default function ReorderParagraphs() {
  const questions = getQuestionsByTaskType('Re-order Paragraphs');
  const [currentIdx, setCurrentIdx] = useState(0);

  const question: any = questions[currentIdx] || {
    title: "Discovery of Penicillin",
    difficulty: "Medium",
    jumbledParagraphs: [
      { id: 'p1', text: 'However, it was not until a decade later that Howard Florey and Ernst Chain successfully isolated the pure compound.' },
      { id: 'p2', text: 'In 1928, Alexander Fleming made a chance discovery in his laboratory when he noticed mold inhibiting bacterial growth.' },
      { id: 'p3', text: 'This miraculous discovery marked the dawn of modern antibiotic therapy, saving millions of lives during World War II.' },
      { id: 'p4', text: 'Fleming identified this antibacterial substance as penicillin, produced by Penicillium notatum mold colonies.' }
    ],
    correctSequenceIds: ['p2', 'p4', 'p1', 'p3'],
    explanation: 'p2 introduces Fleming in 1928. p4 elaborates on what Fleming identified. p1 introduces the decade gap. p3 concludes.'
  };

  const getParagraphs = (q: any): ParagraphItem[] => {
    const rawList = q?.rawDetails?.jumbledParagraphs || q?.jumbledParagraphs || q?.options || q?.paragraphs || [];
    if (Array.isArray(rawList)) {
      return rawList.map((item: any, i: number) => {
        if (typeof item === 'string') {
          return { id: `p${i + 1}`, text: item };
        }
        return { id: item.id || `p${i + 1}`, text: item.text || String(item) };
      });
    }
    return [];
  };

  const [orderedItems, setOrderedItems] = useState<ParagraphItem[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setOrderedItems(getParagraphs(question));
    setSubmitted(false);
    setScore(0);
  }, [currentIdx]);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (submitted) return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= orderedItems.length) return;
    const next = [...orderedItems];
    const temp = next[index];
    next[index] = next[targetIdx];
    next[targetIdx] = temp;
    setOrderedItems(next);
  };

  const handleSubmit = () => {
    const correctSeq = question.rawDetails?.correctSequenceIds || question.correctSequenceIds || question.correctOrder || [];
    let pairScore = 0;
    const currentSeq = orderedItems.map(i => i.id);

    // Score based on adjacent correct pairs
    for (let i = 0; i < currentSeq.length - 1; i++) {
      const pair = `${currentSeq[i]}-${currentSeq[i + 1]}`;
      const correctPairs: string[] = question.rawDetails?.correctPairs || question.correctPairs || [];
      if (correctPairs.includes(pair)) {
        pairScore++;
      } else if (correctSeq.length > 0) {
        // Fallback pair check by sequence
        const cIdx1 = correctSeq.indexOf(currentSeq[i]);
        const cIdx2 = correctSeq.indexOf(currentSeq[i + 1]);
        if (cIdx1 !== -1 && cIdx2 === cIdx1 + 1) {
          pairScore++;
        }
      }
    }

    setScore(pairScore);
    setSubmitted(true);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const totalPossiblePairs = Math.max(1, orderedItems.length - 1);

  return (
    <div className="space-y-6 text-slate-900 font-sans">
      <div className="flex items-center justify-between">
        <Link href="/dashboard/practice/reading" className="p-2.5 bg-white hover:bg-slate-50 rounded-xl transition-colors border border-slate-200/80 shadow-2xs text-slate-700 font-bold text-xs flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Reading Hub
        </Link>
        <div className="flex items-center gap-2 text-indigo-600 font-mono font-bold text-sm bg-indigo-50 px-3.5 py-1.5 rounded-xl border border-indigo-100 shadow-2xs">
          <Clock className="w-4 h-4 text-indigo-600" /> 02:00
        </div>
      </div>

      {/* Question Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {questions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIdx(idx)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
              currentIdx === idx
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200/80 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            Item #{idx + 1}
          </button>
        ))}
      </div>

      <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 lg:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">{question.title || "Re-order Paragraphs"}</h1>
              <p className="text-slate-500 text-xs font-semibold">Use the ▲ and ▼ arrow buttons to arrange the paragraphs in the correct chronological or logical order.</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold border border-indigo-100 uppercase tracking-wider">
            Re-order Paragraphs
          </span>
        </div>

        <div className="space-y-3 mb-8">
          {orderedItems.map((para, idx) => (
            <div
              key={para.id}
              className="flex items-center gap-3.5 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 shadow-2xs hover:border-indigo-300 transition-colors"
            >
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => moveItem(idx, 'up')}
                  disabled={idx === 0 || submitted}
                  className="p-1 rounded bg-white hover:bg-slate-200 text-slate-600 disabled:opacity-25 shadow-2xs border border-slate-200 cursor-pointer"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(idx, 'down')}
                  disabled={idx === orderedItems.length - 1 || submitted}
                  className="p-1 rounded bg-white hover:bg-slate-200 text-slate-600 disabled:opacity-25 shadow-2xs border border-slate-200 cursor-pointer"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <span className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black font-mono shrink-0 shadow-2xs">
                {idx + 1}
              </span>

              <p className="flex-1 text-xs leading-relaxed font-medium">{para.text}</p>
            </div>
          ))}
        </div>

        {submitted && (
          <div className="mb-6 p-6 rounded-2xl border border-indigo-100 bg-indigo-50/60 space-y-3">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              Pair Score: <span className="text-indigo-600 font-mono font-black text-xl">{score} / {totalPossiblePairs}</span>
            </h3>
            {question.explanation && (
              <div className="pt-3 border-t border-indigo-200/60 text-xs text-indigo-950 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-medium">{question.explanation}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-500 font-mono">
            Question {currentIdx + 1} of {questions.length}
          </div>
          <div className="flex gap-4">
            {!submitted ? (
              <button 
                onClick={handleSubmit}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-sm transition-all cursor-pointer"
              >
                Submit Sequence
              </button>
            ) : (
              <button 
                onClick={handleNext}
                disabled={currentIdx === questions.length - 1}
                className="bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                Next Question <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
