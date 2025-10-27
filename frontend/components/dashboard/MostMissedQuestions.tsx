interface MissedQuestion {
  id: string;
  questionText: string;
  incorrectAttempts: number;
  module: string;
}

export default function MostMissedQuestions({
  questions,
}: {
  questions: MissedQuestion[];
}) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-semibold text-primary">
        Common Misconceptions
      </h2>
      <ol className="list-inside list-decimal space-y-4">
        {questions.map((q) => (
          <li key={q.id} className="text-gray-700">
            <span className="font-semibold text-gray-900">
              {q.questionText}
            </span>
            <div className="mt-1 flex items-center justify-between text-sm">
              <span className="text-gray-500">{q.module}</span>
              <span
                className="rounded-full bg-asu-orange px-2.5 py-0.5 text-xs font-bold text-white"
                title={`${q.incorrectAttempts} incorrect attempts`}
              >
                {q.incorrectAttempts}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}