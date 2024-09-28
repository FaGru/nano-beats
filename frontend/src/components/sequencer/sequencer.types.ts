import * as Tone from 'tone';

export type TTrack = {
  id: string;
  name: string;
  player: Tone.Player | null;
  effects: {
    reverb: Tone.Reverb;
    delay: Tone.FeedbackDelay;
    pitchShift: Tone.PitchShift;
    eqThree: Tone.EQ3;
  };
  connectedEffects: string[];
};

export type TPattern = {
  trackTriggers: { trackId: string; activeSteps: number[] }[];
  name: string;
  id: string;
  sequenceStepNumber: number[];
};

export type TSong = { id: string; patternName: string; patternId: string }[];

export type TEffects = 'reverb' | 'delay' | 'pitchShift' | 'eqThree';
