'use client';
import { useEffect } from 'react';
import { Sidebar } from '../navigation/sidebar/sidebar.component';
import { Topbar } from '../navigation/topbar/topbar.component';
import { useToneStore } from '@/lib/state-managment/useToneStore';

interface BaseLayoutProps {
  children: React.ReactNode;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const { handleUserInteraction } = useToneStore((state) => state);
  useEffect(() => {
    handleUserInteraction();
  });
  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Topbar />
        <main className='flex-1 overflow-auto p-4 bg-gray-800'>{children}</main>
      </div>
    </div>
  );
};
