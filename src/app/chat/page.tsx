import { ChatContainer } from '@/components/chat-container';
import { ClaudeLayout } from '@/components/claude-layout';

export default function ChatPage() {
  return (
    <ClaudeLayout>
      <ChatContainer />
    </ClaudeLayout>
  );
}