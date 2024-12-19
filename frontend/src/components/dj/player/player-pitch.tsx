import { Fader } from '@/components/shared/fader';
import { TDJDeck } from '../dj.types';
import { pitchDefault, pitchLimits } from '../dj.constants';
import { useDJStore } from '../useDJStore';

interface PitchFaderProps {
  djDeck: TDJDeck;
}

export const PitchFader: React.FC<PitchFaderProps> = ({ djDeck }) => {
  const updateDJDeck = useDJStore((state) => state.updateDJDeck);
  const handleFader = (updateValue: number) => {
    const currentPitch = djDeck.player.playbackRate;
    let newPitch = currentPitch + updateValue / 2000;
    if (newPitch < pitchLimits.min) {
      newPitch = pitchLimits.min;
    } else if (newPitch > pitchLimits.max) {
      newPitch = pitchLimits.max;
    }
    djDeck.player.playbackRate = newPitch;
    djDeck.wavesurfer?.setPlaybackRate(newPitch);
    updateDJDeck(djDeck);
  };

  const handleReset = () => {
    djDeck.player.playbackRate = pitchDefault;
    updateDJDeck(djDeck);
  };

  return (
    <Fader
      handleKnobChange={handleFader}
      handleDoupleClick={handleReset}
      value={djDeck.player.playbackRate}
      minValue={pitchLimits.min}
      maxValue={pitchLimits.max}
      size='lg'
      orientation='vertical'
    />
  );
};
