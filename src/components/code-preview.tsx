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

    const cssFiles = files.filter(f => f.language === 'css');
    const jsFiles = files.filter(f => f.language === 'javascript');

    let htmlContent = mainHtmlFile?.content;

    // If no HTML file is present but CSS/JS exists, synthesize a basic HTML shell
    if (!htmlContent && (cssFiles.length > 0 || jsFiles.length > 0)) {
      htmlContent = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Live Preview</title>
  </head>
  <body>
    <div id="app"></div>
    <pre id="logs" style="position:fixed;bottom:0;left:0;right:0;max-height:30vh;overflow:auto;background:#111;color:#0f0;padding:8px;margin:0;border-top:1px solid #333;font-family:monospace;font-size:12px"></pre>
    <script>
      (function(){
        var logsEl = document.getElementById('logs');
        function write(kind, args){
          var msg = Array.from(args).map(function(a){
            try { return typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a); }
            catch(_) { return String(a); }
          }).join(' ');
          var line = '['+kind.toUpperCase()+'] '+msg+'\n';
          logsEl.textContent += line;
        }
        var _log = console.log, _err = console.error, _warn = console.warn;
        console.log = function(){ write('log', arguments); _log.apply(console, arguments); };
        console.error = function(){ write('error', arguments); _err.apply(console, arguments); };
        console.warn = function(){ write('warn', arguments); _warn.apply(console, arguments); };
        window.onerror = function(message, source, lineno, colno, error){ write('error', [message+' ('+source+':'+lineno+':'+colno+')']); };
      })();
    <\/script>
  </body>
 </html>`;
    }

    if (htmlContent) {
      // Inject CSS styles
      if (cssFiles.length > 0) {
        const cssStyles = cssFiles.map(f => `<style>${f.content}</style>`).join('\n');
        htmlContent = htmlContent.replace('</head>', `${cssStyles}\n</head>`);
      }

      // Inject JS scripts
      if (jsFiles.length > 0) {
        const jsScripts = jsFiles.map(f => `<script>${f.content}</script>`).join('\n');
        htmlContent = htmlContent.replace('</body>', `${jsScripts}\n</body>`);
      }

      doc.open();
      doc.write(htmlContent);
      doc.close();
    }
  }, [files]);

  const hasHtmlLike = files.some(f => f.language === 'html' || f.language === 'css' || f.language === 'javascript');

  if (!hasHtmlLike) {
    return (
      <Card className="bg-white neo-shadow h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="font-medium">Preview not available</p>
          <p className="text-sm">No HTML/CSS/JS files found for preview.</p>
        </div>
      </Card>
    );
  }

  // HTML/CSS/JS iframe preview (with synthesized shell if needed)
  return (
    <Card className="bg-white neo-shadow h-full overflow-hidden">
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title="Code Preview"
        sandbox="allow-scripts allow-same-origin allow-modals"
      />
    </Card>
  );
}