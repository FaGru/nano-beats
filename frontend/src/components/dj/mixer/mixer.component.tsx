import { TDJDeck } from '../dj.types';
import { MixerCrossfader } from './mixer-crossfader';
import { MixerEQ } from './mixer-eq';
import { MixerGain } from './mixer-gain';
import { MixerLineFader } from './mixer-linefader';

interface DJMixerProps {
  djDecks: TDJDeck[];
}

export const Mixer: React.FC<DJMixerProps> = ({ djDecks }) => {
  return (
    <div className='bg-background  rounded-xl p-2 flex flex-col justify-between w-72'>
      <div className='mb-2'>
        <MixerGain />
      </div>
      <div className='flex justify-evenly gap-4'>
        <div className='flex gap-4 items-center'>
          <MixerLineFader djDeck={djDecks[0]} />
          <MixerEQ djDeck={djDecks[0]} />
        </div>
        <div className='flex gap-4 items-center'>
          <MixerEQ djDeck={djDecks[1]} />
          <MixerLineFader djDeck={djDecks[1]} />
        </div>
      </div>
      <div className='mt-8'>
        <MixerCrossfader />
      </div>
    </div>
  );
};
