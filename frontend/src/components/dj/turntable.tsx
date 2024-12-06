import Image from 'next/image';

interface TurntableProps {
  isPlaying: boolean;
}

export const Turntable: React.FC<TurntableProps> = ({ isPlaying }) => {
  return (
    <div
      className={`flex items-center justify-center  transition-transform  ${
        isPlaying ? 'animate-spin-slow' : ''
      }`}
    >
      <div className=' w-48 h-48 bg-gray-800 rounded-full  border-4 border-gray-700 border-dotted'>
        <div className='relative w-full h-full bg-gray-800 rounded-full shadow-inner border-4 border-gray-700 border-dotted'>
          <div className='relative w-full h-full bg-gray-800 rounded-full shadow-inner border-4 border-gray-700 border-dotted'>
            <div className='absolute inset-0.5 bg-gray-900 rounded-full border-4 border-gray-600 '></div>

            <div className='absolute inset-12 bg-gray-700 rounded-full shadow-lg flex items-center justify-center '>
              <div className='bg-black rounded-full w-12 h-12 border-4 border-gray-500'></div>
            </div>

            <div className='absolute inset-0 flex items-center justify-center'>
              <Image alt='nano beats' src='./assets/icons/vinyl.svg' width={152} height={152} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
