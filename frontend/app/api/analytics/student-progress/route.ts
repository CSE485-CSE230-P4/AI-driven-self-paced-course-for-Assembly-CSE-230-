import { NextResponse } from 'next/server';

export async function GET() {
  // Mock data simulating student progress
  const studentData = [
    {
      id: 's1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      progress: 85,
    },
    {
      id: 's2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      progress: 40,
    },
    {
      id: 's3',
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      progress: 100,
    },
    {
      id: 's4',
      name: 'David Lee',
      email: 'david@example.com',
      progress: 15,
    },
    {
      id: 's5',
      name: 'Eve Davis',
      email: 'eve@example.com',
      progress: 62,
    },
  ];

  return NextResponse.json(studentData);
}