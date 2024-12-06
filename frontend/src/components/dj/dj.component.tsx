'use client';

import { DJPlayer } from './dj-player';
import { useDJStore } from './useDJStore';
import { Explorer } from './explorer';
import { Mixer } from './mixer/mixer.component';

interface DJProps {}

export const DJ: React.FC<DJProps> = () => {
  const djDecks = useDJStore((state) => state.djDecks);

  if (!djDecks.length || djDecks.length < 2) {
    return;
  }

  return (
    <div className=' h-[90vh] w-full flex flex-col justify-center items-center rounded-md p-2 gap-1 text-xl '>
      <div className='flex gap-2'>
        <DJPlayer djDeck={djDecks[0]} />
        <Mixer djDecks={djDecks} />
        <DJPlayer djDeck={djDecks[1]} />
      </div>

      <Explorer />
    </div>
  );
};
