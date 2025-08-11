'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from './code-block';
import { useCodeGeneration } from '@/hooks/use-code-generation';
import { useCodeSidebar } from '@/contexts/code-sidebar-context';
import { Code, Loader2, Sparkles, Eye } from 'lucide-react';
import { CodeGenerationResponse } from '@/types/chat';

export function CodeGenerator() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<CodeGenerationResponse | null>(null);
  const { generateCode, isGenerating, error } = useCodeGeneration();
  const { addFiles, openSidebar } = useCodeSidebar();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    const response = await generateCode(prompt.trim());
    if (response) {
      setResult(response);
      // Auto-add files to sidebar
      addFiles(response.files);
    }
  };

  const handleViewInSidebar = () => {
    if (result) {
      addFiles(result.files);
      openSidebar();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="bg-white neo-shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-400 neo-border neo-shadow">
              <Code className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl font-black uppercase tracking-wide">
              Code Generator
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2">
              Describe what you want to build:
            </label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Create a responsive login form with HTML, CSS, and JavaScript"
              className="min-h-[100px]"
              disabled={isGenerating}
            />
          </div>
          
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full gap-2"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Generating Code...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generate Code
              </>
            )}
          </Button>

          {error && (
            <Card className="bg-red-100 border-red-500 neo-shadow p-4">
              <div className="text-red-800 font-medium">
                Error: {error}
              </div>
            </Card>
          )}
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-white neo-shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  Generated Code
                </CardTitle>
                <p className="text-muted-foreground font-medium">
                  {result.description}
                </p>
              </div>
              <Button
                onClick={handleViewInSidebar}
                variant="secondary"
                className="gap-2"
              >
                <Eye className="h-4 w-4" />
                View in Editor
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {result.files.map((file, index) => (
              <CodeBlock key={index} file={file} />
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}