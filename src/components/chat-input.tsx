import { useState, KeyboardEvent, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2 } from 'lucide-react';
import { createAnimation } from '@/lib/animation-presets';

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
    const [message, setMessage] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            createAnimation(containerRef.current, 'fadeInUp', { delay: 200 });
        }
    }, []);

    const handleSubmit = () => {
        if (message.trim() && !disabled) {
            if (buttonRef.current) {
                createAnimation(buttonRef.current, 'buttonPress');
            }
            onSendMessage(message.trim());
            setMessage('');
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div
            ref={containerRef}
            className="palantir-border-thick border-t bg-card p-3 sm:p-6 opacity-0 palantir-gradient"
        >
            <div className="flex gap-2 sm:gap-4 items-end">
                <div className="flex-1">
                    <Textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
                        disabled={disabled}
                        className="min-h-[50px] sm:min-h-[60px] text-sm sm:text-base palantir-body resize-none border-input palantir-shadow focus:palantir-shadow-md transition-all duration-200"
                        rows={2}
                    />
                </div>
                <Button
                    ref={buttonRef}
                    onClick={handleSubmit}
                    disabled={disabled || !message.trim()}
                    size="lg"
                    className="h-[50px] w-[50px] sm:h-[60px] sm:w-[60px] p-0 rounded-full"
                    variant={disabled ? "outline" : "default"}
                >
                    {disabled ? (
                        <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                    ) : (
                        <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                </Button>
            </div>
            <div className="mt-2 sm:mt-3 text-xs palantir-caption">
                {disabled ? 'AI is thinking...' : 'Ready to chat!'}
            </div>
        </div>
    );
}