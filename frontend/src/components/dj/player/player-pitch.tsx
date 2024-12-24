import { TDJDeck } from '../dj.types';
import { pitchDefault, pitchLimits } from '../dj.constants';
import { useDJStore } from '../useDJStore';
import { FaderSlider } from '@/components/shared/fader-slider';

interface PitchFaderProps {
  djDeck: TDJDeck;
}

export const PitchFader: React.FC<PitchFaderProps> = ({ djDeck }) => {
  const updateDJDeck = useDJStore((state) => state.updateDJDeck);

  const handleFader = (newPitch: number) => {
    djDeck.player.playbackRate = newPitch;
    djDeck.wavesurfer?.setPlaybackRate(newPitch);
    updateDJDeck(djDeck);
  };

  const handleReset = () => {
    djDeck.player.playbackRate = pitchDefault;
    updateDJDeck(djDeck);
  };

  return (
    <FaderSlider
      handleChange={handleFader}
      handleDoupleClick={handleReset}
      value={djDeck.player.playbackRate}
      minValue={pitchLimits.min}
      maxValue={pitchLimits.max}
      size='lg'
      orientation='vertical'
      step={0.001}
    />
  );
};
