
import React, { useState } from 'react';
import { PRAYER_NAMES, INITIAL_PRAYERS } from '../constants';
import { PrayerLog } from '../types';
import { Check, Clock, Info, CheckCircle2 } from 'lucide-react';

const PrayerTracker: React.FC = () => {
  const [prayers, setPrayers] = useState<PrayerLog>(INITIAL_PRAYERS);

  const togglePrayer = (id: keyof PrayerLog) => {
    setPrayers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getPrayerTime = (id: string) => {
    const times: Record<string, string> = {
      fajr: '٤:٤٢ ص',
      dhuhr: '١٢:١٥ م',
      asr: '٣:٤٠ م',
      maghrib: '٦:٢٥ م',
      isha: '٧:٥٥ م',
      taraweeh: '٨:٣٠ م',
      qiyam: '٣:٠٠ ص',
    };
    return times[id] || '--:--';
  };

  const completedCount = Object.values(prayers).filter(Boolean).length;
  const totalCount = Object.keys(prayers).length;

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">تتبع الصلوات</h2>
          <p className="text-slate-500">حافظ على صلواتك في وقتها</p>
        </div>
        <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-2xl font-bold flex items-center gap-2">
          <CheckCircle2 size={20} />
          {completedCount} / {totalCount}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(Object.keys(PRAYER_NAMES) as Array<keyof PrayerLog>).map((key) => (
          <button
            key={key}
            onClick={() => togglePrayer(key)}
            className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300 ${
              prayers[key]
                ? 'bg-emerald-50 border-emerald-500 shadow-md scale-[1.02]'
                : 'bg-white border-slate-100 hover:border-emerald-200'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                prayers[key] ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
              }`}>
                {prayers[key] ? <Check size={24} /> : <Clock size={20} />}
              </div>
              <div className="text-right">
                <p className={`font-bold ${prayers[key] ? 'text-emerald-900' : 'text-slate-700'}`}>
                  {PRAYER_NAMES[key]}
                </p>
                <p className="text-xs text-slate-400">{getPrayerTime(key)}</p>
              </div>
            </div>
            {prayers[key] && (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-lg">
                تمت الصلاة
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex gap-3 items-start">
        <Info className="text-amber-500 mt-1" size={20} />
        <div>
          <h4 className="font-bold text-amber-900 text-sm">تذكير روحي</h4>
          <p className="text-amber-800 text-xs leading-relaxed">
            قال رسول الله ﷺ: "أحبُّ الأعمالِ إلى اللهِ الصلاةُ لوقتِها". اجعل صلاتك أولوية في يومك الرمضاني لتنال البركة في وقتك وعملك.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrayerTracker;
