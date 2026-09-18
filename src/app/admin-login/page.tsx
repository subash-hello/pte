'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, EyeOff, Server, ArrowRight, Loader2, AlertTriangle, ArrowLeft, CheckCircle2 } from 'lucide-react';
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

      // Enforce Admin Access Check
      if (data.user.role !== 'super_admin' && data.user.role !== 'branch_admin') {
        throw new Error('Access Denied: This account does not possess administrative privileges.');
      }

      // Set session
      setSession(data.token, data.user);
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Access Denied. Check credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col justify-center items-center p-4 font-sans selection:bg-rose-500 selection:text-white relative overflow-hidden">
      {/* Background Glow effects */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-[#131b2e]/90 backdrop-blur-xl border border-rose-500/20 rounded-[28px] p-8 shadow-2xl shadow-rose-950/40 relative z-10"
      >
        {/* Top Console Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-500 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-rose-600/30">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <span className="text-base font-black tracking-wider text-white block">
                ADMIN <span className="text-rose-500">CONSOLE</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">
                PTE Enterprise Gateway
              </span>
            </div>
          </div>

          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 uppercase tracking-widest flex items-center gap-1.5">
            <Server className="w-3 h-3 text-rose-400 animate-pulse" /> Secure Gate
          </span>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-black text-white tracking-tight">Staff Command Access</h2>
          <p className="text-xs text-slate-400 font-medium mt-1 leading-relaxed">
            Super Administrator and Campus Directors command gate. Session activity is monitored and recorded.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold leading-relaxed flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
          <div>
            <label className="block text-[11px] font-extrabold text-slate-300 uppercase tracking-wider mb-1.5">
              Administrative Email
            </label>
            <div className="relative">
              <Server className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter administrative email address"
                className="w-full pl-11 pr-4 py-3 bg-[#0c1220] border border-slate-700/80 rounded-xl text-white text-xs font-semibold placeholder:text-slate-600 focus:outline-none focus:border-rose-500 focus:bg-[#0c1220] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-extrabold text-slate-300 uppercase tracking-wider mb-1.5">
              Access Passcode
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter administrative credentials"
                className="w-full pl-11 pr-11 py-3 bg-[#0c1220] border border-slate-700/80 rounded-xl text-white text-xs font-semibold placeholder:text-slate-600 focus:outline-none focus:border-rose-500 focus:bg-[#0c1220] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-xs rounded-xl shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 active:scale-98 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Establishing Secure Session...</span>
              </>
            ) : (
              <>
                <span>Authenticate System Access</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Back to Candidate Portal */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Candidate Practice Portal</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
