import { NextResponse } from 'next/server';

// Mock database of student details for all 5 students
const studentDetails = new Map([
  [
    's1',
    {
      id: 's1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      progress: 85,
      completedModules: ['Intro to Assembly', 'MIPS Registers', 'RISC-V ISA'],
      inprogressModules: ['x86 Architecture'],
      recentMistakes: [
        'Confused `lw` (load word) with `la` (load address)',
        'Forgot purpose of `%ebp` register',
      ],
    },
  ],
  [
    's2',
    {
      id: 's2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      progress: 40,
      completedModules: ['Intro to Assembly'],
      inprogressModules: ['MIPS Registers', 'RISC-V ISA'],
      recentMistakes: ['Misunderstood `jal` return address storage'],
    },
  ],
  [
    's3',
    {
      id: 's3',
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      progress: 100,
      completedModules: [
        'Intro to Assembly',
        'MIPS Registers',
        'RISC-V ISA',
        'x86 Architecture',
        'Stack Frames',
      ],
      inprogressModules: [],
      recentMistakes: [],
    },
  ],
  [
    's4',
    {
      id: 's4',
      name: 'David Lee',
      email: 'david@example.com',
      progress: 15,
      completedModules: ['Intro to Assembly'],
      inprogressModules: ['MIPS Registers'],
      recentMistakes: [
        'Struggling with the concept of a register',
        'Cannot differentiate RISC vs CISC',
        'Repeatedly fails `addi` instruction questions',
      ],
    },
  ],
  [
    's5',
    {
      id: 's5',
      name: 'Eve Davis',
      email: 'eve@example.com',
      progress: 62,
      completedModules: ['Intro to Assembly', 'MIPS Registers'],
      inprogressModules: ['RISC-V ISA', 'x86 Architecture'],
      recentMistakes: [
        'What is the key difference between a RISC and a CISC architecture?',
      ],
    },
  ],
]);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: studentId } = await params;
  const student = studentDetails.get(studentId);

  if (!student) {
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  }

  // Find the full details for the student
  return NextResponse.json(student);
}