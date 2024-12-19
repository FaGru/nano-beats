'use client';
import { Pause, Play } from 'lucide-react';
import { Button } from '../../ui/button';
import { useEffect, useState } from 'react';
import { Turntable } from '../turntable';
import { useDJStore } from '../useDJStore';
import * as Tone from 'tone';
import { TDJDeck } from '../dj.types';
import { Display } from './player-display';
import { hotCueColors, hotCueColorsWavesurfer } from '../dj.constants';
import { analyze } from 'web-audio-beat-detector';
import { PitchFader } from './player-pitch';

interface DJPlayerProps {
  djDeck: TDJDeck;
}

export const DJPlayer: React.FC<DJPlayerProps> = ({ djDeck }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const updateDJDeck = useDJStore((state) => state.updateDJDeck);

  const hotCues = Array.from({ length: 8 }, (_, idx: number) => idx).map((number) => {
    const regions = djDeck.regions?.getRegions();
    const matchingRegion = regions?.find((region) => region.id === number.toString());
    return {
      region: matchingRegion || null,
      id: number
    };
  });

  const handlePlay = () => {
    if (!isPlaying) {
      djDeck.wavesurfer?.play();
    }
    if (isPlaying) {
      djDeck.wavesurfer?.pause();
      djDeck.player.stop();
    }

    updateDJDeck(djDeck);
    setIsPlaying(!isPlaying);
  };

  const currentFiles = useDJStore((state) => state.currentFiles);
  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const fileName = event.dataTransfer.getData('text');
    if (fileName) {
      const file = currentFiles.find((f) => f.name === fileName);

      if (file) {
        handleFileSelect(await file.handle.getFile());
      }
    }
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const handleFileSelect = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await Tone.getContext().decodeAudioData(arrayBuffer);
    // @ts-ignore
    djDeck.player.buffer = audioBuffer;
    const tempo = await analyze(audioBuffer);
    djDeck.sample = file.name;
    djDeck.initWavesurfer = true;
    djDeck.defaultBPM = tempo;
    updateDJDeck(djDeck);
  };

  const handleCueDown = () => {
    djDeck.cuePoint = djDeck.wavesurfer?.getCurrentTime() || 0;
    djDeck.player.stop();
    djDeck.wavesurfer?.play();
    updateDJDeck(djDeck);
  };

  const handleCueUp = () => {
    if (!isPlaying) {
      djDeck.wavesurfer?.pause();
      djDeck.player.stop();
      djDeck.wavesurfer?.setTime(djDeck.cuePoint);
    }
  };

  const handleHotCueDown = (hotCue: { region: { start: number } | null; id: number }) => {
    if (hotCue.region) {
      if (djDeck.shiftActive) {
        const newRegions = djDeck.regions
          ?.getRegions()
          .filter((region) => region.id !== hotCue.id.toString());
        djDeck.regions?.clearRegions();
        newRegions?.forEach((region) => djDeck.regions?.addRegion(region));
        updateDJDeck(djDeck);
      } else {
        djDeck.player.seek(hotCue.region.start);
        djDeck.wavesurfer?.setTime(hotCue.region.start);
        djDeck.wavesurfer?.play();
      }
    }
    if (!hotCue.region && !djDeck.shiftActive) {
      djDeck.regions?.addRegion({
        start: djDeck.wavesurfer?.getCurrentTime() || 0,
        id: hotCue.id.toString(),
        color: hotCueColorsWavesurfer[hotCue.id],
        drag: false
      });

      updateDJDeck(djDeck);
    }
  };

  const handleHotCueUp = (hotCue: { region: { start: number } | null; id: number }) => {
    if (hotCue.region && !isPlaying) {
      djDeck.player.stop();
      djDeck.wavesurfer?.pause();
      djDeck.wavesurfer?.setTime(hotCue.region.start);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.key === 'w' && djDeck.id === 1) || (event.key === 's' && djDeck.id === 2)) {
      handlePlay();
    }
    if (
      ((event.key === '1' ||
        event.key === '2' ||
        event.key === '3' ||
        event.key === '4' ||
        event.key === '5') &&
        djDeck.id === 1) ||
      ((event.key === '6' ||
        event.key === '7' ||
        event.key === '8' ||
        event.key === '9' ||
        event.key === '0') &&
        djDeck.id === 2)
    ) {
      let hotCue;
      if (djDeck.id === 1) {
        hotCue = hotCues.find((hotCue) => hotCue.id === parseInt(event.key) - 1);
      }
      if (djDeck.id === 2) {
        hotCue = hotCues.find(
          (hotCue) => hotCue.id === parseInt(event.key === '0' ? '10' : event.key) - 6
        );
      }
      if (hotCue) {
        handleHotCueDown(hotCue);
      }
    }
  };
  const handleKeyUp = (event: KeyboardEvent) => {
    if (
      ((event.key === '1' ||
        event.key === '2' ||
        event.key === '3' ||
        event.key === '4' ||
        event.key === '5') &&
        djDeck.id === 1) ||
      ((event.key === '6' ||
        event.key === '7' ||
        event.key === '8' ||
        event.key === '9' ||
        event.key === '0') &&
        djDeck.id === 2)
    ) {
      let hotCue;
      if (djDeck.id === 1) {
        hotCue = hotCues.find((hotCue) => hotCue.id === parseInt(event.key) - 1);
      }
      if (djDeck.id === 2) {
        hotCue = hotCues.find(
          (hotCue) => hotCue.id === parseInt(event.key === '0' ? '10' : event.key) - 6
        );
      }
      if (hotCue) {
        handleHotCueUp(hotCue);
      }
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPlaying, hotCues]);

  return (
    <div className='flex flex-col bg-background p-4 rounded-xl gap-4 w-80'>
      <div onDrop={handleDrop} onDragOver={handleDragOver}>
        <Display djDeck={djDeck} />
      </div>
      <div className='flex items-center justify-between gap-2'>
        <div className='self-start'>
          <Button
            size='xs'
            variant={djDeck.shiftActive ? 'default' : 'secondary'}
            onClick={() => {
              djDeck.shiftActive = !djDeck.shiftActive;
              updateDJDeck(djDeck);
            }}
          >
            SHIFT
          </Button>
        </div>
        <Turntable isPlaying={isPlaying} djDeck={djDeck} />

        <PitchFader djDeck={djDeck} />
      </div>

      <div className='flex gap-8 '>
        <div className='flex flex-col gap-1'>
          <Button
            size='icon'
            variant='secondary'
            className='rounded-full'
            onMouseDown={handleCueDown}
            onMouseUp={handleCueUp}
          >
            CUE
          </Button>
          <Button size='icon' variant='secondary' className='rounded-full' onMouseDown={handlePlay}>
            {isPlaying ? (
              <Pause className='stroke-foreground' />
            ) : (
              <Play className='stroke-foreground' />
            )}
          </Button>
        </div>
        <div className='grid grid-cols-4 gap-1 w-fit '>
          {hotCues.map((hotCue: { region: any | null; id: number }) => (
            <Button
              size='icon'
              variant='secondary'
              className={`rounded-sm ${hotCue.region ? hotCueColors[hotCue.id] : ''}  `}
              onMouseDown={() => handleHotCueDown(hotCue)}
              onMouseUp={() => handleHotCueUp(hotCue)}
              key={hotCue.id}
            ></Button>
          ))}
        </div>
      </div>
    </div>
  );
};
