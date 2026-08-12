"use client";

import React, { useState } from "react";
import { UserSession } from "../types/auth";
import { MOCK_TESTS_COLLECTION } from "../data/mock-tests";

interface BranchAdminDashboardProps {
  session: UserSession;
  onLogout: () => void;
}

export default function BranchAdminDashboard({ session, onLogout }: BranchAdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"students" | "assignments" | "tutors" | "reports">("students");
  const [selectedMock, setSelectedMock] = useState(MOCK_TESTS_COLLECTION[0].id);
  const [assignedMessage, setAssignedMessage] = useState<string | null>(null);

  const studentsList = [
    { id: "std_101", name: "Subash Bhandari", email: "subash@pteai.com", targetGSE: 79, avgGSE: 78, completedMocks: 4, status: "Active" },
    { id: "std_102", name: "Anish Karki", email: "anish.k@pteai.com", targetGSE: 65, avgGSE: 68, completedMocks: 3, status: "Active" },
    { id: "std_103", name: "Sunita Thapa", email: "sunita.t@pteai.com", targetGSE: 79, avgGSE: 75, completedMocks: 5, status: "Active" },
    { id: "std_104", name: "Prashant Shrestha", email: "prashant@pteai.com", targetGSE: 90, avgGSE: 86, completedMocks: 8, status: "Active" },
    { id: "std_105", name: "Pooja Gurung", email: "pooja.g@pteai.com", targetGSE: 65, avgGSE: 62, completedMocks: 2, status: "Needs Support" },
  ];

  const handleAssignMock = (studentName?: string) => {
    const mockObj = MOCK_TESTS_COLLECTION.find((m) => m.id === selectedMock);
    const target = studentName || "All 142 Branch Students";
    setAssignedMessage(`✓ Successfully assigned "${mockObj?.testTitle}" to ${target}! Notification sent.`);
    setTimeout(() => setAssignedMessage(null), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-extrabold text-white text-base">
            🏢
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white">{session.branchName || "Kathmandu Main Campus"}</h1>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Branch Admin Portal
              </span>
            </div>
            <p className="text-xs text-slate-400">Director: {session.name} • MasterIELTSAI Infrastructure</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
            <span className="text-emerald-400 font-bold">● Branch Online</span>
            <span className="text-slate-400">• 142 Candidates</span>
          </div>
          <button
            onClick={onLogout}
            className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-bold transition-all"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="p-6 md:p-8 flex-1 max-w-7xl mx-auto w-full space-y-6">
        {/* Branch Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Branch Students</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-slate-900 font-mono">142</span>
              <span className="text-xs text-emerald-600 font-bold">+12 this month</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Assigned Mock Exams</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-indigo-600 font-mono">48</span>
              <span className="text-xs text-slate-500">ActivePapers</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Average Branch GSE</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-emerald-600 font-mono">74.5</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">79+ Target</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">AI Evaluation Rate</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-purple-600 font-mono">98.4%</span>
              <span className="text-xs text-slate-500">Gemini 2.5 Flash</span>
            </div>
          </div>
        </div>

        {/* Assigned Notification Alert */}
        {assignedMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl shadow-xs flex items-center justify-between">
            <span>{assignedMessage}</span>
          </div>
        )}

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab("students")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "students" ? "bg-indigo-600 text-white shadow-xs" : "bg-white border border-slate-200 text-slate-700"
            }`}
          >
            👥 Branch Students Roster
          </button>

          <button
            onClick={() => setActiveTab("assignments")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "assignments" ? "bg-indigo-600 text-white shadow-xs" : "bg-white border border-slate-200 text-slate-700"
            }`}
          >
            📝 Assign Mock Exams (1-30)
          </button>
        </div>

        {/* TAB 1: STUDENTS ROSTER */}
        {activeTab === "students" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Registered Branch Candidates</h2>
              <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                142 Candidates Total
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="p-3">Candidate Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Target Score</th>
                    <th className="p-3">Avg GSE Score</th>
                    <th className="p-3">Completed Mocks</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {studentsList.map((std) => (
                    <tr key={std.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 font-bold text-slate-900">{std.name}</td>
                      <td className="p-3 font-mono text-slate-500">{std.email}</td>
                      <td className="p-3 font-bold text-indigo-600">{std.targetGSE}+ GSE</td>
                      <td className="p-3 font-mono font-extrabold text-emerald-600">{std.avgGSE} GSE</td>
                      <td className="p-3 font-mono font-bold text-slate-700">{std.completedMocks} Papers</td>
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                            std.status === "Active"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {std.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => handleAssignMock(std.name)}
                          className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-[11px] font-bold"
                        >
                          Assign Exam
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: MOCK ASSIGNMENTS */}
        {activeTab === "assignments" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Assign Full 2-Hour PTE Exam Simulators</h2>
              <p className="text-xs text-slate-500 mt-1">Select from the 30 authentic exam papers and assign to branch classes.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex-1 w-full">
                <label className="text-xs font-bold text-slate-500 block mb-1">Select Exam Paper:</label>
                <select
                  value={selectedMock}
                  onChange={(e) => setSelectedMock(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-indigo-500"
                >
                  {MOCK_TESTS_COLLECTION.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.testTitle} ({m.totalDurationMinutes} mins • 3 Sections)
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => handleAssignMock()}
                className="w-full md:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md"
              >
                Assign to All Branch Students →
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
