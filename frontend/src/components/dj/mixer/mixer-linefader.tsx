import { useDJStore } from '../useDJStore';
import { TDJDeck } from '../dj.types';
import { playerVolumeLimits } from '../dj.constants';
import { FaderSlider } from '@/components/shared/fader-slider';

interface MixerLineFaderProps {
  djDeck: TDJDeck;
}

export const MixerLineFader: React.FC<MixerLineFaderProps> = ({ djDeck }) => {
  const updateDJDeck = useDJStore((state) => state.updateDJDeck);

  const handleFader = (newValue: number) => {
    if (newValue < playerVolumeLimits.min) {
      newValue = playerVolumeLimits.min;
    } else if (newValue > playerVolumeLimits.max) {
      newValue = playerVolumeLimits.max;
    }
    djDeck.player.volume.value = newValue;
    if (newValue < playerVolumeLimits.min + 0.1) {
      djDeck.player.mute = true;
    }
    updateDJDeck(djDeck);
  };

  return (
    <FaderSlider
      handleChange={handleFader}
      handleDoupleClick={() => null}
      value={
        djDeck.player.volume.value === -Infinity
          ? playerVolumeLimits.min
          : djDeck.player.volume.value
      }
      minValue={playerVolumeLimits.min}
      maxValue={playerVolumeLimits.max}
      size='lg'
      orientation='vertical'
      step={0.01}
    />
  );
};
