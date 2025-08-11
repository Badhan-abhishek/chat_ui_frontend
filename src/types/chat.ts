export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  message: string;
  conversation_history?: ChatMessage[];
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

export interface ChatToolCall {
  type: 'tool_call';
  tool_name: string;
  description: string;
  files: CodeFile[];
}

export type ChatStreamResponse = ChatChunk | ChatComplete | ChatError | ChatToolCall;

export interface CodeFile {
  filename: string;
  content: string;
  language: 'html' | 'css' | 'javascript' | 'python' | 'typescript' | 'jsx' | 'tsx' | 'json' | 'yaml' | 'markdown' | 'text';
}

export interface CodeArtifact {
  id: string;
  title: string;
  description: string;
  files: CodeFile[];
  createdAt: Date;
}

export type SidebarView = 'code' | 'preview';

export interface CodeGenerationRequest {
  prompt: string;
}

export interface CodeGenerationResponse {
  description: string;
  files: CodeFile[];
}

export interface HealthResponse {
  status: 'healthy' | 'unhealthy';
  service: string;
}

export interface RootResponse {
  message: string;
}

export interface ErrorResponse {
  detail: string;
}