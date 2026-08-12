'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Square, CheckCircle2, XCircle } from 'lucide-react';
import { clsx } from 'clsx';

export default function ListeningFillBlanks() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({ b1: '', b2: '' });

  const mockData = {
    text: "The professor emphasized the {b1} of understanding historical context. Without it, modern events can seem completely {b2}.",
    correct: { b1: 'importance', b2: 'random' }
  };

  const renderText = () => {
    return mockData.text.split(/(\{b\d+\})/).map((part, i) => {
      const match = part.match(/^\{b(\d+)\}$/);
      if (match) {
        const id = `b${match[1]}`;
        const isCorrect = answers[id]?.toLowerCase().trim() === mockData.correct[id as keyof typeof mockData.correct];
        return (
          <span key={i} className="inline-block mx-1 align-middle">
            <input
              type="text"
              value={answers[id]}
              onChange={(e) => !submitted && setAnswers(prev => ({ ...prev, [id]: e.target.value }))}
              disabled={submitted}
              className={clsx(
                "w-32 bg-white/10 border-b-2 border-white/30 px-2 py-1 text-center focus:outline-none focus:border-indigo-500",
                submitted && (isCorrect ? "border-emerald-500 text-emerald-400" : "border-red-500 text-red-400")
              )}
            />
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="space-y-6">
      <Link href="/dashboard" className="text-gray-400 hover:text-white flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
        <h1 className="text-2xl font-semibold text-white mb-2">Fill in the Blanks</h1>
        <p className="text-gray-400 text-sm mb-6">Skills assessed: Listening, Writing</p>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4 mb-8 flex items-center gap-4 w-max">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white"
          >
            {isPlaying ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 ml-1 fill-current" />}
          </button>
          <span className="text-gray-400 text-sm">Audio Track</span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 text-xl leading-relaxed leading-loose">
          {renderText()}
        </div>

        {submitted && (
          <div className="mb-6 p-4 rounded-xl border border-white/10 bg-[#0a0a0a] space-y-2">
            <h3 className="font-semibold text-white">Review</h3>
            {Object.entries(mockData.correct).map(([id, correctAns]) => (
              <div key={id} className="text-sm flex gap-2 items-center">
                <span className="text-gray-400">Blank {id.replace('b', '')}:</span>
                {answers[id]?.toLowerCase().trim() === correctAns ? 
                  <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Correct</span> :
                  <span className="text-red-400 flex items-center gap-1"><XCircle className="w-4 h-4"/> Correct answer: {correctAns}</span>
                }
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end">
          {!submitted ? (
            <button onClick={() => setSubmitted(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium">Submit Answer</button>
          ) : (
            <button className="bg-white hover:bg-gray-200 text-black px-6 py-2 rounded-lg font-medium">Next Question</button>
          )}
        </div>
      </div>
    </div>
  );
}
