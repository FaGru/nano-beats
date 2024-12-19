'use client';

import { DJPlayer } from './player/player.component';
import { useDJStore } from './useDJStore';
import { Explorer } from './explorer';
import { Mixer } from './mixer/mixer.component';
import { Waveform } from './waveform/waveform.component';

interface DJProps {}

export const DJ: React.FC<DJProps> = () => {
  const djDecks = useDJStore((state) => state.djDecks);

  if (!djDecks.length || djDecks.length < 2) {
    return;
  }

  return (
    <div className='  w-full max-w-[1024px] flex flex-col justify-center items-center rounded-md p-2 gap-1 text-xl '>
      <div className='divide-y-2 divide-dotted bg-background p-1 rounded-md w-full'>
        <Waveform djDeck={djDecks[0]} />
        <Waveform djDeck={djDecks[1]} />
      </div>
      <div className='flex w-full justify-between'>
        <DJPlayer djDeck={djDecks[0]} />
        <Mixer djDecks={djDecks} />
        <DJPlayer djDeck={djDecks[1]} />
      </div>
      <Explorer />
    </div>
  );
};
