import { NextResponse } from 'next/server';

export async function GET() {
  // NEW Mock data for an assembly language course
  const missedQuestionsData = [
    {
      id: 'q1',
      questionText: 'Explain the difference between `lw` (load word) and `la` (load address) in MIPS.',
      incorrectAttempts: 42,
      module: 'MIPS Assembly',
    },
    {
      id: 'q2',
      questionText: 'What is the purpose of the `%ebp` (base pointer) register in the x86 stack frame?',
      incorrectAttempts: 31,
      module: 'x86 Architecture',
    },
    {
      id: 'q3',
      questionText: 'How does a RISC-V `jal` (jump and link) instruction store the return address?',
      incorrectAttempts: 25,
      module: 'RISC-V ISA',
    },
    {
      id: 'q4',
      questionText: 'Why can\'t the `addi` instruction be used to load a 32-bit constant in MIPS?',
      incorrectAttempts: 19,
      module: 'MIPS Instructions',
    },
    {
      id: 'q5',
      questionText: 'What is the key difference between a RISC and a CISC architecture?',
      incorrectAttempts: 12,
      module: 'ISA Concepts',
    },
  ];

  return NextResponse.json(missedQuestionsData);
}