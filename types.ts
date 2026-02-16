
export enum AppTab {
  Dashboard = 'dashboard',
  Prayers = 'prayers',
  Quran = 'quran',
  Study = 'study',
  AI = 'ai'
}

export interface PrayerLog {
  fajr: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
  taraweeh: boolean;
  qiyam: boolean;
}

export interface QuranProgress {
  currentJuz: number;
  currentSurah: string;
  currentPage: number;
  completedJuz: number[];
}

export interface StudySession {
  id: string;
  duration: number; // in minutes
  date: string;
  subject: string;
}

export interface DailyActivity {
  date: string;
  prayers: PrayerLog;
  quran: QuranProgress;
  studyTime: number; // total minutes
}
