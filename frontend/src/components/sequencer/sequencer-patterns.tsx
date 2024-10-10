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
import { NameChangePopover } from '../shared/name-change-popover';
import { TPattern } from './sequencer.types';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

interface SortableItemProps {
  item: TPattern | { id: string; name: string };
  isOver?: boolean;
  isActivePattern?: boolean;
}
const SortableItem: React.FC<SortableItemProps> = ({ item, isActivePattern, isOver }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: item.id
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const updatePattern = useSequencerStore((state) => state.updatePattern);

  const handleNameChange = (newName: string) => {
    item.name = newName;
    updatePattern(item as TPattern);
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {item.id !== 'TRASH' && item?.name ? (
        <Button
          className={`flex justify-center text-xs p-2 ${isActivePattern ? 'pr-1' : ''} `}
          variant={isActivePattern ? 'default' : 'secondary'}
          size='xs'
        >
          <span
            className={` cursor-grab active:cursor-grabbing ${isActivePattern ? '' : 'px-3'}`}
            {...listeners}
          >
            {item.name}
          </span>
          {isActivePattern && (
            <div className='flex items-center ml-3'>
              <NameChangePopover value={item.name} onSubmit={handleNameChange} />
            </div>
          )}
        </Button>
      ) : (
        <Button
          className='rounded-md p-2 mt-0.5'
          variant={isOver ? 'destructive' : 'secondary'}
          size='xs'
          {...listeners}
        >
          <Trash2 className='w-4 h-4' />
        </Button>
      )}
    </div>
  );
};

interface PatternsProps {}

export const Patterns: React.FC<PatternsProps> = () => {
  const patterns = useSequencerStore((state) => state.patterns);
  const updatePatternsOrder = useSequencerStore((state) => state.updatePatternsOrder);
  const deletePattern = useSequencerStore((state) => state.deletePattern);
  const selectedPatternId = useSequencerStore((state) => state.selectedPatternId);
  const addPattern = useSequencerStore((state) => state.addPattern);
  const setSelectedPatternId = useSequencerStore((state) => state.setSelectedPatternId);

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
      deletePattern(active.id);
    }
  };
  const handleDragOver = (event: any) => {
    const { active, over } = event;
    setDragItems({ active: active.id, over: over.id });
    handlePatternChange(active.id);
    if (active.id !== over.id && over.id !== 'TRASH') {
      const oldIndex = patterns.findIndex((pattern) => pattern.id === active.id);
      const newIndex = patterns.findIndex((pattern) => pattern.id === over.id);
      const newOrder = arrayMove(patterns, oldIndex, newIndex);
      updatePatternsOrder(newOrder);
    }
  };

  const handlePatternChange = (patternId: string) => {
    if (patternId === 'new') {
      addPattern();
    } else {
      setSelectedPatternId(patternId);
    }
  };

  return (
    <ScrollArea
      type='scroll'
      className='flex whitespace-nowrap bg-background border-neutral-600 border border-t-0'
    >
      <div className='flex p-2 w-full h-12 gap-2 items-center px-2 bg-background border-neutral-600 border-x'>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDragStart={() => setIsDragActive(true)}
        >
          <SortableContext
            items={[...patterns.map((pattern) => pattern.id), { id: 'TRASH' }]}
            strategy={verticalListSortingStrategy}
          >
            <div className='flex gap-2 '>
              {patterns.map((pattern) => (
                <SortableItem
                  key={pattern.id}
                  item={pattern}
                  isActivePattern={selectedPatternId === pattern.id}
                />
              ))}
            </div>
            {patterns.length ? (
              <Separator orientation='vertical' className=' h-7 bg-neutral-600 mx-2' />
            ) : null}
            {isDragActive && patterns.length > 1 && (
              <SortableItem
                key='TRASH'
                item={{ id: 'TRASH', name: 'trash' }}
                isOver={dragItems.over === 'TRASH'}
              />
            )}
          </SortableContext>
        </DndContext>
        {!isDragActive && (
          <Button
            variant='secondary'
            className='rounded-md  p-2 '
            size='xs'
            onClick={() => handlePatternChange('new')}
          >
            <Plus className='w-4 h-4' />
          </Button>
        )}
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  );
};
