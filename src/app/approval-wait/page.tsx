'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, ShieldAlert, MessageCircle, ArrowLeft, CheckCircle2, Sparkles, RefreshCw, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getUser, authFetch, setSession, getToken } from '@/lib/session';
import { useRouter } from 'next/navigation';

export default function ApprovalWaitPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const u = getUser();
    setUser(u);
    if (u?.status === 'approved') {
      router.replace('/dashboard');
    }
  }, [router]);

  const checkApprovalStatus = async () => {
    setChecking(true);
    try {
      const res = await authFetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        if (data?.user) {
          const token = getToken();
          if (token) setSession(token, data.user);
          setUser(data.user);
          if (data.user.status === 'approved') {
            router.replace('/dashboard');
          }
        }
      }
    } catch {
      // ignore
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Brand Header */}
      <div className="mb-8 z-10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#0b0f19] flex items-center justify-center shadow-sm">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900 font-satoshi">
            Master PTE <span className="text-[#e11d48]">AI</span>
          </span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white border-2 border-[#0b0f19] rounded-3xl p-8 text-center relative z-10 shadow-[6px_6px_0px_#0b0f19]"
      >
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-5 relative">
          <Clock className="w-8 h-8 animate-pulse" />
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 border-2 border-white" />
        </div>

        <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-black uppercase tracking-widest">
          Account Verification Pending
        </span>

        <h1 className="text-2xl font-black tracking-tight mt-3 mb-2 text-slate-900 font-satoshi">
          Awaiting Admin Approval
        </h1>
        <p className="text-slate-600 text-xs font-medium mb-6 leading-relaxed">
          Welcome{user?.name ? `, ${user.name}` : ''}! Your account is registered in Supabase and queued for approval by our Main Admin or your Consultancy Branch Admin.
        </p>

        {user?.branch && (
          <div className="mb-5 p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-left flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <div>
                <div className="text-[10px] font-black uppercase text-indigo-500">Assigned Consultancy Branch</div>
                <div className="text-xs font-extrabold text-slate-900">{user.branch}</div>
              </div>
            </div>
            {user.branchCode && (
              <span className="px-2.5 py-1 rounded-lg bg-white border border-indigo-200 font-mono text-[11px] font-black text-indigo-700">
                #{user.branchCode}
              </span>
            )}
          </div>
        )}

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-extrabold text-slate-900">Step 1: Registration Complete</div>
              <div className="text-[11px] text-slate-500 font-medium">
                {user?.email || 'Your student profile & target GSE score have been saved.'}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-extrabold text-amber-800">Step 2: Branch / Admin Verification</div>
              <div className="text-[11px] text-slate-500 font-medium">
                Your consultancy admin or Master PTE AI support team is verifying your enrollment quota.
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 opacity-60">
            <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-extrabold text-slate-700">Step 3: Full AI Portal Access</div>
              <div className="text-[11px] text-slate-500 font-medium">
                Instant access to AI Speaking, Writing, Reading, Listening & Mock Tests.
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <a
            href={`https://wa.me/9779763876490?text=${encodeURIComponent(
              `Hello Master PTE AI Admin! Please approve my student account (${user?.email || 'New Student'}${
                user?.branchCode ? `, Branch Code: ${user.branchCode}` : ''
              }).`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-6 rounded-xl bg-[#10b981] hover:bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all border-2 border-[#0b0f19] shadow-[3px_3px_0px_#0b0f19]"
          >
            <MessageCircle className="w-4 h-4" /> Message Admin on WhatsApp (+977 976-3876490)
          </a>

          <button
            onClick={checkApprovalStatus}
            disabled={checking}
            className="w-full py-3 px-6 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 font-extrabold text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${checking ? 'animate-spin' : ''}`} />
            {checking ? 'Checking Approval Status...' : 'I Have Been Approved — Refresh Status'}
          </button>

          <Link
            href="/login"
            className="w-full py-2.5 px-6 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 font-bold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
