import { create } from 'zustand';
import * as Tone from 'tone';
import { useToneStore } from '@/lib/state-managment/useToneStore';
import { TTrack } from './sequencer.types';

type SequencerState = {
  sequencer: Tone.Sequence | null;
  tracks: TTrack[];
  steps: number[];
  currentStep: number;
  isPlaying: boolean;
  startStep: number;
  selectedTrackId: number | null;
  sequencerBpm: number;
};

type SequencerActions = {
  initSequencer: () => void;
  startStopSequencer: () => void;
  updateStartStep: (step: number) => void;
  addTrack: ({
    trackId,
    name,
    sampleUrl
  }: {
    trackId: number;
    name?: string;
    sampleUrl?: string;
  }) => void;
  removeTrack: (trackId: number) => void;
  updateTrackSample: (sampleUrl: string, trackId: number, trackName: string) => void;
  updateTrackStep: (trackId: number, currentStep: number) => void;
  updateTrackVolume: (trackId: number, volume: number) => void;
  updateTrackEffect: (
    trackId: number,
    effectType: 'reverb' | 'delay' | 'pitchShift',
    effectSettings: any
  ) => void;
  playTrack: (trackId: number) => void;
  selectTrack: (trackId: number | null) => void;
  setSequencerBpm: (newBpm: number) => void;
  updateStepLength: (newStepLength: number[]) => void;
};

export const useSequencerStore = create<SequencerState & SequencerActions>()((set, get) => ({
  sequencer: null,
  tracks: [],
  steps: Array.from({ length: 16 }, (_, i) => i + 1),
  currentStep: 0,
  isPlaying: false,
  startStep: 0,
  selectedTrackId: null,
  sequencerBpm: 120,

  initSequencer: () => {
    const { addTrack } = get();
    for (let i = 0; i < 4; i++) addTrack({ trackId: i, name: `Track ${i}` });

    // Tone.getTransport().scheduleRepeat(() => {
    //   const { currentStep, tracks } = get();
    //   set({ currentStep: (currentStep + 1) % get().steps.length });

    //   tracks.forEach((track) => {
    //     if (track.activeSteps.includes(currentStep)) {
    //       get().playTrack(track.id);
    //     }
    //   });
    // }, '16n');

    const sequencer = new Tone.Sequence(
      (_, step) => {
        const { currentStep, tracks } = get();
        set({ currentStep: step });
        tracks.forEach((track) => {
          if (track.activeSteps.includes(currentStep)) {
            get().playTrack(track.id);
          }
        });
      },
      Array.from({ length: 16 }, (_, i) => i + 1), // Steps
      '16n' // Step Duration
    );

    Tone.getTransport().start();
    set({ sequencer });
  },
  updateStepLength: (newStepLength: any) => {
    set({ steps: newStepLength });
  },

  startStopSequencer: () => {
    const { isPlaying } = get();
    const { startStep } = get();
    const { sequencer } = get();

    if (!isPlaying) {
      // Tone.getTransport().start();
      sequencer?.start();
      set({ isPlaying: true });
    } else {
      sequencer?.stop();
      // Tone.getTransport().stop();

      set({ isPlaying: false, currentStep: startStep });
    }
  },

  updateStartStep: (step) => {
    set({ currentStep: step, startStep: step });
  },

  setSequencerBpm: (newBpm) => {
    Tone.getTransport().bpm.value = newBpm;
    set({ sequencerBpm: newBpm });
  },

  addTrack: ({ trackId }) => {
    set((state) => ({
      tracks: [
        ...state.tracks,
        {
          id: trackId,
          name: `Track ${trackId + 1}`,
          player: null,
          volume: 0,
          // effects: {
          //   // reverb: new Tone.Reverb().toDestination(),
          //   // delay: new Tone.FeedbackDelay().toDestination(),
          //   // pitchShift: new Tone.PitchShift().toDestination()
          // },
          activeSteps: []
        }
      ]
    }));
  },
  updateTrackSample: (sampleUrl, trackId, trackName) => {
    const tracks = get().tracks;
    const track = tracks.find((track) => track.id === trackId);

    if (track) {
      if (!track.player) {
        const player = new Tone.Player().toDestination();
        player.load(sampleUrl);
        set((state) => ({
          tracks: state.tracks.map((track) =>
            track.id === trackId ? { ...track, player, name: trackName } : track
          )
        }));
      }
      if (track.player) {
        track.player.load(sampleUrl);
        set((state) => ({
          tracks: state.tracks.map((track) =>
            track.id === trackId ? { ...track, name: trackName } : track
          )
        }));
      }
    }
  },

  updateTrackStep: (trackId, currentStep) => {
    const tracks = get().tracks;
    const track = tracks.find((track) => track.id === trackId);
    if (track) {
      let activeSteps = track.activeSteps;
      if (activeSteps.includes(currentStep)) {
        activeSteps = activeSteps.filter((step) => step !== currentStep);
      } else {
        activeSteps = [...activeSteps, currentStep];
      }
      set((state) => ({
        tracks: state.tracks.map((track) =>
          track.id === trackId ? { ...track, activeSteps } : track
        )
      }));
    }
  },

  removeTrack: (trackId) => {
    set((state) => ({
      tracks: state.tracks.filter((track) => track.id !== trackId)
    }));
  },

  updateTrackVolume: (trackId, volume) => {
    const track = get().tracks.find((track) => track.id === trackId);
    if (track && track.player) {
      track.player.volume.value = volume;
      set((state) => ({
        tracks: state.tracks.map((track) => (track.id === trackId ? { ...track, volume } : track))
      }));
    }
  },

  updateTrackEffect: (trackId, effectType, effectSettings) => {
    const track = get().tracks.find((track) => track.id === trackId);
    // if (track) {
    //   const effect = track.effects[effectType];
    //   if (effect) {
    //     Object.assign(effect, effectSettings);
    //   }
    // }
  },

  playTrack: (trackId) => {
    const track = get().tracks.find((track) => track.id === trackId);
    if (track && track.player && track.player.loaded) {
      track.player.start();
    }
  },
  selectTrack: (trackId) => {
    set({ selectedTrackId: trackId });
  }
}));
