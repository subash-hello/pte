'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mic, ChevronRight, CheckCircle, RefreshCcw, BarChart3, PieChart, Map, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const SAMPLE_QUESTIONS = [
  { id: 1, type: 'bar', title: "Global Smartphone Sales (2018-2022)", prepTime: 25, recordTime: 40, sample: "The bar chart illustrates the global smartphone sales from 2018 to 2022 in millions of units. It is evident that sales peaked in 2021 before a slight decline in 2022." },
  { id: 2, type: 'line', title: "Average Monthly Temperature in Paris", prepTime: 25, recordTime: 40, sample: "The line graph shows the average monthly temperature in Paris over a year. Temperatures reach their highest in July and August at around 25 degrees Celsius." },
  { id: 3, type: 'pie', title: "Energy Production Sources in 2023", prepTime: 25, recordTime: 40, sample: "The pie chart breaks down the energy production sources in 2023. Renewable energy constitutes the largest share at 45%, followed by natural gas at 30%." },
  { id: 4, type: 'map', title: "Migration Patterns in Europe (2010-2020)", prepTime: 25, recordTime: 40, sample: "The map displays migration patterns across Europe between 2010 and 2020. There is a clear trend of movement from Eastern to Western European countries." }
];

export default function DescribeImagePage() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [phase, setPhase] = useState<'prep' | 'record' | 'result'>('prep');
  const [timeLeft, setTimeLeft] = useState(SAMPLE_QUESTIONS[0].prepTime);
  const [isRecording, setIsRecording] = useState(false);
  const [score, setScore] = useState<{ content: number; fluency: number; pronunciation: number } | null>(null);

  const question = SAMPLE_QUESTIONS[currentQuestionIdx];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (phase === 'prep' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (phase === 'prep' && timeLeft === 0) {
      setPhase('record');
      setTimeLeft(question.recordTime);
      setIsRecording(true);
    } else if (phase === 'record' && timeLeft > 0 && isRecording) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (phase === 'record' && timeLeft === 0) {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [phase, timeLeft, isRecording, question.recordTime]);

  const handleSubmit = () => {
    setIsRecording(false);
    setTimeout(() => {
      setScore({
        content: Math.floor(Math.random() * 2) + 4,
        fluency: Math.floor(Math.random() * 3) + 3,
        pronunciation: Math.floor(Math.random() * 3) + 3,
      });
      setPhase('result');
    }, 1500);
  };

  const handleNext = () => {
    if (currentQuestionIdx < SAMPLE_QUESTIONS.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setPhase('prep');
      setTimeLeft(SAMPLE_QUESTIONS[currentQuestionIdx + 1].prepTime);
      setScore(null);
    }
  };

  const renderMockImage = () => {
    switch(question.type) {
      case 'bar':
        return (
          <div className="w-full h-64 bg-slate-50 rounded-2xl flex items-end justify-around p-8 border border-slate-200/80 relative">
            <div className="absolute top-4 left-0 w-full text-center text-xs font-bold text-slate-500">{question.title}</div>
            <div className="w-10 bg-indigo-500 h-[40%] rounded-t-md"></div>
            <div className="w-10 bg-sky-500 h-[50%] rounded-t-md"></div>
            <div className="w-10 bg-emerald-500 h-[70%] rounded-t-md"></div>
            <div className="w-10 bg-amber-500 h-[90%] rounded-t-md"></div>
            <div className="w-10 bg-rose-500 h-[60%] rounded-t-md"></div>
          </div>
        );
      case 'line':
        return (
          <div className="w-full h-64 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-200/80 relative">
             <div className="absolute top-4 left-0 w-full text-center text-xs font-bold text-slate-500">{question.title}</div>
             <TrendingUp className="w-28 h-28 text-indigo-600" />
          </div>
        );
      case 'pie':
        return (
          <div className="w-full h-64 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-200/80 relative">
             <div className="absolute top-4 left-0 w-full text-center text-xs font-bold text-slate-500">{question.title}</div>
             <PieChart className="w-28 h-28 text-sky-600" />
          </div>
        );
      case 'map':
        return (
          <div className="w-full h-64 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-200/80 relative">
             <div className="absolute top-4 left-0 w-full text-center text-xs font-bold text-slate-500">{question.title}</div>
             <Map className="w-28 h-28 text-emerald-600" />
          </div>
        );
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
              Describe Image
            </h1>
            <div className="flex gap-2 mt-1">
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">Speaking</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {SAMPLE_QUESTIONS.map((q, idx) => (
          <button
            key={q.id}
            onClick={() => {
              setCurrentQuestionIdx(idx);
              setPhase('prep');
              setTimeLeft(SAMPLE_QUESTIONS[idx].prepTime);
              setScore(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
              currentQuestionIdx === idx
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200/80 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            Question {idx + 1}
          </button>
        ))}
      </div>

      <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-8 lg:p-10 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-sky-400 to-indigo-600"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-4">
              <h3 className="text-base font-extrabold text-slate-900 mb-1">Look at the image below.</h3>
              <p className="text-xs font-medium text-slate-500">Describe in detail what the image is showing. You will have 40 seconds to give your response.</p>
            </div>
            {renderMockImage()}
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              {phase === 'prep' ? 'Preparation Time' : phase === 'record' ? 'Recording Active' : 'Results'}
            </div>
            
            {phase !== 'result' && (
              <div className={`relative flex items-center justify-center w-28 h-28 rounded-full border-4 mb-6 ${
                phase === 'prep' ? 'border-amber-400' : 'border-rose-500'
              }`}>
                <span className="text-3xl font-mono font-black text-slate-900">
                  {timeLeft}s
                </span>
              </div>
            )}

            {phase === 'prep' && (
              <button 
                onClick={() => { setPhase('record'); setTimeLeft(question.recordTime); setIsRecording(true); }}
                className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 text-xs"
              >
                <Mic className="w-4.5 h-4.5" />
                Skip Prep & Record
              </button>
            )}

            {phase === 'record' && (
              <button 
                onClick={handleSubmit}
                className="px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 text-xs"
              >
                <CheckCircle className="w-4.5 h-4.5" />
                Submit Answer
              </button>
            )}
          </div>
        </div>

        {phase === 'result' && score && (
          <div className="mt-8 border-t border-slate-100 pt-8 animate-in slide-in-from-bottom-4">
            <div className="bg-indigo-50/60 border border-indigo-100 p-6 rounded-2xl mb-8">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Sample Answer Transcript</h4>
              <p className="text-slate-900 font-bold leading-relaxed text-sm">{question.sample}</p>
            </div>

            <div className="grid grid-cols-3 gap-5 w-full max-w-2xl mx-auto mb-8">
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

            <div className="flex justify-center gap-4">
              <button 
                onClick={() => {
                  setPhase('prep');
                  setTimeLeft(question.prepTime);
                  setScore(null);
                }}
                className="px-6 py-3 bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-700 font-bold rounded-xl transition-all flex items-center gap-2 text-xs"
              >
                <RefreshCcw className="w-4 h-4" />
                Retry
              </button>
              <button 
                onClick={handleNext}
                disabled={currentQuestionIdx === SAMPLE_QUESTIONS.length - 1}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 text-xs"
              >
                Next Image
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
