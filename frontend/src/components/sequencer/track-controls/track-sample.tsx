import { useMouseMove } from '@/hooks/useMouseMove';
import { TTrack } from '../sequencer.types';
import { sequencerDefaultVolume, sequencerVolumeLimits } from '../sequencer.constants';
import { useSequencerStore } from '../useSequencerStore';
import { FillableBox } from '@/components/shared/fillable-box';
import { Check, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

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

  const [isNameChangeActive, setIsNameChangeActive] = useState(false);
  const [trackName, setTrackName] = useState(selectedTrack.name);
  useEffect(() => {
    setTrackName(selectedTrack.name);
  }, [selectedTrack]);

  return (
    <Card className='p-1 flex flex-col gap-2'>
      <div className='flex items-center  justify-between pr-2'>
        <Input
          disabled={!isNameChangeActive}
          className={`h-6 w-32 mr-2 bg-transparent rounded-none disabled:cursor-default  ${isNameChangeActive ? 'border-b-primary-foreground' : ''}`}
          value={trackName}
          onChange={(e) => setTrackName(e.target.value)}
        />
        {isNameChangeActive ? (
          <Check
            className='w-4 h-4  cursor-pointer'
            onClick={() => {
              setIsNameChangeActive(false);
              selectedTrack.name = trackName;
              updateTrack(selectedTrack);
            }}
          />
        ) : (
          <Pencil
            className='w-4 h-4 p-0.5 cursor-pointer'
            onClick={() => setIsNameChangeActive(true)}
          />
        )}
      </div>
      <div
        className='flex flex-col items-center justify-center mt-1'
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
          width='144px'
          max={sequencerVolumeLimits.max}
          min={sequencerVolumeLimits.min}
          valueType={'dB'}
        />
      </div>
    </Card>
  );
};
