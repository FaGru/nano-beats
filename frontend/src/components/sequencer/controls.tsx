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
      <label className='text-md'>
        <input
          type='number'
          min={50}
          max={200}
          value={sequencerBpm}
          className='bg-gray-600 w-16 rounded text-center'
          onChange={(e) => setSequencerBpm(Number(e.target.value))}
        />
      </label>
      <label className='text-md'>
        <input
          type='number'
          step={4}
          min={8}
          max={64}
          defaultValue={steps.length}
          className='bg-gray-600 w-16 rounded text-center'
          onChange={(e) =>
            updateStepLength(Array.from({ length: Number(e.target.value) }, (_, i) => i))
          }
        />
      </label>
    </div>
  );
};
