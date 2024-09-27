import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { navigationConfig } from './sidebar/sidebar.config';
import { SidebarList } from './sidebar/sidebar-list';
import Image from 'next/image';

interface MobileNavProps {}

export const MobileNav: React.FC<MobileNavProps> = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='shrink-0 md:hidden '>
          <Menu className='h-5 w-5' />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='flex flex-col gap-16 w-48 p-0'>
        <div className='p-2 justify-self-center self-center h-12'>
          <Link href='/'>
            <Image alt='nano beats' src='./assets/icons/navbar/logo.svg' width={80} height={80} />
          </Link>
        </div>
        <nav className='grid gap-2'>
          {navigationConfig.map((config) => (
            <div key={config.name}>
              {config.type === 'header' ? <SidebarList config={config} /> : null}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
