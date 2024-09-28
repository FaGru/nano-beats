'use client';

import React from 'react';
import { ListItem } from './sidebar-list-item';
import { useGlobalStore } from '@/lib/state-managment/useGlobalStore';
import { NavigationHeader, NavigationItem } from './navigation.types';

interface SidebarListProps {
  config: NavigationHeader;
}

export const SidebarList: React.FC<SidebarListProps> = ({ config }) => {
  const isSideBarOpen = useGlobalStore((state) => state.isSidebarOpen);
  return (
    <div className='p-2'>
      <h4
        className={`transition-all duration-500 ease-in-out origin-left ${isSideBarOpen ? '' : 'scale-0 opacity-0'}`}
      >
        {config.name}
      </h4>

      <ul className='flex flex-col '>
        {config.childs.map((child: NavigationItem) => (
          <React.Fragment key={child.name}>
            <ListItem config={child} />
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};
