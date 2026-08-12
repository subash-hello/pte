'use client';

import React, { useRef, useState } from 'react';
import { Scissors, Copy, ClipboardPaste, Undo, Redo } from 'lucide-react';
import WordCounter from './WordCounter';
import clsx from 'clsx';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minWords?: number;
  maxWords?: number;
  showWordCount?: boolean;
  disabled?: boolean;
}

export default function TextEditor({
  value,
  onChange,
  placeholder = 'Type your response here...',
  minWords,
  maxWords,
  showWordCount = true,
  disabled = false,
}: TextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const [history, setHistory] = useState<string[]>([value]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const updateValue = (newValue: string) => {
    onChange(newValue);
    
    if (newValue !== history[historyIndex]) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newValue);
      if (newHistory.length > 50) newHistory.shift();
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      onChange(history[newIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      onChange(history[newIndex]);
    }
  };

  const execCommand = (command: string) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    textarea.focus();
    
    if (command === 'cut') {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      if (start !== end) {
        const selected = value.substring(start, end);
        navigator.clipboard.writeText(selected);
        const newValue = value.substring(0, start) + value.substring(end);
        updateValue(newValue);
        
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start;
        }, 0);
      }
    } else if (command === 'copy') {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      if (start !== end) {
        const selected = value.substring(start, end);
        navigator.clipboard.writeText(selected);
      }
    } else if (command === 'paste') {
      navigator.clipboard.readText().then(text => {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newValue = value.substring(0, start) + text + value.substring(end);
        updateValue(newValue);
        
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + text.length;
        }, 0);
      }).catch(err => {
        console.error('Failed to read clipboard', err);
      });
    }
  };

  return (
    <div className={clsx(
      "w-full rounded-2xl bg-white border transition-colors flex flex-col overflow-hidden shadow-xs",
      disabled ? "border-slate-200 opacity-70" : "border-[#e8ecf4] focus-within:border-indigo-500"
    )}>
      {/* Toolbar */}
      {!disabled && (
        <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-200/80">
          <div className="flex items-center gap-1">
            <ToolbarButton icon={<Scissors size={15} />} onClick={() => execCommand('cut')} title="Cut" />
            <ToolbarButton icon={<Copy size={15} />} onClick={() => execCommand('copy')} title="Copy" />
            <ToolbarButton icon={<ClipboardPaste size={15} />} onClick={() => execCommand('paste')} title="Paste" />
            <div className="w-px h-4 bg-slate-200 mx-2" />
            <ToolbarButton 
              icon={<Undo size={15} />} 
              onClick={handleUndo} 
              disabled={historyIndex === 0} 
              title="Undo" 
            />
            <ToolbarButton 
              icon={<Redo size={15} />} 
              onClick={handleRedo} 
              disabled={historyIndex === history.length - 1} 
              title="Redo" 
            />
          </div>
        </div>
      )}

      {/* Editor Area */}
      <div className="relative flex-1 min-h-[200px] flex">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => updateValue(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          spellCheck={false}
          className="flex-1 w-full p-5 bg-white resize-none outline-none text-slate-900 font-semibold text-sm placeholder:text-slate-400 leading-relaxed font-sans"
        />
      </div>

      {/* Footer */}
      {(showWordCount || (minWords !== undefined && maxWords !== undefined)) && (
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200/80 flex justify-end items-center">
          {minWords !== undefined && maxWords !== undefined ? (
            <WordCounter text={value} min={minWords} max={maxWords} />
          ) : (
            <span className="text-xs font-bold text-slate-500 font-mono">
              Words: {value.trim() === '' ? 0 : value.trim().split(/\s+/).length}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function ToolbarButton({ 
  icon, 
  onClick, 
  disabled, 
  title 
}: { 
  icon: React.ReactNode; 
  onClick: () => void; 
  disabled?: boolean;
  title?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
    >
      {icon}
    </button>
  );
}
