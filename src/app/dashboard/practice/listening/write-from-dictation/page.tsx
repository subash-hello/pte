'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Square, Volume2, ChevronRight, Headphones, CheckCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { getQuestionsByTaskType, PTEQuestion } from '../../../../../lib/questions';

export default function WriteFromDictation() {
  const questions = getQuestionsByTaskType('Write from Dictation');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const question: PTEQuestion = questions[currentIdx] || {
    title: "Library Exam Week Access",
    difficulty: "Easy",
    correctAnswer: "The university library will remain open until midnight during exam week.",
    keywords: ["university", "library", "remain", "open", "midnight", "exam", "week"]
  };

  const sentenceToDictate = typeof question.correctAnswer === 'string' 
    ? question.correctAnswer 
    : "The university library will remain open until midnight during exam week.";

  const referenceWords = sentenceToDictate.toLowerCase().replace(/[^\w\s]/gi, '').split(/\s+/).filter(Boolean);

  const playVoiceDictation = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(sentenceToDictate);
      utterance.rate = 0.9;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 3000);
    }
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  const handleSubmit = () => {
    const userWords = text.toLowerCase().replace(/[^\w\s]/gi, '').split(/\s+/).filter(Boolean);
    let wordMatchCount = 0;
    const matchedIndices = new Set<number>();

    userWords.forEach(w => {
      const idx = referenceWords.findIndex((refW, i) => refW === w && !matchedIndices.has(i));
      if (idx !== -1) {
        wordMatchCount++;
        matchedIndices.add(idx);
      }
    });

    setScore(wordMatchCount);
    setSubmitted(true);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setText('');
      setSubmitted(false);
      setScore(0);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="space-y-6 text-slate-900">
      <div className="flex items-center justify-between">
        <Link href="/dashboard/practice/listening" className="p-2.5 bg-white hover:bg-slate-50 rounded-xl transition-colors border border-slate-200/80 shadow-2xs text-slate-700 font-bold text-xs flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Listening Hub
        </Link>
        <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold border border-rose-100 uppercase tracking-wider">
          Highest Weightage Task
        </span>
      </div>

      {/* Question Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {questions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentIdx(idx);
              setText('');
              setSubmitted(false);
              setScore(0);
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
              currentIdx === idx
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200/80 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {q.difficulty || 'Easy'} • Set {idx + 1}
          </button>
        ))}
      </div>

      <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 lg:p-8 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-sky-50 border border-sky-100 rounded-xl text-sky-600">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">{question.title || "Write from Dictation"}</h1>
            <p className="text-slate-500 text-xs font-semibold">Skills assessed: Listening, Writing</p>
          </div>
        </div>

        {/* Audio Dictation Control */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 mb-8 flex items-center gap-5">
          <button 
            onClick={playVoiceDictation}
            disabled={isPlaying}
            className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center text-white transition-colors shadow-md shadow-indigo-500/20 shrink-0"
          >
            {isPlaying ? <Square className="w-4 h-4 fill-current animate-pulse" /> : <Play className="w-5 h-5 ml-0.5 fill-current" />}
          </button>
          <div>
            <div className="text-xs font-bold text-slate-900 mb-0.5">
              {isPlaying ? '🔊 Speaking Dictation Sentence...' : 'Click Play to listen to the audio sentence'}
            </div>
            <p className="text-[11px] font-semibold text-slate-400">You will hear the sentence spoken only once. Type every word accurately.</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-slate-900 mb-2 font-extrabold text-sm">Type the sentence you hear:</h3>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={submitted}
            className="w-full h-36 bg-white border border-slate-200 rounded-2xl p-4 text-slate-900 font-extrabold text-base placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-2xs resize-none transition-all leading-relaxed"
            placeholder="Type sentence here..."
          />
        </div>

        {submitted && (
          <div className="mb-6 p-6 rounded-2xl border border-indigo-100 bg-indigo-50/60">
            <h3 className="text-base font-extrabold text-slate-900 mb-2">Score: <span className="text-indigo-600 font-mono font-black text-xl">{score}</span> / {referenceWords.length}</h3>
            <div className="mt-3 text-xs font-bold bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-slate-500 block mb-1">Official Reference Sentence:</span>
              <span className="text-emerald-600 text-sm font-extrabold">{sentenceToDictate}</span>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          {!submitted ? (
            <button 
              onClick={handleSubmit} 
              disabled={text.length === 0} 
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-sm transition-all"
            >
              Submit Answer
            </button>
          ) : (
            <button 
              onClick={handleNext}
              disabled={currentIdx === questions.length - 1}
              className="bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              Next Question <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
