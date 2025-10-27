// frontend/app/page.tsx

export default function HomePage() {
  return (
    <div>
      <h1 className="mb-4 text-4xl font-bold text-primary">
        Welcome, Instructor!
      </h1>
      <p className="text-lg text-asu-gray">
        Select "My Modules" to begin a lesson or "Dashboard" to view
        student progress.
      </p>
    </div>
  );
}