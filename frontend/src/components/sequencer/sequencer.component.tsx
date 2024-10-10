'use client';

import { useSequencerStore } from './useSequencerStore';
import { Controls } from './controls/controls.component';
import { SequencerTable } from './table/sequencer-table.component';
import { Explorer } from './explorer';
import { TrackControls } from './track-controls/track-controls.component';
import { SongTimeline } from './song-timeline';
import { Patterns } from './sequencer-patterns';

interface SequencerProps {
  audioFiles: string[];
}

export const Sequencer: React.FC<SequencerProps> = ({ audioFiles }) => {
  const selectedTrackId = useSequencerStore((state) => state.selectedTrackId);
  const selectedPatternId = useSequencerStore((state) => state.selectedPatternId);
  const patterns = useSequencerStore((state) => state.patterns);
  const tracks = useSequencerStore((state) => state.tracks);
  const mode = useSequencerStore((state) => state.mode);

  const selectedPattern = patterns.find((pattern) => pattern.id === selectedPatternId);
  const selectedTrack = tracks.find((track) => track.id === selectedTrackId);

  return (
    <div className='flex flex-col w-full   p-2'>
      <Controls />
      {mode === 'pattern' ? <Patterns /> : <SongTimeline />}
      <div className='flex w-full gap-0 max-h-[calc(100vh-316px)]'>
        <Explorer audioFiles={audioFiles} selectedTrack={selectedTrack || null} />
        <SequencerTable selectedPattern={selectedPattern} />
      </div>
      {selectedTrack ? <TrackControls selectedTrack={selectedTrack} /> : null}
    </div>
  );
};
