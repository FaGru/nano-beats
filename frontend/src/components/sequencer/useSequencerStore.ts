import { create } from 'zustand';
import * as Tone from 'tone';
import { TPattern, TTrack } from './sequencer.types';
import { eqThreeDefaultVolume, sequencerBpmLimits } from './sequencer.constants';
import { nanoid } from 'nanoid';

const defaultPatternId = nanoid();

type SequencerState = {
  tracks: TTrack[];
  currentStep: number;
  isPlaying: boolean;
  selectedTrackId: string | null;
  selectedPatternId: string;
  sequencerBpm: number;
  mode: 'pattern' | 'song';
  patterns: TPattern[] | [];
  song: string[] | [];
};

type SequencerActions = {
  initSequencer: () => void;
  startStopSequencer: () => void;
  addTrack: () => void;
  updateTrackSample: (sampleUrl: string, trackId: string, trackName: string) => void;
  updateStepTrigger: (trackId: string, currentStep: number) => void;
  updateTrack: (updatedTrack: TTrack) => void;
  playTrack: (trackId: string) => void;
  selectTrack: (trackId: string) => void;
  setSequencerBpm: (updateValue: number) => void;
  updateStepLength: (newStepLength: number[]) => void;
  setMode: (mode: 'pattern' | 'song') => void;
  addPattern: () => void;
  setSelectedPatternId: (patternId: string) => void;
  updatePattern: (updatedPattern: TPattern) => void;
  getSelectedPattern: () => TPattern | undefined;
  getSelectedTrack: () => TTrack | undefined;
  addSequence: (sequenceLength: number) => Tone.Sequence;
};

export const useSequencerStore = create<SequencerState & SequencerActions>()((set, get) => ({
  tracks: [],
  currentStep: 0,
  isPlaying: false,
  selectedTrackId: null,
  selectedPatternId: defaultPatternId,
  sequencerBpm: 120,
  mode: 'pattern',
  patterns: [
    {
      trackTriggers: [],
      name: 'pattern 1',
      id: defaultPatternId,
      sequence: null
    }
  ],
  song: [],

  initSequencer: () => {
    const { addTrack } = get();
    for (let i = 0; i < 4; i++) addTrack();

    const pattern = get().getSelectedPattern();
    if (pattern) {
      pattern.sequence = get().addSequence(16);

      get().updatePattern(pattern);
      Tone.getTransport().start();
    }
  },
  updateStepLength: (newStepLength: any) => {
    const pattern = get().getSelectedPattern();
    if (pattern && pattern.sequence) {
      pattern.sequence.events = newStepLength;
      get().updatePattern(pattern);
    }
  },

  startStopSequencer: () => {
    const { isPlaying } = get();
    const pattern = get().getSelectedPattern();
    if (pattern && pattern.sequence) {
      if (!isPlaying) {
        pattern.sequence.start();
        set({ isPlaying: true });
      } else {
        pattern.sequence.stop();
        set({ isPlaying: false, currentStep: 0 });
      }
      get().updatePattern(pattern);
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

  addTrack: () => {
    const tracks = get().tracks;
    const tracksLength = tracks.length;
    const patterns = get().patterns;
    const newTrack = {
      id: nanoid(),
      name: `Track ${tracksLength + 1}`,
      player: null,
      effects: {
        reverb: new Tone.Reverb().toDestination(),
        delay: new Tone.FeedbackDelay().toDestination(),
        pitchShift: new Tone.PitchShift().toDestination(),
        eqThree: new Tone.EQ3(eqThreeDefaultVolume, eqThreeDefaultVolume, eqThreeDefaultVolume)
      }
    };
    set({
      tracks: [...tracks, newTrack],
      patterns: patterns.map((pattern) => ({
        ...pattern,
        trackTriggers: [...pattern.trackTriggers, { trackId: newTrack.id, activeSteps: [] }]
      }))
    });
  },
  updateTrackSample: (sampleUrl, trackId, trackName) => {
    const tracks = get().tracks;
    const track = tracks.find((track) => track.id === trackId);

    if (track) {
      if (!track.player) {
        const player = new Tone.Player().toDestination();
        player.load(sampleUrl);
        player.chain(track.effects.eqThree, Tone.getDestination());
        const updatedTrack = { ...track, player, name: trackName };
        get().updateTrack(updatedTrack);
      }
      if (track.player) {
        track.player.load(sampleUrl);
        const updatedTrack = { ...track, name: trackName };
        get().updateTrack(updatedTrack);
      }
    }
  },

  updateStepTrigger: (trackId, currentStep) => {
    const pattern = get().getSelectedPattern();
    if (pattern) {
      const trackTriggers = pattern.trackTriggers;
      const track = trackTriggers.find((trigger) => trigger.trackId === trackId);
      if (track) {
        let activeSteps = track.activeSteps;
        if (activeSteps.includes(currentStep)) {
          activeSteps = activeSteps.filter((step) => step !== currentStep);
        } else {
          activeSteps = [...activeSteps, currentStep];
        }
        const updatedPattern = {
          ...pattern,
          trackTriggers: pattern.trackTriggers.map((trigger) =>
            trigger.trackId === trackId ? { ...trigger, activeSteps } : trigger
          )
        };
        get().updatePattern(updatedPattern);
      }
    }
  },

  updateTrack: (updatedTrack) => {
    const tracks = get().tracks;
    set({
      tracks: tracks.map((track) => (track.id === updatedTrack.id ? updatedTrack : track))
    });
  },
  updatePattern: (updatedPattern) => {
    const allPatterns = get().patterns;
    set({
      patterns: allPatterns.map((pattern) =>
        pattern.id === updatedPattern.id ? updatedPattern : pattern
      )
    });
  },

  playTrack: (trackId) => {
    const tracks = get().tracks;
    const track = tracks.find((track) => track.id === trackId);
    if (track && track.player && track.player.loaded) {
      track.player.start();
    }
  },
  selectTrack: (trackId) => {
    set({ selectedTrackId: trackId });
  },
  setMode: (newMode) => {
    set({ mode: newMode });
  },
  addPattern: () => {
    const currentPattern = get().getSelectedPattern();
    const patterns = get().patterns;
    if (currentPattern) {
      const newPattern = {
        ...currentPattern,
        name: `pattern ${patterns.length + 1}`,
        id: nanoid(),
        sequence: get().addSequence(currentPattern?.sequence?.events.length || 16)
      };

      set({
        patterns: [...get().patterns, newPattern],
        selectedPatternId: newPattern.id
      });
    }
  },
  setSelectedPatternId: (patternId) => {
    const isPlaying = get().isPlaying;
    if (isPlaying) get().startStopSequencer();
    set({ selectedPatternId: patternId });
    if (isPlaying) get().startStopSequencer();
  },

  getSelectedPattern: () => {
    const patternId = get().selectedPatternId;
    return get().patterns.find((pattern) => pattern.id === patternId);
  },
  getSelectedTrack: () => {
    const selectedTrackId = get().selectedTrackId;
    return get().tracks.find((track) => track.id === selectedTrackId);
  },
  addSequence: (sequenceLength) => {
    return new Tone.Sequence(
      (_, step) => {
        const pattern = get().getSelectedPattern();
        if (pattern) {
          set({ currentStep: step });
          pattern.trackTriggers.forEach((trigger) => {
            if (trigger.activeSteps.includes(step)) {
              get().playTrack(trigger.trackId);
            }
          });
        }
      },
      Array.from({ length: sequenceLength }, (_, i) => i),
      '16n'
    );
  }
}));
