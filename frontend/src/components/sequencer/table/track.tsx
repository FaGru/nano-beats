import { Button } from '@/components/ui/button';
import { TTrack } from '../sequencer.types';
import { useSequencerStore } from '../useSequencerStore';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Pencil } from 'lucide-react';

import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';

interface TrackProps {
  track: TTrack;
  steps: number[];

  trackIndex: number;
  activeSteps: number[];
}

export const Track: React.FC<TrackProps> = ({ track, steps, trackIndex, activeSteps }) => {
  const updateStepTrigger = useSequencerStore((state) => state.updateStepTrigger);
  const selectTrack = useSequencerStore((state) => state.selectTrack);
  const updateTrack = useSequencerStore((state) => state.updateTrack);
  const selectedTrackId = useSequencerStore((state) => state.selectedTrackId);

  const getColors = (index: number) => {
    let colors = 'bg-neutral-300';
    if (activeSteps.includes(index)) {
      colors = 'bg-neutral-500';
    }
    return colors;
  };

  const isTrackNameTruncated = track.name.length > 12;
  const truncatedText = isTrackNameTruncated ? track.name.substring(0, 9) + '...' : track.name;
  const [isNameChangeActive, setIsNameChangeActive] = useState(false);
  const [trackName, setTrackName] = useState(track.name);

  return (
    <tr key={trackIndex} onClick={() => selectTrack(track.id)} className={` `}>
      <td className={`sticky left-0 z-10 text-xs   font-bold cursor-pointer rounded bg-background`}>
        <Button
          variant={selectedTrackId === track.id ? 'default' : 'ghost'}
          title={isTrackNameTruncated ? track.name : ''}
          className='w-full flex justify-start relative mr-2'
        >
          <p>{truncatedText}</p>
          {selectedTrackId === track.id && (
            <Popover open={isNameChangeActive}>
              <PopoverTrigger asChild>
                <Pencil
                  className='w-4 h-4 p-0.5 cursor- absolute right-1 top-1'
                  onClick={() => setIsNameChangeActive(true)}
                />
              </PopoverTrigger>
              <PopoverContent
                className='w-80'
                onPointerDownOutside={() => setIsNameChangeActive(false)}
              >
                <div className='grid gap-4'>
                  <div className='space-y-2'>
                    <h4 className='font-medium leading-none'>
                      Track: <span className='text-card-highlight'>{track.name}</span>
                    </h4>
                    <p className='text-sm text-muted-foreground'>Set a new name for this track.</p>
                  </div>
                  <div className='grid gap-2'>
                    <div className='grid grid-cols-3 items-center gap-4'>
                      <Label htmlFor='width'>Name:</Label>
                      <Input
                        id='width'
                        value={trackName}
                        className='col-span-2 h-8'
                        onChange={(e) => setTrackName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className='flex justify-between mt-2'>
                    <Button variant='ghost' size='sm' onClick={() => setIsNameChangeActive(false)}>
                      cancel
                    </Button>
                    <Button
                      size='sm'
                      onClick={() => {
                        setIsNameChangeActive(false);
                        track.name = trackName;
                        updateTrack(track);
                      }}
                    >
                      save
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </Button>
      </td>
      {steps.map((step) => (
        <td key={step}>
          <Button
            key={step}
            className={`w-12 h-12 rounded focus-visible:ring-0 align-middle ${step % 4 === 3 ? 'mr-1' : ''}
            hover:bg-primary ${getColors(step)}
        `}
            onClick={() => updateStepTrigger(track.id, step)}
          />
        </td>
      ))}
    </tr>
  );
};
