'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, Users, Clock, BarChart3, 
  Timer, CheckCircle2, PlayCircle, MoreHorizontal
} from 'lucide-react';
import { clsx } from 'clsx';

const mockLiveActivity = [
  { id: '1', user: 'Sandip Shrestha', avatar: 'S', avatarColor: 'from-cyan-400 to-blue-600', action: 'Practicing Speaking - Read Aloud', module: 'Speaking', startedAt: '2 min ago', duration: '12:34', score: 76, status: 'In Progress' },
  { id: '2', user: 'Sagar Timilsina', avatar: 'S', avatarColor: 'from-amber-400 to-yellow-600', action: 'Taking Mock Test #5', module: 'Mock Test', startedAt: '15 min ago', duration: '45:12', score: null, status: 'In Progress' },
  { id: '3', user: 'Sarvagya Budhathoki', avatar: 'S', avatarColor: 'from-emerald-400 to-teal-600', action: 'Writing Essay Practice', module: 'Writing', startedAt: '5 min ago', duration: '08:45', score: 82, status: 'In Progress' },
  { id: '4', user: 'Lal Bahadur Lohar', avatar: 'L', avatarColor: 'from-yellow-400 to-orange-600', action: 'Listening - Fill in the Blanks', module: 'Listening', startedAt: '8 min ago', duration: '15:20', score: 68, status: 'In Progress' },
  { id: '5', user: 'Chhabi Acharya', avatar: 'C', avatarColor: 'from-sky-400 to-cyan-600', action: 'Reading - Multiple Choice', module: 'Reading', startedAt: '20 min ago', duration: '22:10', score: 74, status: 'Completed' },
  { id: '6', user: 'Ramesh Pariyar', avatar: 'R', avatarColor: 'from-purple-400 to-pink-600', action: 'AI Tutor Conversation', module: 'AI Tutor', startedAt: '3 min ago', duration: '05:30', score: null, status: 'In Progress' },
];

const recentCompletedSessions = [
  { id: '1', user: 'Sandip Shrestha', module: 'Speaking', task: 'Describe Image', score: 78, time: '10 min ago', duration: '5:30' },
  { id: '2', user: 'Sagar Timilsina', module: 'Writing', task: 'Summarize Written Text', score: 85, time: '25 min ago', duration: '12:15' },
  { id: '3', user: 'Chhabi Acharya', module: 'Listening', task: 'Write from Dictation', score: 92, time: '30 min ago', duration: '3:45' },
  { id: '4', user: 'Anlesh Chaudhary', module: 'Reading', task: 'Re-order Paragraphs', score: 65, time: '45 min ago', duration: '8:20' },
  { id: '5', user: 'Raksha Khadka', module: 'Speaking', task: 'Repeat Sentence', score: 71, time: '1 hour ago', duration: '2:15' },
];

const getModuleColor = (module: string) => {
  switch (module) {
    case 'Speaking': return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'Writing': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    case 'Reading': return 'bg-cyan-50 text-cyan-700 border-cyan-200';
    case 'Listening': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Mock Test': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'AI Tutor': return 'bg-pink-50 text-pink-700 border-pink-200';
    default: return 'bg-slate-50 text-slate-700 border-slate-200';
  }
};

const getScoreColor = (score: number | null) => {
  if (score === null) return 'bg-slate-100 text-slate-600';
  if (score >= 80) return 'bg-green-100 text-green-700 border-green-200';
  if (score >= 60) return 'bg-amber-100 text-amber-700 border-amber-200';
  return 'bg-red-100 text-red-700 border-red-200';
};

export default function ActivityPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">Real-Time Activity</h1>
            <p className="text-slate-500 mt-1">Monitor live student sessions and platform usage</p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-[#e8ecf4]">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-slate-700">5 users online now</span>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Currently Active', value: '5', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'Sessions Today', value: '28', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Avg Session Duration', value: '18 min', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Peak Hour', value: '2-3 PM', icon: BarChart3, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-[#e8ecf4] shadow-sm flex items-center gap-4"
            >
              <div className={clsx('p-3 rounded-xl', stat.bg, stat.color)}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold font-display mt-0.5">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live Activity Section */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-bold font-display flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-600" />
              Live Sessions
            </h2>
            
            <div className="space-y-3">
              {mockLiveActivity.map((activity, i) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white p-4 rounded-[24px] border border-[#e8ecf4] shadow-sm flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative">
                      <div className={clsx('w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg bg-gradient-to-br', activity.avatarColor)}>
                        {activity.avatar}
                      </div>
                      <span className={clsx(
                        'absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white',
                        activity.status === 'In Progress' ? 'bg-emerald-500' : 'bg-slate-400'
                      )}></span>
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">{activity.user}</h3>
                      <p className="text-sm text-slate-500 line-clamp-1">{activity.action}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                    <span className={clsx('px-2.5 py-1 rounded-lg text-xs font-medium border', getModuleColor(activity.module))}>
                      {activity.module}
                    </span>
                    
                    <div className="flex items-center gap-1.5 text-sm text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg">
                      <Timer className="w-4 h-4" />
                      <span className="font-mono">{activity.duration}</span>
                    </div>

                    {activity.score !== null && (
                      <span className={clsx('px-2.5 py-1 rounded-lg text-xs font-bold border', getScoreColor(activity.score))}>
                        {activity.score} pts
                      </span>
                    )}

                    <div className="text-right ml-2 min-w-[80px]">
                      <span className="text-xs text-slate-400 block">{activity.startedAt}</span>
                      <span className={clsx(
                        'text-xs font-medium flex items-center justify-end gap-1',
                        activity.status === 'In Progress' ? 'text-indigo-600' : 'text-slate-500'
                      )}>
                        {activity.status === 'In Progress' ? <PlayCircle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                        {activity.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Completed Sessions */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold font-display flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Recently Completed
            </h2>
            
            <div className="bg-white rounded-2xl border border-[#e8ecf4] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 bg-slate-50/50 uppercase border-b border-[#e8ecf4]">
                    <tr>
                      <th className="px-4 py-3 font-medium">User & Task</th>
                      <th className="px-4 py-3 font-medium text-right">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e8ecf4]">
                    {recentCompletedSessions.map((session, i) => (
                      <tr key={session.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-medium text-slate-900">{session.user}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{session.task}</div>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className={clsx('px-1.5 py-0.5 rounded text-[10px] font-medium border', getModuleColor(session.module))}>
                              {session.module}
                            </span>
                            <span className="text-[10px] text-slate-400">{session.time}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right align-top">
                          <span className={clsx('inline-flex px-2 py-1 rounded-md text-xs font-bold border', getScoreColor(session.score))}>
                            {session.score}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-3 border-t border-[#e8ecf4] text-center">
                <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700 transition-colors flex items-center justify-center gap-1 w-full">
                  View All History
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
