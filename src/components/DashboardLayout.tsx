import React, { useState, useEffect } from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch('/api/auth/session', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data?.user?.role === 'admin') {
          setIsAdmin(true);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex h-screen">
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b"><h2 className="text-lg font-bold">凉宫数据</h2></div>
          <nav className="p-4 space-y-2">
            <a href="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">📊 概览</a>
            <a href="/dashboard/profile" className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">👤 个人资料</a>
            <a href="/dashboard/messages" className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">💬 消息中心</a>
            {isAdmin && (
              <a href="/dashboard/admin/send" className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-600">📨 发送通知</a>
            )}
            <a href="/user/logout" className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600">🚪 退出</a>
          </nav>
        </aside>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}