'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, CheckCircle2, XCircle, ChevronRight, BookOpen, HelpCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { getQuestionsByTaskType, PTEQuestion } from '../../../../../lib/questions';

export default function ReadingFillBlanks() {
  const questions = getQuestionsByTaskType('FIB (Reading)');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  
  const question: any = questions[currentQIndex] || {
    title: "Urban Heat Islands",
    difficulty: "Medium",
    promptText: "Urban heat islands occur when cities replace natural land cover with dense concentrations of pavement, buildings, and other infrastructure that {blank1} heat. This phenomenon leads to elevated temperatures in urban areas compared to surrounding rural regions. To combat this temperature rise, municipalities are implementing {blank2} roof initiatives and planting urban canopy trees. These natural interventions provide shade and lower temperatures through evapotranspiration. Consequently, cities can reduce energy consumption required for air conditioning while improving ambient air {blank3} for residents.",
    wordBank: ['absorb', 'green', 'quality', 'discard', 'artificial', 'scarcity'],
    correctMapping: { blank1: 'absorb', blank2: 'green', blank3: 'quality' },
    explanation: "'Absorb heat' matches infrastructure properties. 'Green roof' is the standard urban planning term. 'Air quality' is the correct noun phrase."
  };

  const [selections, setSelections] = useState<Record<string, string>>({});
  const [draggedWord, setDraggedWord] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const wordBank: string[] = question.rawDetails?.wordBank || question.wordBank || question.options || [];
  const correctMapping: Record<string, string> = question.rawDetails?.correctMapping || question.correctMapping || question.correctAnswer || {};

  const handleDragStart = (word: string) => {
    if (submitted) return;
    setDraggedWord(word);
  };

  const handleDrop = (e: React.DragEvent, blankId: string) => {
    e.preventDefault();
    if (!draggedWord || submitted) return;
    setSelections(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(key => {
        if (next[key] === draggedWord) delete next[key];
      });
      next[blankId] = draggedWord;
      return next;
    });
    setDraggedWord(null);
  };

  const removeWord = (blankId: string) => {
    if (submitted) return;
    setSelections(prev => {
      const next = { ...prev };
      delete next[blankId];
      return next;
    });
  };

  const handleWordClick = (word: string) => {
    if (submitted) return;
    const used = Object.values(selections);
    if (used.includes(word)) return;

    // Find first empty blank
    const allKeys = Object.keys(correctMapping).length > 0 ? Object.keys(correctMapping) : ['blank1', 'blank2', 'blank3', 'blank4', 'blank5'];
    const firstEmpty = allKeys.find(k => !selections[k]);
    if (firstEmpty) {
      setSelections(prev => ({ ...prev, [firstEmpty]: word }));
    }
  };

  const handleSubmit = () => {
    let currentScore = 0;
    Object.keys(correctMapping).forEach(blankId => {
      if (selections[blankId] && selections[blankId].toLowerCase() === String(correctMapping[blankId]).toLowerCase()) {
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

  const usedWords = Object.values(selections);

  const renderText = () => {
    const rawText = question.promptText || question.passage || question.passageTextWithPlaceholders || "";
    const parts = rawText.split(/(\{blank[_\d]*\}|\[blank[_\d]*\])/gi);
    let blankCounter = 0;

    return parts.map((part: string, i: number) => {
      const isBlank = /(\{blank[_\d]*\}|\[blank[_\d]*\])/gi.test(part);
      if (isBlank) {
        blankCounter++;
        const cleanMatch = part.replace(/[^\w]/g, "");
        const blankId = cleanMatch || `blank${blankCounter}`;
        const word = selections[blankId];
        const correctVal = correctMapping[blankId] || "";
        const isCorrect = word && correctVal && word.toLowerCase() === correctVal.toLowerCase();

        return (
          <span 
            key={i} 
            className={clsx(
              "inline-flex items-center justify-center min-w-[100px] h-8 mx-1 px-3 rounded-xl border-2 font-bold text-xs transition-all align-middle shadow-2xs cursor-pointer",
              word ? (
                submitted ? (
                  isCorrect 
                    ? "bg-emerald-100 border-emerald-500 text-emerald-900" 
                    : "bg-rose-100 border-rose-500 text-rose-900"
                ) : "bg-indigo-100 border-indigo-400 text-indigo-900 hover:bg-indigo-200"
              ) : "bg-white border-dashed border-indigo-300 text-slate-400"
            )}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, blankId)}
            onClick={() => word && removeWord(blankId)}
            title={word ? "Click to remove word" : "Drop or click word from bank"}
          >
            {word || `[ Blank ${blankCounter} ]`}
          </span>
        );
      }
      return <span key={i} className="align-middle">{part}</span>;
    });
  };

  const totalBlanksCount = Object.keys(correctMapping).length || 3;

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
              <h1 className="text-xl font-extrabold text-slate-900">{question.title || "Reading: Fill in the Blanks"}</h1>
              <p className="text-slate-500 text-xs font-semibold">Drag or click words from the word bank to fill in the missing blanks in the text.</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100 uppercase tracking-wider">
            Drag & Drop
          </span>
        </div>

        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 lg:p-8 mb-6 text-sm leading-loose font-medium text-slate-800">
          {renderText()}
        </div>

        {/* Word Bank Card */}
        <div className="mb-8 p-6 bg-slate-50 border border-slate-200/80 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Word Bank (Click word to place into blank):</h3>
            {usedWords.length > 0 && !submitted && (
              <button
                onClick={() => setSelections({})}
                className="text-xs text-rose-600 hover:underline font-bold"
              >
                Reset All Blanks
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {wordBank.map((word, idx) => {
              const isUsed = usedWords.includes(word);
              return (
                <div
                  key={idx}
                  draggable={!isUsed && !submitted}
                  onDragStart={() => handleDragStart(word)}
                  onClick={() => handleWordClick(word)}
                  className={clsx(
                    "px-4 py-2 rounded-xl text-xs font-bold select-none transition-all shadow-2xs border",
                    isUsed 
                      ? "bg-slate-100 border-slate-200 text-slate-400 opacity-50 line-through cursor-not-allowed"
                      : "bg-white border-indigo-200 text-indigo-700 cursor-grab active:cursor-grabbing hover:bg-indigo-600 hover:text-white"
                  )}
                >
                  {word}
                </div>
              );
            })}
          </div>
        </div>

        {submitted && (
          <div className="mb-6 p-6 rounded-2xl border border-indigo-100 bg-indigo-50/60 space-y-3">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              Score: <span className="text-indigo-600 font-mono font-black text-xl">{score} / {totalBlanksCount}</span>
            </h3>
            <div className="space-y-2 text-xs font-bold">
              {Object.entries(correctMapping).map(([id, answer]) => (
                <div key={id} className="flex items-center gap-2">
                  <span className="text-slate-500 font-mono">Blank {id.replace('blank', '')}:</span>
                  {selections[id] && selections[id].toLowerCase() === String(answer).toLowerCase() ? (
                    <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Correct (<strong>{answer}</strong>)</span>
                  ) : (
                    <span className="text-rose-600 flex items-center gap-1"><XCircle className="w-4 h-4"/> Incorrect (Your choice: {selections[id] || 'None'}, Correct: <strong className="text-emerald-700">{answer}</strong>)</span>
                  )}
                </div>
              ))}
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
