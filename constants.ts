
import { PrayerLog, QuranProgress } from './types';

export const PRAYER_NAMES: Record<keyof PrayerLog, string> = {
  fajr: 'الفجر',
  dhuhr: 'الظهر',
  asr: 'العصر',
  maghrib: 'المغرب',
  isha: 'العشاء',
  taraweeh: 'التراويح',
  qiyam: 'قيام الليل',
};

export const INITIAL_PRAYERS: PrayerLog = {
  fajr: false,
  dhuhr: false,
  asr: false,
  maghrib: false,
  isha: false,
  taraweeh: false,
  qiyam: false,
};

export const INITIAL_QURAN: QuranProgress = {
  currentJuz: 1,
  currentSurah: 'الفاتحة',
  currentPage: 1,
  completedJuz: [],
};

export const RAMADAN_QUOTES = [
  "الصيام جُنَّة، فإذا كان يوم صوم أحدكم فلا يرفث ولا يصخب",
  "شهر رمضان الذي أنزل فيه القرآن هدى للناس وبينات من الهدى والفرقان",
  "خلوف فم الصائم أطيب عند الله من ريح المسك",
  "من صام رمضان إيماناً واحتساباً غفر له ما تقدم من ذنبه"
];
