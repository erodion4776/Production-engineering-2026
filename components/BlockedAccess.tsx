
import React from 'react';
import { ShieldAlert, LogOut } from 'lucide-react';

const BlockedAccess: React.FC = () => {
  return (
    <div className="p-12 text-center h-[500px] flex flex-col items-center justify-center bg-white rounded-2xl">
      <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-6 animate-pulse">
        <ShieldAlert size={48} />
      </div>
      <h2 className="text-3xl font-black text-slate-800 mb-4">ACCESS BLOCKED</h2>
      <p className="text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
        You have already completed this assessment. To ensure academic integrity, 
        <strong className="text-red-600"> submissions are limited to one attempt per device.</strong>
      </p>
      <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-400 uppercase tracking-widest font-bold">
        Result Status: Recorded in Database
      </div>
      <button 
        onClick={() => window.location.reload()}
        className="mt-10 flex items-center gap-2 text-indigo-600 font-bold hover:underline"
      >
        <LogOut size={18} /> Exit Application
      </button>
    </div>
  );
};

export default BlockedAccess;
