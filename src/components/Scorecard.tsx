"use client";

import React from "react";

interface ScorecardProps {
  testName: string;
  speakingScore: number;
  writingScore: number;
  readingScore: number;
  listeningScore: number;
  enablingSkills: {
    fluency: number;
    pronunciation: number;
    grammar: number;
    vocabulary: number;
    spelling: number;
    writtenDiscourse: number;
  };
  onRestartTest?: () => void;
}

export default function Scorecard({
  testName,
  speakingScore,
  writingScore,
  readingScore,
  listeningScore,
  enablingSkills,
  onRestartTest,
}: ScorecardProps) {
  const overallScore = Math.round(
    (speakingScore + writingScore + readingScore + listeningScore) / 4
  );

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm max-w-4xl mx-auto flex flex-col gap-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full">
            Official PTE GSE Score Report
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2">{testName}</h1>
          <p className="text-xs text-slate-500 mt-1">
            Standard 10–90 GSE Scale Performance Diagnostics
          </p>
        </div>

        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl px-8 py-5 shadow-lg shadow-indigo-500/20">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-100">Overall Score</span>
          <span className="text-5xl font-extrabold font-mono">{overallScore}</span>
          <span className="text-[10px] text-indigo-200 uppercase mt-1 font-bold">Out of 90 GSE</span>
        </div>
      </div>

      {/* 4 Communicative Skills Cards */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
          Communicative Skills Breakdown
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-col items-center">
            <span className="text-xs text-slate-500 font-bold">Speaking</span>
            <span className="text-3xl font-extrabold font-mono text-emerald-600 my-1">{speakingScore}</span>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full" style={{ width: `${(speakingScore / 90) * 100}%` }} />
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-col items-center">
            <span className="text-xs text-slate-500 font-bold">Writing</span>
            <span className="text-3xl font-extrabold font-mono text-blue-600 my-1">{writingScore}</span>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full" style={{ width: `${(writingScore / 90) * 100}%` }} />
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-col items-center">
            <span className="text-xs text-slate-500 font-bold">Reading</span>
            <span className="text-3xl font-extrabold font-mono text-indigo-600 my-1">{readingScore}</span>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full" style={{ width: `${(readingScore / 90) * 100}%` }} />
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-col items-center">
            <span className="text-xs text-slate-500 font-bold">Listening</span>
            <span className="text-3xl font-extrabold font-mono text-amber-600 my-1">{listeningScore}</span>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full" style={{ width: `${(listeningScore / 90) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Enabling Skills Progress Bars */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
          Enabling Skills Diagnostics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(enablingSkills).map(([skill, val]) => (
            <div key={skill} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-700 capitalize font-bold">
                  {skill.replace(/([A-Z])/g, " $1")}
                </span>
                <span className="font-mono font-bold text-slate-900">{val} / 90</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-500"
                  style={{ width: `${(val / 90) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      {onRestartTest && (
        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            onClick={onRestartTest}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-md shadow-indigo-500/20"
          >
            Take Another Practice Test
          </button>
        </div>
      )}
    </div>
  );
}
