'use client';

import { useSequencerStore } from './useSequencerStore';
import { Controls } from './controls';
import { SequencerTable } from './table/sequencer-table.component';
import { Explorer } from './explorer';
import { TrackZone } from './track-controls';

interface SequencerProps {
  audioFiles: string[];
}

export const Sequencer: React.FC<SequencerProps> = ({ audioFiles }) => {
  const selectedTrack = useSequencerStore((state) => state.selectedTrack);

  return (
    <div className='flex flex-col w-full  gap-1 '>
      <Controls />

      <div className='flex w-full gap-2 h-[65vh]'>
        <Explorer audioFiles={audioFiles} selectedTrack={selectedTrack} />
        <SequencerTable />
      </div>
      <div className='bg-gray-950 px-4 rounded-md min-h-28 flex items-center'>
        {selectedTrack ? <TrackZone selectedTrack={selectedTrack} /> : null}
      </div>
    </div>
  );
};
