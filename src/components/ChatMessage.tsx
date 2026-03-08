import { Message } from '../types';
import { VideoPlayer } from './VideoPlayer';
import { User, HeartPulse, ExternalLink } from 'lucide-react';
import clsx from 'clsx';

interface ChatMessageProps {
  message: Message;
  key?: string | number;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={clsx("flex w-full mb-6", isUser ? "justify-end" : "justify-start")}>
      <div className={clsx("flex max-w-[85%] sm:max-w-[75%]", isUser ? "flex-row-reverse" : "flex-row")}>
        
        <div className={clsx(
          "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
          isUser ? "bg-indigo-100 text-indigo-600 ml-3" : "bg-orange-100 text-orange-600 mr-3"
        )}>
          {isUser ? <User size={20} /> : <HeartPulse size={20} />}
        </div>

        <div className={clsx(
          "flex flex-col",
          isUser ? "items-end" : "items-start"
        )}>
          <div className={clsx(
            "px-5 py-3 rounded-2xl",
            isUser 
              ? "bg-indigo-600 text-white rounded-tr-sm" 
              : "bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm",
            message.isError && !isUser && "bg-red-50 border-red-200 text-red-800"
          )}>
            <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
          </div>
          
          {message.videoId && (
            <div className="mt-3 w-full max-w-md">
              <VideoPlayer videoId={message.videoId} />
            </div>
          )}

          {message.actionLink && !message.videoId && (
            <a 
              href={message.actionLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
            >
              <ExternalLink size={16} className="mr-2" />
              Watch on YouTube
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
