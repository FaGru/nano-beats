import { TTrack } from '../sequencer.types';
import { TrackSample } from './track-sample';
import { TrackEQ } from './track-eq';
import { TrackDropZone } from './track-dropzone';
import { TrackDelay } from './track-delay';
import { TrackPitch } from './track-pitch';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface TrackControlsProps {
  selectedTrack: TTrack;
}

export const TrackControls: React.FC<TrackControlsProps> = ({ selectedTrack }) => {
  return (
    <ScrollArea className='flex whitespace-nowrap '>
      <div className='flex  gap-2 bg-background border-neutral-600 border border-t-0 px-4 rounded-b-md h-[15vh]  p-1.5'>
        {selectedTrack?.player ? (
          <>
            <TrackSample selectedTrack={selectedTrack} />
            <TrackPitch selectedTrack={selectedTrack} />
            <TrackEQ selectedTrack={selectedTrack} />
            <TrackDelay selectedTrack={selectedTrack} />
          </>
        ) : (
          <>
            <TrackDropZone selectedTrack={selectedTrack} />
          </>
        )}
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  );
};
