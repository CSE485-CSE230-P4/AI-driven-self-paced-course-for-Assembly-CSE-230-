'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart2, BookOpen } from 'lucide-react'; // Using lucide-react for icons

// Helper function for styling active links
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        flex items-center space-x-3 rounded-md p-3 text-gray-200
        transition-colors duration-200
        ${
          isActive
            ? 'bg-primary-dark text-white' // Dark maroon for active
            : 'hover:bg-primary-dark hover:text-white' // Dark maroon on hover
        }
      `}
    >
      {children}
    </Link>
  );
}

export default function Sidebar() {
  // --- SIMULATION: In a real app, you'd get this from an auth context ---
  const userRole = 'instructor';
  // Try changing to 'student' to see the link disappear
  // ------------------------------------------------------------------

  return (
    <nav className="flex w-64 flex-col bg-primary p-4 text-white">
      {/* Logo/Header */}
      <div className="mb-6 flex items-center space-x-2 border-b border-primary-dark pb-4">
        <span className="text-2xl font-bold text-secondary">ASU</span>
        <span className="text-xl font-semibold">CSE 230</span>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 space-y-2">
        <NavLink href="/">
          <Home size={20} />
          <span>Home</span>
        </NavLink>
        <NavLink href="/modules">
          <BookOpen size={20} />
          <span>My Modules</span>
        </NavLink>

        {/* --- Acceptance Criterion #1 --- */}
        {userRole === 'instructor' && (
          <NavLink href="/dashboard">
            <BarChart2 size={20} />
            <span>Dashboard</span>
          </NavLink>
        )}
      </div>

      {/* Footer/User Info */}
      <div className="mt-auto pt-4">
        <p className="text-sm text-gray-300">Logged in as</p>
        <p className="font-semibold">{userRole}</p>
      </div>
    </nav>
  );
}