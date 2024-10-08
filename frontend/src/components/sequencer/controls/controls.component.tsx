'use client';
import { useMouseMove } from '@/lib/hooks/useMouseMove';
import { useSequencerStore } from '../useSequencerStore';
import { stepsLimits } from '../sequencer.constants';
import { TPattern } from '../sequencer.types';
import { Button } from '@/components/ui/button';
import { Pause, Play } from 'lucide-react';

interface ControlProps {}

export const Controls: React.FC<ControlProps> = () => {
  const startStopSequencer = useSequencerStore((state) => state.startStopSequencer);
  const isPlaying = useSequencerStore((state) => state.isPlaying);
  const sequencerBpm = useSequencerStore((state) => state.sequencerBpm);
  const setSequencerBpm = useSequencerStore((state) => state.setSequencerBpm);
  const updateStepLength = useSequencerStore((state) => state.updateStepLength);

  const mode = useSequencerStore((state) => state.mode);
  const setMode = useSequencerStore((state) => state.setMode);

  const playSong = useSequencerStore((state) => state.playSong);
  const sequence = useSequencerStore((state) => state.sequence);

  const { handleMouseDown, handleMouseUp } = useMouseMove('y');

  const handleStepLength = (newLength: number) => {
    if (newLength <= stepsLimits.max && newLength >= stepsLimits.min)
      updateStepLength(Array.from({ length: Number(newLength) }, (_, i) => i));
  };

  return (
    <div className='flex bg-background border-neutral-600 border p-1 rounded-t-md w-full h-12 gap-4 items-center px-2'>
      <Button
        onClick={() => (mode === 'pattern' ? startStopSequencer() : playSong())}
        size='xs'
        className='w-16'
      >
        {isPlaying ? <Pause className='h-4 w-4 mr-1' /> : <Play className='h-4 w-4 mr-1' />}
        {isPlaying ? 'Stop' : 'Play'}
      </Button>
      <div
        className=''
        onMouseDown={(e) => handleMouseDown(e, setSequencerBpm)}
        onTouchStart={(e) => handleMouseDown(e, setSequencerBpm)}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}
      >
        <p className='relative  bg-secondary h-6 w-16 rounded-md text-center cursor-pointer border'>
          <span className='absolute text-[0.50rem] -top-[0.425rem] left-1.5 z-20 '>bpm</span>
          {(Math.round(sequencerBpm * 10) / 10).toFixed(1)}
        </p>
      </div>

      <div className='rounded-md h-6 border bg-secondary flex items-center'>
        <Button
          variant='ghost'
          size='xs'
          className='w-4 '
          onClick={() => handleStepLength(sequence ? sequence.events.length - 4 : 0)}
        >
          -
        </Button>
        <p className='w-8 h-6 text-center relative'>
          <span className='absolute text-[0.50rem] -top-1.5 -left-2.5 z-20 '>steps</span>
          {sequence?.events.length}
        </p>
        <Button
          variant='ghost'
          size='xs'
          className='w-4'
          onClick={() => handleStepLength(sequence ? sequence.events.length + 4 : 0)}
        >
          +
        </Button>
      </div>

      <div>
        <Button
          variant='secondary'
          size='xs'
          className='relative w-20'
          onClick={() => setMode(mode === 'pattern' ? 'song' : 'pattern')}
        >
          <span className='absolute text-[0.50rem] -top-2.5 left-2 z-20'>mode</span>
          {mode}
        </Button>
      </div>
    </div>
  );
};
