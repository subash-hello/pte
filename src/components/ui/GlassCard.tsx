'use client';

import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export default function GlassCard({ 
  children, 
  className, 
  hoverEffect = false,
  ...props 
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-6',
        'bg-white/5 backdrop-blur-xl',
        'border border-white/10',
        hoverEffect && 'transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
