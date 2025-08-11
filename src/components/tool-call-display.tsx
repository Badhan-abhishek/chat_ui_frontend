'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CodeBlock } from './code-block';
import { Wrench, Sparkles, Eye, Code } from 'lucide-react';
import { ChatToolCall } from '@/types/chat';
import { useCodeSidebar } from '@/contexts/code-sidebar-context';

interface ToolCallDisplayProps {
  toolCall: ChatToolCall;
}

export function ToolCallDisplay({ toolCall }: ToolCallDisplayProps) {
  const { addFiles, openSidebar } = useCodeSidebar();

  const handleViewInSidebar = () => {
    addFiles(toolCall.files);
    openSidebar();
  };

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 neo-shadow-lg mb-4">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-400 neo-border neo-shadow">
              <Wrench className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm uppercase tracking-wide">
                  {toolCall.tool_name}
                </span>
                <Sparkles className="h-4 w-4 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                {toolCall.description}
              </p>
            </div>
          </div>
          
          <Button
            onClick={handleViewInSidebar}
            variant="secondary"
            size="sm"
            className="gap-2"
          >
            <Code className="h-4 w-4" />
            View in Editor
          </Button>
        </div>
        
        <div className="space-y-3">
          {toolCall.files.map((file, index) => (
            <CodeBlock key={index} file={file} />
          ))}
        </div>
      </div>
    </Card>
  );
}