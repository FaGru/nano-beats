import { CONFIG } from '@/lib/config/config';

export const navigationConfig = [
  {
    type: 'header',
    name: 'Devices',
    childs: [
      { name: 'Drum Machine', pathname: CONFIG.CLIENT.DRUM_MACHINE, icon: 'drum-machine' },
      { name: 'DJing', pathname: CONFIG.CLIENT.DJ, icon: 'dj' },
      { name: 'Sequencer', pathname: CONFIG.CLIENT.SEQUENCER, icon: 'sequencer' }
    ]
  }
];
