"use client";

import React, { useState } from "react";
import {
  DESCRIBE_IMAGE_TEMPLATES,
  ESSAY_TEMPLATES,
  RETELL_LECTURE_TEMPLATES,
  SUMMARIZE_SPOKEN_TEXT_TEMPLATES,
} from "../data/templates";

export default function TemplatesHub() {
  const [activeTab, setActiveTab] = useState<"di" | "essay" | "retell" | "sst">("di");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const diTemplate = DESCRIBE_IMAGE_TEMPLATES[0];
  const essayTemplate = ESSAY_TEMPLATES[0];
  const retellTemplate = RETELL_LECTURE_TEMPLATES[0];
  const sstTemplate = SUMMARIZE_SPOKEN_TEXT_TEMPLATES[0];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col gap-2">
        <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <span className="text-indigo-600">⚡</span> PTE 90-Band Score Templates & Formulas
        </h2>
        <p className="text-xs text-slate-500">
          Official high-scoring templates designed to maximize Oral Fluency, Content, and Enabling Skills.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("di")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "di"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Describe Image Formula
        </button>
        <button
          onClick={() => setActiveTab("essay")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "essay"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Universal 90-Band Essay
        </button>
        <button
          onClick={() => setActiveTab("retell")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "retell"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Re-tell Lecture Formula
        </button>
        <button
          onClick={() => setActiveTab("sst")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "sst"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Summarize Spoken Text
        </button>
      </div>

      {/* TAB CONTENTS */}

      {/* 1. Describe Image */}
      {activeTab === "di" && diTemplate && (
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-slate-900">{diTemplate.title}</h3>
              <button
                onClick={() => copyToClipboard(diTemplate.templateText)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-indigo-600 border border-slate-200 flex items-center gap-1.5"
              >
                {copied ? "Copied to Clipboard!" : "Copy Full Formula"}
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-800">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs leading-relaxed">
                <span className="text-amber-700 font-bold block mb-1">Standard Describe Image Template:</span>
                <p className="whitespace-pre-line">{diTemplate.templateText}</p>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl font-mono text-xs leading-relaxed">
                <span className="text-emerald-800 font-bold block mb-1">Sample High-Scoring Response:</span>
                <p className="italic text-emerald-900">{diTemplate.sampleFilledText}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Universal Essay Template */}
      {activeTab === "essay" && essayTemplate && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900">{essayTemplate.title}</h3>
            <button
              onClick={() => copyToClipboard(essayTemplate.fullTemplate)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-indigo-600 border border-slate-200"
            >
              {copied ? "Copied!" : "Copy Universal Template"}
            </button>
          </div>

          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono leading-relaxed">
            <h4 className="text-indigo-600 font-bold mb-2">Universal Essay Structure:</h4>
            <p className="whitespace-pre-line text-slate-800">{essayTemplate.fullTemplate}</p>
          </div>

          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
            <h4 className="text-xs font-bold text-indigo-900 mb-2">Sample Band 9 Essay Response:</h4>
            <p className="text-xs text-indigo-950 leading-relaxed italic">{essayTemplate.sampleFilledEssay}</p>
          </div>
        </div>
      )}

      {/* 3. Re-tell Lecture */}
      {activeTab === "retell" && retellTemplate && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
          <h3 className="text-base font-bold text-slate-900">{retellTemplate.title}</h3>
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono leading-relaxed">
            <p className="whitespace-pre-line text-slate-800">{retellTemplate.templateText}</p>
          </div>
        </div>
      )}

      {/* 4. Summarize Spoken Text */}
      {activeTab === "sst" && sstTemplate && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
          <h3 className="text-base font-bold text-slate-900">{sstTemplate.title}</h3>
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono leading-relaxed">
            <p className="whitespace-pre-line text-slate-800">{sstTemplate.templateText}</p>
          </div>
        </div>
      )}
    </div>
  );
}
