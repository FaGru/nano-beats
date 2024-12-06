'use client';

import { useState } from 'react';
import { Button } from '../ui/button';

interface DirectoryPickerProps {
  onDirectorySelect: (directory: FileSystemDirectoryHandle) => void;
  isDirectorySelected: boolean;
}

export const DirectoryPicker: React.FC<DirectoryPickerProps> = ({
  onDirectorySelect,
  isDirectorySelected
}) => {
  const [supported, setSupported] = useState(true);

  const handleClick = async () => {
    if (!('showDirectoryPicker' in window)) {
      setSupported(false);
      return;
    }

    try {
      // @ts-ignore
      const directoryHandle = await window.showDirectoryPicker();
      console.log('directoryHandle', window);
      onDirectorySelect(directoryHandle);
    } catch (err) {
      console.error('Error selecting directory:', err);
    }
  };

  if (!supported) {
    return (
      <p className='text-sm'>
        Your browser is not supported. Please use the Chrome browser or a Chromium based browser.
      </p>
    );
  }

  return (
    <Button size='xs' onClick={handleClick}>
      {isDirectorySelected ? 'Change directory' : 'Select the directory of your music'}
    </Button>
  );
};
