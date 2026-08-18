'use client';

import React, { useState } from 'react';
import { 
  Folder, FileText, UploadCloud, Download, Trash2, Search,
  Filter, Plus, CheckCircle, FileCheck, Eye, HardDrive
} from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const initialPdfs = [
  { id: 'pdf_1', title: 'PTE Academic 90-Band Master Essay Templates (2026 Edition)', category: 'Writing', size: '1.4 MB', downloads: 342, date: 'Aug 12, 2026' },
  { id: 'pdf_2', title: 'Describe Image & Retell Lecture Speed Keywords Formula', category: 'Speaking', size: '890 KB', downloads: 520, date: 'Aug 10, 2026' },
  { id: 'pdf_3', title: 'Top 500 High-Frequency Academic Collocations for Reading FIB', category: 'Vocabulary', size: '2.3 MB', downloads: 810, date: 'Aug 08, 2026' },
  { id: 'pdf_4', title: 'PTE Write from Dictation 100% Guaranteed Prediction Bank', category: 'Listening', size: '3.1 MB', downloads: 1240, date: 'Aug 05, 2026' },
  { id: 'pdf_5', title: 'Summarize Written Text One-Sentence Compound Rules', category: 'Writing', size: '650 KB', downloads: 270, date: 'Jul 29, 2026' },
];

export default function FilesManagerPage() {
  const [files, setFiles] = useState(initialPdfs);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Writing');

  const filteredFiles = files.filter(f => {
    const matchesSearch = f.title.toLowerCase().includes(search.toLowerCase()) || f.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === 'All' || f.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newFile = {
      id: `pdf_${Date.now()}`,
      title,
      category,
      size: '1.2 MB',
      downloads: 0,
      date: 'Just now'
    };
    setFiles([newFile, ...files]);
    setTitle('');
    setIsUploadOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this study resource document?')) {
      setFiles(files.filter(f => f.id !== id));
    }
  };

  return (
    <div className="space-y-6 pb-20 text-slate-900 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <Folder className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight font-satoshi">
              Study Materials & PDF Resources
            </h1>
          </div>
          <p className="text-slate-500 text-xs font-semibold mt-1">
            Manage student download materials, master templates, and high-scoring prediction PDFs.
          </p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold shadow-xs transition-colors"
        >
          <UploadCloud className="w-4 h-4" /> Upload Document
        </button>
      </div>

      {/* Storage & Counts Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#e8ecf4] shadow-2xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500">Total PDF Documents</p>
            <h3 className="text-2xl font-black text-slate-900 font-satoshi mt-0.5">{files.length} Files</h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#e8ecf4] shadow-2xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500">Total Downloads</p>
            <h3 className="text-2xl font-black text-slate-900 font-satoshi mt-0.5">
              {files.reduce((acc, f) => acc + f.downloads, 0)}
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#e8ecf4] shadow-2xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500">Cloud Storage</p>
            <h3 className="text-2xl font-black text-slate-900 font-satoshi mt-0.5">8.34 MB / 10 GB</h3>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-[#e8ecf4] rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search documents by title or topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          {['All', 'Writing', 'Speaking', 'Vocabulary', 'Listening'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={clsx(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-colors",
                selectedCat === cat 
                  ? "bg-slate-900 text-white" 
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resource List */}
      <div className="bg-white border border-[#e8ecf4] rounded-[24px] overflow-hidden shadow-2xs">
        <div className="divide-y divide-slate-100">
          {filteredFiles.map(file => (
            <div key={file.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-extrabold text-slate-900 truncate max-w-xl">{file.title}</h4>
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 font-extrabold text-[10px] rounded">
                      {file.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
                    {file.size} • {file.downloads} downloads • Added {file.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
                <button onClick={() => handleDelete(file.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {isUploadOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[24px] p-6 max-w-md w-full border border-slate-200 shadow-xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-extrabold text-slate-900">Upload PDF Resource</h3>
                <button onClick={() => setIsUploadOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>

              <form onSubmit={handleUpload} className="space-y-3 text-xs font-bold">
                <div>
                  <label className="block text-slate-700 mb-1">Document Title</label>
                  <input
                    type="text"
                    placeholder="e.g. PTE Speaking Master Template Guide"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                  >
                    <option value="Writing">Writing</option>
                    <option value="Speaking">Speaking</option>
                    <option value="Reading">Reading</option>
                    <option value="Listening">Listening</option>
                    <option value="Vocabulary">Vocabulary</option>
                  </select>
                </div>

                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center bg-slate-50 hover:bg-indigo-50/30 transition-colors cursor-pointer">
                  <UploadCloud className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-700">Choose PDF file or drag & drop here</p>
                  <p className="text-[10px] text-slate-400 mt-1">PDF up to 25MB</p>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setIsUploadOpen(false)} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl">Upload PDF</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
