import { create } from 'zustand';
import * as Tone from 'tone';
import { useToneStore } from '@/lib/state-managment/useToneStore';
import { TTrack } from './sequencer.types';
import { eqThreeDefaultVolume, sequencerBpmLimits } from './sequencer.constants';

type SequencerState = {
  sequencer: Tone.Sequence | null;
  tracks: TTrack[];
  steps: number[];
  currentStep: number;
  isPlaying: boolean;
  selectedTrackId: number | null;
  sequencerBpm: number;
  mode: 'pattern' | 'song';
  song: { patternName: string; patternTracks: TTrack[] }[] | [];
};

type SequencerActions = {
  initSequencer: () => void;
  startStopSequencer: () => void;

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
  updateTrack: (trackId: number, updatedTrack: TTrack) => void;
  playTrack: (trackId: number) => void;
  selectTrack: (trackId: number) => void;
  setSequencerBpm: (updateValue: number) => void;
  updateStepLength: (newStepLength: number[]) => void;
  setMode: (mode: 'pattern' | 'song') => void;
};

export const useSequencerStore = create<SequencerState & SequencerActions>()((set, get) => ({
  sequencer: null,
  tracks: [],
  steps: Array.from({ length: 16 }, (_, i) => i + 1),
  currentStep: 0,
  isPlaying: false,
  selectedTrackId: null,
  sequencerBpm: 120,
  mode: 'pattern',
  song: [],

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
    const { steps } = get();

    const sequencer = new Tone.Sequence(
      (_, step) => {
        const { tracks } = get();
        set({ currentStep: step });
        tracks.forEach((track) => {
          if (track.activeSteps.includes(step)) {
            get().playTrack(track.id);
          }
        });
      },
      steps,
      '16n'
    );

    Tone.getTransport().start();
    set({ sequencer });
  },
  updateStepLength: (newStepLength: any) => {
    const sequencer = get().sequencer;
    if (sequencer) sequencer.events = newStepLength;
    set({ steps: newStepLength, sequencer });
  },

  startStopSequencer: () => {
    const { isPlaying } = get();

    const { sequencer } = get();

    if (!isPlaying) {
      // Tone.getTransport().start();
      sequencer?.start();
      set({ isPlaying: true });
    } else {
      sequencer?.stop();
      // Tone.getTransport().stop();

      set({ isPlaying: false, currentStep: 0 });
    }
  },

  setSequencerBpm: (updateValue) => {
    const sequencerBpm = get().sequencerBpm;
    let newValue = sequencerBpm + updateValue / 10;
    if (newValue < sequencerBpmLimits.min) {
      newValue = sequencerBpmLimits.min;
    } else if (newValue > sequencerBpmLimits.max) {
      newValue = sequencerBpmLimits.max;
    }
    Tone.getTransport().bpm.value = newValue;
    set({ sequencerBpm: newValue });
  },

  addTrack: ({ trackId }) => {
    set((state) => ({
      tracks: [
        ...state.tracks,
        {
          id: trackId,
          name: `Track ${trackId + 1}`,
          player: null,
          effects: {
            reverb: new Tone.Reverb().toDestination(),
            delay: new Tone.FeedbackDelay().toDestination(),
            pitchShift: new Tone.PitchShift().toDestination(),
            eqThree: new Tone.EQ3(eqThreeDefaultVolume, eqThreeDefaultVolume, eqThreeDefaultVolume)
          },
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
        player.chain(track.effects.eqThree, Tone.getDestination());
        Tone.getTransport().start();

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

  updateTrack: (trackId, updatedTrack) => {
    const track = get().tracks.find((track) => track.id === trackId);
    if (track) {
      set((state) => ({
        tracks: state.tracks.map((track) => (track.id === trackId ? updatedTrack : track))
      }));
    }
  },

  playTrack: (trackId) => {
    const track = get().tracks.find((track) => track.id === trackId);
    if (track && track.player && track.player.loaded) {
      track.player.start();
    }
  },
  selectTrack: (trackId) => {
    set({ selectedTrackId: trackId });
  },
  setMode: (newMode) => {
    set({ mode: newMode });
  }
}));
