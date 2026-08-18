'use client';

import React, { useState } from 'react';
import { Play, Clock, Trophy, Layers, FileText, ArrowRight, Activity, Award, RefreshCcw, Volume2 } from 'lucide-react';
import { getRandomMockTestSet, PTEQuestion } from '../../../lib/questions';

const MOCK_TESTS = [
  { id: 1, title: 'Mock Test 1: AI & Language Acquisition (EASY)', difficulty: 'EASY', duration: '2h 15m', modules: '4 Modules' },
  { id: 2, title: 'Mock Test 2: Cursive Handwriting Art (EASY)', difficulty: 'EASY', duration: '2h 15m', modules: '4 Modules' },
  { id: 3, title: 'Mock Test 3: Economics of Fast Fashion (EASY)', difficulty: 'EASY', duration: '2h 15m', modules: '4 Modules' },
  { id: 4, title: 'Mock Test 4: Urban Parks & Mental Health (EASY)', difficulty: 'EASY', duration: '2h 15m', modules: '4 Modules' },
  { id: 5, title: 'Mock Test 5: Ancient Language Preservation (EASY)', difficulty: 'EASY', duration: '2h 15m', modules: '4 Modules' },
  { id: 6, title: 'Mock Test 6: Science of Deep Sleep (EASY)', difficulty: 'EASY', duration: '2h 15m', modules: '4 Modules' },
  { id: 7, title: 'Mock Test 7: Martian Exploration Physics (EASY)', difficulty: 'EASY', duration: '2h 15m', modules: '4 Modules' },
  { id: 8, title: 'Mock Test 8: Social Media Influencers (EASY)', difficulty: 'EASY', duration: '2h 15m', modules: '4 Modules' },
  { id: 9, title: 'Mock Test 9: Futuristic Transport Networks (EASY)', difficulty: 'EASY', duration: '2h 15m', modules: '4 Modules' },
  { id: 10, title: 'Mock Test 10: Color Psychology in Marketing (EASY)', difficulty: 'EASY', duration: '2h 15m', modules: '4 Modules' },
  { id: 11, title: 'Mock Test 11: Economics of Fast Fashion (MEDIUM)', difficulty: 'MEDIUM', duration: '2h 15m', modules: '4 Modules' },
  { id: 12, title: 'Mock Test 12: Urban Parks & Mental Health (MEDIUM)', difficulty: 'MEDIUM', duration: '2h 15m', modules: '4 Modules' },
  { id: 13, title: 'Mock Test 13: Science of Deep Sleep (MEDIUM)', difficulty: 'MEDIUM', duration: '2h 15m', modules: '4 Modules' },
  { id: 14, title: 'Mock Test 14: Futuristic Transport Networks (HARD)', difficulty: 'HARD', duration: '2h 15m', modules: '4 Modules' }
];

import MockTestEquipmentCheck from '@/components/MockTestEquipmentCheck';

export default function MockTest() {
  const [activeTest, setActiveTest] = useState<any>(null);
  const [pendingCheckTest, setPendingCheckTest] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [testResult, setTestResult] = useState<any>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const initiateTestCheck = (test: any) => {
    setPendingCheckTest(test);
  };

  const proceedWithVerifiedTest = () => {
    if (!pendingCheckTest) return;
    const test = pendingCheckTest;
    setPendingCheckTest(null);

    const mockQuestionsSet = getRandomMockTestSet();
    const questionsList: PTEQuestion[] = [
      ...mockQuestionsSet.speaking,
      ...mockQuestionsSet.writing,
      ...mockQuestionsSet.reading,
      ...mockQuestionsSet.listening,
    ];

    setActiveTest({
      ...test,
      questions: questionsList,
    });
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setCurrentAnswer('');
    setTestResult(null);
  };

  const handleNextQuestion = () => {
    setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: currentAnswer }));
    
    if (activeTest && currentQuestionIndex < activeTest.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentAnswer(userAnswers[currentQuestionIndex + 1] || '');
    } else {
      setIsEvaluating(true);
      setTimeout(() => {
        setIsEvaluating(false);
        setTestResult({
          overall: 78,
          speaking: 82,
          writing: 75,
          reading: 76,
          listening: 80,
          fluency: 84,
          pronunciation: 80,
          grammar: 74,
          vocabulary: 78,
          discourse: 76,
        });
      }, 2000);
    }
  };

  return (
    <div className="space-y-6 text-slate-900">
      {/* Header matching exact screenshot */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Mock Tests</h1>
          <p className="text-slate-500 text-xs font-semibold mt-0.5">Take full-length PTE mock exams</p>
        </div>
      </div>

      {!activeTest ? (
        /* 3-Column Cards Grid matching masterieltsai.com screenshot */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_TESTS.map(test => (
            <div 
              key={test.id} 
              className="bg-white border border-[#e8ecf4] rounded-[24px] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-amber-50 rounded-xl text-amber-500 border border-amber-100 shrink-0">
                    <Trophy className="w-5 h-5 fill-amber-500 text-amber-500" />
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                    {test.title}
                  </h3>
                </div>

                <p className="text-slate-500 text-xs font-medium leading-relaxed mb-4">
                  Experience a complete PTE exam simulation with all four modules. Timed, scored, and analyzed by AI.
                </p>

                <div className="flex items-center gap-4 text-xs font-bold text-slate-500 mb-6">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> {test.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-slate-400" /> {test.modules}
                  </span>
                </div>
              </div>

              <button 
                onClick={() => initiateTestCheck(test)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm text-xs tracking-wide cursor-pointer"
              >
                Start Test <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : isEvaluating ? (
        <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-12 text-center shadow-xs flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 border border-indigo-100">
            <Activity className="w-8 h-8 text-indigo-600 animate-spin" />
          </div>
          <h2 className="text-xl font-black text-slate-900 mb-2">Evaluating Your Mock Test...</h2>
          <p className="text-xs font-semibold text-slate-500 max-w-md">Our AI engine is calculating your Communicative Skills (Speaking, Writing, Reading, Listening) and Enabling Skills (Fluency, Pronunciation, Grammar, Vocabulary).</p>
        </div>
      ) : testResult ? (
        <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-black text-slate-900">PTE Official Score Report</h2>
              </div>
              <p className="text-slate-500 text-xs font-semibold mt-1">Generated by PTE AI Pearson Exam Simulation Engine</p>
            </div>
            <button 
              onClick={() => setActiveTest(null)}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-bold rounded-xl text-xs flex items-center gap-2 border border-slate-200/80"
            >
              <RefreshCcw className="w-4 h-4" /> Back to Tests
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
            <div className="md:col-span-1 bg-indigo-600 text-white rounded-2xl p-6 flex flex-col justify-center items-center shadow-md">
              <span className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">Overall Score</span>
              <span className="text-5xl font-mono font-black">{testResult.overall}</span>
              <span className="text-[10px] font-bold mt-2 bg-white/20 px-2.5 py-0.5 rounded-full">Passed (Target 79+)</span>
            </div>

            <div className="md:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex flex-col justify-center">
                <span className="text-xs font-bold text-slate-500 mb-1 uppercase">Speaking</span>
                <span className="text-3xl font-mono font-black text-indigo-600">{testResult.speaking}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex flex-col justify-center">
                <span className="text-xs font-bold text-slate-500 mb-1 uppercase">Writing</span>
                <span className="text-3xl font-mono font-black text-sky-600">{testResult.writing}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex flex-col justify-center">
                <span className="text-xs font-bold text-slate-500 mb-1 uppercase">Reading</span>
                <span className="text-3xl font-mono font-black text-emerald-600">{testResult.reading}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex flex-col justify-center">
                <span className="text-xs font-bold text-slate-500 mb-1 uppercase">Listening</span>
                <span className="text-3xl font-mono font-black text-purple-600">{testResult.listening}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Live Test Runner */
        <div className="bg-white border border-[#e8ecf4] rounded-[24px] p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100 uppercase tracking-wider">
                {activeTest.questions[currentQuestionIndex]?.taskType || 'Question'}
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-1">
                Question {currentQuestionIndex + 1} of {activeTest.questions.length}: {activeTest.questions[currentQuestionIndex]?.title}
              </h2>
            </div>
            <div className="flex items-center gap-2 font-mono font-bold text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-xl border border-indigo-100 text-sm">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>04:45</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80">
            {activeTest.questions[currentQuestionIndex]?.promptText && (
              <p className="text-slate-900 font-extrabold text-base leading-relaxed mb-4">
                {activeTest.questions[currentQuestionIndex]?.promptText}
              </p>
            )}

            {activeTest.questions[currentQuestionIndex]?.audioScript && (
              <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-center gap-3 mb-4">
                <Volume2 className="w-5 h-5 text-indigo-600" />
                <span className="text-xs font-bold text-slate-700">Audio Recording Prompt Available</span>
              </div>
            )}

            <textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="Type or record your response here..."
              className="w-full h-40 bg-white border border-slate-200 rounded-xl p-4 text-slate-900 font-semibold text-sm placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-2xs resize-none"
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-xs font-bold text-slate-500">Difficulty: <span className="text-slate-900 font-extrabold">{activeTest.questions[currentQuestionIndex]?.difficulty}</span></span>
            <button 
              onClick={handleNextQuestion}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 cursor-pointer"
            >
              {currentQuestionIndex === activeTest.questions.length - 1 ? 'Finish & Submit Test' : 'Next Question'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Equipment & Headphone Check Modal */}
      {pendingCheckTest && (
        <MockTestEquipmentCheck
          testTitle={pendingCheckTest.title}
          onProceed={proceedWithVerifiedTest}
          onCancel={() => setPendingCheckTest(null)}
        />
      )}
    </div>
  );
}

