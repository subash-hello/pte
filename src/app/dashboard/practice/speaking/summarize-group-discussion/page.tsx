'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mic, ChevronRight, CheckCircle, Volume2, Edit3, Users } from 'lucide-react';
import Link from 'next/link';

const SAMPLE_QUESTIONS = [
  { id: 1, topic: "Workplace Diversity", speakers: ["Speaker A", "Speaker B", "Speaker C"], transcript: "A: I believe diversity brings better problem solving... B: Yes, but it also requires more communication effort... C: True, the initial setup is harder but the long term ROI is undeniable.", prepTime: 10, recordTime: 120 },
  { id: 2, topic: "Climate Policy Impact", speakers: ["Speaker 1", "Speaker 2"], transcript: "1: Carbon taxes are the only way forward... 2: They disproportionately affect low-income families without subsidies...", prepTime: 10, recordTime: 120 }
];

export default function SummarizeGroupDiscussionPage() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [phase, setPhase] = useState<'listen' | 'prep' | 'record' | 'result'>('listen');
  const [timeLeft, setTimeLeft] = useState(0);
  const [notes, setNotes] = useState('');
  const [score, setScore] = useState<{ content: number; fluency: number; pronunciation: number } | null>(null);

  const question = SAMPLE_QUESTIONS[currentQuestionIdx];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if ((phase === 'prep' || phase === 'record') && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (phase === 'prep' && timeLeft === 0) {
      setPhase('record');
      setTimeLeft(question.recordTime);
    } else if (phase === 'record' && timeLeft === 0) {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [phase, timeLeft, question.recordTime]);

  const handleStartListening = () => {
    setTimeout(() => {
      setPhase('prep');
      setTimeLeft(question.prepTime);
    }, 6000);
  };

  const handleSubmit = () => {
    setTimeout(() => {
      setScore({ content: 4, fluency: 4, pronunciation: 5 });
      setPhase('result');
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
              Summarize Group Discussion
              <span className="text-[9px] font-black uppercase bg-rose-500 text-white px-2 py-0.5 rounded-full">NEW</span>
            </h1>
            <div className="flex gap-2 mt-1">
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200/60">Listening</span>
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">Speaking</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 lg:p-8 shadow-xs h-[480px] flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-indigo-600"></div>
            
            {phase === 'listen' && (
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-indigo-50 border border-indigo-100 rounded-full flex items-center justify-center mb-5">
                  <Users className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-3">Topic: {question.topic}</h3>
                <div className="flex gap-3 mb-6">
                  {question.speakers.map(s => (
                    <div key={s} className="px-3.5 py-1.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-bold text-slate-700">{s}</div>
                  ))}
                </div>
                <button onClick={handleStartListening} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold text-xs text-white shadow-sm flex items-center gap-2">
                  <Volume2 className="w-4 h-4" /> Start Discussion (Mock)
                </button>
              </div>
            )}

            {phase === 'prep' && (
              <div className="flex-1 flex flex-col items-center justify-center">
                <h3 className="text-slate-500 font-bold uppercase text-xs tracking-wider mb-3">Prepare your summary</h3>
                <div className="text-6xl font-mono font-black text-amber-500 mb-2">{timeLeft}s</div>
              </div>
            )}

            {phase === 'record' && (
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="text-rose-600 font-bold text-xs mb-4 animate-pulse flex items-center gap-2">
                  <Mic className="w-4 h-4" /> Recording Summary
                </div>
                <div className="text-6xl font-mono font-black text-slate-900 mb-8">{formatTime(timeLeft)}</div>
                <button onClick={handleSubmit} className="px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2">
                  <CheckCircle className="w-4.5 h-4.5" /> Finish
                </button>
              </div>
            )}

            {phase === 'result' && score && (
              <div className="flex-1 overflow-y-auto animate-in fade-in custom-scrollbar">
                <h3 className="text-base font-extrabold text-slate-900 mb-4 text-center">Summary Evaluation</h3>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-200/80">
                    <div className="text-xs font-bold text-slate-500 mb-1">Content</div>
                    <div className="text-2xl font-mono font-black text-emerald-600">{score.content}/5</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-200/80">
                    <div className="text-xs font-bold text-slate-500 mb-1">Fluency</div>
                    <div className="text-2xl font-mono font-black text-indigo-600">{score.fluency}/5</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-200/80">
                    <div className="text-xs font-bold text-slate-500 mb-1">Pronunciation</div>
                    <div className="text-2xl font-mono font-black text-sky-600">{score.pronunciation}/5</div>
                  </div>
                </div>
                <div className="bg-indigo-50/60 p-4 rounded-2xl border border-indigo-100 mb-6 text-xs">
                  <p className="text-slate-500 font-bold mb-1">Original Transcript:</p>
                  <p className="text-slate-900 font-bold leading-relaxed">{question.transcript}</p>
                </div>
                <button onClick={() => window.location.reload()} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl w-full flex justify-center items-center gap-2 shadow-sm">
                  Next Scenario <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 shadow-xs flex flex-col h-[480px]">
          <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold text-xs uppercase tracking-wider">
            <Edit3 className="w-4 h-4 text-indigo-600" />
            <span>Notepad</span>
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={phase === 'result'}
            placeholder="Jot down key points from all speakers..."
            className="flex-1 bg-white border border-slate-200 rounded-xl p-4 text-slate-900 font-semibold text-xs placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-2xs resize-none leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
