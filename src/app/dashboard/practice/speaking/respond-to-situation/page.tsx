'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mic, ChevronRight, CheckCircle, RefreshCcw, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const SAMPLE_QUESTIONS = [
  { id: 1, scenario: "You are a team leader and a colleague missed an important deadline, causing a delay in the project. You need to speak to them about this.", context: "Address the issue professionally, explain the impact, and suggest a way forward.", prepTime: 10, recordTime: 40 },
  { id: 2, scenario: "You borrowed a book from your professor and accidentally spilled coffee on it. You are returning it today.", context: "Apologize for the damage and offer a solution to replace or compensate for the book.", prepTime: 10, recordTime: 40 },
  { id: 3, scenario: "Your neighbor's dog barks constantly during the night, keeping you awake. You decide to talk to your neighbor.", context: "Politely explain the problem and ask if they can keep the dog inside at night.", prepTime: 10, recordTime: 40 }
];

export default function RespondToSituationPage() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [phase, setPhase] = useState<'prep' | 'record' | 'result'>('prep');
  const [timeLeft, setTimeLeft] = useState(SAMPLE_QUESTIONS[0].prepTime);
  const [score, setScore] = useState<{ content: number; fluency: number; pronunciation: number } | null>(null);

  const question = SAMPLE_QUESTIONS[currentQuestionIdx];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (phase === 'prep' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (phase === 'prep' && timeLeft === 0) {
      setPhase('record');
      setTimeLeft(question.recordTime);
    } else if (phase === 'record' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (phase === 'record' && timeLeft === 0) {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [phase, timeLeft, question.recordTime]);

  const handleSubmit = () => {
    setTimeout(() => {
      setScore({ content: 4, fluency: 4, pronunciation: 4 });
      setPhase('result');
    }, 1500);
  };

  const handleNext = () => {
    if (currentQuestionIdx < SAMPLE_QUESTIONS.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setPhase('prep');
      setTimeLeft(SAMPLE_QUESTIONS[currentQuestionIdx + 1].prepTime);
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
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              Respond to a Situation
              <span className="text-[9px] font-black uppercase bg-rose-500 text-white px-2 py-0.5 rounded-full">NEW</span>
            </h1>
            <div className="flex gap-2 mt-1">
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">Speaking</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 shadow-2xs">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs font-bold text-amber-900 leading-relaxed">
          Warning: Templates and memorized scripts will be penalized by the AI scoring system. Provide a natural, context-appropriate response.
        </p>
      </div>

      <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-8 lg:p-10 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-indigo-600 to-pink-500"></div>

        <div className="mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
          <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">Scenario</h3>
          <p className="text-lg text-slate-900 font-extrabold mb-4 leading-relaxed">{question.scenario}</p>
          <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-1">Task Context</h3>
          <p className="text-slate-700 text-xs font-semibold italic leading-relaxed">{question.context}</p>
        </div>

        <div className="flex flex-col items-center">
          {phase === 'prep' && (
            <div className="text-center animate-in fade-in">
              <p className="text-slate-500 uppercase tracking-wider text-xs font-bold mb-3">Preparation Time</p>
              <div className="text-5xl font-mono font-black text-amber-500 mb-6">{timeLeft}s</div>
              <button onClick={() => { setPhase('record'); setTimeLeft(question.recordTime); }} className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-200/80">
                Skip & Record Now
              </button>
            </div>
          )}

          {phase === 'record' && (
            <div className="text-center animate-in zoom-in">
              <p className="text-rose-600 font-bold text-xs uppercase tracking-wider mb-3 flex items-center justify-center gap-2">
                <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse"></span>
                Recording Active
              </p>
              <div className="text-5xl font-mono font-black text-slate-900 mb-6">{timeLeft}s</div>
              <button onClick={handleSubmit} className="px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm">
                <CheckCircle className="w-4.5 h-4.5" /> Submit Response
              </button>
            </div>
          )}

          {phase === 'result' && score && (
            <div className="w-full animate-in slide-in-from-bottom-4">
               <div className="grid grid-cols-3 gap-5 w-full max-w-2xl mx-auto mb-8">
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex flex-col items-center justify-center">
                  <span className="text-slate-500 text-xs font-bold uppercase mb-1">Content</span>
                  <span className="text-3xl font-mono font-black text-emerald-600">{score.content}/5</span>
                </div>
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex flex-col items-center justify-center">
                  <span className="text-slate-500 text-xs font-bold uppercase mb-1">Fluency</span>
                  <span className="text-3xl font-mono font-black text-indigo-600">{score.fluency}/5</span>
                </div>
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex flex-col items-center justify-center">
                  <span className="text-slate-500 text-xs font-bold uppercase mb-1">Pronunciation</span>
                  <span className="text-3xl font-mono font-black text-sky-600">{score.pronunciation}/5</span>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button onClick={() => { setPhase('prep'); setTimeLeft(question.prepTime); setScore(null); }} className="px-6 py-3 bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-2">
                  <RefreshCcw className="w-4 h-4" /> Retry
                </button>
                <button onClick={handleNext} disabled={currentQuestionIdx === SAMPLE_QUESTIONS.length - 1} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm">
                  Next Scenario <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
