'use client';

import React from 'react';
import { cn } from '../ui/GlassCard';
import { Check, X, AlertTriangle } from 'lucide-react';
import Badge from '../ui/Badge';

interface MCQMultipleProps {
  question: string;
  options: { id: string; text: string }[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  disabled?: boolean;
  correctAnswers?: string[];
  showResult?: boolean;
  hasNegativeMarking?: boolean;
}

export default function MCQMultiple({
  question,
  options,
  selectedIds,
  onChange,
  disabled = false,
  correctAnswers = [],
  showResult = false,
  hasNegativeMarking = false,
}: MCQMultipleProps) {
  const toggleOption = (id: string) => {
    if (disabled) return;
    
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
          <h3 className="text-lg md:text-xl font-medium text-white leading-relaxed flex-1">
            {question}
          </h3>
          {hasNegativeMarking && !showResult && (
            <Badge variant="warning" className="shrink-0 flex items-center gap-1.5 self-start">
              <AlertTriangle size={12} />
              Negative Marking
            </Badge>
          )}
        </div>
        <p className="text-sm text-gray-400">Select all that apply.</p>
      </div>

      <div className="flex flex-col gap-3">
        {options.map((option) => {
          const isSelected = selectedIds.includes(option.id);
          const isCorrect = correctAnswers.includes(option.id);
          
          let stateClass = "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20";
          let icon = null;

          if (isSelected) {
            stateClass = "bg-indigo-500/20 border-indigo-500/50";
          }

          if (showResult) {
            if (isCorrect && isSelected) {
              stateClass = "bg-emerald-500/20 border-emerald-500/50";
              icon = <Check size={20} className="text-emerald-400" />;
            } else if (isCorrect && !isSelected) {
              // Missed correct answer
              stateClass = "bg-emerald-500/5 border-emerald-500/30 border-dashed";
              icon = <Check size={20} className="text-emerald-400/50" />;
            } else if (isSelected && !isCorrect) {
              // Wrongly selected
              stateClass = "bg-red-500/20 border-red-500/50";
              icon = <X size={20} className="text-red-400" />;
            } else {
              stateClass = "bg-white/5 border-white/10 opacity-50";
            }
          }

          return (
            <button
              key={option.id}
              onClick={() => toggleOption(option.id)}
              disabled={disabled}
              className={cn(
                "flex items-center gap-4 w-full p-4 rounded-xl border transition-all text-left",
                stateClass,
                disabled && !showResult && "opacity-70 cursor-not-allowed"
              )}
            >
              <div className={cn(
                "relative shrink-0 flex items-center justify-center w-5 h-5 rounded border transition-colors",
                isSelected && !showResult ? "bg-indigo-500 border-indigo-500" : "border-current",
                showResult ? "border-transparent" : ""
              )}>
                {isSelected && !showResult && (
                  <Check size={14} className="text-white" />
                )}
                {showResult && icon && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {icon}
                  </div>
                )}
              </div>
              <span className={cn(
                "text-base",
                showResult && isCorrect && isSelected ? "text-emerald-300 font-medium" :
                showResult && isCorrect && !isSelected ? "text-emerald-400/70" :
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
