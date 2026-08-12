'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '../ui/GlassCard';
import { TaskScore } from '@/types/pte';
import { CheckCircle2, ChevronRight } from 'lucide-react';

interface ScoreDisplayProps {
  score: TaskScore;
  maxScore: number;
  type: 'speaking' | 'writing' | 'reading' | 'listening';
}

export default function ScoreDisplay({ score, maxScore, type }: ScoreDisplayProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const percentage = (score.total / maxScore) * 100;
  
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += 1;
      setAnimatedScore(Math.min((current / steps) * score.total, score.total));
      if (current >= steps) {
        clearInterval(timer);
        setAnimatedScore(score.total);
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [score.total]);

  let colorClass = 'text-emerald-400';
  let strokeClass = 'stroke-emerald-400';
  let bgClass = 'bg-emerald-400';
  let gradientClass = 'from-emerald-500/20 to-emerald-500/0';

  if (percentage < 50) {
    colorClass = 'text-red-400';
    strokeClass = 'stroke-red-400';
    bgClass = 'bg-red-500';
    gradientClass = 'from-red-500/20 to-red-500/0';
  } else if (percentage < 75) {
    colorClass = 'text-amber-400';
    strokeClass = 'stroke-amber-400';
    bgClass = 'bg-amber-400';
    gradientClass = 'from-amber-500/20 to-amber-500/0';
  }

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / maxScore) * circumference;

  const getSubscores = () => {
    const scores = [];
    if (score.content !== undefined) scores.push({ label: 'Content', value: score.content, max: type === 'speaking' || type === 'writing' ? 90 : 5 });
    if (score.oralFluency !== undefined) scores.push({ label: 'Oral Fluency', value: score.oralFluency, max: 90 });
    if (score.pronunciation !== undefined) scores.push({ label: 'Pronunciation', value: score.pronunciation, max: 90 });
    if (score.form !== undefined) scores.push({ label: 'Form', value: score.form, max: 2 });
    if (score.grammar !== undefined) scores.push({ label: 'Grammar', value: score.grammar, max: 90 });
    if (score.vocabulary !== undefined) scores.push({ label: 'Vocabulary', value: score.vocabulary, max: 90 });
    if (score.spelling !== undefined) scores.push({ label: 'Spelling', value: score.spelling, max: 90 });
    if (score.writtenDiscourse !== undefined) scores.push({ label: 'Written Discourse', value: score.writtenDiscourse, max: 90 });
    
    // Normalize max to percentage for progress bars if max isn't standard
    return scores.map(s => ({ ...s, percent: (s.value / s.max) * 100 }));
  };

  const subscores = getSubscores();

  return (
    <div className="w-full flex flex-col gap-6">
      <div className={cn("bg-gradient-to-b border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8", gradientClass)}>
        
        {/* Main Score Circle */}
        <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90 drop-shadow-xl">
            <circle
              cx="96"
              cy="96"
              r={radius}
              className="stroke-black/20"
              strokeWidth="12"
              fill="transparent"
            />
            <circle
              cx="96"
              cy="96"
              r={radius}
              className={cn('transition-all duration-300 ease-out', strokeClass)}
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="flex flex-col items-center">
            <span className={cn("text-5xl font-bold font-mono tracking-tighter", colorClass)}>
              {Math.round(animatedScore)}
            </span>
            <span className="text-sm text-gray-400 mt-1 font-medium">Out of {maxScore}</span>
          </div>
        </div>

        {/* Subscores */}
        <div className="flex-1 w-full flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-white mb-2">Score Breakdown</h3>
          {subscores.map((sub, idx) => (
            <div key={idx} className="flex flex-col gap-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300 font-medium">{sub.label}</span>
                <span className="text-white font-mono">{sub.value} / {sub.max}</span>
              </div>
              <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                <div 
                  className={cn("h-full rounded-full transition-all duration-1000", bgClass)}
                  style={{ width: `${sub.percent}%`, transitionDelay: `${idx * 100}ms` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Feedback */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle2 size={20} className="text-indigo-400" />
            AI Feedback
          </h3>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            {score.feedback}
          </p>
        </div>

        {/* Improvements */}
        {score.improvements.length > 0 && (
          <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-indigo-300 mb-4 flex items-center gap-2">
              Areas for Improvement
            </h3>
            <ul className="flex flex-col gap-3">
              {score.improvements.map((improvement, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm md:text-base text-indigo-100/80 leading-relaxed">
                  <ChevronRight size={18} className="text-indigo-400 shrink-0 mt-0.5" />
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
