'use client';
import { Button } from '@/components/ui/button';
import { useGlobalStore } from '@/lib/state-managment/useGlobalStore';
import { ChevronLeft } from 'lucide-react';

export const SidebarOpenClose = () => {
  const isSidebarOpen = useGlobalStore((state) => state.isSidebarOpen);
  const setIsSidebarOpen = useGlobalStore((state) => state.setIsSidebarOpen);
  return (
    <Button
      className='absolute bottom-32 right-2 rounded-full  h-6 w-6 p-0.5'
      variant='ghost'
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
    >
      <ChevronLeft
        className={` h-6 w-6 transition duration-500 ease-in-out ${isSidebarOpen ? '' : 'rotate-180'} pr-0.5`}
      />
    </Button>
  );
};
