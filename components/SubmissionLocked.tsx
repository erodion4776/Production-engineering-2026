
import React from 'react';
import { ShieldCheck, MessageCircle, Info, ChevronRight } from 'lucide-react';

interface Props {
  score: number;
  onWhatsAppSubmit: () => void;
  onViewReview: () => void;
}

const SubmissionLocked: React.FC<Props> = ({ score, onWhatsAppSubmit, onViewReview }) => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-8 text-center bg-white">
      <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
        <ShieldCheck size={40} />
      </div>

      <h2 className="text-3xl font-black text-slate-800 mb-2">Assessment Locked</h2>
      <p className="text-slate-500 font-medium mb-8 max-w-sm mx-auto">
        Your device is now locked. Answers cannot be modified.
      </p>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-10 w-full max-w-xs shadow-inner">
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">CBT Performance</div>
        <div className="text-5xl font-black text-indigo-900">{score}<span className="text-xl text-slate-300 ml-1">/50</span></div>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <button
          onClick={onWhatsAppSubmit}
          className="w-full py-5 bg-green-600 hover:bg-green-700 text-white font-black rounded-2xl shadow-xl shadow-green-100 transition-all flex items-center justify-center gap-3 active:scale-95 text-lg"
        >
          <MessageCircle size={28} /> SUBMIT TO ENGR. ERO
        </button>

        <button
          onClick={onViewReview}
          className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 text-sm"
        >
          <Info size={18} /> View Corrections & Explanations <ChevronRight size={16} />
        </button>
      </div>

      <p className="mt-12 text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
        <ShieldCheck size={12} /> Verification Flag Set in Storage
      </p>
    </div>
  );
};

export default SubmissionLocked;
