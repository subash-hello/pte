'use client';

import React, { useMemo } from 'react';
import { cn } from '../ui/GlassCard';
import Badge from '../ui/Badge';
import { AlertTriangle } from 'lucide-react';

interface ClickableTranscriptProps {
  text: string;
  highlightedIndices: number[];
  onToggleWord: (index: number) => void;
  disabled?: boolean;
}

export default function ClickableTranscript({
  text,
  highlightedIndices,
  onToggleWord,
  disabled = false,
}: ClickableTranscriptProps) {
  // Split text into words, preserving punctuation
  const words = useMemo(() => {
    // This regex splits by spaces but keeps words and punctuation grouped appropriately
    // For simplicity, we just split by space and attach punctuation to the word
    return text.split(/\s+/).filter(w => w.length > 0);
  }, [text]);

  return (
    <div className="w-full flex flex-col gap-4">
      {!disabled && (
        <div className="flex justify-between items-center px-2">
          <span className="text-sm text-gray-400">Click on the words that are different from the audio.</span>
          <Badge variant="warning" className="flex items-center gap-1.5">
            <AlertTriangle size={12} />
            Negative Marking
          </Badge>
        </div>
      )}
      
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 leading-loose text-lg font-sans">
        {words.map((word, index) => {
          const isHighlighted = highlightedIndices.includes(index);
          
          return (
            <React.Fragment key={index}>
              <button
                onClick={() => !disabled && onToggleWord(index)}
                disabled={disabled}
                className={cn(
                  "px-1 py-0.5 rounded transition-colors inline-block",
                  isHighlighted 
                    ? "bg-red-500/20 text-red-300 line-through decoration-red-500/50" 
                    : "text-gray-200 hover:bg-white/10",
                  disabled && !isHighlighted && "opacity-70 hover:bg-transparent cursor-default",
                  disabled && isHighlighted && "cursor-default"
                )}
              >
                {word}
              </button>
              {' '}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
