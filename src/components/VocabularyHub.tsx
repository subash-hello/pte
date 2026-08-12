"use client";

import React, { useState } from "react";
import { AWL_WORDS, PTE_COLLOCATIONS, HOMOPHONE_PAIRS, TOPIC_VOCABULARY_BANKS } from "../data/vocabulary";

export default function VocabularyHub() {
  const [searchTerm, setSearchTerm] = useState("");
  const [subTab, setSubTab] = useState<"awl" | "collocations" | "homophones">("awl");

  const filteredAWL = AWL_WORDS.filter(
    (w) =>
      w.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCollocations = PTE_COLLOCATIONS.filter(
    (c) =>
      c.phrase.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Search */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <span className="text-amber-500">📚</span> Academic Vocabulary & Collocations Center
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            PTE Academic Word List (AWL), essential collocations, and homophone warning lists.
          </p>
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search word or collocation..."
          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 w-full md:w-64"
        />
      </div>

      {/* Subtabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setSubTab("awl")}
          className={`px-4 py-2 rounded-xl text-xs font-bold ${
            subTab === "awl"
              ? "bg-amber-500 text-slate-950 shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Academic Word List (AWL)
        </button>
        <button
          onClick={() => setSubTab("collocations")}
          className={`px-4 py-2 rounded-xl text-xs font-bold ${
            subTab === "collocations"
              ? "bg-amber-500 text-slate-950 shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          PTE Collocations
        </button>
        <button
          onClick={() => setSubTab("homophones")}
          className={`px-4 py-2 rounded-xl text-xs font-bold ${
            subTab === "homophones"
              ? "bg-amber-500 text-slate-950 shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Homophones Warning List
        </button>
      </div>

      {/* TAB CONTENT */}
      {subTab === "awl" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAWL.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-amber-400 transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold text-amber-600">{item.word}</h3>
                  <span className="text-xs text-slate-500 italic">{item.partOfSpeech}</span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  Sublist {item.sublist}
                </span>
              </div>
              <p className="text-xs text-slate-700 mb-3">{item.definition}</p>
              <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-800 italic border border-slate-200">
                "{item.exampleSentence}"
              </div>
            </div>
          ))}
        </div>
      )}

      {subTab === "collocations" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCollocations.map((col, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between shadow-xs"
            >
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                  {col.category}
                </span>
                <h4 className="text-base font-bold text-slate-900 mb-2">{col.phrase}</h4>
              </div>
              <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                "{col.exampleSentence}"
              </p>
            </div>
          ))}
        </div>
      )}

      {subTab === "homophones" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {HOMOPHONE_PAIRS.map((hp, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-2 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-rose-600 font-extrabold text-base">{hp.wordA}</span>
                <span className="text-slate-400 font-bold text-xs">vs</span>
                <span className="text-rose-600 font-extrabold text-base">{hp.wordB}</span>
              </div>
              <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <strong className="text-slate-900">{hp.wordA}:</strong> {hp.definitionA}<br />
                <strong className="text-slate-900">{hp.wordB}:</strong> {hp.definitionB}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
