import { Card } from '@/components/ui/card';
import { TTrack } from '../sequencer.types';
import { Power } from 'lucide-react';
import { useSequencerStore } from '../useSequencerStore';
import { KnobControl } from '@/components/shared/knob-control';
import {
  delayTimeDefault,
  delayTimeLimits,
  dryWetDefault,
  dryWetLimits
} from '../sequencer.constants';
import * as Tone from 'tone';

interface TrackDelayProps {
  selectedTrack: TTrack;
}

export const TrackDelay: React.FC<TrackDelayProps> = ({ selectedTrack }) => {
  const toggleEffectPower = useSequencerStore((state) => state.toggleEffectPower);
  const updateTrack = useSequencerStore((state) => state.updateTrack);

  const handleDelayTimeKnob = (valueChange: any) => {
    let newDelayTime =
      Tone.Time(selectedTrack.effects.delay.delayTime.value).toSeconds() + valueChange / 100;
    if (newDelayTime < delayTimeLimits.min) {
      newDelayTime = delayTimeLimits.min;
    } else if (newDelayTime > delayTimeLimits.max) {
      newDelayTime = delayTimeLimits.max;
    }
    selectedTrack.effects.delay.delayTime.value = ((newDelayTime * 100) / 100).toFixed(2);
    console.log(valueChange);
    updateTrack(selectedTrack);
  };
  const resetDelayTime = () => {
    selectedTrack.effects.delay.delayTime.value = delayTimeDefault;
    updateTrack(selectedTrack);
  };

  const handleDryWetKnob = (valueChange: any) => {
    let newDelayTime = selectedTrack.effects.delay.wet.value + valueChange / 100;
    if (newDelayTime < dryWetLimits.min) {
      newDelayTime = dryWetLimits.min;
    } else if (newDelayTime > dryWetLimits.max) {
      newDelayTime = dryWetLimits.max;
    }
    selectedTrack.effects.delay.wet.value = Number(((newDelayTime * 100) / 100).toFixed(2));
    updateTrack(selectedTrack);
  };
  const resetDryWet = () => {
    selectedTrack.effects.delay.wet.value = dryWetDefault;
    updateTrack(selectedTrack);
  };

  return (
    <Card
      className={`py-1 pt-2 px-6 flex gap-2 relative ${!selectedTrack.connectedEffects.includes('delay') ? 'opacity-50' : ''}`}
    >
      <Power
        className={`absolute left-0 top-0 w-4 h-4 ${selectedTrack.connectedEffects.includes('delay') ? 'bg-primary' : ''} border rounded p-0.5 cursor-pointer`}
        onClick={() => toggleEffectPower(selectedTrack.id, 'delay')}
      />
      <KnobControl
        handleKnobChange={handleDelayTimeKnob}
        handleDoupleClick={resetDelayTime}
        minValue={0}
        maxValue={1}
        value={Number(selectedTrack.effects.delay.delayTime.value)}
        size='md'
        title='Delay Time'
        text={`${Number(selectedTrack.effects.delay.delayTime.value)} ms`}
      />
      <KnobControl
        handleKnobChange={handleDryWetKnob}
        handleDoupleClick={resetDryWet}
        minValue={0}
        maxValue={1}
        value={selectedTrack.effects.delay.wet.value}
        size='md'
        title='Dry / Wet'
        text={`${Math.ceil(selectedTrack.effects.delay.wet.value * 100).toFixed(0)} %`}
      />
    </Card>
  );
};
