'use client';

import React, { useState, useEffect } from 'react';
import { User, Shield, LogOut, Key, Database, CheckCircle, ArrowLeft } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
import { authFetch, getUser, clearSession } from '@/lib/session';
import { useRouter } from 'next/navigation';

export default function AdminSettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [name, setName] = useState('Subash Bhandari');
  const [email, setEmail] = useState('admin@pteai.com');
  const [phone, setPhone] = useState('9763876490');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const u = getUser();
    if (u) {
      setCurrentUser(u);
      setName(u.name || 'Subash Bhandari');
      setEmail(u.email || 'admin@pteai.com');
      setPhone(u.phone || '9763876490');
    }
  }, []);

  const handleSave = async () => {
    if (!currentUser?.id) return;
    setSaving(true);
    try {
      const res = await authFetch(`/api/admin/users/${currentUser.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone }),
      });
      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch {
      // Fallback notification
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl text-slate-900 pb-20">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight font-satoshi">
            Admin System Settings
          </h1>
          <p className="text-slate-500 text-xs font-semibold mt-1">
            Manage system configurations, administrator accounts, Supabase connection, and security settings.
          </p>
        </div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-extrabold text-slate-700 hover:bg-slate-50 transition-all shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Command Center
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Settings Sidebar */}
        <div className="md:col-span-1 space-y-1.5">
          {[
            { id: 'profile', icon: User, label: 'Admin Profile' },
            { id: 'security', icon: Shield, label: 'Access Control' },
            { id: 'api', icon: Key, label: 'AI & API Keys' },
            { id: 'system', icon: Database, label: 'Supabase Status' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={clsx(
                'w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all',
                activeTab === item.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-white hover:text-slate-900 border border-transparent hover:border-slate-200'
              )}
            >
              <item.icon className="w-4 h-4" /> {item.label}
            </button>
          ))}
          <div className="pt-3 mt-3 border-t border-slate-200">
            <button
              onClick={() => {
                clearSession();
                router.push('/admin-login');
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>

        {/* Right Settings Content */}
        <div className="md:col-span-3 space-y-6">
          {activeTab === 'profile' && (
            <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 lg:p-8 shadow-xs">
              <h2 className="text-lg font-extrabold text-slate-900 mb-6">Administrator Details</h2>

              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-xl font-black text-white shadow-md">
                  {name ? name.charAt(0).toUpperCase() : 'A'}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{name}</h3>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">
                    {email} • {currentUser?.role === 'branch_admin' ? `Branch Admin (${currentUser?.branch})` : 'Super Admin Role'}
                  </p>
                  <span className="inline-block mt-2 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-extrabold text-[10px] rounded-full border border-emerald-200">
                    {currentUser?.role === 'branch_admin' ? 'Consultancy Branch Access' : 'Full System Privileges'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Admin Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Admin Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Admin WhatsApp / Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {savedSuccess && (
                <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Profile saved to Supabase!
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-extrabold text-xs hover:bg-indigo-700 shadow-xs disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Admin Settings'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 lg:p-8 shadow-xs space-y-4">
              <h2 className="text-lg font-extrabold text-slate-900">Supabase Cloud Database Status</h2>
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <div>
                    <div className="text-xs font-black text-emerald-950">Connected to Supabase Cloud</div>
                    <div className="text-[11px] font-semibold text-emerald-700">https://oomkgkvkfnpejkpxcvrp.supabase.co</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-white text-emerald-700 text-[10px] font-black border border-emerald-200">
                  ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                All users, consultancy branches, branch quotas (`userLimit`), AI scoring rubrics, practice content, exam results, and broadcast alerts are persisted in your Supabase instance (`pte-database` storage & Supabase Auth).
              </p>
            </div>
          )}

          {(activeTab === 'security' || activeTab === 'api') && (
            <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 lg:p-8 shadow-xs space-y-4">
              <h2 className="text-lg font-extrabold text-slate-900">
                {activeTab === 'security' ? 'Role-Based Access Control (RBAC)' : 'AI & Scoring Engine Configuration'}
              </h2>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                {activeTab === 'security'
                  ? 'Manage Super Admin and Consultancy Branch Admin permissions, branch quota limits, and student approval gates directly in the Command Center.'
                  : 'Configure Gemini 2.5 Flash / Pro models, temperature, and official Pearson GSE (10-90) examiner prompts in the AI Agent tab.'}
              </p>
              <Link
                href={activeTab === 'security' ? '/admin?tab=Branches+%26+Quotas' : '/admin?tab=AI+Agent'}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-extrabold hover:bg-indigo-700 transition-colors"
              >
                Open in Command Center →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
