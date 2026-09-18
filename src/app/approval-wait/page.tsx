'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, Sparkles, Loader2, LogOut, CheckCircle, 
  ShieldCheck, MessageCircle, Phone, ArrowRight, RefreshCw, AlertTriangle
} from 'lucide-react';
import { getSession, setSession, clearSession } from '@/lib/session';

export default function ApprovalWaitPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [status, setStatus] = useState<'pending' | 'approved' | 'declined'>('pending');
  const [isChecking, setIsChecking] = useState(false);

  // Initial user load
  useEffect(() => {
    const session = getSession();
    if (session && session.user) {
      setUser(session.user);
      setStatus(session.user.status || 'pending');
      if (session.user.status === 'approved') {
        router.push('/dashboard');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  // Status check polling (every 3 seconds)
  useEffect(() => {
    if (status !== 'pending') return;

    const interval = setInterval(async () => {
      try {
        setIsChecking(true);
        const session = getSession();
        if (!session?.token) return;

        const res = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${session.token}` },
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.user) {
            const currentStatus = data.user.status;

            if (currentStatus === 'approved') {
              setStatus('approved');
              clearInterval(interval);
              
              // Update local session
              setSession(session.token, data.user);
              
              // Transition to dashboard
              setTimeout(() => {
                window.location.href = '/dashboard';
              }, 1800);
            } else if (currentStatus === 'declined') {
              setStatus('declined');
              clearInterval(interval);
              setSession(session.token, data.user);
            }
          }
        }
      } catch (err) {
        console.warn('Network issue checking user approval status:', err);
      } finally {
        setIsChecking(false);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [status, router]);

  const handleLogout = () => {
    clearSession();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col justify-center items-center p-4 font-sans selection:bg-indigo-600 selection:text-white">
      <div className="w-full max-w-md bg-white rounded-[28px] border border-slate-200 p-8 shadow-xl shadow-slate-200/50 text-center relative overflow-hidden">
        
        {/* Brand visual header */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-md">
            <Sparkles className="w-8 h-8 text-indigo-600 animate-pulse" />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* 1. PENDING STATUS SCREEN */}
          {status === 'pending' && (
            <motion.div
              key="pending"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div>
                <span className="text-[10px] font-mono font-extrabold uppercase px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 tracking-wider inline-flex items-center gap-1.5 mb-3">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  Verification Queue
                </span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Access Authorization Pending</h2>
                <p className="text-xs text-slate-500 font-semibold mt-2 leading-relaxed">
                  Your candidate registration for <span className="text-indigo-600 font-bold">{user?.branch || 'Kathmandu Central Campus'}</span> has been submitted and is currently being verified by the campus administrator.
                </p>
              </div>

              {/* Live Polling Visual Radar */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
                    Listening for Campus Approval...
                  </span>
                  <span className="text-[10px] font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                    Live
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  You don't need to refresh this tab. As soon as your campus director clicks <span className="font-bold text-emerald-600">Accept</span> in their administrative portal, your screen will automatically launch your practice dashboard.
                </p>
              </div>

              {/* Registered Student Summary */}
              {user && (
                <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 text-left text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-semibold">Candidate:</span>
                    <span className="font-extrabold text-slate-900">{user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-semibold">Target Score:</span>
                    <span className="font-extrabold text-indigo-700">{user.targetScore || '79+ (GSE 79)'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-semibold">Campus:</span>
                    <span className="font-extrabold text-slate-700">{user.branch}</span>
                  </div>
                </div>
              )}

              {/* Contact Campus / Logout */}
              <div className="space-y-3 pt-2">
                <a
                  href={`https://wa.me/9779851012345?text=Hello%20PTE%20Administration,%20I%20registered%20for%20access%20under%20${encodeURIComponent(user?.name || '')}%20(${encodeURIComponent(user?.email || '')}).%20Please%20approve%20my%20practice%20account.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Contact Campus WhatsApp for Fast Approval</span>
                </a>

                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* 2. APPROVED STATUS CELEBRATION */}
          {status === 'approved' && (
            <motion.div
              key="approved"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 py-4"
            >
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle className="w-10 h-10 text-emerald-600" />
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Access Approved!</h2>
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  Welcome to PTE Master AI. Redirecting to your personalized study dashboard...
                </p>
              </div>

              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5 }}
                  className="h-full bg-emerald-500"
                />
              </div>
            </motion.div>
          )}

          {/* 3. DECLINED STATUS SCREEN */}
          {status === 'declined' && (
            <motion.div
              key="declined"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="w-16 h-16 rounded-3xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto">
                <ShieldAlert className="w-8 h-8 text-rose-600" />
              </div>

              <div>
                <span className="text-[10px] font-mono font-extrabold uppercase px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 tracking-wider inline-block mb-3">
                  Request Declined
                </span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Registration Not Authorized</h2>
                <p className="text-xs text-slate-500 font-semibold mt-2 leading-relaxed">
                  Your registration request for <span className="font-bold text-slate-800">{user?.branch}</span> was declined by campus management. This typically occurs if enrollment quotas are exceeded or course fees are pending.
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <a
                  href="https://wa.me/9779851012345"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Contact Campus Helpdesk</span>
                </a>

                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Return to Sign In</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
