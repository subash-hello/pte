'use client';

import React from 'react';
import { Headphones, Clock, ArrowRight, Activity, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

const LISTENING_TESTS = [
  { id: 1, title: 'PTE Academic Listening Test 1', difficulty: 'Medium', parts: '4 Parts', questions: 40, duration: '30 min', color: 'bg-purple-600 text-white', href: '/dashboard/practice/listening/summarize-spoken-text' },
  { id: 2, title: 'PTE Academic Listening Test 2', difficulty: 'Medium', parts: '4 Parts', questions: 40, duration: '30 min', color: 'bg-sky-600 text-white', href: '/dashboard/practice/listening/fill-blanks' },
  { id: 3, title: 'PTE Academic Listening Test 3', difficulty: 'Medium', parts: '4 Parts', questions: 40, duration: '30 min', color: 'bg-emerald-600 text-white', href: '/dashboard/practice/listening/highlight-correct-summary' },
  { id: 4, title: 'PTE Academic Listening Test 4', difficulty: 'Medium', parts: '4 Parts', questions: 40, duration: '30 min', color: 'bg-pink-600 text-white', href: '/dashboard/practice/listening/write-from-dictation' },
  { id: 5, title: 'PTE Academic Listening Test 5', difficulty: 'Medium', parts: '4 Parts', questions: 40, duration: '30 min', color: 'bg-indigo-600 text-white', href: '/dashboard/practice/listening/mcq-multiple' },
  { id: 6, title: 'PTE Academic Listening Test 6', difficulty: 'Hard', parts: '4 Parts', questions: 40, duration: '30 min', color: 'bg-rose-600 text-white', href: '/dashboard/practice/listening/select-missing-word' },
  { id: 7, title: 'PTE Academic Listening Test 7', difficulty: 'Hard', parts: '4 Parts', questions: 40, duration: '30 min', color: 'bg-amber-600 text-white', href: '/dashboard/practice/listening/highlight-incorrect-words' },
  { id: 8, title: 'PTE Academic Listening Test 8', difficulty: 'Hard', parts: '4 Parts', questions: 40, duration: '30 min', color: 'bg-teal-600 text-white', href: '/dashboard/practice/listening/mcq-single' }
];

export default function ListeningPracticePage() {
  return (
    <div className="space-y-6 text-slate-900">
      {/* Header matching screenshot 2 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-sky-50 border border-sky-100 rounded-2xl text-sky-600 shadow-2xs">
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Listening Practice</h1>
            <p className="text-slate-500 text-xs font-semibold mt-0.5">Master PTE Academic Listening with real-time feedback</p>
          </div>
        </div>
      </div>

      {/* 2-Column Grid Layout matching screenshot 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {LISTENING_TESTS.map(test => (
          <div 
            key={test.id} 
            className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={clsx("w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs shadow-xs shrink-0", test.color)}>
                  <Headphones className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-100">
                    {test.difficulty}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                    {test.parts}
                  </span>
                </div>
              </div>

              <h3 className="text-base font-extrabold text-slate-900 mb-2">
                {test.title}
              </h3>

              <div className="flex items-center gap-3 text-xs font-bold text-indigo-600 mb-2">
                <span>{test.questions} questions</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">~{test.duration}</span>
              </div>

              <p className="text-slate-500 text-xs font-medium leading-relaxed mb-6">
                Official PTE Listening Test format with 4 parts and diverse question types.
              </p>
            </div>

            <Link 
              href={test.href}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm text-xs tracking-wide"
            >
              Start Practice <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
