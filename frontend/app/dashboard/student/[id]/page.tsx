import StudentReport from './Report'; // Import the new client component

// This is now a Server Component (no 'use client')
// It receives the params directly as a resolved object
export default async function StudentReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: studentId } = await params;

  // We pass the simple studentId string as a prop
  // to our new client component.
  return <StudentReport studentId={studentId} />;
}