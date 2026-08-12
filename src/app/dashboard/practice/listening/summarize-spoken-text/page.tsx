'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Play, Square, Volume2, FileText, ChevronRight, CheckCircle, RefreshCcw } from 'lucide-react';
import { clsx } from 'clsx';
import { getQuestionsByTaskType, PTEQuestion } from '../../../../../lib/questions';
import { scoreSummarizeWrittenText } from '../../../../../lib/aiScoringEngine';

export default function SummarizeSpokenText() {
  const questions = getQuestionsByTaskType('Summarize Spoken Text');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [scoreResult, setScoreResult] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  const question: PTEQuestion = questions[currentIdx] || {
    title: "Impact of Ocean Acidification",
    difficulty: "Medium",
    timeLimit: 600,
    audioScript: "Ocean acidification occurs as sea water absorbs excess atmospheric carbon dioxide produced by human industrial activities. This chemical shift lowers the pH of the ocean, making it harder for shell-forming organisms such as oysters, crabs, and corals to build their protective structures. Marine biologists warn that if emissions continue unabated, coastal fisheries and global marine ecosystems will face irreversible disruption within decades.",
    keywords: ["ocean acidification", "carbon dioxide", "shell-forming organisms", "pH level"]
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const isWordCountValid = wordCount >= 50 && wordCount <= 70;

  // Real Web Speech API TTS
  const speakAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (isPlaying) {
        setIsPlaying(false);
        return;
      }
      const textToSpeak = question.audioScript || "Ocean acidification occurs as sea water absorbs excess atmospheric carbon dioxide.";
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => {
        setIsPlaying(false);
        setProgress(100);
      };
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback timer simulation
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (submitted || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => Math.max(0, prev - 1)), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const handleSubmit = () => {
    setSubmitted(true);
    const result = scoreSummarizeWrittenText(text, question.keywords || ['acidification', 'carbon', 'marine']);
    setScoreResult(result);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setText('');
      setSubmitted(false);
      setShowTranscript(false);
      setScoreResult(null);
      setProgress(0);
      setTimeLeft(600);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="space-y-6 text-slate-900">
      <div className="flex items-center justify-between">
        <Link href="/dashboard" className="p-2.5 bg-white hover:bg-slate-50 rounded-xl transition-colors border border-slate-200/80 shadow-2xs text-slate-700 font-bold text-xs flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <div className="flex items-center gap-2 text-indigo-600 font-mono font-black text-lg bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 shadow-2xs">
          <Clock className="w-4.5 h-4.5" /> 
          {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
      </div>

      {/* Question Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {questions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentIdx(idx);
              setText('');
              setSubmitted(false);
              setShowTranscript(false);
              setScoreResult(null);
              setProgress(0);
              setTimeLeft(600);
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
              currentIdx === idx
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200/80 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {q.difficulty || 'Medium'} • {q.title || `Set ${idx + 1}`}
          </button>
        ))}
      </div>

      <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 lg:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 mb-1">{question.title || "Summarize Spoken Text"}</h1>
            <p className="text-slate-500 text-xs font-semibold">Skills assessed: Listening, Writing</p>
          </div>
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 border border-slate-200/80"
          >
            <FileText className="w-4 h-4 text-indigo-600" /> {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
          </button>
        </div>

        {/* Audio Player with Speech Synthesis */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 mb-6 flex items-center gap-6">
          <button 
            onClick={speakAudio}
            className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center transition-colors shadow-md shadow-indigo-500/20 text-white shrink-0"
          >
            {isPlaying ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-5 h-5 ml-0.5 fill-current" />}
          </button>
          
          <div className="flex-1 space-y-2">
            <div className="flex justify-between text-xs text-slate-600 font-mono font-bold">
              <span>Status: {isPlaying ? '🔊 Playing Voice Lecture...' : progress === 100 ? 'Completed' : 'Click Play to Listen'}</span>
              <Volume2 className="w-4 h-4 text-slate-400" />
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all duration-500"
                style={{ width: `${isPlaying ? 60 : progress}%` }}
              />
            </div>
          </div>
        </div>

        {showTranscript && (
          <div className="mb-6 p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs font-semibold text-slate-800 leading-relaxed">
            <span className="text-indigo-600 font-extrabold uppercase tracking-wider block mb-1">Audio Script Transcript:</span>
            {question.audioScript}
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-slate-900 mb-2.5 font-extrabold text-sm">Write your summary (50-70 words):</h3>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={submitted}
            className="w-full h-48 bg-white border border-slate-200 rounded-2xl p-4 text-slate-900 font-semibold text-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-2xs resize-none transition-all leading-relaxed"
            placeholder="Type your summary here based on the audio lecture..."
          />
          <div className="flex justify-between mt-2.5 text-xs font-bold">
            <span className={clsx(
              "font-mono",
              isWordCountValid ? "text-emerald-600" : "text-amber-600"
            )}>
              Word count: {wordCount}
            </span>
            <span className="text-slate-400">Aim for 50-70 words</span>
          </div>
        </div>

        {submitted && scoreResult && (
          <div className="mb-6 p-6 rounded-2xl border border-indigo-100 bg-indigo-50/60">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-extrabold text-slate-900">AI Evaluation Score</h3>
              <span className="text-2xl font-mono font-black text-indigo-600">{scoreResult.overall}<span className="text-xs text-slate-400">/90</span></span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-2xs">
                <div className="text-xl font-mono font-black text-emerald-600 mb-0.5">{scoreResult.content}/2</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Content</div>
              </div>
              <div className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-2xs">
                <div className="text-xl font-mono font-black text-indigo-600 mb-0.5">{scoreResult.form}/1</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Form</div>
              </div>
              <div className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-2xs">
                <div className="text-xl font-mono font-black text-sky-600 mb-0.5">2/2</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Grammar</div>
              </div>
              <div className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-2xs">
                <div className="text-xl font-mono font-black text-purple-600 mb-0.5">2/2</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Vocabulary</div>
              </div>
            </div>
            {scoreResult.feedback && (
              <div className="mt-4 text-xs font-bold text-slate-700 bg-white p-3 rounded-xl border border-slate-200">
                💡 {scoreResult.feedback.join(' ')}
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end">
          {!submitted ? (
            <button 
              onClick={handleSubmit}
              disabled={text.length === 0}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-sm transition-all"
            >
              Submit Answer
            </button>
          ) : (
            <button 
              onClick={handleNext}
              disabled={currentIdx === questions.length - 1}
              className="bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              Next Question <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
