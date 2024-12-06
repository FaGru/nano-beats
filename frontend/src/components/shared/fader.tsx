import { useMouseMove } from '@/lib/hooks/useMouseMove';

interface FaderProps {
  handleKnobChange: (valueChange: number) => void;
  handleDoupleClick: () => void;
  value: number;
  minValue: number;
  maxValue: number;
  text?: string | number;
  title?: string | number;
  width?: string;
}

export const Fader: React.FC<FaderProps> = ({
  handleKnobChange,
  handleDoupleClick,
  value,
  minValue,
  maxValue,
  text,
  title,
  width = 'w-24'
}) => {
  const position = ((value - minValue) / (maxValue - minValue)) * 100;
  const { handleMouseDown, handleMouseUp } = useMouseMove('x');

  return (
    <div
      className='flex flex-col items-center cursor-pointer'
      onMouseDown={(e) => handleMouseDown(e, handleKnobChange)}
      onTouchStart={(e) => handleMouseDown(e, handleKnobChange)}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
      onDoubleClick={() => (handleDoupleClick ? handleDoupleClick() : null)}
    >
      {title && <p className='text-xxs'>{title}</p>}
      <div className={`bg-primary ${width} h-0.5 rounded relative`}>
        <div className='absolute flex justify-between w-full items-center -top-[6px]'>
          <div className='w-[2px] h-3.5 bg-foreground rounded' />
          <div className='w-[2px] h-1.5 bg-foreground rounded' />
          <div className='w-[2px] h-1.5 bg-foreground rounded' />
          <div className='w-[2px] h-1.5 bg-foreground rounded' />
          <div className='w-[2px] h-3.5 bg-foreground rounded' />
          <div className='w-[2px] h-1.5 bg-foreground rounded' />
          <div className='w-[2px] h-1.5 bg-foreground rounded' />
          <div className='w-[2px] h-1.5 bg-foreground rounded' />
          <div className='w-[2px] h-3.5 bg-foreground rounded' />
        </div>
        <div
          className={`absolute w-3 h-7 bg-card-highlight rounded-full -top-[13px] shadow-[inset_0_0_4px_2px] shadow-secondary`}
          style={{ left: `${position}%`, transform: 'translateX(-50%) ' }}
        >
          <div
            className={`absolute bg-foreground rounded-full  left-1/2 h-5 w-0.5 top-1`}
            style={{ transform: 'translateX(-50%)' }}
          />
        </div>
      </div>
      {text && <p className='text-xxs'>{text}</p>}
    </div>
  );
};
