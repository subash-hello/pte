'use client';

import React, { useState } from 'react';
import { User, CreditCard, Bell, Shield, LogOut, Key, Globe, Database } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="space-y-6 max-w-5xl text-slate-900 pb-20">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight font-satoshi">
          Admin System Settings
        </h1>
        <p className="text-slate-500 text-xs font-semibold mt-1">
          Manage system configurations, administrator accounts, API keys, and security settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Settings Sidebar */}
        <div className="md:col-span-1 space-y-1.5">
          {[
            { id: 'profile', icon: User, label: 'Admin Profile' },
            { id: 'security', icon: Shield, label: 'Access Control' },
            { id: 'api', icon: Key, label: 'API Keys' },
            { id: 'system', icon: Database, label: 'Database Status' },
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={clsx(
                "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all",
                activeTab === item.id 
                  ? "bg-slate-900 text-white shadow-xs" 
                  : "text-slate-600 hover:bg-white hover:text-slate-900 border border-transparent hover:border-slate-200"
              )}
            >
              <item.icon className="w-4 h-4" /> {item.label}
            </button>
          ))}
          <div className="pt-3 mt-3 border-t border-slate-200">
            <Link 
              href="/login" 
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </Link>
          </div>
        </div>

        {/* Right Settings Content */}
        <div className="md:col-span-3 space-y-6">
          <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 lg:p-8 shadow-xs">
            <h2 className="text-lg font-extrabold text-slate-900 mb-6">Administrator Details</h2>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-xl font-black text-white shadow-md">
                A
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Main Platform Admin</h3>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">admin@pteai.com • Super Admin Role</p>
                <span className="inline-block mt-2 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-extrabold text-[10px] rounded-full border border-emerald-200">
                  Full System Privileges
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Admin Full Name</label>
                <input
                  type="text"
                  defaultValue="Subash Bhandari"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Admin Email</label>
                <input
                  type="email"
                  defaultValue="admin@pteai.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
              <button className="px-5 py-2 rounded-xl bg-slate-100 text-slate-700 font-extrabold text-xs hover:bg-slate-200 border border-slate-200">
                Cancel
              </button>
              <button className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-extrabold text-xs hover:bg-indigo-700 shadow-xs">
                Save Admin Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
