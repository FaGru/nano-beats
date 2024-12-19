import { useEffect, useRef } from 'react';
import { TDJDeck } from '../dj.types';
import WaveSurfer from 'wavesurfer.js';
import { useDJStore } from '../useDJStore';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js';
import { convertBufferToWav } from '@/lib/helpers/convert-audio.helper';

interface WaveformProps {
  djDeck: TDJDeck;
}

export const Waveform: React.FC<WaveformProps> = ({ djDeck }) => {
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
        container: '#waveform-' + djDeck.id,
        // progressColor: 'hsl(var(--primary))',
        waveColor: 'white',
        cursorColor: 'hsl(var(--primary))',
        cursorWidth: 1,
        height: 64,
        dragToSeek: true,
        barWidth: 1,
        minPxPerSec: 256,
        hideScrollbar: true,
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
      updateDJDeck(djDeck);
    }
  };

  useEffect(() => {
    if (waveformRef.current && isReadyForInit.current && djDeck.initWavesurfer) {
      initWavesurfer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [djDeck.initWavesurfer, isReadyForInit.current]);

  // console.log(waveformRef);
  return (
    <>
      <div className='h-[72px] w-full  '>
        <div ref={waveformRef} id={'waveform-' + djDeck.id} className='pt-1 mb-0.5' />
      </div>
    </>
  );
};
