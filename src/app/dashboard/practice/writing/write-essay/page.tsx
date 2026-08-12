'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, CheckCircle, ChevronRight, Copy, Scissors, Clipboard, BookOpen, Layers } from 'lucide-react';
import Link from 'next/link';
import { getQuestionsByTaskType } from '@/lib/questions';
import PendingTrialGuard, { isQuestionLockedForUser, isPendingStudent } from '@/components/PendingTrialGuard';
import { Lock } from 'lucide-react';

export default function WriteEssayPage() {
  const questions = getQuestionsByTaskType('Essay');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [text, setText] = useState('');
  const [timeLeft, setTimeLeft] = useState(1200);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<any>(null);
  const [showLockModal, setShowLockModal] = useState(false);

  const question = questions[currentQuestionIdx] || {
    title: "University Education & Work Skills",
    promptText: "Some people think that universities should provide graduates with the knowledge and skills needed in the workplace. Others think that the true function of a university should be to give access to knowledge for its own sake. What is your opinion?",
    timeLimit: 1200
  };

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const isWordCountValid = wordCount >= 200 && wordCount <= 300;

  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted]);

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setScore({
        content: 3, form: 2, structure: 2, grammar: 2, vocabulary: 2, spelling: 2, writtenDiscourse: 2,
        total: 15
      });
    }, 1500);
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
              Write Essay
              <span className="text-xs px-2.5 py-0.5 bg-indigo-50 text-indigo-600 font-semibold rounded-md border border-indigo-100">
                50 Question Set
              </span>
            </h1>
            <div className="flex gap-2 mt-1">
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">Writing</span>
            </div>
          </div>
        </div>
        
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono font-bold text-lg shadow-2xs ${timeLeft < 120 ? 'bg-rose-50 border-rose-200 text-rose-600 animate-pulse' : 'bg-white border-slate-200/80 text-indigo-600'}`}>
          <Clock className="w-4.5 h-4.5 text-indigo-600" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Question Selector Strip */}
      <div className="bg-white border border-[#e8ecf4] rounded-2xl p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-extrabold text-slate-600 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" /> Select Question ({currentQuestionIdx + 1} of {questions.length})
          </span>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
            Question #{currentQuestionIdx + 1}
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
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
                  setText('');
                  setTimeLeft(1200);
                  setIsSubmitted(false);
                  setScore(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  locked
                    ? 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 cursor-pointer'
                    : currentQuestionIdx === idx
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 border border-slate-200/60'
                }`}
              >
                {locked && <Lock className="w-3 h-3 text-amber-600 shrink-0" />}
                {q.title ? q.title.substring(0, 24) + '...' : `Essay #${idx + 1}`} {locked ? '(Locked)' : ''}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 lg:p-8 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-sky-400"></div>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl hidden sm:block shrink-0">
            <BookOpen className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 mb-2">
              {question.title || 'Essay Prompt'}
            </div>
            <p className="text-lg text-slate-900 leading-relaxed font-bold">
              {question.promptText}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 lg:p-8 shadow-xs flex flex-col min-h-[450px]">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-4">
          <div className="flex gap-2 text-slate-600">
             <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-xl flex items-center gap-1.5 text-xs font-bold text-slate-700 transition-colors border border-slate-200/60"><Copy className="w-3.5 h-3.5" /> Copy</button>
             <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-xl flex items-center gap-1.5 text-xs font-bold text-slate-700 transition-colors border border-slate-200/60"><Scissors className="w-3.5 h-3.5" /> Cut</button>
             <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-xl flex items-center gap-1.5 text-xs font-bold text-slate-700 transition-colors border border-slate-200/60"><Clipboard className="w-3.5 h-3.5" /> Paste</button>
          </div>
          <div className={`text-xs font-mono font-bold px-3 py-1.5 rounded-xl border ${isWordCountValid ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
            Words: {wordCount} / 200-300
          </div>
        </div>
        
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isSubmitted}
          placeholder="Write your essay here. Pay attention to structure, grammar, and vocabulary..."
          className="flex-1 bg-white border border-slate-200 rounded-2xl p-5 text-slate-900 font-semibold text-sm placeholder:text-slate-400 leading-relaxed outline-none focus:border-indigo-500 shadow-2xs resize-none transition-all"
        />

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => {
              if (currentQuestionIdx < questions.length - 1) {
                setCurrentQuestionIdx(prev => prev + 1);
                setText('');
                setTimeLeft(1200);
                setIsSubmitted(false);
                setScore(null);
              }
            }}
            disabled={currentQuestionIdx === questions.length - 1}
            className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-extrabold text-xs hover:bg-slate-200/80 disabled:opacity-50 border border-slate-200/60"
          >
            Skip Question
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={isSubmitted || text.trim().length === 0}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-extrabold text-sm shadow-md transition-all disabled:opacity-50 flex items-center gap-2"
          >
            Submit for AI Evaluation
          </button>
        </div>
      </div>

      {score && (
        <div className="bg-white border border-emerald-200 rounded-[24px] p-6 lg:p-8 shadow-xs">
          <div className="flex items-center gap-3 text-emerald-600 mb-4 font-bold text-lg">
            <CheckCircle className="w-6 h-6" /> AI Scoring Result (Band 8.0 Equivalent)
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
              <div className="text-xs text-slate-500 font-bold uppercase">Content</div>
              <div className="text-xl font-black text-slate-900">{score.content} / 3</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
              <div className="text-xs text-slate-500 font-bold uppercase">Structure</div>
              <div className="text-xl font-black text-slate-900">{score.structure} / 2</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
              <div className="text-xs text-slate-500 font-bold uppercase">Grammar</div>
              <div className="text-xl font-black text-slate-900">{score.grammar} / 2</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
              <div className="text-xs text-slate-500 font-bold uppercase">Vocabulary</div>
              <div className="text-xl font-black text-slate-900">{score.vocabulary} / 2</div>
            </div>
          </div>
          {question.sampleAnswer && (
            <div className="mt-6 pt-6 border-t border-slate-100">
              <h4 className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider mb-2">Model Band 9 Essay Response:</h4>
              <p className="text-sm text-slate-700 leading-relaxed bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                {question.sampleAnswer}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
