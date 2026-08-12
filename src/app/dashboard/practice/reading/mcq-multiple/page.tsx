'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, AlertTriangle, CheckSquare, Square } from 'lucide-react';
import { clsx } from 'clsx';

const mockQuestions = [
  {
    id: 1,
    text: "The industrial revolution marked a major turning point in history. Almost every aspect of daily life was influenced in some way. In particular, average income and population began to exhibit unprecedented sustained growth. Some economists say that the major impact of the Industrial Revolution was that the standard of living for the general population began to increase consistently for the first time in history.",
    question: "According to the text, which of the following statements about the Industrial Revolution are true?",
    options: [
      { id: 'A', text: 'It had a negligible impact on daily life.', isCorrect: false },
      { id: 'B', text: 'It caused a sustained growth in average income.', isCorrect: true },
      { id: 'C', text: 'It led to a decrease in population.', isCorrect: false },
      { id: 'D', text: 'It consistently improved the standard of living for the general population.', isCorrect: true },
    ]
  }
];

export default function MCQMultiple() {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = mockQuestions[currentQIndex];

  const toggleOption = (id: string) => {
    if (submitted) return;
    setSelectedOptions(prev => 
      prev.includes(id) ? prev.filter(optId => optId !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    let currentScore = 0;
    currentQ.options.forEach(opt => {
      if (opt.isCorrect && selectedOptions.includes(opt.id)) currentScore += 1;
      if (!opt.isCorrect && selectedOptions.includes(opt.id)) currentScore -= 1;
    });
    setScore(Math.max(0, currentScore));
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/dashboard" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <div className="flex items-center gap-2 text-indigo-400 font-mono">
          <Clock className="w-4 h-4" /> 02:00
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-semibold text-white">Multiple-choice, Choose Multiple Answers</h1>
        </div>
        
        <div className="flex items-center gap-2 mb-6">
          <span className="text-gray-400 text-sm">Skills assessed: Reading</span>
          <span className="flex items-center gap-1 px-2 py-1 rounded bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
            <AlertTriangle className="w-3 h-3" /> Negative Marking
          </span>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 text-lg leading-relaxed text-gray-200">
          {currentQ.text}
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-medium text-white mb-4">{currentQ.question}</h3>
          <div className="space-y-3">
            {currentQ.options.map(opt => {
              const isSelected = selectedOptions.includes(opt.id);
              let statusClass = "bg-white/5 border-white/10 hover:bg-white/10";
              if (submitted) {
                if (opt.isCorrect && isSelected) statusClass = "bg-emerald-500/20 border-emerald-500/50 text-emerald-200";
                else if (opt.isCorrect && !isSelected) statusClass = "border-emerald-500/50 text-emerald-400"; // Missed correct answer
                else if (!opt.isCorrect && isSelected) statusClass = "bg-red-500/20 border-red-500/50 text-red-200";
                else statusClass = "bg-white/5 border-white/10 opacity-50";
              } else if (isSelected) {
                statusClass = "bg-indigo-500/20 border-indigo-500/50";
              }

              return (
                <div 
                  key={opt.id}
                  onClick={() => toggleOption(opt.id)}
                  className={clsx(
                    "flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer",
                    statusClass
                  )}
                >
                  <div className="mt-1">
                    {isSelected ? <CheckSquare className="w-5 h-5 text-indigo-400" /> : <Square className="w-5 h-5 text-gray-500" />}
                  </div>
                  <span className="text-base">{opt.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {submitted && (
          <div className="mb-6 p-4 rounded-xl border border-white/10 bg-[#0a0a0a]">
            <h3 className="text-lg font-semibold text-white">
              Score: <span className="text-indigo-400 font-mono">{score}</span>
            </h3>
            <p className="text-sm text-gray-400 mt-1">You get +1 for each correct option and -1 for each incorrect option (minimum score is 0).</p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">
            Question {currentQIndex + 1} of {mockQuestions.length}
          </div>
          <div>
            {!submitted ? (
              <button 
                onClick={handleSubmit}
                disabled={selectedOptions.length === 0}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Submit Answer
              </button>
            ) : (
              <button 
                className="bg-white hover:bg-gray-200 text-black px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Next Question
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
