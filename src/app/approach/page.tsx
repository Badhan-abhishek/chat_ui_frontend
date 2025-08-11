import React from 'react';
import Link from 'next/link';

const ApproachPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Home</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            My Approach
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-muted-foreground">
              This is a journal of how I created this application, the tools I used, and the challenges I faced during the development process.
            </p>

            <div className="my-8 p-6 border rounded-lg">
                <h2 className="text-2xl font-bold mt-0 mb-4">AI Tools Used</h2>
                <ul className="list-disc list-inside space-y-2">
                <li>Kiro</li>
                <li>Opencode</li>
                <li>Gemini API</li>
                </ul>
            </div>

            <div className="my-8 p-6 border rounded-lg">
                <h2 className="text-2xl font-bold mt-0 mb-4">Implementation Source</h2>
                <p>
                The implementation was inspired by reverse-engineering the response of how Claude&apos;s agent response works. I used that as a base for my initial prompt and development.
                </p>
            </div>

            <div className="my-8 p-6 border rounded-lg">
                <h2 className="text-2xl font-bold mt-0 mb-4">Development Process</h2>
                <p>
                There was a lot of trial and error with the design and how artifacts work, but I think I got it working well in the end. The process involved iterating on the UI, refining the prompts, and ensuring the code generation was reliable.
                </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApproachPage;
