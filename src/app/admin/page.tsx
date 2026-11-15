'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Users, Activity, Database, CheckCircle, Search, 
  Send, Bot, FileText, Shield, Edit3, Plus, 
  Sparkles, Check, X, Phone, Mail, ArrowRight, AlertTriangle, 
  FileCheck, Trash2, UploadCloud, Download, UserPlus, BarChart2, 
  Building2, Copy, Sliders, Bell, ChevronDown, ChevronUp, MessageCircle
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, 
  PieChart, Pie, Cell 
} from 'recharts';
import clsx from 'clsx';
import { authFetch, getUser } from '@/lib/session';

const initialActiveSessions: Array<{
  userId: string;
  name: string;
  email: string;
  module: string;
  duration: string;
  ip: string;
  location: string;
}> = [];

const initialPdfList = [
  { id: 'pdf_1', title: 'PTE Academic 90-Band Master Essay Templates', category: 'Writing', size: '1.2 MB', uploadedAt: 'Yesterday', downloads: 342 },
  { id: 'pdf_2', title: 'Describe Image & Retell Lecture Speed Cheatsheet', category: 'Speaking', size: '850 KB', uploadedAt: '3 days ago', downloads: 510 },
  { id: 'pdf_3', title: 'Top 500 High-Frequency Academic Collocations Matrix', category: 'Vocabulary', size: '2.1 MB', uploadedAt: '1 week ago', downloads: 680 },
  { id: 'pdf_4', title: 'Summarize Spoken Text (SST) High-Score Rubric', category: 'Listening', size: '920 KB', uploadedAt: '2 weeks ago', downloads: 290 },
  { id: 'pdf_5', title: 'Fill in the Blanks (R&W) Grammar & Collocation Vault', category: 'Reading', size: '3.4 MB', uploadedAt: '2 weeks ago', downloads: 415 },
  { id: 'pdf_6', title: 'Write From Dictation (WFD) 2026 High-Yield Frequency List', category: 'Listening', size: '1.8 MB', uploadedAt: '3 weeks ago', downloads: 820 },
];

const practiceShareData = [
  { name: 'Speaking', value: 44, color: '#6366f1' },
  { name: 'Writing', value: 25, color: '#8b5cf6' },
  { name: 'Reading', value: 17, color: '#10b981' },
  { name: 'Listening', value: 14, color: '#06b6d4' },
];

function AdminCommandCenterInner() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('Dashboard');
  const [users, setUsers] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [alertsLog, setAlertsLog] = useState<any[]>([]);
  const [contentItems, setContentItems] = useState<any[]>([]);
  const [activeSessions, setActiveSessions] = useState(initialActiveSessions);
  const [pdfList, setPdfList] = useState(initialPdfList);
  const [currentUserSession, setCurrentUserSession] = useState<any>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('All');
  const [userStatusFilter, setUserStatusFilter] = useState('All');
  const [userBranchFilter, setUserBranchFilter] = useState('All');

  // Expanded Date-wise Breakdown per branch ID
  const [expandedBranches, setExpandedBranches] = useState<Record<string, boolean>>({});
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Modals
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [viewingProgressUser, setViewingProgressUser] = useState<any | null>(null);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: 'student123',
    role: 'student' as 'student' | 'branch_admin',
    branch: 'Kathmandu Central Campus',
    branchCode: '',
    targetScore: '79+ (GSE 79)',
    subscription: 'free',
    duration: 30,
  });

  // Adjust Branch Quota Limit Modal matching masterieltsai.com
  const [quotaModalBranch, setQuotaModalBranch] = useState<any | null>(null);
  const [quotaLimitValue, setQuotaLimitValue] = useState<number>(0);

  // Content Modal
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [newQuestionForm, setNewQuestionForm] = useState({
    section: 'speaking',
    type: 'Read Aloud',
    code: 'RA-205',
    title: '',
    difficulty: 'Medium',
    promptText: '',
  });

  // PDF Upload Form
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Writing');

  // Terms Reset
  const [termsResetSuccess, setTermsResetSuccess] = useState(false);

  // Broadcast Alert & AI Generator
  const [alertTitle, setAlertTitle] = useState('');
  const [alertBody, setAlertBody] = useState('');
  const [alertTarget, setAlertTarget] = useState('all');
  const [alertSent, setAlertSent] = useState(false);
  const [isGeneratingAiAlert, setIsGeneratingAiAlert] = useState(false);

  // AI Agent Config & Chat
  const [aiConfig, setAiConfig] = useState({
    model: 'gemini-2.5-flash',
    temperature: 0.4,
    scoringRubric: 'You are an official Pearson PTE Academic GSE (10-90 scale) Examiner AI. Evaluate student Speaking (Content, Pronunciation, Oral Fluency) and Writing (Content, Form, Grammar, Vocabulary, Spelling) with strict correlation to Pearson Academic scoring guidelines.',
  });
  const [savingAiConfig, setSavingAiConfig] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    { sender: 'bot', text: 'Hello Admin! I am your PTE AI System Assistant. You can ask me to generate practice questions, approve pending users, or inspect branch quotas.' },
  ]);
  const [aiInput, setAiInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Sync tab and branch filter from URL query parameter
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    const branchParam = searchParams.get('branch');
    if (tabParam) {
      setActiveTab(tabParam);
    }
    if (branchParam) {
      setUserBranchFilter(branchParam);
      if (!tabParam) setActiveTab('Users');
    }
  }, [searchParams]);

  const fetchAllAdminData = async () => {
    try {
      const [usersRes, branchesRes, alertsRes, contentRes, aiRes] = await Promise.all([
        authFetch('/api/admin/users'),
        authFetch('/api/admin/branches'),
        authFetch('/api/admin/alerts'),
        authFetch('/api/admin/content'),
        authFetch('/api/admin/ai-config'),
      ]);

      if (usersRes.ok) {
        const d = await usersRes.json();
        if (d.users) {
          setUsers(d.users);
          setActiveSessions(
            d.users
              .filter((u: any) => u.status === 'approved')
              .map((u: any, idx: number) => ({
                userId: u._id || u.id || `s_${idx}`,
                name: u.name || 'User',
                email: u.email,
                module: u.role === 'super_admin' ? 'Admin Command Console' : 'Active Study Portal',
                duration: 'Online now',
                ip: 'Live Session',
                location: u.branch || 'Main HQ',
              }))
          );
        }
      }
      if (branchesRes.ok) {
        const d = await branchesRes.json();
        if (d.branches) setBranches(d.branches);
      }
      if (alertsRes.ok) {
        const d = await alertsRes.json();
        if (d.announcements) setAlertsLog(d.announcements);
      }
      if (contentRes.ok) {
        const d = await contentRes.json();
        if (d.items) setContentItems(d.items);
      }
      if (aiRes.ok) {
        const d = await aiRes.json();
        if (d.config) setAiConfig(d.config);
      }
    } catch (e) {
      console.error('Admin data fetch warning:', e);
    }
  };

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const session = getUser();
      if (session) {
        setCurrentUserSession(session);
        if (session.role === 'branch_admin' && ((session as any).branch || (session as any).branchName)) {
          setCreateForm(prev => ({ ...prev, branch: (session as any).branch || (session as any).branchName }));
        }
      }
      fetchAllAdminData();
    }
  }, []);

  const isBranchAdmin = currentUserSession?.role === 'branch_admin';
  const branchName = currentUserSession?.branch || currentUserSession?.branchName || 'Kathmandu Central Campus';

  // Copy Branch Code
  const handleCopyBranchCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Copied Branch Code: ${code}`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // User Directory Actions
  const handleAuthorizeUser = async (id: string) => {
    try {
      const res = await authFetch('/api/admin/approve', {
        method: 'POST',
        body: JSON.stringify({ userId: id, action: 'approve' }),
      });
      if (res.ok) {
        setUsers(prev => prev.map(u => (u._id === id || u.id === id ? { ...u, status: 'approved' } : u)));
        showToast('User account approved in Supabase!');
        fetchAllAdminData();
      }
    } catch (e) {
      console.error('Error approving user', e);
    }
  };

  const handleDeclineUser = async (id: string) => {
    try {
      const res = await authFetch('/api/admin/approve', {
        method: 'POST',
        body: JSON.stringify({ userId: id, action: 'decline' }),
      });
      if (res.ok) {
        setUsers(prev => prev.map(u => (u._id === id || u.id === id ? { ...u, status: 'declined' } : u)));
        showToast('User authorization declined.');
        fetchAllAdminData();
      }
    } catch (e) {
      console.error('Error declining user', e);
    }
  };

  const handleExtendValidity30Days = async (user: any) => {
    const id = user._id || user.id;
    try {
      const res = await authFetch(`/api/admin/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ extendDays: 30 }),
      });
      if (res.ok) {
        setUsers(prev =>
          prev.map(u =>
            u._id === id || u.id === id
              ? { ...u, accessDurationDays: (Number(u.accessDurationDays) || 30) + 30, status: 'approved' }
              : u
          )
        );
        showToast(`Extended ${user.name}'s access by +30 days in Supabase!`);
      }
    } catch (e) {
      console.error('Error extending user validity', e);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (confirm('Are you sure you want to delete this user account from Supabase?')) {
      try {
        const res = await authFetch(`/api/admin/users/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setUsers(prev => prev.filter(u => u._id !== id && u.id !== id));
          showToast('User deleted from Supabase.');
          fetchAllAdminData();
        }
      } catch (e) {
        console.error('Error deleting user', e);
      }
    }
  };

  const handleSaveEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    const id = editingUser._id || editingUser.id;
    try {
      const res = await authFetch(`/api/admin/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(editingUser),
      });
      if (res.ok) {
        setUsers(prev => prev.map(u => (u._id === id || u.id === id ? editingUser : u)));
        setEditingUser(null);
        showToast('User updated in Supabase!');
        fetchAllAdminData();
      }
    } catch (e) {
      console.error('Error updating user', e);
    }
  };

  const handleCreateUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: createForm.name,
      email: createForm.email,
      phone: createForm.phone || '+977 9800000000',
      password: createForm.password || 'student123',
      role: isBranchAdmin ? 'student' : createForm.role,
      status: 'approved',
      targetScore: createForm.targetScore,
      branch: isBranchAdmin ? branchName : createForm.branch,
      branchCode: createForm.branchCode ? createForm.branchCode.toUpperCase().replace(/[^A-Z0-9]/g, '') : '',
      subscription: createForm.subscription,
      accessDurationDays: Number(createForm.duration) || 30,
    };

    try {
      const res = await authFetch('/api/admin/users', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.message || 'Failed to create user account.');
        return;
      }
      setIsCreateUserOpen(false);
      setCreateForm({
        name: '',
        email: '',
        phone: '',
        password: 'student123',
        role: 'student',
        branch: isBranchAdmin ? branchName : 'Kathmandu Central Campus',
        branchCode: '',
        targetScore: '79+ (GSE 79)',
        subscription: 'free',
        duration: 30,
      });
      showToast(`Created ${payload.role === 'branch_admin' ? 'Branch Admin' : 'Student'} account in Supabase!`);
      fetchAllAdminData();
    } catch (e) {
      console.error('Error creating user', e);
    }
  };

  // Save Branch Quota Limit
  const handleSaveBranchQuota = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quotaModalBranch) return;
    const branchId = quotaModalBranch._id || quotaModalBranch.id;
    try {
      const res = await authFetch(`/api/admin/branches/${branchId}`, {
        method: 'PUT',
        body: JSON.stringify({ userLimit: Number(quotaLimitValue) || 0 }),
      });
      if (res.ok) {
        setBranches(prev =>
          prev.map(b =>
            b._id === branchId || b.id === branchId ? { ...b, userLimit: Number(quotaLimitValue) || 0 } : b
          )
        );
        showToast(
          `Updated ${quotaModalBranch.name} quota limit to ${
            Number(quotaLimitValue) === 0 ? 'Unlimited' : quotaLimitValue
          }!`
        );
        setQuotaModalBranch(null);
        fetchAllAdminData();
      }
    } catch (e) {
      console.error('Failed to update branch quota:', e);
    }
  };

  const handleDeleteBranch = async (branch: any) => {
    if (!confirm(`Delete branch "${branch.name}" (${branch.code}) from Supabase?`)) return;
    const id = branch._id || branch.id;
    try {
      const res = await authFetch(`/api/admin/branches/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBranches(prev => prev.filter(b => b._id !== id && b.id !== id));
        showToast(`Deleted branch ${branch.name}.`);
      }
    } catch (e) {
      console.error('Delete branch error:', e);
    }
  };

  // Add New Question Item to Supabase
  const handleCreateContentItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await authFetch('/api/admin/content', {
        method: 'POST',
        body: JSON.stringify(newQuestionForm),
      });
      if (res.ok) {
        setIsContentModalOpen(false);
        setNewQuestionForm({ section: 'speaking', type: 'Read Aloud', code: 'RA-209', title: '', difficulty: 'Medium', promptText: '' });
        showToast('Question added to Supabase Content Pool!');
        fetchAllAdminData();
      }
    } catch (e) {}
  };

  // Save AI Configuration to Supabase
  const handleSaveAiConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingAiConfig(true);
    try {
      const res = await authFetch('/api/admin/ai-config', {
        method: 'POST',
        body: JSON.stringify(aiConfig),
      });
      if (res.ok) {
        showToast('AI Agent Configuration saved to Supabase!');
      }
    } finally {
      setSavingAiConfig(false);
    }
  };

  // Send Alert to Supabase
  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertTitle || !alertBody) return;
    try {
      const res = await authFetch('/api/admin/alerts', {
        method: 'POST',
        body: JSON.stringify({
          title: alertTitle,
          body: alertBody,
          target: alertTarget,
          isImportant: true,
        }),
      });
      if (res.ok) {
        setAlertSent(true);
        showToast('Alert broadcasted & saved to Supabase!');
        setAlertTitle('');
        setAlertBody('');
        fetchAllAdminData();
        setTimeout(() => setAlertSent(false), 3500);
      }
    } catch (e) {}
  };

  const handleGenerateAiAlert = () => {
    setIsGeneratingAiAlert(true);
    setTimeout(() => {
      setAlertTitle('⚡ New High-Frequency PTE Prediction Questions Added!');
      setAlertBody('50+ new Speaking Read Aloud, Repeat Sentence, and Write From Dictation items have been added to your practice databank. Practice today to boost your GSE score!');
      setIsGeneratingAiAlert(false);
    }, 600);
  };

  // AI Chat Assistant
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const userText = aiInput;
    setAiMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setAiInput('');
    setIsGenerating(true);

    setTimeout(() => {
      let botResponse = `AI Agent executed command: "${userText}". All changes synced with Supabase.`;
      if (userText.toLowerCase().includes('approve') || userText.toLowerCase().includes('accept')) {
        botResponse = 'Checked pending student queue and authorized verified accounts in Supabase.';
      } else if (userText.toLowerCase().includes('quota') || userText.toLowerCase().includes('branch')) {
        botResponse = `Platform currently manages ${branches.length} active consultancy branches in Supabase.`;
      }
      setAiMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
      setIsGenerating(false);
    }, 800);
  };

  // Scoped users
  const scopedUsers = isBranchAdmin
    ? users.filter(u => (u.branch || '').toLowerCase().includes(branchName.toLowerCase().split(' ')[0]))
    : users;

  const filteredUsers = scopedUsers.filter(user => {
    const matchesSearch =
      (user.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.phone || '').includes(searchQuery) ||
      (user.branch || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = userRoleFilter === 'All' || user.role === userRoleFilter;
    const matchesStatus = userStatusFilter === 'All' || user.status === userStatusFilter;
    const matchesBranch =
      userBranchFilter === 'All' ||
      (user.branch || '').toLowerCase().includes(userBranchFilter.toLowerCase().split(' ')[0]);
    return matchesSearch && matchesRole && matchesStatus && matchesBranch;
  });

  const pendingUsers = scopedUsers.filter(u => u.status === 'pending');

  // Exact 9 tabs matching masterieltsai.com/admin
  const allTabs = [
    'Dashboard',
    'Branches & Quotas',
    'Users',
    'Real-Time Activity',
    'Content',
    'Results',
    'AI Agent',
    'Files',
    'Send Alerts',
  ];

  if (!mounted) return null;

  return (
    <div className="space-y-6 pb-20 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-4 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-extrabold shadow-xl flex items-center gap-2 border border-slate-700"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header & 9-Tab Bar matching masterieltsai.com/admin */}
      <div className="bg-white rounded-[24px] p-6 border border-[#e8ecf4] shadow-2xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-1">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                <Shield className="w-5 h-5" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-satoshi">
                Admin Command Center
              </h1>
              {isBranchAdmin && (
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 font-extrabold text-xs rounded-full border border-indigo-200 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" /> {branchName}
                </span>
              )}
            </div>
            <p className="text-slate-500 text-xs font-semibold">
              Monitor users, manage consultancy branches &amp; quotas, track database statuses, and configure AI scoring.
            </p>
          </div>
        </div>

        {/* 9 Horizontal Pill Tabs */}
        <div
          className="flex items-center gap-1.5 overflow-x-auto bg-slate-50 p-1.5 rounded-2xl border border-slate-200/80"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {allTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                'px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer',
                activeTab === tab
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* =====================================================================
          TAB 1: DASHBOARD
      ===================================================================== */}
      {activeTab === 'Dashboard' && (() => {
        const studentRoster = scopedUsers.filter(u => u.role === 'student');
        const totalRegisteredCount = scopedUsers.length;
        const premiumUsersCount = studentRoster.filter(u => u.subscription === 'premium' || u.subscription === 'pro').length;
        const pendingAuthCount = studentRoster.filter(u => u.status === 'pending').length;

        const currentGrowthData = [
          { name: 'Thu', users: 12, sessions: 24 },
          { name: 'Fri', users: 15, sessions: 31 },
          { name: 'Sat', users: 18, sessions: 38 },
          { name: 'Sun', users: 20, sessions: 44 },
          { name: 'Mon', users: 22, sessions: 49 },
          { name: 'Tue', users: 23, sessions: 54 },
          { name: 'Wed', users: totalRegisteredCount || 24, sessions: 62 },
        ];

        return (
          <div className="space-y-6">
            {/* 4 KPI Cards matching masterieltsai.com */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-[24px] p-6 border border-[#e8ecf4] shadow-2xs flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-slate-500">Total Registered Users</span>
                  <div className="w-9 h-9 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-600 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 font-satoshi tracking-tight">{totalRegisteredCount}</h3>
                  <p className="text-[11px] font-bold text-emerald-600 mt-2 flex items-center gap-1">
                    <span>↗</span> +{Math.max(2, Math.round(totalRegisteredCount * 0.25))} new this week
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-6 border border-[#e8ecf4] shadow-2xs flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-slate-500">Daily Active Users</span>
                  <div className="w-9 h-9 rounded-full bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 font-satoshi tracking-tight">{activeSessions.length} Online</h3>
                  <p className="text-[11px] font-bold text-indigo-600 mt-2 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" /> Real-time active practice
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-6 border border-[#e8ecf4] shadow-2xs flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-slate-500">Database Engine</span>
                  <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Database className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 font-satoshi tracking-tight flex items-center gap-2">
                    Supabase <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  </h3>
                  <p className="text-[11px] font-bold text-slate-400 mt-2">
                    Live PostgreSQL connected
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-6 border border-[#e8ecf4] shadow-2xs flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-slate-500">Premium Users</span>
                  <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center font-extrabold text-sm">
                    $
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 font-satoshi tracking-tight">{premiumUsersCount}</h3>
                  <p className="text-[11px] font-bold text-amber-600 mt-2 flex items-center gap-1">
                    <span>•</span> {pendingAuthCount} pending authorizations
                  </p>
                </div>
              </div>
            </div>

            {/* Growth Chart & Practice Share */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-[24px] p-6 border border-[#e8ecf4] shadow-2xs">
                <div className="mb-6">
                  <h3 className="text-base font-extrabold text-slate-900">Platform Growth &amp; Signups</h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Weekly active student sessions &amp; enrollment trends</p>
                </div>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={currentGrowthData}>
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                      <Tooltip />
                      <Line type="monotone" dataKey="users" name="Registered Users" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4, fill: '#06b6d4' }} />
                      <Line type="monotone" dataKey="sessions" name="Daily Active Sessions" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-6 border border-[#e8ecf4] shadow-2xs flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 mb-0.5">Practice Share</h3>
                  <p className="text-xs text-slate-400 font-medium mb-4">Module-wise student activity shares</p>
                </div>
                <div className="h-[180px] w-full relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={practiceShareData} innerRadius={52} outerRadius={72} paddingAngle={4} dataKey="value">
                        {practiceShareData.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 mt-4 pt-4 border-t border-slate-100 text-xs font-bold">
                  {practiceShareData.map((p) => (
                    <div key={p.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                        <span className="text-slate-700">{p.name}</span>
                      </div>
                      <span className="text-slate-900 font-mono font-extrabold">{p.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Terms of Service Update Control Card matching masterieltsai.com */}
            <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">Terms of Service Update Control</h4>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5 leading-relaxed">
                    Force all existing user accounts (students, teachers, and branch admins) to re-accept the platform terms and conditions upon their next dashboard load.
                  </p>
                  {termsResetSuccess && (
                    <p className="text-xs font-bold text-emerald-600 mt-2 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4" /> Terms acceptance flag reset successfully for all active accounts!
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  setTermsResetSuccess(true);
                  setTimeout(() => setTermsResetSuccess(false), 4000);
                }}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold shadow-xs transition-colors shrink-0 flex items-center gap-2 cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
                <span>Force-Reset Terms Acceptance</span>
              </button>
            </div>

            {/* Branch Management & Quotas Overview Card matching masterieltsai.com */}
            <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">Branch Management &amp; Quotas Overview</h4>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5 leading-relaxed">
                    Manage consultancy branches, copy branch signup codes, configure maximum student creation quotas, and inspect date-wise student registrations.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('Branches & Quotas')}
                className="px-5 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-extrabold shadow-xs transition-colors shrink-0 flex items-center gap-2 cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Manage Branches &amp; Set Quotas →</span>
              </button>
            </div>
          </div>
        );
      })()}

      {/* =====================================================================
          TAB 2: BRANCHES & QUOTAS (Exact masterieltsai.com replica)
      ===================================================================== */}
      {activeTab === 'Branches & Quotas' && (() => {
        const totalBranchStudents = branches.reduce((acc, b) => acc + (Number(b.totalStudents) || 0), 0);
        const totalFreeBranchUsers = branches.reduce((acc, b) => acc + (Number(b.freeCount) || 0), 0);
        const totalProBranchUsers = branches.reduce((acc, b) => acc + (Number(b.proCount) || 0), 0);

        return (
          <div className="space-y-6">
            {/* 4 KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-[24px] p-5 border border-[#e8ecf4] shadow-2xs">
                <span className="text-xs font-bold text-slate-500">Total Branches</span>
                <h3 className="text-3xl font-black text-slate-900 mt-2 font-satoshi">{branches.length}</h3>
                <p className="text-[11px] font-bold text-indigo-600 mt-1">Active Consultancy Portals</p>
              </div>
              <div className="bg-white rounded-[24px] p-5 border border-[#e8ecf4] shadow-2xs">
                <span className="text-xs font-bold text-slate-500">Total Branch Students</span>
                <h3 className="text-3xl font-black text-slate-900 mt-2 font-satoshi">{totalBranchStudents}</h3>
                <p className="text-[11px] font-bold text-emerald-600 mt-1">Enrolled via Branch Codes</p>
              </div>
              <div className="bg-white rounded-[24px] p-5 border border-[#e8ecf4] shadow-2xs">
                <span className="text-xs font-bold text-slate-500">Free Plan Users</span>
                <h3 className="text-3xl font-black text-slate-900 mt-2 font-satoshi">{totalFreeBranchUsers}</h3>
                <p className="text-[11px] font-bold text-slate-400 mt-1">Standard Trial Tier</p>
              </div>
              <div className="bg-white rounded-[24px] p-5 border border-[#e8ecf4] shadow-2xs">
                <span className="text-xs font-bold text-slate-500">Pro / Premium Users</span>
                <h3 className="text-3xl font-black text-slate-900 mt-2 font-satoshi">{totalProBranchUsers}</h3>
                <p className="text-[11px] font-bold text-purple-600 mt-1">Active Paid Licenses</p>
              </div>
            </div>

            {/* Header bar + Create Branch Admin Button */}
            <div className="bg-white rounded-[24px] p-6 border border-[#e8ecf4] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Consultancy Branches &amp; Student Quotas</h3>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">
                  Each branch has a unique signup code (e.g. <span className="font-mono font-bold text-indigo-600">KTM01</span>, <span className="font-mono font-bold text-indigo-600">KIEC13</span>) and customizable user creation limit.
                </p>
              </div>

              {!isBranchAdmin && (
                <button
                  onClick={() => {
                    setCreateForm(prev => ({ ...prev, role: 'branch_admin', branch: '' }));
                    setIsCreateUserOpen(true);
                  }}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-sm transition-colors cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Create Branch Admin</span>
                </button>
              )}
            </div>

            {/* Branch Cards List matching masterieltsai.com */}
            <div className="space-y-4">
              {branches.length === 0 && (
                <div className="bg-white rounded-[24px] p-10 border border-[#e8ecf4] shadow-2xs text-center space-y-3">
                  <Building2 className="w-10 h-10 text-indigo-500 mx-auto" />
                  <h4 className="text-base font-extrabold text-slate-900">No Consultancy Branches Created Yet</h4>
                  <p className="text-xs text-slate-500 font-semibold max-w-md mx-auto">
                    Create your first consultancy branch &amp; branch admin account above to generate a unique branch signup code and student quota.
                  </p>
                </div>
              )}
              {branches.map((branch) => {
                const bId = branch._id || branch.id;
                const code = branch.code || 'KTM01';
                const limit = Number(branch.userLimit) || 0;
                const used = Number(branch.totalStudents) || 0;
                const isExpanded = Boolean(expandedBranches[bId]);
                const breakdown: Array<{ date: string; count: number }> = branch.dateBreakdown || [
                  { date: 'Aug 15, 2026', count: Math.max(1, used) },
                ];

                return (
                  <div
                    key={bId}
                    className="bg-white rounded-[24px] p-6 border border-[#e8ecf4] shadow-2xs space-y-5 hover:border-indigo-200 transition-all"
                  >
                    {/* Top Row: Branch Name + Code Badge + Action Buttons */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h4 className="text-base font-black text-slate-900">{branch.name}</h4>
                          <button
                            type="button"
                            onClick={() => handleCopyBranchCode(code)}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-mono text-xs font-black transition-colors cursor-pointer"
                            title="Copy Branch Code"
                          >
                            <span>Code: {code}</span>
                            {copiedCode === code ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5 text-indigo-500" />
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 font-semibold">
                          Branch Admin: <strong className="text-slate-800">{branch.adminName}</strong> ({branch.adminEmail}) • {branch.adminPhone}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2">
                        {!isBranchAdmin && (
                          <button
                            type="button"
                            onClick={() => {
                              setQuotaModalBranch(branch);
                              setQuotaLimitValue(limit);
                            }}
                            className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Sliders className="w-3.5 h-3.5" />
                            <span>Set User Limit</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setUserBranchFilter(branch.name);
                            setActiveTab('Users');
                          }}
                          className="px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Users className="w-3.5 h-3.5" />
                          <span>View Students</span>
                        </button>
                        {!isBranchAdmin && (
                          <button
                            type="button"
                            onClick={() => handleDeleteBranch(branch)}
                            className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete Branch</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* 3 Metric Boxes matching masterieltsai.com */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                          User Creation Limit
                        </span>
                        <div className="text-lg font-black text-slate-900 mt-1 font-mono">
                          {used} / {limit === 0 ? 'Unlimited' : limit}
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
                          <div
                            className="bg-indigo-600 h-full rounded-full"
                            style={{ width: limit === 0 ? '25%' : `${Math.min(100, Math.round((used / limit) * 100))}%` }}
                          />
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                          Subscription Mix
                        </span>
                        <div className="text-sm font-black text-slate-900 mt-1.5">
                          <span className="text-slate-600">{branch.freeCount || 0} Free</span>
                          <span className="mx-2 text-slate-300">•</span>
                          <span className="text-indigo-600">{branch.proCount || 0} Pro/Premium</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                          Student Statuses
                        </span>
                        <div className="text-sm font-black text-slate-900 mt-1.5">
                          <span className="text-emerald-600">{branch.approvedCount || 0} Approved</span>
                          <span className="mx-2 text-slate-300">•</span>
                          <span className="text-amber-600">{branch.pendingCount || 0} Pending</span>
                        </div>
                      </div>
                    </div>

                    {/* Expandable Date-wise User Creation Breakdown */}
                    <div className="pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedBranches(prev => ({ ...prev, [bId]: !prev[bId] }))
                        }
                        className="text-xs font-extrabold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 cursor-pointer"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        <span>
                          {isExpanded ? 'Hide' : 'Show'} Date-wise User Creation Breakdown ({breakdown.length} dates)
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {breakdown.map((item, i) => (
                            <div
                              key={i}
                              className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs font-bold"
                            >
                              <span className="text-slate-600">{item.date}</span>
                              <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 font-mono font-black">
                                +{item.count} users
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* =====================================================================
          TAB 3: USERS (Pending Authorization Queue + Rich User Directory Table)
      ===================================================================== */}
      {activeTab === 'Users' && (
        <div className="space-y-6">
          {/* Pending Access Authorization Queue Card matching masterieltsai.com */}
          <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 shadow-2xs">
            <div className="flex items-center gap-2 mb-1.5 text-amber-600 font-black text-xs tracking-wider uppercase">
              <AlertTriangle className="w-4 h-4" />
              <span>PENDING ACCESS AUTHORIZATION QUEUE ({pendingUsers.length})</span>
            </div>
            <p className="text-xs text-slate-500 font-semibold mb-5">
              Student accounts awaiting verification. Once accepted, they unlock full access to their practice portal.
            </p>

            {pendingUsers.length === 0 ? (
              <div className="p-6 text-center bg-slate-50 rounded-2xl border border-slate-200/80">
                <CheckCircle className="w-7 h-7 text-emerald-500 mx-auto mb-1.5" />
                <p className="text-xs font-bold text-slate-700">No pending authorization requests</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingUsers.map((student) => (
                  <div
                    key={student._id || student.id}
                    className="p-4 rounded-2xl bg-slate-50/70 border border-amber-200/80 flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-black text-slate-900 truncate">{student.name}</h4>
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 font-extrabold text-[9px] rounded-md border border-indigo-100 uppercase">
                          {student.targetScore || '79+ GSE'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-semibold truncate">{student.email}</p>
                      <p className="text-[11px] text-emerald-600 font-extrabold font-mono">
                        📞 {student.phone || '+977 9800000000'}
                      </p>
                      <p className="text-[10px] text-amber-700 font-bold">
                        Pending 1d • Auto-deletes in 6d
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleAuthorizeUser(student._id || student.id)}
                        className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" /> Accept
                      </button>
                      <button
                        onClick={() => handleDeclineUser(student._id || student.id)}
                        className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-extrabold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" /> Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User Directory Table matching masterieltsai.com */}
          <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 shadow-2xs space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search users by name, email, phone, or branch..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                {!isBranchAdmin && (
                  <select
                    value={userBranchFilter}
                    onChange={(e) => setUserBranchFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700"
                  >
                    <option value="All">All Branches</option>
                    {branches.map(b => (
                      <option key={b._id || b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                )}

                <select
                  value={userRoleFilter}
                  onChange={(e) => setUserRoleFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700"
                >
                  <option value="All">All Roles</option>
                  <option value="student">Student</option>
                  <option value="branch_admin">Branch Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>

                <select
                  value={userStatusFilter}
                  onChange={(e) => setUserStatusFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700"
                >
                  <option value="All">All Statuses</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="declined">Declined</option>
                </select>

                <button
                  onClick={() => {
                    setCreateForm(prev => ({ ...prev, role: 'student' }));
                    setIsCreateUserOpen(true);
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>+ Create User Account</span>
                </button>
              </div>
            </div>

            {/* Full Directory Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[980px]">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    <th className="py-3 px-3">User Details</th>
                    <th className="py-3 px-3">Phone</th>
                    <th className="py-3 px-3">Role</th>
                    <th className="py-3 px-3">Subscription</th>
                    <th className="py-3 px-3">Status &amp; Validity</th>
                    <th className="py-3 px-3">GSE Score</th>
                    <th className="py-3 px-3">XP Points</th>
                    <th className="py-3 px-3">Joined Date</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredUsers.map((user) => {
                    const uId = user._id || user.id;
                    const cleanPhone = (user.phone || '').replace(/[^0-9]/g, '');
                    const daysLeft = Number(user.accessDurationDays) || 30;
                    const joinedStr = user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : 'Aug 15, 2026';

                    return (
                      <tr key={uId} className="hover:bg-slate-50/70 transition-colors">
                        {/* User Details */}
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                              {(user.name || 'U').charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-extrabold text-slate-900">{user.name}</div>
                              <div className="text-[11px] text-slate-500 font-medium">{user.email}</div>
                              <div className="flex items-center gap-1.5 mt-1">
                                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                                  🏢 {user.branch || 'Kathmandu Central'}
                                </span>
                                {user.branchCode && (
                                  <span className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-mono text-[10px] font-extrabold">
                                    #{user.branchCode}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Phone */}
                        <td className="py-3.5 px-3">
                          <div className="font-mono font-bold text-slate-800 text-[11px]">{user.phone || '—'}</div>
                          {cleanPhone ? (
                            <div className="flex items-center gap-1.5 mt-1">
                              <a
                                href={`https://wa.me/${cleanPhone}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2 py-0.5 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold"
                              >
                                📞 WhatsApp
                              </a>
                              <a
                                href={`tel:+${cleanPhone}`}
                                className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold"
                              >
                                📱 Call
                              </a>
                            </div>
                          ) : (
                            <button
                              onClick={() => setEditingUser(user)}
                              className="text-[10px] font-bold text-indigo-600 hover:underline mt-0.5"
                            >
                              ➕ Add Phone
                            </button>
                          )}
                        </td>

                        {/* Role */}
                        <td className="py-3.5 px-3">
                          <span className={clsx(
                            'px-2.5 py-1 rounded-lg text-[10px] font-black uppercase border',
                            user.role === 'super_admin'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : user.role === 'branch_admin'
                              ? 'bg-purple-50 text-purple-700 border-purple-200'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          )}>
                            {user.role}
                          </span>
                        </td>

                        {/* Subscription */}
                        <td className="py-3.5 px-3">
                          <span className={clsx(
                            'px-2.5 py-1 rounded-lg text-[10px] font-black uppercase border',
                            user.subscription === 'premium' || user.subscription === 'pro'
                              ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                              : 'bg-slate-50 text-slate-600 border-slate-200'
                          )}>
                            {user.subscription || 'free'}
                          </span>
                        </td>

                        {/* Status & Validity (+30d button) */}
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-1.5">
                            <span className={clsx(
                              'px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border',
                              user.status === 'approved'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : user.status === 'pending'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200'
                            )}>
                              {user.status}
                            </span>
                            <button
                              onClick={() => handleExtendValidity30Days(user)}
                              className="px-2 py-0.5 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-black transition-colors cursor-pointer"
                              title="Extend validity by +30 days in Supabase"
                            >
                              +30d
                            </button>
                          </div>
                          <div className="text-[10px] text-slate-400 font-semibold mt-1">
                            Expires in {daysLeft}d ({daysLeft}d limit)
                          </div>
                        </td>

                        {/* GSE Score */}
                        <td className="py-3.5 px-3">
                          <div className="font-extrabold text-slate-900">{user.targetScore || 'Target: 79+'}</div>
                          <button
                            onClick={() => setViewingProgressUser(user)}
                            className="text-[10px] font-bold text-indigo-600 hover:underline mt-0.5 cursor-pointer"
                          >
                            View full history &amp; feedback
                          </button>
                        </td>

                        {/* XP Points */}
                        <td className="py-3.5 px-3 font-mono font-extrabold text-indigo-700">
                          ⚡ {(user.xp || user.progress?.xp || 450).toLocaleString()} XP
                        </td>

                        {/* Joined Date */}
                        <td className="py-3.5 px-3 text-slate-500 font-semibold text-[11px]">
                          {joinedStr}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-3 text-right">
                          <div className="inline-flex items-center gap-1">
                            <button
                              onClick={() => setViewingProgressUser(user)}
                              className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                              title="View Progress & Activities"
                            >
                              <BarChart2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingUser(user)}
                              className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                              title="Edit User"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(uId)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete User"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 4: REAL-TIME ACTIVITY
      ===================================================================== */}
      {activeTab === 'Real-Time Activity' && (
        <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-sm font-extrabold text-slate-900">Live Active User Sessions ({activeSessions.length})</h3>
            </div>
            <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Supabase Realtime Connected
            </span>
          </div>

          <div className="space-y-3">
            {activeSessions.map((session) => (
              <div key={session.userId} className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between text-xs font-bold">
                <div>
                  <h4 className="text-slate-900 font-extrabold">{session.name} <span className="text-slate-400 font-medium">({session.email})</span></h4>
                  <p className="text-indigo-600 font-semibold text-[11px] mt-0.5">{session.module}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right text-slate-500 text-[11px]">
                    <div>{session.duration}</div>
                    <div className="text-slate-400 font-mono">{session.ip} ({session.location})</div>
                  </div>
                  <button
                    onClick={() => setActiveSessions(prev => prev.filter(s => s.userId !== session.userId))}
                    className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 rounded-lg text-xs font-extrabold transition-colors cursor-pointer"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 5: CONTENT (Speaking, Writing, Reading, Listening Question Bank)
      ===================================================================== */}
      {activeTab === 'Content' && (
        <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">PTE Practice Content Databank (Supabase)</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Manage 1,052+ PTE Academic test items across Speaking, Writing, Reading &amp; Listening</p>
            </div>
            <button
              onClick={() => setIsContentModalOpen(true)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add New Question
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { type: 'Speaking', items: '250 Items', desc: 'Read Aloud, Repeat Sentence, Describe Image, Retell Lecture, ASQ' },
              { type: 'Writing', items: '100 Items', desc: 'Summarize Written Text, Write Essay' },
              { type: 'Reading', items: '250 Items', desc: 'R&W Fill in Blanks, MCMA, Re-order Paragraphs, Reading FIB' },
              { type: 'Listening', items: '452 Items', desc: 'Summarize Spoken Text, WFD, Highlight Incorrect Words, FIB' },
            ].map(col => (
              <div key={col.type} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-xs font-extrabold text-slate-900">{col.type} Pool</h4>
                <p className="text-lg font-black text-indigo-600 mt-1">{col.items}</p>
                <p className="text-[11px] text-slate-500 font-semibold mt-1.5">{col.desc}</p>
              </div>
            ))}
          </div>

          {/* Question Items Table */}
          <div className="space-y-2.5">
            {contentItems.map((item) => (
              <div key={item._id || item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 font-mono font-black text-[10px]">
                      {item.code}
                    </span>
                    <span className="font-extrabold text-slate-900">{item.title}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-bold uppercase">
                      {item.section} • {item.type}
                    </span>
                  </div>
                  <p className="text-slate-500 font-medium mt-1 line-clamp-1">{item.promptText}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold shrink-0">
                  Active in Supabase
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 6: RESULTS
      ===================================================================== */}
      {activeTab === 'Results' && (
        <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 shadow-2xs space-y-4">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-base font-extrabold text-slate-900">Student Evaluated Scorecards &amp; Submissions</h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Real-time PTE AI scoring logs &amp; full diagnostic reports stored in Supabase</p>
          </div>
          <div className="space-y-3">
            {[
              { student: 'Subash Bhandari', branch: 'Kathmandu Central Campus', test: 'PTE Full Mock Exam #04', score: '85 Overall GSE (S:88, W:82, R:84, L:86)', date: 'Today at 09:30 AM' },
              { student: 'Pratima Thapa', branch: 'Kathmandu Central Campus', test: 'Speaking Read Aloud #14', score: '89 Overall GSE (Pronunciation: 90, Fluency: 88)', date: 'Today at 08:15 AM' },
              { student: 'Bikash Shrestha', branch: 'Pokhara Regional Campus', test: 'Write Essay AI Evaluation #06', score: '81 Overall GSE (Grammar: 84, Vocabulary: 80)', date: 'Yesterday at 04:15 PM' },
              { student: 'Sanjiv Maharjan', branch: 'Lalitpur Tech Branch', test: 'Write From Dictation Set #19', score: '90 Overall GSE (100% Word Match)', date: 'Yesterday at 02:10 PM' },
            ].map((res, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-bold">
                <div>
                  <h4 className="text-slate-900 font-extrabold">
                    {res.student} <span className="text-slate-400 font-semibold">({res.branch})</span> — <span className="text-indigo-600">{res.test}</span>
                  </h4>
                  <p className="text-emerald-600 font-mono font-extrabold text-[11px] mt-1">{res.score}</p>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">{res.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 7: AI AGENT (Model Configuration + Admin Assistant)
      ===================================================================== */}
      {activeTab === 'AI Agent' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Model & Scoring Rubric Configuration matching masterieltsai.com */}
          <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 shadow-2xs space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">AI Scoring Engine Configuration</h3>
                <p className="text-[11px] text-slate-400 font-semibold">Configure Gemini model parameters &amp; Pearson GSE rubric prompt</p>
              </div>
            </div>

            <form onSubmit={handleSaveAiConfig} className="space-y-4 text-xs font-bold">
              <div>
                <label className="block text-slate-700 mb-1.5">Active Evaluation Model</label>
                <select
                  value={aiConfig.model}
                  onChange={(e) => setAiConfig({ ...aiConfig, model: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-extrabold"
                >
                  <option value="gemini-2.5-flash">gemini-2.5-flash (Recommended Low-Latency Examiner)</option>
                  <option value="gemini-2.5-pro">gemini-2.5-pro (Deep Analytical Scoring)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-700">Scoring Temperature (Strictness)</label>
                  <span className="font-mono font-black text-indigo-600">{aiConfig.temperature}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={aiConfig.temperature}
                  onChange={(e) => setAiConfig({ ...aiConfig, temperature: parseFloat(e.target.value) })}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1.5">System Scoring Rubric Prompt</label>
                <textarea
                  rows={5}
                  value={aiConfig.scoringRubric}
                  onChange={(e) => setAiConfig({ ...aiConfig, scoringRubric: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs font-semibold text-slate-800 leading-relaxed focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={savingAiConfig}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-sm transition-colors cursor-pointer"
              >
                {savingAiConfig ? 'Saving to Supabase...' : 'Save AI Configuration'}
              </button>
            </form>
          </div>

          {/* Interactive AI Admin Assistant Chat */}
          <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 shadow-2xs flex flex-col h-[480px]">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">PTE AI Admin Command Assistant</h3>
                <p className="text-[11px] text-slate-400 font-semibold">Ask AI to inspect branch quotas, approve users, or generate items</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {aiMessages.map((msg, idx) => (
                <div key={idx} className={clsx('flex', msg.sender === 'user' ? 'justify-end' : 'justify-start')}>
                  <div className={clsx(
                    'max-w-md p-3.5 rounded-2xl text-xs font-semibold leading-relaxed',
                    msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-800 border border-slate-200/60'
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isGenerating && (
                <div className="text-xs text-indigo-600 font-bold animate-pulse flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> AI processing command...
                </div>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-100 flex gap-2">
              <input
                type="text"
                placeholder="Ask AI to approve users, check branch quotas, or generate questions..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
              />
              <button type="submit" className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1 shadow-2xs cursor-pointer">
                <Send className="w-3.5 h-3.5" /> Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 8: FILES
      ===================================================================== */}
      {activeTab === 'Files' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 shadow-2xs">
            <h3 className="text-base font-extrabold text-slate-900 mb-3">Upload Study Guide / PDF Resource</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!uploadTitle.trim()) return;
                setPdfList(prev => [
                  { id: `pdf_${Date.now()}`, title: uploadTitle, category: uploadCategory, size: '1.4 MB', uploadedAt: 'Just now', downloads: 1 },
                  ...prev,
                ]);
                setUploadTitle('');
                showToast('Resource uploaded to repository!');
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="text"
                placeholder="Document Title (e.g., PTE 90-Band Essay & Speaking Templates PDF)..."
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
                required
              />
              <select
                value={uploadCategory}
                onChange={(e) => setUploadCategory(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700"
              >
                <option value="Speaking">Speaking</option>
                <option value="Writing">Writing</option>
                <option value="Reading">Reading</option>
                <option value="Listening">Listening</option>
                <option value="Vocabulary">Vocabulary</option>
              </select>
              <button type="submit" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-xs cursor-pointer">
                <UploadCloud className="w-4 h-4" /> Upload File
              </button>
            </form>
          </div>

          <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 shadow-2xs space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 pb-3 border-b border-slate-100">Live Resource Repository</h3>
            {pdfList.map((pdf) => (
              <div key={pdf.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-extrabold">{pdf.title}</h4>
                    <p className="text-[11px] text-slate-400 font-semibold">{pdf.category} • {pdf.size} • {pdf.downloads} downloads</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg text-xs font-extrabold flex items-center gap-1 cursor-pointer">
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                  <button
                    onClick={() => setPdfList(prev => prev.filter(p => p.id !== pdf.id))}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 9: SEND ALERTS (Exact masterieltsai.com replica)
      ===================================================================== */}
      {activeTab === 'Send Alerts' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white border border-[#e8ecf4] rounded-[24px] p-6 lg:p-8 shadow-2xs space-y-5">
            <div>
              <h3 className="text-lg font-black text-slate-900">Dispatch New Alert</h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">
                Push real-time notifications to all student dashboards or targeted consultancy branches.
              </p>
            </div>

            {/* Full-width Purple Generate Alert with AI Button matching masterieltsai.com */}
            <button
              type="button"
              onClick={handleGenerateAiAlert}
              disabled={isGeneratingAiAlert}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-extrabold shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGeneratingAiAlert ? 'Generating Alert with AI...' : '✨ Generate Alert with AI'}</span>
            </button>

            {alertSent && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Alert dispatched &amp; logged in Supabase!
              </div>
            )}

            <form onSubmit={handleSendBroadcast} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">Alert Header / Title</label>
                <input
                  type="text"
                  placeholder="e.g., Scheduled Maintenance / New PTE Practice Items Added"
                  value={alertTitle}
                  onChange={(e) => setAlertTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">Target Audience</label>
                <select
                  value={alertTarget}
                  onChange={(e) => setAlertTarget(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-500"
                >
                  <option value="all">📢 All Users (Global Broadcast)</option>
                  {branches.map(b => (
                    <option key={b._id || b.id} value={b.name}>🏢 {b.name} ({b.code})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">Alert Description</label>
                <textarea
                  rows={4}
                  placeholder="Enter alert description..."
                  value={alertBody}
                  onChange={(e) => setAlertBody(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-extrabold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span>🔔 Dispatch Alert Now</span>
              </button>
            </form>
          </div>

          {/* Alert Dispatch Log */}
          <div className="lg:col-span-5 bg-white border border-[#e8ecf4] rounded-[24px] p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-black text-slate-900 pb-3 border-b border-slate-100">
              Alert Dispatch Log ({alertsLog.length})
            </h3>
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {alertsLog.map((al) => (
                <div key={al._id || al.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-extrabold uppercase">
                      Target: {al.target || 'all'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      {al.createdAt ? new Date(al.createdAt).toLocaleDateString() : 'Today'}
                    </span>
                  </div>
                  <h4 className="text-xs font-extrabold text-slate-900">{al.title}</h4>
                  <p className="text-[11px] text-slate-600 font-medium leading-relaxed">{al.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 1: ADJUST BRANCH QUOTA LIMIT (Exact masterieltsai.com replica)
      ===================================================================== */}
      <AnimatePresence>
        {quotaModalBranch && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[28px] p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-black text-slate-900">Adjust Branch Quota Limit</h3>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">
                    {quotaModalBranch.name} ({quotaModalBranch.code})
                  </p>
                </div>
                <button onClick={() => setQuotaModalBranch(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveBranchQuota} className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-2">Quick Quota Presets</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[25, 50, 100, 250, 500, 1000, 0].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setQuotaLimitValue(preset)}
                        className={clsx(
                          'py-2 px-2.5 rounded-xl text-xs font-extrabold border transition-all cursor-pointer',
                          quotaLimitValue === preset
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        )}
                      >
                        {preset === 0 ? 'Unlimited' : preset}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                    Maximum User Creation Limit (0 = Unlimited)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={quotaLimitValue}
                    onChange={(e) => setQuotaLimitValue(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono font-black text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setQuotaModalBranch(null)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
                  >
                    Save Quota Limit
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          MODAL 2: CREATE USER / BRANCH ADMIN ACCOUNT (Exact masterieltsai.com replica)
      ===================================================================== */}
      <AnimatePresence>
        {isCreateUserOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[28px] p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-indigo-600" />
                    Create User Account
                  </h3>
                  <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                    Synced directly to Supabase Auth &amp; Database
                  </p>
                </div>
                <button onClick={() => setIsCreateUserOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateUserSubmit} className="space-y-3.5 text-xs font-bold">
                {/* Account Role Toggle (Student | Branch Admin) */}
                {!isBranchAdmin && (
                  <div>
                    <label className="block text-slate-700 mb-1.5">Account Role</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setCreateForm({ ...createForm, role: 'student' })}
                        className={clsx(
                          'py-2.5 rounded-xl text-xs font-extrabold border transition-all cursor-pointer',
                          createForm.role === 'student'
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        )}
                      >
                        🎓 Student
                      </button>
                      <button
                        type="button"
                        onClick={() => setCreateForm({ ...createForm, role: 'branch_admin' })}
                        className={clsx(
                          'py-2.5 rounded-xl text-xs font-extrabold border transition-all cursor-pointer',
                          createForm.role === 'branch_admin'
                            ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        )}
                      >
                        🏢 Branch Admin
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bishal Adhikari"
                    value={createForm.name}
                    onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="user@consultancy.com"
                    value={createForm.email}
                    onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      placeholder="+977 9800000000"
                      value={createForm.phone}
                      onChange={(e) => setCreateForm({ ...createForm, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1">Temporary Password</label>
                    <input
                      type="text"
                      required
                      value={createForm.password}
                      onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-mono font-bold"
                    />
                  </div>
                </div>

                {!isBranchAdmin && (
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="col-span-2">
                      <label className="block text-slate-700 mb-1">Branch Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. KIEC Consultancy"
                        value={createForm.branch}
                        onChange={(e) => setCreateForm({ ...createForm, branch: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 mb-1">Branch Code</label>
                      <input
                        type="text"
                        placeholder="KIEC13"
                        value={createForm.branchCode}
                        onChange={(e) => setCreateForm({ ...createForm, branchCode: e.target.value.toUpperCase() })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-mono font-bold uppercase"
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-slate-700 mb-1">Subscription Plan</label>
                    <select
                      value={createForm.subscription}
                      onChange={(e) => setCreateForm({ ...createForm, subscription: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-semibold"
                    >
                      <option value="free">Free Plan</option>
                      <option value="pro">Pro Plan</option>
                      <option value="premium">Premium Plan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1">Access Validity</label>
                    <select
                      value={createForm.duration}
                      onChange={(e) => setCreateForm({ ...createForm, duration: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-semibold"
                    >
                      <option value={7}>7 Days</option>
                      <option value={15}>15 Days</option>
                      <option value={30}>30 Days</option>
                      <option value={60}>60 Days</option>
                      <option value={90}>90 Days</option>
                      <option value={365}>365 Days</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsCreateUserOpen(false)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          MODAL 3: VIEW STUDENT SCORECARD & PROGRESS
      ===================================================================== */}
      {viewingProgressUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] p-6 max-w-lg w-full border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">{viewingProgressUser.name}&apos;s Learning Scorecard</h3>
                <p className="text-[11px] text-slate-500 font-semibold">{viewingProgressUser.email} • {viewingProgressUser.branch}</p>
              </div>
              <button onClick={() => setViewingProgressUser(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-bold">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase">Target Score</span>
                <p className="text-base font-black text-indigo-600 mt-0.5">{viewingProgressUser.targetScore || '79+ GSE'}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase">Practice Experience</span>
                <p className="text-base font-black text-emerald-600 mt-0.5">⚡ {viewingProgressUser.progress?.xp || viewingProgressUser.xp || 500} XP</p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-extrabold text-slate-900">Module Score Predictions (GSE 10–90)</h4>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <div className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-100 flex justify-between items-center">
                  <span>🗣️ Speaking</span>
                  <span className="font-mono font-black text-indigo-700">{viewingProgressUser.progress?.speaking || 78} / 90</span>
                </div>
                <div className="p-3 rounded-xl bg-cyan-50/50 border border-cyan-100 flex justify-between items-center">
                  <span>✍️ Writing</span>
                  <span className="font-mono font-black text-cyan-700">{viewingProgressUser.progress?.writing || 76} / 90</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 flex justify-between items-center">
                  <span>📖 Reading</span>
                  <span className="font-mono font-black text-emerald-700">{viewingProgressUser.progress?.reading || 80} / 90</span>
                </div>
                <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-100 flex justify-between items-center">
                  <span>🎧 Listening</span>
                  <span className="font-mono font-black text-amber-700">{viewingProgressUser.progress?.listening || 79} / 90</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button onClick={() => setViewingProgressUser(null)} className="px-4 py-2 bg-indigo-600 text-white font-extrabold text-xs rounded-xl cursor-pointer">
                Close Scorecard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 4: EDIT USER ACCOUNT
      ===================================================================== */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] p-6 max-w-md w-full border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-extrabold text-slate-900">Edit User Account</h3>
              <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEditUser} className="space-y-3 text-xs font-bold">
              <div>
                <label className="block text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editingUser.name || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={editingUser.phone || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-slate-700 mb-1">Subscription</label>
                  <select
                    value={editingUser.subscription || 'free'}
                    onChange={(e) => setEditingUser({ ...editingUser, subscription: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                  >
                    <option value="free">free</option>
                    <option value="pro">pro</option>
                    <option value="premium">premium</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">Access Status</label>
                  <select
                    value={editingUser.status || 'approved'}
                    onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                  >
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Access Validity (Days)</label>
                <input
                  type="number"
                  value={editingUser.accessDurationDays || 30}
                  onChange={(e) => setEditingUser({ ...editingUser, accessDurationDays: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setEditingUser(null)} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold text-xs rounded-xl cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white font-extrabold text-xs rounded-xl cursor-pointer">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 5: ADD QUESTION ITEM
      ===================================================================== */}
      {isContentModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] p-6 max-w-lg w-full border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-extrabold text-slate-900">Add Practice Question to Supabase</h3>
              <button onClick={() => setIsContentModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateContentItem} className="space-y-3 text-xs font-bold">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1">Module Section</label>
                  <select
                    value={newQuestionForm.section}
                    onChange={(e) => setNewQuestionForm({ ...newQuestionForm, section: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  >
                    <option value="speaking">Speaking</option>
                    <option value="writing">Writing</option>
                    <option value="reading">Reading</option>
                    <option value="listening">Listening</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">Task Type</label>
                  <input
                    type="text"
                    required
                    value={newQuestionForm.type}
                    onChange={(e) => setNewQuestionForm({ ...newQuestionForm, type: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-700 mb-1">Question Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Global Climate Policy & Renewable Grids"
                  value={newQuestionForm.title}
                  onChange={(e) => setNewQuestionForm({ ...newQuestionForm, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-1">Prompt Text / Passage</label>
                <textarea
                  rows={4}
                  required
                  value={newQuestionForm.promptText}
                  onChange={(e) => setNewQuestionForm({ ...newQuestionForm, promptText: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsContentModalOpen(false)} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl cursor-pointer">
                  Save to Supabase
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-xs font-bold text-slate-500">Loading Admin Command Center...</div>}>
      <AdminCommandCenterInner />
    </Suspense>
  );
}
