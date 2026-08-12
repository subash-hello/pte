'use client';

import React, { useState } from 'react';
import { Target, Calendar, CheckSquare, Square, ChevronRight, Award, Sparkles } from 'lucide-react';
import clsx from 'clsx';

export default function StudyPlan() {
  const [targetScore, setTargetScore] = useState(79);
  const [weeks, setWeeks] = useState(4);
  const [generated, setGenerated] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const tasksList = [
    { id: 't1', day: 'Day 1', task: 'Read Aloud (10 Sets)', category: 'Speaking', moduleUrl: '/dashboard/practice/speaking/read-aloud' },
    { id: 't2', day: 'Day 1', task: 'Repeat Sentence (15 Sets)', category: 'Speaking', moduleUrl: '/dashboard/practice/speaking/repeat-sentence' },
    { id: 't3', day: 'Day 1', task: 'Review Write Essay Templates', category: 'Writing', moduleUrl: '/dashboard/practice/writing/write-essay' },
    { id: 't4', day: 'Day 2', task: 'Describe Image (5 Sets)', category: 'Speaking', moduleUrl: '/dashboard/practice/speaking/describe-image' },
    { id: 't5', day: 'Day 2', task: 'Summarize Written Text (2 Sets)', category: 'Writing', moduleUrl: '/dashboard/practice/writing/summarize-written-text' },
  ];

  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / tasksList.length) * 100);

  return (
    <div className="space-y-6 text-slate-900">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Personalized Study Plan</h1>
        <p className="text-slate-500 text-sm font-medium mt-1">Set your target score and let AI construct a tailored daily study schedule.</p>
      </div>

      {!generated ? (
        <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-8 lg:p-10 shadow-xs max-w-2xl">
          <div className="space-y-8">
            <div>
              <label className="flex items-center justify-between mb-4">
                <span className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Target className="w-5 h-5 text-indigo-600"/> Target PTE Score
                </span>
                <span className="text-2xl font-mono text-indigo-600 font-extrabold">{targetScore}</span>
              </label>
              <input 
                type="range" 
                min="10" max="90" step="5"
                value={targetScore} 
                onChange={(e) => setTargetScore(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-xs font-bold text-slate-400 mt-2">
                <span>10</span><span>50</span><span>65</span><span>79</span><span>90</span>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-base font-bold text-slate-900 mb-4">
                <Calendar className="w-5 h-5 text-indigo-600"/> Preparation Timeframe
              </label>
              <div className="grid grid-cols-4 gap-3">
                {[2, 4, 8, 16].map(w => (
                  <button 
                    key={w}
                    onClick={() => setWeeks(w)}
                    className={clsx(
                      "py-3 rounded-xl border text-xs font-bold transition-all",
                      weeks === w 
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-sm" 
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    {w} Weeks
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setGenerated(true)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all text-sm shadow-md shadow-indigo-500/20 mt-4 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Generate AI Study Plan
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-indigo-50 border border-indigo-100 p-6 rounded-[24px] gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-1">Your {weeks}-Week Roadmap (Target {targetScore}+)</h2>
              <p className="text-indigo-700 text-xs font-semibold">Completed {completedCount} of {tasksList.length} tasks ({progressPercent}%)</p>
            </div>
            <button onClick={() => setGenerated(false)} className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-white px-4 py-2 rounded-xl border border-indigo-100 shadow-2xs self-start sm:self-auto">
              Edit Goal
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-3">
              {[1, 2, 3, 4].map(w => (
                <div key={w} className={clsx("p-4 rounded-2xl border cursor-pointer transition-all", w === 1 ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-[#e8ecf4] hover:bg-slate-50')}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-900 text-sm">Week {w} Schedule</span>
                    {w === 1 ? <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-bold">Active</span> : null}
                  </div>
                  <div className="text-xs font-medium text-slate-500">Focus: {w === 1 ? 'Speaking & Writing' : 'Reading & Listening'}</div>
                </div>
              ))}
            </div>

            <div className="md:col-span-2 bg-white border border-[#e8ecf4] rounded-[24px] p-6 shadow-xs">
              <h3 className="text-base font-extrabold text-slate-900 mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" /> Week 1 Daily Tasks
              </h3>
              
              <div className="space-y-3">
                {tasksList.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => toggleTask(item.id)}
                    className={clsx(
                      "flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer",
                      completedTasks[item.id]
                        ? "bg-emerald-50/60 border-emerald-200 text-emerald-900"
                        : "bg-slate-50 border-slate-200/80 hover:bg-slate-100/60"
                    )}
                  >
                    {completedTasks[item.id] ? (
                      <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                    <div>
                      <span className={clsx("text-xs font-bold block", completedTasks[item.id] && "line-through text-slate-500")}>
                        {item.task}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">{item.day} • {item.category}</span>
                    </div>
                    <a 
                      href={item.moduleUrl}
                      onClick={(e) => e.stopPropagation()}
                      className="ml-auto flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs"
                    >
                      Practice <ChevronRight className="w-3.5 h-3.5 ml-0.5"/>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
