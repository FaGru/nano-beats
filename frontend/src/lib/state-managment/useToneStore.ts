import { create } from 'zustand';
import * as Tone from 'tone';
import { useSequencerStore } from '@/components/sequencer/useSequencerStore';
import { useDrumMachineStore } from '@/components/drum-machine/useDrumMachineStore';

type ToneState = {
  tone: any;
  dest: any;
};

type ToneActions = {
  initTone: () => void;
  handleUserInteraction: () => void;
};

export const useToneStore = create<ToneState & ToneActions>()((set, get) => ({
  tone: null,
  dest: null,
  handleUserInteraction: () => {
    const handleUserInteraction = () => {
      const tone = get().tone;
      const { initSequencer } = useSequencerStore.getState();
      const { initDrumPadPlayers } = useDrumMachineStore.getState();
      if (!tone) {
        get().initTone();
        initSequencer();
        initDrumPadPlayers();
      }
    };
    window.addEventListener('click', handleUserInteraction);
    return () => {
      window.removeEventListener('click', handleUserInteraction);
    };
  },
  initTone: () => {
    const tone = Tone.getContext();
    // @ts-ignore
    tone._latencyHint = 'balanced';
    const dest = tone.createMediaStreamDestination();
    set({ tone, dest });
  }
}));
