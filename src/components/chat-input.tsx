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
            className="neo-border-thick bg-white p-6 opacity-0"
            style={{ borderTop: '4px solid black', borderLeft: 'none', borderRight: 'none', borderBottom: 'none' }}
        >
            <div className="flex gap-4 items-end">
                <div className="flex-1">
                    <Textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
                        disabled={disabled}
                        className="min-h-[60px] text-base font-medium resize-none"
                        rows={2}
                    />
                </div>
                <Button
                    ref={buttonRef}
                    onClick={handleSubmit}
                    disabled={disabled || !message.trim()}
                    size="lg"
                    className="h-[60px] w-[60px] p-0"
                    variant={disabled ? "outline" : "default"}
                >
                    {disabled ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <Send className="h-5 w-5" />
                    )}
                </Button>
            </div>
            <div className="mt-2 text-xs font-medium text-muted-foreground">
                {disabled ? 'AI is thinking...' : 'Ready to chat!'}
            </div>
        </div>
    );
}