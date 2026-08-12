'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mic, Play, Square, ChevronRight, CheckCircle, RefreshCcw, Volume2 } from 'lucide-react';
import Link from 'next/link';
import { getQuestionsByTaskType, PTEQuestion } from '../../../../../lib/questions';
import { scoreReadAloud } from '../../../../../lib/aiScoringEngine';
import PendingTrialGuard, { isQuestionLockedForUser, isPendingStudent } from '@/components/PendingTrialGuard';
import { Lock } from 'lucide-react';

export default function RepeatSentencePage() {
  const questions = getQuestionsByTaskType('Repeat Sentence');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [phase, setPhase] = useState<'listen' | 'record' | 'result'>('listen');
  const [timeLeft, setTimeLeft] = useState(15);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcriptText, setTranscriptText] = useState('');
  const [scoreResult, setScoreResult] = useState<any>(null);
  const [showLockModal, setShowLockModal] = useState(false);

  const question: PTEQuestion = questions[currentIdx] || {
    title: "Library Resources Access",
    difficulty: "Easy",
    timeLimit: 15,
    audioScript: "Students must present their university identification card to access the library research facilities.",
    correctAnswer: "Students must present their university identification card to access the library research facilities."
  };

  const sentenceToSpeak = question.audioScript || question.correctAnswer || "Students must present their university identification card to access the library research facilities.";

  const playSentenceVoice = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(sentenceToSpeak);
      utterance.rate = 0.95;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => {
        setIsPlaying(false);
        setPhase('record');
        setTimeLeft(15);
      };
      utterance.onerror = () => {
        setIsPlaying(false);
        setPhase('record');
        setTimeLeft(15);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlaying(true);
      setTimeout(() => {
        setIsPlaying(false);
        setPhase('record');
        setTimeLeft(15);
      }, 3500);
    }
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (phase === 'record' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (phase === 'record' && timeLeft === 0) {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [phase, timeLeft]);

  const handleSubmit = () => {
    const spoken = transcriptText || sentenceToSpeak;
    const res = scoreReadAloud(spoken, sentenceToSpeak);
    setScoreResult(res);
    setPhase('result');
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setPhase('listen');
      setTranscriptText('');
      setScoreResult(null);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="flex flex-col gap-6 text-slate-900">
      <PendingTrialGuard currentQuestionIndex={currentIdx} isOpen={showLockModal} onClose={() => setShowLockModal(false)} />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2.5 bg-white hover:bg-slate-50 rounded-xl transition-colors border border-slate-200/80 shadow-2xs">
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              Repeat Sentence
            </h1>
            <div className="flex gap-2 mt-1">
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200/60">Listening</span>
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">Speaking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Question Selector Tabs */}
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
                setCurrentIdx(idx);
                setPhase('listen');
                setTranscriptText('');
                setScoreResult(null);
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 border flex items-center gap-1.5 ${
                locked
                  ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 cursor-pointer'
                  : currentIdx === idx
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200/80 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {locked && <Lock className="w-3 h-3 text-amber-600 shrink-0" />}
              {q.difficulty || 'Easy'} • Set {idx + 1} {locked ? '(Locked)' : ''}
            </button>
          );
        })}
      </div>

      {/* Main Practice Area */}
      <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-8 lg:p-12 shadow-xs relative overflow-hidden text-center min-h-[420px] flex flex-col justify-center">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-sky-400"></div>
        
        {phase === 'listen' && (
          <div className="flex flex-col items-center animate-in fade-in duration-300">
            <div className="w-20 h-20 bg-indigo-50 border border-indigo-100 rounded-full flex items-center justify-center mb-6 shadow-2xs">
              <Volume2 className={`w-10 h-10 text-indigo-600 ${isPlaying ? 'animate-pulse' : ''}`} />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-8">Click Play to listen to the spoken sentence</h2>
            <button
              onClick={playSentenceVoice}
              disabled={isPlaying}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all flex items-center gap-3 text-base shadow-md shadow-indigo-500/20"
            >
              {isPlaying ? <span className="flex items-center gap-2"><span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-indigo-400 opacity-75"></span> Speaking Sentence...</span> : <><Play className="w-5 h-5" /> Play Voice Sentence</>}
            </button>
          </div>
        )}

        {phase === 'record' && (
          <div className="flex flex-col items-center animate-in fade-in duration-300">
            <div className="text-sm font-bold text-rose-600 mb-4 flex items-center gap-2 bg-rose-50 px-3.5 py-1.5 rounded-full border border-rose-100">
              <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse"></span>
              Microphone Active — Repeat Sentence Now!
            </div>
            <div className="text-6xl font-mono font-black text-slate-900 mb-8 tracking-tight">
              {timeLeft}s
            </div>

            <textarea
              value={transcriptText}
              onChange={(e) => setTranscriptText(e.target.value)}
              placeholder="Spoken words will appear here or type your response..."
              className="w-full max-w-xl h-24 bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 font-semibold text-xs text-center mb-6 outline-none resize-none"
            />

            <button 
              onClick={handleSubmit}
              className="px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-colors flex items-center gap-2 shadow-sm text-sm"
            >
              <CheckCircle className="w-5 h-5" />
              Done Speaking
            </button>
          </div>
        )}

        {phase === 'result' && scoreResult && (
          <div className="flex flex-col items-center w-full animate-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Original Sentence Reference</h3>
            <div className="bg-indigo-50/60 border border-indigo-100 p-6 rounded-2xl w-full max-w-2xl mb-8">
              <p className="text-lg text-slate-900 font-bold leading-relaxed">{sentenceToSpeak}</p>
            </div>

            <div className="grid grid-cols-3 gap-5 w-full max-w-2xl mb-8">
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex flex-col items-center justify-center">
                <span className="text-slate-500 text-xs font-bold uppercase mb-1">Content</span>
                <span className="text-3xl font-mono font-black text-emerald-600">{scoreResult.content}<span className="text-sm text-slate-400">/3</span></span>
              </div>
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex flex-col items-center justify-center">
                <span className="text-slate-500 text-xs font-bold uppercase mb-1">Oral Fluency</span>
                <span className="text-3xl font-mono font-black text-indigo-600">{scoreResult.fluency}<span className="text-sm text-slate-400">/5</span></span>
              </div>
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex flex-col items-center justify-center">
                <span className="text-slate-500 text-xs font-bold uppercase mb-1">Pronunciation</span>
                <span className="text-3xl font-mono font-black text-sky-600">{scoreResult.pronunciation}<span className="text-sm text-slate-400">/5</span></span>
              </div>
            </div>

            <button 
              onClick={handleNext}
              disabled={currentIdx === questions.length - 1}
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 text-sm"
            >
              Next Sentence
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
