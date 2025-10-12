'use client';

import { FormEvent, useState } from 'react';

type TutorMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const formatHistory = (history: TutorMessage[]) =>
  history.length
    ? history.map(({ role, content }) => `${role.toUpperCase()}: ${content}`).join('\n')
    : undefined;

export default function Home() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<TutorMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = question.trim();
    if (!trimmed) return;

    const updatedMessages: TutorMessage[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(updatedMessages);
    setLoading(true);
    setError(null);
    setQuestion('');

    try {
      const res = await fetch(`${API_URL}/tutor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: trimmed,
          context: formatHistory(updatedMessages),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const detail = typeof data.detail === 'string' ? data.detail : 'Unexpected error';
        throw new Error(detail);
      }

      const data: { answer?: string } = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: (data.answer || 'No response from tutor.').trim() },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 px-6 py-10">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Assembly Tutor</h1>
        <p className="mt-2 text-sm text-gray-600">
          Ask questions about assembly language. Responses are powered by OpenAI.
        </p>
      </header>

      <section className="flex-1 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        {!messages.length ? (
          <p className="text-sm text-gray-500">
            Start the conversation by asking about registers, instructions, or debugging assembly code.
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {messages.map((message, index) => (
              <li
                key={`${message.role}-${index}`}
                className={message.role === 'user' ? 'self-end text-right' : 'self-start'}
              >
                <span
                  className={
                    message.role === 'user'
                      ? 'inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm text-white'
                      : 'inline-block rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-800'
                  }
                >
                  {message.content}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          rows={3}
          placeholder="e.g., How do I set up a stack frame?"
          className="w-full rounded-md border border-gray-300 p-3 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <div className="flex items-center justify-between gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {loading ? 'Thinking...' : 'Ask'}
          </button>
          {error && <p className="text-sm text-red-500">Error: {error}</p>}
        </div>
      </form>
    </main>
  );
}


