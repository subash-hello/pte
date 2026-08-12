"use client";

import React, { useState, useEffect } from "react";
import AudioRecorder from "./AudioRecorder";
import AudioPlayer from "./AudioPlayer";
import DescribeImageVisual from "./DescribeImageVisual";
import { DESCRIBE_IMAGE_TEMPLATES, ESSAY_TEMPLATES } from "../data/templates";

interface QuestionEngineProps {
  question: any;
  onAnswerSubmit?: (answer: any, scoreFeedback: any) => void;
  showFeedbackDirectly?: boolean;
}

export default function QuestionEngine({
  question,
  onAnswerSubmit,
  showFeedbackDirectly = true,
}: QuestionEngineProps) {
  const [userText, setUserText] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [fibAnswers, setFibAnswers] = useState<{ [key: string]: string }>({});
  const [reorderList, setReorderList] = useState<string[]>([]);
  const [highlightedWords, setHighlightedWords] = useState<string[]>([]);
  const [recordedTranscript, setRecordedTranscript] = useState("");
  const [submittedScore, setSubmittedScore] = useState<any>(null);
  const [showTemplate, setShowTemplate] = useState(false);
  const [isScoring, setIsScoring] = useState(false);

  // Initialize state when question changes
  useEffect(() => {
    setUserText("");
    setSelectedOptions([]);
    setFibAnswers({});
    setHighlightedWords([]);
    setRecordedTranscript("");
    setSubmittedScore(null);
    setShowTemplate(false);

    if (question.type === "reorder_paragraphs" && question.jumbledParagraphs) {
      setReorderList([...question.jumbledParagraphs]);
    }
  }, [question]);

  // Handle re-order paragraphs item move up/down
  const moveReorderItem = (index: number, direction: "up" | "down") => {
    const newList = [...reorderList];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newList.length) return;
    const temp = newList[index];
    newList[index] = newList[targetIdx];
    newList[targetIdx] = temp;
    setReorderList(newList);
  };

  // Handle word count for writing tasks
  const wordCount = userText.trim() === "" ? 0 : userText.trim().split(/\s+/).length;

  // Calculate score logic by calling /api/score (Gemini AI + MongoDB)
  const evaluateAnswer = async () => {
    setIsScoring(true);
    const activeAnswer =
      recordedTranscript.trim() !== ""
        ? recordedTranscript
        : userText.trim() !== ""
        ? userText
        : Object.keys(fibAnswers).length > 0
        ? fibAnswers
        : selectedOptions.length > 0
        ? selectedOptions
        : reorderList;

    try {
      const res = await fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: question.id,
          questionType: question.type,
          section: question.section || "General",
          instruction: question.instruction,
          promptPassage: question.passage || question.audioScript || question.lectureScript || "",
          userAnswer: activeAnswer,
          answerKey: question.answerKey || question.correctOrder,
        }),
      });

      const data = await res.json();
      if (data.success && (data.evaluation || data.score)) {
        const payload = data.evaluation || data.score;
        const evalScore = {
          overall: payload.overallScore || payload.overall || 75,
          details: payload.feedbackDetails || payload.feedback || ["Response evaluated."],
          explanation: payload.explanation || "Evaluated by Gemini AI.",
          aiEvaluated: payload.aiEvaluated !== undefined ? payload.aiEvaluated : true,
        };
        setSubmittedScore(evalScore);
        if (onAnswerSubmit) onAnswerSubmit(activeAnswer, evalScore);
      }
    } catch (err) {
      console.error("Scoring error:", err);
    } finally {
      setIsScoring(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
      {/* Title & Metadata Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 uppercase tracking-wide">
            {question.itemCategory || question.type}
          </span>
          <h2 className="text-xl font-extrabold text-slate-900 mt-2">{question.title}</h2>
        </div>

        {question.timeLimitMinutes && (
          <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl font-bold">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Timer: {question.timeLimitMinutes} min</span>
          </div>
        )}
      </div>

      {/* Item Instructions */}
      <div className="text-xs text-slate-700 bg-slate-50 border border-slate-200 p-4 rounded-xl leading-relaxed">
        <strong className="text-slate-900">Instruction: </strong>
        {question.instruction}
      </div>

      {/* RENDER QUESTION SPECIFIC UI */}

      {/* 1. Read Aloud */}
      {question.type === "read_aloud" && (
        <div className="flex flex-col gap-4">
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl text-base text-slate-900 leading-relaxed font-serif tracking-wide">
            "{question.passage}"
          </div>
          <AudioRecorder
            prepTimeSeconds={question.prepTime || 35}
            maxRecordingTimeSeconds={question.recordingTime || 40}
            onRecordingComplete={(_, transcript) => setRecordedTranscript(transcript)}
          />
        </div>
      )}

      {/* 2. Repeat Sentence */}
      {question.type === "repeat_sentence" && (
        <div className="flex flex-col gap-4">
          <AudioPlayer audioTextPrompt={question.audioScript} autoPlayDelaySeconds={3} />
          <AudioRecorder
            prepTimeSeconds={5}
            maxRecordingTimeSeconds={15}
            onRecordingComplete={(_, transcript) => setRecordedTranscript(transcript)}
          />
        </div>
      )}

      {/* 3. Describe Image - High Accuracy Visual Component */}
      {question.type === "describe_image" && (
        <div className="flex flex-col gap-5">
          <DescribeImageVisual question={question} />

          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowTemplate(!showTemplate)}
              className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1"
            >
              {showTemplate ? "Hide Template Aid" : "Show High-Score Describe Image Template"}
            </button>
          </div>

          {showTemplate && DESCRIBE_IMAGE_TEMPLATES[0] && (
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900 leading-relaxed font-mono">
              <strong className="block text-indigo-800 mb-1">Standard Describe Image Formula:</strong>
              <p className="whitespace-pre-line">{DESCRIBE_IMAGE_TEMPLATES[0].templateText}</p>
            </div>
          )}

          <AudioRecorder
            prepTimeSeconds={question.prepTime || 25}
            maxRecordingTimeSeconds={question.recordingTime || 40}
            onRecordingComplete={(_, transcript) => setRecordedTranscript(transcript)}
          />
        </div>
      )}

      {/* 4. Re-tell Lecture */}
      {question.type === "retell_lecture" && (
        <div className="flex flex-col gap-4">
          <AudioPlayer audioTextPrompt={question.lectureScript} autoPlayDelaySeconds={3} />
          <AudioRecorder
            prepTimeSeconds={10}
            maxRecordingTimeSeconds={40}
            onRecordingComplete={(_, transcript) => setRecordedTranscript(transcript)}
          />
        </div>
      )}

      {/* 5. Answer Short Question */}
      {question.type === "answer_short_question" && (
        <div className="flex flex-col gap-4">
          <AudioPlayer audioTextPrompt={question.audioScript} autoPlayDelaySeconds={2} />
          <input
            type="text"
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            placeholder="Type or speak short answer..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
          />
        </div>
      )}

      {/* 6. Summarize Written Text & 7. Write Essay */}
      {(question.type === "summarize_written_text" || question.type === "write_essay") && (
        <div className="flex flex-col gap-4">
          {question.passage && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 leading-relaxed max-h-56 overflow-y-auto">
              {question.passage}
            </div>
          )}

          <div className="flex items-center justify-between bg-slate-100 px-4 py-2 border border-slate-200 rounded-t-xl text-xs">
            <div className="flex gap-3 text-slate-600 font-mono font-bold">
              <span>Word Count: <strong className={wordCount > 300 || (question.type === "summarize_written_text" && wordCount > 75) ? "text-rose-600" : "text-emerald-600"}>{wordCount}</strong></span>
            </div>
            {question.type === "write_essay" && (
              <button
                onClick={() => setShowTemplate(!showTemplate)}
                className="text-xs text-indigo-600 font-bold hover:underline"
              >
                {showTemplate ? "Hide Template" : "Use Band 9 Essay Template"}
              </button>
            )}
          </div>

          {showTemplate && question.type === "write_essay" && ESSAY_TEMPLATES[0] && (
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900 font-mono leading-relaxed">
              <strong className="block text-indigo-800 mb-1">Band 9 Universal Essay Template:</strong>
              <p className="whitespace-pre-line">{ESSAY_TEMPLATES[0].fullTemplate}</p>
            </div>
          )}

          <textarea
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            rows={question.type === "write_essay" ? 10 : 4}
            placeholder={
              question.type === "write_essay"
                ? "Write your essay here (200-300 words)..."
                : "Write a single sentence summary (10-75 words)..."
            }
            className="w-full bg-slate-50 border border-slate-200 rounded-b-xl p-4 text-xs text-slate-900 leading-relaxed focus:outline-none focus:border-indigo-500 font-sans resize-none"
          />
        </div>
      )}

      {/* 8. Fill in the Blanks (R&W) */}
      {question.type === "fib_reading_writing" && (
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 leading-loose">
          {question.paragraphWithBlanks?.map((part: any, idx: number) => (
            <React.Fragment key={idx}>
              {part.text}
              {part.blankId && (
                <select
                  value={fibAnswers[part.blankId] || ""}
                  onChange={(e) =>
                    setFibAnswers({ ...fibAnswers, [part.blankId]: e.target.value })
                  }
                  className="mx-1.5 px-2 py-1 bg-white border border-indigo-300 rounded text-indigo-700 font-bold focus:outline-none focus:border-indigo-500"
                >
                  <option value="">[ Select Blank ]</option>
                  {part.options?.map((opt: string, oIdx: number) => (
                    <option key={oIdx} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* 10. Re-order Paragraphs */}
      {question.type === "reorder_paragraphs" && (
        <div className="flex flex-col gap-3">
          <span className="text-xs text-slate-500 font-semibold">Re-order the paragraphs into the correct sequence:</span>
          {reorderList.map((paraText, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 shadow-xs"
            >
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => moveReorderItem(idx, "up")}
                  disabled={idx === 0}
                  className="p-1 text-slate-400 hover:text-slate-900 disabled:opacity-30"
                >
                  ▲
                </button>
                <button
                  onClick={() => moveReorderItem(idx, "down")}
                  disabled={idx === reorderList.length - 1}
                  className="p-1 text-slate-400 hover:text-slate-900 disabled:opacity-30"
                >
                  ▼
                </button>
              </div>
              <span className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700 font-mono">
                {idx + 1}
              </span>
              <p className="flex-1 leading-relaxed">{paraText}</p>
            </div>
          ))}
        </div>
      )}

      {/* 19. Highlight Incorrect Words */}
      {question.type === "highlight_incorrect_words" && (
        <div className="flex flex-col gap-4">
          <AudioPlayer audioTextPrompt={question.audioScript} autoPlayDelaySeconds={3} />
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 leading-loose">
            {question.displayedText?.split(/\s+/).map((word: string, idx: number) => {
              const cleanWord = word.replace(/[^\w]/g, "");
              const isSelected = highlightedWords.includes(cleanWord);
              return (
                <span
                  key={idx}
                  onClick={() => {
                    if (isSelected) {
                      setHighlightedWords(highlightedWords.filter((w) => w !== cleanWord));
                    } else {
                      setHighlightedWords([...highlightedWords, cleanWord]);
                    }
                  }}
                  className={`cursor-pointer px-1 py-0.5 mx-0.5 rounded transition-colors ${
                    isSelected
                      ? "bg-amber-200 text-amber-900 font-bold border border-amber-300"
                      : "hover:bg-slate-200"
                  }`}
                >
                  {word}{" "}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* 20. Write from Dictation */}
      {question.type === "write_from_dictation" && (
        <div className="flex flex-col gap-4">
          <AudioPlayer audioTextPrompt={question.audioScript} autoPlayDelaySeconds={3} />
          <input
            type="text"
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            placeholder="Type the exact sentence you heard..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
          />
        </div>
      )}

      {/* Submit / Score Action */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <button
          onClick={evaluateAnswer}
          disabled={isScoring}
          className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all active:scale-95 flex items-center gap-2"
        >
          {isScoring ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Evaluating via Gemini AI...</span>
            </>
          ) : (
            <span>Check & Score Practice Item</span>
          )}
        </button>

        {submittedScore && (
          <div className="flex items-center gap-3">
            {submittedScore.aiEvaluated ? (
              <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                Gemini AI Evaluated
              </span>
            ) : (
              <span className="text-[10px] uppercase font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full">
                Rule-Based Rubric
              </span>
            )}
            <div className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold font-mono text-sm">
              {submittedScore.overall} / 90 GSE
            </div>
          </div>
        )}
      </div>

      {/* Score Explanation Rationale */}
      {submittedScore && showFeedbackDirectly && (
        <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl flex flex-col gap-2">
          <div className="text-xs font-bold text-emerald-800 uppercase tracking-wide flex items-center justify-between">
            <span>PTE Skill Scoring Analysis</span>
            {submittedScore.aiEvaluated && <span className="text-[10px] text-amber-600 font-mono font-bold">✨ Powered by Gemini 2.5 Flash</span>}
          </div>
          <ul className="text-xs text-slate-700 list-disc list-inside space-y-1">
            {submittedScore.details?.map((dt: string, i: number) => (
              <li key={i}>{dt}</li>
            ))}
          </ul>
          {submittedScore.explanation && (
            <div className="mt-2 text-xs text-slate-700 border-t border-emerald-200/60 pt-2 italic">
              <strong>Examiner Rationale:</strong> {submittedScore.explanation}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
