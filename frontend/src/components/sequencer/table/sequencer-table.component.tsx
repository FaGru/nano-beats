import { useToneStore } from '@/lib/state-managment/useToneStore';

import { useSequencerStore } from '../useSequencerStore';
import { Timeline } from './timeline';
import { Track } from './track';
import { Puff } from 'react-loader-spinner';
import { TPattern } from '../sequencer.types';
import { Button } from '@/components/ui/button';

interface SequencerTableProps {
  selectedPattern: TPattern | undefined;
}

export const SequencerTable: React.FC<SequencerTableProps> = ({ selectedPattern }) => {
  const tone = useToneStore((state) => state.tone);
  const currentStep = useSequencerStore((state) => state.currentStep);
  const tracks = useSequencerStore((state) => state.tracks);
  const addTrack = useSequencerStore((state) => state.addTrack);
  const sequence = useSequencerStore((state) => state.sequence);

  if (!tone) {
    return (
      <div className='w-full bg-background  rounded  flex items-center justify-center'>
        <Puff />
      </div>
    );
  }

  return (
    <div className='w-full  overflow-auto bg-background border-neutral-600 border pr-2 '>
      <table className='max-w-full table-fixed border-collapse '>
        <thead>
          {sequence ? <Timeline steps={sequence.events} currentStep={currentStep} /> : null}
        </thead>

        <tbody>
          <tr>
            <td className='pt-2'></td>
          </tr>
          {tracks.map((track, trackIndex) =>
            selectedPattern && sequence ? (
              <Track
                key={trackIndex}
                track={track}
                steps={sequence.events}
                trackIndex={trackIndex}
                activeSteps={
                  selectedPattern.trackTriggers.find((trigger) => trigger.trackId === track.id)
                    ?.activeSteps || []
                }
              />
            ) : null
          )}
          <tr>
            <td className='sticky left-0 z-10 p-2'>
              <Button
                size='sm'
                variant='outline'
                onClick={() => addTrack()}
                className={`my-4   font-bold cursor-pointer `}
              >
                add track
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
