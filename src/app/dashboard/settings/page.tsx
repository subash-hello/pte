'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { User, CreditCard, Bell, Shield, LogOut, ArrowLeft } from 'lucide-react';
import clsx from 'clsx';

export default function SettingsPage() {
  const [activeSettingsTab, setActiveSettingsTab] = useState('profile');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [userSession, setUserSession] = useState<any>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('pte_user_session');
        if (saved) setUserSession(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Sidebar
        activeTab="settings"
        mobileOpen={mobileSidebarOpen}
        userSession={userSession}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        setActiveTab={(tab) => {
          if (tab === 'dashboard' || tab === 'speaking' || tab === 'writing' || tab === 'reading' || tab === 'listening' || tab === 'mock' || tab === 'ai_tutor' || tab === 'vocabulary' || tab === 'progress' || tab === 'notebook' || tab === 'templates') {
            window.location.href = '/dashboard';
          }
        }}
      />

      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto">
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 md:px-6 py-3 flex items-center justify-between shadow-xs gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-extrabold text-xs flex items-center gap-2 transition-colors border border-slate-200/60"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Student Portal</span>
            </Link>
          </div>

          <div className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Account Settings
          </div>
        </header>

        <div className="p-4 md:p-8 flex-1 max-w-5xl">
          <div className="mb-6">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight font-satoshi">Settings</h1>
            <p className="text-slate-500 text-xs font-semibold mt-1">Manage your account profile, subscription, and preferences.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Left Settings Navigation */}
            <div className="md:col-span-1 space-y-1.5">
              {[
                { id: 'profile', icon: User, label: 'Profile' },
                { id: 'subscription', icon: CreditCard, label: 'Subscription' },
                { id: 'notifications', icon: Bell, label: 'Notifications' },
                { id: 'security', icon: Shield, label: 'Security' },
              ].map(item => (
                <button 
                  key={item.id}
                  onClick={() => setActiveSettingsTab(item.id)}
                  className={clsx(
                    "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all",
                    activeSettingsTab === item.id 
                      ? "bg-indigo-600 text-white shadow-xs" 
                      : "text-slate-600 hover:bg-white hover:text-slate-900 border border-transparent hover:border-slate-200"
                  )}
                >
                  <item.icon className="w-4 h-4" /> {item.label}
                </button>
              ))}
              <div className="pt-3 mt-3 border-t border-slate-200">
                <Link href="/login" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors">
                  <LogOut className="w-4 h-4" /> Sign Out
                </Link>
              </div>
            </div>

            {/* Right Settings Content */}
            <div className="md:col-span-3 space-y-6">
              <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 lg:p-8 shadow-xs">
                <h2 className="text-lg font-extrabold text-slate-900 mb-6">Profile Information</h2>
                
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-xl font-black text-white shadow-md">
                    SB
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">Subash Bhandari</h3>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">subash@pteai.com • Target GSE: 79+</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">First Name</label>
                    <input
                      type="text"
                      defaultValue="Subash"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Bhandari"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    defaultValue="subash@pteai.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
                  <Link href="/dashboard" className="px-5 py-2 rounded-xl bg-slate-100 text-slate-700 font-extrabold text-xs hover:bg-slate-200 border border-slate-200">
                    Cancel
                  </Link>
                  <button className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-extrabold text-xs hover:bg-indigo-700 shadow-xs">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
