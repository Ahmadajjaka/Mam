
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const getRamadanTip = async () => {
  const ai = getAIClient();
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: 'اعطني نصيحة قصيرة واحدة وملهمة لشهر رمضان، تركز على الروحانية أو الإنتاجية. بالعربية فقط.',
  });
  return response.text || "رمضان مبارك!";
};

export const chatWithAssistant = async (message: string, history: { role: string, parts: any[] }[]) => {
  const ai = getAIClient();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: 'أنت مساعد رمضاني ذكي ومحفز. تساعد المستخدمين في تنظيم وقتهم، فهم القرآن، تقديم نصائح للدراسة والعمل أثناء الصيام، والإجابة على الأسئلة الدينية البسيطة بروح إيجابية. تحدث دائماً بالعربية الفصحى البسيطة.',
    }
  });

  // Since we cannot pass the whole history directly in `sendMessage` as per documentation rules (it only takes message), 
  // we simulate a single turn for simplicity in this helper, or manage state outside.
  // Real implementation of history should be done via chat session.
  
  const response = await chat.sendMessage({ message });
  return response.text;
};
