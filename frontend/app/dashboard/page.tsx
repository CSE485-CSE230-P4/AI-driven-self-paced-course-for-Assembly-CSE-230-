'use client';

import { useEffect, useState } from 'react';
import StudentProgressTable from '@/components/dashboard/StudentProgressTable';
import MostMissedQuestions from '@/components/dashboard/MostMissedQuestions';
import { AlertTriangle } from 'lucide-react';

// Define types for our data
interface Student {
  id: string;
  name: string;
  email: string;
  progress: number;
}

interface MissedQuestion {
  id: string;
  questionText: string;
  incorrectAttempts: number;
  module: string;
}

export default function DashboardPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [questions, setQuestions] = useState<MissedQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [studentRes, questionRes] = await Promise.all([
          fetch('/api/analytics/student-progress'),
          fetch('/api/analytics/most-missed'),
        ]);

        if (!studentRes.ok || !questionRes.ok) {
          throw new Error('Failed to fetch analytics data');
        }

        const studentData = await studentRes.json();
        const questionData = await questionRes.json();

        setStudents(studentData);
        setQuestions(questionData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg text-asu-gray">Loading Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-md border border-red-300 bg-red-50 p-6">
        <AlertTriangle className="h-12 w-12 text-red-500" />
        <h2 className="mt-4 text-xl font-semibold text-red-700">
          Error Loading Data
        </h2>
        <p className="mt-2 text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-4xl font-bold text-primary">
        Instructor Dashboard
      </h1>

      {/* Risk & Mitigation Note */}
      <div className="mb-6 rounded-lg border-l-4 border-asu-orange bg-orange-50 p-4">
        <p className="font-semibold text-asu-orange">Performance Note</p>
        <p className="text-sm text-gray-700">
          <strong>Risk:</strong> Data queries are slow.
          {' '}
          <strong>Mitigation:</strong> Aggregated data should be cached on the
          server and refreshed periodically, not queried live on every page load.
        </p>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* --- Acceptance Criterion #2 --- */}
        <div className="lg:col-span-2">
          <StudentProgressTable students={students} />
        </div>

        {/* --- Acceptance Criterion #3 --- */}
        <div className="lg:col-span-1">
          <MostMissedQuestions questions={questions} />
        </div>
      </div>
    </div>
  );
}