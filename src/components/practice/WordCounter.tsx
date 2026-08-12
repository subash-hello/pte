'use client';

import React, { useMemo } from 'react';
import { AlertCircle } from 'lucide-react';
import clsx from 'clsx';

interface WordCounterProps {
  text: string;
  min: number;
  max: number;
}

export default function WordCounter({ text, min, max }: WordCounterProps) {
  const wordCount = useMemo(() => {
    return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  }, [text]);

  const isTooShort = wordCount > 0 && wordCount < min;
  const isTooLong = wordCount > max;
  const isGood = wordCount >= min && wordCount <= max;
  
  let colorClass = 'text-slate-600';
  let barClass = 'bg-slate-400';
  
  if (isGood) {
    colorClass = 'text-emerald-600';
    barClass = 'bg-emerald-500';
  } else if (isTooShort || isTooLong) {
    colorClass = 'text-rose-600';
    barClass = 'bg-rose-500';
  }

  const visualMax = Math.max(max * 1.2, wordCount);
  const percent = Math.min(100, (wordCount / visualMax) * 100);
  
  const minPercent = (min / visualMax) * 100;
  const maxPercent = (max / visualMax) * 100;

  return (
    <div className={clsx("inline-flex flex-col gap-1.5", colorClass)}>
      <div className="flex items-center justify-between text-xs font-bold">
        <span className="flex items-center gap-1.5">
          Words: <span className="text-sm font-mono font-extrabold">{wordCount}</span>
        </span>
        <span className="text-slate-400 font-semibold">
          Target: {min}-{max}
        </span>
      </div>
      
      <div className="relative h-2 w-48 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
        <div 
          className={clsx("absolute h-full top-0 opacity-20", isGood ? "bg-emerald-500" : "bg-slate-400")}
          style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
        />
        
        <div 
          className={clsx("absolute h-full top-0 left-0 transition-all duration-300 rounded-full", barClass)}
          style={{ width: `${percent}%` }}
        />
      </div>

      {(isTooShort || isTooLong) && wordCount > 0 && (
        <div className="flex items-center gap-1 text-[11px] font-bold mt-0.5">
          <AlertCircle size={12} />
          <span>{isTooShort ? `Add ${min - wordCount} more words` : `Remove ${wordCount - max} words`}</span>
        </div>
      )}
    </div>
  );
}
