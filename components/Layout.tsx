
import React from 'react';
import { AppTab } from '../types';
import { 
  LayoutDashboard, 
  BookOpen, 
  Timer, 
  MessageSquare, 
  CheckSquare, 
  Moon, 
  Sun 
} from 'lucide-react';

interface LayoutProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ activeTab, setActiveTab, children }) => {
  const navItems = [
    { id: AppTab.Dashboard, label: 'الرئيسية', icon: <LayoutDashboard size={20} /> },
    { id: AppTab.Prayers, label: 'الصلوات', icon: <CheckSquare size={20} /> },
    { id: AppTab.Quran, label: 'القرآن', icon: <BookOpen size={20} /> },
    { id: AppTab.Study, label: 'الدراسة', icon: <Timer size={20} /> },
    { id: AppTab.AI, label: 'المساعد', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 text-slate-800">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-emerald-900 text-white p-6 shadow-xl sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-amber-400 p-2 rounded-lg">
            <Moon className="text-emerald-900" fill="currentColor" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">رمضان بلس</h1>
        </div>
        
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-amber-400 text-emerald-950 font-bold shadow-lg scale-105' 
                  : 'hover:bg-emerald-800/50 text-emerald-100'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-emerald-800 text-xs text-emerald-300 text-center">
          رمضان مبارك ١٤٤٦ هـ
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative">
        <header className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <div className="md:hidden flex items-center gap-2">
            <Moon className="text-emerald-700" size={24} />
            <h1 className="text-xl font-bold">رمضان بلس</h1>
          </div>
          <div className="hidden md:block">
            <span className="text-sm text-slate-500">التاريخ الهجري: ١ رمضان ١٤٤٦</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium border border-emerald-100">
               باقي على المغرب: ٥:٤٢ ساعة
             </div>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-6xl mx-auto w-full mb-20 md:mb-0">
          {children}
        </div>

        {/* Bottom Nav for Mobile */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-2 z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                activeTab === item.id ? 'text-emerald-700' : 'text-slate-400'
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </main>
    </div>
  );
};

export default Layout;
