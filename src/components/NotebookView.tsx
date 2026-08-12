"use client";

import React, { useState, useEffect } from "react";

interface NoteItem {
  id: string;
  title: string;
  category: "Speaking" | "Writing" | "Reading" | "Listening" | "Templates" | "Vocabulary" | "General";
  content: string;
  isPinned?: boolean;
  updatedAt: string;
}

const DEFAULT_NOTES: NoteItem[] = [
  {
    id: "note_di_template",
    title: "📊 Describe Image 90-Band Universal Template",
    category: "Templates",
    isPinned: true,
    updatedAt: "Today",
    content: `### Describe Image Universal Formula

1. **Introduction**: "The given chart provides key information about [Title of Chart]."
2. **Highest Point**: "Looking closely at the data, the highest value can be seen in [Category], which accounts for [Highest % / Value]."
3. **Lowest Point**: "On the other hand, the lowest figure is registered in [Category], which stands at [Lowest % / Value]."
4. **Overall Trend**: "Additionally, there is a noticeable upward trend over the given period."
5. **Conclusion**: "In conclusion, the chart highlights significant variations across all categories."

👉 **Oral Fluency Key**: Speak continuously for 30–35 seconds without pauses or self-corrections!`,
  },
  {
    id: "note_essay_template",
    title: "✍️ Band-9 Universal PTE Essay Structure (200-300 Words)",
    category: "Templates",
    isPinned: true,
    updatedAt: "Today",
    content: `### 4-Paragraph Essay Formula

- **Paragraph 1: Introduction (40-50 words)**
  - Sentence 1: Paraphrase the prompt topic.
  - Sentence 2: "This essay will discuss key factors and present relevant arguments."

- **Paragraph 2: Body Paragraph 1 (70-80 words)**
  - Sentence 1: "On the one hand, a major argument supporting this view is..."
  - Sentence 2: "For example, recent empirical studies demonstrate..."

- **Paragraph 3: Body Paragraph 2 (70-80 words)**
  - Sentence 1: "On the other hand, another crucial aspect to consider is..."
  - Sentence 2: Detailed explanation of secondary factor.

- **Paragraph 4: Conclusion (30-40 words)**
  - Sentence 1: "In conclusion, while both perspectives carry weight, I firmly believe that..."

👉 **Word Count Rule**: Keep total word count strictly between 220 and 280 words!`,
  },
  {
    id: "note_ra_tips",
    title: "🗣️ Read Aloud Fluency & Intonation Rules",
    category: "Speaking",
    isPinned: false,
    updatedAt: "Yesterday",
    content: `### Read Aloud Secrets for 90 GSE

1. **Never Pause to Self-Correct**: If you mispronounce a word, keep going immediately. Self-correction destroys Oral Fluency.
2. **Thought Chunking**: Group words naturally into 3-5 word meaningful phrases.
3. **Punctuation Micro-Breaths**: Take a 0.5s breath at commas and full stops.
4. **Maintain Moderate Speed**: Do not speak too fast or too slow. A steady natural pace yields maximum points.`,
  },
  {
    id: "note_wfd_tips",
    title: "🎧 Write from Dictation & SST High-Score Rules",
    category: "Listening",
    isPinned: false,
    updatedAt: "2 days ago",
    content: `### High-Weightage Listening Tips

1. **Write from Dictation (WFD)**:
   - Starts with a capital letter and ends with a full stop.
   - Type exact spelling. If unsure between singular/plural (e.g. "student" vs "students"), you can include both variants.
   - This item contributes heavily to both Listening and Writing scores!

2. **Summarize Spoken Text (SST)**:
   - Word count: 50 to 70 words.
   - Use simple compound sentences with clear grammar.`,
  },
];

export default function NotebookView() {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [selectedNote, setSelectedNote] = useState<NoteItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load saved notes from LocalStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("pte_user_notebook_notes");
        if (saved) {
          const parsed = JSON.parse(saved);
          setNotes(parsed.length > 0 ? parsed : DEFAULT_NOTES);
          setSelectedNote(parsed.length > 0 ? parsed[0] : DEFAULT_NOTES[0]);
        } else {
          setNotes(DEFAULT_NOTES);
          setSelectedNote(DEFAULT_NOTES[0]);
        }
      } catch (e) {
        setNotes(DEFAULT_NOTES);
        setSelectedNote(DEFAULT_NOTES[0]);
      }
    }
  }, []);

  // Save notes to LocalStorage
  const saveNotesToStorage = (updatedNotes: NoteItem[]) => {
    setNotes(updatedNotes);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("pte_user_notebook_notes", JSON.stringify(updatedNotes));
      } catch (e) {}
    }
  };

  const handleCreateNewNote = () => {
    const newNote: NoteItem = {
      id: `note_${Date.now()}`,
      title: "📝 New PTE Study Note",
      category: "General",
      content: "Write your study notes, vocabulary, or exam templates here...",
      isPinned: false,
      updatedAt: "Just now",
    };
    const updated = [newNote, ...notes];
    saveNotesToStorage(updated);
    setSelectedNote(newNote);
    setIsEditing(true);
  };

  const handleDeleteNote = (id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    saveNotesToStorage(updated);
    if (selectedNote?.id === id) {
      setSelectedNote(updated.length > 0 ? updated[0] : null);
    }
  };

  const handleTogglePin = (id: string) => {
    const updated = notes.map((n) => (n.id === id ? { ...n, isPinned: !n.isPinned } : n));
    saveNotesToStorage(updated);
    if (selectedNote?.id === id) {
      setSelectedNote({ ...selectedNote, isPinned: !selectedNote.isPinned });
    }
  };

  const handleUpdateNote = (field: "title" | "category" | "content", value: any) => {
    if (!selectedNote) return;
    const updatedNote = { ...selectedNote, [field]: value, updatedAt: "Just now" };
    setSelectedNote(updatedNote);
    const updatedNotes = notes.map((n) => (n.id === selectedNote.id ? updatedNote : n));
    saveNotesToStorage(updatedNotes);
  };

  const handleCopyNote = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter notes
  const filteredNotes = notes.filter((n) => {
    const matchesCategory = activeCategory === "All" || n.category === activeCategory || (activeCategory === "Pinned" && n.isPinned);
    const matchesSearch =
      searchQuery.trim() === "" ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ["All", "Pinned", "Templates", "Speaking", "Writing", "Reading", "Listening", "Vocabulary", "General"];

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-6xl mx-auto bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
      {/* Top Header Bar */}
      <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xl font-bold shadow-md">
            📖
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100">Candidate PTE Notebook</h2>
            <p className="text-xs text-slate-400 mt-0.5">Study Notes, Templates, Cheat Sheets & Personal Revisions</p>
          </div>
        </div>

        <button
          onClick={handleCreateNewNote}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all active:scale-95 flex items-center gap-1.5"
        >
          <span>+ Add New Note</span>
        </button>
      </div>

      {/* Main Split Body */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
        {/* Left Sidebar: Notes List */}
        <div className="w-full md:w-80 border-r border-slate-200 flex flex-col bg-slate-50/50">
          {/* Search Bar */}
          <div className="p-3 border-b border-slate-200 bg-white">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes..."
              className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Category Filter Chips */}
          <div className="p-3 border-b border-slate-200 bg-white flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat === "Pinned" ? "📌 Pinned" : cat}
              </button>
            ))}
          </div>

          {/* Notes Item Cards List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {filteredNotes.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400 font-medium">No notes found. Click "+ Add New Note" above!</div>
            ) : (
              filteredNotes.map((n) => {
                const isSelected = selectedNote?.id === n.id;
                return (
                  <div
                    key={n.id}
                    onClick={() => {
                      setSelectedNote(n);
                      setIsEditing(false);
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                      isSelected
                        ? "bg-white border-indigo-500 shadow-md ring-2 ring-indigo-500/10"
                        : "bg-white border-slate-200 hover:border-indigo-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{n.title}</h4>
                      {n.isPinned && <span className="text-xs">📌</span>}
                    </div>

                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed font-sans">{n.content}</p>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium pt-2 border-t border-slate-100">
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-bold text-slate-600 uppercase tracking-wider">{n.category}</span>
                      <span>{n.updatedAt}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Pane: Note Editor & Reader View */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
          {selectedNote ? (
            <div className="flex-1 flex flex-col p-6 overflow-y-auto">
              {/* Note Header & Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-2 flex-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={selectedNote.title}
                      onChange={(e) => handleUpdateNote("title", e.target.value)}
                      className="text-lg font-extrabold text-slate-900 bg-slate-100 border border-slate-300 rounded-xl px-3 py-1.5 flex-1 focus:outline-none focus:border-indigo-500"
                    />
                  ) : (
                    <h2 className="text-xl font-extrabold text-slate-900">{selectedNote.title}</h2>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTogglePin(selectedNote.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                      selectedNote.isPinned
                        ? "bg-amber-50 text-amber-800 border-amber-200"
                        : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                    }`}
                  >
                    {selectedNote.isPinned ? "📌 Pinned" : "Pin Note"}
                  </button>

                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 text-xs font-bold transition-colors"
                  >
                    {isEditing ? "Done Editing" : "✎ Edit Note"}
                  </button>

                  <button
                    onClick={() => handleCopyNote(selectedNote.content, selectedNote.id)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 text-xs font-bold transition-colors"
                  >
                    {copiedId === selectedNote.id ? "✓ Copied" : "Copy Note"}
                  </button>

                  <button
                    onClick={() => handleDeleteNote(selectedNote.id)}
                    className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 text-xs font-bold transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Category Selector */}
              {isEditing && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold text-slate-500">Category Tag:</span>
                  <select
                    value={selectedNote.category}
                    onChange={(e) => handleUpdateNote("category", e.target.value as any)}
                    className="px-3 py-1.5 bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
                  >
                    <option value="Templates">Templates</option>
                    <option value="Speaking">Speaking</option>
                    <option value="Writing">Writing</option>
                    <option value="Reading">Reading</option>
                    <option value="Listening">Listening</option>
                    <option value="Vocabulary">Vocabulary</option>
                    <option value="General">General</option>
                  </select>
                </div>
              )}

              {/* Content Body */}
              {isEditing ? (
                <textarea
                  value={selectedNote.content}
                  onChange={(e) => handleUpdateNote("content", e.target.value)}
                  rows={14}
                  className="w-full flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-900 leading-relaxed font-mono resize-none focus:outline-none focus:border-indigo-500"
                />
              ) : (
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 leading-relaxed font-sans whitespace-pre-line shadow-xs">
                  {selectedNote.content}
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-xs">
              Select a note from the left list or create a new one!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
