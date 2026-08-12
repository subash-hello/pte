'use client';

import { useState, useEffect } from 'react';
import { 
  Users, Activity, Database, DollarSign, CheckCircle, XCircle, Search, 
  Send, Bot, FileText, Folder, Shield, Filter, Edit3, Plus, RefreshCw, 
  Sparkles, Check, X, Phone, Mail, Award, Clock, ArrowRight, UserCheck, AlertTriangle, 
  FileCheck, Trash2, UploadCloud, Download, Lock, UserPlus, Zap, BarChart2, TrendingUp, Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, 
  PieChart, Pie, Cell 
} from 'recharts';
import clsx from 'clsx';
import { authFetch, getUser } from '@/lib/session';

// Users loaded from MongoDB API
const initialUserList: any[] = [
];

// Live Active Sessions
const initialActiveSessions = [
  { userId: 's_1', name: 'Subash Bhandari', email: 'subash@pteai.com', module: 'Speaking — Read Aloud #14', duration: '12m online', ip: '103.1.200.4', location: 'Kathmandu' },
  { userId: 's_2', name: 'Rohan Sharma', email: 'rohan@pteai.com', module: 'Writing — Write Essay #08', duration: '24m online', ip: '202.166.204.1', location: 'Pokhara' },
  { userId: 's_3', name: 'Anuraj Phuyal', email: 'anuraj.phuyal@gmail.com', module: 'Reading — Fill in Blanks #02', duration: '5m online', ip: '27.34.20.11', location: 'Chitwan' },
];

// PDFs Resource Pool
const initialPdfList = [
  { id: 'pdf_1', title: 'PTE Academic 90-Band Master Essay Templates', category: 'Writing', size: '1.2 MB', uploadedAt: 'Yesterday', downloads: 142 },
  { id: 'pdf_2', title: 'Describe Image & Retell Lecture Speed Cheatsheet', category: 'Speaking', size: '850 KB', uploadedAt: '3 days ago', downloads: 210 },
  { id: 'pdf_3', title: 'Top 500 High-Frequency Academic Collocations', category: 'Vocabulary', size: '2.1 MB', uploadedAt: '1 week ago', downloads: 380 },
];

const growthData = [
  { name: 'Thu', users: 0, sessions: 24 },
  { name: 'Fri', users: 6, sessions: 16 },
  { name: 'Sat', users: 9, sessions: 19 },
  { name: 'Sun', users: 10, sessions: 20 },
  { name: 'Mon', users: 11, sessions: 27 },
  { name: 'Tue', users: 1, sessions: 25 },
  { name: 'Wed', users: 0, sessions: 2 },
];

const practiceShareData = [
  { name: 'Speaking', value: 12, color: '#818cf8' },
  { name: 'Writing', value: 19, color: '#6366f1' },
  { name: 'Reading', value: 44, color: '#06b6d4' },
  { name: 'Listening', value: 25, color: '#10b981' },
];

export default function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('Dashboard');
  const [users, setUsers] = useState<any[]>(initialUserList);
  const [activeSessions, setActiveSessions] = useState(initialActiveSessions);
  const [pdfList, setPdfList] = useState(initialPdfList);
  const [currentUserSession, setCurrentUserSession] = useState<any>(null);
  
  const [stats, setStats] = useState<any>({ growthData, practiceShareData, totalUsers: 0, activeSessions: 0, premiumUsers: 0 });

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('All');
  const [userStatusFilter, setUserStatusFilter] = useState('All');
  
  // Modals & Forms
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [viewingProgressUser, setViewingProgressUser] = useState<any | null>(null);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [createForm, setCreateForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    password: 'student123',
    role: 'student', 
    branch: 'Kathmandu Main Campus', 
    targetScore: '79+ (GSE 79)', 
    duration: 30 
  });

  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [contentJSON, setContentJSON] = useState('{\n  "title": "Read Aloud Practice #15",\n  "section": "speaking",\n  "text": "Artificial intelligence is rapidly transforming global educational systems..."\n}');
  
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

  // AI Agent Chat
  const [aiMessages, setAiMessages] = useState([
    { sender: 'bot', text: 'Hello Admin! I am your PTE AI System Assistant. You can ask me to generate practice questions, approve pending users, or inspect branch analytics.' }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await authFetch('/api/admin/users');
      if (res.ok) {
        const data = await res.json();
        if (data.users) {
          setUsers(data.users);
        }
      }
    } catch (e) {
      console.error('Failed to fetch users', e);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await authFetch('/api/admin/stats');
      if (res.ok) {
        const data = await res.json();
        if (data.stats) {
          setStats((prev: any) => ({ ...prev, ...data.stats }));
        }
      }
    } catch (e) {
      console.error('Failed to fetch stats', e);
    }
  };

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      try {
        const session = getUser();
        if (session) {
          setCurrentUserSession(session);
          if (session.role === 'branch_admin' && ((session as any).branch || (session as any).branchName)) {
            setCreateForm(prev => ({ ...prev, branch: (session as any).branch || (session as any).branchName }));
          }
        }
        
        fetchUsers();
        fetchStats();
      } catch (e) {}
    }
  }, []);

  const isBranchAdmin = currentUserSession?.role === 'branch_admin';
  const branchName = currentUserSession?.branch || currentUserSession?.branchName || 'Kathmandu Main Campus';

  // User Directory Actions
  const handleAuthorizeUser = async (id: string) => {
    try {
      const res = await authFetch('/api/admin/approve', {
        method: 'POST',
        body: JSON.stringify({ userId: id, action: 'approve' })
      });
      if (res.ok) {
        setUsers(prev => prev.map(u => u._id === id ? { ...u, status: 'approved' } : u));
        fetchUsers();
      }
    } catch (e) {
      console.error('Error approving user', e);
    }
  };

  const handleDeclineUser = async (id: string) => {
    try {
      const res = await authFetch('/api/admin/approve', {
        method: 'POST',
        body: JSON.stringify({ userId: id, action: 'decline' })
      });
      if (res.ok) {
        setUsers(prev => prev.map(u => u._id === id ? { ...u, status: 'declined' } : u));
        fetchUsers();
      }
    } catch (e) {
      console.error('Error declining user', e);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (confirm('Are you sure you want to delete this user account?')) {
      try {
        const res = await authFetch(`/api/admin/users/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setUsers(prev => prev.filter(u => u._id !== id));
          fetchUsers();
        }
      } catch (e) {
        console.error('Error deleting user', e);
      }
    }
  };

  const handleSaveEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    try {
      const res = await authFetch(`/api/admin/users/${editingUser._id}`, {
        method: 'PUT',
        body: JSON.stringify(editingUser)
      });
      if (res.ok) {
        setUsers(prev => prev.map(u => u._id === editingUser._id ? editingUser : u));
        fetchUsers();
        setEditingUser(null);
      }
    } catch (e) {
      console.error('Error updating user', e);
    }
  };

  const handleCreateUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = {
      name: createForm.name,
      email: createForm.email,
      phone: createForm.phone || '+977 9800000000',
      password: createForm.password || 'student123',
      role: createForm.role,
      status: 'approved',
      targetScore: createForm.targetScore,
      branch: isBranchAdmin ? branchName : createForm.branch,
      accessDurationDays: Number(createForm.duration)
    };
    
    try {
      const res = await authFetch('/api/admin/users', {
        method: 'POST',
        body: JSON.stringify(newUser)
      });
      if (res.ok) {
        setIsCreateUserOpen(false);
        setCreateForm({ name: '', email: '', phone: '', password: 'student123', role: 'student', branch: isBranchAdmin ? branchName : 'Kathmandu Main Campus', targetScore: '79+ (GSE 79)', duration: 30 });
        fetchUsers();
      }
    } catch (e) {
      console.error('Error creating user', e);
    }
  };

  // Kick Session Action
  const handleKickSession = (userId: string, name: string) => {
    if (confirm(`Disconnect active session for ${name}?`)) {
      setActiveSessions(prev => prev.filter(s => s.userId !== userId));
    }
  };

  // Upload PDF Action
  const handleUploadPdfSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;
    const newPdf = {
      id: `pdf_${Date.now()}`,
      title: uploadTitle,
      category: uploadCategory,
      size: '1.5 MB',
      uploadedAt: 'Just now',
      downloads: 0
    };
    setPdfList(prev => [newPdf, ...prev]);
    setUploadTitle('');
  };

  const handleDeletePdf = (id: string) => {
    if (confirm('Delete this resource document?')) {
      setPdfList(prev => prev.filter(p => p.id !== id));
    }
  };

  // Terms Reset Action
  const handleForceResetTerms = () => {
    setTermsResetSuccess(true);
    setTimeout(() => setTermsResetSuccess(false), 4000);
  };

  // AI Alert Generator
  const handleGenerateAiAlert = () => {
    setIsGeneratingAiAlert(true);
    setTimeout(() => {
      setAlertTitle('⚡ New PTE Practice Questions Added!');
      setAlertBody('50+ new Speaking Read Aloud and Writing Write Essay practice items are now live. Practice today and boost your GSE score!');
      setIsGeneratingAiAlert(false);
    }, 800);
  };

  // Send Broadcast Action
  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertTitle || !alertBody) return;
    setAlertSent(true);
    setTimeout(() => {
      setAlertSent(false);
      setAlertTitle('');
      setAlertBody('');
    }, 3000);
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
      let botResponse = 'Action processed successfully.';
      if (userText.toLowerCase().includes('approve') || userText.toLowerCase().includes('accept')) {
        botResponse = 'Approved pending student accounts and updated subscription durations.';
      } else if (userText.toLowerCase().includes('question') || userText.toLowerCase().includes('generate')) {
        botResponse = 'Generated 3 new Read Aloud & Write Essay questions and added them to the Content Pool.';
      } else if (userText.toLowerCase().includes('stat') || userText.toLowerCase().includes('user')) {
        botResponse = `Platform currently has ${users.filter(u => u.status === 'approved').length} active students and ${users.filter(u => u.status === 'pending').length} pending requests.`;
      } else {
        botResponse = `AI Agent executed command: "${userText}". Updated system configurations.`;
      }
      setAiMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
      setIsGenerating(false);
    }, 1000);
  };

  // Filtered Users (Filtered by Branch if Branch Admin)
  const scopedUsers = isBranchAdmin 
    ? users.filter(u => (u.branch || '').toLowerCase().includes(branchName.toLowerCase()))
    : users;

  const filteredUsers = scopedUsers.filter(user => {
    const matchesSearch = (user.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (user.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (user.phone || '').includes(searchQuery);
    const matchesRole = userRoleFilter === 'All' || user.role === userRoleFilter;
    const matchesStatus = userStatusFilter === 'All' || user.status === userStatusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const pendingUsers = scopedUsers.filter(u => u.status === 'pending');

  const allTabs = [
    'Dashboard', 
    'Users', 
    'Student Progress',
    'Real-Time Activity', 
    'Content', 
    'Results', 
    'AI Agent', 
    'Files', 
    'Send Alerts'
  ];
  const tabs = isBranchAdmin ? allTabs.filter(t => !['Content', 'AI Agent', 'Files', 'Results'].includes(t)) : allTabs;

  if (!mounted) return null;

  return (
    <div className="space-y-6 pb-20 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Header & Tabs Container */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/60 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-satoshi flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                <Shield className="w-5 h-5" />
              </div>
              {isBranchAdmin ? 'Branch Admin Command Portal' : 'Admin Command Center'}
            </h1>
            {isBranchAdmin && (
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 font-extrabold text-xs rounded-full border border-indigo-100 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" /> {branchName}
              </span>
            )}
          </div>
          <p className="text-slate-500 text-xs font-semibold">
            {isBranchAdmin 
              ? `Manage student registrations, monitor learning progress scorecards, and authorize access for ${branchName}.`
              : 'Monitor users, track database statuses, view financial analytics, and manage AI content.'}
          </p>
        </div>

        {/* Dynamic Top Tabs Pill Container */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar bg-white p-1.5 rounded-2xl border border-[#e8ecf4] shadow-2xs">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5",
                activeTab === tab 
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              {tab === 'Student Progress' && <BarChart2 className="w-3.5 h-3.5" />}
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: DASHBOARD */}
      {activeTab === 'Dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-[24px] p-6 border border-[#e8ecf4] shadow-2xs flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-slate-500">Total Registered Users</span>
                <div className="w-9 h-9 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-600 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-black text-slate-900 font-satoshi tracking-tight">{stats?.totalUsers ?? scopedUsers.length}</h3>
                <p className="text-[11px] font-bold text-emerald-600 mt-2 flex items-center gap-1">
                  <span>↗</span> +{stats?.recentRegistrations ?? 0} this week
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-6 border border-[#e8ecf4] shadow-2xs flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-slate-500">Daily Active Sessions</span>
                <div className="w-9 h-9 rounded-full bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-black text-slate-900 font-satoshi tracking-tight">{activeSessions.length * 7 + 1}</h3>
                <p className="text-[11px] font-bold text-emerald-600 mt-2 flex items-center gap-1">
                  <span>↗</span> +8.2% this week
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-6 border border-[#e8ecf4] shadow-2xs flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-slate-500">Database Server</span>
                <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Database className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-black text-slate-900 font-satoshi tracking-tight flex items-center gap-2">
                  Atlas <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                </h3>
                <p className="text-[11px] font-bold text-slate-400 mt-2">
                  Live cluster connected
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
                <h3 className="text-3xl font-black text-slate-900 font-satoshi tracking-tight">{stats?.approvedUsers ?? scopedUsers.filter((u: any) => u.status === 'approved').length}</h3>
                <p className="text-[11px] font-bold text-emerald-600 mt-2 flex items-center gap-1">
                  <span>↗</span> +18.5% this week
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-[24px] p-6 border border-[#e8ecf4] shadow-2xs">
              <div className="mb-6">
                <h3 className="text-base font-extrabold text-slate-900">Platform Growth & Signups</h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Weekly active sessions & user registration trends</p>
              </div>
              <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats?.growthData || growthData}>
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" name="New Registered Users" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4, fill: "#06b6d4" }} />
                    <Line type="monotone" dataKey="sessions" name="Daily Active Sessions" stroke="#818cf8" strokeWidth={3} dot={{ r: 4, fill: "#818cf8" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-6 mt-4 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#06b6d4]" />
                  <span>New Registered Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#818cf8]" />
                  <span>Daily Active Sessions</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-6 border border-[#e8ecf4] shadow-2xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-0.5">Practice Share</h3>
                <p className="text-xs text-slate-400 font-medium mb-4">Module-wise student activity shares</p>
              </div>
              <div className="h-[190px] w-full relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={stats?.practiceShareData || practiceShareData} innerRadius={55} outerRadius={75} paddingAngle={4} dataKey="value">
                      {(stats?.practiceShareData || practiceShareData).map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-4 pt-4 border-t border-slate-100 text-xs font-bold">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#818cf8]" />
                    <span className="text-slate-700">Speaking</span>
                  </div>
                  <span className="text-slate-900 font-mono font-extrabold">12%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#6366f1]" />
                    <span className="text-slate-700">Writing</span>
                  </div>
                  <span className="text-slate-900 font-mono font-extrabold">19%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4]" />
                    <span className="text-slate-700">Reading</span>
                  </div>
                  <span className="text-slate-900 font-mono font-extrabold">44%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                    <span className="text-slate-700">Listening</span>
                  </div>
                  <span className="text-slate-900 font-mono font-extrabold">25%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-md border border-slate-300 flex items-center justify-center text-slate-400 shrink-0 mt-0.5">
                <FileCheck className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-slate-900">Terms of Service Update Control</h4>
                <p className="text-xs text-slate-500 font-semibold mt-0.5 leading-relaxed">
                  Force all existing user accounts (students, teachers, and admins) to re-accept the platform terms and conditions upon their next dashboard load.
                </p>
                {termsResetSuccess && (
                  <p className="text-xs font-bold text-emerald-600 mt-2 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" /> Terms acceptance flag reset successfully for all active accounts!
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={handleForceResetTerms}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold shadow-xs transition-colors shrink-0 flex items-center gap-2"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
              <span>Force-Reset Terms Acceptance</span>
            </button>
          </div>

          <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 lg:p-8 shadow-2xs">
            <div className="flex items-center gap-2 mb-2 text-amber-600 font-extrabold text-sm tracking-wide uppercase">
              <AlertTriangle className="w-4 h-4" />
              <span>PENDING ACCESS AUTHORIZATION QUEUE ({pendingUsers.length})</span>
            </div>
            <p className="text-xs text-slate-500 font-semibold mb-6">
              The following student accounts are awaiting authorization. Once accepted, they can access their practice dashboard.
            </p>

            {pendingUsers.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200/80">
                <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-700">No pending authorization requests</p>
                <p className="text-[11px] text-slate-400 font-medium">All student registration requests have been authorized.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingUsers.map((student) => (
                  <div 
                    key={student._id} 
                    className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-200 transition-all shadow-2xs flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-extrabold text-slate-900 truncate">{student.name}</h4>
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 font-extrabold text-[9px] rounded-md border border-indigo-100 uppercase">
                          {student.targetScore}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-semibold flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-slate-400" /> {student.email}
                      </p>
                      <p className="text-[11px] text-emerald-600 font-extrabold flex items-center gap-1.5 font-mono">
                        <Phone className="w-3 h-3 text-emerald-500" /> {student.phone}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleAuthorizeUser(student._id)}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-2xs transition-colors flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Accept
                      </button>
                      <button
                        onClick={() => handleDeclineUser(student._id)}
                        className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-extrabold text-xs transition-colors flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" /> Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: USERS DIRECTORY (With Create Student Modal for Branch Admin) */}
      {activeTab === 'Users' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search students by name, email, phone or target score..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                <select
                  value={userRoleFilter}
                  onChange={(e) => setUserRoleFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none"
                >
                  <option value="All">All Roles</option>
                  <option value="student">Student</option>
                  <option value="branch_admin">Branch Admin</option>
                </select>

                <select
                  value={userStatusFilter}
                  onChange={(e) => setUserStatusFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="declined">Declined</option>
                </select>

                <button
                  onClick={() => setIsCreateUserOpen(true)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <UserPlus className="w-4 h-4" /> {isBranchAdmin ? 'Add Branch Student' : 'Add New User'}
                </button>
              </div>
            </div>

            <div className="divide-y divide-slate-100 overflow-x-auto">
              {filteredUsers.map((user) => (
                <div key={user._id} className="py-4 flex items-center justify-between gap-4 min-w-[700px]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center">
                      {(user.name || '').split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-extrabold text-slate-900">{user.name}</h4>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-extrabold rounded uppercase">
                          {user.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-semibold mt-0.5">{user.email} • {user.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-bold">
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-100 text-[10px]">
                      {user.targetScore}
                    </span>

                    <span className={clsx(
                      "px-2.5 py-1 rounded-md text-[10px] font-extrabold border uppercase",
                      user.status === 'approved' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                      user.status === 'pending' ? "bg-amber-50 text-amber-700 border-amber-100" :
                      "bg-rose-50 text-rose-700 border-rose-100"
                    )}>
                      {user.status}
                    </span>

                    <span className="text-[11px] text-slate-400 font-mono">
                      ⏱ {user.accessDurationDays} Days
                    </span>

                    <div className="flex items-center gap-1.5 ml-2">
                      {user.status === 'pending' && (
                        <button 
                          onClick={() => handleAuthorizeUser(user._id)}
                          className="px-3 py-1 bg-emerald-500 text-white rounded-lg text-xs font-extrabold hover:bg-emerald-600"
                        >
                          Accept
                        </button>
                      )}

                      <button
                        onClick={() => setViewingProgressUser(user)}
                        className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="View Student Progress"
                      >
                        <BarChart2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setEditingUser(user)}
                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit User"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: STUDENT PROGRESS TRACKER (Special Branch Admin Feature matching IELTS) */}
      {activeTab === 'Student Progress' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 lg:p-8 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-indigo-600" />
                  Branch Student Learning Progress & Scorecards
                </h3>
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  Track individual student practice metrics, completed items, XP points, study streaks, and module scores.
                </p>
              </div>

              <button
                onClick={() => setIsCreateUserOpen(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-xs shrink-0"
              >
                <UserPlus className="w-4 h-4" /> Register New Student
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-6">
              {scopedUsers.filter(u => u.role === 'student').map((student) => {
                const prog = student.progress || { completedCount: 15, xp: 500, streak: 2, speaking: 65, writing: 62, reading: 68, listening: 64 };
                return (
                  <div key={student._id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                          {(student.name || '').split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-extrabold text-slate-900">{student.name}</h4>
                            <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 text-[10px] font-extrabold rounded-full border border-indigo-200">
                              {student.targetScore}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-semibold mt-0.5">{student.email} • {student.phone} ({student.branch})</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-extrabold shrink-0">
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl flex items-center gap-1">
                          ⚡ {prog.xp} XP
                        </span>
                        <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-xl flex items-center gap-1">
                          🔥 {prog.streak} Day Streak
                        </span>
                        <button
                          onClick={() => setViewingProgressUser(student)}
                          className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold transition-colors shadow-2xs"
                        >
                          Full Scorecard
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar & Scores Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
                      <div className="md:col-span-1 bg-white p-3 rounded-xl border border-slate-200/60 flex flex-col justify-between">
                        <span className="text-[10px] font-extrabold uppercase text-slate-400">Exercises Done</span>
                        <p className="text-lg font-black text-slate-900 font-mono mt-1">{prog.completedCount} / 100</p>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
                          <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${Math.min(prog.completedCount, 100)}%` }} />
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200/60 flex flex-col justify-between">
                        <span className="text-[10px] font-extrabold uppercase text-indigo-600">Speaking</span>
                        <p className="text-base font-black text-slate-900 font-mono mt-1">{prog.speaking || 65} / 90</p>
                        <span className="text-[9px] font-bold text-slate-400">GSE Score</span>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200/60 flex flex-col justify-between">
                        <span className="text-[10px] font-extrabold uppercase text-cyan-600">Writing</span>
                        <p className="text-base font-black text-slate-900 font-mono mt-1">{prog.writing || 62} / 90</p>
                        <span className="text-[9px] font-bold text-slate-400">GSE Score</span>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200/60 flex flex-col justify-between">
                        <span className="text-[10px] font-extrabold uppercase text-emerald-600">Reading</span>
                        <p className="text-base font-black text-slate-900 font-mono mt-1">{prog.reading || 68} / 90</p>
                        <span className="text-[9px] font-bold text-slate-400">GSE Score</span>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200/60 flex flex-col justify-between">
                        <span className="text-[10px] font-extrabold uppercase text-amber-600">Listening</span>
                        <p className="text-base font-black text-slate-900 font-mono mt-1">{prog.listening || 64} / 90</p>
                        <span className="text-[9px] font-bold text-slate-400">GSE Score</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: REAL-TIME ACTIVITY & KICK SESSION */}
      {activeTab === 'Real-Time Activity' && (
        <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-sm font-extrabold text-slate-900">Live Active User Sessions ({activeSessions.length})</h3>
            </div>
            <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              WebSocket Connected
            </span>
          </div>

          <div className="space-y-3">
            {activeSessions.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200/80">
                <Activity className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-700">No active user sessions</p>
              </div>
            ) : (
              activeSessions.map((session) => (
                <div key={session.userId} className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between text-xs font-bold">
                  <div>
                    <h4 className="text-slate-900 font-extrabold">{session.name}</h4>
                    <p className="text-indigo-600 font-semibold text-[11px] mt-0.5">{session.module}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right text-slate-500 text-[11px]">
                      <div>{session.duration}</div>
                      <div className="text-slate-400 font-mono">{session.ip} ({session.location})</div>
                    </div>
                    <button
                      onClick={() => handleKickSession(session.userId, session.name)}
                      className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 rounded-lg text-xs font-extrabold transition-colors"
                    >
                      Disconnect Session
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 5: CONTENT POOL & JSON EDITOR */}
      {activeTab === 'Content' && (
        <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">PTE Practice Content Databank</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Manage 1,000+ PTE Academic test items & JSON definitions</p>
            </div>
            <button
              onClick={() => setIsContentModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" /> Add Custom Item JSON
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { type: 'Speaking', items: '240 Items', desc: 'Read Aloud, Repeat Sentence, Describe Image' },
              { type: 'Writing', items: '180 Items', desc: 'Summarize Written Text, Write Essay' },
              { type: 'Reading', items: '310 Items', desc: 'R&W Fill in Blanks, Reorder Paragraphs' },
              { type: 'Listening', items: '270 Items', desc: 'Summarize Spoken Text, Write from Dictation' },
            ].map(col => (
              <div key={col.type} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-xs font-extrabold text-slate-900">{col.type} Pool</h4>
                <p className="text-sm font-black text-indigo-600 mt-1">{col.items}</p>
                <p className="text-[10px] text-slate-400 font-semibold mt-2">{col.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: EVALUATED RESULTS */}
      {activeTab === 'Results' && (
        <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 shadow-2xs space-y-4">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-base font-extrabold text-slate-900">Student Evaluated Scorecards</h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Real-time PTE AI scoring logs & full diagnostic reports</p>
          </div>
          <div className="space-y-3">
            {[
              { student: 'Subash Bhandari', test: 'PTE Full Mock Exam #04', score: '82 Overall (S:85, W:79, R:80, L:84)', date: 'Today at 09:30 AM' },
              { student: 'Rohan Sharma', test: 'Speaking Diagnostic Evaluation', score: '74 Overall (Pronunciation: 78, Fluency: 72)', date: 'Yesterday at 04:15 PM' },
              { student: 'Anuraj Phuyal', test: 'Writing Essay AI Scorecard', score: '68 Overall (Grammar: 70, Vocabulary: 66)', date: '2 days ago' },
            ].map((res, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between text-xs font-bold">
                <div>
                  <h4 className="text-slate-900 font-extrabold">{res.student} — <span className="text-indigo-600">{res.test}</span></h4>
                  <p className="text-emerald-600 font-mono font-extrabold text-[11px] mt-0.5">{res.score}</p>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">{res.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: AI AGENT */}
      {activeTab === 'AI Agent' && (
        <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 shadow-2xs flex flex-col h-[520px]">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">PTE AI Admin Assistant</h3>
              <p className="text-[11px] text-slate-400 font-semibold">Gemini function calling for automated content insertion & user approvals</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-3 custom-scrollbar">
            {aiMessages.map((msg, idx) => (
              <div key={idx} className={clsx("flex", msg.sender === 'user' ? "justify-end" : "justify-start")}>
                <div className={clsx(
                  "max-w-md p-3.5 rounded-2xl text-xs font-semibold leading-relaxed",
                  msg.sender === 'user' ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-800 border border-slate-200/60"
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
              placeholder="Ask AI to approve users, generate questions, or check stats..."
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
            />
            <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1 shadow-2xs">
              <Send className="w-3.5 h-3.5" /> Send
            </button>
          </form>
        </div>
      )}

      {/* TAB 8: FILES RESOURCE MANAGER */}
      {activeTab === 'Files' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 shadow-2xs">
            <h3 className="text-base font-extrabold text-slate-900 mb-2">Upload Resource PDF Document</h3>
            <form onSubmit={handleUploadPdfSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Document Title (e.g., PTE Speaking Master Cheatsheet)..."
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
                required
              />
              <select
                value={uploadCategory}
                onChange={(e) => setUploadCategory(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-700"
              >
                <option value="Speaking">Speaking</option>
                <option value="Writing">Writing</option>
                <option value="Reading">Reading</option>
                <option value="Vocabulary">Vocabulary</option>
              </select>
              <button type="submit" className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-xs">
                <UploadCloud className="w-4 h-4" /> Upload Document
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
                  <button className="px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg text-xs font-extrabold flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                  <button onClick={() => handleDeletePdf(pdf.id)} className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 9: SEND ALERTS & AI ALERT GENERATOR */}
      {activeTab === 'Send Alerts' && (
        <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 lg:p-8 shadow-2xs max-w-2xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Broadcast System Announcement</h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">
                Push real-time notification alerts to all student dashboards or targeted branch campuses.
              </p>
            </div>
            
            <button
              type="button"
              onClick={handleGenerateAiAlert}
              disabled={isGeneratingAiAlert}
              className="px-3.5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-xs font-extrabold shadow-xs flex items-center gap-1.5 hover:opacity-95"
            >
              <Sparkles className="w-3.5 h-3.5" /> {isGeneratingAiAlert ? 'Generating...' : 'Generate with AI'}
            </button>
          </div>

          {alertSent && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Announcement broadcasted to active student dashboards!
            </div>
          )}

          <form onSubmit={handleSendBroadcast} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Announcement Title</label>
              <input
                type="text"
                placeholder="e.g., Scheduled Maintenance / New PTE Practice Items Added"
                value={alertTitle}
                onChange={(e) => setAlertTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Target Audience</label>
              <select
                value={alertTarget}
                onChange={(e) => setAlertTarget(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
              >
                <option value="all">All Students (Global Broadcast)</option>
                <option value="ktm">Kathmandu Main Campus</option>
                <option value="pokhara">Pokhara Campus</option>
                <option value="chitwan">Chitwan Campus</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Message Body</label>
              <textarea
                rows={4}
                placeholder="Enter alert message..."
                value={alertBody}
                onChange={(e) => setAlertBody(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-extrabold text-xs shadow-2xs flex items-center gap-2">
              <Send className="w-4 h-4" /> Broadcast Announcement
            </button>
          </form>
        </div>
      )}

      {/* VIEW PROGRESS MODAL */}
      {viewingProgressUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] p-6 max-w-lg w-full border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">{viewingProgressUser.name}'s Learning Scorecard</h3>
                <p className="text-[11px] text-slate-500 font-semibold">{viewingProgressUser.email} • {viewingProgressUser.branch}</p>
              </div>
              <button onClick={() => setViewingProgressUser(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-bold">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase">Target Score</span>
                <p className="text-base font-black text-indigo-600 mt-0.5">{viewingProgressUser.targetScore}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase">Practice Experience</span>
                <p className="text-base font-black text-emerald-600 mt-0.5">⚡ {viewingProgressUser.progress?.xp || 500} XP</p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-extrabold text-slate-900">Module Score Predictions (GSE 10-90)</h4>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <div className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-100 flex justify-between items-center">
                  <span>🗣️ Speaking</span>
                  <span className="font-mono font-black text-indigo-700">{viewingProgressUser.progress?.speaking || 65} / 90</span>
                </div>
                <div className="p-3 rounded-xl bg-cyan-50/50 border border-cyan-100 flex justify-between items-center">
                  <span>✍️ Writing</span>
                  <span className="font-mono font-black text-cyan-700">{viewingProgressUser.progress?.writing || 62} / 90</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 flex justify-between items-center">
                  <span>📖 Reading</span>
                  <span className="font-mono font-black text-emerald-700">{viewingProgressUser.progress?.reading || 68} / 90</span>
                </div>
                <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-100 flex justify-between items-center">
                  <span>🎧 Listening</span>
                  <span className="font-mono font-black text-amber-700">{viewingProgressUser.progress?.listening || 64} / 90</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button onClick={() => setViewingProgressUser(null)} className="px-4 py-2 bg-indigo-600 text-white font-extrabold text-xs rounded-xl">
                Close Scorecard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* USER EDIT MODAL */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] p-6 max-w-md w-full border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-extrabold text-slate-900">Edit User Account</h3>
              <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleSaveEditUser} className="space-y-3 text-xs font-bold">
              <div>
                <label className="block text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={editingUser.phone}
                  onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Access Status</label>
                <select
                  value={editingUser.status}
                  onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                >
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="declined">Declined</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Subscription Days</label>
                <input
                  type="number"
                  value={editingUser.accessDurationDays}
                  onChange={(e) => setEditingUser({ ...editingUser, accessDurationDays: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setEditingUser(null)} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE USER MODAL (BRANCH ADMIN FRIENDLY) */}
      {isCreateUserOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] p-6 max-w-md w-full border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-extrabold text-slate-900">
                {isBranchAdmin ? `Register Student for ${branchName}` : 'Create New User Account'}
              </h3>
              <button onClick={() => setIsCreateUserOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateUserSubmit} className="space-y-3 text-xs font-bold">
              <div>
                <label className="block text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter student name..."
                  value={createForm.name}
                  onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email address..."
                  value={createForm.email}
                  onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="+977 98..."
                  value={createForm.phone}
                  onChange={(e) => setCreateForm({ ...createForm, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Target Score Goal</label>
                <select
                  value={createForm.targetScore}
                  onChange={(e) => setCreateForm({ ...createForm, targetScore: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                >
                  <option value="50+ (GSE 50)">50+ (GSE 50)</option>
                  <option value="65+ (GSE 65)">65+ (GSE 65)</option>
                  <option value="79+ (GSE 79)">79+ (GSE 79)</option>
                  <option value="84+ (GSE 84)">84+ (GSE 84)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Access Duration (Days)</label>
                <select
                  value={createForm.duration}
                  onChange={(e) => setCreateForm({ ...createForm, duration: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                >
                  <option value={30}>30 Days (1 Month Access)</option>
                  <option value={60}>60 Days (2 Months Access)</option>
                  <option value={90}>90 Days (3 Months Access)</option>
                  <option value={365}>365 Days (1 Year Full Access)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setIsCreateUserOpen(false)} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl">Authorize & Register</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD CONTENT JSON MODAL */}
      {isContentModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] p-6 max-w-lg w-full border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-extrabold text-slate-900">Add Item JSON Definition</h3>
              <button onClick={() => setIsContentModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">JSON Payload</label>
              <textarea
                rows={8}
                value={contentJSON}
                onChange={(e) => setContentJSON(e.target.value)}
                className="w-full bg-slate-900 text-emerald-400 font-mono text-xs p-3 rounded-xl focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={() => setIsContentModalOpen(false)} className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl">Cancel</button>
              <button onClick={() => setIsContentModalOpen(false)} className="px-4 py-2 bg-indigo-600 text-white text-xs font-extrabold rounded-xl">Insert to Databank</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
