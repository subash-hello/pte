'use client';

import React, { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

export default function AITutor() {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: "Hello! I am your PTE AI Tutor & Strategy Coach. I can provide scoring advice, essay templates, Describe Image shortcuts, speaking tips, or analyze your practice performance for a guaranteed 79+ score." 
    }
  ]);
  const [input, setInput] = useState('');

  const suggestions = [
    "Essay template for 79+",
    "Describe Image strategy",
    "How is Fluency scored?",
    "Read Aloud tips"
  ];

  const getTutorResponse = (query: string) => {
    const q = query.toLowerCase();
    if (q.includes('essay') || q.includes('template')) {
      return "Here is the battle-tested PTE Essay Structure (aiming for 200-300 words):\n\n1. Introduction (30-40 words): State the topic clearly and present your thesis statement.\n2. Body Paragraph 1 (70-80 words): Discuss the main supporting argument with 1 concrete academic example.\n3. Body Paragraph 2 (70-80 words): Discuss the counter-perspective or additional supporting point.\n4. Conclusion (30-40 words): Summarize key arguments and restate your final opinion.\n\nTip: Avoid spelling mistakes and use compound connectors like 'Consequently', 'Furthermore', and 'Nevertheless'.";
    }
    if (q.includes('describe image') || q.includes('image')) {
      return "For Describe Image (40 seconds total):\n- Spend 25 seconds during preparation identifying: Title, Highest value, Lowest value, and Key trend.\n- Structure your speech: 'This bar chart illustrates [Title]. The highest category is [X] at [Value], whereas the lowest is [Y] at [Value]. Overall, it is evident that [Key Trend].'\n- Oral Fluency is worth more points than content detail—speak continuously without hesitations!";
    }
    if (q.includes('fluency') || q.includes('speaking')) {
      return "Oral Fluency scoring criteria in PTE:\n- Smooth, constant pacing (do NOT pause mid-phrase to self-correct).\n- Avoid filler sounds like 'um', 'uh', or long silence.\n- Maintain natural sentence rhythm and link words smoothly. Even if you mispronounce a word, KEEP MOVING without stopping!";
    }
    return "Great question! To maximize your PTE score: prioritize high-weightage modules first—Write From Dictation, Repeat Sentence, Read Aloud, and Reading & Writing Fill in the Blanks account for over 60% of your total score. Keep practicing daily using our official PTE Question Bank!";
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: query }]);
    if (!textToSend) setInput('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: getTutorResponse(query)
      }]);
    }, 800);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6 text-slate-900">
      {/* Sidebar */}
      <div className="hidden lg:flex flex-col w-64 bg-white border border-[#e8ecf4] rounded-[24px] p-4 shadow-xs">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Quick Strategy Guides</h3>
        <div className="space-y-1 overflow-y-auto">
          {[
            { title: 'PTE 79+ Target Roadmap', query: 'How is Fluency scored?' },
            { title: 'Write Essay 15/15 Template', query: 'Essay template for 79+' },
            { title: 'Describe Image 40-sec Formula', query: 'Describe Image strategy' },
            { title: 'Write From Dictation Tips', query: 'Read Aloud tips' },
          ].map((item, i) => (
            <button 
              key={i} 
              onClick={() => handleSend(item.query)}
              className="w-full text-left p-3 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors truncate border border-transparent hover:border-slate-200/60"
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white border border-[#e8ecf4] rounded-[24px] shadow-xs overflow-hidden relative">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center shadow-xs">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-extrabold text-slate-900 text-sm">PTE AI Tutor & Exam Strategist</h2>
            <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span> Online & Ready</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${msg.role === 'assistant' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                {msg.role === 'assistant' ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-slate-700" />}
              </div>
              <div className={`max-w-[80%] p-4 rounded-2xl text-xs font-semibold leading-relaxed whitespace-pre-wrap ${
                msg.role === 'assistant' 
                  ? 'bg-slate-50 text-slate-900 rounded-tl-none border border-slate-200/80 shadow-2xs' 
                  : 'bg-indigo-600 text-white rounded-tr-none shadow-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-slate-50/50 border-t border-slate-100">
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1 custom-scrollbar">
            {suggestions.map(s => (
              <button 
                key={s} 
                onClick={() => handleSend(s)}
                className="whitespace-nowrap px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold border border-indigo-100 hover:bg-indigo-100 transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" /> {s}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask your tutor about scoring rules, templates, or strategies..."
              className="w-full bg-white border border-slate-200 rounded-2xl pl-4 pr-12 py-3.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-indigo-500 shadow-2xs transition-colors"
            />
            <button 
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="absolute right-2 top-2 p-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl transition-colors shadow-2xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
