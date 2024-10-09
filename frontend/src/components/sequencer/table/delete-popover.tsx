import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

interface DeletePopoverProps {
  onDelete: () => void;
}

export const DeletePopover: React.FC<DeletePopoverProps> = ({ onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild>
        <Trash2 onClick={() => setIsOpen(true)} className='h-3.5 w-4' />
      </PopoverTrigger>
      <PopoverContent className='flex flex-col' onPointerDownOutside={() => setIsOpen(false)}>
        <p className='mb-2'>Are you sure?</p>
        <div className='flex justify-between'>
          <Button size='sm' variant='secondary' onClick={() => setIsOpen(false)}>
            cancel
          </Button>
          <Button
            size='sm'
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
              setIsOpen(false);
            }}
          >
            DELETE
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
