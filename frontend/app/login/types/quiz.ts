// frontend/app/login/types/quiz.ts

/**
 * Quiz question structure
 */
export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
  topic: string;
  subTopic?: string; // Optional subtopic
  module?: string; // Optional module identifier
}

/**
 * Quiz attempt structure
 */
export interface QuizAttempt {
  questions: Question[];
  answers: (number | null)[]; // Array of selected answer indices (null if not answered)
  attemptNumber: number;
  score?: number; // Number of correct answers
  completed: boolean;
  incorrectTopics?: string[]; // Topics where questions were answered incorrectly
}

