
export interface StudentData {
  name: string;
  matNo: string;
  serialNo: string;
  department: string;
}

export interface TrialResult {
  trialNumber: number;
  duration: number; // in seconds
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizAttempt {
  answers: Record<number, number>;
  score: number;
  questions: Question[];
  timeUsedSeconds?: number;
  isRetake?: boolean;
  isOfficialRewrite?: boolean;
}

export enum AppStage {
  REGISTRATION = 'REGISTRATION',
  DASHBOARD = 'DASHBOARD',
  EXPERIMENT = 'EXPERIMENT', // Simulation can be part of module 1 practice
  SLIDES = 'SLIDES',
  ANALYSIS = 'ANALYSIS',
  QUIZ = 'QUIZ',
  SUBMISSION_LOCKED = 'SUBMISSION_LOCKED',
  REVIEW = 'REVIEW',
  RESULTS = 'RESULTS',
  BLOCKED = 'BLOCKED'
}

export interface Module {
  id: number;
  title: string;
  description: string;
  isLocked: boolean;
}
