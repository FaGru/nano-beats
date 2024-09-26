'use client';

import { useSequencerStore } from './useSequencerStore';

interface SongTimelineProps {}

export const SongTimeline: React.FC<SongTimelineProps> = () => {
  const patterns = useSequencerStore((state) => state.patterns);
  return (
    <div className='flex  p-2 rounded w-full h-[6vh] gap-4 items-center px-2 bg-gray-950'>
      {patterns.map((pattern) => (
        <button type='button' className='border rounded p-1 text-xs' key={pattern.id}>
          {pattern.name}
        </button>
      ))}
      <button type='button' className={` w-12 rounded  `}>
        +
      </button>
    </div>
  );
};
