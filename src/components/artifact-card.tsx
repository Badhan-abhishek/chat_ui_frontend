'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, FileText, Eye, Globe } from 'lucide-react';
import { useCodeSidebar } from '@/contexts/code-sidebar-context';

interface ArtifactCardProps {
  title: string;
  description: string;
  language?: string;
  code: string;
  filename?: string;
}

export function ArtifactCard({ 
  title, 
  description, 
  language = 'javascript', 
  code, 
  filename 
}: ArtifactCardProps) {
  const { addArtifact, previewArtifact } = useCodeSidebar();

  const createArtifact = () => {
    const codeFile = {
      filename: filename || `${title.toLowerCase().replace(/\s+/g, '-')}.${getFileExtension(language)}`,
      content: code,
      language: language as any // Type assertion for the language union
    };

    return {
      id: `artifact-${Date.now()}`,
      title,
      description,
      files: [codeFile],
      createdAt: new Date()
    };
  };

  const handleViewArtifact = () => {
    const artifact = createArtifact();
    addArtifact(artifact);
  };

  const handlePreviewArtifact = () => {
    const artifact = createArtifact();
    previewArtifact(artifact);
  };

  const isPreviewable = () => {
    return language.toLowerCase() === 'html' || 
           language.toLowerCase() === 'css' || 
           language.toLowerCase() === 'javascript';
  };

  const getFileExtension = (lang: string): string => {
    const extensions: Record<string, string> = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      html: 'html',
      css: 'css',
      json: 'json',
      xml: 'xml',
      yaml: 'yml',
      markdown: 'md',
      sql: 'sql',
      shell: 'sh',
      bash: 'sh',
      powershell: 'ps1'
    };
    return extensions[lang.toLowerCase()] || 'txt';
  };

  const getLanguageIcon = () => {
    switch (language.toLowerCase()) {
      case 'html':
      case 'xml':
      case 'markdown':
        return <FileText className="h-4 w-4" />;
      default:
        return <Code className="h-4 w-4" />;
    }
  };

  return (
    <Card className="palantir-shadow-md bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 my-4">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg palantir-shadow-sm">
              {getLanguageIcon()}
            </div>
            <div className="flex-1">
              <h3 className="palantir-heading text-sm font-medium text-blue-900 mb-1">
                {title}
              </h3>
              <p className="palantir-body text-xs text-blue-700 mb-2">
                {description}
              </p>
              <div className="flex items-center gap-2 text-xs text-blue-600">
                <span className="px-2 py-1 bg-blue-100 rounded-full palantir-caption">
                  {language}
                </span>
                {filename && (
                  <span className="palantir-caption">
                    {filename}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {isPreviewable() && (
              <Button
                onClick={handlePreviewArtifact}
                size="sm"
                variant="outline"
                className="gap-2 border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                <Globe className="h-3 w-3" />
                Preview
              </Button>
            )}
            <Button
              onClick={handleViewArtifact}
              size="sm"
              className="gap-2 bg-blue-600 hover:bg-blue-700 text-white palantir-shadow-sm"
            >
              <Eye className="h-3 w-3" />
              View Code
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}