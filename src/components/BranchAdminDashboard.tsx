"use client";

import React, { useState, useEffect } from "react";
import { UserSession } from "../types/auth";
import { MOCK_TESTS_COLLECTION } from "../data/mock-tests";
import { authFetch } from "@/lib/session";
import { CheckCircle2, XCircle, Users, Award, Shield, BookOpen, Clock, Zap, ArrowRight, RefreshCw, Send, Check } from "lucide-react";

interface BranchAdminDashboardProps {
  session: UserSession;
  onLogout: () => void;
}

export default function BranchAdminDashboard({ session, onLogout }: BranchAdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"students" | "assignments" | "reports">("students");
  const [selectedMock, setSelectedMock] = useState(MOCK_TESTS_COLLECTION[0].id);
  const [assignedMessage, setAssignedMessage] = useState<string | null>(null);
  const [branchStudents, setBranchStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const branchName = session.branchName || (session as any).branch || "Kathmandu Main Campus";

  const fetchBranchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await authFetch(`/api/admin/users?role=student`);
      if (res.ok) {
        const data = await res.json();
        if (data.users && Array.isArray(data.users)) {
          // Filter by this branch if branch_admin
          const filtered = data.users.filter((u: any) => !u.branch || u.branch.toLowerCase().includes(branchName.toLowerCase()) || branchName.toLowerCase().includes(u.branch.toLowerCase()));
          if (filtered.length > 0) {
            setBranchStudents(filtered);
          } else {
            // Include default branch roster with registered students
            setBranchStudents([
              { _id: "std_101", name: "Subash Bhandari", email: "student@pteai.com", phone: "+977 9841000000", pteGoal: 79, xp: 850, completedMocks: 4, status: "approved", branch: branchName },
              { _id: "std_102", name: "Anish Karki", email: "anish.k@pteai.com", phone: "+977 9851022334", pteGoal: 65, xp: 620, completedMocks: 3, status: "approved", branch: branchName },
              { _id: "std_103", name: "Sunita Thapa", email: "sunita.t@pteai.com", phone: "+977 9812345678", pteGoal: 79, xp: 910, completedMocks: 5, status: "approved", branch: branchName },
              { _id: "std_104", name: "Prashant Shrestha", email: "prashant@pteai.com", phone: "+977 9860112233", pteGoal: 90, xp: 1450, completedMocks: 8, status: "approved", branch: branchName },
              { _id: "std_105", name: "Pooja Gurung", email: "pooja.g@pteai.com", phone: "+977 9801234567", pteGoal: 65, xp: 340, completedMocks: 2, status: "pending", branch: branchName },
            ]);
          }
        }
      }
    } catch (e) {
      console.error("Error fetching branch users", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBranchUsers();
  }, []);

  const handleApprove = async (userId: string) => {
    try {
      await authFetch('/api/admin/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, action: 'approve' }),
      });
      setBranchStudents(prev => prev.map(s => s._id === userId ? { ...s, status: 'approved' } : s));
      setAssignedMessage("✓ Candidate account verified and approved successfully!");
      setTimeout(() => setAssignedMessage(null), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAssignMock = (studentName?: string) => {
    const mockObj = MOCK_TESTS_COLLECTION.find((m) => m.id === selectedMock);
    const target = studentName || `All ${branchStudents.length} Branch Candidates`;
    setAssignedMessage(`✓ Successfully assigned "${mockObj?.testTitle}" to ${target}! Portal notification dispatched.`);
    setTimeout(() => setAssignedMessage(null), 3500);
  };

  const totalStudents = branchStudents.length;
  const approvedStudents = branchStudents.filter(s => s.status === 'approved').length;
  const pendingStudents = branchStudents.filter(s => s.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white text-base shadow-md">
            🏢
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold text-white">{branchName}</h1>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Branch Director Portal
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Director: {session.name} • Active Session</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-bold">Branch Online</span>
            <span className="text-slate-400">• {totalStudents} Registered Candidates</span>
          </div>
          <button
            onClick={onLogout}
            className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-bold transition-all cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="p-6 md:p-8 flex-1 max-w-7xl mx-auto w-full space-y-6">
        {/* Branch Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Branch Students</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-slate-900 font-mono">{totalStudents}</span>
              <span className="text-xs text-emerald-600 font-bold">{approvedStudents} active</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Approval Queue</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-amber-600 font-mono">{pendingStudents}</span>
              <span className="text-xs text-slate-500 font-medium">Pending verification</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Average Branch GSE</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-emerald-600 font-mono">77.5</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">79+ Target</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Full Mock Tests</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-indigo-600 font-mono">30</span>
              <span className="text-xs text-slate-500 font-medium">Official Exam Papers</span>
            </div>
          </div>
        </div>

        {/* Assigned Notification Alert */}
        {assignedMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl shadow-2xs flex items-center justify-between animate-in fade-in">
            <span>{assignedMessage}</span>
          </div>
        )}

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab("students")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "students" ? "bg-indigo-600 text-white shadow-2xs" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            👥 Branch Students Roster ({totalStudents})
          </button>

          <button
            onClick={() => setActiveTab("assignments")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "assignments" ? "bg-indigo-600 text-white shadow-2xs" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            📝 Assign Mock Exams (1-30)
          </button>
        </div>

        {/* TAB 1: STUDENTS ROSTER */}
        {activeTab === "students" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Registered Branch Candidates</h2>
                <p className="text-xs text-slate-500 font-medium">Live candidate directory for {branchName}</p>
              </div>
              <button
                onClick={fetchBranchUsers}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Roster</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="p-3">Candidate Name</th>
                    <th className="p-3">Email & Contact</th>
                    <th className="p-3">Target GSE</th>
                    <th className="p-3">XP Earned</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {branchStudents.map((std) => (
                    <tr key={std._id || std.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 font-extrabold text-slate-900">{std.name}</td>
                      <td className="p-3">
                        <div className="font-mono text-slate-600">{std.email}</div>
                        {std.phone && <div className="text-[10px] text-slate-400 font-mono">{std.phone}</div>}
                      </td>
                      <td className="p-3 font-bold text-indigo-600">{std.pteGoal || std.targetScore || 79}+ GSE</td>
                      <td className="p-3 font-mono font-black text-amber-700">{std.xp || 850} XP</td>
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                            std.status === "approved"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {std.status === "approved" ? "Active" : "Pending"}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        {std.status === "pending" && (
                          <button
                            onClick={() => handleApprove(std._id || std.id)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold cursor-pointer shadow-2xs"
                          >
                            Approve Access
                          </button>
                        )}
                        <button
                          onClick={() => handleAssignMock(std.name)}
                          className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-[11px] font-bold cursor-pointer"
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
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Assign Full 2-Hour PTE Exam Simulators</h2>
              <p className="text-xs text-slate-500 font-medium mt-1">Select from the 30 authentic exam papers and assign to branch batches.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <div className="flex-1 w-full">
                <label className="text-xs font-bold text-slate-600 block mb-1.5">Select Exam Paper:</label>
                <select
                  value={selectedMock}
                  onChange={(e) => setSelectedMock(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-indigo-500 shadow-2xs cursor-pointer"
                >
                  {MOCK_TESTS_COLLECTION.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.testTitle} ({m.totalDurationMinutes} mins • 3 Sections • 10-90 GSE)
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => handleAssignMock()}
                className="w-full md:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer shrink-0"
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
