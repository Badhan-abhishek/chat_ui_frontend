'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MonacoEditor } from './monaco-editor';
import { CodePreview } from './code-preview';
import { 
  ChevronRight, 
  ChevronLeft, 
  Code, 
  FileText, 
  X,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { CodeFile, SidebarView } from '@/types/chat';
import { createAnimation } from '@/lib/animation-presets';
import { useEffect, useRef } from 'react';

interface CodeSidebarProps {
  files: CodeFile[];
  isOpen: boolean;
  onToggle: () => void;
  view?: SidebarView;
  embedded?: boolean;
}

export function CodeSidebar({ files, isOpen, onToggle, view = 'code', embedded = false }: CodeSidebarProps) {
  const [selectedFile, setSelectedFile] = useState<CodeFile | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (files.length > 0 && !selectedFile) {
      setSelectedFile(files[0]);
    }
  }, [files, selectedFile]);

  useEffect(() => {
    if (sidebarRef.current && !embedded) {
      if (isOpen) {
        createAnimation(sidebarRef.current, 'fadeInRight', { delay: 0 });
      }
    }
  }, [isOpen, embedded]);

  // For embedded mode, don't show the floating button
  if (!isOpen && !embedded) {
    return (
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
        <Button
          onClick={onToggle}
          variant="default"
          size="lg"
          className="rounded-l-none shadow-lg gap-2"
        >
          <Code className="h-5 w-5" />
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  // For embedded mode, don't render anything if not open
  if (!isOpen && embedded) {
    return null;
  }

  const getFileIcon = (language: string) => {
    return <FileText className="h-4 w-4" />;
  };

  const sidebarWidth = isMaximized ? 'w-full' : 'w-1/2';
  const sidebarHeight = isMaximized ? 'h-full' : 'h-full';

  // For embedded mode, render simplified version
  if (embedded) {
    return (
      <div className="h-full flex flex-col bg-sidebar">
        {/* File Tabs */}
        {files.length > 1 && (
          <div className="bg-card palantir-border-thick border-b p-3">
            <div className="flex gap-2 overflow-x-auto">
              {files.map((file, index) => (
                <Button
                  key={index}
                  onClick={() => setSelectedFile(file)}
                  variant={selectedFile?.filename === file.filename ? "default" : "outline"}
                  size="sm"
                  className="gap-2 whitespace-nowrap"
                >
                  {getFileIcon(file.language)}
                  {file.filename}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 p-4 overflow-hidden">
          {selectedFile ? (
            view === 'code' ? (
              <MonacoEditor 
                file={selectedFile} 
                height="calc(100vh - 200px)"
              />
            ) : (
              <CodePreview 
                files={files}
                selectedFile={selectedFile}
              />
            )
          ) : (
            <Card className="palantir-shadow h-full flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="palantir-body">No files to display</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Backdrop for maximized mode */}
      {isMaximized && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMaximized(false)}
        />
      )}
      
      <div 
        ref={sidebarRef}
        className={`fixed right-0 top-0 ${sidebarHeight} ${sidebarWidth} bg-sidebar palantir-border-thick border-l palantir-shadow-xl z-50 flex flex-col opacity-0`}
      >
        {/* Header */}
        <div className="bg-card palantir-border-thick border-b p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent text-accent-foreground rounded-lg palantir-shadow">
                <Code className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl palantir-heading">
                  Code Preview
                </h2>
                <p className="text-sm palantir-subheading">
                  {files.length} file{files.length !== 1 ? 's' : ''} generated
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setIsMaximized(!isMaximized)}
                variant="ghost"
                size="sm"
              >
                {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              <Button
                onClick={onToggle}
                variant="ghost"
                size="sm"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* File Tabs */}
        {files.length > 1 && (
          <div className="bg-card palantir-border-thick border-b p-3">
            <div className="flex gap-2 overflow-x-auto">
              {files.map((file, index) => (
                <Button
                  key={index}
                  onClick={() => setSelectedFile(file)}
                  variant={selectedFile?.filename === file.filename ? "default" : "outline"}
                  size="sm"
                  className="gap-2 whitespace-nowrap"
                >
                  {getFileIcon(file.language)}
                  {file.filename}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Editor Content */}
        <div className="flex-1 p-4 overflow-hidden">
          {selectedFile ? (
            view === 'code' ? (
              <MonacoEditor 
                file={selectedFile} 
                height={isMaximized ? 'calc(100vh - 200px)' : 'calc(100vh - 250px)'}
              />
            ) : (
              <CodePreview 
                files={files}
                selectedFile={selectedFile}
              />
            )
          ) : (
            <Card className="palantir-shadow h-full flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="palantir-body">No files to display</p>
              </div>
            </Card>
          )}
        </div>

        {/* Toggle Button */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full">
          <Button
            onClick={onToggle}
            variant="default"
            size="lg"
            className="rounded-r-none shadow-lg gap-2"
          >
            <ChevronRight className="h-4 w-4" />
            <Code className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
}