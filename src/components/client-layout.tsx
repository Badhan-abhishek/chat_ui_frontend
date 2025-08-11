'use client';

import { CodeSidebar } from "@/components/code-sidebar";
import { useCodeSidebar } from "@/contexts/code-sidebar-context";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { files, isOpen, toggleSidebar } = useCodeSidebar();
  
  return (
    <>
      {children}
      <CodeSidebar 
        files={files} 
        isOpen={isOpen} 
        onToggle={toggleSidebar} 
      />
    </>
  );
}