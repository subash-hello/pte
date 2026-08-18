'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, AlertTriangle, CheckSquare, Square, ChevronRight, BookOpen, HelpCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { getQuestionsByTaskType, PTEQuestion } from '../../../../../lib/questions';

export default function MCQMultiple() {
  const questions = getQuestionsByTaskType('MCMA (Reading)');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const question: any = questions[currentQIndex] || {
    title: "The Origin of Written Language",
    difficulty: "Medium",
    promptText: "The emergence of early writing systems in Mesopotamia around 3200 BCE marked a decisive turning point in human civilization. Initially developed by Sumerian accountants to track agricultural commodities such as grain and livestock, cuneiform script evolved from simple pictographic tokens into a sophisticated phonetic system. This transformation allowed ancient administrators not only to record financial transactions, but also to codify legal statutes, compose epic literature, and preserve astronomical observations.",
    questionText: "According to the text, which of the following statements regarding early Sumerian writing are TRUE?",
    options: [
      { id: 'opt_1', text: 'Cuneiform script originally served commercial and agricultural record-keeping purposes.', isCorrect: true },
      { id: 'opt_2', text: 'Sumerian writing remained strictly limited to pictographic tokens throughout its history.', isCorrect: false },
      { id: 'opt_3', text: 'The expansion of trade routes aided the spread of writing practices across regions.', isCorrect: true },
      { id: 'opt_4', text: 'Legal codes were recorded prior to any agricultural commodity tracking.', isCorrect: false }
    ],
    explanation: "Options 1 and 3 are supported by the passage."
  };

  const passage = question.promptText || question.passage || question.passageOrTranscript || "";
  const questionText = question.questionText || "Read the text and answer the question by selecting all correct responses.";
  const options: any[] = question.rawDetails?.options || question.options || [];

  const toggleOption = (id: string) => {
    if (submitted) return;
    setSelectedOptions(prev => 
      prev.includes(id) ? prev.filter(optId => optId !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    let currentScore = 0;
    options.forEach(opt => {
      if (opt.isCorrect && selectedOptions.includes(opt.id)) currentScore += 1;
      if (!opt.isCorrect && selectedOptions.includes(opt.id)) currentScore -= 1;
    });
    setScore(Math.max(0, currentScore));
    setSubmitted(true);
  };

  const handleNext = () => {
    setSelectedOptions([]);
    setSubmitted(false);
    setScore(0);
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    }
  };

  const correctCount = options.filter(o => o.isCorrect).length || 2;

  return (
    <div className="space-y-6 text-slate-900 font-sans">
      <div className="flex items-center justify-between">
        <Link href="/dashboard/practice/reading" className="p-2.5 bg-white hover:bg-slate-50 rounded-xl transition-colors border border-slate-200/80 shadow-2xs text-slate-700 font-bold text-xs flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Reading Hub
        </Link>
        <div className="flex items-center gap-2 text-indigo-600 font-mono font-bold text-sm bg-indigo-50 px-3.5 py-1.5 rounded-xl border border-indigo-100 shadow-2xs">
          <Clock className="w-4 h-4 text-indigo-600" /> 02:00
        </div>
      </div>

      {/* Question Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {questions.map((q: any, idx: number) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentQIndex(idx);
              setSelectedOptions([]);
              setSubmitted(false);
              setScore(0);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
              currentQIndex === idx
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200/80 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            Item #{idx + 1}
          </button>
        ))}
      </div>

      <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 lg:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">{question.title || "Multiple-choice, Choose Multiple Answers"}</h1>
              <p className="text-slate-500 text-xs font-semibold">Read the text and answer the question by selecting all correct responses.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Partial Credit / Negative Marking
            </span>
          </div>
        </div>
        
        {/* Reading Passage */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 lg:p-8 mb-6 text-sm leading-relaxed font-medium text-slate-800 max-h-80 overflow-y-auto">
          {passage}
        </div>

        {/* Question Prompt */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-slate-900 mb-4">{questionText}</h3>
          <div className="space-y-3">
            {options.map((opt: any) => {
              const isSelected = selectedOptions.includes(opt.id);
              let statusClass = "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800";
              if (submitted) {
                if (opt.isCorrect && isSelected) statusClass = "bg-emerald-100 border-emerald-400 text-emerald-900";
                else if (opt.isCorrect && !isSelected) statusClass = "bg-emerald-50 border-emerald-300 text-emerald-800";
                else if (!opt.isCorrect && isSelected) statusClass = "bg-rose-100 border-rose-400 text-rose-900";
                else statusClass = "bg-slate-50 border-slate-200 opacity-50";
              } else if (isSelected) {
                statusClass = "bg-indigo-50 border-indigo-400 text-indigo-900";
              }

              return (
                <div 
                  key={opt.id}
                  onClick={() => toggleOption(opt.id)}
                  className={clsx(
                    "flex items-start gap-3 p-4 rounded-2xl border transition-all cursor-pointer shadow-2xs",
                    statusClass
                  )}
                >
                  <div className="mt-0.5 shrink-0">
                    {isSelected ? <CheckSquare className="w-4 h-4 text-indigo-600" /> : <Square className="w-4 h-4 text-slate-400" />}
                  </div>
                  <span className="text-xs font-semibold leading-relaxed">{opt.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {submitted && (
          <div className="mb-6 p-6 rounded-2xl border border-indigo-100 bg-indigo-50/60 space-y-2">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              Score: <span className="text-indigo-600 font-mono font-black text-xl">{score} / {correctCount}</span>
            </h3>
            {question.explanation && (
              <div className="pt-3 border-t border-indigo-200/60 text-xs text-indigo-950 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-medium">{question.explanation}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-500 font-mono">
            Question {currentQIndex + 1} of {questions.length}
          </div>
          <div className="flex gap-4">
            {!submitted ? (
              <button 
                onClick={handleSubmit}
                disabled={selectedOptions.length === 0}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-sm transition-all cursor-pointer"
              >
                Submit Answer
              </button>
            ) : (
              <button 
                onClick={handleNext}
                disabled={currentQIndex === questions.length - 1}
                className="bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                Next Question <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
