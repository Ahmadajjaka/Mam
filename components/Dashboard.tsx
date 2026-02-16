
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { CheckCircle2, Book, Clock, TrendingUp } from 'lucide-react';
import { getRamadanTip } from '../services/geminiService';

const Dashboard: React.FC = () => {
  const [tip, setTip] = useState<string>("جاري تحميل نصيحة اليوم...");

  useEffect(() => {
    getRamadanTip().then(setTip);
  }, []);

  const prayerData = [
    { name: 'مكتمل', value: 5 },
    { name: 'متبقي', value: 2 },
  ];

  const weeklyStudyData = [
    { day: 'سبت', hours: 2 },
    { day: 'أحد', hours: 4 },
    { day: 'اثنين', hours: 3 },
    { day: 'ثلاثاء', hours: 5 },
    { day: 'أربعاء', hours: 4 },
    { day: 'خميس', hours: 2 },
    { day: 'جمعة', hours: 6 },
  ];

  const COLORS = ['#10b981', '#e2e8f0'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-gradient-to-l from-emerald-800 to-emerald-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-2">السلام عليكم، صياماً مقبولاً!</h2>
          <p className="text-emerald-100 opacity-90 max-w-md">"{tip}"</p>
        </div>
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-10 -translate-y-10 blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-amber-400/20 rounded-full translate-x-10 translate-y-10 blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold flex items-center gap-2">
              <CheckCircle2 className="text-emerald-500" size={20} />
              الصلوات اليوم
            </h3>
            <span className="text-xs text-slate-400">٥ / ٧ صلاة</span>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={prayerData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {prayerData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-2">
            <span className="text-2xl font-bold text-emerald-600">٧١٪</span>
            <p className="text-xs text-slate-500">معدل الإنجاز اليومي</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold flex items-center gap-2">
              <Book className="text-blue-500" size={20} />
              القرآن الكريم
            </h3>
            <span className="text-xs text-slate-400">الجزء ٤</span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-sm mb-1">
              <span>تقدم الختمة</span>
              <span className="font-bold">١٣٪</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5">
              <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '13%' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-4">
              <div className="bg-blue-50 p-3 rounded-xl text-center">
                <p className="text-xs text-blue-600">آخر سورة</p>
                <p className="font-bold">آل عمران</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl text-center">
                <p className="text-xs text-blue-600">الصفحة</p>
                <p className="font-bold">٦٢</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold flex items-center gap-2">
              <Clock className="text-amber-500" size={20} />
              الدراسة والعمل
            </h3>
            <span className="text-xs text-slate-400">٣.٥ ساعة اليوم</span>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyStudyData}>
                <Bar dataKey="hours" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={10} />
                <Tooltip cursor={{fill: '#fffbeb'}} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-slate-500 mt-2">مقارنة بالأسبوع الماضي: <span className="text-emerald-500 font-bold">+١٥٪</span></p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="text-purple-500" size={20} />
          الخطة اليومية المقترحة
        </h3>
        <div className="space-y-3">
          {[
            { time: "٤:٠٠ ص", task: "السحور وصلاة الفجر", done: true },
            { time: "٥:٣٠ ص", task: "قراءة صفحتين من القرآن", done: true },
            { time: "٩:٠٠ ص", task: "بدء جلسة دراسة مركزة (Pomodoro)", done: true },
            { time: "١٢:٣٠ م", task: "صلاة الظهر وراحة قصيرة", done: false },
            { time: "٣:٣٠ م", task: "صلاة العصر وقراءة جزء من الورد", done: false },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors border-r-4 border-slate-100 hover:border-emerald-400">
               <span className="text-sm font-medium text-slate-400 w-16">{item.time}</span>
               <div className="flex-1">
                 <p className={`text-sm ${item.done ? 'line-through text-slate-400' : 'font-medium'}`}>{item.task}</p>
               </div>
               {item.done && <CheckCircle2 className="text-emerald-500" size={18} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
