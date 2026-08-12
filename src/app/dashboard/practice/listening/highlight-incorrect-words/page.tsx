'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Square, AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';

export default function HighlightIncorrectWords() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedWords, setSelectedWords] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const mockTranscript = [
    { id: 0, text: 'When', isIncorrect: false, correct: 'When' },
    { id: 1, text: 'examining', isIncorrect: false, correct: 'examining' },
    { id: 2, text: 'the', isIncorrect: false, correct: 'the' },
    { id: 3, text: 'fossils', isIncorrect: true, correct: 'records' },
    { id: 4, text: ',', isIncorrect: false, correct: ',' },
    { id: 5, text: 'we', isIncorrect: false, correct: 'we' },
    { id: 6, text: 'can', isIncorrect: false, correct: 'can' },
    { id: 7, text: 'clearly', isIncorrect: true, correct: 'barely' },
    { id: 8, text: 'see', isIncorrect: false, correct: 'see' },
    { id: 9, text: 'the', isIncorrect: false, correct: 'the' },
    { id: 10, text: 'evolutionary', isIncorrect: false, correct: 'evolutionary' },
    { id: 11, text: 'path', isIncorrect: true, correct: 'tree' },
    { id: 12, text: '.', isIncorrect: false, correct: '.' },
  ];

  const toggleWord = (id: number) => {
    if (submitted) return;
    // Don't allow clicking punctuation
    if (['.', ',', '?', '!'].includes(mockTranscript[id].text)) return;
    
    setSelectedWords(prev => 
      prev.includes(id) ? prev.filter(wId => wId !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    let currentScore = 0;
    mockTranscript.forEach(word => {
      const isSelected = selectedWords.includes(word.id);
      if (word.isIncorrect && isSelected) currentScore++;
      else if (!word.isIncorrect && isSelected) currentScore--;
    });
    setScore(Math.max(0, currentScore));
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <Link href="/dashboard" className="text-gray-400 hover:text-white flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
        <h1 className="text-2xl font-semibold text-white mb-2">Highlight Incorrect Words</h1>
        <div className="flex items-center gap-2 mb-6">
          <span className="text-gray-400 text-sm">Skills assessed: Listening, Reading</span>
          <span className="flex items-center gap-1 px-2 py-1 rounded bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
            <AlertTriangle className="w-3 h-3" /> Negative Marking
          </span>
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4 mb-8 flex items-center gap-4 w-max">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white"
          >
            {isPlaying ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 ml-1 fill-current" />}
          </button>
          <span className="text-gray-400 text-sm">Audio Track</span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 text-xl leading-loose">
          {mockTranscript.map((word) => {
            const isSelected = selectedWords.includes(word.id);
            const isPunctuation = ['.', ',', '?', '!'].includes(word.text);
            
            let className = "px-1 mx-0.5 rounded transition-colors ";
            
            if (isPunctuation) {
              className += "text-gray-200";
            } else if (submitted) {
              if (word.isIncorrect && isSelected) className += "bg-emerald-500/30 text-emerald-200 border-b-2 border-emerald-500";
              else if (word.isIncorrect && !isSelected) className += "bg-amber-500/30 text-amber-200 border-b-2 border-amber-500"; // Missed
              else if (!word.isIncorrect && isSelected) className += "bg-red-500/30 text-red-200 border-b-2 border-red-500"; // Wrongly selected
              else className += "text-gray-200";
            } else {
              className += isSelected ? "bg-indigo-500/30 text-indigo-200 cursor-pointer" : "text-gray-200 hover:bg-white/10 cursor-pointer";
            }

            return (
              <span 
                key={word.id} 
                onClick={() => toggleWord(word.id)}
                className={className}
                title={submitted && word.isIncorrect ? `Audio said: ${word.correct}` : undefined}
              >
                {word.text}
              </span>
            );
          })}
        </div>

        {submitted && (
          <div className="mb-6 p-4 rounded-xl border border-white/10 bg-[#0a0a0a]">
            <h3 className="text-lg font-semibold text-white mb-2">Score: <span className="text-indigo-400 font-mono">{score}</span></h3>
            <div className="flex gap-4 text-sm mt-2">
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-emerald-500/30 border-b-2 border-emerald-500 inline-block"></span> Correctly identified</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-500/30 border-b-2 border-red-500 inline-block"></span> Wrongly identified</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-amber-500/30 border-b-2 border-amber-500 inline-block"></span> Missed incorrect word</span>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          {!submitted ? (
            <button onClick={handleSubmit} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium">Submit Answer</button>
          ) : (
            <button className="bg-white hover:bg-gray-200 text-black px-6 py-2 rounded-lg font-medium">Next Question</button>
          )}
        </div>
      </div>
    </div>
  );
}
