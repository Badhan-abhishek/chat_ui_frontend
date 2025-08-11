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
    <div className="flex flex-col lg:flex-row h-screen bg-background">
      <div className="flex-1 overflow-hidden">
        {children}
      </div>

      {isOpen && (
        <div className="w-full lg:w-1/2 palantir-border-thick border-t lg:border-l bg-sidebar flex flex-col animate-slide-down">
          <div className="bg-card palantir-border-thick border-b p-3 sm:p-4">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-accent text-accent-foreground rounded-lg palantir-shadow">
                  <Code className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg palantir-heading">
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
                className="h-7 w-7 sm:h-8 sm:w-8 p-0"
              >
                ✕
              </Button>
            </div>

            <div className="flex gap-1 sm:gap-2">
              <Button
                onClick={() => setView('code')}
                variant={view === 'code' ? 'default' : 'outline'}
                size="sm"
                className="gap-1 sm:gap-2 text-xs sm:text-sm"
              >
                <Code className="h-3 w-3 sm:h-4 sm:w-4" />
                Code
              </Button>
              <Button
                onClick={() => setView('preview')}
                variant={view === 'preview' ? 'default' : 'outline'}
                size="sm"
                className="gap-1 sm:gap-2 text-xs sm:text-sm"
              >
                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
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
