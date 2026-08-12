'use client';

import React from 'react';
import { cn } from './GlassCard';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'new' | 'info';
  children: React.ReactNode;
}

export default function Badge({
  children,
  variant = 'default',
  className,
  ...props
}: BadgeProps) {
  const variants = {
    default: 'bg-white/10 text-gray-200 border border-white/10',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    error: 'bg-red-500/10 text-red-400 border border-red-500/20',
    new: 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white border border-indigo-400/50 animate-pulse',
    info: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
