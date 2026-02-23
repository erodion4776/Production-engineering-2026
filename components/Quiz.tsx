
import React, { useState, useEffect, useCallback } from 'react';
import { Question } from '../types';
import { ChevronLeft, ChevronRight, Send, Clock, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';

interface Props {
  questions: Question[];
  isRetake?: boolean;
  isWhitelisted?: boolean;
  onComplete: (score: number, answers: Record<number, number>, timeUsedSeconds: number) => void;
}

const Quiz: React.FC<Props> = ({ questions, isRetake = false, isWhitelisted = false, onComplete }) => {
  const INITIAL_TIME = isWhitelisted ? 6 * 60 : (isRetake ? 10 * 60 : 3 * 60);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(questions.length / itemsPerPage);

  const calculateScore = useCallback(() => {
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) score++;
    });
    return score;
  }, [questions, answers]);

  const handleSubmit = useCallback(() => {
    const timeUsed = INITIAL_TIME - timeLeft;
    onComplete(calculateScore(), answers, timeUsed);
  }, [calculateScore, answers, onComplete, timeLeft, INITIAL_TIME]);

  useEffect(() => {
    if (timeLeft <= 0) { 
      alert("Time's Up! Assessment Auto-Submitted.");
      handleSubmit(); 
      return; 
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, handleSubmit]);

  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const currentQuestions = questions.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Sticky Header with Progress and Timer */}
      <div className="sticky top-0 bg-white shadow-sm z-30 border-b border-slate-200">
        {isWhitelisted && (
          <div className="bg-green-600 text-white text-[10px] font-black uppercase tracking-[0.2em] py-1.5 text-center flex items-center justify-center gap-2">
            <ShieldCheck size={12} /> Authorized Redo Active: 6 Minutes Allocated
          </div>
        )}
        <div className="p-4 flex justify-between items-center">
          <div className={`px-4 py-2 rounded-lg font-mono font-bold text-sm sm:text-lg border-2 flex items-center gap-2 ${timeLeft < 30 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
            <Clock size={20} />
            {isRetake ? 'Retake Mode - ' : ''}
            {isWhitelisted ? 'Special Access - ' : ''}
            Time Remaining: {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
          <div className="flex flex-col items-end">
             {isWhitelisted && (
               <div className="flex items-center gap-1 text-[8px] font-black text-green-600 uppercase tracking-tighter mb-1">
                 <ShieldCheck size={10} /> Special Access Granted
               </div>
             )}
           {isRetake && !isWhitelisted && (
             <div className="flex items-center gap-1 text-[8px] font-black text-indigo-600 uppercase tracking-tighter mb-1">
               <ShieldCheck size={10} /> Premium Access Enabled
             </div>
           )}
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress</span>
           <span className="text-sm font-bold text-indigo-600">{answeredCount} / {questions.length} Answered</span>
        </div>
      </div>
    </div>

      {/* Questions Scroll Area */}
      <div className="flex-grow p-4 sm:p-6 space-y-6 overflow-y-auto pb-32">
        {currentQuestions.map((q, idx) => (
          <div key={q.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h4 className="text-slate-800 font-bold mb-5 leading-tight text-base sm:text-lg">
              <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded mr-3 text-sm">{(currentPage * itemsPerPage) + idx + 1}</span>
              {q.text}
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswerSelect(q.id, i)}
                  className={`group relative w-full p-4 text-left rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${
                    answers[q.id] === i 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-100' 
                      : 'border-slate-100 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white shadow-sm'
                  }`}
                >
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-colors ${
                    answers[q.id] === i ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-400 group-hover:border-slate-400'
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-grow font-medium">{opt}</span>
                  {answers[q.id] === i && <CheckCircle2 size={18} className="text-indigo-600" />}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Fixed Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 z-40">
        <div className="max-w-4xl mx-auto flex justify-between items-center gap-4">
          <button
            disabled={currentPage === 0}
            onClick={() => { setCurrentPage(p => p - 1); window.scrollTo(0,0); }}
            className="flex items-center gap-2 px-6 py-3 border-2 border-slate-200 rounded-xl font-bold text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft size={20} /> <span className="hidden sm:inline">Previous</span>
          </button>
          
          <div className="hidden sm:block text-slate-400 text-xs font-bold uppercase">
            Page {currentPage + 1} of {totalPages}
          </div>
          
          {currentPage === totalPages - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-blue-600 text-white font-black rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2"
            >
              FINISH ASSESSMENT <Send size={18} />
            </button>
          ) : (
            <button
              onClick={() => { setCurrentPage(p => p + 1); window.scrollTo(0,0); }}
              className="px-10 py-3 bg-indigo-900 text-white font-black rounded-xl shadow-lg hover:bg-indigo-950 active:scale-95 transition-all flex items-center gap-2"
            >
              NEXT <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
