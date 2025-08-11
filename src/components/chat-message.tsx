import { ChatMessage } from '@/types/chat';
import { Card } from '@/components/ui/card';
import { User, Bot, Zap } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { createAnimation } from '@/lib/animation-presets';

interface ChatMessageProps {
  message: ChatMessage;
  isStreaming?: boolean;
  index: number;
}

export function ChatMessageComponent({ message, isStreaming = false, index }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const messageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      const delay = Math.min(index * 50, 300); // Cap the delay
      if (isUser) {
        createAnimation(messageRef.current, 'fadeInRight', { delay });
      } else {
        createAnimation(messageRef.current, 'fadeInLeft', { delay });
      }
    }
  }, [isUser, index]);

  return (
    <div 
      ref={messageRef}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6 opacity-0`}
    >
      <div className={`max-w-[85%] ${isUser ? 'order-2' : 'order-1'}`}>
        <Card className={`${
          isUser 
            ? 'bg-yellow-400 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' 
            : 'bg-white border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
        }`}>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className={`p-2 rounded-none border-2 border-black ${
                isUser ? 'bg-white' : 'bg-purple-400'
              }`}>
                {isUser ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
              <span className="font-black text-sm uppercase tracking-wide">
                {isUser ? 'You' : 'AI Assistant'}
              </span>
              {isStreaming && (
                <div className="flex items-center gap-1">
                  <Zap className="h-3 w-3 text-green-600" />
                  <span className="text-xs font-bold text-green-600 uppercase">Live</span>
                </div>
              )}
            </div>
            <div 
              ref={contentRef}
              className="whitespace-pre-wrap text-sm font-medium leading-relaxed"
            >
              {message.content}
              {isStreaming && (
                <span className="inline-block w-2 h-5 bg-black ml-1 animate-pulse" />
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}