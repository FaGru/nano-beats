import { create } from 'zustand';
import * as Tone from 'tone';
import { defaultDrumPadConfig } from '../../components/drum-machine/drum-machine.config';
import { TPadColor } from '../../components/drum-machine/drum-machine.types';
import { useToneStore } from '@/lib/state-managment/useToneStore';

type DrumMachineState = {
  drumPadConfig: {
    id: string;
    color: TPadColor;
    sample: string;
  }[];
  drumPadPlayers: any;
  drumMachineVolume: number;
};

type DrumMachineActions = {
  initDrumPadPlayers: () => void;
  handleDrumPad: (playerNumber: string) => void;
  setDrumMachineVolume: (newVolume: number) => void;
};

export const useDrumMachineStore = create<DrumMachineState & DrumMachineActions>()((set, get) => ({
  drumPadConfig: defaultDrumPadConfig,
  drumPadPlayers: null,
  drumMachineVolume: 0,

  initDrumPadPlayers: () => {
    const { tone } = useToneStore.getState();
    const { initTone } = useToneStore.getState();
    if (!tone) initTone();
    const { dest } = useToneStore.getState();
    const drumPadConfig = get().drumPadConfig;
    const drumMachineVolume = get().drumMachineVolume;

    const drumPadPlayers = new Tone.Players(
      drumPadConfig.reduce<Record<string, string>>((acc, pad, index) => {
        acc[`Player${index}`] = pad.sample;
        return acc;
      }, {}),
      { volume: drumMachineVolume }
    ).toDestination();

    drumPadPlayers.connect(dest);
    set({ drumPadPlayers });
  },

  handleDrumPad: (playerNumber) => {
    const drumPadPlayers = get().drumPadPlayers;
    Tone.loaded().then(() => {
      drumPadPlayers.player(`Player${playerNumber}`).start();
    });
  },

  setDrumMachineVolume: (newVolume) => {
    const drumPadPlayers = get().drumPadPlayers;
    drumPadPlayers.volume.value = newVolume === -18 ? -1000 : newVolume;
    set({ drumMachineVolume: newVolume });
  }
}));
