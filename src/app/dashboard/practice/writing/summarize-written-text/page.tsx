'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, AlertCircle, CheckCircle, ChevronRight, Copy, Scissors, Clipboard, Layers } from 'lucide-react';
import Link from 'next/link';
import { getQuestionsByTaskType } from '@/lib/questions';

export default function SummarizeWrittenTextPage() {
  const questions = getQuestionsByTaskType('Summarize Written Text');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [text, setText] = useState('');
  const [timeLeft, setTimeLeft] = useState(600);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<any>(null);

  const question = questions[currentQuestionIdx] || {
    title: "Urban Green Spaces and Mental Well-being",
    promptText: "Recent urban planning studies indicate that access to green spaces such as public parks, botanical gardens, and tree-lined streets exerts a profound positive impact on human psychological health.",
    timeLimit: 600
  };

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const isWordCountValid = wordCount >= 5 && wordCount <= 75;

  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted]);

  useEffect(() => {
    if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      const sentenceCount = (text.match(/[.!?]+/g) || []).length;
      const formScore = sentenceCount === 1 ? 1 : 0;
      setScore({
        content: 2,
        form: formScore,
        grammar: 2,
        vocabulary: 2,
        total: 2 + formScore + 4
      });
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
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
              Summarize Written Text
              <span className="text-xs px-2.5 py-0.5 bg-indigo-50 text-indigo-600 font-semibold rounded-md border border-indigo-100">
                50 Question Set
              </span>
            </h1>
            <div className="flex gap-2 mt-1">
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200/60">Reading</span>
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">Writing</span>
            </div>
          </div>
        </div>
        
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono font-bold text-lg shadow-2xs ${timeLeft < 60 ? 'bg-rose-50 border-rose-200 text-rose-600 animate-pulse' : 'bg-white border-slate-200/80 text-indigo-600'}`}>
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
          {questions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentQuestionIdx(idx);
                setText('');
                setTimeLeft(600);
                setIsSubmitted(false);
                setScore(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                currentQuestionIdx === idx
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 border border-slate-200/60'
              }`}
            >
              Q{idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 shadow-2xs">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs font-bold text-amber-900 leading-relaxed">
          Write your summary in <strong className="text-amber-950 font-black">exactly ONE sentence</strong> (5-75 words). Using multiple sentences will result in a Form score of 0.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 lg:p-8 shadow-xs h-[450px] overflow-y-auto custom-scrollbar">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-indigo-600 mb-3">
            {question.title || `Passage #${currentQuestionIdx + 1}`}
          </h3>
          <div className="text-slate-800 leading-relaxed text-base font-semibold whitespace-pre-wrap">
            {question.promptText}
          </div>
        </div>

        <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 lg:p-8 shadow-xs flex flex-col h-[450px]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-2 text-slate-600">
               <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-xl flex items-center gap-1.5 text-xs font-bold text-slate-700 transition-colors border border-slate-200/60"><Copy className="w-3.5 h-3.5" /> Copy</button>
               <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-xl flex items-center gap-1.5 text-xs font-bold text-slate-700 transition-colors border border-slate-200/60"><Scissors className="w-3.5 h-3.5" /> Cut</button>
               <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-xl flex items-center gap-1.5 text-xs font-bold text-slate-700 transition-colors border border-slate-200/60"><Clipboard className="w-3.5 h-3.5" /> Paste</button>
            </div>
            <div className={`text-xs font-mono font-bold px-3 py-1.5 rounded-xl border ${isWordCountValid ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-rose-50 border-rose-200 text-rose-600'}`}>
              Words: {wordCount} / 5-75
            </div>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isSubmitted}
            placeholder="Type your one-sentence summary here..."
            className="flex-1 bg-white border border-slate-200 rounded-2xl p-4 text-slate-900 font-semibold text-sm placeholder:text-slate-400 leading-relaxed outline-none focus:border-indigo-500 shadow-2xs resize-none transition-all"
          />

          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => {
                if (currentQuestionIdx < questions.length - 1) {
                  setCurrentQuestionIdx(prev => prev + 1);
                  setText('');
                  setTimeLeft(600);
                  setIsSubmitted(false);
                  setScore(null);
                }
              }}
              disabled={currentQuestionIdx === questions.length - 1}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-extrabold text-xs hover:bg-slate-200/80 disabled:opacity-50 border border-slate-200/60"
            >
              Skip
            </button>

            <button
              onClick={handleSubmit}
              disabled={isSubmitted || text.trim().length === 0}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-extrabold text-xs shadow-md transition-all disabled:opacity-50 flex items-center gap-2"
            >
              Submit Answer
            </button>
          </div>
        </div>
      </div>

      {score && (
        <div className="bg-white border border-emerald-200 rounded-[24px] p-6 lg:p-8 shadow-xs">
          <div className="flex items-center gap-3 text-emerald-600 mb-4 font-bold text-lg">
            <CheckCircle className="w-6 h-6" /> Evaluation Result
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
              <div className="text-xs text-slate-500 font-bold uppercase">Form</div>
              <div className="text-xl font-black text-slate-900">{score.form} / 1</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
              <div className="text-xs text-slate-500 font-bold uppercase">Content</div>
              <div className="text-xl font-black text-slate-900">{score.content} / 2</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
              <div className="text-xs text-slate-500 font-bold uppercase">Grammar</div>
              <div className="text-xl font-black text-slate-900">{score.grammar} / 2</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
              <div className="text-xs text-slate-500 font-bold uppercase">Vocabulary</div>
              <div className="text-xl font-black text-slate-900">{score.vocabulary} / 2</div>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-center col-span-2 sm:col-span-1">
              <div className="text-xs text-emerald-700 font-bold uppercase">Total Score</div>
              <div className="text-xl font-black text-emerald-700">{score.total} / 7</div>
            </div>
          </div>
          {question.sampleAnswer && (
            <div className="mt-6 pt-6 border-t border-slate-100">
              <h4 className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider mb-2">Model Summary:</h4>
              <p className="text-sm text-slate-800 leading-relaxed bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 font-bold">
                {question.sampleAnswer}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
