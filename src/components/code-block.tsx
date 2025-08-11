import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, Check, Download, Code } from 'lucide-react';
import { CodeFile } from '@/types/chat';

interface CodeBlockProps {
  file: CodeFile;
}

export function CodeBlock({ file }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(file.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadFile = () => {
    const blob = new Blob([file.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      html: 'bg-orange-50 text-orange-700 border-orange-200',
      css: 'bg-blue-50 text-blue-700 border-blue-200',
      javascript: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      typescript: 'bg-blue-50 text-blue-700 border-blue-200',
      python: 'bg-green-50 text-green-700 border-green-200',
      jsx: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      tsx: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      json: 'bg-gray-50 text-gray-700 border-gray-200',
      yaml: 'bg-purple-50 text-purple-700 border-purple-200',
      markdown: 'bg-gray-50 text-gray-700 border-gray-200',
      text: 'bg-gray-50 text-gray-700 border-gray-200',
    };
    return colors[language] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <Card className="palantir-shadow mb-4">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary text-secondary-foreground rounded-md palantir-shadow">
              <Code className="h-4 w-4" />
            </div>
            <span className="palantir-heading text-sm">{file.filename}</span>
            <span className={`px-2 py-1 text-xs palantir-caption rounded-md border ${getLanguageColor(file.language)}`}>
              {file.language.toUpperCase()}
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={copyToClipboard}
              size="sm"
              variant="outline"
              className="gap-1"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
            <Button
              onClick={downloadFile}
              size="sm"
              variant="outline"
              className="gap-1"
            >
              <Download className="h-3 w-3" />
              Download
            </Button>
          </div>
        </div>
        <div className="bg-slate-900 rounded-lg palantir-border p-4 overflow-x-auto">
          <pre className="text-sm text-slate-100 font-mono whitespace-pre-wrap">
            <code>{file.content}</code>
          </pre>
        </div>
      </div>
    </Card>
  );
}