import { useMouseMove } from '@/lib/hooks/useMouseMove';

interface FaderProps {
  handleKnobChange: (valueChange: number) => void;
  handleDoupleClick: () => void;
  value: number;
  minValue: number;
  maxValue: number;
  text?: string | number;
  title?: string | number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  orientation?: 'horizontal' | 'vertical';
}

export const Fader: React.FC<FaderProps> = ({
  handleKnobChange,
  handleDoupleClick,
  value,
  minValue,
  maxValue,
  text,
  title,
  size = 'md',
  orientation = 'horizontal'
}) => {
  const isHorizontal = orientation === 'horizontal';
  const position = ((value - minValue) / (maxValue - minValue)) * 100;
  const { handleMouseDown, handleMouseUp } = useMouseMove(isHorizontal ? 'x' : 'y');

  const faderSizes = {
    sm: isHorizontal ? 'w-16 h-0.5' : 'h-16 w-0.5',
    md: isHorizontal ? 'w-24 h-0.5' : 'h-24 w-0.5',
    lg: isHorizontal ? 'w-32 h-0.5' : 'h-32 w-0.5',
    xl: isHorizontal ? 'w-48 h-0.5' : 'h-48 w-0.5'
  };
  const faderSize = faderSizes[size];

  const markerSmallStyle = isHorizontal
    ? 'w-[2px] h-3 bg-foreground rounded'
    : 'h-[2px] w-3 bg-foreground rounded';

  const markerBigStyle = isHorizontal
    ? 'w-[2px] h-5 bg-foreground rounded'
    : 'h-[2px] w-5 bg-foreground rounded';

  return (
    <div
      className={`flex flex-col items-center  cursor-pointer ${isHorizontal ? 'h-4' : 'w-12'} p-1`}
      onMouseDown={(e) => handleMouseDown(e, handleKnobChange)}
      onTouchStart={(e) => handleMouseDown(e, handleKnobChange)}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
      onDoubleClick={() => (handleDoupleClick ? handleDoupleClick() : null)}
    >
      {title && <p className='text-xxs'>{title}</p>}

      <div className={`bg-primary ${faderSize} rounded relative`}>
        <div
          className={` absolute flex justify-between   items-center w-full h-full ${isHorizontal ? '' : 'flex-col'}`}
        >
          <div className={markerBigStyle} />
          <div className={markerSmallStyle} />
          <div className={markerSmallStyle} />
          <div className={markerSmallStyle} />
          <div className={markerBigStyle} />
          <div className={markerSmallStyle} />
          <div className={markerSmallStyle} />
          <div className={markerSmallStyle} />
          <div className={markerBigStyle} />
        </div>
        <div
          className={`absolute ${isHorizontal ? 'w-3 h-7 -top-[13px]' : 'h-3 w-7 -left-[13px]'} bg-card-highlight rounded-sm  shadow-[inset_0_0_4px_2px] shadow-secondary `}
          style={
            isHorizontal
              ? { left: `${position}%`, transform: 'translateX(-50%) ' }
              : { bottom: `${position}%`, transform: 'translateY(50%) ' }
          }
        >
          <div
            className={`absolute bg-foreground rounded-full   ${isHorizontal ? 'h-5 w-0.5 left-1/2 top-1' : 'w-5 h-0.5 top-1/2 left-1'}  `}
            style={
              isHorizontal ? { transform: 'translateX(-50%)' } : { transform: 'translateY(-50%)' }
            }
          />
        </div>
      </div>
      {text && <p className='text-xxs'>{text}</p>}
    </div>
  );
};
