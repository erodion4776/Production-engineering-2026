
import React from 'react';
import { StudentData } from '../types';
import { MessageCircle, Award, Trophy, Clock, CheckCircle, Smartphone } from 'lucide-react';

interface Props {
  student: StudentData;
  avgTime: string;
  score: number;
  onWhatsAppSubmit: () => void;
  onRestart: () => void;
}

const ResultSummary: React.FC<Props> = ({ student, avgTime, score, onWhatsAppSubmit, onRestart }) => {
  const percentage = (score / 50) * 100;
  const isHighPerformer = percentage >= 70;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-block p-4 rounded-full bg-indigo-100 text-indigo-600 mb-4 animate-bounce">
          {isHighPerformer ? <Trophy size={48} /> : <Award size={48} />}
        </div>
        <h2 className="text-3xl font-black text-slate-800 mb-2">Assessment Completed</h2>
        <p className="text-slate-500 uppercase tracking-widest text-xs font-bold">University of Benin - Engineering</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
           <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
             <Clock size={16} />
             <span>Experiment Result</span>
           </div>
           <div className="text-2xl font-bold text-slate-800">{avgTime}s <span className="text-sm font-normal text-slate-400">Avg Time</span></div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
           <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
             <CheckCircle size={16} />
             <span>CBT Score</span>
           </div>
           <div className="text-2xl font-bold text-green-700">{score} / 50</div>
           <div className="text-xs text-slate-400 mt-1">{percentage.toFixed(0)}% Overall</div>
        </div>
      </div>

      <div className="bg-indigo-900 text-white rounded-2xl p-6 mb-10 shadow-xl overflow-hidden relative">
         <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Smartphone size={120} />
         </div>
         <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-green-400">
            <Smartphone size={20} /> 
            Submit Results to Engr. Ero
         </h3>
         <div className="space-y-3 mb-6 relative z-10">
            <div className="flex justify-between text-indigo-200 text-sm border-b border-indigo-800 pb-2">
               <span>Full Name:</span>
               <span className="font-semibold text-white uppercase">{student.name}</span>
            </div>
            <div className="flex justify-between text-indigo-200 text-sm border-b border-indigo-800 pb-2">
               <span>Matric No:</span>
               <span className="font-semibold text-white uppercase">{student.matNo}</span>
            </div>
            <div className="flex justify-between text-indigo-200 text-sm border-b border-indigo-800 pb-2">
               <span>Serial No:</span>
               <span className="font-semibold text-white uppercase">{student.serialNo}</span>
            </div>
         </div>
         
         <button
           onClick={onWhatsAppSubmit}
           className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-black rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95 text-lg"
         >
           <MessageCircle size={24} /> RE-SUBMIT VIA WHATSAPP
         </button>
         <p className="text-center text-xs text-indigo-300 mt-4 italic">
           Recipient: +234 706 222 8026
         </p>
      </div>
      
      <div className="text-center">
         <button 
           onClick={onRestart}
           className="text-slate-400 hover:text-indigo-600 text-sm font-medium transition-colors"
         >
           Start New Session
         </button>
      </div>
    </div>
  );
};

export default ResultSummary;
