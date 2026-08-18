'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, CircleDot, Circle, ChevronRight, BookOpen, HelpCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { getQuestionsByTaskType, PTEQuestion } from '../../../../../lib/questions';

export default function MCQSingle() {
  const questions = getQuestionsByTaskType('MCSA (Reading)');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const question: any = questions[currentQIndex] || {
    title: "Cognitive Advantages of Bilingualism",
    difficulty: "Medium",
    promptText: "For decades, educators warned that raising children in a bilingual environment would confuse their cognitive processing and delay vocabulary acquisition. Modern neuroimaging research, however, completely refutes this notion. Executive function tests reveal that bilingual individuals possess superior attentional control, working memory, and cognitive flexibility compared to monolinguals. Switching between two linguistic codes constantly exercises the brain’s prefrontal cortex, building a neural reserve that delays the onset of dementia symptoms in older adults by up to four years.",
    questionText: "What is the main finding of modern neuroimaging research regarding bilingualism?",
    options: [
      { id: 'opt_a', text: 'It causes severe vocabulary acquisition delays in early childhood.', isCorrect: false },
      { id: 'opt_b', text: 'It enhances executive brain function and builds cognitive resilience.', isCorrect: true },
      { id: 'opt_c', text: 'It impairs working memory during complex multi-tasking.', isCorrect: false },
      { id: 'opt_d', text: 'It completely eliminates the possibility of age-related cognitive decline.', isCorrect: false }
    ],
    explanation: "The passage highlights that neuroimaging refutes early warnings and proves bilingualism enhances executive function, attentional control, and cognitive flexibility."
  };

  const passage = question.promptText || question.passage || question.passageOrTranscript || "";
  const questionText = question.questionText || "Read the text and answer the multiple-choice question by selecting the single correct response.";
  const options: any[] = question.rawDetails?.options || question.options || [];

  const handleSubmit = () => {
    const isCorrect = options.find(o => o.id === selectedOption)?.isCorrect;
    setScore(isCorrect ? 1 : 0);
    setSubmitted(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setSubmitted(false);
    setScore(0);
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    }
  };

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
              setSelectedOption(null);
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
              <h1 className="text-xl font-extrabold text-slate-900">{question.title || "Multiple-choice, Choose Single Answer"}</h1>
              <p className="text-slate-500 text-xs font-semibold">Read the text and answer the multiple-choice question by selecting the single correct response.</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold border border-indigo-100 uppercase tracking-wider">
            Single Answer
          </span>
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
              const isSelected = selectedOption === opt.id;
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
                  onClick={() => !submitted && setSelectedOption(opt.id)}
                  className={clsx(
                    "flex items-start gap-3 p-4 rounded-2xl border transition-all cursor-pointer shadow-2xs",
                    statusClass
                  )}
                >
                  <div className="mt-0.5 shrink-0">
                    {isSelected ? <CircleDot className="w-4 h-4 text-indigo-600" /> : <Circle className="w-4 h-4 text-slate-400" />}
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
              Score: <span className="text-indigo-600 font-mono font-black text-xl">{score} / 1</span>
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
                disabled={!selectedOption}
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
