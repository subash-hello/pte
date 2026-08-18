"use client";

import React, { useState, useEffect } from "react";
import QuestionEngine from "./QuestionEngines";
import Scorecard from "./Scorecard";
import { MOCK_TESTS_COLLECTION } from "../data/mock-tests";
import PendingTrialGuard, { isPendingStudent } from "./PendingTrialGuard";

import MockTestEquipmentCheck from "./MockTestEquipmentCheck";

interface MockTestSimulatorProps {
  testId?: string;
  onExit?: () => void;
}

export default function MockTestSimulator({ testId = "pte_mock_test_01", onExit }: MockTestSimulatorProps) {
  const activeMock = MOCK_TESTS_COLLECTION.find((t) => t.id === testId) || MOCK_TESTS_COLLECTION[0];

  const [hasPassedEquipmentCheck, setHasPassedEquipmentCheck] = useState(false);
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [sectionTimeLeft, setSectionTimeLeft] = useState(
    (activeMock.sections[0]?.estimatedDurationMinutes || 54) * 60
  );
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: any }>({});
  const [userScores, setUserScores] = useState<{ [key: string]: number }>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentSection = activeMock.sections[currentSectionIdx];
  const sectionQuestions = (currentSection?.items?.flatMap((i: any) => i.questionData || []) || []).map(
    (q: any, idx: number) => ({
      ...q,
      id: q.id || `mock_q_${idx}`,
      title: q.title || `${currentSection.sectionName} Item #${idx + 1}`,
      type: q.type || "read_aloud",
      instruction:
        q.instruction ||
        "Read or listen to the item below and record/type your answer according to official PTE standards.",
    })
  );

  const currentQuestion = sectionQuestions[currentQuestionIdx];

  // Section countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isCompleted && sectionTimeLeft > 0) {
      timer = setTimeout(() => setSectionTimeLeft((prev) => prev - 1), 1000);
    } else if (sectionTimeLeft === 0 && !isCompleted) {
      handleNextSection();
    }
    return () => clearTimeout(timer);
  }, [sectionTimeLeft, isCompleted]);

  // Update timer when section changes
  useEffect(() => {
    if (currentSection) {
      setSectionTimeLeft((currentSection.estimatedDurationMinutes || 30) * 60);
      setCurrentQuestionIdx(0);
    }
  }, [currentSectionIdx]);

  const handleAnswerSubmit = (answer: any, scoreFeedback: any) => {
    if (currentQuestion) {
      setUserAnswers({ ...userAnswers, [currentQuestion.id || `q_${currentQuestionIdx}`]: answer });
      setUserScores({ ...userScores, [currentQuestion.id || `q_${currentQuestionIdx}`]: scoreFeedback.overall || 75 });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < sectionQuestions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      handleNextSection();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1);
    }
  };

  const handleNextSection = () => {
    if (currentSectionIdx < activeMock.sections.length - 1) {
      setCurrentSectionIdx(currentSectionIdx + 1);
    } else {
      setIsCompleted(true);
    }
  };

  // Format section timer display
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!hasPassedEquipmentCheck) {
    return (
      <MockTestEquipmentCheck
        testTitle={activeMock.testTitle}
        onProceed={() => setHasPassedEquipmentCheck(true)}
        onCancel={onExit || (() => {})}
      />
    );
  }

  if (isCompleted) {
    return (
      <div className="py-6">
        <Scorecard
          testName={activeMock.testTitle}
          speakingScore={79}
          writingScore={77}
          readingScore={81}
          listeningScore={76}
          enablingSkills={{
            fluency: 82,
            pronunciation: 75,
            grammar: 84,
            vocabulary: 80,
            spelling: 88,
            writtenDiscourse: 78,
          }}
          onRestartTest={onExit}
        />
      </div>
    );
  }

  const percentComplete = Math.round(
    ((currentQuestionIdx + 1) / (sectionQuestions.length || 1)) * 100
  );

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <PendingTrialGuard isOpen={isPendingStudent()} />
      {/* Simulation Top Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-4">
          <button
            onClick={onExit}
            className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold border border-slate-200 flex items-center gap-1"
          >
            ← Exit Test
          </button>
          <div>
            <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">
              PTE MOCK SIMULATOR
            </span>
            <h3 className="text-sm font-bold text-slate-900">{activeMock.testTitle}</h3>
          </div>
        </div>

        {/* Section Pill Badges */}
        <div className="flex items-center gap-2">
          {activeMock.sections.map((sec, idx) => (
            <div
              key={sec.sectionName}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                currentSectionIdx === idx
                  ? "bg-indigo-600 text-white shadow-xs"
                  : idx < currentSectionIdx
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-slate-100 text-slate-400 opacity-70"
              }`}
            >
              <span>{sec.sectionName}</span>
              {idx < currentSectionIdx && <span>✓</span>}
            </div>
          ))}
        </div>

        {/* Timer */}
        <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-xl border border-amber-200 text-amber-800 font-mono text-sm font-bold">
          <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Section Timer: {formatTime(sectionTimeLeft)}</span>
        </div>
      </div>

      {/* Progress Bar & Jump Selector */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col gap-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-800">
              Question {currentQuestionIdx + 1} of {sectionQuestions.length}
            </span>
            <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
              {currentQuestion?.itemCategory || currentQuestion?.type}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-indigo-600">{percentComplete}% Complete</span>
            {/* Question Dropdown Jumper */}
            <select
              value={currentQuestionIdx}
              onChange={(e) => setCurrentQuestionIdx(Number(e.target.value))}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 font-bold focus:outline-none focus:border-indigo-500"
            >
              {sectionQuestions.map((q: any, idx: number) => (
                <option key={idx} value={idx}>
                  Jump to Q#{idx + 1}: {q.title || `Item ${idx + 1}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200 mt-1">
          <div
            className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 h-full transition-all duration-300"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      </div>

      {/* Active Question Engine */}
      {currentQuestion && (
        <QuestionEngine
          question={currentQuestion}
          onAnswerSubmit={handleAnswerSubmit}
          showFeedbackDirectly={false}
        />
      )}

      {/* Footer Controls */}
      <div className="flex justify-between items-center bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <button
          onClick={handlePrevQuestion}
          disabled={currentQuestionIdx === 0}
          className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-xs font-bold text-slate-700 transition-all"
        >
          ← Previous Item
        </button>

        <button
          onClick={handleNextQuestion}
          className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all active:scale-95 flex items-center gap-2"
        >
          {currentQuestionIdx === sectionQuestions.length - 1 &&
          currentSectionIdx === activeMock.sections.length - 1
            ? "Submit Full Exam"
            : "Next Item →"}
        </button>
      </div>
    </div>
  );
}
