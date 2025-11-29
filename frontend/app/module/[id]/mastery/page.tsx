"use client";

import { notFound, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import MasteryQuiz from "./QuizClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type Choice = { id: string; text: string; isCorrect: boolean };
type Question = { id: string; prompt: string; choices: Choice[]; hint?: string };
type Quiz = { moduleId: string; questions: Question[] };

export default function MasteryPage() {
  const params = useParams();
  const moduleId = params?.id as string;
  const [numQuestions, setNumQuestions] = useState(10);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const generateQuiz = async () => {
    if (!moduleId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/fetch/quiz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          module_id: moduleId,
          num_questions: numQuestions,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || "Failed to generate quiz");
      }

      setQuiz(data);
      setShowQuiz(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate quiz");
    } finally {
      setLoading(false);
    }
  };

  if (!moduleId) {
    return notFound();
  }

  if (showQuiz && quiz) {
    return (
      <div className="min-h-screen bg-white">
        <main className="max-w-6xl mx-auto px-6 py-8">
          {/* Back */}
          <div className="flex items-center justify-between mb-6">
            <a href={`/module/${moduleId}`} className="inline-flex items-center gap-2 text-gray-600 hover:text-black">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Modules
            </a>
            <button
              onClick={() => {
                setShowQuiz(false);
                setQuiz(null);
              }}
              className="px-4 py-2 rounded-lg bg-gray-100 text-black hover:bg-gray-200"
            >
              Generate New Quiz
            </button>
          </div>

          {/* Title + Pill */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-black mb-2">Module {moduleId} Quiz</h2>
              <p className="text-gray-600">{quiz.questions.length} questions · hints · instant feedback</p>
            </div>
            <div className="ml-6">
              <span className="bg-[#800020] text-white px-6 py-2 rounded-full text-sm font-semibold">
                Practice &amp; Mastery
              </span>
            </div>
          </div>

          {/* Quiz card */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <MasteryQuiz quiz={quiz} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Back */}
        <a href={`/module/${moduleId}`} className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-6">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Modules
        </a>

        {/* Title + Pill */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-black mb-2">Module {moduleId} Quiz</h2>
            <p className="text-gray-600">Practice & Mastery Questions</p>
          </div>
          <div className="ml-6">
            <span className="bg-[#800020] text-white px-6 py-2 rounded-full text-sm font-semibold">
              Practice &amp; Mastery
            </span>
          </div>
        </div>

        {/* Quiz Setup Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-black mb-4">Generate Quiz Questions</h3>
              <p className="text-gray-600 mb-6">
                Select the number of questions you'd like to practice. Questions will be generated
                specifically for Module {moduleId} content.
              </p>
            </div>

            <div className="space-y-4">
              <label htmlFor="numQuestions" className="block text-sm font-medium text-gray-700">
                Number of Questions
              </label>
              <select
                id="numQuestions"
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#800020] focus:border-[#800020] text-gray-900"
                disabled={loading}
              >
                {[5, 10, 15, 20].map((num) => (
                  <option key={num} value={num}>
                    {num} questions
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              onClick={generateQuiz}
              disabled={loading}
              className="w-full px-6 py-3 rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#800020" }}
            >
              {loading ? "Generating Questions..." : "Generate Quiz"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
