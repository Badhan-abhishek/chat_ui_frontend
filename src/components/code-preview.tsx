'use client';

import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { CodeFile } from '@/types/chat';
import { AlertTriangle } from 'lucide-react';

interface CodePreviewProps {
  files: CodeFile[];
}

export function CodePreview({ files }: CodePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;

    if (!doc) return;

    let mainHtmlFile = files.find(f => f.filename.toLowerCase() === 'index.html');
    if (!mainHtmlFile) {
      mainHtmlFile = files.find(f => f.language === 'html');
    }

    if (mainHtmlFile) {
      let htmlContent = mainHtmlFile.content;

      const cssFiles = files.filter(f => f.language === 'css');
      if (cssFiles.length > 0) {
        const cssStyles = cssFiles.map(f => `<style>${f.content}</style>`).join('\n');
        htmlContent = htmlContent.replace('</head>', `${cssStyles}\n</head>`);
      }

      const jsFiles = files.filter(f => f.language === 'javascript');
      if (jsFiles.length > 0) {
        const jsScripts = jsFiles.map(f => `<script>${f.content}</script>`).join('\n');
        htmlContent = htmlContent.replace('</body>', `${jsScripts}\n</body>`);
      }

      doc.open();
      doc.write(htmlContent);
      doc.close();
    }
  }, [files]);

  const isPreviewable = files.some(f => f.language === 'html');

  if (!isPreviewable) {
    return (
      <Card className="bg-white neo-shadow h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="font-medium">Preview not available</p>
          <p className="text-sm">No HTML file found for preview.</p>
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