'use client';
import { useMouseMove } from '@/hooks/useMouseMove';
import { useSequencerStore } from '../useSequencerStore';
import { stepsLimits } from '../sequencer.constants';
import { TPattern } from '../sequencer.types';

interface ControlProps {
  selectedPattern: TPattern | undefined;
}

export const Controls: React.FC<ControlProps> = ({ selectedPattern }) => {
  const startStopSequencer = useSequencerStore((state) => state.startStopSequencer);
  const isPlaying = useSequencerStore((state) => state.isPlaying);
  const sequencerBpm = useSequencerStore((state) => state.sequencerBpm);
  const setSequencerBpm = useSequencerStore((state) => state.setSequencerBpm);
  const updateStepLength = useSequencerStore((state) => state.updateStepLength);

  const mode = useSequencerStore((state) => state.mode);
  const setMode = useSequencerStore((state) => state.setMode);
  const patterns = useSequencerStore((state) => state.patterns);
  const addPattern = useSequencerStore((state) => state.addPattern);
  const setSelectedPatternId = useSequencerStore((state) => state.setSelectedPatternId);
  const playSong = useSequencerStore((state) => state.playSong);

  const { handleMouseDown, handleMouseUp } = useMouseMove('y');

  const handleStepLength = (newLength: number) => {
    if (newLength <= stepsLimits.max && newLength >= stepsLimits.min)
      updateStepLength(Array.from({ length: Number(newLength) }, (_, i) => i));
  };

  const handlePatternChange = (patternId: string) => {
    if (patternId === 'new') {
      addPattern();
    } else {
      setSelectedPatternId(patternId);
    }
  };

  return (
    <div className='flex bg-neutral-950 border-neutral-600 border p-1 rounded-t-md w-full h-[6vh] gap-4 items-center px-2'>
      <button
        type='button'
        onClick={() => (mode === 'pattern' ? startStopSequencer() : playSong())}
        className={` w-12 rounded ${!isPlaying ? 'bg-green-500 hover:bg-green-600' : 'bg-red-900 hover:bg-red-950'} `}
      >
        {isPlaying ? 'Stop' : 'Play'}
      </button>
      <div
        className='text-md relative  bg-neutral-700 w-16 rounded text-center cursor-pointer border'
        onMouseDown={(e) => handleMouseDown(e, setSequencerBpm)}
        onTouchStart={(e) => handleMouseDown(e, setSequencerBpm)}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}
      >
        <p className='absolute text-[0.50rem] -top-[0.11rem] left-1.5 z-20 align-top bg-neutral-700 leading-[0.15rem] px-1'>
          bpm
        </p>
        <p>{(Math.round(sequencerBpm * 10) / 10).toFixed(1)}</p>
      </div>

      <div className='rounded border bg-neutral-700 flex'>
        <button
          type='button'
          className='w-4'
          onClick={() =>
            handleStepLength(
              selectedPattern?.sequence ? selectedPattern.sequence.events.length - 4 : 0
            )
          }
        >
          -
        </button>

        <p className='w-12 text-center  border-x relative'>
          <span className='absolute text-[0.50rem] -top-[0.11rem] -left-0 z-20 align-top bg-neutral-700 leading-[0.15rem] px-0.5'>
            steps
          </span>
          {selectedPattern?.sequence?.events.length}
        </p>

        <button
          type='button'
          className='w-4'
          onClick={() =>
            handleStepLength(
              selectedPattern?.sequence ? selectedPattern.sequence.events.length + 4 : 0
            )
          }
        >
          +
        </button>
      </div>

      <div className='relative  bg-neutral-700 w-20 rounded text-center  cursor-pointer border'>
        <p className='absolute text-[0.50rem] -top-[0.11rem] left-1.5 z-20 align-top bg-neutral-700 leading-[0.15rem] px-1'>
          mode
        </p>
        <button onClick={() => setMode(mode === 'pattern' ? 'song' : 'pattern')}>{mode}</button>
      </div>
      <div className='relative  bg-neutral-700  rounded text-center  cursor-pointer border'>
        <p className='absolute text-[0.50rem] -top-[0.11rem] left-1.5 z-20 align-top bg-neutral-700 leading-[0.15rem] px-1'>
          pattern
        </p>
        <label>
          <select
            className='bg-neutral-700 '
            value={selectedPattern?.id}
            onChange={(e) => handlePatternChange(e.target.value)}
          >
            {patterns.map((pattern) => (
              <option value={pattern.id} key={pattern.name}>
                {pattern.name}
              </option>
            ))}
            <option value='new'>+ NEW</option>
          </select>
        </label>
      </div>
    </div>
  );
};
