
import React, { useState } from 'react';
import { Book, Bookmark, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { INITIAL_QURAN } from '../constants';
import { QuranProgress } from '../types';

const QuranTracker: React.FC = () => {
  const [progress, setProgress] = useState<QuranProgress>(INITIAL_QURAN);

  const updatePage = (amount: number) => {
    setProgress(prev => ({
      ...prev,
      currentPage: Math.max(1, Math.min(604, prev.currentPage + amount))
    }));
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">ختمة القرآن</h2>
          <p className="text-slate-500">تابع تقدمك في قراءة كتاب الله</p>
        </div>
        <div className="flex gap-2">
           <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-emerald-700 transition-colors">
             <Bookmark size={18} />
             حفظ علامة
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full mb-4">
              <Book size={40} />
            </div>
            <h3 className="text-3xl font-bold quran-font mb-2">سورة {progress.currentSurah}</h3>
            <p className="text-slate-500 mb-8">الجزء {progress.currentJuz} • الصفحة {progress.currentPage}</p>
            
            <div className="flex items-center justify-center gap-8">
              <button 
                onClick={() => updatePage(-1)}
                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-emerald-600 transition-all"
              >
                <ChevronRight size={24} />
              </button>
              
              <div className="flex flex-col items-center">
                <span className="text-5xl font-black text-emerald-600">{progress.currentPage}</span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">الصفحة</span>
              </div>

              <button 
                onClick={() => updatePage(1)}
                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-emerald-600 transition-all"
              >
                <ChevronLeft size={24} />
              </button>
            </div>

            <div className="mt-10 flex gap-2">
              <button onClick={() => updatePage(-10)} className="flex-1 py-2 bg-slate-50 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100">- ١٠ صفحات</button>
              <button onClick={() => updatePage(10)} className="flex-1 py-2 bg-slate-50 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100">+ ١٠ صفحات</button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
             <h4 className="font-bold mb-4">الأجزاء المكتملة</h4>
             <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
               {Array.from({ length: 30 }, (_, i) => i + 1).map(juz => (
                 <button 
                   key={juz}
                   className={`aspect-square flex items-center justify-center rounded-xl text-xs font-bold transition-all ${
                     juz < progress.currentJuz 
                      ? 'bg-emerald-500 text-white' 
                      : juz === progress.currentJuz 
                        ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-500' 
                        : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                   }`}
                 >
                   {juz}
                 </button>
               ))}
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-amber-400 to-amber-500 p-6 rounded-3xl text-amber-950 shadow-md">
            <h4 className="font-bold mb-2">خطة الختمة</h4>
            <p className="text-sm opacity-90 mb-4">لقراءة القرآن مرة واحدة في رمضان، تحتاج لقراءة ٢٠ صفحة يومياً.</p>
            <div className="space-y-3">
              <div className="bg-white/20 p-3 rounded-2xl flex justify-between items-center">
                <span className="text-xs font-bold">المتبقي لليوم</span>
                <span className="text-lg font-black">١٤ صفحة</span>
              </div>
              <div className="bg-white/20 p-3 rounded-2xl flex justify-between items-center">
                <span className="text-xs font-bold">الإنجاز الكلي</span>
                <span className="text-lg font-black">٦٢ / ٦٠٤</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h4 className="font-bold mb-4">آية اليوم</h4>
            <p className="quran-font text-lg text-emerald-800 leading-relaxed mb-4">
              "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ"
            </p>
            <p className="text-xs text-slate-400 font-bold">سورة البقرة - آية ١٨٦</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuranTracker;
