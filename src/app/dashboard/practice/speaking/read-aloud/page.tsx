'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mic, ChevronRight, CheckCircle, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { getQuestionsByTaskType } from '../../../../../lib/questions';
import PendingTrialGuard, { isQuestionLockedForUser, isPendingStudent } from '@/components/PendingTrialGuard';
import { Lock } from 'lucide-react';

export default function ReadAloudPage() {
  const questions = getQuestionsByTaskType('Read Aloud');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [phase, setPhase] = useState<'prep' | 'record' | 'result'>('prep');
  const [timeLeft, setTimeLeft] = useState(35);
  const [isRecording, setIsRecording] = useState(false);
  const [score, setScore] = useState<{ content: number; fluency: number; pronunciation: number } | null>(null);
  const [showLockModal, setShowLockModal] = useState(false);

  const question = questions[currentQuestionIdx] || {
    title: "Urban Transportation",
    promptText: "Cities around the world are investing heavily in public transportation systems to reduce traffic congestion and air pollution. Modern metro networks, electric buses, and dedicated bicycle lanes are becoming increasingly common in major urban centers.",
    timeLimit: 40
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (phase === 'prep' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (phase === 'prep' && timeLeft === 0) {
      setPhase('record');
      setTimeLeft(question.timeLimit || 40);
      setIsRecording(true);
    } else if (phase === 'record' && timeLeft > 0 && isRecording) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (phase === 'record' && timeLeft === 0) {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [phase, timeLeft, isRecording, question.timeLimit]);

  const handleSubmit = () => {
    setIsRecording(false);
    setTimeout(() => {
      setScore({
        content: 5,
        fluency: 5,
        pronunciation: 4,
      });
      setPhase('result');
    }, 1500);
  };

  const handleNext = () => {
    if (isPendingStudent() && currentQuestionIdx >= 0) {
      setShowLockModal(true);
      return;
    }
    if (currentQuestionIdx < questions.length - 1) {
      const nextIdx = currentQuestionIdx + 1;
      setCurrentQuestionIdx(nextIdx);
      setPhase('prep');
      setTimeLeft(35);
      setScore(null);
    }
  };

  const handleRetry = () => {
    setPhase('prep');
    setTimeLeft(35);
    setScore(null);
  };

  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col gap-6 text-slate-900">
      <PendingTrialGuard currentQuestionIndex={currentQuestionIdx} isOpen={showLockModal} onClose={() => setShowLockModal(false)} />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2.5 bg-white hover:bg-slate-50 rounded-xl transition-colors border border-slate-200/80 shadow-2xs">
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              Read Aloud
              <span className="text-xs px-2.5 py-0.5 bg-indigo-50 text-indigo-600 font-semibold rounded-md border border-indigo-100">Speaking & Reading</span>
            </h1>
            <div className="flex gap-2 mt-1">
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200/60">Reading</span>
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">Speaking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Question Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {questions.map((q, idx) => {
          const locked = isQuestionLockedForUser(idx);
          return (
            <button
              key={idx}
              onClick={() => {
                if (locked) {
                  setShowLockModal(true);
                  return;
                }
                setCurrentQuestionIdx(idx);
                setPhase('prep');
                setTimeLeft(35);
                setScore(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 border flex items-center gap-1.5 ${
                locked
                  ? 'bg-amber-50/80 text-amber-700 border-amber-200/80 hover:bg-amber-100/80 cursor-pointer'
                  : currentQuestionIdx === idx
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200/80 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {locked && <Lock className="w-3 h-3 text-amber-600 shrink-0" />}
              {q.difficulty} • {q.title || `Set ${idx + 1}`} {locked ? '(Locked)' : ''}
            </button>
          );
        })}
      </div>

      {/* Main Practice Area */}
      <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-8 lg:p-10 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-500"></div>
        
        <div className="flex flex-col items-center mb-8">
          <div className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">
            {phase === 'prep' ? 'Preparation Time' : phase === 'record' ? 'Recording Active' : 'AI Score Diagnostic'}
          </div>
          
          {phase !== 'result' && (
            <div className={`relative flex items-center justify-center w-28 h-28 rounded-full border-4 ${
              phase === 'prep' ? 'border-amber-400' : 'border-rose-500'
            }`}>
              <span className="text-3xl font-mono font-black text-slate-900">
                {formatTime(timeLeft)}
              </span>
            </div>
          )}
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 lg:p-8 border border-slate-200/80 mb-8">
          <p className="text-lg leading-relaxed text-slate-900 font-extrabold">
            {question.promptText}
          </p>
        </div>

        {/* Controls / Feedback */}
        <div className="flex justify-center mt-8">
          {phase === 'prep' && (
            <button 
              onClick={() => { setPhase('record'); setTimeLeft(question.timeLimit || 40); setIsRecording(true); }}
              className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 text-sm"
            >
              <Mic className="w-5 h-5" />
              Skip Prep & Record Now
            </button>
          )}

          {phase === 'record' && (
            <button 
              onClick={handleSubmit}
              className="px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 text-sm"
            >
              <CheckCircle className="w-5 h-5" />
              Submit Answer
            </button>
          )}

          {phase === 'result' && score && (
            <div className="w-full flex flex-col items-center">
              <div className="grid grid-cols-3 gap-5 w-full max-w-2xl mb-8">
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex flex-col items-center justify-center">
                  <span className="text-slate-500 text-xs font-bold uppercase mb-1">Content</span>
                  <span className="text-3xl font-mono font-black text-emerald-600">{score.content}<span className="text-sm text-slate-400">/5</span></span>
                </div>
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex flex-col items-center justify-center">
                  <span className="text-slate-500 text-xs font-bold uppercase mb-1">Oral Fluency</span>
                  <span className="text-3xl font-mono font-black text-indigo-600">{score.fluency}<span className="text-sm text-slate-400">/5</span></span>
                </div>
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex flex-col items-center justify-center">
                  <span className="text-slate-500 text-xs font-bold uppercase mb-1">Pronunciation</span>
                  <span className="text-3xl font-mono font-black text-sky-600">{score.pronunciation}<span className="text-sm text-slate-400">/5</span></span>
                </div>
              </div>

              {question.explanation && (
                <div className="mb-6 w-full max-w-2xl bg-indigo-50/60 p-4 rounded-xl border border-indigo-100 text-xs font-bold text-slate-800">
                  💡 <span className="text-indigo-600 uppercase tracking-wider font-extrabold mr-1">AI Tip:</span> {question.explanation}
                </div>
              )}

              <div className="flex gap-4">
                <button 
                  onClick={handleRetry}
                  className="px-6 py-3 bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-700 font-bold rounded-xl transition-all flex items-center gap-2 text-sm"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Try Again
                </button>
                <button 
                  onClick={handleNext}
                  disabled={currentQuestionIdx === questions.length - 1}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 text-sm"
                >
                  Next Question
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
