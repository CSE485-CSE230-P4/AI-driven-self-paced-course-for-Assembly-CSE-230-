'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle, Clock } from 'lucide-react';

// Define the new detailed student type
interface StudentReport {
  id: string;
  name: string;
  email: string;
  progress: number;
  completedModules: string[];
  inprogressModules: string[];
  recentMistakes: string[];
}

// This component receives the ID as a simple string prop
export default function StudentReport({ studentId }: { studentId: string }) {
  const [student, setStudent] = useState<StudentReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We now have a guaranteed studentId string
    // No more "undefined"
    async function fetchStudentData() {
      try {
        setLoading(true);
        const res = await fetch(`/api/analytics/student/${studentId}`);
        if (!res.ok) throw new Error('Student not found');
        const data = await res.json();
        setStudent(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchStudentData();
  }, [studentId]); // The dependency is now the simple, stable string

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg text-asu-gray">Loading student report...</p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg text-asu-gray">Student not found.</p>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/dashboard"
        className="mb-6 inline-flex items-center text-asu-gray hover:text-primary"
      >
        <ArrowLeft size={18} className="mr-2" />
        Back to Dashboard
      </Link>

      <h1 className="mb-2 text-4xl font-bold text-primary">{student.name}</h1>
      <p className="mb-8 text-lg text-asu-gray">{student.email}</p>

      {/* Progress Bar */}
      <div className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold text-primary">
          Overall Progress
        </h2>
        <div className="h-4 w-full rounded-full bg-gray-200">
          <div
            className="h-4 rounded-full bg-secondary"
            style={{ width: `${student.progress}%` }}
          ></div>
        </div>
        <span className="mt-2 text-lg font-semibold text-primary">
          {student.progress}% Complete
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Module Status */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 text-xl font-semibold text-primary">
            Module Status
          </h3>
          <h4 className="mb-2 font-semibold text-asu-green">Completed</h4>
          <ul className="mb-4 list-inside list-none space-y-2">
            {student.completedModules.map((mod) => (
              <li key={mod} className="flex items-center">
                <CheckCircle size={18} className="mr-2 text-asu-green" /> {mod}
              </li>
            ))}
          </ul>
          <h4 className="mb-2 font-semibold text-asu-blue">In Progress</h4>
          <ul className="list-inside list-none space-y-2">
            {student.inprogressModules.map((mod) => (
              <li key={mod} className="flex items-center">
                <Clock size={18} className="mr-2 text-asu-blue" /> {mod}
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Misconceptions */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 text-xl font-semibold text-primary">
            Areas for Review
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-700">
            {student.recentMistakes.map((mistake, i) => (
              <li key={i}>{mistake}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}