'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown, Folder } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FolderItem {
  name: string;
  handle: FileSystemDirectoryHandle;
  children?: FolderItem[];
}

interface FolderTreeProps {
  folders: FolderItem;
  onSelectFolder: (folder: FileSystemDirectoryHandle) => void;
}

export function FolderTree({ folders, onSelectFolder }: FolderTreeProps) {
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set());

  const toggleFolder = (folderPath: string) => {
    const newOpenFolders = new Set(openFolders);
    if (newOpenFolders.has(folderPath)) {
      newOpenFolders.delete(folderPath);
    } else {
      newOpenFolders.add(folderPath);
    }
    setOpenFolders(newOpenFolders);
  };

  const renderFolder = (folder: FolderItem, path: string = '') => {
    const currentPath = `${path}/${folder.name}`;
    const isOpen = openFolders.has(currentPath);

    return (
      <div key={currentPath}>
        <div
          className='flex items-center space-x-2 py-1 cursor-pointer rounded hover:bg-primary'
          onClick={() => {
            toggleFolder(currentPath);
            onSelectFolder(folder.handle);
            console.log(folder);
          }}
        >
          {folder.children && folder.children.length > 0 ? (
            isOpen ? (
              <ChevronDown className='w-4 h-4' />
            ) : (
              <ChevronRight className='w-4 h-4' />
            )
          ) : (
            <div className='w-4' />
          )}
          <Folder className='w-4 h-4 text-yellow-500' />
          <span className='text-sm font-medium'>{folder.name}</span>
        </div>
        {isOpen && folder.children && (
          <div className='ml-3'>
            {folder.children.map((child) => renderFolder(child, currentPath))}
          </div>
        )}
      </div>
    );
  };

  return <div className='p-2'>{renderFolder(folders)}</div>;
}
