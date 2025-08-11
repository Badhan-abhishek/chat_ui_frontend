'use client';

import { useEffect, useRef } from 'react';
import { useChatStream } from '@/hooks/use-chat-stream';
import { ChatMessageComponent } from './chat-message';
import { ChatInput } from './chat-input';
import { ToolCallDisplay } from './tool-call-display';
import { HealthStatus } from './health-status';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash2, MessageSquare, Sparkles, AlertTriangle } from 'lucide-react';
import { createAnimation } from '@/lib/animation-presets';
import { useCodeSidebar } from '@/contexts/code-sidebar-context';

export function ChatContainer() {
    const { messages, toolCalls, isStreaming, error, sendMessage, clearMessages } = useChatStream();
    const { clearArtifacts } = useCodeSidebar();
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
        <div className="flex flex-col h-screen bg-background">
            {/* Header */}
            <div
                ref={headerRef}
                className="palantir-border-thick border-b bg-card p-6 opacity-0 palantir-gradient"
            >
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary text-primary-foreground rounded-lg palantir-shadow">
                            <MessageSquare className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl palantir-heading">
                                AI Chat Assistant
                            </h1>
                            <p className="text-sm palantir-subheading">
                                Powered by Gemini AI
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <HealthStatus />
                        <Button
                            onClick={() => {
                                clearMessages();
                                clearArtifacts();
                            }}
                            variant="destructive"
                            size="sm"
                            className="gap-2"
                        >
                            <Trash2 className="h-4 w-4" />
                            Clear All
                        </Button>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 ? (
                    <div
                        ref={emptyStateRef}
                        className="flex items-center justify-center h-full opacity-0"
                    >
                        <Card className="palantir-shadow-lg p-8 text-center max-w-md animate-fade-in">
                            <div className="mb-6">
                                <div className="mx-auto w-16 h-16 bg-primary text-primary-foreground rounded-full palantir-shadow flex items-center justify-center mb-4">
                                    <Sparkles className="h-8 w-8" />
                                </div>
                                <h2 className="text-2xl palantir-heading mb-3">
                                    Welcome to AI Chat
                                </h2>
                                <p className="palantir-subheading">
                                    Start a conversation by typing a message below. I'm here to help with anything you need.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 gap-3 text-sm">
                                <div className="p-3 bg-muted rounded-lg palantir-border palantir-hover">
                                    <span className="mr-2">💡</span>
                                    <span className="palantir-body">Ask me anything</span>
                                </div>
                                <div className="p-3 bg-muted rounded-lg palantir-border palantir-hover">
                                    <span className="mr-2">🚀</span>
                                    <span className="palantir-body">Get creative ideas</span>
                                </div>
                                <div className="p-3 bg-muted rounded-lg palantir-border palantir-hover">
                                    <span className="mr-2">🤖</span>
                                    <span className="palantir-body">Chat naturally</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                ) : (
                    <>
                        {messages.map((message, index) => (
                            <ChatMessageComponent
                                key={`message-${index}`}
                                message={message}
                                index={index}
                                isStreaming={isStreaming && index === messages.length - 1 && message.role === 'assistant'}
                            />
                        ))}

                        {/* Display tool calls */}
                        {toolCalls.map((toolCall, index) => (
                            <ToolCallDisplay
                                key={`tool-${index}`}
                                toolCall={toolCall}
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
                        <Card className="bg-red-50 border-red-200 palantir-shadow p-4 animate-scale-in">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-destructive text-destructive-foreground rounded-lg">
                                    <AlertTriangle className="h-4 w-4" />
                                </div>
                                <div>
                                    <div className="palantir-heading text-red-800 text-sm">
                                        Error Occurred
                                    </div>
                                    <div className="text-red-700 text-sm palantir-body">
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