// frontend/app/login/teacher/data/professorModules.ts

export interface ModuleDetail {
  name: string;
  totalQuestions: number;
  avgAccuracy: number;
  strongCount: number;
  weakCount: number;
  topics: Array<{
    name: string;
    accuracy: number;
    detail: string;
  }>;
  attentionTags: string[];
}

// Mock module data - in production, this would come from an API
const moduleData: Record<string, ModuleDetail> = {
  "1": {
    name: "Introduction to Computer Architecture",
    totalQuestions: 45,
    avgAccuracy: 72,
    strongCount: 28,
    weakCount: 8,
    topics: [
      {
        name: "Computer Abstraction and Technology",
        accuracy: 78,
        detail: "23 correct out of 29 attempts",
      },
      {
        name: "Performance Metrics: CPI, Clock Rate",
        accuracy: 65,
        detail: "19 correct out of 29 attempts",
      },
      {
        name: "Instruction Set Principles",
        accuracy: 70,
        detail: "21 correct out of 30 attempts",
      },
      {
        name: "Introduction to MIPS Architecture",
        accuracy: 75,
        detail: "22 correct out of 29 attempts",
      },
    ],
    attentionTags: ["Performance Metrics", "Clock Rate", "CPI"],
  },
  "2": {
    name: "MIPS Introduction, ALU and Data Transfer",
    totalQuestions: 52,
    avgAccuracy: 68,
    strongCount: 30,
    weakCount: 12,
    topics: [
      {
        name: "MIPS Register File and Conventions",
        accuracy: 72,
        detail: "25 correct out of 35 attempts",
      },
      {
        name: "Arithmetic and Logical Operations",
        accuracy: 65,
        detail: "22 correct out of 34 attempts",
      },
      {
        name: "Load and Store Instructions",
        accuracy: 58,
        detail: "18 correct out of 31 attempts",
      },
      {
        name: "Memory Addressing Modes",
        accuracy: 70,
        detail: "24 correct out of 34 attempts",
      },
    ],
    attentionTags: ["Load and Store", "Memory Addressing"],
  },
  "3": {
    name: "Branch Instructions and Machine Code",
    totalQuestions: 48,
    avgAccuracy: 70,
    strongCount: 29,
    weakCount: 9,
    topics: [
      {
        name: "Branch Instructions",
        accuracy: 73,
        detail: "26 correct out of 36 attempts",
      },
      {
        name: "Jump Instructions",
        accuracy: 68,
        detail: "23 correct out of 34 attempts",
      },
      {
        name: "Machine Code Encoding",
        accuracy: 65,
        detail: "21 correct out of 32 attempts",
      },
      {
        name: "Instruction Format",
        accuracy: 72,
        detail: "25 correct out of 35 attempts",
      },
    ],
    attentionTags: ["Machine Code Encoding", "Instruction Format"],
  },
  "4": {
    name: "Functions and Procedures",
    totalQuestions: 55,
    avgAccuracy: 65,
    strongCount: 28,
    weakCount: 15,
    topics: [
      {
        name: "Function Calls and Returns",
        accuracy: 62,
        detail: "20 correct out of 32 attempts",
      },
      {
        name: "Stack Management",
        accuracy: 58,
        detail: "18 correct out of 31 attempts",
      },
      {
        name: "Register Conventions",
        accuracy: 70,
        detail: "24 correct out of 34 attempts",
      },
      {
        name: "Recursive Functions",
        accuracy: 65,
        detail: "21 correct out of 32 attempts",
      },
    ],
    attentionTags: ["Stack Management", "Function Calls", "Recursive Functions"],
  },
  "5": {
    name: "Arrays and Pointers",
    totalQuestions: 50,
    avgAccuracy: 67,
    strongCount: 27,
    weakCount: 11,
    topics: [
      {
        name: "Array Access Patterns",
        accuracy: 70,
        detail: "24 correct out of 34 attempts",
      },
      {
        name: "Pointer Arithmetic",
        accuracy: 63,
        detail: "20 correct out of 32 attempts",
      },
      {
        name: "String Operations",
        accuracy: 68,
        detail: "23 correct out of 34 attempts",
      },
      {
        name: "Memory Layout",
        accuracy: 65,
        detail: "21 correct out of 32 attempts",
      },
    ],
    attentionTags: ["Pointer Arithmetic", "Memory Layout"],
  },
};

/**
 * Get module detail by ID
 * @param id - Module ID (string)
 * @returns ModuleDetail or undefined if not found
 */
export function getModuleDetail(id: string): ModuleDetail | undefined {
  return moduleData[id];
}

/**
 * Get all module IDs
 * @returns Array of module IDs
 */
export function getAllModuleIds(): string[] {
  return Object.keys(moduleData);
}

