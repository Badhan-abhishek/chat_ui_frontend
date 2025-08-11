'use client';

import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { CodeSidebar } from '@/components/code-sidebar';
import { useCodeSidebar } from '@/contexts/code-sidebar-context';
import { Code, Eye } from 'lucide-react';

interface ClaudeLayoutProps {
  children: ReactNode;
}

export function ClaudeLayout({ children }: ClaudeLayoutProps) {
  const { 
    files, 
    currentArtifact, 
    isOpen, 
    view,
    toggleSidebar, 
    setView 
  } = useCodeSidebar();

  return (
    <div className="flex flex-col md:flex-row h-screen bg-background">
      <div className="flex-1 overflow-hidden">
        {children}
      </div>

      {isOpen && (
        <div className="w-full md:w-1/2 palantir-border-thick border-l bg-sidebar flex flex-col animate-slide-down">
          <div className="bg-card palantir-border-thick border-b p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent text-accent-foreground rounded-lg palantir-shadow">
                  <Code className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg palantir-heading">
                    {currentArtifact?.title || 'Generated Code'}
                  </h2>
                  <p className="text-xs palantir-subheading">
                    {currentArtifact?.description || `${files.length} file${files.length !== 1 ? 's' : ''} generated`}
                  </p>
                </div>
              </div>
              <Button
                onClick={toggleSidebar}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                ✕
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setView('code')}
                variant={view === 'code' ? 'default' : 'outline'}
                size="sm"
                className="gap-2"
              >
                <Code className="h-4 w-4" />
                Code
              </Button>
              <Button
                onClick={() => setView('preview')}
                variant={view === 'preview' ? 'default' : 'outline'}
                size="sm"
                className="gap-2"
              >
                <Eye className="h-4 w-4" />
                Preview
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <CodeSidebar 
              files={currentArtifact?.files || files}
              isOpen={true}
              onToggle={toggleSidebar}
              view={view}
              embedded={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}
