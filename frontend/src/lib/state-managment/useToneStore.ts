import { create } from 'zustand';

import { defaultDrumPadConfig } from '../../components/drum-machine/drum-machine.config';
import { TPadColor } from '../../components/drum-machine/drum-machine.types';
import * as Tone from 'tone';

type State = {
  tone: any;
  dest: any;
  drumPadConfig: {
    id: string;
    color: TPadColor;
    sample: string;
  }[];
  drumPadPlayers: any;
  drumMachineVolume: number;
};
type Actions = {
  initTone: () => void;
  initDevices: () => void;
  initDrumPadPlayers: () => void;
  handleDrumPad: (player: string) => void;
  setDrumMachineVolume: (volume: number) => void;
};

const initialState: State = {
  tone: null,
  dest: null,
  drumPadConfig: defaultDrumPadConfig,
  drumPadPlayers: null,
  drumMachineVolume: 0
};

export const useToneStore = create<State & Actions>()((set, get) => ({
  ...initialState,
  initTone: () => {
    const tone = Tone.getContext();
    // @ts-ignore
    tone._latencyHint = 'balanced';
    const dest = tone.createMediaStreamDestination();
    // const recorder = new MediaRecorder(dest.stream);
    set({
      tone,
      dest
      //  ,recorder
    });
    get().initDevices();
  },
  initDevices: () => {
    get().initDrumPadPlayers();
  },
  initDrumPadPlayers: () => {
    const drumPadConfig = get().drumPadConfig;
    const drumMachineVolume = get().drumMachineVolume;
    const drumPadPlayers = new Tone.Players(
      drumPadConfig.reduce<Record<string, string>>((acc, pad, index) => {
        acc[`Player${index}`] = pad.sample;
        return acc;
      }, {}),
      {
        volume: drumMachineVolume
      }
    ).toDestination();
    const dest = get().dest;
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
