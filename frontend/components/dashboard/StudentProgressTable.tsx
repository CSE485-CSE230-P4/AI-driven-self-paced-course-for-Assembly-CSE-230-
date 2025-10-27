'use client'; // <-- Must be a client component to use a hook

import { useRouter } from 'next/navigation'; // <-- Import the router

interface Student {
  id: string;
  name: string;
  email: string;
  progress: number;
}

export default function StudentProgressTable({
  students,
}: {
  students: Student[];
}) {
  const router = useRouter(); // <-- Initialize the router

  const handleRowClick = (studentId: string) => {
    router.push(`/dashboard/student/${studentId}`); // <-- Navigate to the new page
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-semibold text-primary">
        Student Progress
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Completion
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {students.map((student) => (
              <tr
                key={student.id}
                onClick={() => handleRowClick(student.id)} // <-- Add click handler
                className="cursor-pointer hover:bg-gray-50" // <-- Add hover styles
              >
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {student.name}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-500">{student.email}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-3/4">
                      <div className="h-2.5 w-full rounded-full bg-gray-200">
                        <div
                          className="h-2.5 rounded-full bg-secondary" // ASU Gold
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="ml-3 w-1-4 text-sm font-medium text-gray-600">
                      {student.progress}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}