'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mic, ChevronRight, CheckCircle, RefreshCcw, Volume2, Edit3, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

const SAMPLE_QUESTIONS = [
  { id: 1, transcript: "Today we will discuss the impacts of urban sprawl on local ecosystems. As cities expand outwards, natural habitats are often destroyed or fragmented...", hasImage: true, prepTime: 10, recordTime: 40 },
  { id: 2, transcript: "The concept of dark matter was introduced to explain the gravitational effects observed in galaxies that cannot be accounted for by visible matter alone...", hasImage: false, prepTime: 10, recordTime: 40 },
  { id: 3, transcript: "In behavioral economics, bounded rationality suggests that when individuals make decisions, their rationality is limited by the tractability of the decision problem...", hasImage: true, prepTime: 10, recordTime: 40 }
];

export default function RetellLecturePage() {
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
    }, 5000);
  };

  const handleSubmit = () => {
    setTimeout(() => {
      setScore({
        content: Math.floor(Math.random() * 2) + 3,
        fluency: Math.floor(Math.random() * 3) + 3,
        pronunciation: Math.floor(Math.random() * 3) + 3,
      });
      setPhase('result');
    }, 1500);
  };

  const handleNext = () => {
    if (currentQuestionIdx < SAMPLE_QUESTIONS.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setPhase('listen');
      setNotes('');
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
              Re-tell Lecture
            </h1>
            <div className="flex gap-2 mt-1">
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200/60">Listening</span>
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">Speaking</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 lg:p-8 shadow-xs h-[400px] flex flex-col justify-center items-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-sky-400 to-indigo-600"></div>
             
             {phase === 'listen' && (
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-50 border border-indigo-100 rounded-full flex items-center justify-center mx-auto mb-5 shadow-2xs">
                    <Volume2 className="w-8 h-8 text-indigo-600 animate-pulse" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-5">Listen to the lecture...</h3>
                  <button onClick={handleStartListening} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all">
                    Mock Play Audio
                  </button>
                  {question.hasImage && (
                    <div className="mt-5 p-3.5 border border-slate-200/80 bg-slate-50 rounded-xl flex items-center gap-2.5 justify-center">
                      <ImageIcon className="text-slate-500 w-4 h-4" />
                      <span className="text-slate-600 font-bold text-xs">Image associated with lecture</span>
                    </div>
                  )}
                </div>
             )}

             {phase === 'prep' && (
                <div className="text-center">
                  <h3 className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-3">Preparation Time</h3>
                  <div className="text-5xl font-mono font-black text-amber-500 mb-2">{timeLeft}s</div>
                </div>
             )}

             {phase === 'record' && (
                <div className="text-center">
                  <h3 className="text-rose-600 font-bold uppercase tracking-wider text-xs mb-3 flex items-center justify-center gap-2">
                    <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse"></span>
                    Recording Active
                  </h3>
                  <div className="text-5xl font-mono font-black text-slate-900 mb-6">{timeLeft}s</div>
                  <button onClick={handleSubmit} className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2">
                    <CheckCircle className="w-4.5 h-4.5" /> Finish Speaking
                  </button>
                </div>
             )}

             {phase === 'result' && score && (
                <div className="w-full h-full flex flex-col justify-center animate-in fade-in">
                  <h3 className="text-base font-extrabold text-slate-900 mb-4 text-center">Score Breakdown</h3>
                  <div className="grid grid-cols-3 gap-4 w-full">
                    <div className="bg-slate-50 p-4 rounded-xl text-center border border-slate-200/80">
                      <div className="text-xs font-bold text-slate-500 mb-1">Content</div>
                      <div className="text-2xl font-mono font-black text-emerald-600">{score.content}/5</div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl text-center border border-slate-200/80">
                      <div className="text-xs font-bold text-slate-500 mb-1">Fluency</div>
                      <div className="text-2xl font-mono font-black text-indigo-600">{score.fluency}/5</div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl text-center border border-slate-200/80">
                      <div className="text-xs font-bold text-slate-500 mb-1">Pronunciation</div>
                      <div className="text-2xl font-mono font-black text-sky-600">{score.pronunciation}/5</div>
                    </div>
                  </div>
                  <div className="mt-5 p-4 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs">
                    <span className="text-slate-500 font-bold block mb-1">Transcript:</span>
                    <span className="text-slate-900 font-bold leading-relaxed">{question.transcript}</span>
                  </div>
                  <div className="mt-5 flex justify-center gap-4">
                     <button onClick={handleNext} disabled={currentQuestionIdx === SAMPLE_QUESTIONS.length - 1} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 disabled:opacity-50">
                        Next <ChevronRight className="w-4 h-4" />
                     </button>
                  </div>
                </div>
             )}
          </div>
        </div>

        {/* Right Column - Notepad */}
        <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 shadow-xs flex flex-col h-[400px]">
          <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold text-xs uppercase tracking-wider">
            <Edit3 className="w-4 h-4 text-indigo-600" />
            <span>Erasable Notepad</span>
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={phase === 'result'}
            placeholder="Take notes here while listening..."
            className="flex-1 bg-white border border-slate-200 rounded-xl p-4 text-slate-900 font-semibold text-xs placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-2xs resize-none leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
