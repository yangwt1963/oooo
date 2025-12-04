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
  try {
    // Initialize the client here to avoid top-level errors if API_KEY is missing during module load.
    // Use an empty string as fallback to allow the constructor to pass, though requests will fail gracefully if key is invalid.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

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
    onChunk("抱歉，我现在感觉不到与宇宙的连接 (API Key 配置问题或网络错误)，请检查设置。🙏");
  }
};