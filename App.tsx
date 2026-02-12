
import React, { useState, useCallback, useEffect } from 'react';
import { AppStage, StudentData, TrialResult, Question, QuizAttempt } from './types.ts';
import { getAssessmentQuestions } from './constants/questions.ts';
import RegistrationForm from './components/RegistrationForm.tsx';
import ModuleDashboard from './components/ModuleDashboard.tsx';
import SlideDeck from './components/SlideDeck.tsx';
import AssemblySimulation from './components/AssemblySimulation.tsx';
import ResultAnalysis from './components/ResultAnalysis.tsx';
import Quiz from './components/Quiz.tsx';
import SubmissionLocked from './components/SubmissionLocked.tsx';
import QuizReview from './components/QuizReview.tsx';
import ResultSummary from './components/ResultSummary.tsx';
import BlockedAccess from './components/BlockedAccess.tsx';
import { Loader2 } from 'lucide-react';

const MODULES_LIST = [
  "Fundamentals of Time Study & Productivity",
  "Motion Economy (Therbligs & Workstation Design)",
  "Allowances & Standard Time Calculation",
  "Production Planning & Control (PPC)",
  "Industrial Safety, PPE & Ergonomics",
  "Inventory Control (JIT, EOQ, Supply Chain)",
  "Quality Control (Six Sigma, TQM, Kaizen)",
  "Plant Layout & Material Handling",
  "Costing, Overheads & Break-Even Analysis",
  "Maintenance Engineering (Preventive vs. Corrective)"
];

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.REGISTRATION);
  const [student, setStudent] = useState<StudentData | null>(null);
  const [assignedModuleId, setAssignedModuleId] = useState<number | null>(null);
  const [trials, setTrials] = useState<TrialResult[]>([]);
  const [quizAttempt, setQuizAttempt] = useState<QuizAttempt | null>(null);
  const [assessmentQuestions, setAssessmentQuestions] = useState<Question[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Security Check: One-Time Access
  useEffect(() => {
    const isCompleted = localStorage.getItem('uniben_cbt_completed');
    if (isCompleted === 'true') {
      setStage(AppStage.BLOCKED);
    }
  }, []);

  const calculateAverageTime = useCallback(() => {
    if (trials.length === 0) return 0;
    const sum = trials.reduce((acc, curr) => acc + curr.duration, 0);
    return parseFloat((sum / trials.length).toFixed(3));
  }, [trials]);

  const handleRegistration = (data: StudentData) => {
    setStudent(data);
    setStage(AppStage.EXPERIMENT);
  };

  const handleExperimentComplete = (results: TrialResult[]) => {
    setTrials(results);
    setIsProcessing(true);
    
    // Module Roulette: Random selection between 1-10
    setTimeout(() => {
      const randomModule = Math.floor(Math.random() * 10) + 1;
      setAssignedModuleId(randomModule);
      
      // Fetch 50 questions specifically for the assigned module
      const questions = getAssessmentQuestions(50, randomModule);
      setAssessmentQuestions(questions);
      
      setIsProcessing(false);
      setStage(AppStage.ANALYSIS);
    }, 2500);
  };

  const handleAnalysisProceed = () => {
    setStage(AppStage.SLIDES);
  };

  const handleSlidesComplete = () => {
    setStage(AppStage.QUIZ);
  };

  const handleQuizFinish = (score: number, answers: Record<number, number>) => {
    localStorage.setItem('uniben_cbt_completed', 'true');
    setQuizAttempt({ score, answers, questions: assessmentQuestions });
    setStage(AppStage.SUBMISSION_LOCKED);
  };

  const handleWhatsAppSubmission = useCallback((finalScore: number) => {
    if (!student || assignedModuleId === null) return;
    const avgTime = calculateAverageTime();
    const moduleName = MODULES_LIST[assignedModuleId - 1];
    const message = `Hello Engr. Ero, Student: ${student.name}, Mat No: ${student.matNo}, Serial No: ${student.serialNo}, Dept: ${student.department}. --- Assigned Module: ${moduleName}. Experiment Avg Time: ${avgTime}s. CBT Score: ${finalScore}/50.`;
    
    const whatsappUrl = `https://wa.me/2347062228026?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }, [student, assignedModuleId, calculateAverageTime]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-indigo-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-full overflow-hidden w-10 h-10 flex items-center justify-center border-2 border-green-600">
              <img src="https://picsum.photos/seed/uniben/100/100" alt="UNIBEN Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">UNIBEN Production Engineering</h1>
              <p className="text-xs text-indigo-200">E-Course Learning Portal - Engr. Ero</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-4xl w-full mx-auto p-4 sm:p-6 relative">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[600px] flex flex-col relative">
          
          {isProcessing && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-500">
              <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-6" />
              <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase tracking-tighter">Analyzing Performance Data</h2>
              <p className="text-slate-500 font-medium max-w-xs">Synthesizing psychomotor results to assign your unique learning module...</p>
            </div>
          )}

          {stage === AppStage.BLOCKED && <BlockedAccess />}
          
          {stage === AppStage.REGISTRATION && (
            <RegistrationForm onComplete={handleRegistration} />
          )}

          {stage === AppStage.EXPERIMENT && (
            <AssemblySimulation 
              onComplete={handleExperimentComplete} 
              studentName={student?.name || ''} 
            />
          )}

          {stage === AppStage.ANALYSIS && assignedModuleId !== null && (
            <ResultAnalysis 
              trials={trials} 
              assignedModule={MODULES_LIST[assignedModuleId - 1]}
              onProceed={handleAnalysisProceed} 
            />
          )}

          {stage === AppStage.SLIDES && assignedModuleId !== null && (
            <SlideDeck 
              moduleId={assignedModuleId}
              moduleTitle={MODULES_LIST[assignedModuleId - 1]}
              onComplete={handleSlidesComplete} 
            />
          )}

          {stage === AppStage.QUIZ && assessmentQuestions.length > 0 && (
            <Quiz 
              questions={assessmentQuestions} 
              onComplete={handleQuizFinish} 
            />
          )}

          {stage === AppStage.SUBMISSION_LOCKED && quizAttempt && (
            <SubmissionLocked 
              score={quizAttempt.score}
              onWhatsAppSubmit={() => handleWhatsAppSubmission(quizAttempt.score)}
              onViewReview={() => setStage(AppStage.REVIEW)}
            />
          )}

          {stage === AppStage.REVIEW && quizAttempt && (
            <QuizReview 
              attempt={quizAttempt}
              onFinalExit={() => setStage(AppStage.RESULTS)}
            />
          )}

          {stage === AppStage.RESULTS && student && quizAttempt && (
            <ResultSummary 
              student={student}
              avgTime={calculateAverageTime().toString()}
              score={quizAttempt.score}
              onWhatsAppSubmit={() => handleWhatsAppSubmission(quizAttempt.score)}
              onRestart={() => window.location.reload()}
            />
          )}
        </div>
      </main>

      <footer className="py-6 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} University of Benin. Department of Production Engineering.</p>
        <p className="text-xs italic mt-1 font-medium tracking-tight">Standardized Modular Instruction for Industrial Excellence.</p>
      </footer>
    </div>
  );
};

export default App;
