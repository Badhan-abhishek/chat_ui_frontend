'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
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
    <div className="flex flex-col h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Home</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/approach" className="text-muted-foreground transition-colors hover:text-foreground">
              Approach
            </Link>
          </nav>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {/* Main Chat Area */}
        <div className={`flex-1 transition-all duration-300 ${isOpen ? 'mr-0' : 'mr-0'}`}>
          {children}
        </div>

        {/* Dynamic Right Sidebar */}
        {isOpen && (
          <div className="w-1/2 palantir-border-thick border-l bg-sidebar flex flex-col animate-slide-down">
            {/* Sidebar Header with Toggle */}
            <div className="bg-card palantir-border-thick border-b p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent text-accent-foreground rounded-lg palantir-shadow">
                    <Code className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl palantir-heading">
                      {currentArtifact?.title || 'Generated Code'}
                    </h2>
                    <p className="text-sm palantir-subheading">
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
    </div>
  );
}
