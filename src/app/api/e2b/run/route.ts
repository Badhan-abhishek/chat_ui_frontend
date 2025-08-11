import { NextRequest } from 'next/server';

interface RunRequestBody {
  files: Array<{ filename: string; content: string; language: string }>;
  language?: string;
  entry?: string | null;
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.E2B_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ ok: false, message: 'E2B_API_KEY is not configured on the server' }), { status: 500 });
    }

    const body = (await req.json()) as RunRequestBody;
    const { files, language, entry } = body;
    if (!files || !Array.isArray(files) || files.length === 0) {
      return new Response(JSON.stringify({ ok: false, message: 'No files provided' }), { status: 400 });
    }

    // Choose a base Docker image by language. Minimal set for demo.
    const image =
      language === 'python'
        ? 'python:3.11-slim'
        : language === 'typescript'
        ? 'node:20'
        : language === 'javascript'
        ? 'node:20'
        : language === 'bash' || language === 'shell'
        ? 'debian:stable-slim'
        : 'node:20';

    // Build a simple bash script to write the files and run the entry.
    // Note: This is a simplified integration for demo purposes using the E2B REST runner endpoint.
    const runCommand = (() => {
      switch (language) {
        case 'python':
          return `python ${entry || files[0].filename}`;
        case 'typescript':
          return `npx ts-node ${entry || files[0].filename}`;
        case 'javascript':
          return `node ${entry || files[0].filename}`;
        case 'bash':
        case 'shell':
          return `bash ${entry || files[0].filename}`;
        default:
          return `echo "No runner configured for language: ${language || 'unknown'}"`;
      }
    })();

    // Compose a tar-like payload of files inside a shell command
    // For simplicity, we echo-append. This is not safe for binary but fine for code snippets.
    const setupScript = files
      .map((f) => {
        // Escape EOF markers safely
        const content = f.content.replaceAll('`', '\\`');
        return `cat > ${f.filename} << 'EOF'\n${content}\nEOF`;
      })
      .join('\n');

    const script = `${setupScript}\n${runCommand}`;

    // Call E2B REST API: this is a placeholder path that many deploys proxy. Adjust per your infra.
    const resp = await fetch('https://api.e2b.dev/v1/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ image, script }),
    });

    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      return new Response(
        JSON.stringify({ ok: false, message: data?.message || `E2B error ${resp.status}` }),
        { status: 502 }
      );
    }

    // Expect structure: { stdout, stderr, exit_code }
    return new Response(
      JSON.stringify({
        ok: true,
        stdout: data.stdout || '',
        stderr: data.stderr || '',
        exitCode: typeof data.exit_code === 'number' ? data.exit_code : null,
      }),
      { status: 200 }
    );
  } catch (e: any) {
    return new Response(
      JSON.stringify({ ok: false, message: e?.message || 'Unexpected server error' }),
      { status: 500 }
    );
  }
}


