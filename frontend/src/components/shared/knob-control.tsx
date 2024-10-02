import { useMouseMove } from '@/hooks/useMouseMove';

interface KnobControlProps {
  handleKnobChange: (valueChange: number) => void;
  handleDoupleClick: () => void;
  value: number;
  minValue: number;
  maxValue: number;
  size?: 'sm' | 'md' | 'xl';
  text?: string | number;
  title?: string | number;
}

export const KnobControl: React.FC<KnobControlProps> = ({
  handleKnobChange,
  handleDoupleClick,
  value,
  minValue,
  maxValue,
  size = 'md',
  text,
  title
}) => {
  const rotation = ((value - minValue) / (maxValue - minValue)) * 270;
  const { handleMouseDown, handleMouseUp } = useMouseMove('y');
  const allStyles = {
    xl: { container: 'w-12 h-12 ', knob: 'w-10 h-10 ', pointer: 'w-0.5 h-2.5 top-1' },
    md: { container: 'w-10 h-10 ', knob: 'w-8 h-8 ', pointer: 'w-0.5 h-2.5 top-0.5' },
    sm: { container: 'w-8 h-8 ', knob: 'w-6 h-6 ', pointer: 'w-0.5 h-2 top-0.5' }
  };
  const sizeStyles = allStyles[size];

  return (
    <div
      className='flex flex-col items-center'
      onMouseDown={(e) => handleMouseDown(e, handleKnobChange)}
      onTouchStart={(e) => handleMouseDown(e, handleKnobChange)}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
      onDoubleClick={() => (handleDoupleClick ? handleDoupleClick() : null)}
    >
      {title && <p className='text-xxs mb-0.5'>{title}</p>}
      <div
        className={`relative ${sizeStyles.container} rounded-full flex justify-center items-center cursor-pointer`}
        style={{
          background:
            'radial-gradient(circle, hsl(var(--secondary)) 45%, hsl(var(--background)) 100%)'
        }}
      >
        <svg className='absolute w-full h-full' viewBox='0 0 100 100'>
          <circle
            cx='50'
            cy='50'
            r='45'
            fill='none'
            stroke='hsl(var(--primary))'
            strokeWidth='4'
            strokeDasharray='283'
            strokeDashoffset={283 - (rotation / 360) * 283}
            strokeLinecap='round'
            transform='rotate(135 50 50)'
          />
        </svg>

        <div
          className={`absolute ${sizeStyles.knob} rounded-full`}
          style={{
            background:
              'radial-gradient(circle, hsl(var(--secondary)) 30%, hsl(var(--background)) 100%)',
            transform: `rotate(${rotation - 135}deg)`
          }}
        >
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 w-0.5 ${sizeStyles.pointer} bg-foreground rounded-full`}
          ></div>
        </div>
      </div>
      {text && <p className='text-xxs'>{text}</p>}
    </div>
  );
};
