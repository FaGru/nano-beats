'use client';
import { useState } from 'react';
import { DirectoryPicker } from './directory-picker';
import { ScrollArea } from '../ui/scroll-area';
import { FileTree } from './file-tree';

import { useDJStore } from './useDJStore';
import * as Tone from 'tone';
import { FolderTree } from './folder-tree';

interface FolderItem {
  name: string;
  handle: FileSystemDirectoryHandle;
  children?: FolderItem[];
}

interface FileItem {
  name: string;
  handle: FileSystemFileHandle;
}

export const Explorer = () => {
  const [rootFolder, setRootFolder] = useState<FolderItem | null>(null);

  const currentFiles = useDJStore((state) => state.currentFiles);
  const setCurrentFiles = useDJStore((state) => state.setCurrentFiles);

  const isMusicFile = (name: string) => /\.(mp3|wav|ogg|flac)$/i.test(name);

  const processDirectory = async (
    directoryHandle: FileSystemDirectoryHandle
  ): Promise<FolderItem> => {
    const children: FolderItem[] = [];
    const files: FileItem[] = [];
    // @ts-ignore
    for await (const entry of directoryHandle.values()) {
      if (entry.kind === 'directory') {
        children.push(await processDirectory(entry));
      } else if (entry.kind === 'file' && isMusicFile(entry.name)) {
        files.push({ name: entry.name, handle: entry });
      }
    }

    if (directoryHandle === rootFolder?.handle) {
      setCurrentFiles(files);
    }

    return {
      name: directoryHandle.name,
      handle: directoryHandle,
      children: children.length > 0 ? children : undefined
    };
  };

  const handleDirectorySelect = async (directoryHandle: FileSystemDirectoryHandle) => {
    const folderStructure = await processDirectory(directoryHandle);
    setRootFolder(folderStructure);
  };

  const djDecks = useDJStore((state) => state.djDecks);
  const updateDJDeck = useDJStore((state) => state.updateDJDeck);
  const handleFileSelect = async (file: File) => {
    console.log('file', file);
    if (djDecks.length || djDecks[0].player) {
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await Tone.getContext().decodeAudioData(arrayBuffer);
      // @ts-ignore
      djDecks[0].player.buffer = audioBuffer;

      djDecks[0].sample = file.name;
      updateDJDeck(djDecks[0]);
    }
  };

  const handleFolderSelect = async (folderHandle: FileSystemDirectoryHandle) => {
    const files: FileItem[] = [];
    // @ts-ignore
    for await (const entry of folderHandle.values()) {
      if (entry.kind === 'file' && isMusicFile(entry.name)) {
        files.push({ name: entry.name, handle: entry });
      }
    }
    setCurrentFiles(files);
  };
  return (
    <div className='bg-background w-full rounded-md  '>
      <div className='flex justify-between  p-2 items-center border-b'>
        {rootFolder && <p className='text-sm'>Current directory: {rootFolder.name}</p>}
        <DirectoryPicker
          onDirectorySelect={handleDirectorySelect}
          isDirectorySelected={!!rootFolder}
        />
      </div>

      {rootFolder && (
        <div className='flex'>
          <ScrollArea className='h-52 w-1/3 border-r'>
            <FolderTree folders={rootFolder} onSelectFolder={handleFolderSelect} />
          </ScrollArea>

          <ScrollArea className=' h-52 w-2/3'>
            <FileTree files={currentFiles} onSelectFile={handleFileSelect} />
          </ScrollArea>
        </div>
      )}
    </div>
  );
};
