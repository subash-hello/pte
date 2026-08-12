'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from './GlassCard'; // Assuming we have cn here, or I can define it

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  icon?: React.ReactNode;
}

export default function GradientButton({
  children,
  variant = 'primary',
  size = 'md',
  href,
  icon,
  className,
  ...props
}: GradientButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl';
  
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-500 to-indigo-400 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 border border-indigo-400/50',
    secondary: 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/10 hover:-translate-y-0.5',
    outline: 'bg-transparent text-white border-2 border-white/20 hover:border-white/40 hover:bg-white/5 hover:-translate-y-0.5',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-3',
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
