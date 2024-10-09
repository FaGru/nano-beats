import { Button } from '@/components/ui/button';
import { TTrack } from '../sequencer.types';
import { useSequencerStore } from '../useSequencerStore';
import { NameChangePopover } from '@/components/shared/name-change-popover';

interface TrackProps {
  track: TTrack;
  steps: number[];

  trackIndex: number;
  activeSteps: number[];
}

export const Track: React.FC<TrackProps> = ({ track, steps, trackIndex, activeSteps }) => {
  const updateStepTrigger = useSequencerStore((state) => state.updateStepTrigger);
  const selectTrack = useSequencerStore((state) => state.selectTrack);
  const updateTrack = useSequencerStore((state) => state.updateTrack);
  const selectedTrackId = useSequencerStore((state) => state.selectedTrackId);

  const getColors = (index: number) => {
    let colors = 'bg-neutral-300';
    if (activeSteps.includes(index)) {
      colors = 'bg-neutral-500';
    }
    return colors;
  };

  const isTrackNameTruncated = track.name.length > 12;
  const truncatedText = isTrackNameTruncated ? track.name.substring(0, 9) + '...' : track.name;
  const handleNameChange = (newName: string) => {
    track.name = newName;
    updateTrack(track);
  };

  return (
    <tr key={trackIndex} onClick={() => selectTrack(track.id)} className={` `}>
      <td className={`sticky left-0 z-10 text-xs   font-bold cursor-pointer rounded bg-background`}>
        <Button
          variant={selectedTrackId === track.id ? 'default' : 'ghost'}
          title={isTrackNameTruncated ? track.name : ''}
          className='w-full flex justify-start relative mr-2'
        >
          <p>{truncatedText}</p>
          {selectedTrackId === track.id && (
            <div className='absolute right-1 top-1'>
              <NameChangePopover onSubmit={handleNameChange} value={track.name} />
            </div>
          )}
        </Button>
      </td>
      {steps.map((step) => (
        <td key={step}>
          <Button
            key={step}
            className={`w-12 h-12 rounded focus-visible:ring-0 align-middle ${step % 4 === 3 ? 'mr-1' : ''}
            hover:bg-primary ${getColors(step)}
        `}
            onClick={() => updateStepTrigger(track.id, step)}
          />
        </td>
      ))}
    </tr>
  );
};
