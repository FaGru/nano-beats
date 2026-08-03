import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

import TimelinePlugin from 'wavesurfer.js/dist/plugins/timeline.esm.js';
import { useMouseMove } from '@/lib/hooks/useMouseMove';
import { convertBufferToWav } from '@/lib/helpers/convert-audio.helper';
import { useDJStore } from '../useDJStore';
import { TDJDeck } from '../dj.types';
import * as Tone from 'tone';

import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js';

interface DisplayProps {
  djDeck: TDJDeck;
}

export const Display: React.FC<DisplayProps> = ({ djDeck }) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);

  // const currentFiles = useDJStore((state) => state.currentFiles);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const regionsRef = useRef<RegionsPlugin | null>(null);
  const isReadyForInit = useRef(true);

  const updateDJDeck = useDJStore((state) => state.updateDJDeck);

  const isTrackNameTruncated = djDeck.sample.length > 37;
  const truncatedText = isTrackNameTruncated
    ? djDeck.sample.substring(0, 35) + '...'
    : djDeck.sample;

  // const { handleMouseDown, handleMouseUp } = useMouseMove('y');

  const initWavesurfer = async () => {
    if (waveformRef.current) {
      if (wavesurferRef.current && isReadyForInit.current) {
        wavesurferRef.current?.destroy();
      }
      isReadyForInit.current = false;

      regionsRef.current = RegionsPlugin.create();

      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        // progressColor: 'hsl(var(--primary))',
        waveColor: 'black',
        cursorColor: 'white',
        cursorWidth: 1,
        height: 32,
        dragToSeek: true,
        barWidth: 2,
        plugins: [regionsRef.current]
      });

      const converted = convertBufferToWav(
        djDeck.player.buffer.sampleRate,
        djDeck.player.buffer.toArray(),
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
        djDeck.player?.start(0, wavesurferRef.current?.getCurrentTime());
      });
      // wavesurferRef.current.on('pause', () => {
      //   wavesurferRef.current?.setTime(selectedTrack.playerStartTime);
      // });
      // wavesurferRef.current.on('finish', () => {
      //   wavesurferRef.current?.setTime(selectedTrack.playerStartTime);
      // });

      wavesurferRef.current.on('interaction', (value) => {
        if (wavesurferRef.current?.isPlaying()) {
          djDeck.player.stop();
          djDeck.player.start(0, value);
        }
        wavesurferRef.current?.setTime(value);
      });

      // if (selectedTrack.playerStartTime !== 0) {
      //   wavesurferRef.current?.setTime(selectedTrack.playerStartTime);
      // }

      djDeck.wavesurfer = wavesurferRef.current;
      djDeck.regions = regionsRef.current;

      djDeck.initWavesurfer = false;
      updateDJDeck(djDeck, djDeck.id);
    }
  };

  // useEffect(() => {
  //   if (waveformRef.current && isReadyForInit.current && djDeck.initWavesurfer) {
  //     initWavesurfer();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [djDeck.initWavesurfer, isReadyForInit.current]);

  return (
    <>
      <div className='min-h-[60px] w-full  rounded bg-cyan-400  py-0.5 shadow-cyan-300 shadow-[0px_0px_4px_2px] divide-y divide-dashed divide-background '>
        <div className='flex justify-between px-1 '>
          {djDeck?.defaultBPM ? (
            <p className='text-xxs font-bold leading-4 text-center text-background'>
              {(djDeck?.defaultBPM * djDeck.player.playbackRate).toFixed(2)} BPM
            </p>
          ) : null}
          <p className='text-xxs font-bold leading-4 text-center text-background'>
            {truncatedText}
          </p>
        </div>
        <div ref={waveformRef} id={'waveform-' + djDeck.id} className='pt-1 mb-0.5' />
      </div>
    </>
  );
};
