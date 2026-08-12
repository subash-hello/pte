"use client";

import React, { useEffect, useState } from "react";
import { PTEPracticeQuestions } from "../data/practice-questions";

interface ProgressAnalyticsViewProps {
  onNavigateToSection?: (section: string) => void;
}

export default function ProgressAnalyticsView({ onNavigateToSection }: ProgressAnalyticsViewProps) {
  const [completedMap, setCompletedMap] = useState<Record<string, { score: number }>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("pte_completed_items");
        if (saved) {
          setCompletedMap(JSON.parse(saved));
        }
      } catch (e) {}
    }
  }, []);

  const completedIds = Object.keys(completedMap);
  const totalCompletedCount = completedIds.length;

  // Calculate completed count per section
  const speakingCompleted = completedIds.filter((id) => id.startsWith("ra_") || id.startsWith("rs_") || id.startsWith("di_") || id.startsWith("rl_") || id.startsWith("asq_")).length;
  const writingCompleted = completedIds.filter((id) => id.startsWith("swt_") || id.startsWith("we_")).length;
  const readingCompleted = completedIds.filter((id) => id.startsWith("fibrw_") || id.startsWith("mcma_r_") || id.startsWith("rop_") || id.startsWith("fibr_") || id.startsWith("mcsa_r_")).length;
  const listeningCompleted = completedIds.filter((id) => id.startsWith("sst_") || id.startsWith("mcma_l_") || id.startsWith("fibl_") || id.startsWith("hcs_") || id.startsWith("mcsal_") || id.startsWith("smw_") || id.startsWith("hiw_") || id.startsWith("wfd_")).length;

  // Section score calculations
  const avgScore =
    totalCompletedCount > 0
      ? Math.round(
          Object.values(completedMap).reduce((acc, curr) => acc + (curr.score || 78), 0) /
            totalCompletedCount
        )
      : 78;

  const sectionStats = [
    {
      title: "Speaking",
      icon: "🗣️",
      score: 78,
      completed: speakingCompleted,
      total: 250,
      color: "from-blue-600 to-indigo-600",
      lightBg: "bg-blue-50 border-blue-200 text-blue-900",
      badgeColor: "bg-blue-100 text-blue-800",
      skills: ["Oral Fluency: 80 GSE", "Pronunciation: 76 GSE", "Content: 78 GSE"],
    },
    {
      title: "Writing",
      icon: "✍️",
      score: 77,
      completed: writingCompleted,
      total: 100,
      color: "from-purple-600 to-pink-600",
      lightBg: "bg-purple-50 border-purple-200 text-purple-900",
      badgeColor: "bg-purple-100 text-purple-800",
      skills: ["Grammar: 82 GSE", "Vocabulary: 78 GSE", "Discourse: 76 GSE"],
    },
    {
      title: "Reading",
      icon: "📖",
      score: 76,
      completed: readingCompleted,
      total: 250,
      color: "from-emerald-600 to-teal-600",
      lightBg: "bg-emerald-50 border-emerald-200 text-emerald-900",
      badgeColor: "bg-emerald-100 text-emerald-800",
      skills: ["FIB Accuracy: 80%", "Paragraph Logic: 75%", "MCMA: 72%"],
    },
    {
      title: "Listening",
      icon: "🎧",
      score: 79,
      completed: listeningCompleted,
      total: 400,
      color: "from-amber-500 to-orange-600",
      lightBg: "bg-amber-50 border-amber-200 text-amber-900",
      badgeColor: "bg-amber-100 text-amber-800",
      skills: ["Write from Dictation: 85%", "Spoken Summary: 78%", "Acoustic: 79 GSE"],
    },
  ];

  const enablingSkills = [
    { name: "Oral Fluency", score: 80, progress: 88, color: "bg-indigo-600" },
    { name: "Pronunciation", score: 76, progress: 84, color: "bg-blue-600" },
    { name: "Grammar & Syntax", score: 82, progress: 91, color: "bg-purple-600" },
    { name: "Vocabulary Range", score: 78, progress: 86, color: "bg-emerald-600" },
    { name: "Written Discourse", score: 76, progress: 84, color: "bg-pink-600" },
    { name: "Spelling Accuracy", score: 84, progress: 93, color: "bg-amber-500" },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-12">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-extrabold text-2xl shadow-lg border border-indigo-400/30">
            SB
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight">Subash Bhandari</h1>
              <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Target 79+ GSE Met
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Overall Predicted GSE Score: <strong className="text-indigo-300 font-bold">{avgScore} / 90 GSE</strong> • 1,140 XP • 1-Day Streak
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700">
          <div className="text-center px-3 border-r border-slate-700">
            <span className="text-xs text-slate-400 block font-semibold">Attempted</span>
            <span className="text-xl font-extrabold text-white font-mono">{totalCompletedCount}</span>
          </div>
          <div className="text-center px-3 border-r border-slate-700">
            <span className="text-xs text-slate-400 block font-semibold">Avg Score</span>
            <span className="text-xl font-extrabold text-emerald-400 font-mono">{avgScore}</span>
          </div>
          <div className="text-center px-3">
            <span className="text-xs text-slate-400 block font-semibold">Target</span>
            <span className="text-xl font-extrabold text-indigo-400 font-mono">79+</span>
          </div>
        </div>
      </div>

      {/* 2. 4 Section Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {sectionStats.map((sec) => (
          <div
            key={sec.title}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between gap-4 hover:shadow-md transition-all group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-2xl">{sec.icon}</span>
                <span className={`text-xs font-mono font-extrabold px-2.5 py-1 rounded-full ${sec.badgeColor}`}>
                  {sec.score} / 90 GSE
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mt-3 group-hover:text-indigo-600 transition-colors">
                {sec.title} Section
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {sec.completed} of {sec.total} items completed
              </p>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
                <div
                  className={`bg-gradient-to-r ${sec.color} h-full rounded-full transition-all duration-500`}
                  style={{ width: `${Math.max(5, (sec.completed / sec.total) * 100)}%` }}
                />
              </div>

              <div className="mt-4 space-y-1.5 text-[11px] text-slate-600 font-medium">
                {sec.skills.map((sk, i) => (
                  <div key={i} className="flex items-center justify-between p-1.5 bg-slate-50 rounded-lg border border-slate-100">
                    <span>{sk.split(":")[0]}</span>
                    <span className="font-mono font-bold text-slate-900">{sk.split(":")[1]}</span>
                  </div>
                ))}
              </div>
            </div>

            {onNavigateToSection && (
              <button
                onClick={() => onNavigateToSection(sec.title.toLowerCase())}
                className="w-full py-2 bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700 text-xs font-bold rounded-xl transition-all"
              >
                Practice {sec.title} →
              </button>
            )}
          </div>
        ))}
      </div>

      {/* 3. Enabling Skills Breakdown & Target Advice */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enabling Skills Progress Bars */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">PTE Enabling Skills Breakdown</h3>
              <p className="text-xs text-slate-500 mt-0.5">Automated scoring diagnostics across 6 key language competencies</p>
            </div>
            <span className="text-xs font-bold font-mono text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
              Official GSE Scale
            </span>
          </div>

          <div className="space-y-4">
            {enablingSkills.map((sk) => (
              <div key={sk.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>{sk.name}</span>
                  <span className="font-mono text-indigo-600">{sk.score} / 90 GSE</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                  <div
                    className={`${sk.color} h-full rounded-full transition-all duration-700 shadow-xs`}
                    style={{ width: `${sk.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations & Target Roadmap */}
        <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 border border-indigo-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2">
              <span>✨ AI Score Target Advice</span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900">How to Push Your GSE Score to 85+</h3>

            <ul className="text-xs text-slate-700 space-y-2.5 mt-3 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-extrabold">•</span>
                <span><strong>Speaking (78)</strong>: Maintain continuous oral fluency without hesitating during Describe Image items.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-extrabold">•</span>
                <span><strong>Listening (79)</strong>: Prioritize <em>Write from Dictation</em> items — they carry high cross-sectional marks for Writing and Listening.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-extrabold">•</span>
                <span><strong>Writing (77)</strong>: Keep your Essay length strictly between 220–280 words to earn maximum Form marks.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-white rounded-xl border border-indigo-100 shadow-xs">
            <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Recommended Next Action</span>
            <p className="text-xs font-bold text-slate-900">Complete 10 Write from Dictation items to boost Listening to 84+</p>
          </div>
        </div>
      </div>

      {/* 4. Completed Attempts Log */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <h3 className="text-base font-extrabold text-slate-900">Completed Practice Attempts ({totalCompletedCount})</h3>
          <span className="text-xs font-semibold text-slate-500">Live Local Storage Persistence</span>
        </div>

        {totalCompletedCount === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs font-medium">
            No completed practice items recorded yet. Click any question item from Speaking, Writing, Reading, or Listening to start practicing!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] border-b border-slate-200">
                <tr>
                  <th className="p-3">Question ID</th>
                  <th className="p-3">Item Name</th>
                  <th className="p-3">Section</th>
                  <th className="p-3">GSE Score</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {completedIds.map((id) => {
                  const matchQ = PTEPracticeQuestions.find((q) => q.id === id);
                  const score = completedMap[id]?.score || 78;
                  return (
                    <tr key={id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 font-mono font-bold text-indigo-600">#{id}</td>
                      <td className="p-3 font-bold text-slate-900">{matchQ?.title || "PTE Practice Item"}</td>
                      <td className="p-3 uppercase font-semibold text-slate-500">{matchQ?.section || "General"}</td>
                      <td className="p-3 font-mono font-extrabold text-emerald-600">{score} / 90 GSE</td>
                      <td className="p-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                          ✓ Completed
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
