import { useState } from 'react';
import { useSequencerStore } from './useSequencerStore';
import { Tone } from 'tone/build/esm/core/Tone';
import { TTrack } from './sequencer.types';

interface TrackZoneProps {
  selectedTrack: TTrack;
}

export const TrackZone: React.FC<TrackZoneProps> = ({ selectedTrack }) => {
  const updateTrackSample = useSequencerStore((state) => state.updateTrackSample);

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

  return (
    <>
      <h3 className='text-lg font-bold'>{selectedTrack.name}</h3>
      {!selectedTrack.player && (
        <div
          className=' p-4 bg-gray-700 w-80 rounded-lg text-md'
          onDrop={(event) => handleDrop(event, event.dataTransfer.getData('text'))}
          onDragOver={handleDragOver}
        >
          <h4>Drop Sample Here</h4>
        </div>
      )}

      {/* <select
        className='text-black'
        onChange={(e) =>
          updateTrackSample(
            `./assets/audio/Samples/${e.target.value}`,
            selectedTrack.id,
            e.target.value.replace(/\.[^/.]+$/, '')
          )
        }
        value={
          selectedTrack.name ? audioFiles.find((file) => file.includes(selectedTrack.name)) : ''
        }
      >
        <option value=''>Select a sample</option>
        {audioFiles.map((file) => (
          <option key={file} value={file}>
            {file.replace(/\.[^/.]+$/, '')}
          </option>
        ))}
      </select> */}
    </>
  );
};
