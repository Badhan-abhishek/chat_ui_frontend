import { ReactNode } from 'react';
import { ArtifactCard } from '@/components/artifact-card';

export function parseMessageContent(content: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let currentIndex = 0;
  let artifactCounter = 1;

  // Debug logging
  console.log('Parsing message content:', content);

  // Regex to match code blocks with optional language
  const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    console.log('Found code block:', match);
    
    // Add text before the code block
    if (match.index > currentIndex) {
      const textBefore = content.slice(currentIndex, match.index);
      if (textBefore.trim()) {
        parts.push(
          <span key={`text-${currentIndex}`} className="whitespace-pre-wrap">
            {textBefore}
          </span>
        );
      }
    }

    const language = match[1] || 'text';
    const code = match[2].trim();
    
    if (code) {
      // Generate a meaningful title based on the language and content
      const title = generateCodeTitle(language, code, artifactCounter);
      const description = generateCodeDescription(language, code);
      const filename = generateFilename(language, code, artifactCounter);

      console.log('Creating artifact card:', { title, description, language, filename });

      parts.push(
        <ArtifactCard
          key={`artifact-${match.index}`}
          title={title}
          description={description}
          language={language}
          code={code}
          filename={filename}
        />
      );
      
      artifactCounter++;
    }

    currentIndex = match.index + match[0].length;
  }

  // Add remaining text after the last code block
  if (currentIndex < content.length) {
    const remainingText = content.slice(currentIndex);
    if (remainingText.trim()) {
      parts.push(
        <span key={`text-${currentIndex}`} className="whitespace-pre-wrap">
          {remainingText}
        </span>
      );
    }
  }

  // If no code blocks were found, return the original content
  if (parts.length === 0) {
    return [
      <span key="original" className="whitespace-pre-wrap">
        {content}
      </span>
    ];
  }

  return parts;
}

function generateCodeTitle(language: string, code: string, counter: number): string {
  // Try to extract meaningful titles from the code
  const lines = code.split('\n');
  
  // Look for function names, class names, etc.
  for (const line of lines.slice(0, 10)) { // Check first 10 lines
    const trimmed = line.trim();
    
    // Function declarations
    const functionMatch = trimmed.match(/(?:function|def|const|let|var)\s+(\w+)/);
    if (functionMatch) {
      return `${functionMatch[1]} Function`;
    }
    
    // Class declarations
    const classMatch = trimmed.match(/(?:class|interface|type)\s+(\w+)/);
    if (classMatch) {
      return `${classMatch[1]} ${language === 'typescript' ? 'Interface' : 'Class'}`;
    }
    
    // Component names (React)
    const componentMatch = trimmed.match(/(?:export\s+)?(?:default\s+)?(?:function|const)\s+(\w+Component|\w+Page)/);
    if (componentMatch) {
      return `${componentMatch[1]}`;
    }
  }
  
  // Fallback to language-based titles
  const languageTitles: Record<string, string> = {
    javascript: 'JavaScript Code',
    typescript: 'TypeScript Code',
    python: 'Python Script',
    java: 'Java Code',
    cpp: 'C++ Code',
    c: 'C Code',
    html: 'HTML Template',
    css: 'CSS Styles',
    json: 'JSON Data',
    yaml: 'YAML Configuration',
    sql: 'SQL Query',
    shell: 'Shell Script',
    bash: 'Bash Script'
  };
  
  return languageTitles[language.toLowerCase()] || `${language} Code ${counter}`;
}

function generateCodeDescription(language: string, code: string): string {
  const lineCount = code.split('\n').length;
  
  // Try to generate meaningful descriptions
  if (code.includes('import') || code.includes('require')) {
    return `${lineCount} lines with imports and dependencies`;
  }
  
  if (code.includes('function') || code.includes('def ')) {
    return `${lineCount} lines containing function definitions`;
  }
  
  if (code.includes('class ')) {
    return `${lineCount} lines with class definitions`;
  }
  
  if (language.toLowerCase() === 'html') {
    return `HTML template with ${lineCount} lines`;
  }
  
  if (language.toLowerCase() === 'css') {
    return `CSS styles with ${lineCount} lines`;
  }
  
  if (language.toLowerCase() === 'json') {
    return `JSON configuration with ${lineCount} lines`;
  }
  
  // Generic description
  if (lineCount === 1) {
    return `Single line of ${language} code`;
  } else if (lineCount < 10) {
    return `Short ${language} snippet (${lineCount} lines)`;
  } else if (lineCount < 50) {
    return `Medium ${language} code block (${lineCount} lines)`;
  } else {
    return `Large ${language} code file (${lineCount} lines)`;
  }
}

function generateFilename(language: string, code: string, counter: number): string {
  // Try to extract filename from comments
  const lines = code.split('\n');
  for (const line of lines.slice(0, 5)) {
    const filenameMatch = line.match(/(?:\/\/|#|<!--)\s*(?:file:|filename:)?\s*([^\s]+\.\w+)/i);
    if (filenameMatch) {
      return filenameMatch[1];
    }
  }
  
  // Generate based on content analysis
  const trimmed = code.trim();
  
  // React components
  if (trimmed.includes('export default') && trimmed.includes('return')) {
    const componentMatch = trimmed.match(/(?:function|const)\s+(\w+)/);
    if (componentMatch) {
      return `${componentMatch[1]}.tsx`;
    }
  }
  
  // Generic filenames based on language
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
    yaml: 'yml',
    sql: 'sql',
    shell: 'sh',
    bash: 'sh'
  };
  
  const ext = extensions[language.toLowerCase()] || 'txt';
  return `code-${counter}.${ext}`;
}