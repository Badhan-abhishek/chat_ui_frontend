'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { CodeFile } from '@/types/chat';

interface CodeSidebarContextType {
  files: CodeFile[];
  isOpen: boolean;
  addFiles: (newFiles: CodeFile[]) => void;
  clearFiles: () => void;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
}

const CodeSidebarContext = createContext<CodeSidebarContextType | undefined>(undefined);

export function CodeSidebarProvider({ children }: { children: ReactNode }) {
  const [files, setFiles] = useState<CodeFile[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addFiles = (newFiles: CodeFile[]) => {
    setFiles(prev => {
      // Remove duplicates based on filename
      const existingFilenames = prev.map(f => f.filename);
      const uniqueNewFiles = newFiles.filter(f => !existingFilenames.includes(f.filename));
      return [...prev, ...uniqueNewFiles];
    });
    
    // Auto-open sidebar when files are added
    if (newFiles.length > 0) {
      setIsOpen(true);
    }
  };

  const clearFiles = () => {
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
      isOpen,
      addFiles,
      clearFiles,
      toggleSidebar,
      openSidebar,
      closeSidebar,
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