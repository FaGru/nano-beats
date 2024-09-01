'use client';

import React from 'react';
import { ListItem } from './sidebar-list-item';
import { useGlobalStore } from '@/lib/state-managment/useGlobalStore';

interface SidebarListProps {
  config: any;
}

export const SidebarList: React.FC<SidebarListProps> = ({ config }) => {
  const isSideBarOpen = useGlobalStore((state) => state.isSidebarOpen);
  return (
    <div className='p-2'>
      <h4
        className={`transition-all duration-500 ease-in-out origin-left ${isSideBarOpen ? '' : 'scale-x-0 scale-y-50'}`}
      >
        {config.name}
      </h4>

      <ul className='flex flex-col '>
        {config.childs.map((child: any) => (
          <React.Fragment key={child.name}>
            <ListItem config={child} />
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};
