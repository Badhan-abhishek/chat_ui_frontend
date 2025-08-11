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
      html: 'bg-orange-100 text-orange-800',
      css: 'bg-blue-100 text-blue-800',
      javascript: 'bg-yellow-100 text-yellow-800',
      typescript: 'bg-blue-100 text-blue-800',
      python: 'bg-green-100 text-green-800',
      jsx: 'bg-cyan-100 text-cyan-800',
      tsx: 'bg-cyan-100 text-cyan-800',
      json: 'bg-gray-100 text-gray-800',
      yaml: 'bg-purple-100 text-purple-800',
      markdown: 'bg-gray-100 text-gray-800',
      text: 'bg-gray-100 text-gray-800',
    };
    return colors[language] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="bg-white neo-shadow mb-4">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-gray-800 neo-border">
              <Code className="h-4 w-4 text-white" />
            </div>
            <span className="font-black text-sm">{file.filename}</span>
            <span className={`px-2 py-1 text-xs font-bold neo-border ${getLanguageColor(file.language)}`}>
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
        <div className="bg-gray-900 neo-border p-4 overflow-x-auto">
          <pre className="text-sm text-gray-100 font-mono whitespace-pre-wrap">
            <code>{file.content}</code>
          </pre>
        </div>
      </div>
    </Card>
  );
}