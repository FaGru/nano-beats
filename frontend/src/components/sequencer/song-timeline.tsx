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

interface SongTimelineProps {}

export const SongTimeline: React.FC<SongTimelineProps> = () => {
  const song = useSequencerStore((state) => state.song);
  const addPatternToSong = useSequencerStore((state) => state.addPatternToSong);
  const removePatternFromSong = useSequencerStore((state) => state.removePatternFromSong);
  const updateSongOrder = useSequencerStore((state) => state.updateSongOrder);

  const SortableItem = ({ pattern }: { pattern: { patternName: string; id: string } }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
      id: pattern.id
    });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <button
          type='button'
          className='border rounded p-1 text-xs bg-background cursor-grab active:cursor-grabbing'
        >
          {pattern.patternName}
        </button>
      </div>
    );
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = song.findIndex((pattern) => pattern.id === active.id);
      const newIndex = song.findIndex((pattern) => pattern.id === over.id);
      const newOrder = arrayMove(song, oldIndex, newIndex);
      updateSongOrder(newOrder);
    }
  };

  return (
    <div className='flex p-2 w-full h-[6vh] gap-4 items-center px-2 bg-background border-neutral-600 border-x'>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={song.map((pattern) => pattern.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className='flex gap-2'>
            {song.map((pattern) => (
              <div className='relative' key={pattern.id}>
                <button
                  type='button'
                  className='border rounded-full absolute -right-1 -top-1 text-[0.55rem] h-3 w-3 flex items-center justify-center bg-background'
                  onClick={() => removePatternFromSong(pattern.id)}
                >
                  x
                </button>
                <SortableItem pattern={pattern} />
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <button type='button' className='w-12 rounded' onClick={() => addPatternToSong()}>
        +
      </button>
    </div>
  );
};
