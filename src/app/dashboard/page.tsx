"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import DashboardView from "@/components/DashboardView";
import QuestionEngine from "@/components/QuestionEngines";
import TemplatesHub from "@/components/TemplatesHub";
import VocabularyHub from "@/components/VocabularyHub";
import MockTestSimulator from "@/components/MockTestSimulator";
import AITutorView from "@/components/AITutorView";
import ProgressAnalyticsView from "@/components/ProgressAnalyticsView";
import NotebookView from "@/components/NotebookView";
import AuthView from "@/components/AuthView";
import BranchAdminDashboard from "@/components/BranchAdminDashboard";
import SuperAdminDashboard from "@/components/SuperAdminDashboard";
import { UserSession } from "@/types/auth";
import { PTEPracticeQuestions } from "@/data/practice-questions";
import { MOCK_TESTS_COLLECTION } from "@/data/mock-tests";
import { getUser, clearSession, isAdmin } from "@/lib/session";

// Horizontal Item Types Map per Section
const SECTION_ITEM_TYPES_MAP: Record<
  string,
  { type: string; label: string; icon: string; countBadge?: string }[]
> = {
  speaking: [
    { type: "all", label: "All Speaking (250 Items)", icon: "🗣️" },
    { type: "read_aloud", label: "Read Aloud", icon: "🎙️", countBadge: "✨ 50" },
    { type: "repeat_sentence", label: "Repeat Sentence", icon: "🔄", countBadge: "✨ 50" },
    { type: "describe_image", label: "Describe Image", icon: "📊", countBadge: "✨ 50" },
    { type: "retell_lecture", label: "Re-tell Lecture", icon: "🗣️", countBadge: "✨ 50" },
    { type: "answer_short_question", label: "Answer Short Question", icon: "❓", countBadge: "✨ 50" },
  ],
  writing: [
    { type: "all", label: "All Writing (100 Items)", icon: "✍️" },
    { type: "summarize_written_text", label: "Summarize Written Text", icon: "📝", countBadge: "✨ 50" },
    { type: "write_essay", label: "Write Essay", icon: "✍️", countBadge: "✨ 50" },
  ],
  reading: [
    { type: "all", label: "All Reading (250 Items)", icon: "📖" },
    { type: "fib_reading_writing", label: "Fill in the Blanks (R&W)", icon: "🔤", countBadge: "✨ 50" },
    { type: "mcma_reading", label: "MCMA (Reading)", icon: "☑️", countBadge: "✨ 50" },
    { type: "reorder_paragraphs", label: "Re-order Paragraphs", icon: "🧩", countBadge: "✨ 50" },
    { type: "fib_reading", label: "Fill in the Blanks (Reading)", icon: "📑", countBadge: "✨ 50" },
    { type: "mcsa_reading", label: "MCSA (Reading)", icon: "🔘", countBadge: "✨ 50" },
  ],
  listening: [
    { type: "all", label: "All Listening (400 Items)", icon: "🎧" },
    { type: "summarize_spoken_text", label: "Summarize Spoken Text", icon: "🎧", countBadge: "✨ 50" },
    { type: "mcma_listening", label: "MCMA (Listening)", icon: "☑️", countBadge: "✨ 50" },
    { type: "fib_listening", label: "FIB (Listening)", icon: "✍️", countBadge: "✨ 50" },
    { type: "highlight_correct_summary", label: "Highlight Correct Summary", icon: "🎯", countBadge: "✨ 50" },
    { type: "mcsa_listening", label: "MCSA (Listening)", icon: "🔘", countBadge: "✨ 50" },
    { type: "select_missing_word", label: "Select Missing Word", icon: "❓", countBadge: "✨ 50" },
    { type: "highlight_incorrect_words", label: "Highlight Incorrect Words", icon: "🔍", countBadge: "✨ 50" },
    { type: "write_from_dictation", label: "Write from Dictation", icon: "✍️", countBadge: "✨ 50" },
  ],
};

export default function StudentDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [userSession, setUserSession] = useState<UserSession | null>({
    id: "std_01",
    name: "Student User",
    email: "student@pteai.com",
    role: "student",
    xp: 1250,
    targetScore: 79
  });

  // App Navigation States
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [selectedSection, setSelectedSection] = useState<"all" | "speaking" | "writing" | "reading" | "listening">("all");
  const [selectedItemType, setSelectedItemType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeQuestion, setActiveQuestion] = useState<any | null>(null);
  const [activeMockId, setActiveMockId] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const itemsPerPage = 12;

  // Track completed items with scores
  const [completedItems, setCompletedItems] = useState<Record<string, { score: number }>>({});

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      try {
        const savedSession = getUser();
        if (savedSession) {
          setUserSession(savedSession as unknown as UserSession);
        }
        const savedCompleted = localStorage.getItem("pte_completed_items");
        if (savedCompleted) {
          setCompletedItems(JSON.parse(savedCompleted));
        }
      } catch (e) {}
    }
  }, []);

  const handleLoginSuccess = (session: UserSession) => {
    setUserSession(session);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("pte_user_session", JSON.stringify(session));
      } catch (e) {}
    }
  };

  const handleLogout = () => {
    setUserSession(null);
    if (typeof window !== "undefined") {
      try {
        clearSession();
        window.location.href = '/login';
      } catch (e) {}
    }
  };

  const markItemCompleted = (id: string, score: number) => {
    const updated = { ...completedItems, [id]: { score } };
    setCompletedItems(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("pte_completed_items", JSON.stringify(updated));
      } catch (e) {}
    }
  };

  // Active session fallback
  const activeSession = userSession || {
    id: "usr_student_default",
    name: "Student User",
    email: "student@pteai.com",
    role: "student" as const,
    branchName: "Kathmandu Campus",
    targetScore: 79,
    xp: 1140,
    level: 3,
  };

  const currentActiveSection =
    ["speaking", "writing", "reading", "listening"].includes(activeTab)
      ? activeTab
      : selectedSection !== "all"
      ? selectedSection
      : "speaking";

  const filteredQuestions = PTEPracticeQuestions.filter((q) => {
    const matchesSection =
      selectedSection === "all" || q.section.toLowerCase() === selectedSection.toLowerCase();
    const matchesTab =
      activeTab === "dashboard" ||
      activeTab === "practice" ||
      q.section.toLowerCase() === activeTab.toLowerCase();

    const matchesItemType =
      selectedItemType === "all" || q.type === selectedItemType;

    const matchesSearch =
      searchQuery.trim() === "" ||
      (q as any).title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q as any).itemCategory?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q as any).instruction?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q as any).passage?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q as any).text?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSection && matchesTab && matchesItemType && matchesSearch;
  });

  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  const paginatedQuestions = filteredQuestions.slice(
    (pageNumber - 1) * itemsPerPage,
    pageNumber * itemsPerPage
  );

  const activeItemTypes = SECTION_ITEM_TYPES_MAP[currentActiveSection] || SECTION_ITEM_TYPES_MAP.speaking;

  if (!mounted) return null;

  return (
    <div suppressHydrationWarning className="flex min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white font-sans">
      <Sidebar
        activeTab={activeTab}
        mobileOpen={mobileSidebarOpen}
        userSession={userSession}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setActiveQuestion(null);
          setActiveMockId(null);
          setSelectedItemType("all");
          if (["speaking", "writing", "reading", "listening"].includes(tab)) {
            setSelectedSection(tab as any);
          } else {
            setSelectedSection("all");
          }
        }}
        onSelectSection={(sec) => {
          setSelectedSection(sec);
          setSelectedItemType("all");
        }}
      />

      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto">
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 md:px-6 py-3 flex items-center justify-between shadow-xs gap-3">
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 transition-colors shrink-0"
              aria-label="Open Navigation Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPageNumber(1);
                }}
                placeholder="Search practice items..."
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2 pl-9 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
              />
              <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 text-xs font-semibold text-slate-600 shrink-0">
            {(activeSession.role === 'super_admin' || activeSession.role === 'branch_admin') && (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold px-3 py-1.5 rounded-full text-xs shadow-2xs transition-all"
              >
                <span>🛡️ Admin Portal</span>
              </Link>
            )}

            <div className="hidden sm:flex items-center gap-1 text-emerald-600 font-mono font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <span>✓ {Object.keys(completedItems).length} Done</span>
            </div>
            <div className="flex items-center gap-1 text-indigo-600 font-mono font-bold bg-indigo-50 px-2 py-1 rounded-full border border-indigo-100 text-[11px] md:text-xs">
              <span>⚡ {activeSession.xp || 1140} XP</span>
            </div>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {activeSession.name.charAt(0)}
              </div>
              <button
                onClick={handleLogout}
                className="hidden sm:block text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors px-2 py-1"
                title="Switch Portal or Logout"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 flex-1">
          {activeMockId && (
            <MockTestSimulator testId={activeMockId} onExit={() => setActiveMockId(null)} />
          )}

          {!activeMockId && activeQuestion && (
            <div className="flex flex-col gap-4 max-w-4xl mx-auto">
              <button
                onClick={() => setActiveQuestion(null)}
                className="self-start px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all flex items-center gap-1.5 shadow-xs"
              >
                ← Back to Databank
              </button>
              <QuestionEngine
                question={activeQuestion}
                onAnswerSubmit={(_, evalScore) => markItemCompleted(activeQuestion.id, evalScore?.overall || 78)}
              />
            </div>
          )}

          {!activeMockId && !activeQuestion && activeTab === "dashboard" && (
            <DashboardView
              userSession={activeSession}
              onStartPractice={(section) => {
                setActiveTab(section);
                setSelectedSection(section as any);
                setSelectedItemType("all");
              }}
              onStartMock={() => setActiveMockId("pte_mock_test_01")}
            />
          )}

          {!activeMockId &&
            !activeQuestion &&
            ["speaking", "writing", "reading", "listening", "practice"].includes(activeTab) && (
              <div className="flex flex-col gap-6">
                <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                        {currentActiveSection} Section Practice
                      </span>
                      <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1 capitalize flex flex-wrap items-center gap-2">
                        {currentActiveSection === "speaking" && "🗣️ Speaking"}
                        {currentActiveSection === "writing" && "✍️ Writing"}
                        {currentActiveSection === "reading" && "📖 Reading"}
                        {currentActiveSection === "listening" && "🎧 Listening"}
                        <span className="text-xs text-slate-400 font-mono font-normal">
                          ({filteredQuestions.length} Practice Items Available)
                        </span>
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin pt-2 border-t border-slate-100 -mx-1 px-1">
                    {activeItemTypes.map((item) => {
                      const isActive = selectedItemType === item.type;
                      return (
                        <button
                          key={item.type}
                          onClick={() => {
                            setSelectedItemType(item.type);
                            setPageNumber(1);
                          }}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                            isActive
                              ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20 scale-102"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200"
                          }`}
                        >
                          <span>{item.icon}</span>
                          <span>{item.label}</span>
                          {item.countBadge && (
                            <span
                              className={`text-[10px] font-extrabold font-mono px-2 py-0.5 rounded-full ${
                                isActive
                                  ? "bg-white/20 text-white"
                                  : "bg-indigo-50 text-indigo-700 border border-indigo-100"
                              }`}
                            >
                              {item.countBadge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {paginatedQuestions.map((q) => {
                    const isCompleted = Boolean(completedItems[q.id]);
                    const earnedScore = completedItems[q.id]?.score;

                    return (
                      <div
                        key={q.id}
                        onClick={() => setActiveQuestion(q)}
                        className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-md ${
                          isCompleted
                            ? "border-emerald-300 bg-emerald-50/20 hover:border-emerald-500"
                            : "border-slate-200 hover:border-indigo-500"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border flex items-center gap-1 ${
                              isCompleted
                                ? "bg-emerald-100 text-emerald-800 border-emerald-200 font-extrabold"
                                : "bg-indigo-50 text-indigo-700 border-indigo-100"
                            }`}
                          >
                            <span>{isCompleted ? "✓" : "✨"}</span>
                            <span>{q.itemCategory || q.section}</span>
                          </span>

                          <div className="flex items-center gap-2">
                            {isCompleted && (
                              <span className="text-[10px] font-mono font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                                {earnedScore || 78} GSE
                              </span>
                            )}
                            <span className="text-[10px] font-mono font-bold text-slate-400">
                              {q.timeLimitMinutes || 2} min
                            </span>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                            {q.title}
                          </h3>
                          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                            {(q as any).text || (q as any).passage || (q as any).instruction || (q as any).promptText}
                          </p>
                        </div>

                        <div
                          className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-bold ${
                            isCompleted
                              ? "border-emerald-200 text-emerald-700"
                              : "border-slate-100 text-indigo-600"
                          }`}
                        >
                          <span>Practice Item #{q.id}</span>
                          <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            {isCompleted ? (
                              <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                                ✓ Completed →
                              </span>
                            ) : (
                              <span>Start →</span>
                            )}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 text-xs gap-3">
                    <button
                      onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                      disabled={pageNumber === 1}
                      className="w-full sm:w-auto px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl disabled:opacity-40 font-semibold text-slate-700 hover:bg-slate-200"
                    >
                      ← Previous Page
                    </button>
                    <span className="text-slate-600 font-mono font-bold text-center">
                      Page {pageNumber} of {totalPages} ({filteredQuestions.length} Questions Total)
                    </span>
                    <button
                      onClick={() => setPageNumber((p) => Math.min(totalPages, p + 1))}
                      disabled={pageNumber === totalPages}
                      className="w-full sm:w-auto px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl disabled:opacity-40 font-semibold text-slate-700 hover:bg-slate-200"
                    >
                      Next Page →
                    </button>
                  </div>
                )}
              </div>
            )}

          {!activeMockId && !activeQuestion && activeTab === "templates" && <TemplatesHub />}

          {!activeMockId && !activeQuestion && activeTab === "vocabulary" && <VocabularyHub />}

          {!activeMockId && !activeQuestion && activeTab === "ai_tutor" && <AITutorView />}

          {!activeMockId && !activeQuestion && activeTab === "progress" && (
            <ProgressAnalyticsView
              onNavigateToSection={(section) => {
                setActiveTab(section);
                setSelectedSection(section as any);
                setSelectedItemType("all");
              }}
            />
          )}

          {!activeMockId && !activeQuestion && activeTab === "notebook" && <NotebookView />}

          {!activeMockId && !activeQuestion && activeTab === "mock" && (
            <div className="flex flex-col gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <h2 className="text-2xl font-extrabold text-slate-900">Full 2-Hour PTE Exam Simulators</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Experience official exam conditions with section countdown timers and GSE scorecards.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MOCK_TESTS_COLLECTION.map((mock) => (
                  <div key={mock.id} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between gap-6 shadow-sm">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-700 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full">
                        Authentic Exam Paper
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 mt-3">{mock.testTitle}</h3>
                      <p className="text-xs text-slate-500 mt-1">Duration: {mock.totalDurationMinutes} mins | 3 Exam Sections</p>

                      <div className="mt-4 space-y-2 text-xs text-slate-700">
                        {mock.sections.map((sec) => (
                          <div key={sec.sectionName} className="flex justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                            <span className="font-semibold">{sec.sectionName}</span>
                            <span className="font-mono text-slate-500">{sec.estimatedDurationMinutes} mins</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveMockId(mock.id)}
                      className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs tracking-wide shadow-md shadow-indigo-500/20 transition-all active:scale-95"
                    >
                      Start Full Exam Simulation
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
