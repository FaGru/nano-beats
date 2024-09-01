'use client';
import { useGlobalStore } from '@/lib/state-managment/useGlobalStore';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ListItemProps {
  config: any;
}

export const ListItem: React.FC<ListItemProps> = ({ config }) => {
  const pathname = usePathname();
  const isSidebarOpen = useGlobalStore((state) => state.isSidebarOpen);

  return (
    <Link
      href={config.pathname}
      className={`flex gap-2 p-2 pl-4 text-sm rounded whitespace-nowrap  ${pathname === config.pathname ? 'bg-fuchsia-900' : 'hover:bg-fuchsia-950'}`}
    >
      <Image
        src={`./assets/icons/navbar/${config.image}`}
        width={20}
        height={20}
        alt={config.name}
      />
      <p
        className={`transition-all duration-500 ease-in-out origin-left ${isSidebarOpen ? '' : 'scale-x-0 scale-y-50'}`}
      >
        {config.name}
      </p>
    </Link>
  );
};
