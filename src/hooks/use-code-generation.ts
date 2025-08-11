import { useState } from 'react';
import { codeApi } from '@/lib/api-client';
import { CodeGenerationResponse } from '@/types/chat';

export interface UseCodeGenerationReturn {
  generateCode: (prompt: string) => Promise<CodeGenerationResponse | null>;
  isGenerating: boolean;
  error: string | null;
}

export function useCodeGeneration(): UseCodeGenerationReturn {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateCode = async (prompt: string): Promise<CodeGenerationResponse | null> => {
    if (isGenerating) return null;

    setError(null);
    setIsGenerating(true);

    try {
      const response = await codeApi.generateCode({ prompt });
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Code generation failed';
      setError(errorMessage);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateCode,
    isGenerating,
    error,
  };
}