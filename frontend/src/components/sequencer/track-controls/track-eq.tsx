import { Power } from 'lucide-react';
import { TTrack } from '../sequencer.types';
import { useSequencerStore } from '../useSequencerStore';
import {
  eqThreeDefaultVolume,
  eqThreeHighFrequencyDefault,
  eqThreeHighFrequencyLimits,
  eqThreeLowFrequencyDefault,
  eqThreeLowFrequencyLimits,
  eqThreeVolumeLimits
} from '../sequencer.constants';
import { Card } from '@/components/ui/card';
import { KnobControl } from '@/components/shared/knob-control';
import { EffectHeader } from './track-effect-header';

interface TrackEQProps {
  selectedTrack: TTrack;
}

export const TrackEQ: React.FC<TrackEQProps> = ({ selectedTrack }) => {
  const eqThreeValues = {
    high: selectedTrack?.effects?.eqThree.high.value,
    mid: selectedTrack?.effects?.eqThree.mid.value,
    low: selectedTrack?.effects?.eqThree.low.value,
    highFrequency: selectedTrack?.effects?.eqThree.highFrequency.value as number,
    lowFrequency: selectedTrack?.effects?.eqThree.lowFrequency.value as number
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

  const handleTrackEQHighFrequency = (updateValue: number, type: string | undefined) => {
    if (type && type === 'highFrequency') {
      let currentFrequency = Number(selectedTrack.effects.eqThree.highFrequency.value);
      let newFrequency = currentFrequency * Math.pow(2, updateValue / 20);

      if (newFrequency < eqThreeHighFrequencyLimits.min) {
        newFrequency = eqThreeHighFrequencyLimits.min;
      } else if (newFrequency > eqThreeHighFrequencyLimits.max) {
        newFrequency = eqThreeHighFrequencyLimits.max;
      }

      selectedTrack.effects.eqThree.highFrequency.value = newFrequency;
      updateTrack(selectedTrack);
    }
  };

  const handleTrackEQLowFrequency = (updateValue: number, type: string | undefined) => {
    if (type && type === 'lowFrequency') {
      let currentFrequency = Number(selectedTrack.effects.eqThree.lowFrequency.value);
      let newFrequency = currentFrequency * Math.pow(2, updateValue / 20);

      if (newFrequency < eqThreeLowFrequencyLimits.min) {
        newFrequency = eqThreeLowFrequencyLimits.min;
      } else if (newFrequency > eqThreeLowFrequencyLimits.max) {
        newFrequency = eqThreeLowFrequencyLimits.max;
      }

      selectedTrack.effects.eqThree.lowFrequency.value = newFrequency;
      updateTrack(selectedTrack);
    }
  };

  const resetTrackEQ = (type: 'high' | 'mid' | 'low') => {
    selectedTrack.effects.eqThree[type].value = eqThreeDefaultVolume;
    updateTrack(selectedTrack);
  };
  const resetTrackEQFrequency = (type: 'highFrequency' | 'lowFrequency') => {
    selectedTrack.effects.eqThree[type].value =
      type === 'highFrequency' ? eqThreeHighFrequencyDefault : eqThreeLowFrequencyDefault;
    updateTrack(selectedTrack);
  };

  const converToFrequenceText = (freq: number) => {
    return freq >= 1000 ? `${(freq / 1000).toFixed(2)} kHz` : `${freq.toFixed(0)} Hz`;
  };

  return (
    <Card
      className={`flex flex-col ${!selectedTrack.connectedEffects.includes('eqThree') ? 'opacity-50' : ''}`}
    >
      <EffectHeader selectedTrack={selectedTrack} effectType='eqThree' effectName='EQ Three' />
      <div className={`flex  py-1 px-4 mt-2 flex-grow`}>
        <div className='self-end  w-12'>
          <KnobControl
            handleKnobChange={(valueChange) =>
              handleTrackEQLowFrequency(valueChange, 'lowFrequency')
            }
            handleDoupleClick={() => resetTrackEQFrequency('lowFrequency')}
            maxValue={eqThreeLowFrequencyLimits.max}
            minValue={eqThreeLowFrequencyLimits.min}
            value={eqThreeValues.lowFrequency}
            size='sm'
            title={'FreqLow'}
            text={converToFrequenceText(eqThreeValues.lowFrequency)}
          />
        </div>
        <div className=' w-14'>
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
        </div>
        <div className=' w-14'>
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
        </div>

        <div className=' w-14'>
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
        </div>
        <div className='self-end w-12'>
          <KnobControl
            handleKnobChange={(valueChange) =>
              handleTrackEQHighFrequency(valueChange, 'highFrequency')
            }
            handleDoupleClick={() => resetTrackEQFrequency('highFrequency')}
            maxValue={eqThreeHighFrequencyLimits.max}
            minValue={eqThreeHighFrequencyLimits.min}
            value={((eqThreeValues.highFrequency as number) * 10) / 10}
            size='sm'
            title={'FreqHigh'}
            text={converToFrequenceText(eqThreeValues.highFrequency)}
          />
        </div>
      </div>
      <div></div>
    </Card>
  );
};
