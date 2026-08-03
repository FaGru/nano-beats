import { useEffect, useState } from 'react';
import { useDJStore } from '../useDJStore';
import { crossFaderLimits } from '../dj.constants';
import { FaderSlider } from '@/components/shared/fader-slider';

interface MixerCrossfaderProps {}

export const MixerCrossfader: React.FC<MixerCrossfaderProps> = () => {
  const updateDJMixer = useDJStore((state) => state.updateDJMixer);
  const djMixer = useDJStore((state) => state.djMixer);

  const [fade, setFade] = useState(djMixer.crossFader.fade.value);

  const handleCrossfader = (position: number) => {
    if (position < crossFaderLimits.min) {
      djMixer.crossFader.fade.value = crossFaderLimits.min;
    } else if (position > crossFaderLimits.max) {
      djMixer.crossFader.fade.value = crossFaderLimits.max;
    } else {
      djMixer.crossFader.fade.value = position;
    }
    updateDJMixer(djMixer);
    setFade(position);
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      const oldPosition = useDJStore.getState().djMixer.crossFader.fade.value;
      handleCrossfader(oldPosition - 0.05);
    }
    if (event.key === 'ArrowRight') {
      const oldPosition = useDJStore.getState().djMixer.crossFader.fade.value;
      handleCrossfader(oldPosition + 0.05);
    }
  };
  const handleKeyUp = (event: KeyboardEvent) => {};
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [djMixer]);

  return (
    <div className='mb-2'>
      <FaderSlider
        handleChange={handleCrossfader}
        handleDoupleClick={() => null}
        value={djMixer.crossFader.fade.value}
        minValue={crossFaderLimits.min}
        maxValue={crossFaderLimits.max}
        size='lg'
        step={0.01}
      />
    </div>
  );
};
