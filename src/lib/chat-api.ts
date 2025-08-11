import { apiClient } from './api-client';
import { ChatRequest, ChatStreamResponse } from '@/types/chat';

export async function* streamChat(request: ChatRequest): AsyncGenerator<ChatStreamResponse, void, unknown> {
  const stream = await apiClient.stream('/api/v1/chat/stream', request);
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  
  let buffer = '';
  
  try {
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;
      
      buffer += decoder.decode(value, { stream: true });
      
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine) {
          try {
            const parsed: ChatStreamResponse = JSON.parse(trimmedLine);
            yield parsed;
          } catch (error) {
            console.error('Failed to parse streaming response:', error, 'Line:', trimmedLine);
          }
        }
      }
    }
    
    if (buffer.trim()) {
      try {
        const parsed: ChatStreamResponse = JSON.parse(buffer.trim());
        yield parsed;
      } catch (error) {
        console.error('Failed to parse final streaming response:', error, 'Buffer:', buffer);
      }
    }
  } finally {
    reader.releaseLock();
  }
}