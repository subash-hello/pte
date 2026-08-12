"use client";

import React, { useState, useEffect } from "react";

interface DashboardViewProps {
  onStartPractice: (section: string) => void;
  onStartMock: () => void;
  userSession?: any;
}

export default function DashboardView({ onStartPractice, onStartMock, userSession }: DashboardViewProps) {
  const [mounted, setMounted] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, label: "Take 15 Minute Diagnostic Test", completed: false },
    { id: 2, label: "Complete Speaking practice", completed: false },
    { id: 3, label: "Complete Writing practice", completed: false },
    { id: 4, label: "Practice Reading passage", completed: true },
    { id: 5, label: "Complete Listening exercise", completed: true },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div suppressHydrationWarning className="min-h-screen bg-slate-50" />;
  }

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const displayName = userSession?.name ? userSession.name.split(' ')[0] : 'Student';

  const isPending = userSession?.status === 'pending';

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Pending Account Notice Banner */}
      {isPending && (
        <div className="bg-amber-500 text-white rounded-2xl p-4 md:p-5 flex flex-wrap items-center justify-between gap-4 shadow-md border border-amber-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shrink-0">
              ⏳
            </div>
            <div>
              <h3 className="text-sm md:text-base font-bold">Account Pending Approval (Trial Mode: 1 Practice Each)</h3>
              <p className="text-xs text-amber-100 mt-0.5">
                Your account is currently pending Admin approval. You have trial access to 1 practice set per module. Contact Admin on WhatsApp for instant approval.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/9779763876490?text=${encodeURIComponent(`Hi Admin, please approve my account (${userSession?.name} / ${userSession?.email}).`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-white text-amber-900 hover:bg-amber-50 font-extrabold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5 shrink-0"
          >
            Request WhatsApp Approval (+977 9763876490) →
          </a>
        </div>
      )}

      {/* 1. Top Diagnostic Test Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 rounded-2xl p-4 md:p-5 text-white flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl">
            ⚡
          </div>
          <div>
            <h3 className="text-sm md:text-base font-bold">Establish your official baseline PTE GSE Score</h3>
            <p className="text-xs text-indigo-100 mt-0.5">
              Take the 15-minute diagnostic test across Speaking, Writing, Reading & Listening with instant AI feedback.
            </p>
          </div>
        </div>

        <button
          onClick={onStartMock}
          className="px-5 py-2.5 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
        >
          Start Diagnostic Test →
        </button>
      </div>

      {/* 2. Header Greeting & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Good morning, {displayName}! ☀️
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            You're on a <strong className="text-amber-500 font-bold">1-day streak</strong>! Keep it up — consistency is the key to PTE success.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200 flex items-center gap-1.5">
            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            User Guide (PDF)
          </button>
          <button className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs border border-emerald-200 flex items-center gap-1.5">
            💬 Join WhatsApp Group
          </button>
        </div>
      </div>

      {/* 3. Score Prediction, Study Streak & Today's Tasks Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Prediction Meter */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            PTE GSE Score Prediction
          </span>

          <div className="flex flex-col items-center justify-center py-4">
            {/* Circle score ring */}
            <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-8 border-indigo-100 border-t-indigo-600 border-r-indigo-500 shadow-inner">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-extrabold text-slate-900 font-mono">79</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">GSE Target 79+</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 pt-4 border-t border-slate-100 text-center">
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">S</span>
              <span className="text-sm font-bold text-slate-800 font-mono">78</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">W</span>
              <span className="text-sm font-bold text-slate-800 font-mono">77</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">R</span>
              <span className="text-sm font-bold text-slate-800 font-mono">81</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">L</span>
              <span className="text-sm font-bold text-slate-800 font-mono">76</span>
            </div>
          </div>
        </div>

        {/* Study Streak Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Study Streak
            </span>

            <div className="flex items-center gap-3 my-2">
              <span className="text-3xl">🔥</span>
              <div>
                <div className="text-2xl font-extrabold text-slate-900 font-mono">1</div>
                <span className="text-xs text-slate-400">Day Streak · Best: 10</span>
              </div>
            </div>

            {/* Streak Grid */}
            <div className="grid grid-cols-7 gap-1.5 mt-4">
              {Array.from({ length: 14 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-8 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                    i === 0 ? "bg-emerald-500 text-white shadow-sm" : "bg-slate-100 text-slate-400"
                  }`}
                >
                  D{i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Today's Tasks Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today's Tasks</span>
              <span className="text-xs font-bold text-indigo-600 font-mono">{completedCount}/{tasks.length} completed</span>
            </div>

            <div className="w-full bg-slate-100 h-2 rounded-full mb-4 overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${(completedCount / tasks.length) * 100}%` }}
              />
            </div>

            <div className="space-y-2.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                      task.completed
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : "border-slate-300 group-hover:border-indigo-500"
                    }`}
                  >
                    {task.completed && <span className="text-[10px] font-bold">✓</span>}
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      task.completed ? "text-slate-400 line-through" : "text-slate-700"
                    }`}
                  >
                    {task.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Performance Trend & AI Recommendations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Trend Chart Card */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Performance Trend</span>
            <div className="flex items-center gap-3 text-[11px] font-semibold">
              <span className="flex items-center gap-1 text-purple-600"><span className="w-2 h-2 rounded-full bg-purple-500" /> Speaking</span>
              <span className="flex items-center gap-1 text-blue-600"><span className="w-2 h-2 rounded-full bg-blue-500" /> Writing</span>
              <span className="flex items-center gap-1 text-indigo-600"><span className="w-2 h-2 rounded-full bg-indigo-500" /> Reading</span>
              <span className="flex items-center gap-1 text-emerald-600"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Listening</span>
            </div>
          </div>

          {/* Simulated chart visualizer */}
          <div className="h-44 w-full bg-slate-50 border border-slate-100 rounded-xl p-4 relative flex items-end justify-between px-6 overflow-hidden">
            <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-20">
              <div className="border-b border-slate-300 w-full" />
              <div className="border-b border-slate-300 w-full" />
              <div className="border-b border-slate-300 w-full" />
            </div>

            {/* Line chart paths */}
            <svg className="absolute inset-0 w-full h-full p-4 pointer-events-none overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M 0,40 Q 25,30 50,25 T 100,20" fill="none" stroke="#8b5cf6" strokeWidth="2.5" />
              <path d="M 0,45 Q 25,35 50,30 T 100,25" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
              <path d="M 0,35 Q 25,25 50,20 T 100,15" fill="none" stroke="#6366f1" strokeWidth="2.5" />
              <path d="M 0,50 Q 25,40 50,35 T 100,30" fill="none" stroke="#10b981" strokeWidth="2.5" />
            </svg>

            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} className="text-[9px] text-slate-400 font-mono z-10">Day {i + 1}</span>
            ))}
          </div>
        </div>

        {/* AI Recommendations Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-4">
              🤖 AI Recommendations
            </span>

            <div className="space-y-3">
              <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Practice Describe Image charts</h4>
                  <span className="text-[10px] text-indigo-600 font-medium">Boost Oral Fluency</span>
                </div>
                <button onClick={() => onStartPractice("speaking")} className="text-xs font-bold text-indigo-600 hover:underline">Start →</button>
              </div>

              <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Review Academic Word List</h4>
                  <span className="text-[10px] text-indigo-600 font-medium">AWL Sublist 1-3</span>
                </div>
                <button onClick={() => onStartPractice("reading")} className="text-xs font-bold text-indigo-600 hover:underline">Start →</button>
              </div>

              <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Focus on Essay Coherence</h4>
                  <span className="text-[10px] text-indigo-600 font-medium">200-300 Words Format</span>
                </div>
                <button onClick={() => onStartPractice("writing")} className="text-xs font-bold text-indigo-600 hover:underline">Start →</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Badges, Leaderboard & Daily Limits Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Achievement Badges Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-4">
            Achievement Badges
          </span>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex flex-col items-center text-center">
              <span className="text-2xl mb-1">🔥</span>
              <span className="text-xs font-bold text-amber-900">Streak Active</span>
              <span className="text-[10px] text-amber-700 mt-0.5">1-day streak</span>
            </div>

            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl flex flex-col items-center text-center">
              <span className="text-2xl mb-1">🏆</span>
              <span className="text-xs font-bold text-indigo-900">PTE Scholar</span>
              <span className="text-[10px] text-indigo-700 mt-0.5">Target 79+ GSE</span>
            </div>
          </div>
        </div>

        {/* Weekly Leaderboard Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
              Weekly Leaderboard
            </span>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-xl bg-amber-50 border border-amber-200">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-extrabold text-[10px] flex items-center justify-center">1</span>
                  <span className="text-xs font-bold text-slate-900">Rakesh Khadka</span>
                </div>
                <span className="text-xs font-mono font-bold text-amber-700">2630 XP</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-indigo-50 border border-indigo-200">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-500 text-white font-extrabold text-[10px] flex items-center justify-center">2</span>
                  <span className="text-xs font-bold text-indigo-900">Subash Bhandari (You)</span>
                </div>
                <span className="text-xs font-mono font-bold text-indigo-700">1140 XP</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-300 text-slate-700 font-extrabold text-[10px] flex items-center justify-center">3</span>
                  <span className="text-xs font-bold text-slate-800">Kapil Shrestha</span>
                </div>
                <span className="text-xs font-mono font-bold text-slate-600">1035 XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Activity Limits Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
              Daily Activity Limits
            </span>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-600">Mock Exams started today</span>
                <span className="font-mono font-bold text-slate-900">0 / 5</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-600">Reading practice sets today</span>
                <span className="font-mono font-bold text-slate-900">0 / 5</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-600">Listening practice sets today</span>
                <span className="font-mono font-bold text-slate-900">0 / 5</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-600">Writing practice sets today</span>
                <span className="font-mono font-bold text-emerald-600">4 / 5</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-600">Speaking practice sets today</span>
                <span className="font-mono font-bold text-slate-900">0 / 5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Quick Practice Cards Row */}
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Quick Practice</span>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl">🎙️</div>
              <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">5 Item Types</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Speaking</h3>
              <p className="text-xs text-slate-500">Last score: 78 GSE</p>
            </div>
            <button onClick={() => onStartPractice("speaking")} className="mt-4 text-xs font-bold text-purple-600 hover:underline flex items-center gap-1">
              Practice Now →
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl">✍️</div>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">2 Item Types</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Writing</h3>
              <p className="text-xs text-slate-500">Last score: 77 GSE</p>
            </div>
            <button onClick={() => onStartPractice("writing")} className="mt-4 text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
              Practice Now →
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl">📖</div>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">5 Item Types</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Reading</h3>
              <p className="text-xs text-slate-500">Last score: 81 GSE</p>
            </div>
            <button onClick={() => onStartPractice("reading")} className="mt-4 text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">
              Practice Now →
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl">🎧</div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">8 Item Types</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Listening</h3>
              <p className="text-xs text-slate-500">Last score: 76 GSE</p>
            </div>
            <button onClick={() => onStartPractice("listening")} className="mt-4 text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1">
              Practice Now →
            </button>
          </div>
        </div>
      </div>

      {/* 7. Recent Activity Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-4">Recent Activity</span>
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-3">
              <span className="text-lg">📖</span>
              <div>
                <h4 className="font-bold text-slate-900">Reading Practice (Fill in the Blanks R&W)</h4>
                <span className="text-[10px] text-slate-400">5 mins ago</span>
              </div>
            </div>
            <span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">8.5 / 90</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-3">
              <span className="text-lg">🎧</span>
              <div>
                <h4 className="font-bold text-slate-900">Listening Practice (Write from Dictation)</h4>
                <span className="text-[10px] text-slate-400">10 mins ago</span>
              </div>
            </div>
            <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">7.5 / 90</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-3">
              <span className="text-lg">✍️</span>
              <div>
                <h4 className="font-bold text-slate-900">Writing Practice (Summarize Written Text)</h4>
                <span className="text-[10px] text-slate-400">1 hour ago</span>
              </div>
            </div>
            <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">8.0 / 90</span>
          </div>
        </div>
      </div>
    </div>
  );
}
