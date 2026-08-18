'use client';

import React, { useState } from 'react';
import { 
  FileText, Plus, Search, Filter, Sparkles, Database, CheckCircle,
  Eye, Edit3, Trash2, BookOpen, Layers, Volume2, PenTool, Mic, BookMarked
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const mockQuestions = [
  { id: 'q_01', section: 'Speaking', type: 'Read Aloud', code: 'RA-104', title: 'Climate Dynamics in Sub-Saharan Africa', difficulty: 'Medium', testedCount: 342, lastUpdated: '2 days ago' },
  { id: 'q_02', section: 'Speaking', type: 'Repeat Sentence', code: 'RS-208', title: 'The university library will remain open throughout the exam period.', difficulty: 'Easy', testedCount: 512, lastUpdated: '3 days ago' },
  { id: 'q_03', section: 'Writing', type: 'Write Essay', code: 'WE-402', title: 'Impact of Artificial Intelligence on Future Employment Structures', difficulty: 'Hard', testedCount: 289, lastUpdated: 'Yesterday' },
  { id: 'q_04', section: 'Writing', type: 'Summarize Written Text', code: 'SWT-301', title: 'Urbanization Patterns and Renewable Energy Transitions', difficulty: 'Medium', testedCount: 195, lastUpdated: '5 days ago' },
  { id: 'q_05', section: 'Reading', type: 'Fill in Blanks (R&W)', code: 'FIB-RW-112', title: 'Cognitive Neuroscience and Human Memory Retainability', difficulty: 'Hard', testedCount: 420, lastUpdated: '1 day ago' },
  { id: 'q_06', section: 'Reading', type: 'Re-order Paragraphs', code: 'ROP-205', title: 'Historical Evolution of Printing Press Mechanization', difficulty: 'Medium', testedCount: 310, lastUpdated: '4 days ago' },
  { id: 'q_07', section: 'Listening', type: 'Summarize Spoken Text', code: 'SST-504', title: 'Deep Ocean Biodiversity and Marine Protected Zones', difficulty: 'Hard', testedCount: 260, lastUpdated: 'Just now' },
  { id: 'q_08', section: 'Listening', type: 'Write from Dictation', code: 'WFD-619', title: 'All submitted assignments must follow the departmental formatting guidelines.', difficulty: 'Easy', testedCount: 680, lastUpdated: 'Yesterday' },
];

export default function ContentPoolPage() {
  const [search, setSearch] = useState('');
  const [selectedSection, setSelectedSection] = useState('All');
  const [items, setItems] = useState(mockQuestions);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    section: 'Speaking',
    type: 'Read Aloud',
    code: '',
    title: '',
    difficulty: 'Medium',
    text: ''
  });

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.code.toLowerCase().includes(search.toLowerCase()) ||
                          item.type.toLowerCase().includes(search.toLowerCase());
    const matchesSection = selectedSection === 'All' || item.section === selectedSection;
    return matchesSearch && matchesSection;
  });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.title) return;
    const added = {
      id: `q_${Date.now()}`,
      section: newItem.section,
      type: newItem.type,
      code: newItem.code || `${newItem.section.substring(0, 2).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      title: newItem.title,
      difficulty: newItem.difficulty,
      testedCount: 0,
      lastUpdated: 'Just now'
    };
    setItems([added, ...items]);
    setIsAddModalOpen(false);
    setNewItem({ section: 'Speaking', type: 'Read Aloud', code: '', title: '', difficulty: 'Medium', text: '' });
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Delete this question from content pool?')) {
      setItems(prev => prev.filter(i => i.id !== id));
    }
  };

  return (
    <div className="space-y-6 pb-20 text-slate-900 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <FileText className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight font-satoshi">
              PTE Content Pool Databank
            </h1>
          </div>
          <p className="text-slate-500 text-xs font-semibold mt-1">
            Authoritative practice items, diagnostic question sets, and evaluation rubric pools.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Question Item
        </button>
      </div>

      {/* Module Stats Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Speaking Pool', count: '240 Items', icon: Mic, color: 'text-purple-600 bg-purple-50 border-purple-100' },
          { label: 'Writing Pool', count: '180 Items', icon: PenTool, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
          { label: 'Reading Pool', count: '310 Items', icon: BookOpen, color: 'text-cyan-600 bg-cyan-50 border-cyan-100' },
          { label: 'Listening Pool', count: '270 Items', icon: Volume2, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-4 border border-[#e8ecf4] shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500">{stat.label}</p>
              <h3 className="text-lg font-black text-slate-900 font-satoshi mt-0.5">{stat.count}</h3>
            </div>
            <div className={clsx("w-9 h-9 rounded-xl border flex items-center justify-center", stat.color)}>
              <stat.icon className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar & Filters */}
      <div className="bg-white border border-[#e8ecf4] rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, item code (RA-104), or question type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          {['All', 'Speaking', 'Writing', 'Reading', 'Listening'].map(sec => (
            <button
              key={sec}
              onClick={() => setSelectedSection(sec)}
              className={clsx(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-colors",
                selectedSection === sec 
                  ? "bg-slate-900 text-white" 
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              )}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-white border border-[#e8ecf4] rounded-[24px] overflow-hidden shadow-2xs">
        <div className="divide-y divide-slate-100">
          {filteredItems.map(item => (
            <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                <div className={clsx(
                  "w-10 h-10 rounded-xl border flex items-center justify-center font-black text-xs shrink-0",
                  item.section === 'Speaking' ? "bg-purple-50 text-purple-700 border-purple-200" :
                  item.section === 'Writing' ? "bg-indigo-50 text-indigo-700 border-indigo-200" :
                  item.section === 'Reading' ? "bg-cyan-50 text-cyan-700 border-cyan-200" :
                  "bg-emerald-50 text-emerald-700 border-emerald-200"
                )}>
                  {item.code.split('-')[0]}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-bold">
                      {item.code}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-extrabold text-[10px]">
                      {item.type}
                    </span>
                    <span className={clsx(
                      "px-2 py-0.5 rounded text-[10px] font-bold",
                      item.difficulty === 'Easy' ? "bg-emerald-50 text-emerald-700" :
                      item.difficulty === 'Medium' ? "bg-amber-50 text-amber-700" :
                      "bg-rose-50 text-rose-700"
                    )}>
                      {item.difficulty}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-1 truncate max-w-xl">{item.title}</h4>
                  <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
                    Tested {item.testedCount} times • Updated {item.lastUpdated}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button className="px-3 py-1.5 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border border-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> Preview
                </button>
                <button onClick={() => handleDeleteItem(item.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Item Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[24px] p-6 max-w-lg w-full border border-slate-200 shadow-xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-extrabold text-slate-900">Add Practice Question to Content Pool</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>

              <form onSubmit={handleAddItem} className="space-y-3 text-xs font-bold">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 mb-1">Section</label>
                    <select
                      value={newItem.section}
                      onChange={(e) => setNewItem({ ...newItem, section: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                    >
                      <option value="Speaking">Speaking</option>
                      <option value="Writing">Writing</option>
                      <option value="Reading">Reading</option>
                      <option value="Listening">Listening</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1">Difficulty</label>
                    <select
                      value={newItem.difficulty}
                      onChange={(e) => setNewItem({ ...newItem, difficulty: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Item Title / Prompt Summary</label>
                  <input
                    type="text"
                    placeholder="e.g. Read Aloud #105: Impact of Microplastics"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Passage / Prompt Text</label>
                  <textarea
                    rows={4}
                    placeholder="Enter the passage or prompt text for students to practice..."
                    value={newItem.text}
                    onChange={(e) => setNewItem({ ...newItem, text: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl">Save Item</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
