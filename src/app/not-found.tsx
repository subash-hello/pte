'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, ShieldAlert } from 'lucide-react';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div suppressHydrationWarning className="min-h-screen bg-white text-slate-900 flex flex-col items-center justify-center p-6 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div suppressHydrationWarning className="w-full max-w-lg text-center space-y-6">
        <div suppressHydrationWarning className="w-20 h-20 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mx-auto shadow-sm">
          <ShieldAlert className="w-10 h-10" />
        </div>

        <div suppressHydrationWarning>
          <span suppressHydrationWarning className="text-xs font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            404 Error • Page Not Found
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-4 font-satoshi">
            Looking for something?
          </h1>
          <p className="text-slate-500 text-sm font-semibold mt-2 leading-relaxed">
            The page you requested doesn't exist or may have been moved. Choose a portal below to continue.
          </p>
        </div>

        <div suppressHydrationWarning className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-extrabold text-xs hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Go to Student Portal
          </Link>

          <Link
            href="/admin"
            className="px-6 py-3 rounded-xl bg-slate-900 text-white font-extrabold text-xs hover:bg-slate-800 transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Go to Admin Center
          </Link>
        </div>
      </div>
    </div>
  );
}
