import { useState, useCallback } from 'react';
import { streamChat } from '@/lib/chat-api';
import { ChatMessage, ChatRequest, ChatStreamResponse, ChatToolCall } from '@/types/chat';
import { useCodeSidebar } from '@/contexts/code-sidebar-context';

export interface UseChatStreamReturn {
  messages: ChatMessage[];
  toolCalls: ChatToolCall[];
  isStreaming: boolean;
  error: string | null;
  sendMessage: (message: string) => Promise<void>;
  clearMessages: () => void;
}

export function useChatStream(): UseChatStreamReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [toolCalls, setToolCalls] = useState<ChatToolCall[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addFiles } = useCodeSidebar();

  const sendMessage = useCallback(async (message: string) => {
    if (isStreaming) return;

    setError(null);
    setIsStreaming(true);

    const userMessage: ChatMessage = { role: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);

    let assistantContent = '';
    const assistantMessage: ChatMessage = { role: 'assistant', content: '' };
    
    setMessages(prev => [...prev, assistantMessage]);

    try {
      const request: ChatRequest = {
        message,
        conversation_history: messages,
      };

      const stream = streamChat(request);

      for await (const chunk of stream) {
        if (chunk.type === 'chunk') {
          assistantContent += chunk.content;
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = {
              role: 'assistant',
              content: assistantContent,
            };
            return newMessages;
          });
        } else if (chunk.type === 'complete') {
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = {
              role: 'assistant',
              content: chunk.full_response,
            };
            return newMessages;
          });
          break;
        } else if (chunk.type === 'tool_call') {
          // Handle code generation tool calls
          setToolCalls(prev => [...prev, chunk]);
          
          // Auto-add files to sidebar
          addFiles(chunk.files);
          
          // Add a brief message about the tool call
          const toolCallMessage = `Generated ${chunk.files.length} file(s) using ${chunk.tool_name}: ${chunk.description}`;
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = {
              role: 'assistant',
              content: assistantContent + toolCallMessage,
            };
            return newMessages;
          });
        } else if (chunk.type === 'error') {
          setError(chunk.content);
          setMessages(prev => prev.slice(0, -1));
          break;
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsStreaming(false);
    }
  }, [messages, isStreaming, addFiles]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setToolCalls([]);
    setError(null);
  }, []);

  return {
    messages,
    toolCalls,
    isStreaming,
    error,
    sendMessage,
    clearMessages,
  };
}