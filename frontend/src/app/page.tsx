import { DrumMachine } from '@/components/drum-machine/drum-machine.comonent';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-between'>
      <DrumMachine />
    </div>
  );
}
