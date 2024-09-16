'use client';
import Image from 'next/image';
import { SidebarList } from './sidebar-list';
import { navigationConfig } from './sidebar.config';
import Link from 'next/link';
import { SidebarOpenClose } from './sidebar-open-close';
import { useGlobalStore } from '@/lib/state-managment/useGlobalStore';

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  const isSidebarOpen = useGlobalStore((state) => state.isSidebarOpen);
  return (
    <aside
      className={`relative bg-gray-900 flex gap-16 flex-col ${isSidebarOpen ? 'w-48' : 'w-16'} transition-all duration-500 ease-in-out`}
    >
      <div className='p-2 justify-self-center self-center h-12'>
        <Link href='/'>
          <Image alt='nano beats' src='./assets/icons/navbar/logo.svg' width={80} height={80} />
        </Link>
      </div>
      {navigationConfig.map((config) => (
        <div key={config.name}>
          {config.type === 'header' ? <SidebarList config={config} /> : null}
        </div>
      ))}
      <SidebarOpenClose />
    </aside>
  );
};
