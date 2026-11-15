'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, EyeOff, Server, ArrowRight, Loader2, AlertTriangle, GraduationCap, MessageCircle } from 'lucide-react';
import { setSession } from '@/lib/session';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent, customEmail?: string, customPass?: string) => {
    if (e) e.preventDefault();
    const loginEmail = (customEmail || email).trim().toLowerCase();
    const loginPass = customPass || password;

    if (!loginEmail || !loginPass) {
      setError('Please enter both administrative email and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPass }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Administrative authentication failed.');
      }

      if (data.user.role !== 'super_admin' && data.user.role !== 'branch_admin') {
        throw new Error('Access Denied: This account does not possess administrative privileges.');
      }

      setSession(data.token, data.user);
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Access Denied. Check credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f5fa] flex flex-col justify-center items-center p-4 font-sans selection:bg-rose-500 selection:text-white relative overflow-hidden">
      {/* Subtle Light Background Glow matching masterieltsai.com/admin-login */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-[440px] bg-white border border-slate-200/90 rounded-[28px] p-8 shadow-xl shadow-slate-200/70 relative z-10"
      >
        {/* Top Console Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center text-white shadow-md shadow-orange-500/25">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-black tracking-wider text-slate-900 block">
                ADMIN <span className="text-rose-600">CONSOLE</span>
              </span>
            </div>
          </div>

          <span className="text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-600 uppercase tracking-widest flex items-center gap-1.5">
            <Server className="w-3 h-3 text-rose-500" /> SECURE MODE
          </span>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight font-satoshi">System Access</h2>
          <p className="text-xs text-slate-500 font-semibold mt-1 leading-relaxed">
            Staff &amp; System Administrator Command authentication gate. Access is fully monitored.
          </p>
        </div>

        {error && (
          <div className="mb-5 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold leading-relaxed flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
          <div className="relative">
            <Server className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Administrative email"
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white transition-all"
            />
          </div>

          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Security password"
              className="w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 active:scale-[0.99] mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AUTHORIZING SESSION...</span>
              </>
            ) : (
              <>
                <span>AUTHORIZE SESSION</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Back to Student Portal Gate */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-extrabold text-slate-700 transition-colors"
          >
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>Access Student Portal Gate</span>
          </Link>
        </div>
      </motion.div>

      {/* Floating Chat with Admin WhatsApp Pill */}
      <a
        href="https://wa.me/9779763876490"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 px-4 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/30 flex items-center gap-2 transition-all hover:scale-105"
      >
        <MessageCircle className="w-4 h-4 fill-white" />
        <span>Chat with Admin</span>
      </a>
    </div>
  );
}
