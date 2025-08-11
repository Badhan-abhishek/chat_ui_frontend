'use client';

import { useEffect, useRef } from 'react';
import { useChatStream } from '@/hooks/use-chat-stream';
import { ChatMessageComponent } from './chat-message';
import { ChatInput } from './chat-input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash2, MessageSquare, Sparkles, AlertTriangle } from 'lucide-react';
import { createAnimation, createStaggerAnimation } from '@/lib/animation-presets';

export function ChatContainer() {
  const { messages, isStreaming, error, sendMessage, clearMessages } = useChatStream();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const emptyStateRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (headerRef.current) {
      createAnimation(headerRef.current, 'fadeInDown');
    }
  }, []);

  useEffect(() => {
    if (emptyStateRef.current && messages.length === 0 && emptyStateRef?.current) {
      setTimeout(() => {
        createAnimation(emptyStateRef?.current, 'bounceIn');
      }, 300);
    }
  }, [messages.length]);

  useEffect(() => {
    if (errorRef.current && error) {
      createAnimation(errorRef.current, 'scaleIn');
    }
  }, [error]);

  return (
    <div className="flex flex-col h-screen max-w-5xl mx-auto bg-amber-50">
      {/* Header */}
      <div 
        ref={headerRef}
        className="neo-border-thick bg-white p-6 opacity-0"
        style={{ borderBottom: '4px solid black', borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-400 neo-border neo-shadow">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black uppercase tracking-wide">
                AI Chat Assistant
              </h1>
              <p className="text-sm font-medium text-muted-foreground">
                Powered by Gemini AI
              </p>
            </div>
          </div>
          <Button
            onClick={clearMessages}
            variant="destructive"
            size="sm"
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clear Chat
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div 
            ref={emptyStateRef}
            className="flex items-center justify-center h-full opacity-0"
          >
            <Card className="bg-white neo-shadow-lg p-8 text-center max-w-md">
              <div className="mb-4">
                <div className="mx-auto w-16 h-16 bg-yellow-400 neo-border neo-shadow flex items-center justify-center mb-4">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-black mb-2 uppercase tracking-wide">
                  Welcome to AI Chat!
                </h2>
                <p className="text-muted-foreground font-medium">
                  Start a conversation by typing a message below. I'm here to help with anything you need!
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2 text-xs font-bold">
                <div className="p-2 bg-yellow-100 neo-border">
                  💡 Ask me anything
                </div>
                <div className="p-2 bg-purple-100 neo-border">
                  🚀 Get creative ideas
                </div>
                <div className="p-2 bg-green-100 neo-border">
                  🤖 Chat naturally
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <ChatMessageComponent
                key={index}
                message={message}
                index={index}
                isStreaming={isStreaming && index === messages.length - 1 && message.role === 'assistant'}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}

        {/* Error Display */}
        {error && (
          <div 
            ref={errorRef}
            className="opacity-0"
          >
            <Card className="bg-red-100 border-red-500 neo-shadow p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500 text-white neo-border">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-black text-red-800 text-sm uppercase">
                    Error Occurred
                  </div>
                  <div className="text-red-700 text-sm font-medium">
                    {error}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput onSendMessage={sendMessage} disabled={isStreaming} />
    </div>
  );
}