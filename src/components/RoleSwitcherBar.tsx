'use client';

import React, { useState, useEffect } from 'react';
import { 
  Shield, Building2, GraduationCap, ChevronDown, Check, Sparkles, User, RefreshCw, X 
} from 'lucide-react';
import { getUser, setSession } from '@/lib/session';

interface Persona {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'branch_admin' | 'student';
  branch: string;
  status: 'approved' | 'pending';
  targetScore: string;
  description: string;
  avatarColor: string;
}

const PERSONAS: Persona[] = [
  {
    id: 'super_admin_01',
    name: 'Super Admin',
    email: 'admin@ptemaster.com',
    role: 'super_admin',
    branch: 'Central Headquarters',
    status: 'approved',
    targetScore: 'Global Master',
    description: 'Full institutional control across all campuses',
    avatarColor: 'bg-slate-900 text-white',
  },
  {
    id: 'branch_admin_01',
    name: 'Ramesh Sharma',
    email: 'ktm.admin@pteai.com',
    role: 'branch_admin',
    branch: 'Kathmandu Central Campus',
    status: 'approved',
    targetScore: 'Branch Director',
    description: 'Kathmandu campus operations & student queues',
    avatarColor: 'bg-purple-600 text-white',
  },
  {
    id: 'branch_admin_02',
    name: 'Sita Sharma',
    email: 'pokhara.admin@pteai.com',
    role: 'branch_admin',
    branch: 'Pokhara Regional Campus',
    status: 'approved',
    targetScore: 'Branch Director',
    description: 'Pokhara regional campus administration',
    avatarColor: 'bg-indigo-600 text-white',
  },
  {
    id: 'student_01',
    name: 'Subash Bhandari',
    email: 'subash.bhandari@pteai.com',
    role: 'student',
    branch: 'Kathmandu Central Campus',
    status: 'approved',
    targetScore: '79+ (GSE 79)',
    description: 'Active approved student (1,420 XP, 14d Streak)',
    avatarColor: 'bg-emerald-600 text-white',
  },
  {
    id: 'student_02',
    name: 'Pooja Adhikari',
    email: 'pooja.adhikari@gmail.com',
    role: 'student',
    branch: 'Kathmandu Central Campus',
    status: 'pending',
    targetScore: '65+ (GSE 65)',
    description: 'Pending authorization access queue',
    avatarColor: 'bg-amber-600 text-white',
  },
  {
    id: 'student_03',
    name: 'Bikash Shrestha',
    email: 'bikash.shrestha@gmail.com',
    role: 'student',
    branch: 'Pokhara Regional Campus',
    status: 'approved',
    targetScore: '79+ (GSE 79)',
    description: 'Active approved student (2,150 XP, 21d Streak)',
    avatarColor: 'bg-teal-600 text-white',
  },
  {
    id: 'student_04',
    name: 'Anjali Karki',
    email: 'anjali.karki@outlook.com',
    role: 'student',
    branch: 'Pokhara Regional Campus',
    status: 'pending',
    targetScore: '84+ (GSE 84)',
    description: 'Pending authorization access queue',
    avatarColor: 'bg-rose-600 text-white',
  },
];

export default function RoleSwitcherBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isSwitching, setIsSwitching] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const user = getUser();
    setCurrentUser(user);
  }, []);

  const handleSelectPersona = async (p: Persona) => {
    setIsSwitching(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: p.email, password: p.role === 'student' ? 'password123' : 'admin123' }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        setSession(data.token, data.user);
        setCurrentUser(data.user);
        setIsOpen(false);
        
        // Route according to role
        if (p.role === 'super_admin' || p.role === 'branch_admin') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/dashboard';
        }
      } else {
        // Fallback local session
        setSession(`demo_${p.id}`, p as any);
        setCurrentUser(p);
        setIsOpen(false);
        if (p.role === 'super_admin' || p.role === 'branch_admin') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/dashboard';
        }
      }
    } catch {
      setSession(`demo_${p.id}`, p as any);
      setCurrentUser(p);
      setIsOpen(false);
      window.location.reload();
    } finally {
      setIsSwitching(false);
    }
  };

  if (dismissed) {
    return (
      <button
        onClick={() => setDismissed(false)}
        className="fixed bottom-4 right-4 z-50 px-3 py-1.5 bg-slate-900 text-white text-[11px] font-bold rounded-full shadow-lg flex items-center gap-1.5 hover:bg-slate-800 transition-all border border-slate-700"
        title="Open Role Switcher"
      >
        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
        <span>Switch Persona</span>
      </button>
    );
  }

  const activePersona = PERSONAS.find(p => p.email === currentUser?.email) || PERSONAS[0];

  return (
    <aside aria-label="Demo role selector" className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 font-sans shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4 text-xs font-semibold">
        {/* Left Side: Current Role Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-1.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded-md text-[10px] uppercase font-extrabold shrink-0">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span>Interactive Demo</span>
          </div>

          <div className="flex items-center gap-2 truncate">
            <span className="text-slate-400 hidden sm:inline">Active Persona:</span>
            <span className="font-extrabold text-white truncate flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${activePersona.status === 'approved' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              {currentUser?.name || activePersona.name}
            </span>
            <span className="text-slate-500 hidden md:inline">•</span>
            <span className="text-slate-300 hidden md:inline text-[11px] truncate">
              {currentUser?.branch || activePersona.branch}
            </span>
          </div>
        </div>

        {/* Right Side: Switch Button & Dropdown */}
        <div className="relative flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            disabled={isSwitching}
            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
          >
            {isSwitching ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <User className="w-3.5 h-3.5" />
            )}
            <span>Switch Role / User ({PERSONAS.length})</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          <button
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-white p-1 rounded-md"
            title="Minimize Bar"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 text-xs font-normal">
              <div className="p-2 border-b border-slate-800 flex items-center justify-between">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">
                  Select User Persona to Test
                </span>
                <span className="text-[10px] text-indigo-400 font-mono">1-Click Fast Auth</span>
              </div>

              <div className="max-h-96 overflow-y-auto divide-y divide-slate-800/60 p-1">
                {PERSONAS.map((p) => {
                  const isCurrent = currentUser?.email === p.email;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleSelectPersona(p)}
                      className={`w-full text-left p-2.5 rounded-xl flex items-start gap-3 transition-colors ${
                        isCurrent ? 'bg-indigo-600/20 border border-indigo-500/40' : 'hover:bg-slate-800/80'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg ${p.avatarColor} flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-2xs`}>
                        {p.role === 'super_admin' ? <Shield className="w-4 h-4" /> :
                         p.role === 'branch_admin' ? <Building2 className="w-4 h-4" /> :
                         <GraduationCap className="w-4 h-4" />}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-extrabold text-white text-xs truncate">{p.name}</span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                            p.status === 'approved' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {p.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">{p.email}</p>
                        <p className="text-[10px] text-indigo-300 font-semibold truncate mt-0.5">
                          {p.branch} • {p.targetScore}
                        </p>
                      </div>

                      {isCurrent && (
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
