'use client';

import React from 'react';
import { cn } from '../ui/GlassCard';
import { Check, X } from 'lucide-react';

interface MCQSingleProps {
  question: string;
  options: { id: string; text: string }[];
  selectedId: string | null;
  onChange: (id: string) => void;
  disabled?: boolean;
  correctAnswer?: string;
  showResult?: boolean;
}

export default function MCQSingle({
  question,
  options,
  selectedId,
  onChange,
  disabled = false,
  correctAnswer,
  showResult = false,
}: MCQSingleProps) {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg md:text-xl font-medium text-white leading-relaxed">
          {question}
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {options.map((option) => {
          const isSelected = selectedId === option.id;
          const isCorrect = option.id === correctAnswer;
          
          let stateClass = "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20";
          let icon = null;

          if (isSelected) {
            stateClass = "bg-indigo-500/20 border-indigo-500/50";
          }

          if (showResult) {
            if (isCorrect) {
              stateClass = "bg-emerald-500/20 border-emerald-500/50";
              icon = <Check size={20} className="text-emerald-400" />;
            } else if (isSelected && !isCorrect) {
              stateClass = "bg-red-500/20 border-red-500/50";
              icon = <X size={20} className="text-red-400" />;
            } else {
              stateClass = "bg-white/5 border-white/10 opacity-50";
            }
          }

          return (
            <button
              key={option.id}
              onClick={() => !disabled && onChange(option.id)}
              disabled={disabled}
              className={cn(
                "flex items-center gap-4 w-full p-4 rounded-xl border transition-all text-left",
                stateClass,
                disabled && !showResult && "opacity-70 cursor-not-allowed"
              )}
            >
              <div className="relative shrink-0 flex items-center justify-center w-5 h-5 rounded-full border border-current">
                {isSelected && !showResult && (
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                )}
                {showResult && icon && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {icon}
                  </div>
                )}
              </div>
              <span className={cn(
                "text-base",
                showResult && isCorrect ? "text-emerald-300 font-medium" :
                showResult && isSelected && !isCorrect ? "text-red-300" :
                isSelected ? "text-indigo-200 font-medium" : "text-gray-300"
              )}>
                {option.text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
