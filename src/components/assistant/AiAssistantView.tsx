import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  Code2,
  HelpCircle,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { AiStudyService } from '../../services/aiService';
import { ChatMessage } from '../../types';

export const AiAssistantView: React.FC = () => {
  const { showToast } = useToast();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'assistant',
      content: `Hello! I am your **StudentOS Academic Assistant**.

I can help you review complex engineering concepts, generate examination cheat sheets, explain operating systems and DBMS internals, and formulate high-yield placement revision schedules.

Choose a suggested question below or type your own question!`,
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'Explain operating system process scheduling.',
    'Give me important questions for DBMS.',
    'Explain this Java code and memory model.',
    'Create a study plan for my exam.',
    'How does Dijkstra algorithm work with code?',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await AiStudyService.askQuestion(text);

      const assistantMsg: ChatMessage = {
        id: `msg_asst_${Date.now()}`,
        sender: 'assistant',
        content: response.content,
        codeSnippet: response.codeSnippet,
        language: response.language,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      showToast('Error generating AI response. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    showToast('Code copied to clipboard', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'msg_welcome',
        sender: 'assistant',
        content: `Conversation reset. What engineering topic would you like to explore?`,
        timestamp: 'Just now',
      },
    ]);
    showToast('Chat history reset', 'info');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 h-[calc(100vh-6rem)] flex flex-col space-y-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 dark:text-white">
              AI Study Assistant
            </h1>
            <p className="text-xs text-slate-500">
              Engineering curriculum tutor & interview revision mentor
            </p>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          title="Reset Chat"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 space-y-6">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isUser
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800 rounded-tl-none space-y-3'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>

                {msg.codeSnippet && (
                  <div className="mt-3 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 text-slate-100 font-mono text-xs">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400">
                      <span>{msg.language || 'code'}</span>
                      <button
                        onClick={() => handleCopyCode(msg.id, msg.codeSnippet!)}
                        className="flex items-center gap-1 hover:text-white transition-colors"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-3 overflow-x-auto text-[11px] leading-relaxed">
                      <code>{msg.codeSnippet}</code>
                    </pre>
                  </div>
                )}

                <div
                  className={`text-[10px] text-right mt-1.5 ${
                    isUser ? 'text-indigo-200' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
              <span className="text-xs text-slate-500 ml-1">Analyzing syllabus concepts...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
        {suggestedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 whitespace-nowrap transition-colors shrink-0 shadow-2xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs shrink-0"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask anything about Operating Systems, DBMS, Java, or exam plans..."
          className="flex-1 px-3 py-2 text-xs bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden"
        />

        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl transition-colors shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
