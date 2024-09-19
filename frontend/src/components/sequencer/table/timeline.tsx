interface TimelineProps {
  steps: number[];
  currentStep: number;
}

export const Timeline: React.FC<TimelineProps> = ({ steps, currentStep }) => {
  return (
    <tr>
      <th className='sticky top-0 left-0  z-20 pl-2 pr-12 py-2 bg-gray-950 text-gray-700 shadow-[inset_0px_-1px_0px_0px] shadow-grey-700'>
        Steps
      </th>
      {steps.map((step, index) => (
        <th
          key={index}
          className={`sticky top-0  z-10 p-2 bg-gray-950 cursor-pointer shadow-[inset_0px_-1px_0px_0px] shadow-gray-700 ${
            index === currentStep ? 'text-blue-500' : 'text-gray-700'
          }`}
        >
          {step}
        </th>
      ))}
    </tr>
  );
};
