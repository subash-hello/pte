'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { clsx } from 'clsx';

const mockQuestions = [
  {
    id: 1,
    text: "The internet has dramatically {blank1} the way we communicate. Before its widespread use, people relied heavily on traditional mail, which could take days or even weeks to {blank2}. Today, instant messaging allows for immediate interaction regardless of {blank3}.",
    blanks: ['blank1', 'blank2', 'blank3'],
    answers: { blank1: 'changed', blank2: 'arrive', blank3: 'distance' },
    wordBank: ['distance', 'arrive', 'changed', 'location', 'deliver', 'improved']
  }
];

export default function ReadingFillBlanks() {
  const [currentQIndex] = useState(0);
  const currentQ = mockQuestions[currentQIndex];
  
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [draggedWord, setDraggedWord] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleDragStart = (word: string) => {
    if (submitted) return;
    setDraggedWord(word);
  };

  const handleDrop = (e: React.DragEvent, blankId: string) => {
    e.preventDefault();
    if (!draggedWord || submitted) return;
    setSelections(prev => {
      const newSelections = { ...prev };
      // Remove word if it was already in another blank
      Object.keys(newSelections).forEach(key => {
        if (newSelections[key] === draggedWord) delete newSelections[key];
      });
      newSelections[blankId] = draggedWord;
      return newSelections;
    });
    setDraggedWord(null);
  };

  const removeWord = (blankId: string) => {
    if (submitted) return;
    setSelections(prev => {
      const newSelections = { ...prev };
      delete newSelections[blankId];
      return newSelections;
    });
  };

  const handleSubmit = () => {
    let currentScore = 0;
    Object.keys(currentQ.answers).forEach(blankId => {
      if (selections[blankId] === currentQ.answers[blankId as keyof typeof currentQ.answers]) {
        currentScore++;
      }
    });
    setScore(currentScore);
    setSubmitted(true);
  };

  const usedWords = Object.values(selections);

  const renderText = () => {
    const parts = currentQ.text.split(/(\{blank\d+\})/g);
    return parts.map((part, i) => {
      const match = part.match(/^\{blank(\d+)\}$/);
      if (match) {
        const blankId = `blank${match[1]}`;
        const word = selections[blankId];
        const isCorrect = word === currentQ.answers[blankId as keyof typeof currentQ.answers];

        return (
          <span 
            key={i} 
            className={clsx(
              "inline-flex items-center justify-center min-w-[100px] h-8 mx-1 px-3 rounded border-2 transition-all align-middle",
              word ? (
                submitted ? (isCorrect ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-200" : "bg-red-500/20 border-red-500/50 text-red-200")
                : "bg-indigo-500/20 border-indigo-500/50 text-indigo-100 cursor-pointer"
              ) : "bg-white/5 border-dashed border-white/30",
            )}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, blankId)}
            onClick={() => word && removeWord(blankId)}
          >
            {word || ""}
          </span>
        );
      }
      return <span key={i} className="align-middle">{part}</span>;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/dashboard" className="text-gray-400 hover:text-white flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <div className="flex items-center gap-2 text-indigo-400 font-mono">
          <Clock className="w-4 h-4" /> 02:00
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
        <h1 className="text-2xl font-semibold text-white mb-2">Reading: Fill in the Blanks</h1>
        <p className="text-gray-400 text-sm mb-6">Skills assessed: Reading</p>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 text-lg leading-relaxed text-gray-200 leading-loose">
          {renderText()}
        </div>

        <div className="mb-8 p-6 bg-[#0a0a0a] border border-white/10 rounded-xl">
          <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Word Bank</h3>
          <div className="flex flex-wrap gap-3">
            {currentQ.wordBank.map((word, idx) => {
              const isUsed = usedWords.includes(word);
              return (
                <div
                  key={idx}
                  draggable={!isUsed && !submitted}
                  onDragStart={() => handleDragStart(word)}
                  className={clsx(
                    "px-4 py-2 rounded-lg border select-none transition-all",
                    isUsed 
                      ? "bg-white/5 border-white/10 text-gray-600 opacity-50"
                      : "bg-white/10 border-white/20 text-white cursor-grab active:cursor-grabbing hover:bg-white/20"
                  )}
                >
                  {word}
                </div>
              );
            })}
          </div>
        </div>

        {submitted && (
          <div className="mb-6 p-4 rounded-xl border border-white/10 bg-[#0a0a0a]">
            <h3 className="text-lg font-semibold text-white mb-2">Score: <span className="text-indigo-400 font-mono">{score} / {currentQ.blanks.length}</span></h3>
            <div className="space-y-2">
              {Object.entries(currentQ.answers).map(([id, answer]) => (
                <div key={id} className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">Blank {id.replace('blank', '')}:</span>
                  {selections[id] === answer ? (
                    <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Correct ({answer})</span>
                  ) : (
                    <span className="text-red-400 flex items-center gap-1"><XCircle className="w-4 h-4"/> Incorrect (Correct: {answer})</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end">
          {!submitted ? (
            <button 
              onClick={handleSubmit}
              disabled={Object.keys(selections).length === 0}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Submit Answer
            </button>
          ) : (
            <button className="bg-white hover:bg-gray-200 text-black px-6 py-2 rounded-lg font-medium transition-colors">
              Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
