import { TTrack } from '../sequencer.types';
import { TrackSample } from './track-sample';
import { TrackEQ } from './track-eq';
import { TrackDropZone } from './track-dropzone';
import { TrackDelay } from './track-delay';
import { TrackPitch } from './track-pitch';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { TrackReverb } from './track-reverb';
import { TrackDistortion } from './track-distortion';

interface TrackControlsProps {
  selectedTrack: TTrack;
}

export const TrackControls: React.FC<TrackControlsProps> = ({ selectedTrack }) => {
  return (
    <ScrollArea className='flex whitespace-nowrap bg-background border-neutral-600 border border-t-0'>
      <div className='flex  gap-2  px-4 rounded-b-md h-36  p-2 '>
        {selectedTrack?.player?.buffer.loaded ? (
          <>
            <TrackSample selectedTrack={selectedTrack} />
            <TrackPitch selectedTrack={selectedTrack} />
            <TrackEQ selectedTrack={selectedTrack} />
            <TrackDelay selectedTrack={selectedTrack} />
            <TrackReverb selectedTrack={selectedTrack} />
            <TrackDistortion selectedTrack={selectedTrack} />
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
