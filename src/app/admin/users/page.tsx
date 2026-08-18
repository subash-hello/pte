'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, PhoneCall, TrendingUp, Pencil, Trash2, X, Plus, 
  Check, Phone, Mail, UserPlus, Shield, Building2, Award, Zap, CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { authFetch, getUser } from '@/lib/session';

const fallbackInitialUsers = [
  {
    _id: 'super_admin_01',
    id: 'super_admin_01',
    name: 'Super Admin',
    email: 'admin@ptemaster.com',
    phone: '+977 9800000000',
    role: 'super_admin',
    status: 'approved',
    branch: 'Central Headquarters',
    pteGoal: 79,
    targetScore: '84+ (GSE 84)',
    subscription: 'premium',
    accessDurationDays: 365,
    xp: 2500,
    streak: 30,
    progress: { completedCount: 100, xp: 2500, streak: 30, speaking: 90, writing: 88, reading: 89, listening: 90 },
    createdAt: 'Jul 15, 2026'
  },
  {
    _id: 'branch_admin_01',
    id: 'branch_admin_01',
    name: 'Ramesh Sharma',
    email: 'ktm.admin@pteai.com',
    phone: '+977 9851012345',
    role: 'branch_admin',
    status: 'approved',
    branch: 'Kathmandu Central Campus',
    pteGoal: 79,
    targetScore: '79+ (GSE 79)',
    subscription: 'premium',
    accessDurationDays: 365,
    xp: 1200,
    streak: 15,
    progress: { completedCount: 75, xp: 1200, streak: 15, speaking: 80, writing: 78, reading: 82, listening: 80 },
    createdAt: 'Jul 20, 2026'
  },
  {
    _id: 'branch_admin_02',
    id: 'branch_admin_02',
    name: 'Sita Sharma',
    email: 'pokhara.admin@pteai.com',
    phone: '+977 9856023456',
    role: 'branch_admin',
    status: 'approved',
    branch: 'Pokhara Regional Campus',
    pteGoal: 79,
    targetScore: '79+ (GSE 79)',
    subscription: 'premium',
    accessDurationDays: 365,
    xp: 1850,
    streak: 22,
    progress: { completedCount: 85, xp: 1850, streak: 22, speaking: 85, writing: 82, reading: 84, listening: 86 },
    createdAt: 'Jul 25, 2026'
  },
  {
    _id: 'student_01',
    id: 'student_01',
    name: 'Subash Bhandari',
    email: 'subash.bhandari@pteai.com',
    phone: '+977 9841234567',
    role: 'student',
    status: 'approved',
    branch: 'Kathmandu Central Campus',
    pteGoal: 79,
    targetScore: '79+ (GSE 79)',
    subscription: 'pro',
    accessDurationDays: 90,
    xp: 1420,
    streak: 14,
    progress: { completedCount: 68, xp: 1420, streak: 14, speaking: 85, writing: 79, reading: 80, listening: 84 },
    createdAt: 'Aug 02, 2026'
  },
  {
    _id: 'student_02',
    id: 'student_02',
    name: 'Pooja Adhikari',
    email: 'pooja.adhikari@gmail.com',
    phone: '+977 9813456789',
    role: 'student',
    status: 'pending',
    branch: 'Kathmandu Central Campus',
    pteGoal: 65,
    targetScore: '65+ (GSE 65)',
    subscription: 'free',
    accessDurationDays: 30,
    xp: 420,
    streak: 3,
    progress: { completedCount: 18, xp: 420, streak: 3, speaking: 62, writing: 64, reading: 60, listening: 63 },
    createdAt: 'Aug 14, 2026'
  },
  {
    _id: 'student_03',
    id: 'student_03',
    name: 'Bikash Shrestha',
    email: 'bikash.shrestha@gmail.com',
    phone: '+977 9801239876',
    role: 'student',
    status: 'approved',
    branch: 'Pokhara Regional Campus',
    pteGoal: 79,
    targetScore: '79+ (GSE 79)',
    subscription: 'premium',
    accessDurationDays: 365,
    xp: 2150,
    streak: 21,
    progress: { completedCount: 92, xp: 2150, streak: 21, speaking: 82, writing: 80, reading: 78, listening: 81 },
    createdAt: 'Jul 28, 2026'
  },
  {
    _id: 'student_04',
    id: 'student_04',
    name: 'Anjali Karki',
    email: 'anjali.karki@outlook.com',
    phone: '+977 9846098765',
    role: 'student',
    status: 'pending',
    branch: 'Pokhara Regional Campus',
    pteGoal: 84,
    targetScore: '84+ (GSE 84)',
    subscription: 'free',
    accessDurationDays: 60,
    xp: 680,
    streak: 5,
    progress: { completedCount: 34, xp: 680, streak: 5, speaking: 75, writing: 72, reading: 76, listening: 74 },
    createdAt: 'Aug 15, 2026'
  }
];

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>(fallbackInitialUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewingProgressUser, setViewingProgressUser] = useState<any | null>(null);

  const [addForm, setAddForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'student',
    branch: 'Kathmandu Central Campus',
    targetScore: '79+ (GSE 79)',
    duration: 30
  });

  const loadUsers = async () => {
    try {
      const res = await authFetch('/api/admin/users');
      if (res.ok) {
        const data = await res.json();
        if (data.users && data.users.length > 0) {
          setUsers(data.users);
        }
      }
    } catch (e) {
      console.error('Failed to load users', e);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAuthorizeUser = async (id: string) => {
    try {
      const res = await authFetch('/api/admin/approve', {
        method: 'POST',
        body: JSON.stringify({ userId: id, action: 'approve' })
      });
      if (res.ok) {
        setUsers(prev => prev.map(u => (u._id === id || u.id === id) ? { ...u, status: 'approved' } : u));
        loadUsers();
      }
    } catch (e) {
      console.error('Error approving user', e);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        const res = await authFetch(`/api/admin/users/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setUsers(prev => prev.filter(u => u._id !== id && u.id !== id));
          loadUsers();
        }
      } catch (e) {
        console.error('Error deleting user', e);
      }
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    try {
      const userId = selectedUser._id || selectedUser.id;
      const res = await authFetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(selectedUser)
      });
      if (res.ok) {
        setUsers(prev => prev.map(u => (u._id === userId || u.id === userId) ? selectedUser : u));
        setIsEditModalOpen(false);
        loadUsers();
      }
    } catch (e) {
      console.error('Error updating user', e);
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await authFetch('/api/admin/users', {
        method: 'POST',
        body: JSON.stringify({
          name: addForm.name,
          email: addForm.email,
          phone: addForm.phone || '+977 9800000000',
          role: addForm.role,
          branch: addForm.branch,
          targetScore: addForm.targetScore,
          accessDurationDays: Number(addForm.duration),
          status: 'approved'
        })
      });
      if (res.ok) {
        setIsAddModalOpen(false);
        setAddForm({ name: '', email: '', phone: '', role: 'student', branch: 'Kathmandu Central Campus', targetScore: '79+ (GSE 79)', duration: 30 });
        loadUsers();
      }
    } catch (e) {
      console.error('Error creating user', e);
    }
  };

  const filteredUsers = users.filter(user => {
    const q = search.toLowerCase();
    const matchesSearch = (user.name || '').toLowerCase().includes(q) || 
                          (user.email || '').toLowerCase().includes(q) ||
                          (user.phone || '').includes(q) ||
                          (user.branch || '').toLowerCase().includes(q);
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-20 text-slate-900 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-satoshi flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <Shield className="w-5 h-5" />
            </div>
            User Directory & Access Controls
          </h1>
          <p className="text-slate-500 text-xs font-semibold mt-1">
            Manage 4 students, 2 branch admins, authorization queues, and platform subscriptions.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold shadow-xs transition-colors"
        >
          <UserPlus className="w-4 h-4" /> Add User Account
        </button>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-[#e8ecf4] shadow-2xs">
          <p className="text-xs font-bold text-slate-500">Total Accounts</p>
          <h3 className="text-2xl font-black text-slate-900 font-satoshi mt-0.5">{users.length}</h3>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-[#e8ecf4] shadow-2xs">
          <p className="text-xs font-bold text-slate-500">Students</p>
          <h3 className="text-2xl font-black text-indigo-600 font-satoshi mt-0.5">{users.filter(u => u.role === 'student').length}</h3>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-[#e8ecf4] shadow-2xs">
          <p className="text-xs font-bold text-slate-500">Branch Admins</p>
          <h3 className="text-2xl font-black text-purple-600 font-satoshi mt-0.5">{users.filter(u => u.role === 'branch_admin').length}</h3>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-[#e8ecf4] shadow-2xs">
          <p className="text-xs font-bold text-slate-500">Pending Approvals</p>
          <h3 className="text-2xl font-black text-amber-600 font-satoshi mt-0.5">{users.filter(u => u.status === 'pending').length}</h3>
        </div>
      </div>

      {/* Toolbar & Filters */}
      <div className="bg-white border border-[#e8ecf4] rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name, email, branch or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none"
          >
            <option value="All">All Roles ({users.length})</option>
            <option value="student">Students ({users.filter(u => u.role === 'student').length})</option>
            <option value="branch_admin">Branch Admins ({users.filter(u => u.role === 'branch_admin').length})</option>
            <option value="super_admin">Super Admins ({users.filter(u => u.role === 'super_admin').length})</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="declined">Declined</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-[#e8ecf4] rounded-[24px] overflow-hidden shadow-2xs">
        <div className="divide-y divide-slate-100 overflow-x-auto">
          {filteredUsers.map((user) => {
            const userId = user._id || user.id;
            return (
              <div key={userId} className="p-4 sm:p-5 flex items-center justify-between gap-4 min-w-[760px] hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className={clsx(
                    "w-11 h-11 rounded-full text-white font-black text-xs flex items-center justify-center shrink-0 shadow-2xs",
                    user.role === 'super_admin' ? "bg-slate-900" :
                    user.role === 'branch_admin' ? "bg-purple-600" :
                    "bg-indigo-600"
                  )}>
                    {(user.name || '').split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-extrabold text-slate-900 truncate">{user.name}</h4>
                      <span className={clsx(
                        "px-2 py-0.5 text-[9px] font-extrabold rounded-md uppercase border",
                        user.role === 'super_admin' ? "bg-slate-900 text-white border-slate-900" :
                        user.role === 'branch_admin' ? "bg-purple-50 text-purple-700 border-purple-200" :
                        "bg-indigo-50 text-indigo-700 border-indigo-200"
                      )}>
                        {user.role.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-semibold mt-0.5 flex items-center gap-2">
                      <span>{user.email}</span>
                      <span>•</span>
                      <span className="font-mono text-emerald-600 font-bold">{user.phone}</span>
                      <span>•</span>
                      <span className="text-slate-400">{user.branch}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-bold shrink-0">
                  <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-100 text-[10px]">
                    {user.targetScore || `Goal: ${user.pteGoal || 79}`}
                  </span>

                  <span className={clsx(
                    "px-2.5 py-1 rounded-lg text-[10px] font-extrabold border uppercase",
                    user.status === 'approved' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                    user.status === 'pending' ? "bg-amber-50 text-amber-700 border-amber-200" :
                    "bg-rose-50 text-rose-700 border-rose-200"
                  )}>
                    {user.status}
                  </span>

                  <span className="text-[11px] text-slate-400 font-mono">
                    ⏱ {user.accessDurationDays || 30}d
                  </span>

                  <div className="flex items-center gap-1.5 ml-2">
                    {user.status === 'pending' && (
                      <button 
                        onClick={() => handleAuthorizeUser(userId)}
                        className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-extrabold shadow-2xs flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" /> Accept
                      </button>
                    )}

                    <button
                      onClick={() => setViewingProgressUser(user)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
                      title="View Student Scorecard"
                    >
                      <TrendingUp className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => { setSelectedUser(user); setIsEditModalOpen(true); }}
                      className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
                      title="Edit User Profile"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteUser(userId)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      title="Delete User"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {isEditModalOpen && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[24px] p-6 max-w-md w-full border border-slate-200 shadow-xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-extrabold text-slate-900">Edit User Account</h3>
                <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-3 text-xs font-bold">
                <div>
                  <label className="block text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={selectedUser.name || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={selectedUser.email || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={selectedUser.phone || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Branch</label>
                  <input
                    type="text"
                    value={selectedUser.branch || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, branch: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 mb-1">Role</label>
                    <select
                      value={selectedUser.role || 'student'}
                      onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                    >
                      <option value="student">Student</option>
                      <option value="branch_admin">Branch Admin</option>
                      <option value="super_admin">Super Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1">Status</label>
                    <select
                      value={selectedUser.status || 'approved'}
                      onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                    >
                      <option value="approved">Approved</option>
                      <option value="pending">Pending</option>
                      <option value="declined">Declined</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl">Save Changes</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CREATE USER MODAL */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[24px] p-6 max-w-md w-full border border-slate-200 shadow-xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-extrabold text-slate-900">Register New User Account</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>

              <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs font-bold">
                <div>
                  <label className="block text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter student or admin name..."
                    value={addForm.name}
                    onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="student@pteai.com"
                    value={addForm.email}
                    onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+977 98..."
                    value={addForm.phone}
                    onChange={(e) => setAddForm({ ...addForm, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 mb-1">Role</label>
                    <select
                      value={addForm.role}
                      onChange={(e) => setAddForm({ ...addForm, role: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                    >
                      <option value="student">Student</option>
                      <option value="branch_admin">Branch Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1">Branch</label>
                    <select
                      value={addForm.branch}
                      onChange={(e) => setAddForm({ ...addForm, branch: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                    >
                      <option value="Kathmandu Central Campus">Kathmandu Central Campus</option>
                      <option value="Pokhara Regional Campus">Pokhara Regional Campus</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl">Register User</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VIEW PROGRESS MODAL */}
      <AnimatePresence>
        {viewingProgressUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[24px] p-6 max-w-lg w-full border border-slate-200 shadow-xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">{viewingProgressUser.name}'s Learning Scorecard</h3>
                  <p className="text-[11px] text-slate-500 font-semibold">{viewingProgressUser.email} • {viewingProgressUser.branch}</p>
                </div>
                <button onClick={() => setViewingProgressUser(null)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-bold">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase">Target Score</span>
                  <p className="text-base font-black text-indigo-600 mt-0.5">{viewingProgressUser.targetScore || '79+ (GSE 79)'}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase">Practice Experience</span>
                  <p className="text-base font-black text-emerald-600 mt-0.5">⚡ {viewingProgressUser.xp || 500} XP</p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-extrabold text-slate-900">Module Score Predictions (GSE 10-90)</h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <div className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-100 flex justify-between items-center">
                    <span>🗣️ Speaking</span>
                    <span className="font-mono font-black text-indigo-700">{viewingProgressUser.progress?.speaking || 78} / 90</span>
                  </div>
                  <div className="p-3 rounded-xl bg-cyan-50/50 border border-cyan-100 flex justify-between items-center">
                    <span>✍️ Writing</span>
                    <span className="font-mono font-black text-cyan-700">{viewingProgressUser.progress?.writing || 74} / 90</span>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 flex justify-between items-center">
                    <span>📖 Reading</span>
                    <span className="font-mono font-black text-emerald-700">{viewingProgressUser.progress?.reading || 79} / 90</span>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-100 flex justify-between items-center">
                    <span>🎧 Listening</span>
                    <span className="font-mono font-black text-amber-700">{viewingProgressUser.progress?.listening || 76} / 90</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button onClick={() => setViewingProgressUser(null)} className="px-4 py-2 bg-indigo-600 text-white font-extrabold text-xs rounded-xl">
                  Close Scorecard
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

