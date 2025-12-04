import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are "ZenBot", a compassionate, calm, and wise meditation and wellness coach for the "ZenFlow" platform. 
Your goal is to help users find peace, recommend meditation courses (Free, Basic, or Bootcamp), and answer general wellness/health (养生) questions.
Keep your answers concise, soothing, and supportive. 
If a user asks for course recommendations, suggest types of courses based on their stress level or goals.
Use emojis sparingly but effectively to convey calmness 🌿 🧘 🍵.
`;

export const streamGeminiResponse = async (
  history: { role: string; text: string }[],
  userMessage: string,
  onChunk: (text: string) => void
): Promise<void> => {
  // Check for API Key existence securely.
  // We check if 'process' exists to avoid ReferenceError in environments where it's not polyfilled.
  let apiKey = '';
  try {
    if (typeof process !== 'undefined' && process.env) {
      apiKey = process.env.API_KEY || '';
    }
  } catch (e) {
    // Ignore error if process access fails
    console.warn("Could not access process.env");
  }
  
  if (!apiKey) {
    onChunk("⚠️ 系统提示：未检测到 API Key。AI 助手暂时无法连接宇宙能量 (请检查环境配置)。");
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      })),
    });

    const result = await chat.sendMessageStream({ message: userMessage });

    for await (const chunk of result) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    onChunk("抱歉，我现在感觉不到与宇宙的连接 (网络或服务错误)，请稍后再试。🙏");
  }
};