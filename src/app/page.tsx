'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  Brain, Target, Zap, Mic, BookOpen, Headphones, Edit3, 
  ArrowRight, Plus, Minus, Star, ShieldCheck, Check, Sparkles, 
  MessageCircle, Code2, Cpu, Award
} from 'lucide-react';
import { clsx } from 'clsx';
import Link from 'next/link';

type ModuleTab = 'speaking' | 'writing' | 'reading' | 'listening';

const PRICING_PLANS = [
  { id: '7d', duration: '7 days', label: 'Weekly Starter', price: 'Rs. 299', perDay: 'Rs. 43/day', popular: false, features: ['Full access for 7 days', 'All 20 PTE question types', 'Unlimited AI Speech & Writing scoring', '5 Full-Length Timed Mock Tests', 'Instant GSE 10–90 Scorecards'] },
  { id: '15d', duration: '15 days', label: '15-Day Sprint', price: 'Rs. 599', perDay: 'Rs. 40/day', popular: false, features: ['Full access for 15 days', 'All 20 PTE question types', 'Unlimited AI Speech & Writing scoring', '12 Full-Length Timed Mock Tests', '90-Band Essay & Speaking Templates'] },
  { id: '30d', duration: '1 month', label: 'Monthly Pro', price: 'Rs. 999', perDay: 'Rs. 33/day', popular: true, features: ['Full access for 30 days', 'All 20 PTE question types (1,050+ items)', 'Unlimited AI Speech & Writing scoring', '30 Full-Length Timed Mock Tests', '90-Band Templates + Study Plan', 'Priority WhatsApp Support'] },
  { id: '45d', duration: '45 days', label: '45-Day Intensive', price: 'Rs. 1,299', perDay: 'Rs. 29/day', popular: false, features: ['Full access for 45 days', 'Everything in Monthly Pro', 'Deep Phoneme & Fluency Diagnostics', 'Downloadable PDF Scorecards', '1-on-1 WhatsApp Score Review'] },
  { id: '60d', duration: '2 months', label: '2-Month Mastery', price: 'Rs. 1,799', perDay: 'Rs. 30/day', popular: false, features: ['Full access for 60 days', 'Everything in 45-Day Intensive', 'Complete Exam Prediction Bank', 'Unlimited Diagnostic Retakes', 'Dedicated Consultancy Tracking'] },
  { id: '90d', duration: '3 months', label: '3-Month Complete', price: 'Rs. 2,500', perDay: 'Rs. 28/day', popular: false, features: ['Full access for 90 days', 'Complete 90-Day Guarantee Pack', 'All Mock Exams + Prediction Updates', 'Full Mentor WhatsApp Guidance', 'Best Value for First-Time Test Takers'] },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<ModuleTab>('speaking');
  const [selectedPlanIdx, setSelectedPlanIdx] = useState<number>(2); // Default 1 month Rs. 999
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const modulesData: Record<ModuleTab, Array<{ title: string; icon: any; href: string; count: string }>> = {
    speaking: [
      { title: 'Read Aloud (RA)', icon: Mic, href: '/dashboard?tab=speaking', count: '50 Items' },
      { title: 'Repeat Sentence (RS)', icon: Mic, href: '/dashboard?tab=speaking', count: '50 Items' },
      { title: 'Describe Image (DI)', icon: Mic, href: '/dashboard?tab=speaking', count: '50 Items' },
      { title: 'Re-tell Lecture (RL)', icon: Mic, href: '/dashboard?tab=speaking', count: '50 Items' },
      { title: 'Answer Short Question (ASQ)', icon: Mic, href: '/dashboard?tab=speaking', count: '50 Items' },
    ],
    writing: [
      { title: 'Summarize Written Text (SWT)', icon: Edit3, href: '/dashboard?tab=writing', count: '50 Items' },
      { title: 'Write Essay (WE)', icon: Edit3, href: '/dashboard?tab=writing', count: '50 Items' },
    ],
    reading: [
      { title: 'Reading & Writing: Fill in the Blanks', icon: BookOpen, href: '/dashboard?tab=reading', count: '50 Items' },
      { title: 'Multiple Choice, Multiple Answers', icon: BookOpen, href: '/dashboard?tab=reading', count: '50 Items' },
      { title: 'Re-order Paragraphs (ROP)', icon: BookOpen, href: '/dashboard?tab=reading', count: '50 Items' },
      { title: 'Reading: Fill in the Blanks', icon: BookOpen, href: '/dashboard?tab=reading', count: '50 Items' },
      { title: 'Multiple Choice, Single Answer', icon: BookOpen, href: '/dashboard?tab=reading', count: '50 Items' },
    ],
    listening: [
      { title: 'Summarize Spoken Text (SST)', icon: Headphones, href: '/dashboard?tab=listening', count: '50 Items' },
      { title: 'Multiple Choice, Multiple Answers', icon: Headphones, href: '/dashboard?tab=listening', count: '50 Items' },
      { title: 'Fill in the Blanks (Listening)', icon: Headphones, href: '/dashboard?tab=listening', count: '50 Items' },
      { title: 'Highlight Correct Summary', icon: Headphones, href: '/dashboard?tab=listening', count: '50 Items' },
      { title: 'Select Missing Word', icon: Headphones, href: '/dashboard?tab=listening', count: '50 Items' },
      { title: 'Highlight Incorrect Words', icon: Headphones, href: '/dashboard?tab=listening', count: '50 Items' },
      { title: 'Write from Dictation (WFD)', icon: Headphones, href: '/dashboard?tab=listening', count: '50 Items' },
    ],
  };

  const verifiedResults = [
    { name: 'Pratima Thapa', overall: 89, s: 90, w: 87, r: 88, l: 90, center: 'Kathmandu Central', quote: 'The AI speech fluency & pronunciation feedback helped me jump from 71 to 89 overall in 3 weeks!' },
    { name: 'Sanjiv Maharjan', overall: 90, s: 90, w: 88, r: 89, l: 90, center: 'Lalitpur Tech Branch', quote: 'Write From Dictation and Read Aloud predictions were spot on. Scored 90 superior on my first attempt!' },
    { name: 'Bikash Shrestha', overall: 84, s: 86, w: 81, r: 83, l: 86, center: 'Pokhara Regional', quote: 'Practiced with the 1-month Rs. 999 plan. The instant essay rubric grading saved me thousands in tuition.' },
  ];

  const faqs = [
    { q: 'How does Master PTE AI score Speaking and Writing?', a: 'Our AI engine is calibrated to Pearson GSE (10–90) standards, evaluating Content, Oral Fluency, Pronunciation, Grammar, Vocabulary, and Spelling in real time.' },
    { q: 'How do I activate my plan or link my consultancy branch code?', a: 'During signup, toggle "Are you from a consultancy?" to Yes and enter your Branch Code (e.g. KTM01 or KIEC13), or message us directly on WhatsApp (+977 976-3876490) for instant eSewa/Khalti/Fonepay activation.' },
    { q: 'Are all 20 PTE Academic question types included?', a: 'Yes! You get over 1,050+ authentic practice questions across Speaking, Writing, Reading, and Listening plus 30 full-length timed mock exams.' },
    { q: 'Can consultancies and institutes get their own Branch Admin portal?', a: 'Yes! Consultancies receive a dedicated Branch Admin Command Center with a unique Branch Code, custom student quotas, real-time student progress tracking, and approval controls.' },
  ];

  const activePlan = PRICING_PLANS[selectedPlanIdx];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans selection:bg-indigo-600 selection:text-white">
      <Navbar />

      <main>
        {/* DARK NAVY HERO SECTION MATCHING MASTERIELTSAI.COM */}
        <section className="relative bg-[#0b0f19] text-white pt-20 pb-24 lg:pt-28 lg:pb-32 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-indigo-300 mb-8 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI-Powered PTE Preparation · Instant GSE 10–90 Scoring</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] mb-6 font-satoshi">
              Master PTE with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
                Artificial Intelligence
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium mb-10">
              Practice all 4 PTE Academic modules with real-time AI evaluation, personalized study plans, 1,050+ prediction questions, and full-length mock tests — starting from just <strong className="text-white">NPR 299</strong>.
            </p>

            {/* 3 Hero CTA Buttons matching masterieltsai.com */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
              <Link
                href="/signup"
                className="px-7 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 flex items-center gap-2 transition-all hover:-translate-y-0.5"
              >
                <span>Start Practicing</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/dashboard/mock-test"
                className="px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-extrabold text-xs sm:text-sm backdrop-blur-md transition-all"
              >
                Take Mock Test
              </Link>
              <a
                href="https://wa.me/9779763876490"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-all hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat with Admin</span>
              </a>
            </div>

            {/* 4 Glassmorphic Hero Stat Cards matching masterieltsai.com */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { value: '7+', label: 'Verified student scorecards' },
                { value: '90', label: 'Top verified GSE score' },
                { value: '4', label: 'Modules: S, W, R, L' },
                { value: 'NPR 299', label: 'Plans start from' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-md text-center"
                >
                  <div className="text-2xl sm:text-3xl font-black text-white font-satoshi">{stat.value}</div>
                  <div className="text-[11px] sm:text-xs text-slate-300 font-semibold mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="py-20 lg:py-24 bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-black uppercase tracking-widest text-indigo-600">WHY MASTER PTE AI</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 tracking-tight font-satoshi">
                Everything You Need for a 79+ &amp; 90 Score
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-2">
                Calibrated against official Pearson GSE scoring rubrics with instant phoneme &amp; grammar feedback.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Brain,
                  title: 'Instant AI Speech & Writing Grading',
                  desc: 'Get immediate GSE 10–90 scores for Read Aloud, Describe Image, Summarize Written Text, and Write Essay with detailed mistake highlights.',
                  color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
                },
                {
                  icon: ShieldCheck,
                  title: '30 Full-Length Timed Mock Tests',
                  desc: 'Simulate the exact 2-hour Pearson test center interface with sectional timers, audio recording bars, and full diagnostic scorecards.',
                  color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
                },
                {
                  icon: Target,
                  title: 'Consultancy & Branch Portal System',
                  desc: 'Dedicated Branch Admin Command Center with unique branch codes, student quota management, and real-time performance tracking.',
                  color: 'bg-purple-50 text-purple-600 border-purple-100',
                },
              ].map((feat, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-all">
                  <div className={clsx('w-12 h-12 rounded-2xl border flex items-center justify-center mb-5', feat.color)}>
                    <feat.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">{feat.title}</h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VERIFIED RESULTS SECTION */}
        <section id="results" className="py-20 bg-white border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600">VERIFIED SCORECARDS</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 tracking-tight font-satoshi">
                Real Students. Real 79+ &amp; 90 GSE Results.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {verifiedResults.map((r, i) => (
                <div key={i} className="bg-[#f8fafc] rounded-3xl p-6 border-2 border-slate-900 shadow-[4px_4px_0px_#0f172a] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
                      <div>
                        <h4 className="text-sm font-black text-slate-900">{r.name}</h4>
                        <span className="text-[11px] font-bold text-slate-500">{r.center}</span>
                      </div>
                      <div className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white font-black text-sm shadow-xs">
                        Overall {r.overall}
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center mb-4">
                      <div className="bg-white p-2 rounded-xl border border-slate-200">
                        <span className="text-[10px] font-bold text-slate-400 block">Speaking</span>
                        <span className="text-xs font-black text-indigo-600 font-mono">{r.s}</span>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-slate-200">
                        <span className="text-[10px] font-bold text-slate-400 block">Writing</span>
                        <span className="text-xs font-black text-purple-600 font-mono">{r.w}</span>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-slate-200">
                        <span className="text-[10px] font-bold text-slate-400 block">Reading</span>
                        <span className="text-xs font-black text-emerald-600 font-mono">{r.r}</span>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-slate-200">
                        <span className="text-[10px] font-bold text-slate-400 block">Listening</span>
                        <span className="text-xs font-black text-amber-600 font-mono">{r.l}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 font-medium italic leading-relaxed">&ldquo;{r.quote}&rdquo;</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-extrabold text-emerald-700">
                    <span>✓ Verified Pearson Scorecard</span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, idx) => <Star key={idx} className="w-3.5 h-3.5 fill-amber-400" />)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6-PLAN NPR PRICING SECTION MATCHING MASTERIELTSAI.COM */}
        <section id="pricing" className="py-20 lg:py-28 bg-[#f8fafc]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-rose-600">FLEXIBLE NEPAL PRICING</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 tracking-tight font-satoshi">
                Pick Your Preparation Duration
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-2">
                Select any duration below — instant activation via eSewa, Khalti, Fonepay, or WhatsApp.
              </p>
            </div>

            {/* 6 Duration Pills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
              {PRICING_PLANS.map((plan, idx) => {
                const isSelected = selectedPlanIdx === idx;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlanIdx(idx)}
                    className={clsx(
                      'relative p-4 rounded-2xl text-left transition-all cursor-pointer border-2',
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-[4px_4px_0px_#e11d48] -translate-y-0.5'
                        : 'bg-white text-slate-900 border-slate-900 hover:bg-slate-50 shadow-[2px_2px_0px_#0f172a]'
                    )}
                  >
                    {plan.popular && (
                      <span className="absolute -top-2.5 right-2 px-2 py-0.5 rounded-full bg-rose-600 text-white text-[9px] font-black uppercase tracking-wider">
                        POPULAR
                      </span>
                    )}
                    <div className={clsx('text-xs font-extrabold', isSelected ? 'text-slate-300' : 'text-slate-500')}>
                      {plan.duration}
                    </div>
                    <div className="text-lg font-black mt-1 font-satoshi">{plan.price}</div>
                    <div className={clsx('text-[10px] font-bold mt-0.5', isSelected ? 'text-emerald-400' : 'text-slate-400')}>
                      {plan.perDay}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Plan Detail Box with Neo-Brutalist 2px Dark Border */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-900 shadow-[6px_6px_0px_#0f172a]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-black uppercase">
                      {activePlan.duration} Access
                    </span>
                    {activePlan.popular && (
                      <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-black uppercase">
                        ★ Most Popular Choice
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 font-satoshi">
                    {activePlan.label} — {activePlan.price}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mt-1">
                    Full unrestricted access to all PTE AI modules, mock tests, and templates for {activePlan.duration}.
                  </p>
                </div>

                <div className="text-left md:text-right shrink-0">
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 font-satoshi">{activePlan.price}</div>
                  <div className="text-xs text-emerald-600 font-extrabold">{activePlan.perDay} · No hidden fees</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
                {activePlan.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Link
                  href={`/signup?plan=${activePlan.id}`}
                  className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm text-center border-2 border-slate-900 shadow-[3px_3px_0px_#0f172a] transition-all flex items-center justify-center gap-2"
                >
                  <span>Start with {activePlan.duration} ({activePlan.price})</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`https://wa.me/9779763876490?text=${encodeURIComponent(`Hi Admin, I want to activate the ${activePlan.duration} (${activePlan.price}) plan on Master PTE AI.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm text-center border-2 border-slate-900 shadow-[3px_3px_0px_#0f172a] transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Pay or ask on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE 4-MODULE QUESTION TYPES SECTION */}
        <section id="modules" className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-indigo-600">COMPLETE PTE SYLLABUS</span>
                <h2 className="text-3xl font-black text-slate-900 mt-1 font-satoshi">
                  Practice Every Official Question Type
                </h2>
              </div>

              <div className="flex flex-wrap bg-slate-100 p-1.5 rounded-2xl border border-slate-200 gap-1">
                {(['speaking', 'writing', 'reading', 'listening'] as ModuleTab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={clsx(
                      'px-4 py-2 rounded-xl text-xs font-extrabold capitalize transition-all cursor-pointer',
                      activeTab === tab ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {modulesData[activeTab].map((mod, i) => (
                <Link
                  key={i}
                  href={mod.href}
                  className="bg-[#f8fafc] rounded-2xl p-5 border border-slate-200 hover:border-indigo-500 hover:bg-white hover:shadow-md transition-all group flex items-center justify-between"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors text-indigo-600 shadow-2xs">
                      <mod.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm group-hover:text-indigo-600 transition-colors">
                        {mod.title}
                      </h4>
                      <span className="text-[10px] font-bold text-slate-400 font-mono">{mod.count}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* BUILT BY ENGINEERS SECTION MATCHING MASTERIELTSAI.COM */}
        <section id="score-guide" className="py-20 bg-[#f8fafc] border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-indigo-600">VIPER INTELLIGENCE ENGINEERING</span>
              <h2 className="text-3xl font-black text-slate-900 mt-2 font-satoshi">Built by Engineers</h2>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
                Architected in Nepal for ultra-fast speech recognition, accurate GSE rubric calibration, and multi-branch reliability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-black text-xl flex items-center justify-center shrink-0 shadow-md">
                  SB
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase border border-indigo-100">
                    Lead AI &amp; Full-Stack
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-1.5">Subash Bhandari</h3>
                  <p className="text-xs font-bold text-indigo-600">Full Stack Engineer &amp; AI Specialist</p>
                  <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
                    Engineered the real-time Gemini AI speech &amp; essay evaluation pipeline, multi-tenant Supabase architecture, and automated GSE scoring engine.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-black text-xl flex items-center justify-center shrink-0 shadow-md">
                  RA
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase border border-emerald-100">
                    Architecture &amp; Product
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-1.5">Rohan Aacharya</h3>
                  <p className="text-xs font-bold text-emerald-600">Software Architect &amp; Product Designer</p>
                  <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
                    Designed the high-contrast test simulator interface, branch consultancy quota workflows, and adaptive student study planners.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-slate-900 mb-10 text-center font-satoshi">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3.5">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-5">
                  <button
                    className="w-full flex items-center justify-between text-left cursor-pointer"
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  >
                    <span className="font-extrabold text-slate-900 text-xs sm:text-sm">{faq.q}</span>
                    <div className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center shrink-0 ml-4">
                      {activeFaq === i ? <Minus className="w-3.5 h-3.5 text-indigo-600" /> : <Plus className="w-3.5 h-3.5 text-slate-500" />}
                    </div>
                  </button>
                  {activeFaq === i && (
                    <div className="pt-3 border-t border-slate-200/80 mt-3 text-xs text-slate-600 font-medium leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PURPLE GRADIENT CTA BANNER MATCHING MASTERIELTSAI.COM */}
        <section className="py-16 bg-[#f8fafc] border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-[2.5rem] p-10 sm:p-16 text-center text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-black mb-3 font-satoshi">
                  Ready to Ace Your PTE Academic?
                </h2>
                <p className="text-xs sm:text-sm text-indigo-100 font-semibold mb-8">
                  Join thousands of students across Nepal achieving 79+ and 90 GSE scores with Master PTE AI.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/signup"
                    className="px-7 py-3.5 rounded-2xl bg-white text-indigo-700 hover:bg-indigo-50 font-black text-xs sm:text-sm shadow-lg transition-all"
                  >
                    Create Free Account →
                  </Link>
                  <a
                    href="https://wa.me/9779763876490"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-7 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Message on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
