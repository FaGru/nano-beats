import { Plus } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { useState } from 'react';
import { Button } from '../ui/button';
import { useSequencerStore } from './useSequencerStore';

interface PatternsPopoverProps {}
export const PatternsPopover: React.FC<PatternsPopoverProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  const patterns = useSequencerStore((state) => state.patterns);
  const addPatternToSong = useSequencerStore((state) => state.addPatternToSong);
  const handleClick = (patternId: string) => {
    setIsOpen(false);
    addPatternToSong(patternId);
  };

  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='secondary'
          className='rounded-md  p-2 '
          size='xs'
          onClick={() => setIsOpen(true)}
        >
          <Plus className='w-4 h-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-48' onPointerDownOutside={() => setIsOpen(false)} align='start'>
        <ul className='flex flex-col gap-1'>
          {patterns.map((pattern) => (
            <li
              className='hover:bg-primary rounded py-1 px-2 cursor-pointer text-sm'
              onClick={() => handleClick(pattern.id)}
              key={pattern.id}
            >
              {pattern.name}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
