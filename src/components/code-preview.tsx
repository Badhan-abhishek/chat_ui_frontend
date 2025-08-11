'use client';

import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { CodeFile } from '@/types/chat';
import { AlertTriangle, Globe } from 'lucide-react';

interface CodePreviewProps {
  files: CodeFile[];
  selectedFile: CodeFile | null;
}

export function CodePreview({ files, selectedFile }: CodePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!selectedFile || !iframeRef.current) return;

    const iframe = iframeRef.current;
    
    if (selectedFile.language === 'html') {
      // For HTML files, inject the content directly
      let htmlContent = selectedFile.content;
      
      // Find and inject CSS files
      const cssFiles = files.filter(f => f.language === 'css');
      if (cssFiles.length > 0) {
        const cssStyles = cssFiles.map(f => `<style>${f.content}</style>`).join('\n');
        htmlContent = htmlContent.replace('</head>', `${cssStyles}\n</head>`);
      }
      
      // Find and inject JavaScript files
      const jsFiles = files.filter(f => f.language === 'javascript');
      if (jsFiles.length > 0) {
        const jsScripts = jsFiles.map(f => `<script>${f.content}</script>`).join('\n');
        htmlContent = htmlContent.replace('</body>', `${jsScripts}\n</body>`);
      }
      
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(htmlContent);
        doc.close();
      }
    } else {
      // For non-HTML files, show a simple preview
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(`
          <html>
            <head>
              <style>
                body { 
                  font-family: 'Monaco', 'Menlo', monospace; 
                  padding: 20px; 
                  background: #f8f9fa;
                  margin: 0;
                }
                pre { 
                  background: white; 
                  padding: 20px; 
                  border-radius: 8px;
                  border: 2px solid #000;
                  box-shadow: 4px 4px 0px #000;
                  overflow: auto;
                }
                .header {
                  background: #fbbf24;
                  color: black;
                  padding: 10px 20px;
                  margin: -20px -20px 20px -20px;
                  font-weight: bold;
                  border-bottom: 2px solid #000;
                }
              </style>
            </head>
            <body>
              <div class="header">📄 ${selectedFile.filename}</div>
              <pre><code>${selectedFile.content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
            </body>
          </html>
        `);
        doc.close();
      }
    }
  }, [selectedFile, files]);

  if (!selectedFile) {
    return (
      <Card className="bg-white neo-shadow h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="font-medium">Select a file to preview</p>
        </div>
      </Card>
    );
  }

  const isPreviewable = selectedFile.language === 'html' || 
                       files.some(f => f.language === 'html');

  if (!isPreviewable) {
    return (
      <Card className="bg-white neo-shadow h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="font-medium">Preview not available</p>
          <p className="text-sm">This file type cannot be previewed</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white neo-shadow h-full overflow-hidden">
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title="Code Preview"
        sandbox="allow-scripts allow-same-origin"
      />
    </Card>
  );
}