import { create } from 'zustand';
import * as Tone from 'tone';
import { TPattern, TSong, TTrack } from './sequencer.types';
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
  song: TSong;
  playedSongPatterns: number;
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
  addSequence: (sequenceLength: number) => Tone.Sequence;
  addPatternToSong: () => void;
  removePatternFromSong: (patternId: string) => void;
  playSong: () => void;
  updateSongOrder: (newOrder: TSong) => void;
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
  playedSongPatterns: 0,
  currentSongPattern: 0,

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
        const mode = get().mode;
        const pattern = get().getSelectedPattern();

        console.log('####### START OF STEP #######');
        console.log('--- step: ', step, ' ---');

        if (pattern && mode === 'pattern') {
          set({ currentStep: step });
          pattern.trackTriggers.forEach((trigger) => {
            if (trigger.activeSteps.includes(step)) {
              get().playTrack(trigger.trackId);
            }
          });
        }

        if (mode === 'song') {
          // set({ currentStep: step });
          const song = get().song;
          const playedSongPatterns = get().playedSongPatterns;
          const currentSongPattern = get().currentSongPattern;

          if (pattern && pattern.sequence) {
            // stop song after last pattern
            if (playedSongPatterns === song.length) {
              console.log('--- SONG END -> stop song and reset values ---');
              pattern.sequence.stop();
              set({ isPlaying: false, currentStep: 0, playedSongPatterns: 0 });
            }

            // update played patterns after last pattern step
            if (step + 1 === pattern.sequence.events.length) {
              console.log('--- PATTERN END -> set played songs +1 ---');
              set({ playedSongPatterns: playedSongPatterns + 1 });
            }

            // select next pattern and play active tracks of the new pattern (not of the previous pattern)
            if (currentSongPattern < playedSongPatterns && playedSongPatterns < song.length) {
              console.log(`--- song pattern is played -> select new and start  ---`);
              const patterns = get().patterns;
              const newPattern = patterns.find(
                (pattern) => pattern.id === song[playedSongPatterns].patternId
              );
              if (newPattern) {
                pattern.sequence.stop();
                set({ selectedPatternId: newPattern.id });
                const newSelectedPattern = get().getSelectedPattern();
                if (newSelectedPattern && newSelectedPattern.sequence) {
                  newSelectedPattern.sequence.start();
                  set({ currentSongPattern: currentSongPattern + 1 });
                  // set({ currentStep: step });
                  // newPattern.trackTriggers.forEach((trigger) => {
                  //   if (trigger.activeSteps.includes(step)) {
                  //     get().playTrack(trigger.trackId);
                  //   }
                  // });
                }
              }
            } else {
              // play active tracks of the current pattern if no new pattern needs to be set
              console.log(`--- play tracks of step ${step}  ---`);
              set({ currentStep: step });
              pattern.trackTriggers.forEach((trigger) => {
                if (trigger.activeSteps.includes(step)) {
                  get().playTrack(trigger.trackId);
                }
              });
            }
            // console.log('--- END OF STEP ---');
            // console.log('##################################');
          }
        }
      },
      Array.from({ length: sequenceLength }, (_, i) => i),
      '16n'
    );
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
      set({ selectedPatternId: song[0].patternId, currentSongPattern: 0 });
      get().startStopSequencer();
    }
  }
}));
