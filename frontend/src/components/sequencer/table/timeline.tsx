interface TimelineProps {
  steps: number[];
  currentStep: number;
}

export const Timeline: React.FC<TimelineProps> = ({ steps, currentStep }) => {
  return (
    <tr>
      <th className='sticky top-0 left-0  z-20 pl-2 pr-12 py-2 bg-neutral-950 text-neutral-700 shadow-[inset_0px_-1px_0px_0px] shadow-grey-700'>
        Steps
      </th>
      {steps.map((step, index) => (
        <th
          key={index}
          className={`sticky top-0  z-10 p-2 bg-neutral-950 cursor-pointer shadow-[inset_0px_-1px_0px_0px] shadow-neutral-700 ${
            step === currentStep ? 'text-blue-500' : 'text-neutral-700'
          }`}
        >
          {step + 1}
        </th>
      ))}
    </tr>
  );
};
