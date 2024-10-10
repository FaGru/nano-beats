import { Input } from '@/components/ui/input';

import { Pencil } from 'lucide-react';

import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

interface NameChangePopoverProps {
  onSubmit: (name: string) => void;
  value: string;
}
export const NameChangePopover: React.FC<NameChangePopoverProps> = ({ onSubmit, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [trackName, setTrackName] = useState(value);

  const handelCancel = () => {
    setIsOpen(false);
    setTrackName(value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(trackName);
    setTrackName(value);
    setIsOpen(false);
  };

  useEffect(() => {
    setTrackName(value);
  }, [value]);

  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild>
        <Pencil
          className='w-4 h-4 p-0.5 cursor-pointer right-1 top-1'
          onClick={() => setIsOpen(true)}
        />
      </PopoverTrigger>
      <PopoverContent className='w-48' onPointerDownOutside={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit}>
          <Label>
            <Input
              id='width'
              value={trackName}
              className='col-span-2 h-8'
              onChange={(e) => setTrackName(e.target.value)}
            />
          </Label>

          <div className='flex justify-between mt-4'>
            <Button type='button' variant='ghost' size='sm' onClick={handelCancel}>
              cancel
            </Button>
            <Button type='submit' size='sm' onClick={handleSubmit}>
              save
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};
