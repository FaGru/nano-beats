import { Card } from '@/components/ui/card';
import { TTrack } from '../sequencer.types';
import { Power } from 'lucide-react';
import { useSequencerStore } from '../useSequencerStore';
import { KnobControl } from '@/components/shared/knob-control';
import {
  reverbDecayDefault,
  reverbDecayLimits,
  reverbDryWetDefault,
  reverbDryWetLimits,
  reverbPreDelayDefault,
  reverbPreDelayLimits
} from '../sequencer.constants';
import * as Tone from 'tone';

interface TrackReverbProps {
  selectedTrack: TTrack;
}

export const TrackReverb: React.FC<TrackReverbProps> = ({ selectedTrack }) => {
  const toggleEffectPower = useSequencerStore((state) => state.toggleEffectPower);
  const updateTrack = useSequencerStore((state) => state.updateTrack);

  console.log(selectedTrack.effects.reverb);

  const handleDecayKnob = (valueChange: any) => {
    let newDelayTime = Tone.Time(selectedTrack.effects.reverb.decay).toSeconds() + valueChange / 10;
    if (newDelayTime < reverbDecayLimits.min) {
      newDelayTime = reverbDecayLimits.min;
    } else if (newDelayTime > reverbDecayLimits.max) {
      newDelayTime = reverbDecayLimits.max;
    }
    selectedTrack.effects.reverb.decay = ((newDelayTime * 100) / 100).toFixed(2);
    updateTrack(selectedTrack);
  };
  const resetDecay = () => {
    selectedTrack.effects.reverb.decay = reverbDecayDefault;
    updateTrack(selectedTrack);
  };
  const handlePreDelayKnob = (valueChange: any) => {
    let newDelayTime =
      Tone.Time(selectedTrack.effects.reverb.preDelay).toSeconds() + valueChange / 1000;
    if (newDelayTime < reverbPreDelayLimits.min) {
      newDelayTime = reverbPreDelayLimits.min;
    } else if (newDelayTime > reverbPreDelayLimits.max) {
      newDelayTime = reverbPreDelayLimits.max;
    }
    selectedTrack.effects.reverb.preDelay = ((newDelayTime * 100) / 100).toFixed(4);
    updateTrack(selectedTrack);
  };
  const resetPreDelay = () => {
    selectedTrack.effects.reverb.preDelay = reverbPreDelayDefault;
    updateTrack(selectedTrack);
  };

  const handleDryWetKnob = (valueChange: any) => {
    let newDryWet = selectedTrack.effects.reverb.wet.value + valueChange / 100;
    if (newDryWet < reverbDryWetLimits.min) {
      newDryWet = reverbDryWetLimits.min;
    } else if (newDryWet > reverbDryWetLimits.max) {
      newDryWet = reverbDryWetLimits.max;
    }
    selectedTrack.effects.reverb.wet.value = Number(((newDryWet * 100) / 100).toFixed(2));
    updateTrack(selectedTrack);
  };
  const resetDryWet = () => {
    selectedTrack.effects.reverb.wet.value = reverbDryWetDefault;
    updateTrack(selectedTrack);
  };

  return (
    <Card
      className={`py-1 pt-2 px-6 flex gap-4 relative ${!selectedTrack.connectedEffects.includes('reverb') ? 'opacity-50' : ''}`}
    >
      <Power
        className={`absolute left-0 top-0 w-4 h-4 ${selectedTrack.connectedEffects.includes('reverb') ? 'bg-primary' : ''} border rounded p-0.5 cursor-pointer`}
        onClick={() => toggleEffectPower(selectedTrack.id, 'reverb')}
      />
      <KnobControl
        handleKnobChange={handlePreDelayKnob}
        handleDoupleClick={resetPreDelay}
        minValue={reverbPreDelayLimits.min}
        maxValue={reverbPreDelayLimits.max}
        value={Number(selectedTrack.effects.reverb.preDelay)}
        size='md'
        title='Predelay'
        text={`${Number(selectedTrack.effects.reverb.preDelay) * 1000} ms`}
      />
      <KnobControl
        handleKnobChange={handleDecayKnob}
        handleDoupleClick={resetDecay}
        minValue={reverbDecayLimits.min}
        maxValue={reverbDecayLimits.max}
        value={Number(selectedTrack.effects.reverb.decay)}
        size='md'
        title='Decay Time'
        text={
          Number(selectedTrack.effects.reverb.decay) >= 1
            ? `${selectedTrack.effects.reverb.decay} s`
            : `${Number(selectedTrack.effects.reverb.decay) * 1000} ms`
        }
      />
      <KnobControl
        handleKnobChange={handleDryWetKnob}
        handleDoupleClick={resetDryWet}
        minValue={reverbDryWetLimits.min}
        maxValue={reverbDryWetLimits.max}
        value={selectedTrack.effects.reverb.wet.value}
        size='md'
        title='Dry / Wet'
        text={`${(selectedTrack.effects.reverb.wet.value * 100).toFixed(0)} %`}
      />
    </Card>
  );
};
