import * as Tone from 'tone';

export type TDJDeck = {
  id: number;
  player: Tone.Player;
  highpassFilter: Tone.Filter;
  lowpassFilter: Tone.Filter;
  eqThree: Tone.EQ3;
  sample: string;
};

export type TDJMixer = {
  crossFader: Tone.CrossFade;
};
