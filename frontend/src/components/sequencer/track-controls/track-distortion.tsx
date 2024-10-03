import { Card } from '@/components/ui/card';
import { TTrack } from '../sequencer.types';
import { useSequencerStore } from '../useSequencerStore';
import { KnobControl } from '@/components/shared/knob-control';
import {
  distortionDefault,
  distortionDryWetDefault,
  distortionDryWetLimits,
  distortionLimits
} from '../sequencer.constants';
import { EffectHeader } from './track-effect-header';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface TrackDistortionProps {
  selectedTrack: TTrack;
}

export const TrackDistortion: React.FC<TrackDistortionProps> = ({ selectedTrack }) => {
  const effectType = 'distortion';
  const updateTrack = useSequencerStore((state) => state.updateTrack);

  const overSamplingTypes = ['none', '2x', '4x'];

  console.log(selectedTrack.effects.distortion);

  const handleDryWetKnob = (valueChange: number) => {
    let newDryWet = selectedTrack.effects.distortion.wet.value + valueChange / 100;
    if (newDryWet < distortionDryWetLimits.min) {
      newDryWet = distortionDryWetLimits.min;
    } else if (newDryWet > distortionDryWetLimits.max) {
      newDryWet = distortionDryWetLimits.max;
    }
    selectedTrack.effects.distortion.wet.value = Number(((newDryWet * 100) / 100).toFixed(2));
    updateTrack(selectedTrack);
  };
  const resetDryWet = () => {
    selectedTrack.effects.distortion.wet.value = distortionDryWetDefault;
    updateTrack(selectedTrack);
  };

  const handleDistortionKnob = (valueChange: number) => {
    let newDryWet = selectedTrack.effects.distortion.distortion + valueChange / 100;
    if (newDryWet < distortionDryWetLimits.min) {
      newDryWet = distortionDryWetLimits.min;
    } else if (newDryWet > distortionDryWetLimits.max) {
      newDryWet = distortionDryWetLimits.max;
    }
    selectedTrack.effects.distortion.distortion = Number(newDryWet.toFixed(2));
    updateTrack(selectedTrack);
  };
  const resetDistortion = () => {
    selectedTrack.effects.distortion.distortion = distortionDefault;
    updateTrack(selectedTrack);
  };

  const setOverSampling = (newValue: 'none' | '2x' | '4x') => {
    selectedTrack.effects.distortion.oversample = newValue;
    updateTrack(selectedTrack);
  };

  return (
    <Card className={`${!selectedTrack.connectedEffects.includes(effectType) ? 'opacity-50' : ''}`}>
      <EffectHeader selectedTrack={selectedTrack} effectType={effectType} effectName='Distortion' />
      <div className={`flex gap-4  px-6 mt-1`}>
        <KnobControl
          handleKnobChange={handleDistortionKnob}
          handleDoupleClick={resetDistortion}
          minValue={distortionLimits.min}
          maxValue={distortionLimits.max}
          value={selectedTrack.effects.distortion.distortion}
          size='sm'
          title='Drive'
          text={selectedTrack.effects.distortion.distortion.toFixed(2)}
        />
        <KnobControl
          handleKnobChange={handleDryWetKnob}
          handleDoupleClick={resetDryWet}
          minValue={distortionDryWetLimits.min}
          maxValue={distortionDryWetLimits.max}
          value={selectedTrack.effects.distortion.wet.value}
          size='sm'
          title='Dry / Wet'
          text={`${(selectedTrack.effects.distortion.wet.value * 100).toFixed(0)} %`}
        />
      </div>
      <Separator className='py-0.125 bg-background my-0.5' />
      <div className='flex flex-col items-center'>
        <div>
          <p className='text-xxs '>Oversampling</p>
          <div className='flex  gap-2'>
            {overSamplingTypes.map((type) => (
              <Button
                size='xxs'
                className='text-xxs w-8 p-0 border-0'
                key={type}
                variant={
                  selectedTrack.effects.distortion.oversample === type ? 'default' : 'outline'
                }
                onClick={() => setOverSampling(type as 'none' | '2x' | '4x')}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
