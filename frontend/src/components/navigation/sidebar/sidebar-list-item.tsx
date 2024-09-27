'use client';
import { Button } from '@/components/ui/button';
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
    <Button
      asChild
      className={'flex  gap-1 whitespace-nowrap justify-start py-1 px-3  '}
      variant={pathname === config.pathname ? 'default' : 'ghost'}
    >
      <Link href={config.pathname}>
        <Image
          src={`./assets/icons/navbar/${config.image}`}
          width={20}
          height={20}
          alt={config.name}
        />
        <span
          className={`transition-all duration-500 ease-in-out origin-left ${isSidebarOpen ? '' : 'scale-0 opacity-0'}`}
        >
          {config.name}
        </span>
      </Link>
    </Button>
  );
};
