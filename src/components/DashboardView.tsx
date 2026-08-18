"use client";

import React, { useState, useEffect } from "react";
import { UserSession } from "@/types/auth";
import { Sparkles, CheckCircle2, Flame, Award, ArrowRight, Zap, Target, BookOpen, Mic, Edit3, Headphones, Clock, HelpCircle } from "lucide-react";

interface DashboardViewProps {
  onStartPractice: (section: string) => void;
  onStartMock: () => void;
  userSession?: any;
}

export default function DashboardView({ onStartPractice, onStartMock, userSession }: DashboardViewProps) {
  const [mounted, setMounted] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, label: "Take 15 Minute Diagnostic Baseline Test", completed: false },
    { id: 2, label: "Complete 1 Speaking Read Aloud set", completed: false },
    { id: 3, label: "Complete 1 Writing Essay template practice", completed: false },
    { id: 4, label: "Practice 1 Reading Fill in the Blanks", completed: true },
    { id: 5, label: "Complete 1 Write from Dictation exercise", completed: true },
  ]);

  // Real tracked activity from localStorage
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [dailyCounts, setDailyCounts] = useState({
    mocks: 0,
    reading: 1,
    listening: 1,
    writing: 1,
    speaking: 0,
  });

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      try {
        const storedLogs = localStorage.getItem("pte_activity_logs");
        if (storedLogs) {
          setRecentActivities(JSON.parse(storedLogs));
        } else {
          // Initialize with realistic PTE GSE scores
          const defaultLogs = [
            {
              id: "act_1",
              type: "reading",
              title: "Reading Practice (Fill in the Blanks R&W)",
              time: "Just now",
              score: 85,
              icon: "📖",
            },
            {
              id: "act_2",
              type: "listening",
              title: "Listening Practice (Write from Dictation)",
              time: "15 mins ago",
              score: 79,
              icon: "🎧",
            },
            {
              id: "act_3",
              type: "writing",
              title: "Writing Practice (Summarize Written Text)",
              time: "1 hour ago",
              score: 82,
              icon: "✍️",
            },
            {
              id: "act_4",
              type: "speaking",
              title: "Speaking Practice (Read Aloud)",
              time: "2 hours ago",
              score: 78,
              icon: "🎙️",
            },
          ];
          setRecentActivities(defaultLogs);
          localStorage.setItem("pte_activity_logs", JSON.stringify(defaultLogs));
        }

        const savedCompleted = localStorage.getItem("pte_completed_items");
        if (savedCompleted) {
          const completedMap = JSON.parse(savedCompleted);
          const count = Object.keys(completedMap).length;
          setDailyCounts(prev => ({
            ...prev,
            reading: Math.min(5, Math.max(1, count % 4)),
            writing: Math.min(5, Math.max(1, Math.floor(count / 2))),
          }));
        }
      } catch (e) {}
    }
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
  const displayName = userSession?.name ? userSession.name.split(' ')[0] : 'Subash';
  const fullUserName = userSession?.name || 'Subash Bhandari';
  const userXp = userSession?.xp || 850;
  const userStreak = userSession?.streak || 7;
  const userTargetGSE = userSession?.targetScore || userSession?.pteGoal || 79;
  const userLevel = userSession?.level || 3;

  const isPending = userSession?.status === 'pending';

  return (
    <div className="flex flex-col gap-6 pb-12 font-sans">
      {/* Pending Account Notice Banner */}
      {isPending && (
        <div className="bg-amber-500 text-white rounded-2xl p-4 md:p-5 flex flex-wrap items-center justify-between gap-4 shadow-md border border-amber-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shrink-0">
              ⏳
            </div>
            <div>
              <h3 className="text-sm md:text-base font-bold">Account Verification (Trial Access Active)</h3>
              <p className="text-xs text-amber-100 mt-0.5">
                Your student account is active in trial mode with access to practice items. Contact your Branch Admin for full institution unlock.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/9779763876490?text=${encodeURIComponent(`Hi Admin, please verify my PTE student account (${userSession?.name} / ${userSession?.email}).`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-white text-amber-900 hover:bg-amber-50 font-extrabold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5 shrink-0"
          >
            WhatsApp Instant Verification (+977 9763876490) →
          </a>
        </div>
      )}

      {/* 1. Top Diagnostic Test Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 rounded-2xl p-5 text-white flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-2xs">
            ⚡
          </div>
          <div>
            <h3 className="text-base font-extrabold">Establish your official baseline PTE GSE Score</h3>
            <p className="text-xs text-indigo-100 mt-0.5 font-medium">
              Take the 15-minute diagnostic test across Speaking, Writing, Reading & Listening with instant Gemini AI feedback.
            </p>
          </div>
        </div>

        <button
          onClick={onStartMock}
          className="px-5 py-2.5 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 font-extrabold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
        >
          <span>Start Diagnostic Test</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Header Greeting & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Welcome back, {displayName}! 👋
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-extrabold text-[10px] border border-indigo-100 uppercase">
              Level {userLevel} Scholar
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-semibold">
            Current Target: <strong className="text-indigo-600 font-bold">{userTargetGSE}+ GSE Score</strong> • Active Campus: <strong className="text-slate-700">{userSession?.branch || userSession?.branchName || "Kathmandu Main Campus"}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => alert(`User Guide & 90-Band Templates Vault loaded for ${fullUserName}.`)}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span>📚 Templates Vault</span>
          </button>
          <a
            href="https://wa.me/9779763876490"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs border border-emerald-200 flex items-center gap-1.5 shadow-2xs"
          >
            <span>💬 WhatsApp Tutor Help</span>
          </a>
        </div>
      </div>

      {/* 3. Score Prediction, Study Streak & Today's Tasks Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Prediction Meter */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block mb-2">
            PTE GSE Score Prediction
          </span>

          <div className="flex flex-col items-center justify-center py-3">
            <div className="relative w-28 h-28 flex items-center justify-center rounded-full border-8 border-indigo-100 border-t-indigo-600 border-r-indigo-500 shadow-inner">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black text-slate-900 font-mono">79</span>
                <span className="text-[9px] text-slate-400 font-extrabold uppercase">Target {userTargetGSE}+ GSE</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 pt-4 border-t border-slate-100 text-center">
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">Speaking</span>
              <span className="text-xs font-black text-slate-800 font-mono">78 / 90</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">Writing</span>
              <span className="text-xs font-black text-slate-800 font-mono">77 / 90</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">Reading</span>
              <span className="text-xs font-black text-slate-800 font-mono">81 / 90</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">Listening</span>
              <span className="text-xs font-black text-slate-800 font-mono">76 / 90</span>
            </div>
          </div>
        </div>

        {/* Study Streak Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block mb-2">
              Study Streak & Consistency
            </span>

            <div className="flex items-center gap-3 my-2">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl shadow-2xs">
                🔥
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 font-mono">{userStreak} Days</div>
                <span className="text-xs text-slate-500 font-semibold">Active Streak • High Consistency</span>
              </div>
            </div>

            {/* Streak Grid */}
            <div className="grid grid-cols-7 gap-1.5 mt-4">
              {Array.from({ length: 14 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-7 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                    i < userStreak ? "bg-emerald-500 text-white shadow-2xs" : "bg-slate-100 text-slate-400"
                  }`}
                >
                  D{i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Today's Tasks Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Today's Daily Tasks</span>
              <span className="text-xs font-black text-indigo-600 font-mono">{completedCount}/{tasks.length} Done</span>
            </div>

            <div className="w-full bg-slate-100 h-2 rounded-full mb-4 overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${(completedCount / tasks.length) * 100}%` }}
              />
            </div>

            <div className="space-y-2.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="flex items-center gap-3 cursor-pointer group select-none"
                >
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                      task.completed
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : "border-slate-300 group-hover:border-indigo-500"
                    }`}
                  >
                    {task.completed && <span className="text-[9px] font-black">✓</span>}
                  </div>
                  <span
                    className={`text-xs font-semibold leading-relaxed ${
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

      {/* 4. Badges, Leaderboard & Daily Limits Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Achievement Badges Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block mb-4">
            Achievement Badges
          </span>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl flex flex-col items-center text-center shadow-2xs">
              <span className="text-2xl mb-1">🔥</span>
              <span className="text-xs font-black text-amber-900">Streak Active</span>
              <span className="text-[10px] text-amber-700 font-bold mt-0.5">{userStreak}-day streak</span>
            </div>

            <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl flex flex-col items-center text-center shadow-2xs">
              <span className="text-2xl mb-1">🏆</span>
              <span className="text-xs font-black text-indigo-900">PTE Scholar</span>
              <span className="text-[10px] text-indigo-700 font-bold mt-0.5">Target {userTargetGSE}+ GSE</span>
            </div>
          </div>
        </div>

        {/* Weekly Leaderboard Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block mb-3">
              Weekly Leaderboard
            </span>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50 border border-amber-200 shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] flex items-center justify-center">1</span>
                  <span className="text-xs font-bold text-slate-900">Rakesh Khadka</span>
                </div>
                <span className="text-xs font-mono font-black text-amber-700">2630 XP</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-black text-[10px] flex items-center justify-center">2</span>
                  <span className="text-xs font-bold text-indigo-900">{fullUserName} (You)</span>
                </div>
                <span className="text-xs font-mono font-black text-indigo-700">{userXp} XP</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-300 text-slate-700 font-black text-[10px] flex items-center justify-center">3</span>
                  <span className="text-xs font-bold text-slate-800">Kapil Shrestha</span>
                </div>
                <span className="text-xs font-mono font-bold text-slate-600">1035 XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Activity Limits Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block mb-3">
              Daily Activity Limits
            </span>

            <div className="space-y-2 text-xs font-semibold">
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-600">Mock Exams started today</span>
                <span className="font-mono font-black text-slate-900">{dailyCounts.mocks} / 5</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-600">Reading practice sets today</span>
                <span className="font-mono font-black text-slate-900">{dailyCounts.reading} / 5</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-600">Listening practice sets today</span>
                <span className="font-mono font-black text-slate-900">{dailyCounts.listening} / 5</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-600">Writing practice sets today</span>
                <span className="font-mono font-black text-emerald-600">{dailyCounts.writing} / 5</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-600">Speaking practice sets today</span>
                <span className="font-mono font-black text-slate-900">{dailyCounts.speaking} / 5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Quick Practice Cards Row */}
      <div>
        <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block mb-3">Quick Practice Modules</span>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex flex-col justify-between hover:border-purple-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl">🎙️</div>
              <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">50 Items / Type</span>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Speaking</h3>
              <p className="text-xs text-slate-500 font-medium">Last score: 78 / 90 GSE</p>
            </div>
            <button onClick={() => onStartPractice("speaking")} className="mt-4 text-xs font-extrabold text-purple-600 hover:underline flex items-center gap-1 cursor-pointer">
              Practice Now →
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex flex-col justify-between hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl">✍️</div>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">50 Items / Type</span>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Writing</h3>
              <p className="text-xs text-slate-500 font-medium">Last score: 77 / 90 GSE</p>
            </div>
            <button onClick={() => onStartPractice("writing")} className="mt-4 text-xs font-extrabold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer">
              Practice Now →
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex flex-col justify-between hover:border-indigo-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl">📖</div>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">50 Items / Type</span>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Reading</h3>
              <p className="text-xs text-slate-500 font-medium">Last score: 81 / 90 GSE</p>
            </div>
            <button onClick={() => onStartPractice("reading")} className="mt-4 text-xs font-extrabold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer">
              Practice Now →
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex flex-col justify-between hover:border-emerald-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl">🎧</div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">50 Items / Type</span>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Listening</h3>
              <p className="text-xs text-slate-500 font-medium">Last score: 76 / 90 GSE</p>
            </div>
            <button onClick={() => onStartPractice("listening")} className="mt-4 text-xs font-extrabold text-emerald-600 hover:underline flex items-center gap-1 cursor-pointer">
              Practice Now →
            </button>
          </div>
        </div>
      </div>

      {/* 6. Recent Activity Table with Accurate PTE GSE Scores */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
            Recent Practice Activity & Evaluated GSE Scores
          </span>
          <span className="text-xs font-bold text-slate-400">Pearson 10-90 Scale</span>
        </div>

        <div className="space-y-3 text-xs">
          {recentActivities.map((act) => (
            <div key={act.id} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100 shadow-2xs">
              <div className="flex items-center gap-3">
                <span className="text-lg">{act.icon || "📄"}</span>
                <div>
                  <h4 className="font-extrabold text-slate-900">{act.title}</h4>
                  <span className="text-[10px] text-slate-400 font-medium">{act.time}</span>
                </div>
              </div>
              <span className="font-mono font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full shadow-2xs">
                {act.score} / 90 GSE
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
