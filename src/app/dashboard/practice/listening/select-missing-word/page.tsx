'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Square, CircleDot, Circle } from 'lucide-react';
import { clsx } from 'clsx';

export default function SelectMissingWord() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const mockOptions = [
    { id: 'A', text: 'discovered', isCorrect: false },
    { id: 'B', text: 'ignored', isCorrect: false },
    { id: 'C', text: 'understood', isCorrect: true },
    { id: 'D', text: 'abandoned', isCorrect: false }
  ];

  return (
    <div className="space-y-6">
      <Link href="/dashboard" className="text-gray-400 hover:text-white flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
        <h1 className="text-2xl font-semibold text-white mb-2">Select Missing Word</h1>
        <p className="text-gray-400 text-sm mb-6">Skills assessed: Listening</p>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 mb-8 flex items-center gap-4 relative overflow-hidden">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white z-10"
          >
            {isPlaying ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-5 h-5 ml-1 fill-current" />}
          </button>
          <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden z-10">
            <div className={clsx("h-full bg-indigo-500", isPlaying ? "w-full transition-all duration-[5000ms]" : "w-0")} />
          </div>
          {isPlaying && <div className="absolute right-4 text-xs font-mono text-amber-500 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/30 animate-pulse z-10">Beep!</div>}
        </div>

        <h3 className="text-lg font-medium text-white mb-4">Select the missing word (replaced by a beep):</h3>
        
        <div className="space-y-3 mb-8">
          {mockOptions.map(opt => {
            const isSelected = selected === opt.id;
            let statusClass = "bg-white/5 border-white/10 hover:bg-white/10";
            if (submitted) {
              if (opt.isCorrect && isSelected) statusClass = "bg-emerald-500/20 border-emerald-500/50 text-emerald-200";
              else if (opt.isCorrect && !isSelected) statusClass = "border-emerald-500/50 text-emerald-400";
              else if (!opt.isCorrect && isSelected) statusClass = "bg-red-500/20 border-red-500/50 text-red-200";
            } else if (isSelected) statusClass = "bg-indigo-500/20 border-indigo-500/50";

            return (
              <div 
                key={opt.id}
                onClick={() => !submitted && setSelected(opt.id)}
                className={clsx("flex items-start gap-3 p-4 rounded-xl border cursor-pointer", statusClass)}
              >
                <div className="mt-1">
                  {isSelected ? <CircleDot className="w-5 h-5 text-indigo-400" /> : <Circle className="w-5 h-5 text-gray-500" />}
                </div>
                <span>{opt.text}</span>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end">
          {!submitted ? (
            <button onClick={() => setSubmitted(true)} disabled={!selected} className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium">Submit Answer</button>
          ) : (
            <button className="bg-white hover:bg-gray-200 text-black px-6 py-2 rounded-lg font-medium">Next Question</button>
          )}
        </div>
      </div>
    </div>
  );
}
