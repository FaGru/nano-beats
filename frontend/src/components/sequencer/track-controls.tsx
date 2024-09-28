'use client';
import { useSequencerStore } from './useSequencerStore';
import { TTrack } from './sequencer.types';
import { FillableBox } from '../shared/fillable-box';
import {
  eqThreeDefaultVolume,
  eqThreeVolumeLimits,
  sequencerDefaultVolume,
  sequencerVolumeLimits
} from './sequencer.constants';
import { useMouseMove } from '@/hooks/useMouseMove';

interface TrackControlsProps {
  selectedTrack: TTrack;
}

export const TrackControls: React.FC<TrackControlsProps> = ({ selectedTrack }) => {
  const eqThreeValues = {
    high: selectedTrack?.effects?.eqThree.high.value,
    mid: selectedTrack?.effects?.eqThree.mid.value,
    low: selectedTrack?.effects?.eqThree.low.value
  };
  const updateTrackSample = useSequencerStore((state) => state.updateTrackSample);
  const updateTrack = useSequencerStore((state) => state.updateTrack);

  const { handleMouseDown, handleMouseUp } = useMouseMove('y');

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, item: string) => {
    event.preventDefault();
    if (selectedTrack) {
      updateTrackSample(
        `./assets/audio/Samples/${item}`,
        selectedTrack.id,
        item.replace(/\.[^/.]+$/, '')
      );
    }
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

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
  const handleTrackEQ = (updateValue: number, type: string | undefined) => {
    if (type && (type === 'high' || type === 'mid' || type === 'low')) {
      let newVolume = selectedTrack.effects.eqThree[type].value + updateValue / 10;
      if (newVolume < eqThreeVolumeLimits.min) {
        newVolume = eqThreeVolumeLimits.min;
      } else if (newVolume > eqThreeVolumeLimits.max) {
        newVolume = eqThreeVolumeLimits.max;
      }
      selectedTrack.effects.eqThree[type].value = newVolume;
      updateTrack(selectedTrack);
    }
  };

  const resetTrackEQ = (type: 'high' | 'mid' | 'low') => {
    selectedTrack.effects.eqThree[type].value = eqThreeDefaultVolume;
    updateTrack(selectedTrack);
  };

  return (
    <div className='flex gap-2 bg-background border-neutral-600 border border-t-0 px-4 rounded-b-md h-[15vh]  p-1.5'>
      {!selectedTrack?.player ? (
        <div
          className=' p-4 bg-secondary w-64 rounded-lg text-md'
          onDrop={(event) => handleDrop(event, event.dataTransfer.getData('text'))}
          onDragOver={handleDragOver}
        >
          <h4>Drop Sample Here</h4>
        </div>
      ) : (
        <>
          <div className=' bg-secondary h-full p-1  flex flex-col gap-2 rounded '>
            <h4>{selectedTrack.name}</h4>
            <div
              className='flex flex-col items-center justify-center'
              onMouseDown={(e) => handleMouseDown(e, handleTrackGain)}
              onTouchStart={(e) => handleMouseDown(e, handleTrackGain)}
              onMouseUp={handleMouseUp}
              onTouchEnd={handleMouseUp}
              onDoubleClick={resetTrackGain}
            >
              <FillableBox
                value={(Math.round(selectedTrack.player.volume.value * 10) / 10).toFixed(1)}
                orientation='horizontal'
                height={'16px'}
                width='128px'
                max={sequencerVolumeLimits.max}
                min={sequencerVolumeLimits.min}
                valueType={'dB'}
              />
            </div>
          </div>
          <div className=' bg-secondary h-full  p-1 pt-0 flex gap-4 rounded'>
            {Object.keys(eqThreeValues).map((type: string) => (
              <div
                key={type}
                className='flex flex-col text-xs  items-center gap-0.5'
                onMouseDown={(e) => handleMouseDown(e, handleTrackEQ, type)}
                onTouchStart={(e) => handleMouseDown(e, handleTrackEQ)}
                onMouseUp={handleMouseUp}
                onTouchEnd={handleMouseUp}
                onDoubleClick={() => resetTrackEQ(type as 'high' | 'mid' | 'low')}
              >
                <p>{type}</p>
                <FillableBox
                  value={(
                    Math.round(eqThreeValues[type as 'high' | 'mid' | 'low'] * 10) / 10
                  ).toFixed(1)}
                  orientation='vertical'
                  height='100%'
                  width='16px'
                  max={eqThreeVolumeLimits.max}
                  min={eqThreeVolumeLimits.min}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
