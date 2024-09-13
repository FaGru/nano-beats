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
  const selectedTrackId = useSequencerStore((state) => state.selectedTrackId);

  const getColors = (index: number) => {
    let colors = 'bg-gray-300';
    if (index === currentStep && isPlaying) {
      colors = 'bg-blue-500';
    } else if (track.activeSteps.includes(index)) {
      colors = 'bg-gray-500';
    }
    return colors;
  };

  return (
    <tr key={trackIndex} onClick={() => selectTrack(track.id)} className={` `}>
      <td
        className={`sticky left-0 z-10 p-2  text-gray-700 font-bold cursor-pointer 
          ${selectedTrackId === trackIndex ? 'bg-fuchsia-900 text-white' : 'bg-gray-950'}
          `}
      >
        {track.name}
      </td>
      {steps.map((step, index) => (
        <td key={index}>
          <button
            key={step}
            className={`w-12 h-12 rounded hover:bg-blue-400 focus:outline-none align-middle ${index % 4 === 3 ? 'mr-1' : ''}
            ${getColors(index)}
        `}
            onClick={() => updateTrackStep(track.id, index)}
          />
        </td>
      ))}
    </tr>
  );
};
