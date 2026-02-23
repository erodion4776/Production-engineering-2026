
import React, { useState, useCallback, useEffect } from 'react';
import { AppStage, StudentData, TrialResult, Question, QuizAttempt } from './types.ts';
import { getAssessmentQuestions } from './constants/questions.ts';
import { isStudentWhitelisted } from './constants/whitelist.ts';
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
  const [isRetakeMode, setIsRetakeMode] = useState(false);
  const [isWhitelisted, setIsWhitelisted] = useState(false);

  // Security & Retake Persistence
  useEffect(() => {
    const isCompleted = localStorage.getItem('uniben_cbt_completed') === 'true';
    const retakePaid = localStorage.getItem('uniben_cbt_retake_paid') === 'true';
    const storedStudent = localStorage.getItem('uniben_student_data');
    
    let currentStudent: StudentData | null = null;
    if (storedStudent) {
      currentStudent = JSON.parse(storedStudent);
      setStudent(currentStudent);
    }

    const whitelisted = currentStudent ? isStudentWhitelisted(currentStudent.name, currentStudent.matNo) : false;
    setIsWhitelisted(whitelisted);

    if (isCompleted && !retakePaid && !whitelisted) {
      setStage(AppStage.BLOCKED);
    } else if (isCompleted && retakePaid) {
      setIsRetakeMode(true);
      // Automatically route to Quiz if we are in persistent retake mode
      const storedModuleId = localStorage.getItem('uniben_assigned_module');
      if (storedModuleId) {
        const moduleId = parseInt(storedModuleId, 10);
        setAssignedModuleId(moduleId);
        setAssessmentQuestions(getAssessmentQuestions(50, moduleId));
        setStage(AppStage.QUIZ);
      }
    }
  }, []);

  const calculateAverageTime = useCallback(() => {
    if (trials.length === 0) return 0;
    const sum = trials.reduce((acc, curr) => acc + curr.duration, 0);
    return parseFloat((sum / trials.length).toFixed(3));
  }, [trials]);

  const handleRegistration = (data: StudentData) => {
    setStudent(data);
    localStorage.setItem('uniben_student_data', JSON.stringify(data));
    
    const whitelisted = isStudentWhitelisted(data.name, data.matNo);
    setIsWhitelisted(whitelisted);
    
    const isCompleted = localStorage.getItem('uniben_cbt_completed') === 'true';
    const retakePaid = localStorage.getItem('uniben_cbt_retake_paid') === 'true';

    if (isCompleted && !retakePaid && !whitelisted) {
      setStage(AppStage.BLOCKED);
    } else if (isCompleted && whitelisted) {
      const storedModuleId = localStorage.getItem('uniben_assigned_module');
      const moduleId = storedModuleId ? parseInt(storedModuleId, 10) : (Math.floor(Math.random() * 10) + 1);
      setAssignedModuleId(moduleId);
      localStorage.setItem('uniben_assigned_module', moduleId.toString());
      setAssessmentQuestions(getAssessmentQuestions(50, moduleId));
      setStage(AppStage.QUIZ);
    } else {
      setStage(AppStage.EXPERIMENT);
    }
  };

  const handleExperimentComplete = (results: TrialResult[]) => {
    setTrials(results);
    setIsProcessing(true);
    
    setTimeout(() => {
      const randomModule = Math.floor(Math.random() * 10) + 1;
      setAssignedModuleId(randomModule);
      localStorage.setItem('uniben_assigned_module', randomModule.toString());
      
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

  const handleQuizFinish = (score: number, answers: Record<number, number>, timeUsedSeconds: number) => {
    localStorage.setItem('uniben_cbt_completed', 'true');
    localStorage.setItem('uniben_cbt_score', score.toString());
    
    const attempt: QuizAttempt = { 
      score, 
      answers, 
      questions: assessmentQuestions, 
      timeUsedSeconds, 
      isRetake: isRetakeMode,
      isOfficialRewrite: isWhitelisted
    };
    
    setQuizAttempt(attempt);
    setStage(AppStage.SUBMISSION_LOCKED);
  };

  const handleWhatsAppSubmission = useCallback((attempt: QuizAttempt) => {
    if (!student || assignedModuleId === null) return;
    const avgTime = calculateAverageTime();
    const moduleName = MODULES_LIST[assignedModuleId - 1];
    
    const timeUsedMin = attempt.timeUsedSeconds ? (attempt.timeUsedSeconds / 60).toFixed(1) : "0";
    const retakeLabel = attempt.isRetake ? " (RETAKE ATTEMPT)" : "";
    const rewriteLabel = attempt.isOfficialRewrite ? " (OFFICIAL REWRITE ATTEMPT)" : "";
    
    const message = `Hello Engr. Ero, Student: ${student.name}${retakeLabel}${rewriteLabel}, Mat No: ${student.matNo}, Serial No: ${student.serialNo}, Dept: ${student.department}. --- Assigned Module: ${moduleName}. Experiment Avg Time: ${avgTime}s. Quiz Score: ${attempt.score}/50, Time Used: ${timeUsedMin} min.`;
    
    const whatsappUrl = `https://wa.me/2347062228026?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }, [student, assignedModuleId, calculateAverageTime]);

  const handleRetakePayment = () => {
    if (!student) return;
    
    // @ts-ignore
    window.MonnifySDK.initialize({
      amount: 500,
      currency: "NGN",
      reference: student.matNo + '_' + Math.floor((Math.random() * 10000000) + 1),
      customerFullName: student.name,
      customerEmail: student.matNo.toLowerCase() + "@uniben.edu",
      apiKey: "MK_TEST_ZL89TGPE8Q",
      contractCode: "3894966249",
      paymentDescription: "CBT Retake Fee for " + student.matNo,
      metadata: {
        "student_name": student.name,
        "matric_no": student.matNo
      },
      onComplete: function(response: any) {
        if (response.status === 'SUCCESS' || response.status === 'PAID') {
          localStorage.setItem('uniben_cbt_retake_paid', 'true');
          setIsRetakeMode(true);
          
          // Re-initialize questions for the previously assigned module if it exists, otherwise generate new
          const storedModuleId = localStorage.getItem('uniben_assigned_module');
          const moduleId = storedModuleId ? parseInt(storedModuleId, 10) : (Math.floor(Math.random() * 10) + 1);
          setAssignedModuleId(moduleId);
          localStorage.setItem('uniben_assigned_module', moduleId.toString());
          setAssessmentQuestions(getAssessmentQuestions(50, moduleId));
          
          setStage(AppStage.QUIZ);
        } else {
          alert("Payment failed or cancelled. Please try again.");
        }
      },
      onClose: function(data: any) {
        console.log("Payment window closed");
      }
    });
  };

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

          {stage === AppStage.BLOCKED && (
            <BlockedAccess 
              previousScore={parseInt(localStorage.getItem('uniben_cbt_score') || '0', 10)} 
              onRetake={handleRetakePayment} 
            />
          )}
          
          {stage === AppStage.REGISTRATION && (
            <RegistrationForm 
              onComplete={handleRegistration} 
              isCompleted={localStorage.getItem('uniben_cbt_completed') === 'true'}
            />
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
              isRetake={isRetakeMode}
              isWhitelisted={isWhitelisted}
              onComplete={handleQuizFinish} 
            />
          )}

          {stage === AppStage.SUBMISSION_LOCKED && quizAttempt && (
            <SubmissionLocked 
              score={quizAttempt.score}
              onWhatsAppSubmit={() => handleWhatsAppSubmission(quizAttempt)}
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
              onWhatsAppSubmit={() => handleWhatsAppSubmission(quizAttempt)}
              onRestart={() => {
                localStorage.removeItem('uniben_cbt_completed');
                localStorage.removeItem('uniben_cbt_retake_paid');
                window.location.reload();
              }}
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
