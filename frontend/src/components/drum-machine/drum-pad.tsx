'use client';

import { colorClassMap, shadowClassMap } from './drum-machine.config';
import { TPadColor } from './drum-machine.types';
import { useToneStore } from '@/lib/state-managment/useToneStore';

interface DrumPadProps {
  padConfig: {
    id: string;
    color: TPadColor;
    sample: string;
  };
}

export const DrumPad: React.FC<DrumPadProps> = ({ padConfig }) => {
  const colorClasses = colorClassMap[padConfig.color];
  const shadowClasses = shadowClassMap[padConfig.color];

  const handleDrumPad = useToneStore((state) => state.handleDrumPad);

  return (
    <button
      className={`w-24 h-24 rounded-lg shadow-md transition duration-100 transform active:scale-95 ${colorClasses} 
        relative overflow-hidden focus:outline-none ${shadowClasses} cursor-grab active:cursor-grabbing
        `}
      onClick={() => handleDrumPad(padConfig.id)}
    />
  );
};
