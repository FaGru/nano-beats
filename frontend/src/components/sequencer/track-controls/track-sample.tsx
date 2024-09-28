import { useMouseMove } from '@/hooks/useMouseMove';
import { TTrack } from '../sequencer.types';
import { sequencerDefaultVolume, sequencerVolumeLimits } from '../sequencer.constants';
import { useSequencerStore } from '../useSequencerStore';
import { FillableBox } from '@/components/shared/fillable-box';

interface TrackSampleProps {
  selectedTrack: TTrack;
}

export const TrackSample: React.FC<TrackSampleProps> = ({ selectedTrack }) => {
  const { handleMouseDown, handleMouseUp } = useMouseMove('y');
  const updateTrack = useSequencerStore((state) => state.updateTrack);

  const handleTrackGain = (updateValue: number) => {
    if (selectedTrack.player) {
      let newVolume = selectedTrack.player.volume.value + updateValue / 10;
      if (newVolume < sequencerVolumeLimits.min) {
        newVolume = sequencerVolumeLimits.min;
      } else if (newVolume > sequencerVolumeLimits.max) {
        newVolume = sequencerVolumeLimits.max;
      }
      selectedTrack.player.volume.value = newVolume;
      updateTrack(selectedTrack);
    }
  };
  const resetTrackGain = () => {
    if (selectedTrack.player) {
      selectedTrack.player.volume.value = sequencerDefaultVolume;
      updateTrack(selectedTrack);
    }
  };
  return (
    <div className=' bg-secondary h-full p-1  flex flex-col gap-2 rounded '>
      <h4>{selectedTrack.name}</h4>
      <div
        className='flex flex-col items-center justify-center'
        onMouseDown={(e) => handleMouseDown(e, handleTrackGain)}
        onTouchStart={(e) => handleMouseDown(e, handleTrackGain)}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}
        onDoubleClick={resetTrackGain}
      >
        <FillableBox
          value={
            selectedTrack.player
              ? (Math.round(selectedTrack.player.volume.value * 10) / 10).toFixed(1)
              : '0.0'
          }
          orientation='horizontal'
          height={'16px'}
          width='128px'
          max={sequencerVolumeLimits.max}
          min={sequencerVolumeLimits.min}
          valueType={'dB'}
        />
      </div>
    </div>
  );
};
