'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { CodeFile, CodeArtifact, SidebarView } from '@/types/chat';

interface CodeSidebarContextType {
  files: CodeFile[];
  artifacts: CodeArtifact[];
  currentArtifact: CodeArtifact | null;
  isOpen: boolean;
  view: SidebarView;
  addFiles: (newFiles: CodeFile[], title?: string, description?: string) => void;
  addArtifact: (artifact: CodeArtifact) => void;
  setCurrentArtifact: (artifact: CodeArtifact | null) => void;
  clearFiles: () => void;
  clearArtifacts: () => void;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  setView: (view: SidebarView) => void;
}

const CodeSidebarContext = createContext<CodeSidebarContextType | undefined>(undefined);

export function CodeSidebarProvider({ children }: { children: ReactNode }) {
  const [files, setFiles] = useState<CodeFile[]>([]);
  const [artifacts, setArtifacts] = useState<CodeArtifact[]>([]);
  const [currentArtifact, setCurrentArtifact] = useState<CodeArtifact | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<SidebarView>('code');

  const addFiles = (newFiles: CodeFile[], title?: string, description?: string) => {
    setFiles(prev => {
      // Remove duplicates based on filename
      const existingFilenames = prev.map(f => f.filename);
      const uniqueNewFiles = newFiles.filter(f => !existingFilenames.includes(f.filename));
      return [...prev, ...uniqueNewFiles];
    });
    
    // Create artifact if title and description provided
    if (title && description && newFiles.length > 0) {
      const artifact: CodeArtifact = {
        id: Date.now().toString(),
        title,
        description,
        files: newFiles,
        createdAt: new Date(),
      };
      addArtifact(artifact);
      setCurrentArtifact(artifact);
    }
    
    // Auto-open sidebar when files are added
    if (newFiles.length > 0) {
      setIsOpen(true);
    }
  };

  const addArtifact = (artifact: CodeArtifact) => {
    setArtifacts(prev => [...prev, artifact]);
  };

  const clearFiles = () => {
    setFiles([]);
    setIsOpen(false);
  };

  const clearArtifacts = () => {
    setArtifacts([]);
    setCurrentArtifact(null);
    setFiles([]);
    setIsOpen(false);
  };

  const toggleSidebar = () => {
    setIsOpen(prev => !prev);
  };

  const openSidebar = () => {
    setIsOpen(true);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <CodeSidebarContext.Provider value={{
      files,
      artifacts,
      currentArtifact,
      isOpen,
      view,
      addFiles,
      addArtifact,
      setCurrentArtifact,
      clearFiles,
      clearArtifacts,
      toggleSidebar,
      openSidebar,
      closeSidebar,
      setView,
    }}>
      {children}
    </CodeSidebarContext.Provider>
  );
}

export function useCodeSidebar() {
  const context = useContext(CodeSidebarContext);
  if (context === undefined) {
    throw new Error('useCodeSidebar must be used within a CodeSidebarProvider');
  }
  return context;
}