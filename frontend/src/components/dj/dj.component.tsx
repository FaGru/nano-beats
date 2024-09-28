'use client';
import { ThreeCircles } from 'react-loader-spinner';

interface DJProps {}

export const DJ: React.FC<DJProps> = () => {
  return (
    <div className='bg-background h-[60vh] w-full flex flex-col justify-center items-center rounded-md p-4 gap-8 text-xl'>
      DJ Page is still in progress
      <ThreeCircles height='96' width='96' color={'hsl(var(--primary))'} ariaLabel='puff-loading' />
    </div>
  );
};
