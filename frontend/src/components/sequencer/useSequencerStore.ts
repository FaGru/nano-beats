import { create } from 'zustand';
import * as Tone from 'tone';
import { TEffects, TPattern, TSong, TTrack } from './sequencer.types';
import { eqThreeDefaultVolume, sequencerBpmLimits } from './sequencer.constants';
import { nanoid } from 'nanoid';

const defaultPatternId = nanoid();

type SequencerState = {
  sequence: Tone.Sequence | null;
  tracks: TTrack[];
  currentStep: number;
  isPlaying: boolean;
  selectedTrackId: string | null;
  selectedPatternId: string;
  sequencerBpm: number;
  mode: 'pattern' | 'song';
  patterns: TPattern[] | [];
  song: TSong;
  currentSongPattern: number;
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
  addPatternToSong: () => void;
  removePatternFromSong: (patternId: string) => void;
  playSong: () => void;
  updateSongOrder: (newOrder: TSong) => void;
  toggleEffectPower: (trackId: string, effectType: TEffects) => void;
  handleTrackConnection: (track: TTrack) => void;
};

export const useSequencerStore = create<SequencerState & SequencerActions>()((set, get) => ({
  sequence: null,
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
      sequenceStepNumber: Array.from({ length: 16 }, (_, i) => i)
    }
  ],
  song: [],
  currentSongPattern: 0,

  initSequencer: () => {
    const { addTrack } = get();
    for (let i = 0; i < 4; i++) addTrack();
    const sequence = new Tone.Sequence(
      (_, step) => {
        const mode = get().mode;
        const pattern = get().getSelectedPattern();
        set({ currentStep: step });

        if (pattern) {
          pattern.trackTriggers.forEach((trigger) => {
            if (trigger.activeSteps.includes(step)) {
              get().playTrack(trigger.trackId);
            }
          });
        }

        if (mode === 'song') {
          const song = get().song;
          const currentSongPattern = get().currentSongPattern;
          const sequence = get().sequence;

          // set new sequence step length on the first step to ensure that the next pattern starts at the first step
          if (sequence && pattern && step === 0) {
            sequence.events = pattern.sequenceStepNumber;
            set({ sequence });
          }

          if (pattern && sequence && step + 1 === sequence.events.length) {
            // select next pattern at the last step
            if (currentSongPattern + 1 < song.length) {
              const patterns = get().patterns;
              const newPattern = patterns.find(
                (pattern) => pattern.id === song[currentSongPattern + 1].patternId
              );
              if (newPattern) {
                set({ selectedPatternId: newPattern.id });
                set({ currentSongPattern: currentSongPattern + 1 });
              }
            }
            // stop at the last step of the last pattern and reset values
            else {
              get().startStopSequencer();
              set({ isPlaying: false, currentStep: 0, currentSongPattern: 0 });
            }
          }
        }
      },
      Array.from({ length: 16 }, (_, i) => i),
      '16n'
    );
    sequence.start(0);
    const tracks = get().tracks;
    set({ sequence, selectedTrackId: tracks[0].id });
  },
  updateStepLength: (newStepLength) => {
    const pattern = get().getSelectedPattern();
    const sequence = get().sequence;
    if (pattern && sequence) {
      pattern.sequenceStepNumber = newStepLength;
      sequence.events = newStepLength;
      set({ sequence });
      get().updatePattern(pattern);
    }
  },

  startStopSequencer: () => {
    const { isPlaying } = get();
    if (!isPlaying) {
      Tone.getTransport().start();
      set({ isPlaying: true });
    } else {
      Tone.getTransport().pause();
      Tone.getTransport().position = 0;
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

  addTrack: () => {
    const tracks = get().tracks;
    const tracksLength = tracks.length;
    const patterns = get().patterns;
    const newTrack = {
      id: nanoid(),
      name: `Track ${tracksLength + 1}`,
      player: null,
      effects: {
        reverb: new Tone.Reverb(),
        delay: new Tone.FeedbackDelay(),
        pitchShift: new Tone.PitchShift(),
        eqThree: new Tone.EQ3(eqThreeDefaultVolume, eqThreeDefaultVolume, eqThreeDefaultVolume),
        distortion: new Tone.Distortion()
      },
      connectedEffects: [],
      wavesurfer: null,
      playerStartTime: 0,
      initWaveform: true
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

    const setBufferLoaded = () => {
      const selectedTrack = get().getSelectedTrack();
      if (selectedTrack) {
        selectedTrack.initWaveform = true;
        get().updateTrack(selectedTrack);
      }
    };

    if (track) {
      if (!track.player) {
        const player = new Tone.Player(sampleUrl, setBufferLoaded).connect(Tone.getDestination());
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
      track.player.start(0, track.playerStartTime);
    }
  },
  selectTrack: (trackId) => {
    set({ selectedTrackId: trackId });
  },
  setMode: (newMode) => {
    const isPlaying = get().isPlaying;
    if (isPlaying) get().startStopSequencer();
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
        sequencerStepNumber:
          Array.from({ length: 16 }, (_, i) => i) || currentPattern.sequenceStepNumber
      };

      set({
        patterns: [...get().patterns, newPattern],
        selectedPatternId: newPattern.id
      });
    }
  },
  setSelectedPatternId: (patternId) => {
    set({ selectedPatternId: patternId });
    const sequence = get().sequence;
    const selectedPattern = get().getSelectedPattern();
    if (selectedPattern && sequence) {
      sequence.events = selectedPattern.sequenceStepNumber;
      set({ sequence });
    }
  },

  getSelectedPattern: () => {
    const patternId = get().selectedPatternId;
    return get().patterns.find((pattern) => pattern.id === patternId);
  },
  getSelectedTrack: () => {
    const trackId = get().selectedTrackId;
    return get().tracks.find((track) => track.id === trackId);
  },

  addPatternToSong: () => {
    const selectedPattern = get().getSelectedPattern();
    if (selectedPattern) {
      set((state) => ({
        song: [
          ...state.song,
          { patternId: selectedPattern?.id, patternName: selectedPattern.name, id: nanoid() }
        ]
      }));
    }
  },
  removePatternFromSong: (id) => {
    set((state) => ({
      song: state.song.filter((pattern) => pattern.id !== id)
    }));
  },
  updateSongOrder: (newOrder) => set({ song: newOrder }),
  playSong: () => {
    const song = get().song;
    if (song.length) {
      get().setSelectedPatternId(song[0].patternId);
      set({ currentSongPattern: 0 });
      get().startStopSequencer();
    }
  },
  toggleEffectPower: (trackId, effectType) => {
    const track = get().tracks.find((track) => track.id === trackId);
    if (track) {
      if (track.connectedEffects.includes(effectType)) {
        track.connectedEffects = track.connectedEffects.filter((effect) => effect !== effectType);
      } else {
        track.connectedEffects = [...track.connectedEffects, effectType];
      }

      get().handleTrackConnection(track);
    }
  },
  handleTrackConnection: (track) => {
    track.player?.disconnect();

    // disconnect all effects
    Object.keys(track.effects).forEach((effect) => {
      track.effects[effect as TEffects].disconnect();
    });

    track.connectedEffects.forEach((effectType, idx) => {
      // connect player to first effect
      if (idx === 0) {
        track.player?.connect(track.effects[effectType as TEffects]);
      }
      // connect last effect to next effect
      else {
        track.effects[track.connectedEffects[idx - 1] as TEffects].connect(
          track.effects[effectType as TEffects]
        );
      }
      // connect last effect to destination
      if (idx + 1 === track.connectedEffects.length) {
        track.effects[effectType as TEffects].connect(Tone.getDestination());
      }
    });

    // no effects => connect player to destination
    if (!track.connectedEffects.length) {
      track.player?.connect(Tone.getDestination());
    }
    get().updateTrack(track);
  }
}));
