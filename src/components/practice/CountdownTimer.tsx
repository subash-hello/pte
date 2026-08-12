'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import clsx from 'clsx';

interface CountdownTimerProps {
  totalSeconds: number;
  onComplete: () => void;
  autoStart?: boolean;
  type?: 'preparation' | 'recording' | 'section';
  label?: string;
}

export default function CountdownTimer({
  totalSeconds,
  onComplete,
  autoStart = true,
  type = 'preparation',
  label,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const lastUpdate = useRef(Date.now());
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const delta = Math.floor((now - lastUpdate.current) / 1000);
      
      if (delta > 0) {
        setTimeLeft((prev) => {
          const next = prev - delta;
          if (next <= 0) {
            clearInterval(interval);
            onCompleteRef.current();
            return 0;
          }
          return next;
        });
        lastUpdate.current = now;
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) {
      lastUpdate.current = Date.now();
    }
  }, [isRunning]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const percentage = (timeLeft / totalSeconds) * 100;
  
  let colorClass = 'text-indigo-600';
  let strokeClass = 'stroke-indigo-600';
  let bgClass = 'bg-indigo-600';
  
  if (percentage <= 25) {
    colorClass = 'text-rose-600';
    strokeClass = 'stroke-rose-600';
    bgClass = 'bg-rose-600';
  } else if (percentage <= 50) {
    colorClass = 'text-amber-600';
    strokeClass = 'stroke-amber-600';
    bgClass = 'bg-amber-600';
  }

  if (type === 'preparation') {
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        {label && <span className="text-slate-500 font-bold text-xs uppercase tracking-wider">{label}</span>}
        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r={radius}
              className="stroke-slate-200"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="80"
              cy="80"
              r={radius}
              className={clsx('transition-all duration-1000 ease-linear', strokeClass)}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <span className={clsx('text-4xl font-mono font-black', colorClass)}>
            {timeLeft}s
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        {label && <span className="text-slate-700 font-bold text-xs uppercase tracking-wider">{label}</span>}
        <div className="flex items-center gap-4">
          <span className={clsx('font-mono text-xl font-black', colorClass)}>
            {formatTime(timeLeft)}
          </span>
          {type === 'section' && (
            <button
              onClick={toggleTimer}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              {isRunning ? <Pause size={16} /> : <Play size={16} />}
            </button>
          )}
        </div>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={clsx('h-full transition-all duration-1000 ease-linear', bgClass)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
