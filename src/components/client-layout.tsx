'use client';

import { usePathname } from 'next/navigation';
import { CodeSidebar } from "@/components/code-sidebar";
import { useCodeSidebar } from "@/contexts/code-sidebar-context";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { files, isOpen, toggleSidebar } = useCodeSidebar();
  const pathname = usePathname();
  
  // Don't show the old sidebar on chat page (it has its own Claude-style layout)
  const showSidebar = pathname !== '/chat';
  
  return (
    <>
      {children}
      {showSidebar && (
        <CodeSidebar 
          files={files} 
          isOpen={isOpen} 
          onToggle={toggleSidebar} 
        />
      )}
    </>
  );
}