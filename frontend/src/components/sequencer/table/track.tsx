import { Button } from '@/components/ui/button';
import { TTrack } from '../sequencer.types';
import { useSequencerStore } from '../useSequencerStore';

interface TrackProps {
  track: TTrack;
  steps: number[];
  currentStep: number;
  trackIndex: number;
  activeSteps: number[];
}

export const Track: React.FC<TrackProps> = ({
  track,
  steps,
  currentStep,
  trackIndex,
  activeSteps
}) => {
  const updateStepTrigger = useSequencerStore((state) => state.updateStepTrigger);
  const isPlaying = useSequencerStore((state) => state.isPlaying);
  const selectTrack = useSequencerStore((state) => state.selectTrack);
  const selectedTrackId = useSequencerStore((state) => state.selectedTrackId);

  const getVariant = (index: number) => {
    let variant = 'basic';
    if (index === currentStep && isPlaying) {
      variant = 'default';
    } else if (activeSteps.includes(index)) {
      variant = 'secondary';
    }
    return variant as 'basic' | 'default' | 'secondary';
  };

  const getColors = (index: number) => {
    let colors = 'bg-neutral-300';
    if (index === currentStep && isPlaying) {
      colors = 'bg-primary';
    } else if (activeSteps.includes(index)) {
      colors = 'bg-neutral-500';
    }
    return colors;
  };

  const isTrackNameTruncated = track.name.length > 12;
  const truncatedText = isTrackNameTruncated ? track.name.substring(0, 9) + '...' : track.name;

  return (
    <tr key={trackIndex} onClick={() => selectTrack(track.id)} className={` `}>
      <td
        className={`sticky left-0 z-10 text-xs   font-bold cursor-pointer rounded
      
          `}
      >
        <Button
          variant={selectedTrackId === track.id ? 'default' : 'ghost'}
          title={isTrackNameTruncated ? track.name : ''}
          className='w-full flex justify-start'
        >
          {truncatedText}
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
