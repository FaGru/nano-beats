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
import { useState } from 'react';
import { useMouseMove } from '@/hooks/useMouseMove';

interface TrackZoneProps {
  selectedTrack: TTrack;
}

export const TrackZone: React.FC<TrackZoneProps> = ({ selectedTrack }) => {
  const [playerVolume, setPlayerVolume] = useState(selectedTrack?.player?.volume.value || 0);
  const [eqThreeValues, setEqThreeValues] = useState({
    high: selectedTrack?.effects?.eqThree.high.value,
    mid: selectedTrack?.effects?.eqThree.mid.value,
    low: selectedTrack?.effects?.eqThree.low.value
  });
  const updateTrackSample = useSequencerStore((state) => state.updateTrackSample);
  const { handleMouseDown, handleMouseUp } = useMouseMove('y');

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, item: string) => {
    event.preventDefault();
    updateTrackSample(
      `./assets/audio/Samples/${item}`,
      selectedTrack.id,
      item.replace(/\.[^/.]+$/, '')
    );
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
      setPlayerVolume(newVolume);
    }
  };
  const resetTrackGain = () => {
    if (selectedTrack.player) {
      selectedTrack.player.volume.value = sequencerDefaultVolume;
      setPlayerVolume(sequencerDefaultVolume);
    }
  };
  const handleTrackEQ = (updateValue: number, type: string | undefined) => {
    if ((type && type === 'high') || type === 'mid' || type === 'low') {
      let newVolume = selectedTrack.effects.eqThree[type].value + updateValue / 10;
      if (newVolume < eqThreeVolumeLimits.min) {
        newVolume = eqThreeVolumeLimits.min;
      } else if (newVolume > eqThreeVolumeLimits.max) {
        newVolume = eqThreeVolumeLimits.max;
      }
      selectedTrack.effects.eqThree[type].value = newVolume;
      setEqThreeValues({ ...eqThreeValues, [type]: newVolume });
    }
  };

  const resetTrackEQ = (type: 'high' | 'mid' | 'low') => {
    selectedTrack.effects.eqThree[type].value = eqThreeDefaultVolume;
    setEqThreeValues({ ...eqThreeValues, [type]: eqThreeDefaultVolume });
  };

  return (
    <div className='flex  items-center h-24'>
      {!selectedTrack.player ? (
        <div
          className=' p-4 bg-gray-700 w-64 rounded-lg text-md'
          onDrop={(event) => handleDrop(event, event.dataTransfer.getData('text'))}
          onDragOver={handleDragOver}
        >
          <h4>Drop Sample Here</h4>
        </div>
      ) : (
        <>
          <div className=' bg-gray-700 h-full p-1  flex flex-col gap-2 rounded '>
            <h4>{selectedTrack.name}</h4>
            <div
              className='flex flex-col items-center justify-center h-screen'
              onMouseDown={(e) => handleMouseDown(e, handleTrackGain)}
              onTouchStart={(e) => handleMouseDown(e, handleTrackGain)}
              onMouseUp={handleMouseUp}
              onTouchEnd={handleMouseUp}
              onDoubleClick={resetTrackGain}
            >
              <FillableBox
                value={(Math.round(playerVolume * 10) / 10).toFixed(1)}
                orientation='horizontal'
                height={'16px'}
                width='128px'
                max={sequencerVolumeLimits.max}
                min={sequencerVolumeLimits.min}
                valueType={'dB'}
              />
            </div>
          </div>
          <div className='ml-2 bg-gray-700 h-full p-1 pt-0 flex gap-4 rounded'>
            {Object.keys(eqThreeValues).map((type: string) => (
              <div
                key={type}
                className='flex flex-col text-xs relative items-center gap-1'
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
                  height={'72px'}
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
