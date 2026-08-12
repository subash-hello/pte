'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, CircleDot, Circle } from 'lucide-react';
import { clsx } from 'clsx';

const mockQuestions = [
  {
    id: 1,
    text: "The discovery of penicillin by Alexander Fleming in 1928 revolutionized medicine. However, it was not until the 1940s that it was mass-produced and used to treat infections in soldiers during World War II. The development of antibiotics has saved millions of lives, though the rise of antibiotic resistance poses a new challenge for modern science.",
    question: "According to the passage, when was penicillin mass-produced for medical use?",
    options: [
      { id: 'A', text: 'In 1928', isCorrect: false },
      { id: 'B', text: 'During World War I', isCorrect: false },
      { id: 'C', text: 'In the 1940s', isCorrect: true },
      { id: 'D', text: 'In modern times', isCorrect: false },
    ]
  }
];

export default function MCQSingle() {
  const [currentQIndex] = useState(0);
  const currentQ = mockQuestions[currentQIndex];
  
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    const isCorrect = currentQ.options.find(o => o.id === selectedOption)?.isCorrect;
    setScore(isCorrect ? 1 : 0);
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/dashboard" className="text-gray-400 hover:text-white flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <div className="flex items-center gap-2 text-indigo-400 font-mono">
          <Clock className="w-4 h-4" /> 02:00
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
        <h1 className="text-2xl font-semibold text-white mb-2">Multiple-choice, Choose Single Answer</h1>
        <p className="text-gray-400 text-sm mb-6">Skills assessed: Reading</p>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 text-lg leading-relaxed text-gray-200">
          {currentQ.text}
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-medium text-white mb-4">{currentQ.question}</h3>
          <div className="space-y-3">
            {currentQ.options.map(opt => {
              const isSelected = selectedOption === opt.id;
              let statusClass = "bg-white/5 border-white/10 hover:bg-white/10";
              if (submitted) {
                if (opt.isCorrect && isSelected) statusClass = "bg-emerald-500/20 border-emerald-500/50 text-emerald-200";
                else if (opt.isCorrect && !isSelected) statusClass = "border-emerald-500/50 text-emerald-400";
                else if (!opt.isCorrect && isSelected) statusClass = "bg-red-500/20 border-red-500/50 text-red-200";
                else statusClass = "bg-white/5 border-white/10 opacity-50";
              } else if (isSelected) {
                statusClass = "bg-indigo-500/20 border-indigo-500/50";
              }

              return (
                <div 
                  key={opt.id}
                  onClick={() => !submitted && setSelectedOption(opt.id)}
                  className={clsx(
                    "flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer",
                    statusClass
                  )}
                >
                  <div className="mt-1">
                    {isSelected ? <CircleDot className="w-5 h-5 text-indigo-400" /> : <Circle className="w-5 h-5 text-gray-500" />}
                  </div>
                  <span className="text-base">{opt.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {submitted && (
          <div className="mb-6 p-4 rounded-xl border border-white/10 bg-[#0a0a0a]">
            <h3 className="text-lg font-semibold text-white">Score: <span className="text-indigo-400 font-mono">{score} / 1</span></h3>
          </div>
        )}

        <div className="flex justify-end">
          {!submitted ? (
            <button 
              onClick={handleSubmit}
              disabled={!selectedOption}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Submit Answer
            </button>
          ) : (
            <button className="bg-white hover:bg-gray-200 text-black px-6 py-2 rounded-lg font-medium transition-colors">
              Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
