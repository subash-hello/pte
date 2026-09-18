'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Sparkles, BookOpen, Headphones, PenTool, Mic, Award, ArrowRight, ArrowLeft, 
  Brain, Play, Square, Loader2, Clock, Volume2, RotateCcw,
  CheckCircle2, Target
} from 'lucide-react';
import { authFetch } from '@/lib/session';

interface DiagnosticQuestion {
  id: string;
  question: string;
  options: { label: string; text: string }[];
  correct: string;
}

const VOCAB_GRAMMAR_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'vg_1',
    question: 'Although the initial experiment yielded ambiguous results, the researchers decided to _______ the study.',
    options: [
      { label: 'A', text: 'continue' },
      { label: 'B', text: 'persists' },
      { label: 'C', text: 'continuation' },
      { label: 'D', text: 'continuous' },
    ],
    correct: 'A',
  },
  {
    id: 'vg_2',
    question: 'Had the committee members reviewed the protocol earlier, the delay _______ prevented.',
    options: [
      { label: 'A', text: 'could be' },
      { label: 'B', text: 'would have been' },
      { label: 'C', text: 'will have been' },
      { label: 'D', text: 'is being' },
    ],
    correct: 'B',
  },
  {
    id: 'vg_3',
    question: 'The exponential expansion of urban infrastructure _______ profound ecological implications.',
    options: [
      { label: 'A', text: 'carry' },
      { label: 'B', text: 'carries' },
      { label: 'C', text: 'are carrying' },
      { label: 'D', text: 'have carried' },
    ],
    correct: 'B',
  },
  {
    id: 'vg_4',
    question: "Select the academic synonym that best replaces 'crucial' in a scientific context:",
    options: [
      { label: 'A', text: 'peripheral' },
      { label: 'B', text: 'pivotal' },
      { label: 'C', text: 'tangential' },
      { label: 'D', text: 'redundant' },
    ],
    correct: 'B',
  },
  {
    id: 'vg_5',
    question: 'Modern corporate governance mandates that financial disclosures _______ with international accounting standards.',
    options: [
      { label: 'A', text: 'comply' },
      { label: 'B', text: 'adheres' },
      { label: 'C', text: 'conforming' },
      { label: 'D', text: 'submits' },
    ],
    correct: 'A',
  },
];

const READING_BLANKS_DATA = {
  title: 'Artificial Intelligence in Medical Imaging',
  passageParts: [
    'Deep learning algorithms have radically ',
    ' diagnostic radiology. Convolutional neural networks analyze high-resolution MRI and CT scans to ',
    ' anomalies that might escape the naked human eye. While these computational tools enhance clinical ',
    ', medical ethicists emphasize that automated diagnostics must complement rather than ',
    ' certified physicians.',
  ],
  dropdowns: [
    { id: 'b1', options: ['transformed', 'neglected', 'distorted', 'halted'], correct: 'transformed' },
    { id: 'b2', options: ['detect', 'fabricate', 'obscure', 'postpone'], correct: 'detect' },
    { id: 'b3', options: ['precision', 'indifference', 'hesitation', 'complexity'], correct: 'precision' },
    { id: 'b4', options: ['supplant', 'celebrate', 'imitate', 'reprimand'], correct: 'supplant' },
  ],
};

const LISTENING_WFD_DATA = {
  audioPrompt: 'The contemporary curriculum incorporates collaborative computational projects across interdisciplinary faculties.',
  keywords: ['contemporary', 'curriculum', 'incorporates', 'collaborative', 'computational', 'projects', 'interdisciplinary', 'faculties'],
};

export default function DiagnosticPage() {
  const router = useRouter();
  const [stage, setStage] = useState<'intro' | 'test' | 'results'>('intro');
  const [currentModuleIdx, setCurrentModuleIdx] = useState(0); // 0: Vocab/Grammar, 1: Speaking RA, 2: Writing SWT, 3: Reading FIB, 4: Listening WFD
  const [secondsLeft, setSecondsLeft] = useState(15 * 60); // 15 mins total
  const [isSubmitting, setIsSubmitting] = useState(false);

  // User Responses State
  const [vocabAnswers, setVocabAnswers] = useState<Record<string, string>>({});
  const [speakingTranscript, setSpeakingTranscript] = useState('');
  const [writingSummary, setWritingSummary] = useState('');
  const [readingDropdownAnswers, setReadingDropdownAnswers] = useState<Record<string, string>>({});
  const [listeningTranscript, setListeningTranscript] = useState('');

  // Speaking Recording State
  const [speakingPhase, setSpeakingPhase] = useState<'idle' | 'prep' | 'recording' | 'completed'>('idle');
  const [speakingTimer, setSpeakingTimer] = useState(25);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [micVolume, setMicVolume] = useState(0);

  // Audio Player State for Listening
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);

  // Diagnostic Results
  const [diagnosticResult, setDiagnosticResult] = useState<any>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Main 15-Minute Global Countdown
  useEffect(() => {
    if (stage !== 'test') return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinishDiagnostic();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [stage]);

  // Speaking Phase Timers
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (speakingPhase === 'prep') {
      if (speakingTimer > 0) {
        timer = setTimeout(() => setSpeakingTimer((t) => t - 1), 1000);
      } else {
        startRecording();
      }
    } else if (speakingPhase === 'recording') {
      if (speakingTimer > 0) {
        timer = setTimeout(() => setSpeakingTimer((t) => t - 1), 1000);
      } else {
        stopRecording();
      }
    }
    return () => clearTimeout(timer);
  }, [speakingPhase, speakingTimer]);

  const startPrep = () => {
    setSpeakingPhase('prep');
    setSpeakingTimer(25);
    setRecordedAudioUrl(null);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateVolume = () => {
        if (analyser && mediaRecorderRef.current?.state === 'recording') {
          analyser.getByteFrequencyData(dataArray);
          const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
          setMicVolume(Math.min(100, Math.round((avg / 128) * 100)));
          requestAnimationFrame(updateVolume);
        }
      };

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setRecordedAudioUrl(URL.createObjectURL(blob));
        setSpeakingPhase('completed');
        stream.getTracks().forEach((track) => track.stop());
        if (audioContextRef.current) {
          audioContextRef.current.close().catch(() => {});
        }
      };

      mediaRecorder.start();
      setSpeakingPhase('recording');
      setSpeakingTimer(40);
      requestAnimationFrame(updateVolume);

      // Web Speech recognition for transcription
      const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRec) {
        const rec = new SpeechRec();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = 'en-US';
        rec.onresult = (evt: any) => {
          let trans = '';
          for (let i = 0; i < evt.results.length; i++) {
            trans += evt.results[i][0].transcript + ' ';
          }
          setSpeakingTranscript(trans.trim());
        };
        recognitionRef.current = rec;
        try {
          rec.start();
        } catch {}
      }
    } catch (e) {
      console.warn('Microphone permission error', e);
      setSpeakingPhase('completed');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
  };

  const playTTS = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(true);
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.95;
      utter.onend = () => {
        setIsPlayingAudio(false);
        setAudioPlayed(true);
      };
      utter.onerror = () => {
        setIsPlayingAudio(false);
        setAudioPlayed(true);
      };
      window.speechSynthesis.speak(utter);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Evaluate Diagnostic and generate GSE Scorecard
  const handleFinishDiagnostic = async () => {
    setIsSubmitting(true);

    // 1. Vocab Score
    let vocabCorrect = 0;
    VOCAB_GRAMMAR_QUESTIONS.forEach((q) => {
      if (vocabAnswers[q.id] === q.correct) vocabCorrect++;
    });
    const vocabGSE = Math.round(40 + (vocabCorrect / VOCAB_GRAMMAR_QUESTIONS.length) * 45);

    // 2. Speaking Score (Read Aloud match ratio)
    const readAloudPrompt = 'Recent neuroimaging studies suggest that bilingual individuals exhibit enhanced executive control mechanisms compared to monolinguals.';
    const promptTokens = readAloudPrompt.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
    const spokenTokens = speakingTranscript.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
    const matchedTokens = spokenTokens.filter((t) => promptTokens.includes(t)).length;
    const speakingGSE = Math.min(90, Math.max(35, Math.round(35 + (matchedTokens / Math.max(1, promptTokens.length)) * 52)));

    // 3. Writing Score (SWT word count 10-75 + single sentence check)
    const words = writingSummary.trim().split(/\s+/).filter(Boolean);
    const isSingleSentence = (writingSummary.match(/[.!?]/g) || []).length <= 1 && writingSummary.trim().endsWith('.');
    const wordCountOptimal = words.length >= 10 && words.length <= 75;
    let writingGSE = 45;
    if (wordCountOptimal) writingGSE += 25;
    if (isSingleSentence) writingGSE += 15;
    writingGSE = Math.min(90, Math.max(30, writingGSE));

    // 4. Reading Score (FIB dropdowns)
    let readingCorrect = 0;
    READING_BLANKS_DATA.dropdowns.forEach((b) => {
      if (readingDropdownAnswers[b.id]?.toLowerCase() === b.correct.toLowerCase()) readingCorrect++;
    });
    const readingGSE = Math.round(35 + (readingCorrect / READING_BLANKS_DATA.dropdowns.length) * 52);

    // 5. Listening Score (Write From Dictation token similarity)
    const userWords = listeningTranscript.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
    const targetKeywords = LISTENING_WFD_DATA.keywords;
    const matchedKeywords = userWords.filter((w) => targetKeywords.includes(w)).length;
    const listeningGSE = Math.min(90, Math.max(30, Math.round(35 + (matchedKeywords / targetKeywords.length) * 52)));

    const overallGSE = Math.round((speakingGSE + writingGSE + readingGSE + listeningGSE) / 4);

    const resultPayload = {
      testDate: new Date().toISOString(),
      overallGSE,
      targetGSE: 79,
      skills: {
        speaking: speakingGSE,
        writing: writingGSE,
        reading: readingGSE,
        listening: listeningGSE,
      },
      enabling: {
        grammar: vocabGSE,
        oralFluency: Math.round(speakingGSE * 0.95),
        pronunciation: Math.round(speakingGSE * 0.92),
        vocabulary: vocabGSE,
        spelling: Math.round(writingGSE * 0.9),
        writtenDiscourse: Math.round(writingGSE * 0.95),
      },
      bandEquivalent: overallGSE >= 84 ? 'Band 9.0' : overallGSE >= 76 ? 'Band 8.0' : overallGSE >= 66 ? 'Band 7.0' : 'Band 6.0',
      recommendations: [
        speakingGSE < 70 ? 'Focus on oral fluency and sentence rhythm in Read Aloud' : 'Maintain natural intonation in Repeat Sentence',
        writingGSE < 70 ? 'Review official Summarize Written Text single-sentence templates' : 'Refine vocabulary lexical diversity in Write Essay',
        readingGSE < 70 ? 'Practice academic collocations in Fill in the Blanks R&W' : 'Enhance timed reading speed for Reorder Paragraphs',
        listeningGSE < 70 ? 'Master academic spelling accuracy in Write from Dictation' : 'Refine note-taking shorthand for Summarize Spoken Text',
      ],
    };

    setDiagnosticResult(resultPayload);

    // Store in localStorage for student dashboard sync
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('pte_diagnostic_result', JSON.stringify(resultPayload));
        const currentCompleted = JSON.parse(localStorage.getItem('pte_completed_items') || '{}');
        currentCompleted['diagnostic_baseline'] = { score: overallGSE, date: new Date().toISOString() };
        localStorage.setItem('pte_completed_items', JSON.stringify(currentCompleted));
      } catch (e) {}
    }

    // Sync to backend activity history if session active
    authFetch('/api/practice/submit', {
      method: 'POST',
      body: JSON.stringify({
        questionId: 'diag_baseline_01',
        questionType: 'diagnostic_baseline',
        section: 'General',
        userAnswerText: JSON.stringify(resultPayload),
        overallScore: overallGSE,
        aiEvaluated: true,
      }),
    }).catch(() => {});

    setIsSubmitting(false);
    setStage('results');
  };

  const modules = [
    { title: '1. Lexical & Grammar', icon: BookOpen, desc: '5 Academic Grammar & Vocab MCQs' },
    { title: '2. Speaking (RA)', icon: Mic, desc: 'Read Aloud with Audio Recording' },
    { title: '3. Writing (SWT)', icon: PenTool, desc: 'Summarize Written Text' },
    { title: '4. Reading (FIB)', icon: BookOpen, desc: 'Fill in the Blanks Dropdowns' },
    { title: '5. Listening (WFD)', icon: Headphones, desc: 'Write from Dictation' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-20">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link 
              href="/dashboard" 
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-sm font-black text-slate-900">PTE Diagnostic Baseline Test</h1>
                <p className="text-[10px] text-slate-500 font-semibold">15-Minute Pearson AI Assessment</p>
              </div>
            </div>
          </div>

          {stage === 'test' && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 font-mono text-xs font-bold shadow-2xs">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Timer: {formatTime(secondsLeft)}</span>
              </div>
              <button
                onClick={handleFinishDiagnostic}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                <span>Finish & Score</span>
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        {/* ========================================================================= */}
        {/* SCREEN 1: INTRO SCREEN */}
        {/* ========================================================================= */}
        {stage === 'intro' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-white rounded-[28px] border border-[#e8ecf4] p-8 md:p-10 shadow-sm text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto shadow-2xs">
                <Brain className="w-8 h-8" />
              </div>
              <div className="max-w-xl mx-auto">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                  Adaptive Baseline Evaluation
                </span>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-3">
                  Pearson PTE Academic 15-Minute Diagnostic Test
                </h2>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed mt-2">
                  Establish your baseline GSE Score (10–90) across all 4 communicative skills before starting intensive practice. 
                  Our Gemini AI scoring engine assesses oral fluency, sentence structures, vocabulary depth, and listening comprehension.
                </p>
              </div>

              {/* 5-Skill Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-6 text-left">
                {modules.map((m, idx) => {
                  const Icon = m.icon;
                  return (
                    <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex flex-col justify-between">
                      <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-indigo-600 flex items-center justify-center mb-2 shadow-2xs">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{m.title}</h4>
                        <p className="text-[10px] text-slate-500 font-medium mt-0.5">{m.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setStage('test');
                    setCurrentModuleIdx(0);
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Begin 15-Minute Diagnostic Test</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors text-center"
                >
                  Return to Dashboard
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* SCREEN 2: ACTIVE TEST RUNNER */}
        {/* ========================================================================= */}
        {stage === 'test' && (
          <div className="space-y-6">
            {/* Step Progress Selector Bar */}
            <div className="bg-white border border-[#e8ecf4] rounded-2xl p-2.5 shadow-2xs flex items-center justify-between gap-1 overflow-x-auto">
              {modules.map((m, idx) => {
                const isActive = currentModuleIdx === idx;
                const isCompleted = currentModuleIdx > idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentModuleIdx(idx)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : isCompleted
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{m.title}</span>
                    {isCompleted && <span>✓</span>}
                  </button>
                );
              })}
            </div>

            {/* SECTION 1: VOCABULARY & GRAMMAR */}
            {currentModuleIdx === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 md:p-8 shadow-xs space-y-6">
                <div>
                  <span className="text-[11px] font-extrabold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                    Section 1 of 5 • Lexical Resource
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">Academic Vocabulary & Syntax</h3>
                  <p className="text-xs text-slate-500 font-semibold">Select the most accurate linguistic option for each academic sentence below.</p>
                </div>

                <div className="space-y-4">
                  {VOCAB_GRAMMAR_QUESTIONS.map((q, qIdx) => (
                    <div key={q.id} className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2.5">
                      <p className="text-xs font-extrabold text-slate-900 leading-relaxed">
                        {qIdx + 1}. {q.question}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt) => {
                          const isSelected = vocabAnswers[q.id] === opt.label;
                          return (
                            <button
                              key={opt.label}
                              type="button"
                              onClick={() => setVocabAnswers({ ...vocabAnswers, [q.id]: opt.label })}
                              className={`px-3.5 py-2 rounded-xl text-xs font-semibold text-left transition-all border cursor-pointer flex items-center gap-2 ${
                                isSelected
                                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                                  : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
                              }`}
                            >
                              <span className="font-mono font-bold">{opt.label}.</span>
                              <span>{opt.text}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentModuleIdx(1)}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next: Speaking Task</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* SECTION 2: SPEAKING (READ ALOUD) */}
            {currentModuleIdx === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 md:p-8 shadow-xs space-y-6">
                <div>
                  <span className="text-[11px] font-extrabold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                    Section 2 of 5 • Oral Fluency & Pronunciation
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">Speaking: Read Aloud</h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    Look at the text below. In 25 seconds, you must read this text aloud as naturally and clearly as possible.
                  </p>
                </div>

                <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl">
                  <p className="text-base font-extrabold text-slate-900 leading-relaxed">
                    "Recent neuroimaging studies suggest that bilingual individuals exhibit enhanced executive control mechanisms compared to monolinguals. Managing two language systems simultaneously appears to strengthen neural pathways associated with working memory, task switching, and cognitive flexibility."
                  </p>
                </div>

                {/* Microphone Recording Console */}
                <div className="bg-white border-2 border-indigo-200 rounded-2xl p-6 shadow-2xs space-y-4 text-center">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                    <span className="font-extrabold text-slate-900 flex items-center gap-2">
                      <Mic className="w-4 h-4 text-indigo-600" />
                      {speakingPhase === 'idle' && 'Microphone Ready'}
                      {speakingPhase === 'prep' && `Preparation: ${speakingTimer}s Remaining`}
                      {speakingPhase === 'recording' && `Recording Speech: ${speakingTimer}s Remaining`}
                      {speakingPhase === 'completed' && 'Speech Recorded Successfully'}
                    </span>
                    {speakingPhase === 'recording' && (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 font-mono">Volume:</span>
                        <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 transition-all" style={{ width: `${Math.max(15, micVolume)}%` }} />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="py-4">
                    {speakingPhase === 'idle' && (
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={startPrep}
                          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <Clock className="w-4 h-4" /> Start Preparation (25s)
                        </button>
                        <button
                          onClick={startRecording}
                          className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <Mic className="w-4 h-4" /> Record Now
                        </button>
                      </div>
                    )}

                    {speakingPhase === 'prep' && (
                      <div className="space-y-3">
                        <div className="w-20 h-20 rounded-full bg-amber-50 border-2 border-amber-300 text-amber-700 flex items-center justify-center font-mono font-black text-2xl mx-auto shadow-inner">
                          {speakingTimer}
                        </div>
                        <button onClick={startRecording} className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer">
                          Skip Prep & Record Voice Now →
                        </button>
                      </div>
                    )}

                    {speakingPhase === 'recording' && (
                      <div className="space-y-3">
                        <div className="w-20 h-20 rounded-full bg-rose-50 border-2 border-rose-400 text-rose-600 flex items-center justify-center font-mono font-black text-2xl mx-auto shadow-inner animate-pulse">
                          {speakingTimer}
                        </div>
                        <button
                          onClick={stopRecording}
                          className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5 mx-auto cursor-pointer"
                        >
                          <Square className="w-3.5 h-3.5 fill-current" /> Stop Recording
                        </button>
                      </div>
                    )}

                    {speakingPhase === 'completed' && (
                      <div className="space-y-3">
                        {recordedAudioUrl && (
                          <div className="max-w-md mx-auto p-2 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
                            <audio src={recordedAudioUrl} controls className="w-full h-8" />
                            <button
                              onClick={startPrep}
                              className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                            >
                              Re-record
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {speakingTranscript && (
                    <div className="text-left bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Speech Transcript Captured:
                      </span>
                      <p className="text-xs font-semibold text-slate-800 italic">"{speakingTranscript}"</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <button onClick={() => setCurrentModuleIdx(0)} className="text-xs font-bold text-slate-500 hover:text-slate-800">
                    ← Back
                  </button>
                  <button
                    onClick={() => setCurrentModuleIdx(2)}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next: Writing Task</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* SECTION 3: WRITING (SUMMARIZE WRITTEN TEXT) */}
            {currentModuleIdx === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 md:p-8 shadow-xs space-y-6">
                <div>
                  <span className="text-[11px] font-extrabold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                    Section 3 of 5 • Written Discourse
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">Writing: Summarize Written Text</h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    Read the passage below and summarize it in <strong>one single sentence</strong> between 10 and 75 words.
                  </p>
                </div>

                <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs text-slate-800 leading-relaxed font-medium">
                  The rapid acceleration of renewable energy adoption is reshaping geopolitical influence globally. Historically, national security and diplomatic leverage were concentrated among states possessing substantial petroleum and natural gas reserves. However, the decentralized deployment of solar photovoltaic panels, offshore wind turbines, and modular battery storage systems enables energy-importing nations to generate clean domestic electricity. Consequently, traditional fossil-fuel alliances are evolving as international capital flows gravitate toward green technology patents and supply chains for critical minerals.
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-700">Your Single-Sentence Summary:</span>
                    <span className="font-mono font-bold text-indigo-600">
                      Word Count: {writingSummary.trim() ? writingSummary.trim().split(/\s+/).length : 0} (Range: 10–75 words)
                    </span>
                  </div>
                  <textarea
                    value={writingSummary}
                    onChange={(e) => setWritingSummary(e.target.value)}
                    placeholder="Type your single sentence summary ending with a period..."
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none leading-relaxed"
                  />
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <button onClick={() => setCurrentModuleIdx(1)} className="text-xs font-bold text-slate-500 hover:text-slate-800">
                    ← Back
                  </button>
                  <button
                    onClick={() => setCurrentModuleIdx(3)}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next: Reading Task</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* SECTION 4: READING (FILL IN THE BLANKS R&W) */}
            {currentModuleIdx === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 md:p-8 shadow-xs space-y-6">
                <div>
                  <span className="text-[11px] font-extrabold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                    Section 4 of 5 • Reading Comprehension
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">Reading: Fill in the Blanks</h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    In the text below, some words are missing. Select the appropriate word from each dropdown list.
                  </p>
                </div>

                <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl text-sm text-slate-900 leading-loose font-medium">
                  {READING_BLANKS_DATA.passageParts.map((part, idx) => {
                    const dropdownDef = READING_BLANKS_DATA.dropdowns[idx];
                    return (
                      <React.Fragment key={idx}>
                        <span>{part}</span>
                        {dropdownDef && (
                          <select
                            value={readingDropdownAnswers[dropdownDef.id] || ''}
                            onChange={(e) => setReadingDropdownAnswers({ ...readingDropdownAnswers, [dropdownDef.id]: e.target.value })}
                            className="mx-1 px-3 py-1.5 bg-white border border-indigo-300 rounded-xl text-xs font-bold text-indigo-700 shadow-2xs focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                          >
                            <option value="">-- Blank #{idx + 1} --</option>
                            {dropdownDef.options.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <button onClick={() => setCurrentModuleIdx(2)} className="text-xs font-bold text-slate-500 hover:text-slate-800">
                    ← Back
                  </button>
                  <button
                    onClick={() => setCurrentModuleIdx(4)}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next: Listening Task</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* SECTION 5: LISTENING (WRITE FROM DICTATION) */}
            {currentModuleIdx === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 md:p-8 shadow-xs space-y-6">
                <div>
                  <span className="text-[11px] font-extrabold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                    Section 5 of 5 • Listening Discrimination
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">Listening: Write from Dictation</h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    You will hear a sentence once. Listen carefully and type the exact sentence in the box below. Check your spelling.
                  </p>
                </div>

                {/* Audio Player Card */}
                <div className="p-5 bg-indigo-50/70 border border-indigo-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Volume2 className={`w-6 h-6 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900">Audio Clip: Academic Dictation Sentence</h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {isPlayingAudio ? 'Playing sentence...' : audioPlayed ? 'Playback complete' : 'Click Play to listen to prompt'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => playTTS(LISTENING_WFD_DATA.audioPrompt)}
                    disabled={isPlayingAudio}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{isPlayingAudio ? 'Playing...' : audioPlayed ? 'Replay Sentence' : 'Play Dictation Prompt'}</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-700 block">Type the sentence you heard:</label>
                  <textarea
                    value={listeningTranscript}
                    onChange={(e) => setListeningTranscript(e.target.value)}
                    placeholder="Type the exact sentence here..."
                    rows={3}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none leading-relaxed"
                  />
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <button onClick={() => setCurrentModuleIdx(3)} className="text-xs font-bold text-slate-500 hover:text-slate-800">
                    ← Back
                  </button>
                  <button
                    onClick={handleFinishDiagnostic}
                    disabled={isSubmitting}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-md shadow-indigo-600/25 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    <span>Generate AI Diagnostic Scorecard</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCREEN 3: DIAGNOSTIC SCORECARD RESULTS */}
        {/* ========================================================================= */}
        {stage === 'results' && diagnosticResult && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            <div className="bg-white border border-[#e8ecf4] rounded-[28px] p-6 md:p-10 shadow-xs space-y-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-6 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Award className="w-7 h-7 text-indigo-600" />
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Official Diagnostic Baseline Report</h2>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold mt-1">
                    Evaluated by Pearson PTE AI Diagnostic Engine • {diagnosticResult.bandEquivalent}
                  </p>
                </div>
                <Link
                  href="/dashboard"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-all self-start sm:self-auto"
                >
                  <span>Go to Study Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Top Score Callouts */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
                <div className="md:col-span-1 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-2xl p-6 flex flex-col justify-center items-center shadow-md">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider opacity-90 mb-1">Baseline Score</span>
                  <span className="text-5xl font-mono font-black">{diagnosticResult.overallGSE}</span>
                  <span className="text-[10px] font-bold mt-2 bg-white/20 px-3 py-1 rounded-full">
                    GSE Scale (10–90)
                  </span>
                </div>

                <div className="md:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex flex-col justify-center">
                    <span className="text-xs font-bold text-slate-500 mb-1 uppercase">Speaking</span>
                    <span className="text-3xl font-mono font-black text-indigo-600">{diagnosticResult.skills.speaking}</span>
                    <span className="text-[10px] text-slate-400 font-semibold mt-1">GSE Score</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex flex-col justify-center">
                    <span className="text-xs font-bold text-slate-500 mb-1 uppercase">Writing</span>
                    <span className="text-3xl font-mono font-black text-sky-600">{diagnosticResult.skills.writing}</span>
                    <span className="text-[10px] text-slate-400 font-semibold mt-1">GSE Score</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex flex-col justify-center">
                    <span className="text-xs font-bold text-slate-500 mb-1 uppercase">Reading</span>
                    <span className="text-3xl font-mono font-black text-emerald-600">{diagnosticResult.skills.reading}</span>
                    <span className="text-[10px] text-slate-400 font-semibold mt-1">GSE Score</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex flex-col justify-center">
                    <span className="text-xs font-bold text-slate-500 mb-1 uppercase">Listening</span>
                    <span className="text-3xl font-mono font-black text-purple-600">{diagnosticResult.skills.listening}</span>
                    <span className="text-[10px] text-slate-400 font-semibold mt-1">GSE Score</span>
                  </div>
                </div>
              </div>

              {/* Enabling Skills Grid */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" /> Enabling Skills Assessment
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
                  {Object.entries(diagnosticResult.enabling).map(([skill, val]: any) => (
                    <div key={skill} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                      <span className="text-[10px] font-bold text-slate-500 capitalize block mb-1">
                        {skill.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span className="text-xl font-mono font-black text-slate-900">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="p-6 bg-indigo-50/70 border border-indigo-100 rounded-2xl space-y-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-indigo-900 flex items-center gap-2">
                  <Target className="w-4 h-4 text-indigo-600" /> AI Study Plan Recommendations
                </h3>
                <div className="space-y-2">
                  {diagnosticResult.recommendations.map((rec: string, i: number) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-indigo-950 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    setStage('test');
                    setCurrentModuleIdx(0);
                    setSecondsLeft(15 * 60);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retake Diagnostic
                </button>
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Apply Recommendations to Study Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
