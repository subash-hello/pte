'use client';

import React, { useState } from 'react';
import { 
  BookMarked, Plus, Search, Trash2, Edit3, CheckCircle,
  Clock, Tag, Sparkles, Save, Star
} from 'lucide-react';
import clsx from 'clsx';

const initialNotes = [
  {
    id: 'n_1',
    title: 'Batch August 2026 Strategy & Prediction Focus',
    category: 'Curriculum',
    content: 'Focus weekly mock assessments on Write from Dictation and Read Aloud oral fluency. 85% of exam candidates are gaining highest GSE bands through automated pronunciation diagnostics.',
    date: 'Aug 14, 2026',
    pinned: true,
    author: 'Super Admin'
  },
  {
    id: 'n_2',
    title: 'Kathmandu Central Campus Progress Review',
    category: 'Branch',
    content: 'Branch admin Ramesh Sharma reported 94% student attendance in live mock sessions. Subash Bhandari achieved 82 GSE overall on Mock Test #04.',
    date: 'Aug 12, 2026',
    pinned: true,
    author: 'Ramesh Sharma'
  },
  {
    id: 'n_3',
    title: 'Pokhara Regional Campus Onboarding Checklist',
    category: 'Branch',
    content: 'Verified audio lab headsets and speech recognition sensitivity. 2 new student accounts pending registration authorization.',
    date: 'Aug 10, 2026',
    pinned: false,
    author: 'Sita Sharma'
  },
];

export default function AdminNotebookPage() {
  const [notes, setNotes] = useState(initialNotes);
  const [search, setSearch] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Curriculum');
  const [newContent, setNewContent] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase()) || 
    n.content.toLowerCase().includes(search.toLowerCase()) ||
    n.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    const note = {
      id: `n_${Date.now()}`,
      title: newTitle,
      category: newCategory,
      content: newContent,
      date: 'Just now',
      pinned: false,
      author: 'Admin'
    };
    setNotes([note, ...notes]);
    setNewTitle('');
    setNewContent('');
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this notebook note?')) {
      setNotes(notes.filter(n => n.id !== id));
    }
  };

  const togglePin = (id: string) => {
    setNotes(notes.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
  };

  return (
    <div className="space-y-6 pb-20 text-slate-900 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <BookMarked className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight font-satoshi">
              Admin Notebook & Faculty Memos
            </h1>
          </div>
          <p className="text-slate-500 text-xs font-semibold mt-1">
            Collaborative memos, batch notes, diagnostic comments, and platform strategy records.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" /> {isCreating ? 'Close Memo' : 'New Notebook Memo'}
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleAddNote} className="bg-white border border-indigo-200 rounded-[24px] p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-extrabold text-slate-900">Create New Faculty / Strategy Memo</h3>
            <span className="text-xs font-bold text-indigo-600">Draft</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Memo Title</label>
              <input
                type="text"
                placeholder="e.g. Vocabulary Enhancement Strategy for Sept 2026"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-700 focus:outline-none"
              >
                <option value="Curriculum">Curriculum & Exam Prep</option>
                <option value="Branch">Branch Operations</option>
                <option value="Diagnostics">Student Diagnostics</option>
                <option value="General">General Administration</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Memo Content</label>
            <textarea
              rows={4}
              placeholder="Write memo details, recommendations, or batch guidance notes..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold shadow-xs"
            >
              Save Memo
            </button>
          </div>
        </form>
      )}

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search memos and notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-[#e8ecf4] rounded-xl pl-9 pr-4 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 shadow-2xs"
        />
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map(note => (
          <div key={note.id} className="bg-white border border-[#e8ecf4] rounded-[24px] p-5 shadow-2xs flex flex-col justify-between hover:shadow-xs transition-shadow">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className={clsx(
                  "px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border uppercase",
                  note.category === 'Curriculum' ? "bg-purple-50 text-purple-700 border-purple-100" :
                  note.category === 'Branch' ? "bg-indigo-50 text-indigo-700 border-indigo-100" :
                  "bg-emerald-50 text-emerald-700 border-emerald-100"
                )}>
                  {note.category}
                </span>
                <button 
                  onClick={() => togglePin(note.id)}
                  className={clsx("p-1 rounded-lg transition-colors", note.pinned ? "text-amber-500 hover:text-amber-600" : "text-slate-300 hover:text-slate-500")}
                  title="Pin note"
                >
                  <Star className="w-4 h-4 fill-current" />
                </button>
              </div>

              <h3 className="text-sm font-extrabold text-slate-900 mb-2 leading-snug">{note.title}</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">{note.content}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-semibold">
              <span>By {note.author} • {note.date}</span>
              <button 
                onClick={() => handleDelete(note.id)}
                className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                title="Delete note"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
