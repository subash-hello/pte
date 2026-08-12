'use client';

import React from 'react';
import { HelpCircle, BookOpen, MessageSquare, Mail, PhoneCall, ExternalLink } from 'lucide-react';

export default function AdminHelpPage() {
  const helpArticles = [
    { title: 'Creating and managing branch administrators', category: 'Branch Management', readTime: '3 min read' },
    { title: 'Viewing real-time student activity logs', category: 'Analytics & Tracking', readTime: '4 min read' },
    { title: 'Updating practice questions and scoring rubrics', category: 'Content Pool', readTime: '5 min read' },
    { title: 'Exporting student score reports and analytics', category: 'Reporting', readTime: '2 min read' },
  ];

  return (
    <div className="space-y-6 max-w-5xl text-slate-900 pb-20">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight font-satoshi">
          Admin Help & Support Center
        </h1>
        <p className="text-slate-500 text-xs font-semibold mt-1">
          Documentation, guides, and support resources for platform administrators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#e8ecf4] rounded-2xl p-6 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900 mb-1">Documentation</h3>
          <p className="text-xs text-slate-500 font-medium mb-4 leading-relaxed">
            Read complete technical documentation on branch setup, scoring engine setup, and user permissions.
          </p>
          <a href="#" className="text-xs font-extrabold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            Browse Docs <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="bg-white border border-[#e8ecf4] rounded-2xl p-6 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900 mb-1">Direct Support Chat</h3>
          <p className="text-xs text-slate-500 font-medium mb-4 leading-relaxed">
            Connect directly with technical support engineers for assistance with your platform instance.
          </p>
          <a href="#" className="text-xs font-extrabold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
            Start Live Chat <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="bg-white border border-[#e8ecf4] rounded-2xl p-6 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-4">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900 mb-1">Email Support</h3>
          <p className="text-xs text-slate-500 font-medium mb-4 leading-relaxed">
            Send tickets for non-urgent inquiries, feature requests, or custom branch configuration.
          </p>
          <a href="mailto:support@pteai.com" className="text-xs font-extrabold text-purple-600 hover:text-purple-700 flex items-center gap-1">
            support@pteai.com <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 lg:p-8 shadow-xs">
        <h3 className="text-base font-extrabold text-slate-900 mb-4">Popular Administrator Guides</h3>
        <div className="divide-y divide-slate-100">
          {helpArticles.map((article, idx) => (
            <div key={idx} className="py-3.5 flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{article.title}</h4>
                  <span className="text-[10px] text-slate-400 font-semibold">{article.category}</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">{article.readTime}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
