import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Send, Trash2, Bot, User, AlertTriangle, Loader2 } from 'lucide-react';
import api from '../api/api';
import toast from 'react-hot-toast';

const AIChat = () => {
  const { darkMode } = useTheme();
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi! I'm VibeWell AI, your mental health companion. I'm here to listen, support, and guide you. How are you feeling today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [riskLevel, setRiskLevel] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const { data } = await api.post('/ai/chat', { message: userMsg });
      // Backend sends: { success, message, data: { reply, riskLevel } }
      const aiReply = data?.data?.reply || data?.reply || data?.data?.response || data?.response || 'I hear you. Can you tell me more?';
      const risk = data?.data?.riskLevel || data?.riskLevel || null;

      setMessages((prev) => [...prev, { role: 'ai', text: aiReply }]);
      if (risk) setRiskLevel(risk);
    } catch (err) {
      console.error('AI Chat Error:', err.response?.data || err.message);
      const errMsg = err.response?.status === 429
        ? 'Too many requests. Please wait a moment.'
        : err.response?.data?.message || 'Failed to get a response. Please try again.';
      toast.error(errMsg);
      setMessages((prev) => [...prev, { role: 'ai', text: "I'm having trouble connecting right now. Please try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ role: 'ai', text: "Chat cleared! How can I help you today?" }]);
    setRiskLevel(null);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] md:h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI Companion</h1>
          <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Your 24/7 mental health support</p>
        </div>
        <button
          onClick={clearChat}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${darkMode
            ? 'text-gray-500 hover:text-red-400 hover:bg-gray-800'
            : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
        >
          <Trash2 size={16} /> Clear
        </button>
      </div>

      {/* Crisis Alert */}
      {riskLevel === 'severe' && (
        <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
          <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-red-500 font-bold text-sm">Crisis Support Available</p>
            <p className={`text-xs mt-1 ${darkMode ? 'text-red-400/70' : 'text-red-600/70'}`}>
              If you're in immediate danger, please call{' '}
              <a href="tel:9152987821" className="underline font-bold">9152987821</a> (Kiran Helpline)
            </p>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto rounded-2xl p-4 md:p-6 border mb-4 space-y-4 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'ai'
              ? 'bg-[#c5a944]/10 text-[#c5a944]'
              : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
              }`}>
              {msg.role === 'ai' ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'ai'
              ? darkMode
                ? 'bg-gray-800 text-gray-200 rounded-tl-sm'
                : 'bg-gray-100 text-gray-800 rounded-tl-sm'
              : 'bg-[#c5a944] text-gray-900 rounded-tr-sm'
              }`}>
              <pre className="whitespace-pre-wrap font-sans">{msg.text}</pre>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#c5a944]/10 text-[#c5a944]">
              <Bot size={16} />
            </div>
            <div className={`px-4 py-3 rounded-2xl rounded-tl-sm ${darkMode ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full animate-bounce ${darkMode ? 'bg-gray-500' : 'bg-gray-400'}`} style={{ animationDelay: '0ms' }} />
                <div className={`w-2 h-2 rounded-full animate-bounce ${darkMode ? 'bg-gray-500' : 'bg-gray-400'}`} style={{ animationDelay: '150ms' }} />
                <div className={`w-2 h-2 rounded-full animate-bounce ${darkMode ? 'bg-gray-500' : 'bg-gray-400'}`} style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
          className={`flex-1 px-5 py-3.5 rounded-xl border outline-none transition-all text-sm ${darkMode
            ? 'bg-gray-900 border-gray-800 text-white placeholder-gray-600 focus:border-[#c5a944]'
            : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#c5a944] focus:ring-2 focus:ring-[#c5a944]/20'
            }`}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="px-6 py-3.5 bg-[#c5a944] text-gray-900 rounded-xl font-bold hover:bg-[#d4b84e] transition-all disabled:opacity-50 flex items-center gap-2"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default AIChat;
