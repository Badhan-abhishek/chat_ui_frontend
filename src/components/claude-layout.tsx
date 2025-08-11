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
    artifacts, 
    currentArtifact, 
    isOpen, 
    view,
    toggleSidebar, 
    setView 
  } = useCodeSidebar();

  const hasArtifacts = artifacts.length > 0 || files.length > 0;

  return (
    <div className="flex h-screen bg-amber-50">
      {/* Main Chat Area */}
      <div className={`flex-1 transition-all duration-300 ${isOpen ? 'mr-0' : 'mr-0'}`}>
        {children}
        
        {/* View Generated Artifact Button */}
        {hasArtifacts && !isOpen && (
          <div className="fixed bottom-6 right-6 z-40">
            <Button
              onClick={toggleSidebar}
              size="lg"
              className="gap-2 shadow-lg neo-shadow-xl"
            >
              <Code className="h-5 w-5" />
              View Generated Artifact
            </Button>
          </div>
        )}
      </div>

      {/* Dynamic Right Sidebar */}
      {isOpen && (
        <div className="w-1/2 border-l-4 border-black bg-white flex flex-col">
          {/* Sidebar Header with Toggle */}
          <div className="bg-white border-b-4 border-black p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-400 neo-border neo-shadow">
                  <Code className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase tracking-wide">
                    {currentArtifact?.title || 'Generated Code'}
                  </h2>
                  <p className="text-sm font-medium text-muted-foreground">
                    {currentArtifact?.description || `${files.length} file${files.length !== 1 ? 's' : ''} generated`}
                  </p>
                </div>
              </div>
              <Button
                onClick={toggleSidebar}
                variant="outline"
                size="sm"
              >
                ✕
              </Button>
            </div>

            {/* View Toggle Buttons */}
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

          {/* Sidebar Content */}
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