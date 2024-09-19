import { useSequencerStore } from './useSequencerStore';

interface ControlProps {}

export const Controls: React.FC<ControlProps> = () => {
  const startStopSequencer = useSequencerStore((state) => state.startStopSequencer);
  const isPlaying = useSequencerStore((state) => state.isPlaying);
  const sequencerBpm = useSequencerStore((state) => state.sequencerBpm);
  const setSequencerBpm = useSequencerStore((state) => state.setSequencerBpm);
  const updateStepLength = useSequencerStore((state) => state.updateStepLength);
  const steps = useSequencerStore((state) => state.steps);

  return (
    <div className='flex bg-gray-950 p-1 rounded w-full h-10 gap-4 items-center px-2'>
      <button
        onClick={startStopSequencer}
        className={` w-12 rounded ${!isPlaying ? 'bg-green-500 hover:bg-green-600' : 'bg-red-900 hover:bg-red-950'} text-md`}
      >
        {isPlaying ? 'Stop' : 'Play'}
      </button>
      <label className='text-md relative'>
        <p className='absolute text-[0.55rem] top-1.5 -left-0.5 z-20  -rotate-90 border-b'>bpm</p>
        <input
          type='number'
          min={50}
          max={200}
          value={sequencerBpm}
          className='bg-gray-800 w-16 rounded text-end pl-2 align-bottom border'
          onChange={(e) => setSequencerBpm(Number(e.target.value))}
        />
      </label>
      <label className='text-md relative'>
        <p className='absolute text-[0.50rem] top-1.5 -left-0.5 z-20  -rotate-90 border-b'>steps</p>
        <input
          type='number'
          step={4}
          min={8}
          max={64}
          defaultValue={steps.length}
          className='bg-gray-800 w-14 rounded text-end pl-2 align-bottom border'
          onChange={(e) =>
            updateStepLength(Array.from({ length: Number(e.target.value) }, (_, i) => i))
          }
        />
      </label>
    </div>
  );
};
