
import React from 'react';
import { BookOpen, Lock, PlayCircle, Star } from 'lucide-react';

interface Props {
  onSelectModule: (id: number) => void;
}

const modules = [
  { id: 1, title: 'Module 1: Fundamentals', desc: 'Work Measurement & Industrial Profitability.', isLocked: false },
  { id: 2, title: 'Module 2: Rating Techniques', desc: 'Advanced Performance Rating.', isLocked: true },
  { id: 3, title: 'Module 3: Allowance Systems', desc: 'Fatigue & Personal Factors.', isLocked: true },
  { id: 4, title: 'Module 4: Method Study', desc: 'Eliminating Non-Productive Motion.', isLocked: true },
  { id: 5, title: 'Module 5: Takt & Cycle Time', desc: 'Synchronizing with Demand.', isLocked: true },
  { id: 6, title: 'Module 6: Industrial Ergonomics', desc: 'Postural Efficiency & Safety.', isLocked: true },
  { id: 7, title: 'Module 7: Line Balancing', desc: 'Optimizing Production Flow.', isLocked: true },
  { id: 8, title: 'Module 8: Overheads & Costs', desc: 'The Financial Impact of Time.', isLocked: true },
  { id: 9, title: 'Module 9: Queueing Theory', desc: 'Optimizing Service Systems.', isLocked: true },
  { id: 10, title: 'Module 10: Final Project', desc: 'Integrated Lab Submission.', isLocked: true }
];

const ModuleDashboard: React.FC<Props> = ({ onSelectModule }) => {
  return (
    <div className="p-6 sm:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-800">Learning Dashboard</h2>
        <p className="text-slate-500 text-sm">Select a module to begin your training session.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {modules.map((m) => (
          <button
            key={m.id}
            disabled={m.isLocked}
            onClick={() => onSelectModule(m.id)}
            className={`text-left p-5 rounded-2xl border-2 transition-all group relative overflow-hidden ${
              m.isLocked 
              ? 'bg-slate-50 border-slate-100 grayscale cursor-not-allowed opacity-60' 
              : 'bg-white border-indigo-100 hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-50 active:scale-[0.98]'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg ${m.isLocked ? 'bg-slate-200 text-slate-400' : 'bg-indigo-600 text-white'}`}>
                {m.isLocked ? <Lock size={20} /> : <BookOpen size={20} />}
              </div>
              {!m.isLocked && <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase"><Star size={10} fill="currentColor" /> Unlocked</span>}
            </div>
            
            <h3 className={`font-bold text-base mb-1 ${m.isLocked ? 'text-slate-400' : 'text-slate-800'}`}>{m.title}</h3>
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{m.desc}</p>
            
            {!m.isLocked && (
              <div className="mt-4 flex items-center gap-2 text-indigo-600 font-bold text-xs">
                START MODULE <PlayCircle size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModuleDashboard;
