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
};
type Actions = {
  initTone: () => void;
  initDevices: () => void;
  initDrumPadPlayers: () => void;
  handleDrumPad: (player: string) => void;
};

const initialState: State = {
  tone: null,
  dest: null,
  drumPadConfig: defaultDrumPadConfig,
  drumPadPlayers: null
};

export const useToneStore = create<State & Actions>()((set, get) => ({
  ...initialState,
  initTone: () => {
    console.log('init tone');
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
    console.log('init devices');
    get().initDrumPadPlayers();
  },
  initDrumPadPlayers: () => {
    const drumPadConfig = get().drumPadConfig;
    const drumPadPlayersVolume = 5;
    const drumPadPlayers = new Tone.Players(
      drumPadConfig.reduce<Record<string, string>>((acc, pad, index) => {
        acc[`Player${index}`] = pad.sample;
        return acc;
      }, {}),
      {
        volume: drumPadPlayersVolume - 5
      }
    ).toDestination();
    const dest = get().dest;
    drumPadPlayers.connect(dest);
    console.log(drumPadPlayers);
    set({ drumPadPlayers });
  },
  handleDrumPad: (playerNumber) => {
    const drumPadPlayers = get().drumPadPlayers;
    console.log(drumPadPlayers);
    Tone.loaded().then(() => {
      drumPadPlayers.player(`Player${playerNumber}`).start();
    });
  }
}));
