'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Clock, Target, TrendingUp, Award, 
  BarChart3, AlertTriangle, CheckCircle2, ChevronRight, Calendar
} from 'lucide-react';
import { clsx } from 'clsx';
import Link from 'next/link';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid 
} from 'recharts';

const mockUserProgress = {
  name: 'Sandip Shrestha',
  email: 'nsandipshrestha08@gmail.com',
  avatar: 'S',
  avatarColor: 'from-cyan-400 to-blue-600',
  joinDate: 'Aug 11, 2026',
  lastActive: '2 hours ago',
  overallScore: 72,
  targetScore: 79,
  totalPractice: 156,
  totalTime: '48h 30m',
  scores: {
    speaking: { current: 68, previous: 62, target: 79, sessions: 42 },
    writing: { current: 74, previous: 70, target: 79, sessions: 38 },
    reading: { current: 78, previous: 72, target: 79, sessions: 45 },
    listening: { current: 70, previous: 65, target: 79, sessions: 31 },
  },
  weeklyProgress: [
    { week: 'W1', speaking: 55, writing: 58, reading: 60, listening: 52 },
    { week: 'W2', speaking: 58, writing: 62, reading: 65, listening: 56 },
    { week: 'W3', speaking: 62, writing: 66, reading: 70, listening: 60 },
    { week: 'W4', speaking: 65, writing: 70, reading: 74, listening: 65 },
    { week: 'W5', speaking: 68, writing: 74, reading: 78, listening: 70 },
  ],
  recentSessions: [
    { id: '1', module: 'Speaking', task: 'Read Aloud', score: 76, date: 'Aug 11', duration: '5:30' },
    { id: '2', module: 'Writing', task: 'Write Essay', score: 82, date: 'Aug 11', duration: '25:00' },
    { id: '3', module: 'Reading', task: 'Fill in the Blanks', score: 85, date: 'Aug 10', duration: '12:15' },
    { id: '4', module: 'Listening', task: 'Write from Dictation', score: 72, date: 'Aug 10', duration: '8:20' },
    { id: '5', module: 'Speaking', task: 'Describe Image', score: 68, date: 'Aug 9', duration: '3:45' },
  ],
  mockTests: [
    { id: '1', name: 'Mock Test #5', score: 72, date: 'Aug 10', speaking: 68, writing: 74, reading: 78, listening: 70 },
    { id: '2', name: 'Mock Test #4', score: 67, date: 'Aug 5', speaking: 62, writing: 70, reading: 72, listening: 65 },
    { id: '3', name: 'Mock Test #3', score: 62, date: 'Jul 30', speaking: 58, writing: 66, reading: 65, listening: 60 },
  ],
  weakAreas: ['Oral Fluency', 'Pronunciation', 'Summarize Spoken Text', 'Write from Dictation'],
  strongAreas: ['Reading Fill in Blanks', 'Re-order Paragraphs', 'Write Essay'],
};

const moduleColors = {
  speaking: 'text-purple-600 bg-purple-50',
  writing: 'text-indigo-600 bg-indigo-50',
  reading: 'text-cyan-600 bg-cyan-50',
  listening: 'text-emerald-600 bg-emerald-50',
};

const getModuleBadge = (module: string) => {
  switch (module) {
    case 'Speaking': return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'Writing': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
    case 'Reading': return 'bg-cyan-100 text-cyan-700 border-cyan-200';
    case 'Listening': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    default: return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

export default function UserProgressPage() {
  const data = mockUserProgress;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans text-slate-900 pb-20">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Profile */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#e8ecf4] pb-6">
          <div className="space-y-4">
            <Link href="/admin/users" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Users
            </Link>
            
            <div className="flex items-center gap-5">
              <div className={clsx('w-20 h-20 rounded-2xl flex items-center justify-center text-white font-display font-bold text-3xl shadow-sm bg-gradient-to-br', data.avatarColor)}>
                {data.avatar}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-slate-900">{data.name}</h1>
                <p className="text-slate-500 mt-1">{data.email}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Joined: {data.joinDate}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Active: {data.lastActive}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-4 py-2 bg-white border border-[#e8ecf4] text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors shadow-sm">
              Message User
            </button>
            <button className="flex-1 md:flex-none px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm">
              Assign Plan
            </button>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-[#e8ecf4] shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded-lg">On Track</span>
            </div>
            <p className="text-sm font-medium text-slate-500">Overall Score</p>
            <div className="flex items-end gap-2 mt-1">
              <p className="text-3xl font-bold font-display">{data.overallScore}</p>
              <p className="text-sm text-slate-400 mb-1">/ {data.targetScore}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-[#e8ecf4] shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500">Total Practice</p>
            <p className="text-3xl font-bold font-display mt-1">{data.totalPractice} <span className="text-lg text-slate-400 font-medium">sessions</span></p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#e8ecf4] shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                <Clock className="w-6 h-6" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500">Time Spent</p>
            <p className="text-3xl font-bold font-display mt-1">{data.totalTime}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#e8ecf4] shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500">Score Trend</p>
            <p className="text-3xl font-bold font-display mt-1 text-emerald-600">+10 <span className="text-lg text-slate-400 font-medium">pts</span></p>
          </div>
        </div>

        {/* Module Scores */}
        <div>
          <h2 className="text-xl font-bold font-display mb-4">Module Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(data.scores).map(([key, score], i) => {
              const moduleKey = key as keyof typeof moduleColors;
              const improvement = score.current - score.previous;
              const progressPercentage = (score.current / score.target) * 100;
              
              return (
                <motion.div 
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-5 rounded-2xl border border-[#e8ecf4] shadow-sm"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold capitalize text-slate-700">{key}</h3>
                    <div className={clsx('px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1', 
                      improvement >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    )}>
                      {improvement >= 0 ? '↑' : '↓'} {Math.abs(improvement)}
                    </div>
                  </div>
                  
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-4xl font-display font-bold">{score.current}</span>
                    <span className="text-sm text-slate-400 mb-1">Target: {score.target}</span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={clsx('h-full rounded-full', moduleColors[moduleKey].split(' ')[0].replace('text', 'bg'))}
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 text-right">{score.sessions} sessions</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-2xl border border-[#e8ecf4] shadow-sm">
          <h2 className="text-xl font-bold font-display mb-6">Progress History</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.weeklyProgress} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8ecf4" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis domain={['dataMin - 5', 'dataMax + 5']} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e8ecf4', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Line type="monotone" dataKey="speaking" stroke="#9333ea" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="writing" stroke="#4f46e5" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="reading" stroke="#06b6d4" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="listening" stroke="#10b981" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Two Columns: Recent Practice & Mock Tests */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="space-y-4">
            <h2 className="text-lg font-bold font-display flex items-center justify-between">
              Recent Practice
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center">
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </h2>
            <div className="bg-white rounded-[24px] border border-[#e8ecf4] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 bg-slate-50/50 uppercase border-b border-[#e8ecf4]">
                    <tr>
                      <th className="px-4 py-3 font-medium">Task</th>
                      <th className="px-4 py-3 font-medium text-center">Score</th>
                      <th className="px-4 py-3 font-medium text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e8ecf4]">
                    {data.recentSessions.map((session) => (
                      <tr key={session.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-medium text-slate-900">{session.task}</div>
                          <div className="mt-1">
                            <span className={clsx('px-1.5 py-0.5 rounded text-[10px] font-medium border', getModuleBadge(session.module))}>
                              {session.module}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center align-middle">
                          <span className={clsx('inline-flex px-2 py-1 rounded-md text-xs font-bold border', 
                            session.score >= 80 ? 'bg-green-100 text-green-700 border-green-200' : 
                            session.score >= 60 ? 'bg-amber-100 text-amber-700 border-amber-200' : 
                            'bg-red-100 text-red-700 border-red-200'
                          )}>
                            {session.score}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-slate-500 text-xs">
                          {session.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold font-display flex items-center justify-between">
              Mock Test History
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center">
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </h2>
            <div className="space-y-3">
              {data.mockTests.map((test) => (
                <div key={test.id} className="bg-white p-4 rounded-[24px] border border-[#e8ecf4] shadow-sm hover:border-indigo-200 transition-colors group">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-500" />
                        {test.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">{test.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold font-display text-slate-900">{test.score}</span>
                      <span className="text-xs text-slate-400 block -mt-1">Overall</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 pt-3 border-t border-[#e8ecf4]">
                    <div className="text-center">
                      <span className="text-[10px] text-slate-500 uppercase block mb-0.5">Spk</span>
                      <span className="text-sm font-semibold text-purple-700">{test.speaking}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-[10px] text-slate-500 uppercase block mb-0.5">Wri</span>
                      <span className="text-sm font-semibold text-indigo-700">{test.writing}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-[10px] text-slate-500 uppercase block mb-0.5">Rea</span>
                      <span className="text-sm font-semibold text-cyan-700">{test.reading}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-[10px] text-slate-500 uppercase block mb-0.5">Lis</span>
                      <span className="text-sm font-semibold text-emerald-700">{test.listening}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100">
            <h3 className="font-semibold text-red-800 flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-500" /> Areas for Improvement
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.weakAreas.map((area, i) => (
                <span key={i} className="bg-white border border-red-200 text-red-700 px-3 py-1.5 rounded-xl text-sm font-medium shadow-sm">
                  {area}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
            <h3 className="font-semibold text-emerald-800 flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Strong Areas
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.strongAreas.map((area, i) => (
                <span key={i} className="bg-white border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-xl text-sm font-medium shadow-sm">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
