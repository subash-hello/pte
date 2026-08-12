'use client';

import React from 'react';
import { Mic, ArrowRight, Play, Award, Star, Activity } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

const SPEAKING_MODULES = [
  { id: 1, title: 'Read Aloud', desc: 'Read a short academic text out loud with natural rhythm and pronunciation.', questions: '40+ Sets', duration: '35s prep • 40s record', href: '/dashboard/practice/speaking/read-aloud', color: 'bg-purple-600' },
  { id: 2, title: 'Repeat Sentence', desc: 'Listen to a spoken sentence and repeat it exactly as heard.', questions: '50+ Sets', duration: '15s record', href: '/dashboard/practice/speaking/repeat-sentence', color: 'bg-indigo-600' },
  { id: 3, title: 'Describe Image', desc: 'Study a chart, graph, or diagram and describe its key features.', questions: '30+ Sets', duration: '25s prep • 40s record', href: '/dashboard/practice/speaking/describe-image', color: 'bg-sky-600' },
  { id: 4, title: 'Re-tell Lecture', desc: 'Listen to an academic lecture excerpt and summarize it in your own words.', questions: '25+ Sets', duration: '10s prep • 40s record', href: '/dashboard/practice/speaking/retell-lecture', color: 'bg-emerald-600' },
  { id: 5, title: 'Answer Short Question', desc: 'Listen to a general knowledge question and give a brief 1-word response.', questions: '60+ Sets', duration: '10s record', href: '/dashboard/practice/speaking/answer-short-question', color: 'bg-amber-600' },
  { id: 6, title: 'Group Discussion (NEW)', desc: 'Listen to multiple speakers in a group discussion and summarize key viewpoints.', questions: '15+ Sets', duration: '10s prep • 120s record', href: '/dashboard/practice/speaking/summarize-group-discussion', color: 'bg-rose-600' },
  { id: 7, title: 'Respond to Situation (NEW)', desc: 'Listen to a workplace or social scenario and provide a natural spoken response.', questions: '15+ Sets', duration: '10s prep • 40s record', href: '/dashboard/practice/speaking/respond-to-situation', color: 'bg-pink-600' },
];

export default function SpeakingPracticePage() {
  return (
    <div className="space-y-6 text-slate-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-50 border border-purple-100 rounded-2xl text-purple-600 shadow-2xs">
            <Mic className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Speaking Practice</h1>
            <p className="text-slate-500 text-xs font-semibold mt-0.5">Master PTE Academic Speaking with real-time AI voice feedback</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SPEAKING_MODULES.map(mod => (
          <div 
            key={mod.id}
            className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={clsx("w-10 h-10 rounded-2xl text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0", mod.color)}>
                  <Mic className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-600 border border-purple-100">
                  {mod.questions}
                </span>
              </div>

              <h3 className="text-base font-extrabold text-slate-900 mb-2">
                {mod.title}
              </h3>

              <p className="text-slate-500 text-xs font-medium leading-relaxed mb-4">
                {mod.desc}
              </p>

              <div className="text-[11px] font-bold text-slate-400 mb-6">
                ⏱️ {mod.duration}
              </div>
            </div>

            <Link 
              href={mod.href}
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
