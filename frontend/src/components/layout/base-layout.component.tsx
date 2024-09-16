'use client';
import { useEffect } from 'react';
import { Sidebar } from '../navigation/sidebar/sidebar.component';
import { Topbar } from '../navigation/topbar/topbar.component';
import { useToneStore } from '@/lib/state-managment/useToneStore';
import { LoadingSpinner } from '../shared/loading-spinner';

interface BaseLayoutProps {
  children: React.ReactNode;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const { handleUserInteraction, tone } = useToneStore((state) => state);
  useEffect(() => {
    handleUserInteraction();
  });

  // if (!tone) {
  //   return (s
  //     <div>
  //       <p>Click Or Touch to activate the Devices</p>
  //       <LoadingSpinner />
  //     </div>
  //   );
  // }

  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Topbar />
        <main className='flex-1 overflow-auto p-4 bg-gray-800'>
          {tone ? (
            children
          ) : (
            <div className='flex h-full items-center justify-center flex-col content-around gap-4 bg-gray-950 rounded'>
              <p>Click Or Touch to activate the Devices</p>
              <LoadingSpinner />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
