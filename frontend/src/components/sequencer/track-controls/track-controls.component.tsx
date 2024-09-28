import { TTrack } from '../sequencer.types';
import { TrackSample } from './track-sample';
import { TrackEQ } from './track-eq';
import { TrackDropZone } from './track-dropzone';

interface TrackControlsProps {
  selectedTrack: TTrack;
}

export const TrackControls: React.FC<TrackControlsProps> = ({ selectedTrack }) => {
  return (
    <div className='flex gap-2 bg-background border-neutral-600 border border-t-0 px-4 rounded-b-md h-[15vh]  p-1.5'>
      {selectedTrack?.player ? (
        <>
          <TrackSample selectedTrack={selectedTrack} />
          <TrackEQ selectedTrack={selectedTrack} />
        </>
      ) : (
        <>
          <TrackDropZone selectedTrack={selectedTrack} />
        </>
      )}
    </div>
  );
};
