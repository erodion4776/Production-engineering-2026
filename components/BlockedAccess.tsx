
import React from 'react';
import { ShieldAlert, LogOut, RefreshCcw, CreditCard, Award, ShieldCheck } from 'lucide-react';

interface Props {
  previousScore: number;
  onRetake: () => void;
  onReverify: () => void;
  isRewriteCompleted?: boolean;
}

const BlockedAccess: React.FC<Props> = ({ previousScore, onRetake, onReverify, isRewriteCompleted = false }) => {
  return (
    <div className="p-8 text-center h-full flex flex-col items-center justify-center bg-white rounded-2xl">
      <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-6 shadow-sm">
        <Award size={40} />
      </div>
      
      <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase tracking-tight">Assessment Completed</h2>
      <p className="text-slate-500 font-medium max-w-sm mx-auto leading-relaxed mb-6">
        {isRewriteCompleted 
          ? "Your official rewrite attempt has been recorded. No further attempts are permitted."
          : "You have already submitted your production engineering proficiency test."}
      </p>

      <div className="w-full max-w-xs bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8 shadow-inner">
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Previous CBT Score</div>
        <div className="text-5xl font-black text-indigo-900">{previousScore}<span className="text-xl text-slate-300 ml-1">/50</span></div>
      </div>

      <div className="w-full max-w-sm space-y-3">
        {!isRewriteCompleted && (
          <button 
            onClick={onRetake}
            className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 transition-all flex flex-col items-center justify-center active:scale-95 group"
          >
            <div className="flex items-center gap-2 text-lg">
              <RefreshCcw size={22} className="group-hover:rotate-180 transition-transform duration-500" /> RETAKE TEST
            </div>
            <div className="text-[10px] opacity-80 font-bold uppercase tracking-widest flex items-center gap-1 mt-1">
               <CreditCard size={10} /> Premium Access (₦500)
            </div>
          </button>
        )}

        {!isRewriteCompleted && (
          <button 
            onClick={onReverify}
            className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <ShieldCheck size={18} className="text-indigo-600" /> Check for Special Access
          </button>
        )}

        <button 
          onClick={() => window.location.reload()}
          className="w-full py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors text-sm flex items-center justify-center gap-2"
        >
          <LogOut size={16} /> Exit Application
        </button>
      </div>

      <div className="mt-8 p-3 bg-red-50 rounded-xl border border-red-100 flex items-center gap-3 max-w-xs">
        <ShieldAlert size={16} className="text-red-500 flex-shrink-0" />
        <p className="text-[10px] text-red-700 font-bold text-left leading-tight">
          {isRewriteCompleted 
            ? "Access to this portal is now permanently locked for this matriculation number."
            : "Retake mode skips learning slides and simulation. It grants a 10-minute timer for a fresh attempt."}
        </p>
      </div>
    </div>
  );
};

export default BlockedAccess;
