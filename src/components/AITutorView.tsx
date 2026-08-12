"use client";

import React, { useState, useRef, useEffect } from "react";

interface ChatMessage {
  id: string;
  sender: "user" | "tutor";
  text: string;
  timestamp: string;
}

export default function AITutorView() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg_welcome",
      sender: "tutor",
      text: `### 🤖 Hello Subash! I am your PTE AI Master Coach

I have complete, expert knowledge of **every feature in this software platform**:

- 📚 **1,000+ Question Databank**: 50+ authentic practice items for each of the 20 question types across Speaking, Writing, Reading & Listening.
- 📄 **30 Full 2-Hour Mock Exam Papers**: Complete timed exam papers with section timers and GSE scorecards.
- 📊 **90-Band Templates**: 1-click copy formulas for Describe Image, Write Essay, Re-tell Lecture, and SST.
- 🤖 **Gemini 2.5 Flash AI Scoring & MongoDB Atlas**: Real-time evaluation and score persistence.
- 🏆 **Progress Badges**: Persistent \`✓ Completed\` indicators and XP leaderboard.

Click one of the suggested topics below or ask me anything about the software or PTE exam strategies!`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const suggestedPrompts = [
    { label: "🚀 Platform & Software Guide", query: "Show me all features available in this software and how it works" },
    { label: "📊 Describe Image Template", query: "Give me the 90-band Describe Image template" },
    { label: "✍️ 200-300w Essay Structure", query: "How do I structure a 200-300 word PTE Essay?" },
    { label: "📄 30 Mock Exams Guide", query: "How do I launch and practice one of the 30 Mock Exams?" },
    { label: "🗣️ Read Aloud Fluency Secrets", query: "Tips to improve Read Aloud oral fluency & pronunciation" },
    { label: "📈 Target 79+ Study Plan", query: "How should I structure my daily practice to score 79+ GSE?" },
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = (queryText || inputQuery).trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputQuery("");
    setIsLoading(true);

    try {
      const historyPayload = newMessages.map((m) => ({
        role: m.sender === "user" ? "user" : "model",
        content: m.text,
      }));

      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: historyPayload,
          userMessage: textToSend,
        }),
      });

      const data = await res.json();
      if (data.success && data.reply) {
        const tutorMsg: ChatMessage = {
          id: `tutor_${Date.now()}`,
          sender: "tutor",
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, tutorMsg]);
      }
    } catch (err) {
      console.error("AI Tutor Send Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-5xl mx-auto bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
      {/* Top Header */}
      <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xl font-bold shadow-md">
            🤖
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-100">PTE AI Master Coach</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Software Expert • Gemini 2.5 Flash
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Complete Knowledge of All 20 Question Types, 30 Mock Exams & 1,000+ Items</p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: "msg_welcome",
                sender: "tutor",
                text: "Chat cleared. Ask me anything about the software, templates, or PTE exam strategies!",
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              },
            ])
          }
          className="text-xs font-semibold text-slate-400 hover:text-rose-400 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 transition-colors"
        >
          Clear History
        </button>
      </div>

      {/* Preset Suggested Prompts */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto scrollbar-thin">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap ml-2">
          Suggested Topics:
        </span>
        {suggestedPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p.query)}
            className="text-xs font-bold text-slate-700 hover:text-indigo-600 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 px-3 py-1.5 rounded-xl whitespace-nowrap shadow-2xs transition-all active:scale-95 flex items-center gap-1"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"} items-start gap-3`}
          >
            {m.sender === "tutor" && (
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shadow-xs shrink-0 mt-1">
                🤖
              </div>
            )}

            <div
              className={`max-w-2xl rounded-2xl p-5 shadow-xs text-xs leading-relaxed ${
                m.sender === "user"
                  ? "bg-indigo-600 text-white font-medium rounded-tr-none"
                  : "bg-white border border-slate-200 text-slate-900 rounded-tl-none"
              }`}
            >
              <div className="whitespace-pre-line font-sans">{m.text}</div>

              <div className={`mt-3 pt-2 border-t flex items-center justify-between text-[10px] ${
                m.sender === "user" ? "border-indigo-500/50 text-indigo-200" : "border-slate-100 text-slate-400"
              }`}>
                <span>{m.timestamp}</span>
                {m.sender === "tutor" && (
                  <button
                    onClick={() => handleCopy(m.text, m.id)}
                    className="text-indigo-600 font-bold hover:underline"
                  >
                    {copiedId === m.id ? "✓ Copied Advice" : "Copy Advice"}
                  </button>
                )}
              </div>
            </div>

            {m.sender === "user" && (
              <div className="w-8 h-8 rounded-full bg-slate-950 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-1">
                S
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shadow-xs">
              🤖
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 shadow-xs flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:0.4s]" />
              <span className="text-xs text-slate-500 font-semibold ml-1">Gemini AI is analyzing software data...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Form Bar */}
      <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-3">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
          placeholder="Ask PTE AI Tutor anything about software features, question types, or exam strategies..."
          className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputQuery.trim() || isLoading}
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all active:scale-95 flex items-center gap-1.5"
        >
          <span>Send Query</span>
          <span className="text-sm">→</span>
        </button>
      </div>
    </div>
  );
}
