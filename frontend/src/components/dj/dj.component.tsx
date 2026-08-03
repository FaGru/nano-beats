'use client';

import { DJPlayer } from './player/player.component';
import { useDJStore } from './useDJStore';
import { Explorer } from './explorer';
import { Mixer } from './mixer/mixer.component';
import { Waveform } from './waveform/waveform.component';

interface DJProps {}

export const DJ: React.FC<DJProps> = () => {
  const djDecks = useDJStore((state) => state.djDecks);
  const djDeckOne = useDJStore((state) => state.djDeckOne);
  const djDeckTwo = useDJStore((state) => state.djDeckTwo);

  // if (!djDecks.length || djDecks.length < 2) {
  //   return;
  // }

  return (
    <div className='  w-full max-w-[1024px] flex flex-col justify-center items-center rounded-md p-2 gap-1 text-xl '>
      <div className='divide-y-2 divide-dotted bg-background p-1 rounded-md w-full'>
        <Waveform djDeck={djDeckOne[0]} />
        <Waveform djDeck={djDeckTwo[0]} />
      </div>
      <div className='flex w-full justify-between'>
        <DJPlayer djDeck={djDeckOne[0]} />
        <Mixer djDecks={[djDeckOne[0], djDeckTwo[0]]} />
        <DJPlayer djDeck={djDeckTwo[0]} />
      </div>
      <Explorer />
    </div>
  );
};
