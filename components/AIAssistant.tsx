
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { chatWithAssistant } from '../services/geminiService';

interface Message {
  text: string;
  isBot: boolean;
  id: string;
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "أهلاً بك! أنا مساعدك الرمضاني. كيف يمكنني مساعدتك اليوم؟ يمكنك سؤالي عن تنظيم الوقت، أو معاني آيات قرآنية، أو نصائح للعمل أثناء الصيام.", isBot: true, id: 'init' }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { text: input, isBot: false, id: Date.now().toString() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await chatWithAssistant(input, []);
      const botMsg: Message = { text: response || "عذراً، حدث خطأ ما.", isBot: true, id: (Date.now() + 1).toString() };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      const botMsg: Message = { text: "حدث خطأ في الاتصال، يرجى المحاولة لاحقاً.", isBot: true, id: (Date.now() + 1).toString() };
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] md:h-[calc(100vh-200px)] animate-in slide-in-from-bottom-4 duration-500">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Sparkles className="text-amber-500" />
          المساعد الرمضاني الذكي
        </h2>
        <p className="text-slate-500">استشر الذكاء الاصطناعي في رحلتك الروحانية</p>
      </div>

      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col overflow-hidden">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl ${
                msg.isBot 
                  ? 'bg-slate-50 text-slate-800 rounded-tr-none' 
                  : 'bg-emerald-600 text-white rounded-tl-none shadow-md'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  {msg.isBot ? <Sparkles size={14} className="text-amber-500" /> : <User size={14} />}
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                    {msg.isBot ? 'رمضان بلس AI' : 'أنت'}
                  </span>
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-50 p-4 rounded-2xl rounded-tr-none flex items-center gap-2">
                <Loader2 className="animate-spin text-emerald-600" size={18} />
                <span className="text-xs text-slate-400 font-medium">جاري التفكير...</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t bg-slate-50/50">
          <div className="relative max-w-4xl mx-auto flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="اسأل عن أي شيء يخص رمضان..."
              className="w-full bg-white border border-slate-200 rounded-2xl py-3 px-5 pr-12 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all shadow-sm text-sm"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute left-2 bg-emerald-600 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 transition-colors shadow-sm"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="mt-2 text-[10px] text-center text-slate-400">
            قد يخطئ الذكاء الاصطناعي، يرجى التأكد من المعلومات الفقهية من مصادرها الموثوقة.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
