'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  Brain, Target, Zap, BarChart3, MessageSquare, 
  Mic, BookOpen, Headphones, Edit3, 
  ArrowRight, Play, Plus, Minus, Star, ShieldCheck, Check, Sparkles, User, Building2, Shield
} from 'lucide-react';
import { clsx } from 'clsx';
import Link from 'next/link';

// Type definitions
type ModuleTab = 'speaking' | 'writing' | 'reading' | 'listening';

// Counter component for animated stats
const AnimatedCounter = ({ end, duration = 2000, suffix = '', prefix = '', decimals = 0 }: { end: number, duration?: number, suffix?: string, prefix?: string, decimals?: number }) => {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(easeProgress * end);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span suppressHydrationWarning>{prefix}{(mounted ? count : end).toFixed(decimals)}{suffix}</span>;
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<ModuleTab>('speaking');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modulesData: Record<ModuleTab, Array<{ title: string; icon: any; href: string; count: string }>> = {
    speaking: [
      { title: 'Read Aloud', icon: Mic, href: '/dashboard/practice/speaking/read-aloud', count: '50 Items' },
      { title: 'Repeat Sentence', icon: Mic, href: '/dashboard/practice/speaking/repeat-sentence', count: '50 Items' },
      { title: 'Describe Image', icon: Mic, href: '/dashboard/practice/speaking/describe-image', count: '50 Items' },
      { title: 'Retell Lecture', icon: Mic, href: '/dashboard/practice/speaking/retell-lecture', count: '50 Items' },
      { title: 'Answer Short Question', icon: Mic, href: '/dashboard/practice/speaking/answer-short-question', count: '50 Items' },
      { title: 'Summarize Group Discussion', icon: Mic, href: '/dashboard/practice/speaking/summarize-group-discussion', count: '25 Items' },
      { title: 'Respond to Situation', icon: Mic, href: '/dashboard/practice/speaking/respond-to-situation', count: '25 Items' },
    ],
    writing: [
      { title: 'Summarize Written Text', icon: Edit3, href: '/dashboard/practice/writing/summarize-written-text', count: '50 Items' },
      { title: 'Write Essay', icon: Edit3, href: '/dashboard/practice/writing/write-essay', count: '50 Items' },
    ],
    reading: [
      { title: 'R & W: Fill in the Blanks', icon: BookOpen, href: '/dashboard/practice/reading/rw-fill-blanks', count: '50 Items' },
      { title: 'Multiple Choice, Multiple Answers', icon: BookOpen, href: '/dashboard/practice/reading/mcq-multiple', count: '50 Items' },
      { title: 'Re-order Paragraphs', icon: BookOpen, href: '/dashboard/practice/reading/reorder-paragraphs', count: '50 Items' },
      { title: 'Reading: Fill in the Blanks', icon: BookOpen, href: '/dashboard/practice/reading/reading-fill-blanks', count: '50 Items' },
      { title: 'Multiple Choice, Single Answer', icon: BookOpen, href: '/dashboard/practice/reading/mcq-single', count: '50 Items' },
    ],
    listening: [
      { title: 'Summarize Spoken Text', icon: Headphones, href: '/dashboard/practice/listening/summarize-spoken-text', count: '50 Items' },
      { title: 'Multiple Choice, Multiple Answers', icon: Headphones, href: '/dashboard/practice/listening/mcq-multiple', count: '50 Items' },
      { title: 'Fill in the Blanks (Listening)', icon: Headphones, href: '/dashboard/practice/listening/fill-blanks', count: '50 Items' },
      { title: 'Highlight Correct Summary', icon: Headphones, href: '/dashboard/practice/listening/highlight-correct-summary', count: '50 Items' },
      { title: 'Multiple Choice, Single Answer', icon: Headphones, href: '/dashboard/practice/listening/mcq-single', count: '50 Items' },
      { title: 'Select Missing Word', icon: Headphones, href: '/dashboard/practice/listening/select-missing-word', count: '50 Items' },
      { title: 'Highlight Incorrect Words', icon: Headphones, href: '/dashboard/practice/listening/highlight-incorrect-words', count: '50 Items' },
      { title: 'Write from Dictation', icon: Headphones, href: '/dashboard/practice/listening/write-from-dictation', count: '50 Items' },
    ]
  };

  const testimonials = [
    { name: 'Sarah Jenkins', role: 'Nursing Graduate (Sydney)', rating: 5, content: 'The precise feedback on oral fluency and pronunciation made all the difference. Scored 84 overall on my first attempt!' },
    { name: 'Raj Patel', role: 'Software Engineer (Kathmandu)', rating: 5, content: 'Flawless Pearson exam replica and instant AI speech grading. The templates helped me achieve a Band 9 equivalent in Writing and Speaking.' },
    { name: 'Elena Rodriguez', role: 'Master Candidate (Melbourne)', rating: 5, content: 'I walked into the official exam center completely relaxed. The 2-hour timed mock test format prepared me for every single task.' }
  ];

  const faqs = [
    { q: 'How does the scoring system compare to the real PTE Academic exam?', a: 'Our evaluation algorithms are meticulously calibrated against Pearson GSE scoring guidelines. We analyze speech pitch, oral fluency, vocabulary diversity, and grammatical structure with official correlation.' },
    { q: 'Which PTE question types are included in the practice databank?', a: 'We cover all 20 official Pearson question types across Speaking, Writing, Reading, and Listening with over 1,000 authentic practice items.' },
    { q: 'Can I take full-length 2-hour mock tests?', a: 'Yes. We provide 30 full-length timed mock tests with official sectional timers, automatic break sequences, and comprehensive 10-90 GSE scorecards.' },
    { q: 'Are there multi-branch institute and teacher management tools?', a: 'Yes! Our Campus Portal and Super Admin suite allow institutes in Kathmandu, Pokhara, Chitwan, Sydney, and Melbourne to manage batches, monitor student performance, and assign study plans.' },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#1e293b] font-sans selection:bg-indigo-600 selection:text-white">
      <Navbar />
      
      <main>
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          {/* Subtle grain overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
          
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Left Text */}
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 mb-8 border border-indigo-200/80 rounded-full px-4 py-1.5 bg-white/70 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                  <span className="text-xs font-bold tracking-wide uppercase text-indigo-900">Next-Gen Pearson PTE Exam Platform</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8 text-[#0f172a]">
                  Your PTE score, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">mastered.</span>
                </h1>
                
                <p className="text-lg text-slate-600 leading-relaxed mb-10 max-w-lg font-normal">
                  Experience authentic exam preparation. Real-time Gemini AI speech evaluation, 1,000+ databank questions, 30 timed mock exams, and Band 9 templates.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/signup" className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-extrabold text-xs text-center hover:bg-indigo-700 hover:-translate-y-0.5 transition-all duration-300 shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2">
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/portal" className="px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-800 font-extrabold text-xs text-center hover:border-indigo-300 hover:bg-slate-50 transition-all duration-300 flex items-center justify-center gap-2 shadow-2xs">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>Enter Portals Hub</span>
                  </Link>
                  <Link href="/dashboard/mock-test" className="px-6 py-4 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs text-center hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                    <Play className="w-3.5 h-3.5" /> Full Mock Test
                  </Link>
                </div>
                
                <div className="mt-14 flex items-center gap-8 border-t border-[#1e293b]/10 pt-8">
                  <div>
                    <p className="text-3xl font-black text-[#0f172a]"><AnimatedCounter end={98} suffix="%" /></p>
                    <p className="text-xs text-slate-500 mt-1 font-bold">Pearson GSE Accuracy</p>
                  </div>
                  <div className="w-px h-10 bg-[#1e293b]/10"></div>
                  <div>
                    <p className="text-3xl font-black text-[#0f172a]">
                      <AnimatedCounter end={50} suffix="k+" />
                    </p>
                    <p className="text-xs text-slate-500 mt-1 font-bold">Students Registered</p>
                  </div>
                  <div className="w-px h-10 bg-[#1e293b]/10"></div>
                  <div>
                    <p className="text-3xl font-black text-[#0f172a]">
                      <AnimatedCounter end={1000} suffix="+" />
                    </p>
                    <p className="text-xs text-slate-500 mt-1 font-bold">Real Practice Items</p>
                  </div>
                </div>
              </div>
              
              {/* Right Visual - Interactive Score Card */}
              <div className="relative lg:h-[580px] flex items-center justify-center lg:justify-end">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md aspect-square rounded-full bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 blur-3xl -z-10"></div>
                
                <div className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-slate-200 backdrop-blur-xl rotate-1 hover:rotate-0 transition-transform duration-700 ease-out">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                        AI Speech Evaluation
                      </span>
                      <h3 className="font-extrabold text-slate-900 text-lg mt-2">Pronunciation & Fluency</h3>
                      <p className="text-xs text-slate-500">Read Aloud Task #14</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                      <Mic className="w-6 h-6 text-indigo-600" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1.5 font-bold">
                        <span className="text-slate-700">Oral Fluency</span>
                        <span className="text-indigo-600 font-mono">88 / 90 GSE</span>
                      </div>
                      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 w-[95%] rounded-full"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1.5 font-bold">
                        <span className="text-slate-700">Pronunciation & Pitch</span>
                        <span className="text-emerald-600 font-mono">85 / 90 GSE</span>
                      </div>
                      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[92%] rounded-full"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1.5 font-bold">
                        <span className="text-slate-700">Content Accuracy</span>
                        <span className="text-purple-600 font-mono">90 / 90 GSE</span>
                      </div>
                      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-600 w-[100%] rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-200 relative overflow-hidden">
                    <p className="text-xs text-slate-800 leading-relaxed font-medium italic">
                      "Market trends indicate a sustained shift towards renewable technologies worldwide..."
                    </p>
                    <div className="mt-3 flex gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-lg border border-emerald-200">Natural Pacing</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-lg border border-indigo-200">Clear Intonation</span>
                    </div>
                  </div>

                  <Link href="/dashboard/practice/speaking/read-aloud" className="mt-5 w-full py-3 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all">
                    <span>Try Speech Analyzer Live</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-3.5 -rotate-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                    <Target className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Target Score</p>
                    <p className="text-base font-black text-slate-900">79+ Target Achieved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ENTERPRISE PORTAL SELECTOR STRIP */}
        <section className="py-12 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600">Enterprise Access</span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">Looking for your dedicated portal?</h3>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link href="/dashboard" className="px-5 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 text-xs font-extrabold transition-all border border-indigo-200 flex items-center gap-2">
                  <User className="w-4 h-4" /> Student Portal
                </Link>
                <Link href="/admin" className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-800 text-xs font-extrabold transition-all border border-slate-200 flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> Branch Director
                </Link>
                <Link href="/portal" className="px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-indigo-700 text-xs font-extrabold transition-all shadow-sm flex items-center gap-2">
                  <Shield className="w-4 h-4" /> All Portals Hub →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* BENTO FEATURES SECTION */}
        <section id="features" className="py-24 lg:py-32 bg-[#faf9f6]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="mb-16 max-w-2xl">
              <h2 className="text-4xl font-extrabold tracking-tight text-[#0f172a] mb-4">
                Thoughtfully designed. <br /> Brilliantly executed.
              </h2>
              <p className="text-base text-slate-600 font-medium">
                Everything you need to master your target score with zero guesswork.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Large Card */}
              <Link href="/dashboard/analytics" className="md:col-span-2 bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 group hover:border-indigo-300 hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                    <Brain className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#0f172a] mb-3">Pearson Calibrated AI Scoring</h3>
                  <p className="text-slate-600 leading-relaxed text-xs sm:text-sm font-medium">
                    Our AI evaluation engine doesn't just give you a generic number. It analyzes pronunciation pitch, stress patterns, grammar structures, and vocabulary sophistication with Pearson GSE standards.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-xs font-extrabold text-indigo-600 group-hover:underline">
                  <span>Explore Performance Analytics</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>

              {/* Tall Card */}
              <Link href="/dashboard/study-plan" className="bg-[#0f172a] rounded-3xl p-8 lg:p-10 text-white group relative overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all">
                <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500"></div>
                <div>
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                    <Target className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-extrabold mb-3">Curated Daily Study Plans</h3>
                  <p className="text-slate-400 leading-relaxed text-xs font-medium mb-6">
                    Personalized study plans mapped to your exam date and target score (65, 79, or 90). Daily task queues ensure steady improvement.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 group-hover:text-white transition-colors">
                  <span>Launch Study Planner</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>

              {/* Small Card 1 */}
              <Link href="/dashboard/ai-tutor" className="bg-white border border-slate-200 rounded-3xl p-8 group hover:shadow-xl hover:border-indigo-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-4">
                    <Zap className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#0f172a] mb-2">24/7 AI Tutor Guidance</h3>
                  <p className="text-slate-500 text-xs font-medium">Instant answers, template recommendations, and feedback on any task.</p>
                </div>
                <span className="mt-4 text-xs font-bold text-indigo-600 flex items-center gap-1 group-hover:underline">
                  Chat with AI Tutor →
                </span>
              </Link>

              {/* Small Card 2 */}
              <Link href="/dashboard/mock-test" className="bg-white border border-slate-200 rounded-3xl p-8 group hover:shadow-xl hover:border-indigo-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#0f172a] mb-2">30 Full Mock Exams</h3>
                  <p className="text-slate-500 text-xs font-medium">Official timed test simulator with 10-90 GSE scorecards and diagnostics.</p>
                </div>
                <span className="mt-4 text-xs font-bold text-indigo-600 flex items-center gap-1 group-hover:underline">
                  Start Practice Exam →
                </span>
              </Link>

              {/* Medium Card */}
              <Link href="/dashboard" className="md:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 group hover:border-indigo-300 hover:shadow-xl transition-all">
                <div className="flex-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                    Authentic Simulator
                  </span>
                  <h3 className="text-xl font-extrabold text-[#0f172a] mt-2 mb-2">Exact Pearson Test Center Interface</h3>
                  <p className="text-slate-600 font-medium text-xs leading-relaxed max-w-md">
                    Our practice interface mirrors the Pearson test screen with countdown timers, audio beeps, recording bars, and exact keyboard shortcuts.
                  </p>
                </div>
                <div className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-extrabold text-xs group-hover:bg-indigo-700 transition-colors shrink-0 flex items-center gap-2">
                  <span>Enter Practice Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* MODULES SECTION WITH DIRECT WORKING LINKS */}
        <section id="modules" className="py-24 lg:py-32 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div className="max-w-lg">
                <h2 className="text-4xl font-extrabold tracking-tight text-[#0f172a] mb-4">
                  Master every question type.
                </h2>
                <p className="text-base text-slate-600 font-medium">
                  Click any question type below to jump directly into interactive practice.
                </p>
              </div>
              
              <div className="flex flex-wrap bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start gap-1">
                {[
                  { id: 'speaking', label: 'Speaking' },
                  { id: 'writing', label: 'Writing' },
                  { id: 'reading', label: 'Reading' },
                  { id: 'listening', label: 'Listening' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as ModuleTab)}
                    className={clsx(
                      "px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                      activeTab === tab.id
                        ? "bg-white text-indigo-600 shadow-2xs font-extrabold"
                        : "text-slate-600 hover:text-slate-900"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Clickable Practice Modules */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {modulesData[activeTab].map((mod, i) => (
                <Link 
                  key={i} 
                  href={mod.href}
                  className="bg-slate-50 rounded-2xl p-5 border border-slate-200 hover:border-indigo-400 hover:bg-white hover:shadow-md transition-all group flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors text-slate-700 shadow-2xs">
                      <mod.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-indigo-600 transition-colors">
                        {mod.title}
                      </h4>
                      <span className="text-[10px] font-bold text-slate-400 font-mono">{mod.count}</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:bg-indigo-50 group-hover:border-indigo-200 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 lg:py-32 bg-[#faf9f6]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-3xl font-extrabold text-[#0f172a] mb-16 text-center">Words from our successful test-takers.</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => (
                <div key={i} className="p-8 rounded-3xl bg-white border border-slate-200 relative shadow-2xs">
                  <div className="flex items-center gap-1 mb-4 text-amber-500">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-6 font-medium text-xs sm:text-sm">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-xs">{testimonial.name}</h4>
                      <p className="text-[11px] text-slate-500 font-medium">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING PLANS */}
        <section id="pricing" className="py-24 lg:py-32 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold tracking-tight text-[#0f172a] mb-4">Simple, transparent pricing.</h2>
              <p className="text-base text-slate-600 font-medium">Invest in your score with flexible student plans.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
              {/* Basic */}
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-2xs">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Weekly Lite</h3>
                <div className="mb-6">
                  <span className="text-3xl font-black text-[#0f172a]">Rs. 299</span>
                  <span className="text-xs text-slate-500 font-medium ml-1">/ 7 days</span>
                </div>
                <ul className="space-y-3 mb-8 text-xs font-semibold text-slate-700">
                  {['7 Days Full Access', '2 Full Mock Tests', 'AI Speech Evaluation', 'Basic Analytics'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" /> {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/signup?plan=week" className="block w-full py-3.5 rounded-xl border border-slate-300 text-slate-800 font-extrabold text-xs text-center hover:bg-white hover:border-indigo-300 transition-colors">
                  Choose Weekly Plan
                </Link>
              </div>

              {/* Popular */}
              <div className="bg-[#0f172a] rounded-3xl p-10 shadow-2xl relative md:scale-105 z-10 border border-slate-800">
                <div className="absolute -top-3.5 right-8 bg-indigo-600 text-white text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Most Popular
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400 mb-2">Monthly Pro</h3>
                <div className="mb-6">
                  <span className="text-3xl font-black text-white">Rs. 999</span>
                  <span className="text-xs text-slate-400 font-medium ml-1">/ 30 days</span>
                </div>
                <ul className="space-y-3 mb-8 text-xs font-semibold text-slate-300">
                  {['30 Days Full Access', '30 Full-Length Mock Exams', 'All 20 Question Types', 'Instant AI Scoring', 'Personalized Daily Plan'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" /> {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/signup?plan=month" className="block w-full py-4 rounded-xl bg-indigo-600 text-white font-extrabold text-xs text-center hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/30">
                  Choose Monthly Pro →
                </Link>
              </div>

              {/* Ultimate */}
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-2xs">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">45 Days Prep</h3>
                <div className="mb-6">
                  <span className="text-3xl font-black text-[#0f172a]">Rs. 1,499</span>
                  <span className="text-xs text-slate-500 font-medium ml-1">/ 45 days</span>
                </div>
                <ul className="space-y-3 mb-8 text-xs font-semibold text-slate-700">
                  {['45 Days Full Access', 'Everything in Pro', 'PDF Scorecards', 'Band 9 Essay Templates', 'Priority WhatsApp Support'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" /> {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/signup?plan=extended" className="block w-full py-3.5 rounded-xl border border-slate-300 text-slate-800 font-extrabold text-xs text-center hover:bg-white hover:border-indigo-300 transition-colors">
                  Choose 45 Days Plan
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 lg:py-32 bg-[#faf9f6]">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <h2 className="text-3xl font-extrabold text-[#0f172a] mb-12 text-center">Frequently asked questions.</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
                  <button 
                    className="w-full flex items-center justify-between text-left group cursor-pointer"
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  >
                    <span className="font-extrabold text-slate-900 text-xs sm:text-sm group-hover:text-indigo-600 transition-colors">{faq.q}</span>
                    <div className={clsx(
                      "w-6 h-6 rounded-full border flex items-center justify-center transition-colors shrink-0 ml-4",
                      activeFaq === i ? "border-indigo-600 bg-indigo-50 text-indigo-600" : "border-slate-300 text-slate-500"
                    )}>
                      {activeFaq === i ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                  {activeFaq === i && (
                    <div className="pt-3 border-t border-slate-100 mt-3 text-xs text-slate-600 font-medium leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BOTTOM SECTION */}
        <section className="py-24 bg-white border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl text-white">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight">Begin your PTE journey today.</h2>
                <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed mb-8">
                  Get the premium, official Pearson-calibrated practice you need to secure your dream score.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link href="/signup" className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-extrabold text-xs hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/30">
                    Start Learning Today →
                  </Link>
                  <Link href="/portal" className="px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all">
                    Access Portal
                  </Link>
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
