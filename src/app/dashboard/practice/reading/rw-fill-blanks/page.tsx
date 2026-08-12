'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, CheckCircle2, XCircle, ChevronRight, BookOpen } from 'lucide-react';
import { clsx } from 'clsx';
import { getQuestionsByTaskType, PTEQuestion } from '../../../../../lib/questions';

export default function RWFillBlanks() {
  const questions = getQuestionsByTaskType('Reading & Writing Fill in the Blanks');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const question: PTEQuestion = questions[currentQIndex] || {
    title: "Climate Change and Glacier Melting",
    difficulty: "Medium",
    promptText: "Glaciers serve as crucial indicators of global climate patterns. Over the past century, global temperatures have risen [blank1] due to greenhouse gas emissions. Consequently, mountain glaciers are melting at an unprecedented [blank2], contributing directly to sea-level rise. Scientists emphasize that immediate international cooperation is required to [blank3] the severity of future environmental impacts.",
    options: [
      { blank: "blank1", choices: ["steadily", "randomly", "rarely", "briefly"] },
      { blank: "blank2", choices: ["rate", "height", "depth", "distance"] },
      { blank: "blank3", choices: ["mitigate", "encourage", "ignore", "accelerate"] }
    ],
    correctAnswer: ["steadily", "rate", "mitigate"]
  };

  const handleSelect = (blankId: string, value: string) => {
    if (submitted) return;
    setSelections(prev => ({ ...prev, [blankId]: value }));
  };

  const handleSubmit = () => {
    let currentScore = 0;
    const correctAnswers = Array.isArray(question.correctAnswer) ? question.correctAnswer : ["steadily", "rate", "mitigate"];
    
    (question.options || []).forEach((optObj: any, idx: number) => {
      const bKey = optObj.blank || `blank${idx + 1}`;
      if (selections[bKey] === correctAnswers[idx]) {
        currentScore++;
      }
    });

    setScore(currentScore);
    setSubmitted(true);
  };

  const handleNext = () => {
    setSelections({});
    setSubmitted(false);
    setScore(0);
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    }
  };

  const renderText = () => {
    const prompt = question.promptText || "";
    const parts = prompt.split(/(\[blank\d+\])/g);
    const correctAnswers = Array.isArray(question.correctAnswer) ? question.correctAnswer : ["steadily", "rate", "mitigate"];

    return parts.map((part, i) => {
      const match = part.match(/^\[blank(\d+)\]$/);
      if (match) {
        const blankIndex = parseInt(match[1], 10) - 1;
        const bKey = `blank${match[1]}`;
        const optObj = (question.options || [])[blankIndex] || { choices: ["option1", "option2"] };
        const choices = optObj.choices || ["option1", "option2"];
        const correctVal = correctAnswers[blankIndex];
        const userVal = selections[bKey];
        const isCorrect = userVal === correctVal;

        return (
          <span key={i} className="inline-block mx-1 my-0.5">
            <select
              value={userVal || ''}
              onChange={(e) => handleSelect(bKey, e.target.value)}
              disabled={submitted}
              className={clsx(
                "bg-white border rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none focus:border-indigo-500 shadow-2xs transition-colors cursor-pointer",
                !submitted && "border-slate-300 text-slate-900",
                submitted && isCorrect && "border-emerald-500 bg-emerald-50 text-emerald-900",
                submitted && !isCorrect && userVal && "border-rose-500 bg-rose-50 text-rose-900"
              )}
            >
              <option value="" disabled className="text-slate-400">Select option...</option>
              {choices.map((opt: string) => (
                <option key={opt} value={opt} className="bg-white text-slate-900 font-semibold">{opt}</option>
              ))}
            </select>
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="space-y-6 text-slate-900">
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
        {questions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentQIndex(idx);
              setSelections({});
              setSubmitted(false);
              setScore(0);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
              currentQIndex === idx
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200/80 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {q.difficulty || 'Medium'} • Set {idx + 1}
          </button>
        ))}
      </div>

      <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 lg:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">{question.title || "Reading & Writing: Fill in the Blanks"}</h1>
              <p className="text-slate-500 text-xs font-semibold">Skills assessed: Reading, Writing</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100 uppercase tracking-wider">
            High Weightage
          </span>
        </div>
        
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 lg:p-8 mb-8 text-base leading-relaxed font-semibold text-slate-800">
          {renderText()}
        </div>

        {submitted && (
          <div className="mb-6 p-6 rounded-2xl border border-indigo-100 bg-indigo-50/60">
            <h3 className="text-base font-extrabold text-slate-900 mb-3 flex items-center gap-2">
              Score: <span className="text-indigo-600 font-mono font-black text-xl">{score} / {(question.options || []).length}</span>
            </h3>
            <div className="space-y-2 text-xs font-bold">
              {(question.options || []).map((optObj: any, idx: number) => {
                const bKey = optObj.blank || `blank${idx + 1}`;
                const correctAnswers = Array.isArray(question.correctAnswer) ? question.correctAnswer : ["steadily", "rate", "mitigate"];
                const correctVal = correctAnswers[idx];
                const isCorrect = selections[bKey] === correctVal;

                return (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-slate-500">Blank {idx + 1}:</span>
                    {isCorrect ? (
                      <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Correct ({correctVal})</span>
                    ) : (
                      <span className="text-rose-600 flex items-center gap-1"><XCircle className="w-4 h-4"/> Incorrect (Your answer: {selections[bKey] || 'None'}, Correct: {correctVal})</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center pt-2 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-500">
            Question {currentQIndex + 1} of {questions.length}
          </div>
          <div className="flex gap-4">
            {!submitted ? (
              <button 
                onClick={handleSubmit}
                disabled={Object.keys(selections).length === 0}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-sm transition-all"
              >
                Submit Answer
              </button>
            ) : (
              <button 
                onClick={handleNext}
                disabled={currentQIndex === questions.length - 1}
                className="bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
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
