'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, Play, RotateCcw, AlertCircle } from 'lucide-react';
import { cn } from '../ui/GlassCard';
import GradientButton from '../ui/GradientButton';
import CountdownTimer from './CountdownTimer';

export type RecorderStatus = 'idle' | 'preparing' | 'recording' | 'completed';

interface AudioRecorderProps {
  prepTime?: number;
  recordTime: number;
  onRecordingComplete: (blob: Blob) => void;
  onRecordingStart?: () => void;
  status?: RecorderStatus;
}

export default function AudioRecorder({
  prepTime = 0,
  recordTime,
  onRecordingComplete,
  onRecordingStart,
  status: controlledStatus,
}: AudioRecorderProps) {
  const [internalStatus, setInternalStatus] = useState<RecorderStatus>(prepTime > 0 ? 'preparing' : 'idle');
  const status = controlledStatus || internalStatus;
  
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  const handlePrepComplete = () => {
    startRecording();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        onRecordingComplete(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start(100);
      setInternalStatus('recording');
      onRecordingStart?.();
    } catch (err) {
      console.error('Microphone access error:', err);
      setError('Microphone access denied or not available.');
      setInternalStatus('idle');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setInternalStatus('completed');
    }
  };

  const resetRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setInternalStatus(prepTime > 0 ? 'preparing' : 'idle');
    setError(null);
  };

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, [audioUrl]);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
      {error && (
        <div className="flex items-center gap-2 text-red-400 bg-red-500/10 px-4 py-2 rounded-lg mb-6 text-sm">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {status === 'idle' && !error && (
        <GradientButton onClick={startRecording} size="lg" icon={<Mic />}>
          Start Recording
        </GradientButton>
      )}

      {status === 'preparing' && (
        <CountdownTimer
          totalSeconds={prepTime}
          onComplete={handlePrepComplete}
          label="Preparation Time"
          type="preparation"
        />
      )}

      {status === 'recording' && (
        <div className="flex flex-col items-center w-full">
          <div className="relative w-32 h-32 flex items-center justify-center mb-8">
            <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping" />
            <div className="absolute inset-2 bg-red-500/40 rounded-full animate-pulse" />
            <div className="relative bg-red-500 rounded-full w-16 h-16 flex items-center justify-center text-white shadow-[0_0_30px_rgba(239,68,68,0.5)]">
              <Mic size={32} />
            </div>
          </div>
          
          <div className="w-full mb-8">
            <CountdownTimer
              totalSeconds={recordTime}
              onComplete={stopRecording}
              label="Recording..."
              type="section"
            />
          </div>

          <div className="flex gap-2 items-end h-12 w-full justify-center opacity-70">
            {/* Fake Waveform for visual feedback */}
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="w-1.5 bg-red-400 rounded-full animate-pulse"
                style={{ 
                  height: `${Math.max(20, Math.random() * 100)}%`,
                  animationDuration: `${0.3 + Math.random() * 0.5}s`,
                  animationDelay: `${Math.random() * 0.5}s` 
                }}
              />
            ))}
          </div>
          
          <GradientButton 
            variant="secondary" 
            onClick={stopRecording}
            className="mt-8 bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/30"
            icon={<Square size={16} />}
          >
            Stop Early
          </GradientButton>
        </div>
      )}

      {status === 'completed' && audioUrl && (
        <div className="flex flex-col items-center w-full space-y-6">
          <div className="text-emerald-400 font-medium flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            Recording Complete
          </div>
          
          <audio src={audioUrl} controls className="w-full h-12 outline-none" />
          
          <GradientButton variant="outline" onClick={resetRecording} icon={<RotateCcw size={16} />}>
            Record Again
          </GradientButton>
        </div>
      )}

      {/* Status Bar */}
      <div className="flex w-full mt-8 h-1 rounded-full overflow-hidden bg-white/5">
        <div className={cn('h-full w-1/4 transition-colors', status === 'idle' ? 'bg-gray-500' : 'bg-white/10')} />
        <div className={cn('h-full w-1/4 transition-colors', status === 'preparing' ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]' : 'bg-white/10')} />
        <div className={cn('h-full w-1/4 transition-colors', status === 'recording' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-white/10')} />
        <div className={cn('h-full w-1/4 transition-colors', status === 'completed' ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]' : 'bg-white/10')} />
      </div>
    </div>
  );
}
