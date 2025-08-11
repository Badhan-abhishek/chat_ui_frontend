'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wrench, Sparkles, Eye, Code, Globe } from 'lucide-react';
import { ChatToolCall } from '@/types/chat';
import { useCodeSidebar } from '@/contexts/code-sidebar-context';

interface ToolCallDisplayProps {
  toolCall: ChatToolCall;
}

export function ToolCallDisplay({ toolCall }: ToolCallDisplayProps) {
  const { addFiles, openSidebar, previewArtifact } = useCodeSidebar();

  const handleViewInSidebar = () => {
    addFiles(
      toolCall.files, 
      toolCall.tool_name, 
      toolCall.description
    );
    openSidebar();
  };

  const handleViewFile = (fileIndex: number) => {
    const file = toolCall.files[fileIndex];
    addFiles(
      [file], 
      file.filename, 
      `${file.language} file with ${file.content.split('\n').length} lines`
    );
    openSidebar();
  };

  const handlePreviewAll = () => {
    const artifact = {
      id: `tool-${Date.now()}`,
      title: toolCall.tool_name,
      description: toolCall.description,
      files: toolCall.files,
      createdAt: new Date()
    };
    previewArtifact(artifact);
  };

  const handlePreviewFile = (fileIndex: number) => {
    const file = toolCall.files[fileIndex];
    const artifact = {
      id: `file-${Date.now()}`,
      title: file.filename,
      description: `${file.language} file with ${file.content.split('\n').length} lines`,
      files: [file],
      createdAt: new Date()
    };
    previewArtifact(artifact);
  };

  const isPreviewable = (file: any) => {
    return file.language === 'html' || 
           file.language === 'css' || 
           file.language === 'javascript';
  };

  const hasPreviewableFiles = toolCall.files.some(isPreviewable);

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 palantir-shadow-lg mb-4 animate-slide-up">
      <div className="p-5">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary text-secondary-foreground rounded-lg palantir-shadow">
              <Wrench className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="palantir-heading text-sm">
                  {toolCall.tool_name}
                </span>
                <Sparkles className="h-4 w-4 text-accent" />
              </div>
              <p className="text-sm palantir-subheading">
                {toolCall.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
              {toolCall.files.length} file{toolCall.files.length !== 1 ? 's' : ''} generated
            </div>
            {hasPreviewableFiles && (
              <Button
                onClick={handlePreviewAll}
                size="sm"
                variant="outline"
                className="gap-2 border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                <Globe className="h-3 w-3" />
                Preview All
              </Button>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          {toolCall.files.map((file, index) => (
            <div key={index} className="bg-white rounded-lg border border-blue-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <Code className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900 text-sm">
                      {file.filename}
                    </h4>
                    <p className="text-xs text-blue-700">
                      {file.language} • {file.content.split('\n').length} lines
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {isPreviewable(file) && (
                    <Button
                      onClick={() => handlePreviewFile(index)}
                      size="sm"
                      variant="outline"
                      className="gap-2 border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      <Globe className="h-3 w-3" />
                      Preview
                    </Button>
                  )}
                  <Button
                    onClick={() => handleViewFile(index)}
                    size="sm"
                    className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Eye className="h-3 w-3" />
                    View Code
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}