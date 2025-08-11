import { ChatMessage } from '@/types/chat';
import { Card } from '@/components/ui/card';
import { User, Bot, Zap } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { createAnimation } from '@/lib/animation-presets';
import { parseMessageContent } from '@/lib/message-parser';

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
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 sm:mb-6 opacity-0`}
    >
      <div className={`max-w-[95%] sm:max-w-[85%] ${isUser ? 'order-2' : 'order-1'}`}>
        <Card className={`${
          isUser 
            ? 'bg-primary text-primary-foreground palantir-shadow-md' 
            : 'bg-card palantir-shadow-md'
        } animate-slide-up`}>
          <div className="p-3 sm:p-5">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className={`p-1.5 sm:p-2 rounded-lg ${
                isUser 
                  ? 'bg-primary-foreground/20 text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground'
              } palantir-shadow`}>
                {isUser ? (
                  <User className="h-3 w-3 sm:h-4 sm:w-4" />
                ) : (
                  <Bot className="h-3 w-3 sm:h-4 sm:w-4" />
                )}
              </div>
              <span className="palantir-heading text-xs sm:text-sm">
                {isUser ? 'You' : 'AI Assistant'}
              </span>
              {isStreaming && (
                <div className="flex items-center gap-1 sm:gap-2">
                  <Zap className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-accent" />
                  <span className="text-xs palantir-caption text-accent">Typing...</span>
                </div>
              )}
            </div>
            <div 
              ref={contentRef}
              className={`text-xs sm:text-sm leading-relaxed ${
                isUser ? 'text-primary-foreground' : 'palantir-body'
              }`}
            >
              {parseMessageContent(message.content)}
              {isStreaming && (
                <span className={`inline-block w-0.5 h-3 sm:h-4 ml-1 animate-pulse ${
                  isUser ? 'bg-primary-foreground' : 'bg-foreground'
                }`} />
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}