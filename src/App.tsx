import { useState } from 'react';
import { Header } from './components/Header';
import { ChatWindow } from './components/ChatWindow';
import { ChatInput } from './components/ChatInput';
import { Message } from './types';
import { getActionSuggestion } from './services/wiraHatiService';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Hello, I'm WiraHati. I'm here to listen and help you find a physical outlet for your emotions. How are you feeling today?",
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await getActionSuggestion(text);
      
      let assistantText = '';
      if (response.error) {
        assistantText = response.fallbackMessage || "I'm having trouble connecting to my resources, but I still suggest taking 5 deep breaths.";
      } else if (response.displayMessage) {
        assistantText = response.displayMessage;
      } else {
        assistantText = `I hear you. To help shift that energy, let's try this: ${response.activityName}.`;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: assistantText,
        videoId: response.videoId,
        actionLink: response.actionLink,
        isError: response.error,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: "I'm having trouble connecting to my resources, but I still suggest taking 5 deep breaths.",
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div className="flex-shrink-0 bg-white border-b border-slate-200 shadow-sm z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-center">
          <Header />
        </div>
      </div>
      
      <ChatWindow messages={messages} isLoading={isLoading} />
      
      <div className="flex-shrink-0 z-10">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
