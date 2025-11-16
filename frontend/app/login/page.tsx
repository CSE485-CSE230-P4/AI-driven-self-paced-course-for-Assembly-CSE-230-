"use client"; 
// This tells Next.js that this page uses client-side features (state, hooks, etc.)

import { useState } from "react";
import { useRouter } from "next/navigation"; 
// Next.js router for navigation

import Link from "next/link";
// For navigating between pages

import { useAuth } from "../../hooks/useAuth";
// Your custom authentication hook (login, register, logout)

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
// UI components from your shadcn-style library

import { Alert, AlertDescription } from "../../components/ui/alert";
import { AlertCircle } from "lucide-react";
// Icons and alert box for error messages

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  // login() function handles authentication using your hook

  // Form state for inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Error message if login fails
  const [error, setError] = useState<string>("");

  // Prevents clicking the button multiple times
  const [isLoading, setIsLoading] = useState(false);

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    setError("");       // Clear previous errors

    // Simple validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    // Try logging in using your custom hook
    const result = await login(formData.email, formData.password);

    // If successful → go to dashboard
    if (result.success) {
      router.push("/dashboard");
    } else {
      // If failed → show error
      setError(result.error || "Login failed.");
      setIsLoading(false);
    }
  };

  return (
    // Page background container
    <div className="min-h-screen flex items-center justify-center bg-muted px-4 py-8">
      <div className="w-full max-w-md space-y-4">
        
        {/* ASU Title */}
        <div className="text-center space-y-1">
          <h1 className="text-primary">Arizona State University</h1>
          <p className="text-muted-foreground">
            CSE 230: Computer Organization & Assembly Language
          </p>
        </div>

        {/* Main login card */}
        <Card className="border-2 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle>Sign in</CardTitle>
            <CardDescription>
              Enter your ASU email and password to continue
            </CardDescription>
          </CardHeader>

          {/* Form content */}
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Error message if login fails */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Email input */}
              <div className="space-y-2">
                <Label htmlFor="email">ASU Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="asurite@asu.edu"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  disabled={isLoading}
                />
              </div>

              {/* Password input */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  disabled={isLoading}
                />
              </div>

              {/* Submit button */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              {/* Link to register */}
              <div className="text-center text-sm text-muted-foreground">
                Don’t have an account?{" "}
                <Link href="/register" className="text-secondary hover:underline">
                  Create one
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
