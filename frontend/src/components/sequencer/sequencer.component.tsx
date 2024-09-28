'use client';

import { useSequencerStore } from './useSequencerStore';
import { Controls } from './controls/controls.component';
import { SequencerTable } from './table/sequencer-table.component';
import { Explorer } from './explorer';
import { TrackControls } from './track-controls';
import { SongTimeline } from './song-timeline';

interface SequencerProps {
  audioFiles: string[];
}

export const Sequencer: React.FC<SequencerProps> = ({ audioFiles }) => {
  const selectedTrackId = useSequencerStore((state) => state.selectedTrackId);
  const selectedPatternId = useSequencerStore((state) => state.selectedPatternId);
  const patterns = useSequencerStore((state) => state.patterns);
  const tracks = useSequencerStore((state) => state.tracks);

  const selectedPattern = patterns.find((pattern) => pattern.id === selectedPatternId);
  const selectedTrack = tracks.find((track) => track.id === selectedTrackId);

  return (
    <div className='flex flex-col w-full   p-2'>
      <Controls selectedPattern={selectedPattern} />
      <SongTimeline />
      <div className='flex w-full gap-0 h-[60vh]'>
        <Explorer audioFiles={audioFiles} selectedTrack={selectedTrack || null} />
        <SequencerTable selectedPattern={selectedPattern} />
      </div>

      {selectedTrack ? <TrackControls selectedTrack={selectedTrack} /> : null}
    </div>
  );
};
