'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { ArrowLeft, BookOpen, HelpCircle, MessageSquare, Sparkles, CheckCircle2, FileText, Zap, ChevronDown, ChevronUp } from 'lucide-react';

export default function StudentHelpPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [userSession, setUserSession] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('pte_user_session');
        if (saved) setUserSession(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const studentFaqs = [
    {
      q: 'How does the AI evaluate my Speaking responses?',
      a: 'Our AI engine analyzes your recorded audio for Oral Fluency (hesitations, pauses, rhythm) and Pronunciation (phoneme accuracy, stress, clarity) matching Pearson PTE Academic scoring guidelines.',
    },
    {
      q: 'How are my Writing Essays scored?',
      a: 'Essays and Summarize Written Text are evaluated instantly across Content, Form (word count limits), Grammar, Vocabulary, Spelling, and Structure.',
    },
    {
      q: 'Where can I practice full-length 2-hour PTE Mock Exams?',
      a: 'Go to the Mock Tests section on your sidebar menu. You can launch complete 2-hour official exam simulators with realistic countdown timers and detailed 10-90 scorecards.',
    },
    {
      q: 'Can I save notes or vocabulary words while practicing?',
      a: 'Yes! Use the Vocabulary Hub to review high-frequency PTE collocations & words, or open the Notebook section from your sidebar to save practice notes.',
    },
    {
      q: 'What is the recommended target score?',
      a: 'Target scores depend on your visa or university requirements: 50+ (Equivalent to IELTS 6.0), 65+ (IELTS 7.0 for skilled migration), or 79+ (IELTS 8.0 for max migration points).',
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Sidebar
        activeTab="help"
        mobileOpen={mobileSidebarOpen}
        userSession={userSession}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        setActiveTab={(tab) => {
          if (tab !== 'help') {
            window.location.href = '/dashboard';
          }
        }}
      />

      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto">
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 md:px-6 py-3 flex items-center justify-between shadow-xs gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-extrabold text-xs flex items-center gap-2 transition-colors border border-slate-200/60"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Student Portal</span>
            </Link>
          </div>

          <div className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Student Help & User Guide
          </div>
        </header>

        <div className="p-4 md:p-8 flex-1 max-w-5xl space-y-6 pb-20">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight font-satoshi">
              Student Help & Practice Guide
            </h1>
            <p className="text-slate-500 text-xs font-semibold mt-1">
              Everything you need to know about PTE Academic exam preparation, AI scoring, and portal features.
            </p>
          </div>

          {/* Quick Support Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#e8ecf4] rounded-2xl p-6 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mb-1">90-Band Templates</h3>
              <p className="text-xs text-slate-500 font-medium mb-4 leading-relaxed">
                Access proven PTE Academic templates for Describe Image, Retell Lecture, Essay Writing, and Summarize Spoken Text.
              </p>
              <Link href="/dashboard" className="text-xs font-extrabold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                View Templates Hub →
              </Link>
            </div>

            <div className="bg-white border border-[#e8ecf4] rounded-2xl p-6 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mb-1">AI Exam Simulator</h3>
              <p className="text-xs text-slate-500 font-medium mb-4 leading-relaxed">
                Simulate full 2-hour PTE Academic exams with official scoring rubrics and instant GSE score reports.
              </p>
              <Link href="/dashboard" className="text-xs font-extrabold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                Take Mock Exam →
              </Link>
            </div>

            <div className="bg-white border border-[#e8ecf4] rounded-2xl p-6 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-4">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mb-1">24/7 AI Tutor Assistance</h3>
              <p className="text-xs text-slate-500 font-medium mb-4 leading-relaxed">
                Ask your AI Tutor questions about grammar rules, collocations, speaking pronunciation, or exam strategies.
              </p>
              <Link href="/dashboard" className="text-xs font-extrabold text-purple-600 hover:text-purple-700 flex items-center gap-1">
                Chat with AI Tutor →
              </Link>
            </div>
          </div>

          {/* Student Frequently Asked Questions */}
          <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 lg:p-8 shadow-xs">
            <h2 className="text-lg font-extrabold text-slate-900 mb-6 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-600" /> Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {studentFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="border border-slate-200/80 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between font-bold text-xs text-slate-900 hover:bg-slate-50 transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-slate-600 font-medium leading-relaxed bg-slate-50/50 pt-1 border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
