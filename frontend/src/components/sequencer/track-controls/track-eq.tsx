import { Power } from 'lucide-react';
import { TTrack } from '../sequencer.types';
import { useSequencerStore } from '../useSequencerStore';
import { eqThreeDefaultVolume, eqThreeVolumeLimits } from '../sequencer.constants';
import { Card } from '@/components/ui/card';
import { KnobControl } from '@/components/shared/knob-control';

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

  const handleTrackEQ = (updateValue: number, type: string | undefined) => {
    if (type && (type === 'high' || type === 'mid' || type === 'low')) {
      let newVolume = selectedTrack.effects.eqThree[type].value + updateValue / 20;
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
    <Card
      className={`py-1 px-6 flex gap-4 relative ${!selectedTrack.connectedEffects.includes('eqThree') ? 'opacity-50' : ''}`}
    >
      <Power
        className={`absolute left-0 top-0 w-4 h-4 ${selectedTrack.connectedEffects.includes('eqThree') ? 'bg-primary' : ''} border rounded p-0.5 cursor-pointer`}
        onClick={() => toggleEffectPower(selectedTrack.id, 'eqThree')}
      />

      <KnobControl
        handleKnobChange={(valueChange) => handleTrackEQ(valueChange, 'high')}
        handleDoupleClick={() => resetTrackEQ('high')}
        maxValue={eqThreeVolumeLimits.max}
        minValue={eqThreeVolumeLimits.min}
        value={(eqThreeValues.high * 10) / 10}
        size='md'
        title={'GainHigh'}
        text={`${((eqThreeValues.high * 10) / 10).toFixed(1)} dB`}
      />

      <KnobControl
        handleKnobChange={(valueChange) => handleTrackEQ(valueChange, 'mid')}
        handleDoupleClick={() => resetTrackEQ('mid')}
        maxValue={eqThreeVolumeLimits.max}
        minValue={eqThreeVolumeLimits.min}
        value={(eqThreeValues.mid * 10) / 10}
        size='md'
        title={'GainMid '}
        text={`${((eqThreeValues.mid * 10) / 10).toFixed(1)} dB`}
      />

      <KnobControl
        handleKnobChange={(valueChange) => handleTrackEQ(valueChange, 'low')}
        handleDoupleClick={() => resetTrackEQ('low')}
        maxValue={eqThreeVolumeLimits.max}
        minValue={eqThreeVolumeLimits.min}
        value={(eqThreeValues.low * 10) / 10}
        size='md'
        title={'GainLow'}
        text={`${((eqThreeValues.low * 10) / 10).toFixed(1)} dB`}
      />
    </Card>
  );
};
