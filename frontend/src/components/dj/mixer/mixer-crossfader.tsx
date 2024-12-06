import { useState } from 'react';
import { useDJStore } from '../useDJStore';
import { Fader } from '@/components/shared/fader';
import { crossFaderLimits } from '../dj.constants';

interface MixerCrossfaderProps {}

export const MixerCrossfader: React.FC<MixerCrossfaderProps> = () => {
  const updateDJMixer = useDJStore((state) => state.updateDJMixer);
  const djMixer = useDJStore((state) => state.djMixer);

  const [fade, setFade] = useState(djMixer.crossFader.fade.value);

  const handleCrossfader = (updateValue: number) => {
    let newValue = djMixer.crossFader.fade.value + updateValue / 200;
    if (newValue < crossFaderLimits.min) {
      newValue = crossFaderLimits.min;
    } else if (newValue > crossFaderLimits.max) {
      newValue = crossFaderLimits.max;
    }
    djMixer.crossFader.fade.value = newValue;
    updateDJMixer(djMixer);
    setFade(newValue);
  };

  return (
    <div className='mb-2'>
      <Fader
        handleKnobChange={handleCrossfader}
        handleDoupleClick={() => null}
        value={djMixer.crossFader.fade.value}
        minValue={0}
        maxValue={1}
        width='w-28'
      />
    </div>
  );
};
