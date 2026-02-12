
import React, { useState, useRef, useEffect } from 'react';
import { TrialResult } from '../types';
import { Timer, ArrowRight, CheckCircle2, Package, RefreshCw, Target } from 'lucide-react';

interface Props {
  onComplete: (results: TrialResult[]) => void;
  studentName: string;
}

const AssemblySimulation: React.FC<Props> = ({ onComplete, studentName }) => {
  const [currentTrial, setCurrentTrial] = useState(1);
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0); // 0: Start, 1: Picked, 2: Assembled, 3: Finished
  const [trials, setTrials] = useState<TrialResult[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [buttonPos, setButtonPos] = useState({ top: '50%', left: '50%' });
  const containerRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(0);
  const timerIntervalRef = useRef<number | null>(null);

  const TOTAL_TRIALS = 10;

  const moveButton = () => {
    if (!containerRef.current) return;
    const padding = 80;
    const width = containerRef.current.clientWidth - padding * 2;
    const height = containerRef.current.clientHeight - padding * 2;
    const newTop = Math.floor(Math.random() * height) + padding;
    const newLeft = Math.floor(Math.random() * width) + padding;
    setButtonPos({ top: `${newTop}px`, left: `${newLeft}px` });
  };

  const startTimer = () => {
    startTimeRef.current = performance.now();
    timerIntervalRef.current = window.setInterval(() => {
      setCurrentTime((performance.now() - startTimeRef.current) / 1000);
    }, 10);
  };

  const stopTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    return (performance.now() - startTimeRef.current) / 1000;
  };

  const handleStep = () => {
    if (step === 0) {
      startTimer();
      setStep(1);
      moveButton();
    } else if (step === 1) {
      setStep(2);
      moveButton();
    } else if (step === 2) {
      const duration = stopTimer();
      const newTrial = { trialNumber: currentTrial, duration };
      const updatedTrials = [...trials, newTrial];
      setTrials(updatedTrials);
      setStep(3);
    }
  };

  const nextTrial = () => {
    if (currentTrial < TOTAL_TRIALS) {
      setCurrentTrial(prev => prev + 1);
      setStep(0);
      setCurrentTime(0);
      setButtonPos({ top: '50%', left: '50%' });
    } else {
      onComplete(trials);
    }
  };

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  return (
    <div className="p-6 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Advanced Psychomotor Task</h2>
          <p className="text-slate-500 text-sm italic">Operator Skill Analysis: {studentName}</p>
        </div>
        <div className="text-right">
          <div className="text-xs font-semibold text-indigo-600 uppercase tracking-tighter">Cycle Count</div>
          <div className="text-xl font-black text-slate-800">{currentTrial} / {TOTAL_TRIALS}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">
        <div 
          ref={containerRef}
          className="lg:col-span-2 bg-slate-900 rounded-2xl border-4 border-slate-800 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden shadow-inner"
        >
          {/* Fitts' Law Target Area */}
          <div className="absolute inset-0 opacity-10 pointer-events-none border-[20px] border-indigo-500/20 m-4 rounded-xl"></div>
          
          <div className="absolute top-6 left-6 text-2xl font-mono font-bold text-green-400 tabular-nums bg-black/40 px-4 py-2 rounded-lg border border-green-400/30">
            {currentTime.toFixed(3)}s
          </div>

          {step < 3 ? (
            <button
              onClick={handleStep}
              style={step === 0 ? {} : { position: 'absolute', top: buttonPos.top, left: buttonPos.left, transform: 'translate(-50%, -50%)' }}
              className={`px-8 py-4 rounded-full font-black text-white shadow-2xl transform transition-all active:scale-75 select-none flex items-center gap-2 z-10 ${
                step === 0 ? 'bg-blue-600 hover:bg-blue-700 relative' :
                step === 1 ? 'bg-indigo-600 hover:bg-indigo-700' :
                'bg-rose-600 hover:bg-rose-700'
              }`}
            >
              {step === 0 && <><Package size={20} /> INITIALIZE PICK</>}
              {step === 1 && <><Target size={20} /> ASSEMBLE</>}
              {step === 2 && <><CheckCircle2 size={20} /> DEPOSIT</>}
            </button>
          ) : (
            <div className="text-center animate-in fade-in zoom-in duration-300 z-20 bg-black/80 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
               <div className="text-green-400 font-black text-2xl mb-4 flex items-center justify-center gap-2">
                 <CheckCircle2 size={32} /> CYCLE {currentTrial} COMPLETE
               </div>
               <button
                 onClick={nextTrial}
                 className="px-10 py-4 bg-white text-slate-900 rounded-xl font-black hover:bg-slate-100 shadow-xl transition-all"
               >
                 {currentTrial === TOTAL_TRIALS ? 'GENERATE RANDOM MODULE' : 'START NEXT CYCLE'}
               </button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-indigo-900 p-4 rounded-xl text-white">
            <h3 className="text-xs font-bold uppercase text-indigo-300 mb-2">Experimental Rules</h3>
            <p className="text-[11px] leading-relaxed opacity-80">
              The target button will jump randomly to test your <strong>Hand-Eye Coordination</strong>. Speed is rewarded, but accuracy in locating the target is key to your average cycle time.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex-grow">
            <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
               <span className="text-[10px] font-bold text-slate-400 uppercase">Live Log</span>
               <Timer size={14} className="text-slate-300" />
            </div>
            <div className="max-h-[250px] overflow-y-auto">
              <table className="w-full text-xs text-left">
                <tbody className="divide-y divide-slate-100">
                  {trials.map((t) => (
                    <tr key={t.trialNumber} className="hover:bg-indigo-50 transition-colors">
                      <td className="px-4 py-2 font-bold text-slate-400">#0{t.trialNumber}</td>
                      <td className="px-4 py-2 font-mono font-bold text-indigo-600 text-right">{t.duration.toFixed(3)}s</td>
                    </tr>
                  ))}
                  {trials.length === 0 && (
                    <tr>
                      <td colSpan={2} className="px-4 py-8 text-center text-slate-300 italic">Awaiting operator input...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssemblySimulation;
