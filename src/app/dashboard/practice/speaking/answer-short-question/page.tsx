'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight, CheckCircle, Volume2, XCircle } from 'lucide-react';
import Link from 'next/link';

const SAMPLE_QUESTIONS = [
  { id: 1, question: "What do we call the person who treats sick animals?", answer: "Veterinarian" },
  { id: 2, question: "What is the term for a book written about a person's life by that same person?", answer: "Autobiography" },
  { id: 3, question: "Which instrument is used to measure temperature?", answer: "Thermometer" },
  { id: 4, question: "What do you call a piece of land surrounded by water on all sides?", answer: "Island" },
  { id: 5, question: "What is the general term for paintings, drawings, and sculptures?", answer: "Art" }
];

export default function AnswerShortQuestionPage() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [phase, setPhase] = useState<'listen' | 'record' | 'result'>('listen');
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState<number | null>(null);

  const question = SAMPLE_QUESTIONS[currentQuestionIdx];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (phase === 'record' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (phase === 'record' && timeLeft === 0) {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [phase, timeLeft]);

  const handleStartAudio = () => {
    setTimeout(() => {
      setPhase('record');
      setTimeLeft(10);
    }, 3000);
  };

  const handleSubmit = () => {
    setScore(Math.random() > 0.3 ? 1 : 0);
    setPhase('result');
  };

  const handleNext = () => {
    if (currentQuestionIdx < SAMPLE_QUESTIONS.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setPhase('listen');
      setScore(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 text-slate-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2.5 bg-white hover:bg-slate-50 rounded-xl transition-colors border border-slate-200/80 shadow-2xs">
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Answer Short Question</h1>
            <div className="flex gap-2 mt-1">
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200/60">Listening</span>
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">Speaking</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full">
        <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-8 shadow-xs relative overflow-hidden text-center h-[400px] flex flex-col justify-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-sky-400"></div>

          {phase === 'listen' && (
            <div className="animate-in fade-in">
              <div className="w-16 h-16 bg-indigo-50 border border-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Volume2 className="w-8 h-8 text-indigo-600 animate-pulse" />
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 mb-8">Listen to the question...</h2>
              <button onClick={handleStartAudio} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white font-bold text-xs shadow-sm transition-all">
                Play Audio (Mock)
              </button>
            </div>
          )}

          {phase === 'record' && (
            <div className="animate-in fade-in zoom-in">
              <div className="text-rose-600 font-bold text-xs mb-4 animate-pulse flex items-center justify-center gap-2">
                <span className="w-2.5 h-2.5 bg-rose-500 rounded-full"></span>
                Recording Active
              </div>
              <div className="text-6xl font-mono font-black text-slate-900 mb-8">{timeLeft}s</div>
              <button onClick={handleSubmit} className="px-8 py-3.5 bg-rose-600 hover:bg-rose-700 rounded-xl font-bold text-xs text-white shadow-sm transition-all">
                Submit Answer
              </button>
            </div>
          )}

          {phase === 'result' && (
            <div className="animate-in slide-in-from-bottom-4">
              <div className="mb-6">
                {score === 1 ? (
                  <div className="flex flex-col items-center text-emerald-600">
                    <CheckCircle className="w-14 h-14 mb-2" />
                    <span className="text-xl font-extrabold">Correct (1/1)</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-rose-600">
                    <XCircle className="w-14 h-14 mb-2" />
                    <span className="text-xl font-extrabold">Incorrect (0/1)</span>
                  </div>
                )}
              </div>
              
              <div className="bg-slate-50 p-5 rounded-2xl text-left border border-slate-200/80 mb-6">
                <div className="mb-3">
                  <span className="text-slate-500 text-xs font-bold uppercase">Question:</span>
                  <p className="text-slate-900 text-sm font-extrabold mt-0.5">{question.question}</p>
                </div>
                <div>
                  <span className="text-slate-500 text-xs font-bold uppercase">Correct Answer:</span>
                  <p className="text-emerald-600 text-sm font-mono font-black mt-0.5">{question.answer}</p>
                </div>
              </div>

              <button onClick={handleNext} disabled={currentQuestionIdx === SAMPLE_QUESTIONS.length - 1} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 mx-auto shadow-sm">
                Next Question <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
