import Image from 'next/image';
import { TDJDeck } from './dj.types';

interface TurntableProps {
  isPlaying: boolean;
  djDeck: TDJDeck;
}

export const Turntable: React.FC<TurntableProps> = ({ isPlaying, djDeck }) => {
  const currentTime = djDeck.wavesurfer?.getCurrentTime() || 0;
  const stoppedRotation = (currentTime % 2) * 180 + (isPlaying ? 0 : 8);
  const spin = isPlaying ? '  transition-transform animate-spin-slow' : ``;

  return (
    <div style={{ transform: `rotate(${stoppedRotation.toFixed(0)}deg)` }} className='w-fit'>
      <div
        className={`flex items-center justify-center w-fit rounded-full  p-0.5 border-2  border-dashed border-y-cyan-400 border-x-primary   shadow-primary shadow-[0px_0px_4px_1px] ${spin} p-0.5`}
      >
        <div
          className={` w-36 h-36 bg-gray-800 rounded-full  border-4 border-gray-700  border-dotted  `}
        >
          <div className=' w-full h-full bg-gray-800 rounded-full shadow-inner border-4 border-gray-700 border-dotted'>
            <div className=' w-full h-full bg-gray-800 rounded-full shadow-inner border-4 border-gray-700 border-dotted'>
              <div className=' w-full h-full bg-gray-900 rounded-full border-2 border-gray-600 '>
                <div className='w-full h-full bg-gray-700 rounded-full shadow-lg flex items-center justify-center '>
                  <Image
                    alt='nano beats'
                    src='./assets/icons/vinyl.svg'
                    className={`w-full h-full bg-gray-900 rounded-full border-black border-4 `}
                    width={118}
                    height={118}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
