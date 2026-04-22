"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <main style={{ 
        flex: 1, 
        marginLeft: '260px', 
        minHeight: '100vh',
        background: '#f8fafc' 
      }}>
        {children}
      </main>
    </div>
  );
}
