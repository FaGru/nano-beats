interface FillableBoxProps {
  value: string;
  max: number;
  min: number;
  valueType?: string;
  height?: string;
  width?: string;
  orientation?: 'vertical' | 'horizontal';
}

export const FillableBox: React.FC<FillableBoxProps> = ({
  value,
  max,
  min,
  height = '256px',
  width = '256px',
  orientation = 'vertical',
  valueType = ''
}) => {
  const percentage = ((Number(value) - min) / (max - min)) * 100;
  return (
    <div
      className={` border-2 border-gray-400 relative rounded py-2 cursor-pointer`}
      style={{ height, width }}
    >
      <div
        className='bg-primary absolute bottom-0 left-0'
        style={
          orientation === 'vertical'
            ? { height: `${percentage}%`, width: '100%' }
            : { height: '100%', width: `${percentage}%` }
        }
      />
      <div className='absolute inset-0 flex items-center justify-center  font-bold text-xs'>
        {value} {valueType}
      </div>
    </div>
  );
};
