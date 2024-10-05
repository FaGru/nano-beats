import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { TTrack } from '../sequencer.types';

import { useSequencerStore } from '../useSequencerStore';
import TimelinePlugin from 'wavesurfer.js/dist/plugins/timeline.esm.js';
import { useMouseMove } from '@/lib/hooks/useMouseMove';
import { convertBufferToWav } from '@/lib/helpers/convert-audio.helper';

interface PlayerWaveformProps {
  selectedTrack: TTrack;
}

export const PlayerWaveform: React.FC<PlayerWaveformProps> = ({ selectedTrack }) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const isReadyForInit = useRef(true);

  const updateTrack = useSequencerStore((state) => state.updateTrack);
  const { handleMouseDown, handleMouseUp } = useMouseMove('y');

  const initWavesurfer = async () => {
    if (waveformRef.current && timelineRef.current) {
      if (wavesurferRef.current && isReadyForInit.current) {
        wavesurferRef.current?.destroy();
      }
      isReadyForInit.current = false;

      const timeline = TimelinePlugin.create({
        height: 12,

        timeInterval: 0.05,

        primaryLabelSpacing: 4,
        style: { color: 'hsl(var(--background))', borderTop: '1px solid hsl(var(--background))' },
        container: timelineRef.current
      });

      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        progressColor: 'hsl(var(--card-highlight))',
        waveColor: 'hsl(var(--primary))',
        cursorColor: 'hsl(var(--primary))',
        height: 48,
        width: 172,
        dragToSeek: true,

        plugins: [timeline]
      });

      const converted = convertBufferToWav(
        selectedTrack.player?.buffer.sampleRate,
        selectedTrack.player?.buffer.toArray(),
        'audioUrl'
      );
      if (typeof converted === 'string') {
        wavesurferRef.current.load(converted);
      }
      wavesurferRef.current.setMuted(true);
      wavesurferRef.current.on('ready', () => {
        isReadyForInit.current = true;
      });
      wavesurferRef.current.on('play', () => {
        selectedTrack.player?.start(0, selectedTrack.playerStartTime);
      });
      wavesurferRef.current.on('pause', () => {
        wavesurferRef.current?.setTime(selectedTrack.playerStartTime);
      });
      wavesurferRef.current.on('finish', () => {
        wavesurferRef.current?.setTime(selectedTrack.playerStartTime);
      });
      wavesurferRef.current.on('zoom', () => {
        // TODO: add update timeline labels
      });
      wavesurferRef.current.on('interaction', (value) => {
        selectedTrack.playerStartTime = value;
        wavesurferRef.current?.setTime(value);
        updateTrack(selectedTrack);
      });

      if (selectedTrack.playerStartTime !== 0) {
        wavesurferRef.current?.setTime(selectedTrack.playerStartTime);
      }

      selectedTrack.wavesurfer = wavesurferRef.current;
      selectedTrack.playerStartTime = selectedTrack.playerStartTime || 0;
      selectedTrack.initWaveform = false;
      updateTrack(selectedTrack);
    }
  };

  useEffect(() => {
    if (waveformRef.current && isReadyForInit.current) {
      initWavesurfer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTrack.id, selectedTrack.initWaveform, selectedTrack.player?.reverse]);

  const handleZoom = (newValue: number) => {
    if (selectedTrack.wavesurfer) {
      const newZoom = selectedTrack.wavesurfer?.options.minPxPerSec + newValue * 10;
      if (newZoom <= 10000 && newZoom >= 0) {
        selectedTrack.wavesurfer?.zoom(newZoom);
        updateTrack(selectedTrack);
      }
    }
  };
  return (
    <>
      <div className=' border-background border rounded bg-card-highlight w-44 py-0.5'>
        <div ref={waveformRef} />
        <div
          ref={timelineRef}
          onMouseDown={(e) => handleMouseDown(e, handleZoom)}
          onTouchStart={(e) => handleMouseDown(e, handleZoom)}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          className='cursor-zoom-in'
        />
      </div>
    </>
  );
};
