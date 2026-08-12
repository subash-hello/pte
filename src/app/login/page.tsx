'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, Shield, User, Building2, ArrowRight, Loader2, KeyRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/types/auth';
import { setSession } from '@/lib/session';

export default function LoginPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e?: React.FormEvent, role?: UserRole) => {
    if (e) e.preventDefault();
    
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || 'Login failed');
      }

      // Success - set session
      setSession(data.token, data.user);

      // Redirect based on role
      if (data.user.role === 'super_admin' || data.user.role === 'branch_admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/dashboard';
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'student') {
      setEmail('student@pteai.com');
      setPassword('password123');
    } else if (role === 'branch_admin') {
      setEmail('ktm.admin@pteai.com');
      setPassword('admin123');
    } else if (role === 'super_admin') {
      setEmail('admin@ptemaster.com');
      setPassword('admin123');
    }
  };

  if (!mounted) return null;

  return (
    <div suppressHydrationWarning className="min-h-screen bg-[#faf9f6] text-[#1e293b] flex flex-col items-center justify-center p-6 font-sans selection:bg-[#ff6b4a]/20 selection:text-[#1e293b]">
      <div className="w-full max-w-md my-auto">
        {/* Brand Logo Header */}
        <div className="flex flex-col items-center justify-center mb-8 text-center">
          <Link href="/" className="inline-block group mb-3">
            <span className="text-3xl font-bold tracking-tight text-[#0f172a]">
              PTE Master<span className="text-[#ff6b4a]">.</span>
            </span>
          </Link>
          <p className="text-[#64748b] text-xs font-medium tracking-wide uppercase">
            PTE Academic Exam Portal
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-[#1e293b]/10 p-8 sm:p-10">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#0f172a] tracking-tight">Sign in</h1>
            <p className="text-[#64748b] text-xs font-light mt-1">Access your practice dashboard and scorecards.</p>
          </div>

          {/* Quick Role Fill Buttons */}
          <div className="mb-6">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#64748b] mb-2 flex items-center gap-1">
              <KeyRound className="w-3 h-3 text-[#0d9488]" /> Quick Credentials Preset
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('student')}
                className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all flex flex-col items-center gap-1 ${
                  selectedRole === 'student'
                    ? 'bg-[#0f172a] text-white border-[#0f172a]'
                    : 'bg-[#faf9f6] text-[#64748b] border-[#1e293b]/10 hover:border-[#1e293b]/30'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                Student
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('branch_admin')}
                className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all flex flex-col items-center gap-1 ${
                  selectedRole === 'branch_admin'
                    ? 'bg-[#0f172a] text-white border-[#0f172a]'
                    : 'bg-[#faf9f6] text-[#64748b] border-[#1e293b]/10 hover:border-[#1e293b]/30'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                Branch Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('super_admin')}
                className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all flex flex-col items-center gap-1 ${
                  selectedRole === 'super_admin'
                    ? 'bg-[#0f172a] text-white border-[#0f172a]'
                    : 'bg-[#faf9f6] text-[#64748b] border-[#1e293b]/10 hover:border-[#1e293b]/30'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                Super Admin
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748b] mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#94a3b8]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#faf9f6] border border-[#1e293b]/15 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/10 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748b]">Password</label>
                <Link href="#" className="text-xs text-[#0d9488] hover:underline font-medium">Forgot?</Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#94a3b8]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#faf9f6] border border-[#1e293b]/15 rounded-2xl pl-11 pr-11 py-3.5 text-sm text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#94a3b8] hover:text-[#0f172a]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-[#0f172a] text-white font-medium text-sm hover:bg-[#1e293b] active:scale-[0.99] transition-all shadow-lg shadow-[#0f172a]/10 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-[#64748b]">
            Don't have an account?{' '}
            <Link href="/signup" className="text-[#0f172a] font-semibold hover:text-[#ff6b4a] underline transition-colors">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
