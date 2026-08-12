'use client';

import React from 'react';
import { ShieldAlert, MessageSquare, ArrowLeft, Lock, X } from 'lucide-react';
import Link from 'next/link';
import { getUser } from '@/lib/session';

export function isPendingStudent(): boolean {
  if (typeof window === 'undefined') return false;
  const user = getUser();
  if (!user) return false;
  // If role is student and status is not approved (i.e. 'pending' or missing/unapproved), lock practice
  return user.role === 'student' && user.status !== 'approved';
}

export function isQuestionLockedForUser(index: number): boolean {
  if (typeof window === 'undefined') return false;
  // Index 0 (Question 1) is unlocked; Question #2+ (index > 0) is locked for pending students
  return isPendingStudent() && index > 0;
}

interface PendingTrialGuardProps {
  currentQuestionIndex?: number;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function PendingTrialGuard({ currentQuestionIndex = 0, isOpen = false, onClose }: PendingTrialGuardProps) {
  const user = getUser();

  const isLocked = (isOpen || (currentQuestionIndex > 0 && isPendingStudent()));

  // If user is not pending or question is not locked, don't render
  if (!user || !isPendingStudent() || !isLocked) {
    return null;
  }

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      `Hi Admin, I have registered on Master PTE AI (${user.name} / ${user.email}). My account status is pending. Please approve my account for full access.`
    );
    window.open(`https://wa.me/9779763876490?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-200 text-slate-900 text-center space-y-6 relative">
        
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 bg-amber-100 text-amber-800 text-[11px] font-extrabold rounded-full uppercase tracking-wider">
            Trial Limit (1 Question Available)
          </span>
          <h3 className="text-2xl font-bold text-slate-900 pt-2">Account Pending Approval</h3>
          <p className="text-slate-600 text-xs leading-relaxed font-medium">
            As a newly registered student, your trial access unlocks <strong>Question #1 only</strong> for each practice task. Questions #2 and above remain locked until an Admin approves your registration.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-700 font-bold">
            <span>Student Name:</span>
            <span className="text-slate-900">{user.name}</span>
          </div>
          <div className="flex items-center justify-between text-slate-700 font-bold">
            <span>Account Status:</span>
            <span className="text-amber-600 uppercase font-black">Pending Approval</span>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={handleWhatsAppClick}
            className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" /> Request WhatsApp Approval (+977 9763876490)
          </button>

          <Link
            href="/dashboard"
            className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
