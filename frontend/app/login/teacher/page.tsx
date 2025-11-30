'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TeacherDashboard } from "../components/TeacherDashboard";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { useAuth } from "../hooks/useAuth";

export default function TeacherDashboardPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && isAuthenticated && user) {
      // Redirect students to their dashboard
      if (user.role !== 'professor' && user.role !== 'teacher') {
        router.replace('/login/student');
      }
    }
  }, [mounted, user, isAuthenticated, loading, router]);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <TeacherDashboard />
    </ProtectedRoute>
  );
}

