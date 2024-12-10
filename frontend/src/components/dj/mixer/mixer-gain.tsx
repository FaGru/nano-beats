import { KnobControl } from '@/components/shared/knob-control';
import { gainDefault, gainLimits } from '../dj.constants';
import { Separator } from '@/components/ui/separator';
import { use, useState } from 'react';
import { useDJStore } from '../useDJStore';

interface MixerGainProps {}

export const MixerGain: React.FC<MixerGainProps> = () => {
  const djMixer = useDJStore((state) => state.djMixer);
  const updateDJMixer = useDJStore((state) => state.updateDJMixer);
  const [render, setRender] = useState(djMixer.masterGain.gain.value);

  const handleGain = (updateValue: number) => {
    let newValue = djMixer.masterGain.gain.value + updateValue / 200;
    if (newValue < gainLimits.min) {
      newValue = gainLimits.min;
    } else if (newValue > gainLimits.max) {
      newValue = gainLimits.max;
    }
    djMixer.masterGain.gain.value = newValue;
    updateDJMixer(djMixer);
    setRender(newValue);
  };
  const resetGain = () => {
    djMixer.masterGain.gain.value = gainDefault;
    updateDJMixer(djMixer);
    setRender(gainDefault);
  };

  return (
    <div>
      <p className='text-xxs leading-3 text-center'>MASTER</p>
      <KnobControl
        handleKnobChange={handleGain}
        handleDoupleClick={resetGain}
        minValue={gainLimits.min}
        maxValue={gainLimits.max}
        value={djMixer.masterGain.gain.value}
        size='md'
      />
    </div>
  );
};
