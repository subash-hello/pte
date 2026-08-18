'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, CheckCircle2, XCircle, ChevronRight, BookOpen, HelpCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { getQuestionsByTaskType, PTEQuestion } from '../../../../../lib/questions';

export default function RWFillBlanks() {
  const questions = getQuestionsByTaskType('Reading & Writing Fill in the Blanks');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const question: PTEQuestion = questions[currentQIndex] || {
    title: "Artificial Intelligence and Economic Growth",
    difficulty: "Medium",
    promptText: "The integration of artificial intelligence into industrial operations has revolutionized productivity metrics worldwide. Economists predict that AI technologies will [blank_1] global economic output by up to fourteen percent by 2030. However, the automated deployment of predictive models also raises significant ethical concerns regarding worker displacement. To [blank_2] these risks, governments are considering comprehensive workforce retraining programs. Furthermore, regulatory frameworks must be established to ensure that algorithmic decision-making remains transparent and [blank_3] to public scrutiny. Failure to implement effective governance could [blank_4] social inequality across developing economies.",
    options: [
      { id: 'blank_1', options: ['boost', 'curtail', 'dismantle', 'stagnate'], correctAnswer: 'boost' },
      { id: 'blank_2', options: ['mitigate', 'exacerbate', 'ignite', 'prohibit'], correctAnswer: 'mitigate' },
      { id: 'blank_3', options: ['subject', 'impervious', 'vulnerable', 'detached'], correctAnswer: 'subject' },
      { id: 'blank_4', options: ['widen', 'narrow', 'alleviate', 'consolidate'], correctAnswer: 'widen' }
    ]
  };

  const blanksList: any[] = (question as any).blanks || (question as any).rawDetails?.blanks || question.options || [];

  const handleSelect = (blankKey: string, value: string) => {
    if (submitted) return;
    setSelections((prev) => ({ ...prev, [blankKey]: value }));
  };

  const handleSubmit = () => {
    let currentScore = 0;
    blanksList.forEach((b: any, idx: number) => {
      const bKey = b.id || b.blank || `blank_${idx + 1}`;
      const correctAns = b.correctAnswer || (Array.isArray(question.correctAnswer) ? question.correctAnswer[idx] : '');
      if (selections[bKey] && selections[bKey].toLowerCase() === String(correctAns).toLowerCase()) {
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
    const prompt = question.promptText || (question as any).passage || (question as any).passageTemplate || "";
    const parts = prompt.split(/(\[blank[_\d]*\]|\{blank[_\d]*\})/gi);
    let blankIndex = 0;

    return parts.map((part: string, i: number) => {
      const isBlank = /(\[blank[_\d]*\]|\{blank[_\d]*\})/gi.test(part);
      if (isBlank) {
        const currentIdx = blankIndex;
        blankIndex++;
        const blankDef = blanksList[currentIdx] || blanksList.find((b: any) => b.id && part.includes(b.id)) || {
          id: `blank_${currentIdx + 1}`,
          options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
          correctAnswer: ''
        };
        const bKey = blankDef.id || blankDef.blank || `blank_${currentIdx + 1}`;
        const choices = blankDef.options || blankDef.choices || [];
        const correctVal = blankDef.correctAnswer || (Array.isArray(question.correctAnswer) ? question.correctAnswer[currentIdx] : '');
        const userVal = selections[bKey];
        const isCorrect = userVal && correctVal && userVal.toLowerCase() === String(correctVal).toLowerCase();

        return (
          <span key={i} className="inline-block mx-1 my-1">
            <select
              value={userVal || ''}
              onChange={(e) => handleSelect(bKey, e.target.value)}
              disabled={submitted}
              className={clsx(
                "border rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs transition-all cursor-pointer",
                !submitted && "bg-white border-slate-300 text-slate-800 hover:border-indigo-400",
                submitted && isCorrect && "border-emerald-500 bg-emerald-100 text-emerald-900 font-black",
                submitted && !isCorrect && userVal && "border-rose-500 bg-rose-100 text-rose-900 font-black",
                submitted && !userVal && "border-amber-400 bg-amber-50 text-amber-900"
              )}
            >
              <option value="">-- Select Option --</option>
              {choices.map((opt: string, optIdx: number) => (
                <option key={optIdx} value={opt} className="bg-white text-slate-900 font-semibold">
                  {opt}
                </option>
              ))}
            </select>
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
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
              <h1 className="text-xl font-extrabold text-slate-900">{question.title || "Reading & Writing: Fill in the Blanks"}</h1>
              <p className="text-slate-500 text-xs font-semibold">Below is a text with blanks. Click each blank to select the missing word.</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100 uppercase tracking-wider">
            Reading & Writing
          </span>
        </div>
        
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 lg:p-8 mb-8 text-sm leading-loose font-medium text-slate-800">
          {renderText()}
        </div>

        {submitted && (
          <div className="mb-6 p-6 rounded-2xl border border-indigo-100 bg-indigo-50/60 space-y-3">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              Score: <span className="text-indigo-600 font-mono font-black text-xl">{score} / {blanksList.length}</span>
            </h3>
            <div className="space-y-2 text-xs font-bold">
              {blanksList.map((b: any, idx: number) => {
                const bKey = b.id || b.blank || `blank_${idx + 1}`;
                const correctVal = b.correctAnswer || (Array.isArray(question.correctAnswer) ? question.correctAnswer[idx] : '');
                const userVal = selections[bKey];
                const isCorrect = userVal && correctVal && userVal.toLowerCase() === String(correctVal).toLowerCase();

                return (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-slate-500 font-mono">Blank {idx + 1}:</span>
                    {isCorrect ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Correct: <strong>{correctVal}</strong>
                      </span>
                    ) : (
                      <span className="text-rose-600 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Incorrect (Your choice: {userVal || 'None'}, Correct: <strong className="text-emerald-700">{correctVal}</strong>)
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
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
                disabled={Object.keys(selections).length === 0}
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
