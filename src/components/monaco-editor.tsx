'use client';

import { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, Download, Check } from 'lucide-react';
import { CodeFile } from '@/types/chat';
import { useState } from 'react';

interface MonacoEditorProps {
  file: CodeFile;
  height?: string;
}

export function MonacoEditor({ file, height = '400px' }: MonacoEditorProps) {
  const [copied, setCopied] = useState(false);
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Configure Monaco theme for neobrutalism
    monaco.editor.defineTheme('neobrutalism', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'C586C0', fontStyle: 'bold' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'type', foreground: '4EC9B0' },
        { token: 'function', foreground: 'DCDCAA' },
      ],
      colors: {
        'editor.background': '#1a1a1a',
        'editor.foreground': '#d4d4d4',
        'editor.lineHighlightBackground': '#2a2a2a',
        'editor.selectionBackground': '#264f78',
        'editorCursor.foreground': '#fbbf24',
        'editorLineNumber.foreground': '#858585',
        'editorLineNumber.activeForeground': '#fbbf24',
      }
    });
    
    monaco.editor.setTheme('neobrutalism');
  };

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

  const getLanguageMapping = (language: string): string => {
    const mappings: Record<string, string> = {
      'javascript': 'javascript',
      'typescript': 'typescript',
      'jsx': 'javascript',
      'tsx': 'typescript',
      'html': 'html',
      'css': 'css',
      'python': 'python',
      'json': 'json',
      'yaml': 'yaml',
      'markdown': 'markdown',
      'text': 'plaintext',
    };
    return mappings[language] || 'plaintext';
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
    <Card className="bg-white neo-shadow overflow-hidden">
      <div className="p-4 border-b-2 border-black">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-black text-lg">{file.filename}</span>
            <span className={`px-3 py-1 text-xs font-bold neo-border ${getLanguageColor(file.language)}`}>
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
      </div>
      
      <div className="border-2 border-black border-t-0">
        <Editor
          height={height}
          language={getLanguageMapping(file.language)}
          value={file.content}
          onMount={handleEditorDidMount}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
            lineNumbers: 'on',
            renderWhitespace: 'selection',
            automaticLayout: true,
            wordWrap: 'on',
            folding: true,
            lineDecorationsWidth: 10,
            lineNumbersMinChars: 3,
            glyphMargin: false,
          }}
        />
      </div>
    </Card>
  );
}