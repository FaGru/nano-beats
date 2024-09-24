'use client';

import { useSequencerStore } from './useSequencerStore';
import { Controls } from './controls';
import { SequencerTable } from './table/sequencer-table.component';
import { Explorer } from './explorer';
import { TrackControls } from './track-controls';

interface SequencerProps {
  audioFiles: string[];
}

export const Sequencer: React.FC<SequencerProps> = ({ audioFiles }) => {
  const selectedTrackId = useSequencerStore((state) => state.selectedTrackId);
  const tracks = useSequencerStore((state) => state.tracks);
  const selectedTrack = tracks.find((track) => track.id === selectedTrackId);

  return (
    <div className='flex flex-col w-full  gap-1 '>
      <Controls />
      <div className='flex w-full gap-2 h-[65vh]'>
        <Explorer audioFiles={audioFiles} selectedTrack={selectedTrack || null} />
        <SequencerTable />
      </div>
      <div className='bg-gray-950 px-4 rounded-md min-h-28 flex items-center'>
        {selectedTrack ? <TrackControls selectedTrack={selectedTrack} /> : null}
      </div>
    </div>
  );
};
