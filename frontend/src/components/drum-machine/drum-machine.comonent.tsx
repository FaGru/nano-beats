'use client';
import React from 'react';
import { DrumPad } from './drum-pad';
import { useToneStore } from '../../lib/state-managment/useToneStore';

interface DrumMachineProps {}

export const DrumMachine: React.FC<DrumMachineProps> = () => {
  const tone = useToneStore((state) => state.tone);
  const initTone = useToneStore((state) => state.initTone);
  if (!tone) initTone();

  const drumPadConfig = useToneStore((state) => state.drumPadConfig);

  return (
    <div className='flex flex-col items-center justify-center rounded-xl bg-gray-900 text-white p-2'>
      <div className='flex h-16 space-x-4 mb-2'></div>

      <div className='grid grid-cols-4 gap-1 mb-16'>
        {drumPadConfig.map((padConfig, index) => (
          <React.Fragment key={index}>
            <DrumPad padConfig={padConfig} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
