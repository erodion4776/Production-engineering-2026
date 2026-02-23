
import React, { useState, useMemo } from 'react';
import { StudentData } from '../types';
import { User, Hash, Briefcase, BookOpen, AlertCircle, ShieldCheck } from 'lucide-react';
import { isStudentWhitelisted } from '../constants/whitelist';

interface Props {
  onComplete: (data: StudentData) => void;
  isCompleted?: boolean;
}

const RegistrationForm: React.FC<Props> = ({ onComplete, isCompleted = false }) => {
  const [formData, setFormData] = useState<StudentData>({
    name: '',
    matNo: '',
    serialNo: '',
    department: ''
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({
    matNo: false,
    serialNo: false
  });

  const validations = useMemo(() => {
    const matNoRegex = /^ENG\d+$/;
    const serialNum = parseInt(formData.serialNo, 10);
    
    return {
      name: formData.name.trim().length > 0,
      matNo: matNoRegex.test(formData.matNo),
      serialNo: !isNaN(serialNum) && serialNum >= 1 && serialNum <= 130,
      department: formData.department !== ''
    };
  }, [formData]);

  const isValid = Object.values(validations).every(v => v);

  const isWhitelisted = useMemo(() => {
    return isStudentWhitelisted(formData.name, formData.matNo);
  }, [formData.name, formData.matNo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) onComplete(formData);
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 underline decoration-indigo-500 underline-offset-8">Student Portal</h2>
        <p className="text-slate-500 mt-4 text-sm font-medium">Production Engineering Lab Verification</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5 uppercase tracking-tight">Full Name</label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-slate-400"><User size={18} /></span>
            <input
              type="text"
              required
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="e.g. Osas Ighodaro"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
        </div>

        {/* Matriculation Number */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5 uppercase tracking-tight">Matriculation Number</label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-slate-400"><Hash size={18} /></span>
            <input
              type="text"
              required
              onBlur={() => handleBlur('matNo')}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 outline-none transition-all ${
                touched.matNo && !validations.matNo 
                ? 'border-red-500 focus:ring-red-200' 
                : 'border-slate-300 focus:ring-indigo-500'
              }`}
              placeholder="e.g. ENG190XXXX"
              value={formData.matNo}
              onChange={(e) => setFormData({ ...formData, matNo: e.target.value.toUpperCase() })}
            />
          </div>
          {touched.matNo && !validations.matNo && (
            <p className="mt-1.5 text-xs text-red-600 font-bold flex items-center gap-1">
              <AlertCircle size={12} /> Must start with 'ENG' followed by numbers.
            </p>
          )}
        </div>

        {/* Serial Number */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5 uppercase tracking-tight">Serial Number (1 - 130)</label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-slate-400"><Briefcase size={18} /></span>
            <input
              type="number"
              required
              min="1"
              max="130"
              onBlur={() => handleBlur('serialNo')}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 outline-none transition-all ${
                touched.serialNo && !validations.serialNo 
                ? 'border-red-500 focus:ring-red-200' 
                : 'border-slate-300 focus:ring-indigo-500'
              }`}
              placeholder="e.g. 45"
              value={formData.serialNo}
              onChange={(e) => setFormData({ ...formData, serialNo: e.target.value })}
            />
          </div>
          {touched.serialNo && !validations.serialNo && (
            <p className="mt-1.5 text-xs text-red-600 font-bold flex items-center gap-1">
              <AlertCircle size={12} /> Must be between 1 and 130.
            </p>
          )}
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5 uppercase tracking-tight">Department</label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-slate-400"><BookOpen size={18} /></span>
            <select
              required
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all appearance-none bg-white"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            >
              <option value="" disabled>Select Department</option>
              <option value="Production Engineering">Production Engineering</option>
              <option value="Industrial Engineering">Industrial Engineering</option>
            </select>
            <div className="absolute right-3 top-3.5 pointer-events-none text-slate-400">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {isCompleted && isWhitelisted ? (
          <button
            type="submit"
            className="w-full py-4 rounded-xl font-black text-white transition-all transform active:scale-95 shadow-lg flex flex-col items-center justify-center gap-1 bg-green-600 hover:bg-green-700 shadow-green-200"
          >
            <div className="flex items-center gap-2 text-lg">
              <ShieldCheck size={22} /> AUTHORIZED REWRITE AVAILABLE
            </div>
            <div className="text-[10px] opacity-80 font-bold uppercase tracking-widest">
              Special Access Granted (6-Minute Timer)
            </div>
          </button>
        ) : (
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-4 rounded-xl font-black text-white transition-all transform active:scale-95 shadow-lg flex items-center justify-center gap-2 ${
              isValid 
              ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' 
              : 'bg-slate-300 cursor-not-allowed grayscale'
            }`}
          >
            START EXPERIMENT
          </button>
        )}

        <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest mt-4">
          Verification Required for Result Recording
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
