'use client';

import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useSequencerStore } from './useSequencerStore';
import { Button } from '../ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Separator } from '../ui/separator';

interface SortableItemProps {
  item: { patternName?: string; id: string };
  isOver?: boolean;
  isPlayingPattern?: boolean;
}
const SortableItem: React.FC<SortableItemProps> = ({ item, isOver, isPlayingPattern }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: item.id
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {item.id === 'TRASH' ? (
        <Button
          className='rounded-md p-2 mt-0.5'
          variant={isOver ? 'destructive' : 'secondary'}
          size='xs'
        >
          <Trash2 className='w-4 h-4' />
        </Button>
      ) : (
        <Button
          className='cursor-grab active:cursor-grabbing text-xs p-2'
          variant={isPlayingPattern ? 'default' : 'secondary'}
          size='xs'
        >
          {item.patternName}
        </Button>
      )}
    </div>
  );
};

interface SongTimelineProps {}

export const SongTimeline: React.FC<SongTimelineProps> = () => {
  const song = useSequencerStore((state) => state.song);
  const addPatternToSong = useSequencerStore((state) => state.addPatternToSong);
  const removePatternFromSong = useSequencerStore((state) => state.removePatternFromSong);
  const updateSongOrder = useSequencerStore((state) => state.updateSongOrder);
  const currentSongPattern = useSequencerStore((state) => state.currentSongPattern);
  const isPlaying = useSequencerStore((state) => state.isPlaying);
  const mode = useSequencerStore((state) => state.mode);

  const [isDragActive, setIsDragActive] = useState(false);
  const [dragItems, setDragItems] = useState<{ active: string | null; over: string | null }>({
    active: null,
    over: null
  });

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setIsDragActive(false);
    setDragItems({ active: null, over: null });

    if (over.id === 'TRASH') {
      removePatternFromSong(active.id);
    }
  };
  const handleDragOver = (event: any) => {
    const { active, over } = event;
    setDragItems({ active: active.id, over: over.id });
    if (active.id !== over.id && over.id !== 'TRASH') {
      const oldIndex = song.findIndex((pattern) => pattern.id === active.id);
      const newIndex = song.findIndex((pattern) => pattern.id === over.id);
      const newOrder = arrayMove(song, oldIndex, newIndex);
      updateSongOrder(newOrder);
    }
  };
  return (
    <div className='flex p-2 w-full h-12 gap-2 items-center px-2 bg-background border-neutral-600 border-x'>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragStart={() => setIsDragActive(true)}
      >
        <SortableContext
          items={[...song.map((pattern) => pattern.id), { id: 'TRASH' }]}
          strategy={verticalListSortingStrategy}
        >
          <div className='flex gap-2 '>
            {song.map((pattern, idx) => (
              <SortableItem
                key={pattern.id}
                item={pattern}
                isPlayingPattern={currentSongPattern === idx && isPlaying && mode === 'song'}
              />
            ))}
          </div>
          {song.length ? (
            <Separator orientation='vertical' className=' h-7 bg-neutral-600 mx-2' />
          ) : null}
          {isDragActive && (
            <SortableItem key='TRASH' item={{ id: 'TRASH' }} isOver={dragItems.over === 'TRASH'} />
          )}
        </SortableContext>
      </DndContext>
      {!isDragActive && (
        <Button
          variant='secondary'
          className='rounded-md  p-2 '
          size='xs'
          onClick={() => addPatternToSong()}
        >
          <Plus className='w-4 h-4' />
        </Button>
      )}
    </div>
  );
};
