import { Sequencer } from '@/components/sequencer/sequencer.component';
import fs from 'fs';
import path from 'path';

export default function SequencerPage() {
  const audioDir = path.join(process.cwd(), 'public/assets/audio/Samples');
  const audioFiles = fs.readdirSync(audioDir).filter((file) => file !== '.DS_Store');
  return (
    <div className='flex flex-col justify-between '>
      <Sequencer audioFiles={audioFiles} />
    </div>
  );
}
