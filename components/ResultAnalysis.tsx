
import React from 'react';
import { TrialResult } from '../types';
import { Clock, ArrowRight, BookOpen, BrainCircuit, Activity, Calculator, ShieldCheck, Target } from 'lucide-react';

interface Props {
  trials: TrialResult[];
  assignedModule: string;
  onProceed: () => void;
}

const ResultAnalysis: React.FC<Props> = ({ trials, assignedModule, onProceed }) => {
  const avgTime = parseFloat((trials.reduce((sum, t) => sum + t.duration, 0) / trials.length).toFixed(3));
  const efficiency = Math.round((3.0 / avgTime) * 100);

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6 border-b border-slate-100 bg-white">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-900 p-2 rounded-lg text-white">
            <BookOpen size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Industrial Competency Analysis</h2>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Scientific Management & Labor Measurement</p>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-8 bg-slate-50/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-slate-400 text-xs font-bold uppercase mb-1">Psychomotor Mean (T_obs)</div>
            <div className="text-3xl font-black text-indigo-900">{avgTime}s</div>
            <p className="text-[10px] text-slate-400 mt-1 italic">Calculated from 10 high-difficulty cycle repetitions.</p>
          </div>
          <div className="bg-indigo-900 p-5 rounded-xl text-white shadow-md">
            <div className="text-indigo-300 text-xs font-bold uppercase mb-1">Coordination Efficiency</div>
            <div className="text-3xl font-black">{efficiency}%</div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded-2xl border-4 border-indigo-100 shadow-lg relative overflow-hidden group transition-all hover:border-indigo-200">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
               <Target size={100} />
            </div>
            <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">Algorithm Assignment</div>
            <h3 className="text-2xl font-black text-slate-800 mb-2 leading-tight">
              Assigned: {assignedModule}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed max-w-lg">
              Based on your psychomotor results, you have been routed to this specific module. Each student is assigned a different topic to ensure broad curriculum coverage.
            </p>
          </div>

          <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4 text-indigo-900">
              <div className="p-2 bg-indigo-100 rounded-lg"><Activity size={20} /></div>
              <h3 className="font-bold text-lg uppercase tracking-tight">The Industrial Formula</h3>
            </div>
            <div className="space-y-4 font-mono text-xs sm:text-sm bg-slate-900 text-green-400 p-5 rounded-xl shadow-xl">
               <div className="border-b border-slate-800 pb-3">
                 <div className="text-slate-500 text-[10px] font-bold mb-1">NORMAL TIME (NT)</div>
                 <span className="text-white">NT = Observed Time × (Rating / 100)</span>
               </div>
               <div>
                 <div className="text-slate-500 text-[10px] font-bold mb-1">STANDARD TIME (ST)</div>
                 <span className="text-white">ST = NT × (1 + Allowance_Factor)</span>
               </div>
            </div>
          </section>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
             <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase mb-2">
               <ShieldCheck size={16} /> Examination Notice
             </div>
             <p className="text-amber-800 text-xs font-bold leading-snug">
               You are about to enter the lecture phase. Study all 15 slides. You will face 50 questions strictly on <strong>{assignedModule}</strong>. One attempt only.
             </p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white border-t border-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button
          onClick={onProceed}
          className="w-full flex items-center justify-center gap-3 py-4 bg-indigo-600 text-white rounded-xl font-black text-lg hover:bg-indigo-700 transition-all active:scale-95 shadow-xl shadow-indigo-100"
        >
          START MODULE LESSON <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ResultAnalysis;
