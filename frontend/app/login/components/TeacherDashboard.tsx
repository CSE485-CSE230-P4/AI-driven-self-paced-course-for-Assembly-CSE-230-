'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { LogOut, Users, BookOpen, BarChart3, FileText } from 'lucide-react';

export function TeacherDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Mock data for teacher dashboard
  const totalStudents = 45;
  const activeModules = 13;
  const averageMastery = 78;
  const recentSubmissions = 12;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#800020] px-6 py-4 shadow-md">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 h-10 w-10 rounded flex items-center justify-center">
              <span className="text-[#800020] font-bold text-lg">CSE</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">CSE 230 Computer Systems</h1>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Button variant="outline" onClick={handleLogout} className="bg-transparent border-white text-white hover:bg-white hover:text-[#800020]">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {user?.name ?? user?.email ?? 'Professor'}!
          </h2>
          <p className="text-gray-600">Manage your course and monitor student progress</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Total Students</CardTitle>
              <Users className="h-4 w-4 text-[#800020]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalStudents}</div>
              <p className="text-xs text-gray-600">Enrolled in course</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Active Modules</CardTitle>
              <BookOpen className="h-4 w-4 text-[#800020]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{activeModules}</div>
              <p className="text-xs text-gray-600">Available modules</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Average Mastery</CardTitle>
              <BarChart3 className="h-4 w-4 text-[#800020]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{averageMastery}%</div>
              <p className="text-xs text-gray-600">Across all students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Recent Submissions</CardTitle>
              <FileText className="h-4 w-4 text-[#800020]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{recentSubmissions}</div>
              <p className="text-xs text-gray-600">Last 24 hours</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/module/1">
              <CardHeader>
                <CardTitle className="text-gray-900">View Course Modules</CardTitle>
                <CardDescription className="text-gray-600">Browse and manage course content</CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-gray-900">Student Analytics</CardTitle>
              <CardDescription className="text-gray-600">View detailed student performance metrics</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-gray-900">Grade Submissions</CardTitle>
              <CardDescription className="text-gray-600">Review and grade student assignments</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">Recent Activity</CardTitle>
            <CardDescription className="text-gray-600">Latest student submissions and progress updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Student completed Module 3</p>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
                <span className="text-sm font-semibold text-green-600">92% Mastery</span>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">New submission: Module 2 Quiz</p>
                  <p className="text-sm text-gray-600">5 hours ago</p>
                </div>
                <span className="text-sm font-semibold text-blue-600">Pending Review</span>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Student reached Module 5</p>
                  <p className="text-sm text-gray-600">1 day ago</p>
                </div>
                <span className="text-sm font-semibold text-green-600">88% Mastery</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

