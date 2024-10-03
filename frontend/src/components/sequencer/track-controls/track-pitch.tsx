import { Card } from '@/components/ui/card';
import { TTrack } from '../sequencer.types';
import { Power } from 'lucide-react';
import { useSequencerStore } from '../useSequencerStore';
import { KnobControl } from '@/components/shared/knob-control';
import {
  pitchDefault,
  pitchDelayTimeLimits,
  pitchFeedbackLimits,
  pitchLimits,
  pitchWindowSizeDefault,
  pitchWindowSizeLimits
} from '../sequencer.constants';
import { EffectHeader } from './track-effect-header';

interface TrackPitchProps {
  selectedTrack: TTrack;
}

export const TrackPitch: React.FC<TrackPitchProps> = ({ selectedTrack }) => {
  const toggleEffectPower = useSequencerStore((state) => state.toggleEffectPower);
  const updateTrack = useSequencerStore((state) => state.updateTrack);

  const handlePitchKnob = (valueChange: number) => {
    let newPitch = selectedTrack.effects.pitchShift.pitch + valueChange;
    if (newPitch < pitchLimits.min) {
      newPitch = pitchLimits.min;
    } else if (newPitch > pitchLimits.max) {
      newPitch = pitchLimits.max;
    }
    selectedTrack.effects.pitchShift.pitch = Number(((newPitch * 100) / 100).toFixed(0));
    updateTrack(selectedTrack);
  };
  const resetPitch = () => {
    selectedTrack.effects.pitchShift.pitch = pitchDefault;
    updateTrack(selectedTrack);
  };

  const handleWindowSizeKnob = (valueChange: number) => {
    let newPitch = selectedTrack.effects.pitchShift.windowSize + valueChange / 1000;
    if (newPitch < pitchWindowSizeLimits.min) {
      newPitch = pitchWindowSizeLimits.min;
    } else if (newPitch > pitchWindowSizeLimits.max) {
      newPitch = pitchWindowSizeLimits.max;
    }
    selectedTrack.effects.pitchShift.windowSize = Number(((newPitch * 100) / 100).toFixed(3));
    updateTrack(selectedTrack);
  };
  const resetWindowSize = () => {
    selectedTrack.effects.pitchShift.windowSize = pitchWindowSizeDefault;
    updateTrack(selectedTrack);
  };

  const handleDelayTimeKnob = (valueChange: number) => {
    let newPitch = Number(selectedTrack.effects.pitchShift.delayTime.value) + valueChange / 100;
    if (newPitch < pitchDelayTimeLimits.min) {
      newPitch = pitchDelayTimeLimits.min;
    } else if (newPitch > pitchDelayTimeLimits.max) {
      newPitch = pitchDelayTimeLimits.max;
    }
    selectedTrack.effects.pitchShift.delayTime.value = Number(((newPitch * 100) / 100).toFixed(3));
    updateTrack(selectedTrack);
  };
  const resetDelayTime = () => {
    selectedTrack.effects.pitchShift.delayTime.value = 0;
    updateTrack(selectedTrack);
  };

  const handleFeedbackKnob = (valueChange: number) => {
    let newPitch = selectedTrack.effects.pitchShift.feedback.value + valueChange / 100;
    if (newPitch < pitchFeedbackLimits.min) {
      newPitch = pitchFeedbackLimits.min;
    } else if (newPitch > pitchFeedbackLimits.max) {
      newPitch = pitchFeedbackLimits.max;
    }
    selectedTrack.effects.pitchShift.feedback.value = Number(((newPitch * 100) / 100).toFixed(3));
    updateTrack(selectedTrack);
  };
  const resetFeedback = () => {
    selectedTrack.effects.pitchShift.feedback.value = 0;
    updateTrack(selectedTrack);
  };

  return (
    <Card
      className={`${!selectedTrack.connectedEffects.includes('pitchShift') ? 'opacity-50' : ''}`}
    >
      <EffectHeader selectedTrack={selectedTrack} effectType='pitchShift' effectName='Pitch' />
      <div className={`flex gap-2 py-1 px-4 mt-4`}>
        <KnobControl
          handleKnobChange={handlePitchKnob}
          handleDoupleClick={resetPitch}
          minValue={pitchLimits.min}
          maxValue={pitchLimits.max}
          value={selectedTrack.effects.pitchShift.pitch}
          size='md'
          title='Pitch'
          text={`${selectedTrack.effects.pitchShift.pitch.toFixed(0)}`}
        />

        <KnobControl
          handleKnobChange={handleWindowSizeKnob}
          handleDoupleClick={resetWindowSize}
          minValue={pitchWindowSizeLimits.min}
          maxValue={pitchWindowSizeLimits.max}
          value={selectedTrack.effects.pitchShift.windowSize}
          size='md'
          title='Window Size'
          text={`${selectedTrack.effects.pitchShift.windowSize.toFixed(3)}`}
        />
        <div className='mt-2'>
          <KnobControl
            handleKnobChange={handleDelayTimeKnob}
            handleDoupleClick={resetDelayTime}
            minValue={pitchDelayTimeLimits.min}
            maxValue={pitchDelayTimeLimits.max}
            value={Number(selectedTrack.effects.pitchShift.delayTime.value)}
            size='sm'
            title='Delay'
            text={`${(Number(selectedTrack.effects.pitchShift.delayTime.value) * 100).toFixed(0)} ms`}
          />
        </div>
        <div className='mt-2 '>
          <KnobControl
            handleKnobChange={handleFeedbackKnob}
            handleDoupleClick={resetFeedback}
            minValue={pitchFeedbackLimits.min}
            maxValue={pitchFeedbackLimits.max}
            value={selectedTrack.effects.pitchShift.feedback.value}
            size='sm'
            title='Feedback'
            text={`${(selectedTrack.effects.pitchShift.feedback.value * 100).toFixed(0)} %`}
          />{' '}
        </div>
      </div>
    </Card>
  );
};
