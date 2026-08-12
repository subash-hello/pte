'use client';

import React from 'react';
import { PenTool, ArrowRight, BookOpen, Clock } from 'lucide-react';
import Link from 'next/link';

const WRITING_MODULES = [
  { id: 1, title: 'Summarize Written Text', desc: 'Read an academic passage (150-300 words) and write a single-sentence summary (5-75 words) in 10 minutes.', questions: '35+ Sets', duration: '10 mins', href: '/dashboard/practice/writing/summarize-written-text', color: 'bg-indigo-600' },
  { id: 2, title: 'Write Essay', desc: 'Write a 200-300 word persuasive or argumentative essay on a given academic prompt in 20 minutes.', questions: '25+ Sets', duration: '20 mins', href: '/dashboard/practice/writing/write-essay', color: 'bg-purple-600' },
];

export default function WritingPracticePage() {
  return (
    <div className="space-y-6 text-slate-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-2xl text-indigo-600 shadow-2xs">
            <PenTool className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Writing Practice</h1>
            <p className="text-slate-500 text-xs font-semibold mt-0.5">Master PTE Academic Writing with real-time grammar & form evaluation</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {WRITING_MODULES.map(mod => (
          <div 
            key={mod.id}
            className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 lg:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0 ${mod.color}`}>
                  <PenTool className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-600 border border-indigo-100">
                  {mod.questions}
                </span>
              </div>

              <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                {mod.title}
              </h3>

              <p className="text-slate-500 text-xs font-medium leading-relaxed mb-6">
                {mod.desc}
              </p>

              <div className="text-xs font-bold text-slate-500 mb-6 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" /> Time Limit: {mod.duration}
              </div>
            </div>

            <Link 
              href={mod.href}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm text-xs tracking-wide"
            >
              Start Practice <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
