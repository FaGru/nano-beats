import { Disc3 } from 'lucide-react';

export const navigationConfig = [
  {
    type: 'header',
    name: 'Devices',
    childs: [
      { name: 'Drum Machine', pathname: '/drum-machine', icon: 'drum-machine' },
      { name: 'DJing', pathname: '/dj', icon: 'dj' },
      { name: 'Sequencer', pathname: '/sequencer', icon: 'sequencer' }
    ]
  }
];
