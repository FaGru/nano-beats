import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { TTrack } from '../sequencer.types';

import { useSequencerStore } from '../useSequencerStore';
import TimelinePlugin from 'wavesurfer.js/dist/plugins/timeline.esm.js';
import { useMouseMove } from '@/hooks/useMouseMove';

interface PlayerWaveformProps {
  selectedTrack: TTrack; // Prop für die Sample-URL
}

function audioBufferToWav(sampleRate: any, channelBuffers: any) {
  const totalSamples = channelBuffers[0].length * channelBuffers.length;

  const buffer = new ArrayBuffer(44 + totalSamples * 2);
  const view = new DataView(buffer);

  const writeString = (view: any, offset: any, string: any) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  /* RIFF identifier */
  writeString(view, 0, 'RIFF');
  /* RIFF chunk length */
  view.setUint32(4, 36 + totalSamples * 2, true);
  /* RIFF type */
  writeString(view, 8, 'WAVE');
  /* format chunk identifier */
  writeString(view, 12, 'fmt ');
  /* format chunk length */
  view.setUint32(16, 16, true);
  /* sample format (raw) */
  view.setUint16(20, 1, true);
  /* channel count */
  view.setUint16(22, channelBuffers.length, true);
  /* sample rate */
  view.setUint32(24, sampleRate, true);
  /* byte rate (sample rate * block align) */
  view.setUint32(28, sampleRate * 4, true);
  /* block align (channel count * bytes per sample) */
  view.setUint16(32, channelBuffers.length * 2, true);
  /* bits per sample */
  view.setUint16(34, 16, true);
  /* data chunk identifier */
  writeString(view, 36, 'data');
  /* data chunk length */
  view.setUint32(40, totalSamples * 2, true);

  // floatTo16BitPCM
  let offset = 44;
  for (let i = 0; i < channelBuffers[0].length; i++) {
    for (let channel = 0; channel < channelBuffers.length; channel++) {
      const s = Math.max(-1, Math.min(1, channelBuffers[channel][i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      offset += 2;
    }
  }

  return buffer;
}

export const PlayerWaveform: React.FC<PlayerWaveformProps> = ({ selectedTrack }) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const isReadyForInit = useRef(true);

  const updateTrack = useSequencerStore((state) => state.updateTrack);
  const { handleMouseDown, handleMouseUp } = useMouseMove('y');

  const reverseAudioBuffer = (audioBuffer: AudioBuffer): AudioBuffer => {
    for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
      const channelData = audioBuffer.getChannelData(i);
      Array.prototype.reverse.call(channelData); // Reverse the channel data
    }
    return audioBuffer;
  };

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

      const channelBuffers = selectedTrack.player?.buffer.toArray();
      const sampleRate = selectedTrack.player?.buffer.sampleRate;
      const buffer = audioBufferToWav(sampleRate, channelBuffers);
      const reversedBlob = new Blob([buffer], { type: 'audio/wav' });

      wavesurferRef.current.loadBlob(reversedBlob);
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
        // add update timeline labels
      });
      wavesurferRef.current.on('interaction', (value) => {
        selectedTrack.playerStartTime = value;
        wavesurferRef.current?.setTime(value);
        updateTrack(selectedTrack);
      });
    }
    selectedTrack.wavesurfer = wavesurferRef.current;
    selectedTrack.playerStartTime = 0;
    updateTrack(selectedTrack);
  };

  useEffect(() => {
    if (waveformRef.current && isReadyForInit.current) {
      console.log('init');
      initWavesurfer();
    }
  }, [selectedTrack, selectedTrack.player?.reverse]);

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
