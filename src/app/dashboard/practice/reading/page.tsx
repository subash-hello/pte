'use client';

import React, { useState } from 'react';
import { BookOpen, Star, BarChart3, Award, ChevronDown, Clock, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

export default function ReadingPracticePage() {
  const [activeMode, setActiveMode] = useState<'academic' | 'general'>('academic');
  const [activeTab, setActiveTab] = useState('passages');
  const [selectedSet, setSelectedSet] = useState(10);
  const [openAccordion, setOpenAccordion] = useState<number | null>(1);

  const pteSets = [
    { id: 10, name: 'PTE Set 10', label: '4 Academic Tests', color: 'bg-purple-600 text-white' },
    { id: 11, name: 'PTE Set 11', label: '4 Academic Tests', color: 'bg-indigo-600 text-white' },
    { id: 12, name: 'PTE Set 12', label: '4 Academic Tests', color: 'bg-sky-600 text-white' },
    { id: 13, name: 'PTE Set 13', label: '4 Academic Tests', color: 'bg-emerald-600 text-white' },
    { id: 14, name: 'PTE Set 14', label: '4 Academic Tests', color: 'bg-green-600 text-white' },
    { id: 15, name: 'PTE Set 15', label: '4 Academic Tests', color: 'bg-amber-600 text-white' },
    { id: 16, name: 'PTE Set 16', label: '4 Academic Tests', color: 'bg-rose-600 text-white' },
    { id: 17, name: 'PTE Set 17', label: '4 Academic Tests', color: 'bg-pink-600 text-white' },
    { id: 18, name: 'PTE Set 18', label: '4 Academic Tests', color: 'bg-purple-700 text-white' },
    { id: 99, name: 'General Practice', label: 'Standalone Tasks', color: 'bg-teal-600 text-white' },
  ];

  const testsList = [
    { id: 1, title: 'Academic Test 1', passages: 3, questions: 20, duration: '30 min', badge: null, difficulty: 'HARD', href: '/dashboard/practice/reading/rw-fill-blanks' },
    { id: 2, title: 'Academic Test 2', passages: 3, questions: 20, duration: '30 min', badge: '3/8 Done', difficulty: 'HARD', href: '/dashboard/practice/reading/reorder-paragraphs' },
    { id: 3, title: 'Academic Test 3', passages: 3, questions: 20, duration: '30 min', badge: null, difficulty: 'HARD', href: '/dashboard/practice/reading/reading-fill-blanks' },
    { id: 4, title: 'Academic Test 4', passages: 3, questions: 20, duration: '30 min', badge: null, difficulty: 'HARD', href: '/dashboard/practice/reading/mcq-multiple' },
  ];

  return (
    <div className="space-y-6 text-slate-900">
      {/* Header with Academic/General Mode Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-2xl text-indigo-600 shadow-2xs">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Reading Practice</h1>
            <p className="text-slate-500 text-xs font-semibold mt-0.5">Master PTE Academic & General Reading with real-time feedback</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-200/60 p-1 rounded-xl shrink-0 self-start md:self-auto">
          <button 
            onClick={() => setActiveMode('academic')}
            className={clsx(
              "px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all",
              activeMode === 'academic' ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            )}
          >
            Academic Mode
          </button>
          <button 
            onClick={() => setActiveMode('general')}
            className={clsx(
              "px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all",
              activeMode === 'general' ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            )}
          >
            General Mode
          </button>
        </div>
      </div>

      {/* 3 Stat Cards Row matching screenshot 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 shadow-xs text-center">
          <Star className="w-5 h-5 text-indigo-600 mx-auto mb-2" />
          <div className="text-2xl font-mono font-black text-slate-900">10 / 40</div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">AVG SCORE</div>
        </div>
        <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 shadow-xs text-center">
          <BarChart3 className="w-5 h-5 text-indigo-600 mx-auto mb-2" />
          <div className="text-2xl font-mono font-black text-slate-900">18 Tests</div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">COMPLETED</div>
        </div>
        <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 shadow-xs text-center">
          <Award className="w-5 h-5 text-emerald-600 mx-auto mb-2" />
          <div className="text-2xl font-mono font-black text-emerald-600">79.0</div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">CURRENT SCORE</div>
        </div>
      </div>

      {/* Sub Navigation Bar matching screenshot 1 */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/80 pb-4">
        {[
          { id: 'passages', label: 'Practice Passages' },
          { id: 'format', label: 'Test Format' },
          { id: 'types', label: 'Question Types (5)' },
          { id: 'strategy', label: 'Strategy & Skills' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
              activeTab === tab.id 
                ? "bg-indigo-50 border-indigo-200 text-indigo-600 shadow-2xs font-extrabold" 
                : "bg-white border-slate-200/80 text-slate-600 hover:bg-slate-50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* PTE Volume/Set Grid Pills matching screenshot 1 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {pteSets.map(set => (
          <button
            key={set.id}
            onClick={() => setSelectedSet(set.id)}
            className={clsx(
              "p-3 rounded-2xl border text-left transition-all flex items-center gap-3",
              selectedSet === set.id
                ? "bg-[#eceffe] border-indigo-300 shadow-xs ring-2 ring-indigo-500/20"
                : "bg-white border-[#e8ecf4] hover:bg-slate-50"
            )}
          >
            <div className={clsx("w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 shadow-xs", set.color)}>
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-extrabold text-slate-900 truncate">{set.name}</h4>
              <p className="text-[10px] font-semibold text-slate-500 truncate">{set.label}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Accordion Container matching screenshot 1 */}
      <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900">PTE Academic Set {selectedSet}</h2>
            <p className="text-xs font-semibold text-slate-500">4 Tests • 12 Passages • Academic Reading</p>
          </div>
        </div>

        <div className="space-y-3">
          {testsList.map(test => (
            <div 
              key={test.id} 
              className="border border-slate-200/80 rounded-2xl p-4 transition-all hover:bg-slate-50/80"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center text-xs font-mono font-black text-slate-700 shrink-0">
                    T{test.id}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-sm font-extrabold text-slate-900">{test.title}</h3>
                      {test.badge && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100">
                          {test.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 mt-1">
                      <span>📄 {test.passages} Passages</span>
                      <span>❓ {test.questions} Qs</span>
                      <span>⏱️ {test.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-100">
                    {test.difficulty}
                  </span>
                  <Link 
                    href={test.href}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
                  >
                    Start Test <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
