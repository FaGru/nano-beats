import { Power } from 'lucide-react';
import { TTrack } from '../sequencer.types';
import { useSequencerStore } from '../useSequencerStore';
import { useMouseMove } from '@/hooks/useMouseMove';
import { eqThreeDefaultVolume, eqThreeVolumeLimits } from '../sequencer.constants';
import { FillableBox } from '@/components/shared/fillable-box';

interface TrackEQProps {
  selectedTrack: TTrack;
}

export const TrackEQ: React.FC<TrackEQProps> = ({ selectedTrack }) => {
  const eqThreeValues = {
    high: selectedTrack?.effects?.eqThree.high.value,
    mid: selectedTrack?.effects?.eqThree.mid.value,
    low: selectedTrack?.effects?.eqThree.low.value
  };
  const updateTrack = useSequencerStore((state) => state.updateTrack);
  const toggleEffectPower = useSequencerStore((state) => state.toggleEffectPower);

  const { handleMouseDown, handleMouseUp } = useMouseMove('y');

  const handleTrackEQ = (updateValue: number, type: string | undefined) => {
    if (type && (type === 'high' || type === 'mid' || type === 'low')) {
      let newVolume = selectedTrack.effects.eqThree[type].value + updateValue / 10;
      if (newVolume < eqThreeVolumeLimits.min) {
        newVolume = eqThreeVolumeLimits.min;
      } else if (newVolume > eqThreeVolumeLimits.max) {
        newVolume = eqThreeVolumeLimits.max;
      }
      selectedTrack.effects.eqThree[type].value = newVolume;
      updateTrack(selectedTrack);
    }
  };

  const resetTrackEQ = (type: 'high' | 'mid' | 'low') => {
    selectedTrack.effects.eqThree[type].value = eqThreeDefaultVolume;
    updateTrack(selectedTrack);
  };
  return (
    <div
      className={`bg-secondary h-full p-1 pt-0 px-6 flex gap-2 rounded relative ${!selectedTrack.connectedEffects.includes('eqThree') ? 'opacity-50' : ''}`}
    >
      <Power
        className={`absolute left-0 top-0 w-4 h-4 ${selectedTrack.connectedEffects.includes('eqThree') ? 'bg-primary' : ''} border rounded p-0.5 cursor-pointer`}
        onClick={() => toggleEffectPower(selectedTrack.id, 'eqThree')}
      />

      {Object.keys(eqThreeValues).map((type: string) => (
        <div
          key={type}
          className='flex flex-col text-xs  items-center gap-0.5 pt-2 '
          onMouseDown={(e) => handleMouseDown(e, handleTrackEQ, type)}
          onTouchStart={(e) => handleMouseDown(e, handleTrackEQ)}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          onDoubleClick={() => resetTrackEQ(type as 'high' | 'mid' | 'low')}
        >
          <p>{type}</p>
          <FillableBox
            value={(Math.round(eqThreeValues[type as 'high' | 'mid' | 'low'] * 10) / 10).toFixed(1)}
            orientation='vertical'
            height='100%'
            width='16px'
            max={eqThreeVolumeLimits.max}
            min={eqThreeVolumeLimits.min}
          />
        </div>
      ))}
    </div>
  );
};
