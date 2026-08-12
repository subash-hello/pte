'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Square, AlertTriangle, CheckSquare, Square as SquareIcon } from 'lucide-react';
import { clsx } from 'clsx';

export default function ListeningMCQMultiple() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const mockOptions = [
    { id: 'A', text: 'The speaker believes climate change is reversible.', isCorrect: false },
    { id: 'B', text: 'Immediate action is required from governments.', isCorrect: true },
    { id: 'C', text: 'Individual efforts have no impact on the environment.', isCorrect: false },
    { id: 'D', text: 'Renewable energy adoption is a key solution.', isCorrect: true }
  ];

  const toggleOption = (id: string) => {
    if (submitted) return;
    setSelectedOptions(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/dashboard" className="text-gray-400 hover:text-white flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-semibold text-white">Multiple-choice, Choose Multiple Answers</h1>
        </div>
        <div className="flex items-center gap-2 mb-6">
          <span className="text-gray-400 text-sm">Skills assessed: Listening</span>
          <span className="flex items-center gap-1 px-2 py-1 rounded bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
            <AlertTriangle className="w-3 h-3" /> Negative Marking
          </span>
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 mb-8 flex items-center gap-4">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center hover:bg-indigo-700 text-white"
          >
            {isPlaying ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-5 h-5 ml-1 fill-current" />}
          </button>
          <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
            <div className={clsx("h-full bg-indigo-500", isPlaying ? "w-1/2 transition-all duration-[5000ms]" : "w-0")} />
          </div>
        </div>

        <h3 className="text-xl font-medium text-white mb-4">Which of the following points are made by the speaker?</h3>
        
        <div className="space-y-3 mb-8">
          {mockOptions.map(opt => {
            const isSelected = selectedOptions.includes(opt.id);
            let statusClass = "bg-white/5 border-white/10";
            if (submitted) {
              if (opt.isCorrect && isSelected) statusClass = "bg-emerald-500/20 border-emerald-500/50 text-emerald-200";
              else if (opt.isCorrect && !isSelected) statusClass = "border-emerald-500/50 text-emerald-400";
              else if (!opt.isCorrect && isSelected) statusClass = "bg-red-500/20 border-red-500/50 text-red-200";
            } else if (isSelected) statusClass = "bg-indigo-500/20 border-indigo-500/50";

            return (
              <div 
                key={opt.id}
                onClick={() => toggleOption(opt.id)}
                className={clsx("flex items-start gap-3 p-4 rounded-xl border cursor-pointer", statusClass)}
              >
                <div className="mt-1">
                  {isSelected ? <CheckSquare className="w-5 h-5 text-indigo-400" /> : <SquareIcon className="w-5 h-5 text-gray-500" />}
                </div>
                <span>{opt.text}</span>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end">
          {!submitted ? (
            <button onClick={() => setSubmitted(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium">
              Submit Answer
            </button>
          ) : (
            <button className="bg-white hover:bg-gray-200 text-black px-6 py-2 rounded-lg font-medium">
              Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
