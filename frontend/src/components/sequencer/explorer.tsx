import { useState, useEffect, useRef } from 'react';
import { TTrack } from './sequencer.types';
import { useSequencerStore } from './useSequencerStore';

interface ExplorerProps {
  audioFiles: string[];
  selectedTrack: TTrack | undefined;
}

export const Explorer: React.FC<ExplorerProps> = ({ audioFiles, selectedTrack }) => {
  const updateTrackSample = useSequencerStore((state) => state.updateTrackSample);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // Scroll the active item into view
    if (itemRefs.current[activeItemIndex]) {
      itemRefs.current[activeItemIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center' // Optional: Adjust based on how you want the item to be centered
      });
    }
  }, [activeItemIndex]);

  useEffect(() => {
    if (selectedTrack?.player) {
      const index = audioFiles.findIndex((item) => item.includes(selectedTrack?.name || ''));
      setActiveItemIndex(index !== -1 ? index : 0);
    }
  }, [selectedTrack, audioFiles]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (listRef.current && document.activeElement === listRef.current) {
        event.preventDefault(); // Prevent default scrolling
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
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeItemIndex, audioFiles, selectedTrack, updateTrackSample]);

  return (
    <div className='p-2 bg-gray-950 overflow-auto w-[15vw] rounded'>
      <ul ref={listRef} tabIndex={0} className='focus:outline-none'>
        {audioFiles.map((file, index) => (
          <li
            className={`text-xs p-1 cursor-pointer rounded ${index === activeItemIndex ? 'bg-fuchsia-900' : ''}`}
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
            {file}
          </li>
        ))}
      </ul>
    </div>
  );
};
