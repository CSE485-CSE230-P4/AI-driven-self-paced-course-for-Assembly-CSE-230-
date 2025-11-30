'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#800020] px-6 py-4 shadow-md">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 h-10 w-10 rounded flex items-center justify-center">
              <span className="text-[#800020] font-bold text-lg">CSE</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">CSE 230 Computer Systems</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Arizona State University</h1>
            <p className="text-gray-600">CSE 230: Computer Org/Assemb Lang Prog</p>
          </div>
          
          <Card className="border-2 shadow-xl">
            <CardHeader className="text-center space-y-1">
              <CardTitle>Welcome</CardTitle>
              <CardDescription>
                Choose an option to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={() => router.push('/register')} 
                className="w-full bg-[#800020] hover:bg-[#91173b] text-white"
                size="lg"
              >
                Sign Up
              </Button>
              <Button 
                onClick={() => router.push('/login')} 
                className="w-full"
                variant="outline"
                size="lg"
              >
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
