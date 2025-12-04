import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, User, Bot } from 'lucide-react';
import { streamGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const AICoach: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: '你好！我是你的养生与冥想助手 ZenBot。今天想聊聊什么？是关于冥想技巧，还是最近感到压力有些大？🌿' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    let currentResponse = "";
    const responseId = (Date.now() + 1).toString();
    
    // Create a placeholder for the model response
    setMessages(prev => [...prev, { id: responseId, role: 'model', text: '', isThinking: true }]);

    await streamGeminiResponse(
      messages.map(m => ({ role: m.role, text: m.text })),
      userMsg.text,
      (chunk) => {
        currentResponse += chunk;
        setMessages(prev => 
          prev.map(msg => 
            msg.id === responseId 
              ? { ...msg, text: currentResponse, isThinking: false } 
              : msg
          )
        );
      }
    );

    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`${isOpen ? 'hidden' : 'flex'} fixed bottom-6 right-6 h-14 w-14 bg-teal-600 hover:bg-teal-700 text-white rounded-full shadow-lg items-center justify-center transition-all duration-300 z-40 hover:scale-110`}
        aria-label="Open AI Coach"
      >
        <Sparkles className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 w-full max-w-sm sm:w-[400px] bg-white rounded-2xl shadow-2xl transition-all duration-300 z-50 overflow-hidden border border-stone-200 flex flex-col ${isOpen ? 'opacity-100 scale-100 translate-y-0 h-[600px]' : 'opacity-0 scale-95 translate-y-10 h-0 pointer-events-none'}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-800 p-4 flex justify-between items-center text-white">
          <div className="flex items-center space-x-2">
            <div className="bg-white/20 p-1.5 rounded-full">
               <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm">ZenBot 养生助手</h3>
              <p className="text-xs text-teal-100 opacity-90">基于 Google Gemini</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-teal-600 text-white rounded-br-none'
                    : 'bg-white text-stone-800 border border-stone-100 rounded-bl-none'
                }`}
              >
                {msg.text}
                {msg.isThinking && <span className="inline-block w-1.5 h-4 ml-1 bg-stone-400 animate-pulse align-middle"></span>}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-stone-100">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="询问关于冥想、失眠或养生..."
              className="flex-1 bg-stone-100 text-stone-800 placeholder-stone-400 border-0 rounded-full px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-sm"
              disabled={isTyping}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="bg-teal-600 text-white p-3 rounded-full hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AICoach;