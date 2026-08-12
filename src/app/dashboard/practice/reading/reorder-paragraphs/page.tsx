'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, GripVertical, X, ChevronRight, BookOpen } from 'lucide-react';
import { clsx } from 'clsx';
import { getQuestionsByTaskType } from '../../../../../lib/questions';

interface ParagraphItem {
  id: string;
  text: string;
}

export default function ReorderParagraphs() {
  const questions = getQuestionsByTaskType('Re-order Paragraphs');
  const [currentIdx, setCurrentIdx] = useState(0);

  const question: any = questions[currentIdx] || {
    title: "Development of Artificial Intelligence",
    difficulty: "Medium",
    paragraphs: [
      { id: 'A', text: 'Early computer scientists hypothesized that machine intelligence could simulate human reasoning.' },
      { id: 'B', text: 'This foundational concept led to the development of early algorithmic decision trees.' },
      { id: 'C', text: 'However, computational limitations restricted practical progress for several decades.' },
      { id: 'D', text: 'Today, high-speed neural networks make complex AI applications possible in daily life.' }
    ],
    correctOrder: ['A', 'B', 'C', 'D']
  };

  const paragraphsList: ParagraphItem[] = question.paragraphs || [
    { id: 'A', text: 'Early computer scientists hypothesized that machine intelligence could simulate human reasoning.' },
    { id: 'B', text: 'This foundational concept led to the development of early algorithmic decision trees.' },
    { id: 'C', text: 'However, computational limitations restricted practical progress for several decades.' },
    { id: 'D', text: 'Today, high-speed neural networks make complex AI applications possible in daily life.' }
  ];

  const correctOrderArr: string[] = question.correctOrder || ['A', 'B', 'C', 'D'];

  const [leftItems, setLeftItems] = useState<ParagraphItem[]>(paragraphsList);
  const [rightItems, setRightItems] = useState<ParagraphItem[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const moveToRight = (item: ParagraphItem) => {
    if (submitted) return;
    setLeftItems(prev => prev.filter(i => i.id !== item.id));
    setRightItems(prev => [...prev, item]);
  };

  const moveToLeft = (item: ParagraphItem) => {
    if (submitted) return;
    setRightItems(prev => prev.filter(i => i.id !== item.id));
    setLeftItems(prev => [...prev, item]);
  };

  const handleSubmit = () => {
    let pairScore = 0;
    const targetOrderStr = correctOrderArr.join('');

    for (let i = 0; i < rightItems.length - 1; i++) {
      const pair = rightItems[i].id + rightItems[i + 1].id;
      if (targetOrderStr.includes(pair)) {
        pairScore++;
      }
    }
    setScore(pairScore);
    setSubmitted(true);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      const nextQ: any = questions[nextIdx];
      const nextList: ParagraphItem[] = nextQ?.paragraphs || paragraphsList;
      setLeftItems(nextList);
      setRightItems([]);
      setSubmitted(false);
      setScore(0);
    }
  };

  return (
    <div className="space-y-6 text-slate-900">
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
            onClick={() => {
              setCurrentIdx(idx);
              const targetQ: any = questions[idx];
              const targetList: ParagraphItem[] = targetQ?.paragraphs || paragraphsList;
              setLeftItems(targetList);
              setRightItems([]);
              setSubmitted(false);
              setScore(0);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
              currentIdx === idx
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200/80 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {q.difficulty || 'Medium'} • Set {idx + 1}
          </button>
        ))}
      </div>

      <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 lg:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">{question.title || "Re-order Paragraphs"}</h1>
              <p className="text-slate-500 text-xs font-semibold">Skills assessed: Reading</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Left Panel */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 min-h-[320px]">
            <h3 className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-wider">Source Paragraphs (Click to Move)</h3>
            <div className="space-y-3">
              {leftItems.map((item: ParagraphItem) => (
                <div 
                  key={item.id}
                  onClick={() => moveToRight(item)}
                  className="bg-white hover:bg-indigo-50/50 border border-slate-200 rounded-xl p-4 flex gap-3 cursor-pointer transition-colors shadow-2xs select-none"
                >
                  <GripVertical className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-xs font-semibold text-slate-800 leading-relaxed">{item.text}</p>
                </div>
              ))}
              {leftItems.length === 0 && (
                <div className="text-center text-slate-400 py-12 text-xs font-bold">
                  All paragraphs moved to target order!
                </div>
              )}
            </div>
          </div>

          {/* Right Panel */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 min-h-[320px]">
            <h3 className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-wider">Target Order</h3>
            <div className="space-y-3">
              {rightItems.length === 0 && (
                <div className="text-center text-slate-400 py-14 border-2 border-dashed border-slate-200 rounded-xl text-xs font-bold">
                  Click or drag paragraphs here in correct logical order
                </div>
              )}
              {rightItems.map((item: ParagraphItem, idx: number) => (
                <div 
                  key={item.id}
                  className="bg-white border border-indigo-200 rounded-xl p-4 flex gap-3 relative group shadow-2xs"
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded bg-indigo-50 text-indigo-600 text-xs font-mono font-black shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-xs font-semibold text-slate-800 leading-relaxed">{item.text}</p>
                  {!submitted && (
                    <button 
                      onClick={() => moveToLeft(item)}
                      className="absolute top-2 right-2 p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {submitted && (
          <div className="mb-6 p-6 rounded-2xl border border-indigo-100 bg-indigo-50/60">
            <h3 className="text-base font-extrabold text-slate-900 mb-2">Score: <span className="text-indigo-600 font-mono font-black text-xl">{score}</span> / {correctOrderArr.length - 1}</h3>
            <p className="text-xs font-semibold text-slate-500 mb-3">You receive 1 point for each correct adjacent paragraph pair.</p>
            <div className="text-xs font-bold bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-slate-500">Correct Logical Sequence: </span>
              <span className="text-emerald-600">{correctOrderArr.join(' → ')}</span>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          {!submitted ? (
            <button 
              onClick={handleSubmit}
              disabled={rightItems.length !== paragraphsList.length}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-sm transition-all"
            >
              Submit Answer
            </button>
          ) : (
            <button 
              onClick={handleNext}
              disabled={currentIdx === questions.length - 1}
              className="bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              Next Question <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
