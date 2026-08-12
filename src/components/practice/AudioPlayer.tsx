'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, FileText } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
  autoPlay?: boolean;
  onEnded?: () => void;
  showTranscript?: boolean;
  transcript?: string;
}

export default function AudioPlayer({
  src,
  autoPlay = false,
  onEnded,
  showTranscript = false,
  transcript,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isTranscriptVisible, setIsTranscriptVisible] = useState(showTranscript);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Autoplay prevented:", e));
      setIsPlaying(true);
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress((audioRef.current.currentTime / duration) * 100 || 0);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = (value / 100) * duration;
      setProgress(value);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
    if (value > 0 && isMuted) setIsMuted(false);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const changeSpeed = () => {
    const rates = [0.75, 1, 1.25, 1.5];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  const formatTime = (time: number) => {
    if (!isFinite(time)) return '00:00';
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    onEnded?.();
  };

  return (
    <div className="w-full bg-white border border-[#e8ecf4] rounded-2xl p-4 flex flex-col gap-4 shadow-xs">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        className="hidden"
      />

      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="w-12 h-12 shrink-0 rounded-full bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center text-white transition-all shadow-md shadow-indigo-500/20"
        >
          {isPlaying ? <Pause size={20} className="ml-0" /> : <Play size={20} className="ml-1" />}
        </button>

        <div className="flex-1 flex flex-col gap-1.5">
          <div className="relative h-2 rounded-full bg-slate-100 overflow-visible group">
            <div 
              className="absolute top-0 left-0 h-full bg-indigo-600 rounded-full pointer-events-none"
              style={{ width: `${progress}%` }}
            />
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progress}
              onChange={handleSeek}
              className="absolute top-1/2 -translate-y-1/2 left-0 w-full opacity-0 cursor-pointer h-4"
            />
          </div>
          <div className="flex justify-between text-xs font-mono font-bold text-slate-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={changeSpeed}
            className="w-10 h-8 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-xs font-bold text-slate-700 transition-colors border border-slate-200/80"
          >
            {playbackRate}x
          </button>
          
          <div className="flex items-center gap-2 hidden sm:flex">
            <button onClick={toggleMute} className="text-slate-500 hover:text-slate-900 transition-colors">
              {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 rounded-full bg-slate-200 accent-indigo-600 cursor-pointer"
            />
          </div>

          {transcript && (
            <button
              onClick={() => setIsTranscriptVisible(!isTranscriptVisible)}
              className={`p-2 rounded-xl transition-colors border ${
                isTranscriptVisible 
                  ? "bg-indigo-50 text-indigo-600 border-indigo-200 font-bold" 
                  : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200/80"
              }`}
              title="Toggle Transcript"
            >
              <FileText size={18} />
            </button>
          )}
        </div>
      </div>

      {transcript && isTranscriptVisible && (
        <div className="mt-2 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800 leading-relaxed max-h-48 overflow-y-auto">
          {transcript}
        </div>
      )}
    </div>
  );
}
