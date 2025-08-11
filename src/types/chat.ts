export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  message: string;
  conversation_history: ChatMessage[];
}

export interface ChatChunk {
  type: 'chunk';
  content: string;
}

export interface ChatComplete {
  type: 'complete';
  full_response: string;
  message_count: number;
}

export interface ChatError {
  type: 'error';
  content: string;
}

export type ChatStreamResponse = ChatChunk | ChatComplete | ChatError;

export interface ErrorResponse {
  detail: string;
}