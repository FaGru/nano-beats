'use client';

import {
  colorClassMap,
  colorClassMapActive,
  shadowClassMap,
  shadowClassMapActive
} from './drum-machine.config';
import { TPadConfig } from './drum-machine.types';
import { useDrumMachineStore } from './useDrumMachineStore';

interface DrumPadProps {
  padConfig: TPadConfig;
  isKeyDownActive: boolean;
}

export const DrumPad: React.FC<DrumPadProps> = ({ padConfig, isKeyDownActive }) => {
  const colorClasses = colorClassMap[padConfig.color];
  const shadowClasses = shadowClassMap[padConfig.color];
  const colorClassesActive = colorClassMapActive[padConfig.color];
  const shadowClassesActive = shadowClassMapActive[padConfig.color];

  const handleDrumPad = useDrumMachineStore((state) => state.handleDrumPad);
  const drumpadPlayers = useDrumMachineStore((state) => state.drumPadPlayers);

  return (
    <button
      className={`w-24 h-24 rounded-lg shadow-md transition duration-100 transform active:scale-95 ${isKeyDownActive ? colorClassesActive : colorClasses} 
        relative overflow-hidden focus:outline-none ${isKeyDownActive ? shadowClassesActive : shadowClasses} cursor-grab active:cursor-grabbing
        `}
      onClick={() => handleDrumPad(padConfig.id)}
      disabled={!drumpadPlayers}
    />
  );
};
