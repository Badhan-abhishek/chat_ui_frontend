import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Zap, Shield, History, Smartphone, Palette } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-amber-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <div className="inline-block p-4 bg-yellow-400 neo-border neo-shadow-xl mb-6">
              <MessageSquare className="h-12 w-12" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-wide mb-4">
              AI Chat
              <br />
              <span className="text-purple-600">Assistant</span>
            </h1>
            <p className="text-lg font-medium text-muted-foreground max-w-2xl mx-auto">
              Experience the future of conversation with our neobrutalist AI chat interface. 
              Powered by Gemini AI with real-time streaming responses.
            </p>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/chat">
              <Button size="lg" className="text-lg px-8 py-6 h-auto">
                <MessageSquare className="mr-2 h-5 w-5" />
                Start Chatting
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto" asChild>
              <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">
                View Docs
              </a>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card className="bg-white neo-shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-green-400 neo-border neo-shadow flex items-center justify-center mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Real-time Streaming</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium text-muted-foreground">
                Watch AI responses appear in real-time with smooth streaming animations.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white neo-shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-400 neo-border neo-shadow flex items-center justify-center mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">TanStack Query</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium text-muted-foreground">
                Robust state management with caching, error handling, and retry logic.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white neo-shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-400 neo-border neo-shadow flex items-center justify-center mb-4">
                <History className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Conversation History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium text-muted-foreground">
                Maintains full context across messages for natural conversations.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white neo-shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-red-400 neo-border neo-shadow flex items-center justify-center mb-4">
                <Smartphone className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Responsive Design</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium text-muted-foreground">
                Works perfectly on desktop, tablet, and mobile devices.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white neo-shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-400 neo-border neo-shadow flex items-center justify-center mb-4">
                <Palette className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Neobrutalism UI</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium text-muted-foreground">
                Bold, modern design with striking shadows and vibrant colors.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white neo-shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-pink-400 neo-border neo-shadow flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Smooth Animations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium text-muted-foreground">
                Delightful animations powered by Anime.js for enhanced UX.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tech Stack */}
        <Card className="bg-white neo-shadow-xl p-8 text-center">
          <h2 className="text-2xl font-black uppercase tracking-wide mb-6">
            Built With Modern Tech
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Next.js 15', 'TanStack Query', 'TypeScript', 'Tailwind CSS', 'Anime.js', 'Gemini AI'].map((tech) => (
              <div key={tech} className="px-4 py-2 bg-yellow-100 neo-border font-bold text-sm">
                {tech}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
