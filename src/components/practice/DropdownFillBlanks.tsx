'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../ui/GlassCard';

interface DropdownFillBlanksProps {
  passage: string; // contains {{BLANK_1}}, {{BLANK_2}}
  blanks: { id: string; options: string[]; correctAnswer: string }[];
  onComplete: (answers: Record<string, string>) => void;
}

export default function DropdownFillBlanks({ passage, blanks, onComplete }: DropdownFillBlanksProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleSelect = (blankId: string, option: string) => {
    const newAnswers = { ...answers, [blankId]: option };
    setAnswers(newAnswers);
    setOpenDropdown(null);
    onComplete(newAnswers);
  };

  // Close dropdowns when clicking outside (simple implementation using overlay)
  const closeDropdowns = () => setOpenDropdown(null);

  const renderPassage = () => {
    const parts = passage.split(/(\{\{[^}]+\}\})/g);
    
    return (
      <div className="text-gray-200 text-lg leading-loose font-sans relative z-0">
        {parts.map((part, index) => {
          const match = part.match(/\{\{([^}]+)\}\}/);
          if (match) {
            const blankId = match[1];
            const blank = blanks.find(b => b.id === blankId);
            const selectedWord = answers[blankId];
            const isOpen = openDropdown === blankId;
            
            if (!blank) return <span key={index} className="text-red-400">[Missing Blank Data]</span>;

            return (
              <span key={index} className="relative inline-block mx-1 align-middle">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDropdown(isOpen ? null : blankId);
                  }}
                  className={cn(
                    "inline-flex items-center justify-between min-w-[140px] h-9 px-3 rounded-lg border transition-all text-sm font-medium",
                    selectedWord 
                      ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300" 
                      : "bg-white/5 border-white/20 text-gray-400 hover:bg-white/10",
                    isOpen && "ring-2 ring-indigo-500 border-indigo-500 bg-white/10 text-white"
                  )}
                >
                  <span className="truncate mr-2">{selectedWord || 'Select...'}</span>
                  <ChevronDown size={14} className={cn("shrink-0 transition-transform", isOpen && "rotate-180")} />
                </button>

                {isOpen && (
                  <div className="absolute top-full left-0 mt-1 w-max min-w-full bg-gray-900 border border-white/20 rounded-xl shadow-xl shadow-black/50 overflow-hidden z-50 py-1">
                    {blank.options.map((option, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(blankId, option);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-2 text-sm transition-colors",
                          selectedWord === option 
                            ? "bg-indigo-500/20 text-indigo-300" 
                            : "text-gray-300 hover:bg-white/10 hover:text-white"
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="w-full relative" onClick={closeDropdowns}>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
        {renderPassage()}
      </div>
    </div>
  );
}
