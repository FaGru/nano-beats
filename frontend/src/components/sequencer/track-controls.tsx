import { useSequencerStore } from './useSequencerStore';
import { TTrack } from './sequencer.types';
import { useEffect, useState } from 'react';

interface TrackZoneProps {
  selectedTrack: TTrack;
}

export const TrackZone: React.FC<TrackZoneProps> = ({ selectedTrack }) => {
  console.log(selectedTrack);
  const updateTrackSample = useSequencerStore((state) => state.updateTrackSample);
  const updateTrackEQ = useSequencerStore((state) => state.updateTrackEQ);

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
    <div className='flex h-full'>
      <div>
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
      </div>
      <div className='ml-2 bg-gray-800 h-full'>
        <label className='flex flex-col text-xs'>
          High
          <input
            type='range'
            min={-15}
            max={5}
            className='w-32'
            defaultValue={selectedTrack.effects.eqThree.high.value}
            onChange={(e) => updateTrackEQ(selectedTrack.id, 'high', Number(e.target.value))}
          />
        </label>
        <label className='flex flex-col text-xs'>
          Mid
          <input
            type='range'
            min={-15}
            max={5}
            className='w-32'
            defaultValue={selectedTrack.effects.eqThree.mid.value}
            onChange={(e) => updateTrackEQ(selectedTrack.id, 'mid', Number(e.target.value))}
          />
        </label>
        <label className='flex flex-col text-xs'>
          Low
          <input
            type='range'
            min={-15}
            max={5}
            className='w-32'
            defaultValue={selectedTrack.effects.eqThree.low.value}
            onChange={(e) => updateTrackEQ(selectedTrack.id, 'low', Number(e.target.value))}
          />
        </label>
      </div>

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
    </div>
  );
};
