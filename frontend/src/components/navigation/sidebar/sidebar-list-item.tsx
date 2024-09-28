'use client';
import { Button } from '@/components/ui/button';
import { useGlobalStore } from '@/lib/state-managment/useGlobalStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationItem } from './navigation.types';
import { AudioLines, Circle, Disc3, Drum } from 'lucide-react';

interface ListItemProps {
  config: NavigationItem;
}

const NavIcon: React.FC<{ icon: string }> = ({ icon }) => {
  const sharedStyle = 'mr-2 h-6 w-6 text-center';
  switch (icon) {
    case 'drum-machine':
      return <Drum className={sharedStyle} />;

    case 'sequencer':
      return <AudioLines className={sharedStyle} />;

    case 'dj':
      return <Disc3 className={sharedStyle} />;

    default:
      return <Circle className={sharedStyle} />;
  }
};

export const ListItem: React.FC<ListItemProps> = ({ config }) => {
  const pathname = usePathname();
  const isSidebarOpen = useGlobalStore((state) => state.isSidebarOpen);

  return (
    <Button
      asChild
      className={'flex  gap-1 whitespace-nowrap justify-start py-1 px-2.5  '}
      variant={pathname === config.pathname ? 'default' : 'ghost'}
    >
      <Link href={config.pathname}>
        <div>
          <NavIcon icon={config.icon} />
        </div>
        <span
          className={`transition-all duration-500 ease-in-out origin-left ${isSidebarOpen ? '' : 'scale-0 opacity-0'}`}
        >
          {config.name}
        </span>
      </Link>
    </Button>
  );
};
