'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '../ui/GlassCard';

interface DragDropFillBlanksProps {
  passage: string; // contains {{BLANK_1}}, {{BLANK_2}}, etc.
  blanks: { id: string; correctAnswer: string }[];
  wordBank: string[];
  onComplete: (answers: Record<string, string>) => void;
}

export default function DragDropFillBlanks({ passage, blanks, wordBank, onComplete }: DragDropFillBlanksProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [draggedWord, setDraggedWord] = useState<string | null>(null);
  const [dragSource, setDragSource] = useState<'bank' | string | null>(null);
  
  // Parse passage into parts and blanks
  const renderPassage = () => {
    // Basic regex to find {{BLANK_ID}}
    const parts = passage.split(/(\{\{[^}]+\}\})/g);
    
    return (
      <div className="text-gray-200 text-lg leading-loose font-sans">
        {parts.map((part, index) => {
          const match = part.match(/\{\{([^}]+)\}\}/);
          if (match) {
            const blankId = match[1];
            const filledWord = answers[blankId];
            
            return (
              <span
                key={index}
                className={cn(
                  "inline-flex items-center justify-center min-w-[120px] h-9 mx-2 px-3 align-middle rounded-lg transition-colors border-2",
                  filledWord 
                    ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300 font-medium cursor-grab active:cursor-grabbing" 
                    : "bg-white/5 border-dashed border-white/20 text-transparent"
                )}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'move';
                  e.currentTarget.classList.add('border-indigo-400', 'bg-indigo-500/10');
                }}
                onDragLeave={(e) => {
                  e.currentTarget.classList.remove('border-indigo-400', 'bg-indigo-500/10');
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove('border-indigo-400', 'bg-indigo-500/10');
                  
                  if (draggedWord) {
                    const newAnswers = { ...answers };
                    
                    // If word came from another blank, clear the old blank
                    if (dragSource && dragSource !== 'bank') {
                      delete newAnswers[dragSource];
                    }
                    
                    // If this blank already had a word, we just replace it
                    // The old word naturally goes back to the bank because it's no longer in answers
                    
                    newAnswers[blankId] = draggedWord;
                    setAnswers(newAnswers);
                    onComplete(newAnswers);
                  }
                  
                  setDraggedWord(null);
                  setDragSource(null);
                }}
                draggable={!!filledWord}
                onDragStart={(e) => {
                  if (filledWord) {
                    setDraggedWord(filledWord);
                    setDragSource(blankId);
                    e.dataTransfer.effectAllowed = 'move';
                  } else {
                    e.preventDefault();
                  }
                }}
                onDragEnd={() => {
                  setDraggedWord(null);
                  setDragSource(null);
                }}
              >
                {filledWord || 'drop here'}
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Passage Area */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
        {renderPassage()}
      </div>

      {/* Word Bank */}
      <div 
        className="bg-black/20 border border-white/5 rounded-2xl p-6"
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
        }}
        onDrop={(e) => {
          e.preventDefault();
          if (draggedWord && dragSource && dragSource !== 'bank') {
            const newAnswers = { ...answers };
            delete newAnswers[dragSource];
            setAnswers(newAnswers);
            onComplete(newAnswers);
          }
          setDraggedWord(null);
          setDragSource(null);
        }}
      >
        <h3 className="text-gray-400 text-sm font-medium mb-4">Word Bank (Drag words to blanks)</h3>
        <div className="flex flex-wrap gap-3">
          {wordBank.map((word, index) => {
            const isUsed = Object.values(answers).includes(word);
            
            return (
              <div
                key={index}
                draggable={!isUsed}
                onDragStart={(e) => {
                  setDraggedWord(word);
                  setDragSource('bank');
                  e.dataTransfer.effectAllowed = 'move';
                }}
                onDragEnd={() => {
                  setDraggedWord(null);
                  setDragSource(null);
                }}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all select-none",
                  isUsed 
                    ? "bg-white/5 border border-white/5 text-gray-600 cursor-not-allowed" 
                    : "bg-white/10 hover:bg-white/20 border border-white/20 text-gray-200 cursor-grab active:cursor-grabbing shadow-lg"
                )}
              >
                {word}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
