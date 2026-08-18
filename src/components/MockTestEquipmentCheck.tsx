'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Headphones, Mic, Volume2, CheckCircle2, AlertCircle, Play, Square, 
  Sparkles, ArrowRight, Shield, RefreshCw, VolumeX, Check, Info, Radio
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MockTestEquipmentCheckProps {
  testTitle: string;
  onProceed: () => void;
  onCancel: () => void;
}

export default function MockTestEquipmentCheck({
  testTitle,
  onProceed,
  onCancel,
}: MockTestEquipmentCheckProps) {
  // Equipment step status
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioTested, setAudioTested] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [micAudioUrl, setMicAudioUrl] = useState<string | null>(null);
  const [isPlayingRecorded, setIsPlayingRecorded] = useState(false);
  const [micTested, setMicTested] = useState(false);
  const [micVolumeLevel, setMicVolumeLevel] = useState(0);

  const [agreedToRules, setAgreedToRules] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const recordedAudioElemRef = useRef<HTMLAudioElement | null>(null);

  // Clean up media streams and audio context on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  // 1. Play synthesized sample audio tone / speech
  const handlePlaySampleAudio = () => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);

    try {
      // Use Web Speech API or Web Audio tone
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(
          "Welcome to the Pearson PTE Academic Equipment Check. If you can hear this voice clearly in your headset, your sound system is functioning properly."
        );
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        utterance.onend = () => {
          setIsPlayingAudio(false);
          setAudioTested(true);
        };
        utterance.onerror = () => {
          setIsPlayingAudio(false);
          setAudioTested(true);
        };
        window.speechSynthesis.speak(utterance);
      } else {
        // Fallback tone
        const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        osc.start();
        setTimeout(() => {
          osc.stop();
          ctx.close();
          setIsPlayingAudio(false);
          setAudioTested(true);
        }, 2000);
      }
    } catch (e) {
      setIsPlayingAudio(false);
      setAudioTested(true);
    }
  };

  // 2. Microphone testing with live waveform & playback
  const handleStartMicRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setMicAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      // Set up volume level meter
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        setMicVolumeLevel(Math.min(100, Math.round((avg / 128) * 100)));
        animationFrameRef.current = requestAnimationFrame(updateVolume);
      };
      updateVolume();

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      const timer = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 4) {
            clearInterval(timer);
            handleStopMicRecording();
            return 5;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      alert('Microphone access is required to take the PTE speaking test. Please allow microphone permissions in your browser.');
    }
  };

  const handleStopMicRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    setIsRecording(false);
    setMicVolumeLevel(0);
  };

  const handlePlayRecordedVoice = () => {
    if (!micAudioUrl) return;
    if (recordedAudioElemRef.current) {
      recordedAudioElemRef.current.pause();
    }
    const audio = new Audio(micAudioUrl);
    recordedAudioElemRef.current = audio;
    setIsPlayingRecorded(true);
    audio.onended = () => {
      setIsPlayingRecorded(false);
      setMicTested(true);
    };
    audio.play().catch(() => setIsPlayingRecorded(false));
  };

  const isReadyToStart = audioTested && (micTested || micAudioUrl !== null) && agreedToRules;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-[28px] max-w-3xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col"
      >
        {/* Header */}
        <div className="bg-[#0f172a] text-white p-6 sm:p-7 relative overflow-hidden shrink-0">
          <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400 shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold tracking-widest uppercase bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 px-2 py-0.5 rounded-md">
                    Pearson PTE Exam Simulator
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1 tracking-tight">
                  Headphone & Audio Readiness Check
                </h2>
                <p className="text-xs text-slate-300 font-medium mt-0.5">
                  {testTitle} • Equipment Calibration Required
                </p>
              </div>
            </div>

            <button
              onClick={onCancel}
              className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition-colors"
              title="Cancel Exam"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-6 flex-1">
          
          {/* Important Notice Callout */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-amber-950 uppercase tracking-wide">
                Please Put On Your Headphones / Headset Now
              </h4>
              <p className="text-xs text-amber-900 font-medium mt-0.5 leading-relaxed">
                PTE Academic requires a working headset with microphone. To ensure accurate AI speech evaluation and clear audio playback during the exam, please complete the checks below.
              </p>
            </div>
          </div>

          {/* 2-Column Equipment Check Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Step 1: Headphone & Sound Check */}
            <div className={`p-5 rounded-2xl border transition-all ${
              audioTested ? 'bg-emerald-50/40 border-emerald-200' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-indigo-600" />
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    1. Headset Sound Check
                  </h4>
                </div>
                {audioTested && (
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Check className="w-3 h-3" /> Audio Verified
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 font-medium mb-4">
                Click the button below to play a test audio sample through your headphones.
              </p>

              <button
                type="button"
                onClick={handlePlaySampleAudio}
                disabled={isPlayingAudio}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs ${
                  isPlayingAudio 
                    ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <Radio className="w-4 h-4 animate-pulse text-indigo-600" />
                    <span>Playing Sound Sample...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{audioTested ? 'Re-Play Sample Audio' : 'Play Sample Audio'}</span>
                  </>
                )}
              </button>

              <label className="flex items-center gap-2.5 mt-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={audioTested}
                  onChange={(e) => setAudioTested(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                />
                <span className="text-[11px] font-bold text-slate-700">
                  I can hear the test sound clearly in both ears
                </span>
              </label>
            </div>

            {/* Step 2: Microphone & Speech Test */}
            <div className={`p-5 rounded-2xl border transition-all ${
              micTested ? 'bg-emerald-50/40 border-emerald-200' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4 text-indigo-600" />
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    2. Microphone Check
                  </h4>
                </div>
                {micTested && (
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Check className="w-3 h-3" /> Mic Verified
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 font-medium mb-3">
                Say: <em>&quot;Testing microphone one, two, three&quot;</em> and listen back.
              </p>

              {/* Recording & Playback Controls */}
              <div className="space-y-2.5">
                {!isRecording ? (
                  <button
                    type="button"
                    onClick={handleStartMicRecording}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2 transition-all shadow-xs"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>{micAudioUrl ? 'Re-Record Voice Test (5s)' : 'Record Voice Test (5s)'}</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-3 bg-rose-50 border border-rose-200 p-2.5 rounded-xl">
                    <div className="w-3 h-3 rounded-full bg-rose-600 animate-ping" />
                    <span className="text-xs font-bold text-rose-700 font-mono flex-1">
                      Recording: 00:0{recordingSeconds} / 00:05
                    </span>
                    <button
                      type="button"
                      onClick={handleStopMicRecording}
                      className="px-3 py-1 bg-rose-600 text-white text-xs font-bold rounded-lg"
                    >
                      Done
                    </button>
                  </div>
                )}

                {/* Live Volume Meter when recording */}
                {isRecording && (
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-2 transition-all duration-75"
                      style={{ width: `${Math.max(5, micVolumeLevel)}%` }}
                    />
                  </div>
                )}

                {/* Playback Voice */}
                {micAudioUrl && !isRecording && (
                  <button
                    type="button"
                    onClick={handlePlayRecordedVoice}
                    disabled={isPlayingRecorded}
                    className="w-full py-2 px-3 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2 transition-all"
                  >
                    <Play className="w-3 h-3 fill-current text-indigo-600" />
                    <span>{isPlayingRecorded ? 'Playing Your Recording...' : 'Play Back My Voice'}</span>
                  </button>
                )}
              </div>

              <label className="flex items-center gap-2.5 mt-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={micTested}
                  onChange={(e) => setMicTested(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                />
                <span className="text-[11px] font-bold text-slate-700">
                  My microphone is clear without background noise
                </span>
              </label>
            </div>

          </div>

          {/* Exam Rules & Timing Overview */}
          <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-xs text-slate-700 space-y-3">
            <h4 className="text-xs font-extrabold text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-indigo-600" />
              <span>Official Exam Rules & Timing Structure</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center font-bold">
              <div className="p-2.5 rounded-xl bg-white border border-indigo-100/80 shadow-2xs">
                <span className="text-[10px] text-slate-400 uppercase block">Part 1</span>
                <span className="text-slate-900 text-xs block">Speaking & Writing</span>
                <span className="text-indigo-600 text-[11px] font-mono">54 – 67 Mins</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-indigo-100/80 shadow-2xs">
                <span className="text-[10px] text-slate-400 uppercase block">Part 2</span>
                <span className="text-slate-900 text-xs block">Reading Module</span>
                <span className="text-indigo-600 text-[11px] font-mono">29 – 30 Mins</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-indigo-100/80 shadow-2xs">
                <span className="text-[10px] text-slate-400 uppercase block">Part 3</span>
                <span className="text-slate-900 text-xs block">Listening Module</span>
                <span className="text-indigo-600 text-[11px] font-mono">30 – 43 Mins</span>
              </div>
            </div>

            <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11px] font-medium pt-1">
              <li>Once you click <strong>Start Exam</strong>, the official timer starts running automatically.</li>
              <li>Do not remove your headphones or switch browser tabs during the test.</li>
              <li>Ensure your room is quiet. AI scoring will grade speech fluency, pronunciation, and content.</li>
            </ul>
          </div>

          {/* Acknowledgement Checkbox */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreedToRules}
                onChange={(e) => setAgreedToRules(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
              />
              <span className="text-xs font-bold text-slate-900">
                I confirm my headphones and microphone are working properly, and I am ready to begin the full mock exam under timed conditions.
              </span>
            </label>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4 shrink-0">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-bold transition-colors"
          >
            Cancel & Exit
          </button>

          <button
            type="button"
            onClick={onProceed}
            disabled={!isReadyToStart}
            className={`px-7 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all shadow-md ${
              isReadyToStart
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-indigo-500/20'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>Start Official Mock Exam</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
