'use client';
import { useGlobalStore } from '@/lib/state-managment/useGlobalStore';
import Image from 'next/image';

export const SidebarOpenClose = () => {
  const isSidebarOpen = useGlobalStore((state) => state.isSidebarOpen);
  const setIsSidebarOpen = useGlobalStore((state) => state.setIsSidebarOpen);
  return (
    <button
      className='absolute top-24 -right-2.5 rounded-full border border-slate-50 bg-neutral-900 '
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
    >
      <Image
        className={`transition duration-500 ease-in-out ${isSidebarOpen ? '' : 'rotate-180'} `}
        alt='nano beats'
        src='./assets/icons/arrow.svg'
        width={18}
        height={18}
      />
    </button>
  );
};
