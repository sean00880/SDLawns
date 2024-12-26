import React from 'react';
import Sidebar from './Sidebar';

export default function ServiceLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
