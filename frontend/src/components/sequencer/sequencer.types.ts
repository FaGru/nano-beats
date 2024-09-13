import * as Tone from 'tone';

export type TTrack = {
  id: number;
  name: string;
  player: Tone.Player | null;
  volume: number;
  effects: {
    reverb: Tone.Reverb;
    delay: Tone.FeedbackDelay;
    pitchShift: Tone.PitchShift;
  };
  activeSteps: number[];
};
