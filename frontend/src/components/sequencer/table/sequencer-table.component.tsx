import { useToneStore } from '@/lib/state-managment/useToneStore';
import { TTrack } from '../sequencer.types';
import { useSequencerStore } from '../useSequencerStore';
import { Timeline } from './timeline';
import { Track } from './track';
import { LoadingSpinner } from '@/components/shared/loading-spinner';

interface SequencerTableProps {}

export const SequencerTable: React.FC<SequencerTableProps> = () => {
  const tone = useToneStore((state) => state.tone);
  const tracks = useSequencerStore((state) => state.tracks);
  const currentStep = useSequencerStore((state) => state.currentStep);
  const steps = useSequencerStore((state) => state.steps);
  const addTrack = useSequencerStore((state) => state.addTrack);

  if (!tone) {
    return (
      <div className='w-full bg-gray-950  rounded  flex items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className='w-full  overflow-auto bg-gray-950  rounded pr-2 '>
      <table className='max-w-full table-fixed border-collapse '>
        <thead>
          <Timeline steps={steps} currentStep={currentStep} />
        </thead>

        <tbody>
          <tr>
            <td className='pt-2'></td>
          </tr>
          {tracks.map((track, trackIndex) => (
            <Track
              key={trackIndex}
              track={track}
              steps={steps}
              currentStep={currentStep}
              trackIndex={trackIndex}
            />
          ))}
          <tr>
            <td className='sticky left-0 z-10 p-2'>
              <button
                onClick={() => addTrack({ trackId: tracks.length })}
                className={`my-4   text-gray-700 font-bold cursor-pointer `}
              >
                add track
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
