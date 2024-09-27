import { useState, useEffect, useRef } from 'react';
import { TTrack } from './sequencer.types';
import { useSequencerStore } from './useSequencerStore';
import { Button } from '../ui/button';

interface ExplorerProps {
  audioFiles: string[];
  selectedTrack: TTrack | null;
}

export const Explorer: React.FC<ExplorerProps> = ({ audioFiles, selectedTrack }) => {
  const updateTrackSample = useSequencerStore((state) => state.updateTrackSample);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (itemRefs.current[activeItemIndex]) {
      itemRefs.current[activeItemIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [activeItemIndex]);

  useEffect(() => {
    if (selectedTrack?.player) {
      const index = audioFiles.findIndex((item) => item.includes(selectedTrack?.name || ''));
      setActiveItemIndex(index !== -1 ? index : 0);
    }
  }, [selectedTrack, audioFiles]);

  const handleKeyDown = (event: any) => {
    event.preventDefault();
    switch (event.key) {
      case 'ArrowUp':
        setActiveItemIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        break;
      case 'ArrowDown':
        setActiveItemIndex((prevIndex) => Math.min(prevIndex + 1, audioFiles.length - 1));
        break;
      case 'Enter':
        if (selectedTrack) {
          updateTrackSample(
            `./assets/audio/Samples/${audioFiles[activeItemIndex]}`,
            selectedTrack.id,
            audioFiles[activeItemIndex].replace(/\.[^/.]+$/, '')
          );
        }
        break;
    }
  };

  return (
    <div className='p-2  overflow-auto w-[15vw] bg-background border-neutral-600 border border-r-0'>
      <ul ref={listRef} tabIndex={0} className='focus:outline-none' onKeyDown={handleKeyDown}>
        {audioFiles.map((file, index) => (
          <li
            className={`text-xs cursor-pointer rounded focus:outline-none`}
            key={file}
            // @ts-ignore
            ref={(el) => (itemRefs.current[index] = el)}
            draggable
            onDragStart={(event) => event.dataTransfer.setData('text', file)}
            onDoubleClick={() => {
              if (selectedTrack) {
                updateTrackSample(
                  `./assets/audio/Samples/${file}`,
                  selectedTrack.id,
                  file.replace(/\.[^/.]+$/, '')
                );
              }
            }}
            onClick={() => setActiveItemIndex(index)}
          >
            <Button
              variant={index === activeItemIndex ? 'default' : 'ghost'}
              className='flex justify-start w-full focus-visible:ring-0'
              size='xs'
            >
              {file.replace(/\.[^/.]+$/, '')}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
