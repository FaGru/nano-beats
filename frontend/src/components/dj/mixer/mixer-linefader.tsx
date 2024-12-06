import { Fader } from '@/components/shared/fader';
import { useDJStore } from '../useDJStore';
import { TDJDeck } from '../dj.types';
import { playerVolumeLimits } from '../dj.constants';

interface MixerLineFaderProps {
  djDeck: TDJDeck;
}

export const MixerLineFader: React.FC<MixerLineFaderProps> = ({ djDeck }) => {
  const updateDJDeck = useDJStore((state) => state.updateDJDeck);

  const handleFader = (updateValue: number) => {
    const currentVolume =
      djDeck.player.volume.value === -Infinity
        ? playerVolumeLimits.min
        : djDeck.player.volume.value;

    let newValue = currentVolume + updateValue / 5;
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
    <Fader
      handleKnobChange={handleFader}
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
    />
  );
};
