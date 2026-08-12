"use client";

import React, { useState, useEffect, useRef } from "react";

interface AudioPlayerProps {
  audioTextPrompt?: string;
  audioUrl?: string;
  autoPlayDelaySeconds?: number;
  onAudioEnded?: () => void;
  singlePlayOnly?: boolean;
}

export default function AudioPlayer({
  audioTextPrompt,
  audioUrl,
  autoPlayDelaySeconds = 3,
  onAudioEnded,
  singlePlayOnly = true,
}: AudioPlayerProps) {
  const [status, setStatus] = useState<"countdown" | "playing" | "ended">("countdown");
  const [countdownLeft, setCountdownLeft] = useState(autoPlayDelaySeconds);
  const [playedCount, setPlayedCount] = useState(0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Load available system TTS voices (e.g. Microsoft David, Microsoft Zira, etc.)
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const loadVoices = () => {
      const availVoices = window.speechSynthesis.getVoices();
      if (availVoices.length > 0) {
        setVoices(availVoices);

        // Check localStorage saved preference first
        const savedVoice = localStorage.getItem("pte_selected_voice");
        if (savedVoice && availVoices.some((v) => v.voiceURI === savedVoice)) {
          setSelectedVoiceURI(savedVoice);
          return;
        }

        // Default to Microsoft David - English (United States) (en-US) matching user screenshot preference
        const davidVoice = availVoices.find((v) =>
          v.name.includes("Microsoft David") || (v.name.includes("David") && v.lang.includes("en"))
        );
        if (davidVoice) {
          setSelectedVoiceURI(davidVoice.voiceURI);
          return;
        }

        // Fallback to any en-US voice or first voice
        const enUsVoice = availVoices.find((v) => v.lang === "en-US" || v.lang.startsWith("en"));
        if (enUsVoice) {
          setSelectedVoiceURI(enUsVoice.voiceURI);
        } else {
          setSelectedVoiceURI(availVoices[0].voiceURI);
        }
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === "countdown") {
      if (countdownLeft > 0) {
        timer = setTimeout(() => setCountdownLeft((prev) => prev - 1), 1000);
      } else {
        playAudio();
      }
    }
    return () => clearTimeout(timer);
  }, [status, countdownLeft]);

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const voiceURI = e.target.value;
    setSelectedVoiceURI(voiceURI);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("pte_selected_voice", voiceURI);
      } catch (err) {}
    }
  };

  const playAudio = () => {
    if (singlePlayOnly && playedCount >= 1) return;

    setStatus("playing");
    setPlayedCount((prev) => prev + 1);

    if (audioUrl) {
      if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.error("Audio playback error:", err);
          speakTextFallback();
        });
      }
    } else if (audioTextPrompt && typeof window !== "undefined" && window.speechSynthesis) {
      speakTextFallback();
    } else {
      setTimeout(() => {
        setStatus("ended");
        if (onAudioEnded) onAudioEnded();
      }, 3000);
    }
  };

  const speakTextFallback = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setStatus("ended");
      if (onAudioEnded) onAudioEnded();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(audioTextPrompt || "");
    utterance.rate = 0.95;
    utterance.lang = "en-US";

    // Assign selected system voice (Microsoft David / Zira / etc.)
    if (voices.length > 0 && selectedVoiceURI) {
      const chosenVoice = voices.find((v) => v.voiceURI === selectedVoiceURI);
      if (chosenVoice) {
        utterance.voice = chosenVoice;
      }
    }

    utterance.onend = () => {
      setStatus("ended");
      if (onAudioEnded) onAudioEnded();
    };
    utterance.onerror = () => {
      setStatus("ended");
      if (onAudioEnded) onAudioEnded();
    };
    synthUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-3 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-3 h-3 rounded-full ${
              status === "countdown"
                ? "bg-amber-500 animate-pulse"
                : status === "playing"
                ? "bg-indigo-600 animate-ping"
                : "bg-emerald-500"
            }`}
          />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
            {status === "countdown" && `Audio Starting in ${countdownLeft}s`}
            {status === "playing" && "Playing Audio Prompt..."}
            {status === "ended" && "Audio Complete (Played 1/1)"}
          </span>
        </div>

        {status === "playing" && (
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-4 bg-indigo-600 animate-wave-1 rounded-full" />
            <div className="w-1.5 h-6 bg-indigo-500 animate-wave-2 rounded-full" />
            <div className="w-1.5 h-3 bg-indigo-700 animate-wave-3 rounded-full" />
            <div className="w-1.5 h-5 bg-indigo-600 animate-wave-4 rounded-full" />
          </div>
        )}
      </div>

      {/* Voice Selection Dropdown (Matching screenshot) */}
      {voices.length > 0 && (
        <div className="pt-2 border-t border-slate-100 space-y-1">
          <label className="block text-[11px] font-semibold text-slate-500">
            Choose a realistic text-to-speech engine available on your system.
          </label>
          <select
            value={selectedVoiceURI}
            onChange={handleVoiceChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            {voices.map((v) => (
              <option key={v.voiceURI} value={v.voiceURI}>
                {v.name} ({v.lang})
              </option>
            ))}
          </select>
        </div>
      )}

      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => {
            setStatus("ended");
            if (onAudioEnded) onAudioEnded();
          }}
          className="hidden"
        />
      )}

      {status === "ended" && !singlePlayOnly && (
        <button
          onClick={playAudio}
          className="self-start text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 mt-1"
        >
          Re-play Prompt (Practice Mode)
        </button>
      )}
    </div>
  );
}
