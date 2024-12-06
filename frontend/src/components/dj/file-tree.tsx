'use client';

import { Music } from 'lucide-react';

interface FileItem {
  name: string;
  handle: FileSystemFileHandle;
}

interface FileTreeProps {
  files: FileItem[];
  onSelectFile: (file: File) => void;
}

export function FileTree({ files, onSelectFile }: FileTreeProps) {
  const handleFileClick = async (handle: FileSystemFileHandle) => {
    const file = await handle.getFile();
    onSelectFile(file);
  };

  return (
    <div className='p-2'>
      {files.map((file, index) => (
        <div
          key={index}
          className='flex items-center space-x-2 p-1 cursor-pointer rounded hover:bg-primary'
          onClick={() => handleFileClick(file.handle)}
          draggable
          onDragStart={(e) => e.dataTransfer.setData('text', file.name)}
        >
          <Music className='w-4 h-4 text-blue-500' />
          <span className='text-sm'>{file.name}</span>
        </div>
      ))}
    </div>
  );
}
