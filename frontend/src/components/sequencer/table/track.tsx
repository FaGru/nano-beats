import { TTrack } from '../sequencer.types';
import { useSequencerStore } from '../useSequencerStore';

interface TrackProps {
  track: TTrack;
  steps: number[];
  currentStep: number;
  trackIndex: number;
}

export const Track: React.FC<TrackProps> = ({ track, steps, currentStep, trackIndex }) => {
  const updateTrackStep = useSequencerStore((state) => state.updateTrackStep);
  const isPlaying = useSequencerStore((state) => state.isPlaying);
  const selectTrack = useSequencerStore((state) => state.selectTrack);
  const selectedTrack = useSequencerStore((state) => state.selectedTrack);

  const getColors = (index: number) => {
    let colors = 'bg-gray-300';
    if (index === currentStep && isPlaying) {
      colors = 'bg-blue-500';
    } else if (track.activeSteps.includes(index)) {
      colors = 'bg-gray-500';
    }
    return colors;
  };

  const isTrackNameTruncated = track.name.length > 12;
  const truncatedText = isTrackNameTruncated ? track.name.substring(0, 9) + '...' : track.name;

  return (
    <tr key={trackIndex} onClick={() => selectTrack(track)} className={` `}>
      <td
        className={`sticky left-0 z-10 p-1 text-xs  text-gray-700 font-bold cursor-pointer rounded
          ${selectedTrack?.id === trackIndex ? 'bg-fuchsia-900 text-white' : 'bg-gray-950'}
          `}
      >
        <span title={isTrackNameTruncated ? track.name : ''}>{truncatedText}</span>
      </td>
      {steps.map((step) => (
        <td key={step}>
          <button
            key={step}
            className={`w-12 h-12 rounded hover:bg-blue-400 focus:outline-none align-middle ${step % 4 === 3 ? 'mr-1' : ''}
            ${getColors(step)}
        `}
            onClick={() => updateTrackStep(track.id, step)}
          />
        </td>
      ))}
    </tr>
  );
};
