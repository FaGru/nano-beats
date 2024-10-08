'use client';
import { useEffect } from 'react';
import { Sidebar } from '../navigation/sidebar/sidebar.component';
import { Topbar } from '../navigation/topbar/topbar.component';
import { useToneStore } from '@/lib/state-managment/useToneStore';
import { Puff } from 'react-loader-spinner';
import { MobileNav } from '../navigation/mobile-nav.component';

interface BaseLayoutProps {
  children: React.ReactNode;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const { handleUserInteraction, tone } = useToneStore((state) => state);
  useEffect(() => {
    handleUserInteraction();
  });

  return (
    <div className='flex h-screen overflow-hidden '>
      <Sidebar />
      <div className='p-2  bg-secondary md:hidden '>
        <MobileNav />
      </div>
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Topbar />
        <main className='flex-1 overflow-auto p-1 bg-secondary'>
          {tone ? (
            children
          ) : (
            <div className='flex h-full items-center justify-center flex-col content-around gap-4 bg-background rounded'>
              <p>Click Or Touch to activate the Devices</p>
              <Puff
                visible={true}
                height='40'
                width='40'
                color={'hsl(var(--primary))'}
                ariaLabel='puff-loading'
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
