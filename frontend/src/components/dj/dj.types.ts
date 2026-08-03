import * as Tone from 'tone';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js';

export type TDJDeck = {
  id: number;
  player: Tone.Player;
  // player: Tone.GrainPlayer;
  highpassFilter: Tone.Filter;
  lowpassFilter: Tone.Filter;
  eqThree: Tone.EQ3;
  sample: string;
  cuePoint: number;
  initWavesurfer: boolean;
  wavesurfer: WaveSurfer | null;
  regions: RegionsPlugin | null;
  defaultBPM: number | null;
  shiftActive: boolean;
};

export type TDJMixer = {
  crossFader: Tone.CrossFade;
  masterGain: Tone.Gain;
};
