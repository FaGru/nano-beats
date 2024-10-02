import { Card } from '@/components/ui/card';
import { TTrack } from '../sequencer.types';
import { Power } from 'lucide-react';
import { useSequencerStore } from '../useSequencerStore';
import { KnobControl } from '@/components/shared/knob-control';
import {
  delayDelayTimeDefault,
  delayDelayTimeLimits,
  delayDryWetDefault,
  delayDryWetLimits,
  delayFeedbackDefault,
  delayFeedbackLimits
} from '../sequencer.constants';
import * as Tone from 'tone';
import { EffectHeader } from './track-effect-header';

interface TrackDelayProps {
  selectedTrack: TTrack;
}

export const TrackDelay: React.FC<TrackDelayProps> = ({ selectedTrack }) => {
  const toggleEffectPower = useSequencerStore((state) => state.toggleEffectPower);
  const updateTrack = useSequencerStore((state) => state.updateTrack);

  const handleDelayTimeKnob = (valueChange: number) => {
    let newDelayTime =
      Tone.Time(selectedTrack.effects.delay.delayTime.value).toSeconds() + valueChange / 100;
    if (newDelayTime < delayDelayTimeLimits.min) {
      newDelayTime = delayDelayTimeLimits.min;
    } else if (newDelayTime > delayDelayTimeLimits.max) {
      newDelayTime = delayDelayTimeLimits.max;
    }
    selectedTrack.effects.delay.delayTime.value = ((newDelayTime * 100) / 100).toFixed(2);
    updateTrack(selectedTrack);
  };
  const resetDelayTime = () => {
    selectedTrack.effects.delay.delayTime.value = delayDelayTimeDefault;
    updateTrack(selectedTrack);
  };

  const handleDryWetKnob = (valueChange: number) => {
    let newDryWet = selectedTrack.effects.delay.wet.value + valueChange / 100;
    if (newDryWet < delayDryWetLimits.min) {
      newDryWet = delayDryWetLimits.min;
    } else if (newDryWet > delayDryWetLimits.max) {
      newDryWet = delayDryWetLimits.max;
    }
    selectedTrack.effects.delay.wet.value = Number(((newDryWet * 100) / 100).toFixed(2));
    updateTrack(selectedTrack);
  };
  const resetDryWet = () => {
    selectedTrack.effects.delay.wet.value = delayDryWetDefault;
    updateTrack(selectedTrack);
  };

  const handleFeedbackKnob = (valueChange: number) => {
    let newFeedback = selectedTrack.effects.delay.feedback.value + valueChange / 100;
    if (newFeedback < delayFeedbackLimits.min) {
      newFeedback = delayFeedbackLimits.min;
    } else if (newFeedback > delayFeedbackLimits.max) {
      newFeedback = delayFeedbackLimits.max;
    }
    selectedTrack.effects.delay.feedback.value = Number(((newFeedback * 100) / 100).toFixed(2));
    updateTrack(selectedTrack);
  };
  const resetFeedback = () => {
    selectedTrack.effects.delay.feedback.value = delayFeedbackDefault;
    updateTrack(selectedTrack);
  };

  return (
    <Card className={`${!selectedTrack.connectedEffects.includes('delay') ? 'opacity-50' : ''}`}>
      <EffectHeader selectedTrack={selectedTrack} effectType='delay' effectName='Delay' />
      <div className={`flex gap-4 py-1 px-4 mt-4`}>
        <KnobControl
          handleKnobChange={handleDelayTimeKnob}
          handleDoupleClick={resetDelayTime}
          minValue={delayDelayTimeLimits.min}
          maxValue={delayDelayTimeLimits.max}
          value={Number(selectedTrack.effects.delay.delayTime.value)}
          size='md'
          title='Delay Time'
          text={`${Number(selectedTrack.effects.delay.delayTime.value) * 100} ms`}
        />
        <KnobControl
          handleKnobChange={handleFeedbackKnob}
          handleDoupleClick={resetFeedback}
          minValue={delayFeedbackLimits.min}
          maxValue={delayFeedbackLimits.max}
          value={selectedTrack.effects.delay.feedback.value}
          size='md'
          title='Feedback'
          text={`${(selectedTrack.effects.delay.feedback.value * 100).toFixed(0)} %`}
        />
        <KnobControl
          handleKnobChange={handleDryWetKnob}
          handleDoupleClick={resetDryWet}
          minValue={delayDryWetLimits.min}
          maxValue={delayDryWetLimits.max}
          value={selectedTrack.effects.delay.wet.value}
          size='md'
          title='Dry / Wet'
          text={`${(selectedTrack.effects.delay.wet.value * 100).toFixed(0)} %`}
        />
      </div>
    </Card>
  );
};
