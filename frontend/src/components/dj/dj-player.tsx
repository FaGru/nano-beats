'use client';
import { Pause, Play } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Turntable } from './turntable';
import { useDJStore } from './useDJStore';
import * as Tone from 'tone';

interface DJPlayerProps {
  djDeck: any;
}

export const DJPlayer: React.FC<DJPlayerProps> = ({ djDeck }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const updateDJDeck = useDJStore((state) => state.updateDJDeck);

  const handlePlay = () => {
    isPlaying ? djDeck.player.stop() : djDeck.player.start();
    setIsPlaying(!isPlaying);
  };

  const isTrackNameTruncated = djDeck.sample.length > 33;
  const truncatedText = isTrackNameTruncated
    ? djDeck.sample.substring(0, 30) + '...'
    : djDeck.sample;

  const currentFiles = useDJStore((state) => state.currentFiles);
  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const fileName = event.dataTransfer.getData('text');
    console.log(fileName);
    console.log(currentFiles);
    if (fileName) {
      const file = currentFiles.find((f) => f.name === fileName);
      console.log(file);
      if (file) {
        handleFileSelect(await file.handle.getFile());
      }
    }
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const handleFileSelect = async (file: File) => {
    console.log('file', file);
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await Tone.getContext().decodeAudioData(arrayBuffer);

    djDeck.player.buffer = audioBuffer;

    djDeck.sample = file.name;
    updateDJDeck(djDeck);
  };

  return (
    <div className='flex flex-col bg-background p-4 rounded-xl gap-1'>
      <div>
        <p className='text-sm' onDrop={handleDrop} onDragOver={handleDragOver}>
          {truncatedText}
        </p>
      </div>
      <div>
        <Turntable isPlaying={isPlaying} />
      </div>

      <div className='flex gap-2'>
        <Button size='icon' variant='secondary' className='rounded-full' onMouseDown={handlePlay}>
          {isPlaying ? (
            <Pause className='stroke-foreground' />
          ) : (
            <Play className='stroke-foreground' />
          )}
        </Button>
        <Button size='icon' variant='secondary' className='rounded-full'>
          CUE
        </Button>
      </div>
    </div>
  );
};
