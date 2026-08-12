"use client";

import React, { useState, useEffect, useRef } from "react";

interface AudioRecorderProps {
  prepTimeSeconds?: number;
  maxRecordingTimeSeconds?: number;
  onRecordingComplete?: (audioBlob: Blob | null, transcript: string) => void;
  autoStartPrep?: boolean;
}

export default function AudioRecorder({
  prepTimeSeconds = 35,
  maxRecordingTimeSeconds = 40,
  onRecordingComplete,
  autoStartPrep = true,
}: AudioRecorderProps) {
  const [phase, setPhase] = useState<"idle" | "prep" | "recording" | "completed">("idle");
  const [prepLeft, setPrepLeft] = useState(prepTimeSeconds);
  const [recordingLeft, setRecordingLeft] = useState(maxRecordingTimeSeconds);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [liveTranscript, setLiveTranscript] = useState<string>("");
  const [volumeLevel, setVolumeLevel] = useState<number>(0);
  const [isMicGranted, setIsMicGranted] = useState<boolean | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Ref to store latest transcript and avoid stale closures
  const liveTranscriptRef = useRef<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = "en-US";
        rec.onresult = (event: any) => {
          let transcript = "";
          for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript + " ";
          }
          const text = transcript.trim();
          setLiveTranscript(text);
          liveTranscriptRef.current = text;
        };
        recognitionRef.current = rec;
      }
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (phase === "prep") {
      if (prepLeft > 0) {
        timer = setTimeout(() => setPrepLeft((prev) => prev - 1), 1000);
      } else {
        startRecording();
      }
    }
    return () => clearTimeout(timer);
  }, [phase, prepLeft]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (phase === "recording") {
      if (recordingLeft > 0) {
        timer = setTimeout(() => setRecordingLeft((prev) => prev - 1), 1000);
      } else {
        stopRecording();
      }
    }
    return () => clearTimeout(timer);
  }, [phase, recordingLeft]);

  const startPrep = () => {
    setPhase("prep");
    setPrepLeft(prepTimeSeconds);
    setAudioUrl(null);
    setAudioBlob(null);
    setLiveTranscript("");
    liveTranscriptRef.current = "";
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsMicGranted(true);

      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateVolume = () => {
        if (analyser) {
          analyser.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
          setVolumeLevel(Math.min(100, Math.round((average / 128) * 100)));
        }
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
          requestAnimationFrame(updateVolume);
        }
      };

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setAudioBlob(blob);
        setPhase("completed");
        stream.getTracks().forEach((track) => track.stop());
        if (audioContextRef.current) {
          audioContextRef.current.close();
        }

        // Use ref value to prevent stale closure bug
        const capturedTranscript = liveTranscriptRef.current;
        if (onRecordingComplete) {
          onRecordingComplete(blob, capturedTranscript);
        }
      };

      mediaRecorder.start();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (err) {}
      }

      setPhase("recording");
      setRecordingLeft(maxRecordingTimeSeconds);
      requestAnimationFrame(updateVolume);
    } catch (err) {
      console.error("Microphone access error:", err);
      setIsMicGranted(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {}
    }
  };

  const handleTranscriptChange = (newText: string) => {
    setLiveTranscript(newText);
    liveTranscriptRef.current = newText;
    if (onRecordingComplete) {
      onRecordingComplete(audioBlob, newText);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-3.5 h-3.5 rounded-full ${
              phase === "idle"
                ? "bg-slate-400"
                : phase === "prep"
                ? "bg-amber-500 animate-ping"
                : phase === "recording"
                ? "bg-rose-500 animate-pulse"
                : "bg-emerald-500"
            }`}
          />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
            {phase === "idle" && "Ready to Start"}
            {phase === "prep" && `Preparation Time: ${prepLeft}s`}
            {phase === "recording" && `Recording... ${recordingLeft}s left`}
            {phase === "completed" && "Response Recorded"}
          </span>
        </div>

        {phase === "recording" && (
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-mono">Mic Volume:</span>
            <div className="w-24 h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500 transition-all duration-75"
                style={{ width: `${volumeLevel}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-center py-4 gap-4">
        {phase === "idle" && (
          <button
            onClick={startPrep}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all active:scale-95 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
            </svg>
            Start Speaking Item
          </button>
        )}

        {phase === "prep" && (
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-amber-50 border-2 border-amber-300 text-amber-600 text-2xl font-bold font-mono">
              {prepLeft}
              <span className="absolute -bottom-1 text-[10px] uppercase font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                Prep
              </span>
            </div>
            <button
              onClick={startRecording}
              className="text-xs font-bold text-indigo-600 hover:underline"
            >
              Skip Prep & Record Now
            </button>
          </div>
        )}

        {phase === "recording" && (
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-rose-50 border-2 border-rose-300 text-rose-600 text-3xl font-bold font-mono">
              {recordingLeft}
            </div>

            <button
              onClick={stopRecording}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <div className="w-3 h-3 bg-white rounded-xs" />
              Complete Response
            </button>
          </div>
        )}

        {phase === "completed" && audioUrl && (
          <div className="w-full flex flex-col gap-3">
            <audio src={audioUrl} controls className="w-full h-10 rounded" />
            <div className="flex justify-between items-center text-xs text-slate-500 px-1">
              <span className="text-emerald-600 font-bold">✓ Audio Recorded Successfully</span>
              <button
                onClick={startPrep}
                className="text-indigo-600 font-bold hover:underline flex items-center gap-1"
              >
                Re-record Practice
              </button>
            </div>
          </div>
        )}

        {isMicGranted === false && (
          <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 p-2.5 rounded-xl text-center font-semibold">
            Microphone access was denied. Please allow microphone permissions in your browser.
          </p>
        )}
      </div>

      {/* Editable Captured Speech Transcript */}
      {(liveTranscript || phase === "completed") && (
        <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-2">
          <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Speech Recognition Transcript
            </span>
            <span className="text-indigo-600 font-bold">Editable</span>
          </div>

          <textarea
            value={liveTranscript}
            onChange={(e) => handleTranscriptChange(e.target.value)}
            placeholder="Spoken response transcript captured here..."
            rows={3}
            className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 leading-relaxed font-sans focus:outline-none focus:border-indigo-500 resize-none"
          />
        </div>
      )}
    </div>
  );
}
