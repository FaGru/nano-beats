import { useMouseMove } from '@/lib/hooks/useMouseMove';
import { TTrack } from '../sequencer.types';
import { sequencerDefaultVolume, sequencerVolumeLimits } from '../sequencer.constants';
import { useSequencerStore } from '../useSequencerStore';
import { FillableBox } from '@/components/shared/fillable-box';
import { Check, Pencil, Play, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { PlayerWaveform } from './player-waveform';
import { Button } from '@/components/ui/button';

interface TrackSampleProps {
  selectedTrack: TTrack;
}

export const TrackSample: React.FC<TrackSampleProps> = ({ selectedTrack }) => {
  const { handleMouseDown, handleMouseUp } = useMouseMove('y');
  const updateTrack = useSequencerStore((state) => state.updateTrack);

  const handleTrackGain = (updateValue: number) => {
    if (selectedTrack.player) {
      let newVolume = selectedTrack.player.volume.value + updateValue / 10;
      if (newVolume < sequencerVolumeLimits.min) {
        newVolume = sequencerVolumeLimits.min;
      } else if (newVolume > sequencerVolumeLimits.max) {
        newVolume = sequencerVolumeLimits.max;
      }
      selectedTrack.player.volume.value = newVolume;
      updateTrack(selectedTrack);
    }
  };
  const resetTrackGain = () => {
    if (selectedTrack.player) {
      selectedTrack.player.volume.value = sequencerDefaultVolume;
      updateTrack(selectedTrack);
    }
  };

  const [isNameChangeActive, setIsNameChangeActive] = useState(false);
  const [trackName, setTrackName] = useState(selectedTrack.name);
  useEffect(() => {
    setTrackName(selectedTrack.name);
  }, [selectedTrack]);

  return (
    <Card>
      <p className='text-xxs bg-card-highlight text-center p-0.5 rounded-t-md'>{trackName}</p>

      <div className='flex flex-col gap-2 items-center justify-between p-2 mt-1'>
        {/* <Input
          disabled={!isNameChangeActive}
          className={`h-6 w-32 mr-2 bg-transparent rounded-none disabled:cursor-default  ${isNameChangeActive ? 'border-b-primary-foreground' : ''}`}
          value={trackName}
          onChange={(e) => setTrackName(e.target.value)}
        />
        {isNameChangeActive ? (
          <Check
            className='w-4 h-4  cursor-pointer'
            onClick={() => {
              setIsNameChangeActive(false);
              selectedTrack.name = trackName;
              updateTrack(selectedTrack);
            }}
          />
        ) : (
          <Pencil
            className='w-4 h-4 p-0.5 cursor-pointer'
            onClick={() => setIsNameChangeActive(true)}
          />
        )} */}
        <div
          className='flex gap-1 items-center justify-center'
          onMouseDown={(e) => handleMouseDown(e, handleTrackGain)}
          onTouchStart={(e) => handleMouseDown(e, handleTrackGain)}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          onDoubleClick={resetTrackGain}
        >
          <Button
            onClick={() => {
              selectedTrack.wavesurfer?.pause();
              selectedTrack.wavesurfer?.play();
            }}
            className=' z-20 p-1 -top-[18px]'
            size='xxs'
          >
            <Play className='h-3 w-3 ' />
          </Button>
          <Button
            onClick={() => {
              if (selectedTrack.player) {
                selectedTrack.player.reverse = !selectedTrack.player.reverse;
                selectedTrack.initWaveform = true;
                updateTrack(selectedTrack);
              }
            }}
            className=' z-20 p-1 -top-[18px]'
            size='xxs'
            variant={selectedTrack.player?.reverse ? 'default' : 'ghost'}
          >
            <RotateCcw className='h-3 w-3 ' />
          </Button>
          <FillableBox
            value={
              selectedTrack.player
                ? (Math.round(selectedTrack.player.volume.value * 10) / 10).toFixed(1)
                : '0.0'
            }
            orientation='horizontal'
            height={'16px'}
            width='128px'
            max={sequencerVolumeLimits.max}
            min={sequencerVolumeLimits.min}
            valueType={'dB'}
          />
        </div>

        {selectedTrack.player?.buffer.loaded && <PlayerWaveform selectedTrack={selectedTrack} />}

        {/* <button onClick={() => selectedTrack?.player?.start()}>play</button> */}
        {/* <Waveform
        device={
          // new Tone.Oscillator()
          selectedTrack.player
        }
      /> */}
      </div>
    </Card>
  );
};
