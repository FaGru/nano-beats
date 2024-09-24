import * as Tone from 'tone';

export type TTrack = {
  id: number;
  name: string;
  player: Tone.Player | null;
  effects: {
    reverb: Tone.Reverb;
    delay: Tone.FeedbackDelay;
    pitchShift: Tone.PitchShift;
    eqThree: Tone.EQ3;
  };
  activeSteps: number[];
};
