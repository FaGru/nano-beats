import { TTrack } from '../sequencer.types';
import { useSequencerStore } from '../useSequencerStore';

interface TrackDropZoneProps {
  selectedTrack: TTrack;
}

export const TrackDropZone: React.FC<TrackDropZoneProps> = ({ selectedTrack }) => {
  const updateTrackSample = useSequencerStore((state) => state.updateTrackSample);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, item: string) => {
    event.preventDefault();
    if (selectedTrack) {
      updateTrackSample(
        `./assets/audio/Samples/${item}`,
        selectedTrack.id,
        item.replace(/\.[^/.]+$/, '')
      );
    }
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  return (
    <div className=' bg-secondary h-full p-1  flex flex-col gap-2 rounded '>
      <div
        className='text-md border-dashed border-secondary-foreground border h-full m-1 flex items-center rounded p-2'
        onDrop={(event) => handleDrop(event, event.dataTransfer.getData('text'))}
        onDragOver={handleDragOver}
      >
        <h4>Drop Sample Here</h4>
      </div>
    </div>
  );
};
