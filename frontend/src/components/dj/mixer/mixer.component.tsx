import { TDJDeck, TDJMixer } from '../dj.types';
import { MixerCrossfader } from './mixer-crossfader';
import { MixerEQ } from './mixer-eq';

interface DJMixerProps {
  djDecks: TDJDeck[];
}

export const Mixer: React.FC<DJMixerProps> = ({ djDecks }) => {
  return (
    <div className='bg-background  rounded-xl p-4 flex flex-col justify-between w-48'>
      <div className='flex justify-between'>
        <MixerEQ djDeck={djDecks[0]} />
        <MixerEQ djDeck={djDecks[1]} />
      </div>
      <div>
        <MixerCrossfader />
      </div>
    </div>
  );
};
