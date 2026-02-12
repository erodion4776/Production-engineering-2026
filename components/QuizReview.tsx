
import React from 'react';
import { QuizAttempt } from '../types';
import { AlertCircle, CheckCircle, XCircle, LogOut, Award, BookOpen } from 'lucide-react';

interface Props {
  attempt: QuizAttempt;
  onFinalExit: () => void;
}

const QuizReview: React.FC<Props> = ({ attempt, onFinalExit }) => {
  const failedQuestions = attempt.questions.filter(q => attempt.answers[q.id] !== q.correctAnswer);
  const percentage = (attempt.score / 50) * 100;

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <Award size={64} className="mx-auto text-indigo-600 mb-4" />
        <h2 className="text-4xl font-black text-slate-800">Review: {attempt.score}/50</h2>
        <p className={`text-sm font-bold mt-2 ${percentage >= 70 ? 'text-green-600' : 'text-amber-600'}`}>
           {percentage >= 70 ? 'EXCELLENT PERFORMANCE!' : 'LEARN FROM YOUR MISTAKES'}
        </p>
      </div>

      <div className="space-y-8 mb-12">
        <div className="flex items-center gap-2 text-slate-800 font-bold border-b pb-2">
           <BookOpen size={20} />
           <h3>Failure Analysis & Logic</h3>
        </div>

        {failedQuestions.length === 0 ? (
          <div className="p-10 text-center bg-green-50 rounded-2xl border-2 border-dashed border-green-200">
             <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
             <p className="text-green-800 font-bold">Perfect Score! No errors to review.</p>
          </div>
        ) : (
          failedQuestions.map((q, idx) => (
            <div key={q.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
               <p className="text-slate-500 text-[10px] font-bold uppercase mb-2">Error #{idx + 1}</p>
               <h4 className="font-bold text-slate-800 mb-4">{q.text}</h4>
               
               <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                     <XCircle className="text-red-500 mt-0.5" size={16} />
                     <div>
                        <div className="text-[10px] text-red-400 font-bold uppercase">Your Selection</div>
                        <div className="text-red-700 text-sm font-medium">{q.options[attempt.answers[q.id]] || 'No Answer'}</div>
                     </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                     <CheckCircle className="text-green-500 mt-0.5" size={16} />
                     <div>
                        <div className="text-[10px] text-green-400 font-bold uppercase">Correct Answer</div>
                        <div className="text-green-700 text-sm font-bold">{q.options[q.correctAnswer]}</div>
                     </div>
                  </div>
               </div>

               <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-inner">
                  <div className="flex items-center gap-2 text-indigo-600 mb-1 text-[10px] font-bold uppercase tracking-tight">
                     <AlertCircle size={12} /> Technical Explanation
                  </div>
                  <p className="text-slate-600 text-xs italic leading-relaxed">
                     {q.explanation}
                  </p>
               </div>
            </div>
          ))
        )}
      </div>

      <div className="p-6 border-t border-slate-100 text-center">
         <button
           onClick={onFinalExit}
           className="w-full py-4 bg-slate-900 text-white font-black rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95 text-lg"
         >
           <LogOut size={20} /> EXIT REVIEW
         </button>
      </div>
    </div>
  );
};

export default QuizReview;
