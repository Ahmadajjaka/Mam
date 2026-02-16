
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer, Award, Coffee } from 'lucide-react';

const StudyTracker: React.FC = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState<'study' | 'break'>('study');

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setIsActive(false);
          // Audio or notification could go here
          alert(sessionType === 'study' ? "انتهت جلسة الدراسة! خذ استراحة." : "انتهت الاستراحة! عد للدراسة.");
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, sessionType]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(sessionType === 'study' ? 25 : 5);
    setSeconds(0);
  };

  const switchMode = (mode: 'study' | 'break') => {
    setSessionType(mode);
    setIsActive(false);
    setMinutes(mode === 'study' ? 25 : 5);
    setSeconds(0);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">الدراسة والإنتاجية</h2>
          <p className="text-slate-500">نظم وقتك واستغل ساعات الصيام</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
            <div className="flex gap-4 mb-8">
              <button 
                onClick={() => switchMode('study')}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  sessionType === 'study' ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-400' : 'bg-slate-100 text-slate-500'
                }`}
              >
                جلسة دراسة
              </button>
              <button 
                onClick={() => switchMode('break')}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  sessionType === 'break' ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-400' : 'bg-slate-100 text-slate-500'
                }`}
              >
                استراحة قصيرة
              </button>
            </div>

            <div className="relative mb-10">
              <div className="text-8xl font-black text-slate-800 tracking-tighter tabular-nums">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
              <div className={`absolute -top-6 -right-6 p-2 rounded-xl text-white ${sessionType === 'study' ? 'bg-amber-500' : 'bg-emerald-500'}`}>
                {sessionType === 'study' ? <Timer size={20} /> : <Coffee size={20} />}
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={toggleTimer}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110 active:scale-95 ${
                  isActive ? 'bg-slate-800' : 'bg-emerald-600'
                }`}
              >
                {isActive ? <Pause size={28} /> : <Play size={28} className="mr-1" />}
              </button>
              <button 
                onClick={resetTimer}
                className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
              >
                <RotateCcw size={28} />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <Award className="text-amber-500" size={20} />
              إنجازات اليوم
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-bold">الجلسات المكتملة</p>
                  <p className="text-xs text-slate-400">٤ جلسات بومودورو</p>
                </div>
                <span className="text-xs font-black text-slate-600">١٠٠ د</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-bold">التركيز</p>
                  <p className="text-xs text-slate-400">مستوى عالٍ جداً</p>
                </div>
                <span className="text-xs font-black text-emerald-600">ممتاز</span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-900 p-6 rounded-3xl text-emerald-50 shadow-lg">
            <h4 className="font-bold mb-2">نصيحة دراسية</h4>
            <p className="text-sm opacity-80 leading-relaxed">
              أفضل وقت للدراسة في رمضان هو بعد صلاة الفجر مباشرة أو بعد صلاة التراويح. تجنب المهام الشاقة قبل الإفطار مباشرة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyTracker;
