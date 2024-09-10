import { TPadColor } from './drum-machine.types';

export const defaultDrumPadConfig: {
  id: string;
  color: TPadColor;
  sample: string;
}[] = [
  { id: '0', color: 'yellow', sample: './assets/audio/Samples/Scratch1.wav' },
  { id: '1', color: 'red', sample: './assets/audio/Samples/Horn1.mp3' },
  { id: '2', color: 'purple', sample: './assets/audio/Samples/SynthShot-1.wav' },
  { id: '3', color: 'yellow', sample: './assets/audio/Samples/CongaFinger.wav' },
  { id: '4', color: 'purple', sample: './assets/audio/Samples/BassShot3.wav' },
  { id: '5', color: 'purple', sample: './assets/audio/Samples/BassShot2.wav' },
  { id: '6', color: 'green', sample: './assets/audio/Samples/Clap1.wav' },
  { id: '7', color: 'blue', sample: './assets/audio/Samples/Brass1.wav' },
  { id: '8', color: 'blue', sample: './assets/audio/Samples/Brass2.wav' },
  { id: '9', color: 'green', sample: './assets/audio/Samples/Kick1.wav' },
  { id: '10', color: 'green', sample: './assets/audio/Samples/Snare1.wav' },
  { id: '11', color: 'orange', sample: './assets/audio/Samples/Vocal1.wav' },
  { id: '12', color: 'blue', sample: './assets/audio/Samples/Brass1.wav' },
  { id: '13', color: 'green', sample: './assets/audio/Samples/Kick1.wav' },
  { id: '14', color: 'green', sample: './assets/audio/Samples/Snare1.wav' },
  { id: '15', color: 'orange', sample: './assets/audio/Samples/Vocal1.wav' }
];

export const colorClassMap = {
  yellow: 'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-400',
  red: 'bg-rose-800 hover:bg-rose-900 active:bg-rose-700',
  purple: 'bg-fuchsia-800 hover:bg-fuchsia-900 active:bg-fuchsia-700',
  green: 'bg-lime-600 hover:bg-lime-700 active:bg-lime-500',
  blue: 'bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-400',
  orange: 'bg-orange-600 hover:bg-orange-700 active:bg-orange-500'
};

export const shadowClassMap = {
  yellow:
    'shadow-[inset_0_0_32px_2px] shadow-yellow-300 hover:shadow-yellow-400 active:shadow-[0_0_6px_2px] active:shadow-yellow-300',
  red: 'shadow-[inset_0_0_32px_2px] shadow-rose-600 hover:shadow-rose-700 active:shadow-[0_0_6px_2px] active:shadow-rose-600',
  purple:
    'shadow-[inset_0_0_32px_2px] shadow-fuchsia-600 hover:shadow-fuchsia-700 active:shadow-[0_0_6px_2px] active:shadow-fuchsia-600',
  green:
    'shadow-[inset_0_0_32px_2px] shadow-lime-400 hover:shadow-lime-500 active:shadow-[0_0_6px_2px] active:shadow-lime-400',
  blue: 'shadow-[inset_0_0_32px_2px] shadow-cyan-300 hover:shadow-cyan-400 active:shadow-[0_0_6px_2px] active:shadow-cyan-300',
  orange:
    'shadow-[inset_0_0_32px_2px] shadow-orange-400 hover:shadow-orange-500 active:shadow-[0_0_6px_2px] active:shadow-orange-400'
};
