'use client';
import React, { useState } from 'react';
import { DrumPad } from './drum-pad';
import { useToneStore } from '../../lib/state-managment/useToneStore';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface DrumMachineProps {}

export const DrumMachine: React.FC<DrumMachineProps> = () => {
  const tone = useToneStore((state) => state.tone);
  const initTone = useToneStore((state) => state.initTone);
  if (!tone) initTone();

  const drumPadConfig = useToneStore((state) => state.drumPadConfig);
  const setDrumMachineVolume = useToneStore((state) => state.setDrumMachineVolume);
  const drumMachineVolume = useToneStore((state) => state.drumMachineVolume);
  const [isVolumeTooltipOpen, setIsVolumeTooltipOpen] = useState<boolean>(false);

  return (
    <div className='flex flex-col items-center justify-center rounded-xl bg-gray-900 text-white p-2 shadow-[inset_0_0_8px_2px] shadow-gray-950'>
      <div className='flex  space-x-4 my-4 h-16'></div>
      <div className='grid grid-cols-4 gap-1.5 mb-8'>
        {drumPadConfig.map((padConfig, index) => (
          <React.Fragment key={index}>
            <DrumPad padConfig={padConfig} />
          </React.Fragment>
        ))}
      </div>
      <div className='flex h-16 space-x-4 '>
        <label htmlFor='volume fader one' className='flex flex-col items-center'>
          Volume
          <Tippy
            content={
              <span className='block w-8 text-center'>
                {drumMachineVolume === -18 ? 'mute' : drumMachineVolume.toString()}
              </span>
            }
            visible={isVolumeTooltipOpen}
            placement='right'
            arrow={false}
          >
            <input
              type='range'
              min={-18}
              max={2}
              step={0.1}
              value={drumMachineVolume}
              id='volume fader one'
              name='volume fader one'
              onChange={(event) => setDrumMachineVolume(Number(event.target.value))}
              onMouseDown={() => setIsVolumeTooltipOpen(true)}
              onMouseUp={() => setIsVolumeTooltipOpen(false)}
            />
          </Tippy>
        </label>
      </div>
    </div>
  );
};
