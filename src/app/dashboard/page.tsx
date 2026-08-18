"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import DashboardView from "@/components/DashboardView";
import QuestionEngine from "@/components/QuestionEngines";
import TemplatesHub from "@/components/TemplatesHub";
import VocabularyHub from "@/components/VocabularyHub";
import MockTestSimulator from "@/components/MockTestSimulator";
import AITutorView from "@/components/AITutorView";
import ProgressAnalyticsView from "@/components/ProgressAnalyticsView";
import NotebookView from "@/components/NotebookView";
import { UserSession } from "@/types/auth";
import { PTEPracticeQuestions } from "@/data/practice-questions";
import { getUser } from "@/lib/session";

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

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawTab = searchParams.get("tab") || "dashboard";
  const [activeTab, setActiveTab] = useState<string>(rawTab);
  const [selectedSection, setSelectedSection] = useState<"all" | "speaking" | "writing" | "reading" | "listening">("all");
  const [selectedItemType, setSelectedItemType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeQuestion, setActiveQuestion] = useState<any | null>(null);
  const [activeMockId, setActiveMockId] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [completedItems, setCompletedItems] = useState<Record<string, { score: number }>>({});
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const itemsPerPage = 12;

  useEffect(() => {
    setActiveTab(rawTab);
    setActiveQuestion(null);
    setActiveMockId(null);
    setSelectedItemType("all");
    if (["speaking", "writing", "reading", "listening"].includes(rawTab)) {
      setSelectedSection(rawTab as any);
    } else {
      setSelectedSection("all");
    }
  }, [rawTab]);

  useEffect(() => {
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

  const markItemCompleted = (id: string, score: number) => {
    const updated = { ...completedItems, [id]: { score } };
    setCompletedItems(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("pte_completed_items", JSON.stringify(updated));
      } catch (e) {}
    }
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

  return (
    <div className="w-full">
      {/* Mock Exam Simulator */}
      {activeMockId && (
        <MockTestSimulator testId={activeMockId} onExit={() => setActiveMockId(null)} />
      )}

      {/* Interactive Question Engine */}
      {!activeMockId && activeQuestion && (
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          <button
            onClick={() => setActiveQuestion(null)}
            className="self-start px-4 py-2 rounded-xl bg-surface border border-border-glass text-xs font-bold text-text-primary hover:bg-surface-hover transition-all flex items-center gap-1.5 shadow-xs"
          >
            ← Back to Databank
          </button>
          <QuestionEngine
            question={activeQuestion}
            onAnswerSubmit={(answer: any, scoreFeedback: any) => {
              const score = scoreFeedback?.overallScore || scoreFeedback?.score || 78;
              markItemCompleted(activeQuestion.id, score);
            }}
          />
        </div>
      )}

      {/* Main Home Dashboard Tab */}
      {!activeMockId && !activeQuestion && activeTab === "dashboard" && (
        <DashboardView
          onStartPractice={(section) => {
            router.push(`/dashboard?tab=${section}`);
          }}
          onStartMock={() => {
            router.push("/dashboard/mock-test");
          }}
          userSession={userSession}
        />
      )}

      {/* Practice Modules Grid (Speaking / Writing / Reading / Listening) */}
      {!activeMockId &&
        !activeQuestion &&
        ["speaking", "writing", "reading", "listening", "practice"].includes(activeTab) && (
          <div className="flex flex-col gap-6">
            <div className="bg-surface p-5 md:p-6 rounded-2xl border border-border-glass shadow-xs flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-accent uppercase tracking-wider">
                    {currentActiveSection} Section Practice
                  </span>
                  <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-1 capitalize flex flex-wrap items-center gap-2">
                    {currentActiveSection === "speaking" && "🗣️ Speaking"}
                    {currentActiveSection === "writing" && "✍️ Writing"}
                    {currentActiveSection === "reading" && "📖 Reading"}
                    {currentActiveSection === "listening" && "🎧 Listening"}
                    <span className="text-xs text-text-muted font-mono font-normal">
                      ({filteredQuestions.length} Practice Items Available)
                    </span>
                  </h2>
                </div>
              </div>

              {/* Sub-Item Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin pt-2 border-t border-border-glass -mx-1 px-1">
                {activeItemTypes.map((item) => {
                  const isActive = selectedItemType === item.type;
                  return (
                    <button
                      key={item.type}
                      onClick={() => {
                        setSelectedItemType(item.type);
                        setPageNumber(1);
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? "bg-accent text-white shadow-md shadow-indigo-500/20"
                          : "bg-surface hover:bg-surface-hover text-text-muted hover:text-text-primary border border-border-glass"
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                      {item.countBadge && (
                        <span
                          className={`text-[10px] font-extrabold font-mono px-2 py-0.5 rounded-full ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-accent/15 text-accent border border-accent/20"
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

            {/* Questions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedQuestions.map((q) => {
                const isCompleted = Boolean(completedItems[q.id]);
                const earnedScore = completedItems[q.id]?.score;

                return (
                  <div
                    key={q.id}
                    onClick={() => setActiveQuestion(q)}
                    className={`bg-surface rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-md ${
                      isCompleted
                        ? "border-emerald-300/40 bg-emerald-500/5 hover:border-emerald-500"
                        : "border-border-glass hover:border-accent"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border flex items-center gap-1 ${
                          isCompleted
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 font-extrabold"
                            : "bg-accent/15 text-accent border-accent/25"
                        }`}
                      >
                        <span>{isCompleted ? "✓" : "✨"}</span>
                        <span>{q.itemCategory || q.section}</span>
                      </span>

                      <div className="flex items-center gap-2">
                        {isCompleted && (
                          <span className="text-[10px] font-mono font-extrabold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                            {earnedScore || 78} GSE
                          </span>
                        )}
                        <span className="text-[10px] font-mono font-bold text-text-muted">
                          {q.timeLimitMinutes || 2} min
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors line-clamp-1">
                        {q.title}
                      </h3>
                      <p className="text-xs text-text-muted mt-2 line-clamp-2 leading-relaxed">
                        {(q as any).text || (q as any).passage || (q as any).instruction || (q as any).promptText}
                      </p>
                    </div>

                    <div
                      className={`mt-4 pt-3 border-t border-border-glass flex items-center justify-between text-xs font-bold ${
                        isCompleted ? "text-emerald-400" : "text-accent"
                      }`}
                    >
                      <span>Practice Item #{q.id}</span>
                      <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        {isCompleted ? "✓ Completed →" : "Start →"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between bg-surface p-4 rounded-2xl border border-border-glass text-xs gap-3">
                <button
                  onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                  disabled={pageNumber === 1}
                  className="w-full sm:w-auto px-4 py-2 bg-surface hover:bg-surface-hover border border-border-glass rounded-xl disabled:opacity-40 font-semibold text-text-primary cursor-pointer"
                >
                  ← Previous Page
                </button>
                <span className="text-text-muted font-mono font-bold text-center">
                  Page {pageNumber} of {totalPages} ({filteredQuestions.length} Questions Total)
                </span>
                <button
                  onClick={() => setPageNumber((p) => Math.min(totalPages, p + 1))}
                  disabled={pageNumber === totalPages}
                  className="w-full sm:w-auto px-4 py-2 bg-surface hover:bg-surface-hover border border-border-glass rounded-xl disabled:opacity-40 font-semibold text-text-primary cursor-pointer"
                >
                  Next Page →
                </button>
              </div>
            )}
          </div>
        )}

      {/* Templates Hub */}
      {!activeMockId && !activeQuestion && activeTab === "templates" && <TemplatesHub />}

      {/* Vocabulary Hub */}
      {!activeMockId && !activeQuestion && activeTab === "vocabulary" && <VocabularyHub />}

      {/* Mock Tests Hub */}
      {!activeMockId && !activeQuestion && activeTab === "mock" && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between bg-surface p-6 rounded-2xl border border-border-glass">
            <div>
              <h2 className="text-2xl font-extrabold text-text-primary">30 Full-Length Timed Mock Tests</h2>
              <p className="text-xs text-text-muted mt-1">Official Pearson format with instant 10–90 GSE scoring diagnostics.</p>
            </div>
            <Link
              href="/dashboard/mock-test"
              className="px-5 py-2.5 rounded-xl bg-accent text-white font-bold text-xs hover:bg-accent-bright transition-all"
            >
              Enter Mock Test Suite →
            </Link>
          </div>
        </div>
      )}

      {/* AI Tutor */}
      {!activeMockId && !activeQuestion && activeTab === "ai_tutor" && <AITutorView />}

      {/* Progress Analytics */}
      {!activeMockId && !activeQuestion && activeTab === "progress" && <ProgressAnalyticsView />}

      {/* Notebook */}
      {!activeMockId && !activeQuestion && activeTab === "notebook" && <NotebookView />}

      {/* Diagnostic Test Quick Link */}
      {!activeMockId && !activeQuestion && activeTab === "diagnostic" && (
        <div className="bg-surface p-8 rounded-3xl border border-border-glass text-center max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-accent/15 border border-accent/30 text-accent flex items-center justify-center mx-auto text-xl font-bold">
            ✨
          </div>
          <h2 className="text-2xl font-extrabold text-text-primary">15-Minute PTE Diagnostic Test</h2>
          <p className="text-xs text-text-muted leading-relaxed">
            Take this baseline diagnostic test to uncover your strengths and weaknesses across Speaking, Writing, Reading, and Listening.
          </p>
          <button
            onClick={() => {
              router.push("/dashboard?tab=speaking");
            }}
            className="px-6 py-3 rounded-xl bg-accent text-white font-bold text-xs shadow-lg shadow-indigo-500/20 cursor-pointer"
          >
            Start Diagnostic Test Now →
          </button>
        </div>
      )}
    </div>
  );
}

export default function StudentDashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-xs text-text-muted">Loading PTE Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
