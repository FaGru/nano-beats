import { create } from 'zustand';
import * as Tone from 'tone';

type ToneState = {
  tone: any;
  dest: any;
};

type ToneActions = {
  initTone: () => void;
};

export const useToneStore = create<ToneState & ToneActions>()((set, get) => ({
  tone: null,
  dest: null,

  initTone: () => {
    const tone = Tone.getContext();
    // @ts-ignore
    tone._latencyHint = 'balanced';
    const dest = tone.createMediaStreamDestination();
    set({ tone, dest });
  }
}));
