# AI Chat Application

A Next.js application that provides a streaming chat interface with Gemini AI, built with TanStack Query for state management.

## Features

- **Real-time streaming chat**: Server-sent events (SSE) for live AI responses
- **TanStack Query integration**: Robust state management with caching and error handling
- **Conversation history**: Maintains context across messages
- **Error handling**: Comprehensive error handling with retry logic
- **Responsive design**: Works on desktop and mobile with dark mode support
- **TypeScript**: Fully typed for better development experience

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A running backend API server on `localhost:4000` (or configure different URL in `.env.local`)

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application.

## API Integration

The application integrates with a chat streaming API at `/api/v1/chat/stream` that:

- Accepts POST requests with `message` and `conversation_history`
- Returns streaming responses as newline-delimited JSON
- Supports chunk, complete, and error response types

### API Client Features

- **Fetch wrapper**: Custom API client with timeout and error handling
- **Streaming support**: Handles Server-Sent Events (SSE) responses
- **Error handling**: Comprehensive error handling with custom ApiError class
- **TypeScript**: Fully typed API responses and requests

## Project Structure

```
src/
├── app/
│   ├── chat/page.tsx          # Chat page
│   ├── layout.tsx             # Root layout with QueryProvider
│   └── page.tsx               # Home page
├── components/
│   ├── chat-container.tsx     # Main chat interface
│   ├── chat-input.tsx         # Message input component
│   └── chat-message.tsx       # Individual message component
├── hooks/
│   └── use-chat-stream.ts     # Custom hook for chat streaming
├── lib/
│   ├── api-client.ts          # Fetch wrapper with streaming support
│   └── chat-api.ts            # Chat-specific API functions
├── providers/
│   └── query-provider.tsx     # TanStack Query provider
└── types/
    └── chat.ts                # TypeScript type definitions
```

## Usage

1. Navigate to `/chat` or click "Start Chatting" on the home page
2. Type your message in the input field
3. Press Enter or click Send to start the conversation
4. Watch as the AI response streams in real-time
5. Continue the conversation with full context history

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TanStack Query**: Data fetching and state management
- **TypeScript**: Type safety and better DX
- **Tailwind CSS**: Utility-first CSS framework
- **Streaming API**: Server-Sent Events for real-time responses

## Development

The application uses TanStack Query for:
- Caching and background updates
- Error handling and retries
- Loading states
- Optimistic updates

The streaming implementation:
- Handles chunked responses from the server
- Provides real-time UI updates
- Maintains conversation context
- Includes comprehensive error handling
