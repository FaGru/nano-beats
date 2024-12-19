import { create } from 'zustand';
import * as Tone from 'tone';
import { TDJDeck, TDJMixer } from './dj.types';
import { crossFaderDefault, eqDefault, gainDefault } from './dj.constants';

type DrumMachineState = {
  faderPosition: number;
  djDecks: TDJDeck[];
  currentFiles: any[];
  djMixer: TDJMixer;
};

type DrumMachineActions = {
  initDJTable: () => void;
  updateDJDeck: (updatedDeck: TDJDeck) => void;
  setCurrentFiles: (files: any[]) => void;
  updateDJMixer: (newMixerSettings: TDJMixer) => void;
};

export const useDJStore = create<DrumMachineState & DrumMachineActions>()((set, get) => ({
  faderPosition: 63.5,
  djDecks: [],
  currentFiles: [],
  djMixer: {
    crossFader: new Tone.CrossFade(crossFaderDefault),
    masterGain: new Tone.Gain(gainDefault).toDestination()
  },

  initDJTable: () => {
    for (let i = 1; i < 3; i++) {
      const sample = 'https://tonejs.github.io/audio/berklee/gong_1.mp3';

      const { crossFader, masterGain } = get().djMixer;
      crossFader.connect(masterGain);
      const highpassFilter = new Tone.Filter({
        frequency: 0,
        type: 'highpass'
      }).connect(i === 1 ? crossFader.a : crossFader.b);
      const lowpassFilter = new Tone.Filter({
        frequency: 22000,
        type: 'lowpass'
      }).connect(highpassFilter);

      const eqThree = new Tone.EQ3(eqDefault, eqDefault, eqDefault).connect(lowpassFilter);

      const djPlayer = new Tone.Player('https://tonejs.github.io/audio/berklee/gong_1.mp3').connect(
        eqThree
      );

      const djDecks = get().djDecks;

      const deck = {
        id: i,
        player: djPlayer,
        highpassFilter,
        lowpassFilter,
        eqThree,
        sample,
        cuePoint: 0,
        wavesurfer: null,
        initWavesurfer: false,
        regions: null,
        defaultBPM: null,
        shiftActive: false
      };

      set({
        djDecks: [...djDecks, deck]
      });
    }
  },

  updateDJDeck: (updatedDeck) => {
    const allDecks = get().djDecks;
    set({
      djDecks: allDecks.map((deck) => (deck.id === updatedDeck.id ? updatedDeck : deck))
    });
  },
  updateDJMixer: (newMixerSettings) => {
    const allDecks = get().djDecks;
    set({ djMixer: newMixerSettings, djDecks: allDecks });
  },
  setCurrentFiles: (files) => {
    set({ currentFiles: files });
  }
}));
