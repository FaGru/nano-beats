interface TimelineProps {
  steps: number[];
  currentStep: number;
}

export const Timeline: React.FC<TimelineProps> = ({ steps, currentStep }) => {
  return (
    <tr>
      <th className='sticky top-0 left-0  z-20 pl-2 pr-12 py-3 bg-background text-neutral-700 shadow-[inset_0px_-1px_0px_0px] shadow-grey-700'>
        Steps
      </th>
      {steps.map((step, index) => (
        <th
          key={index}
          className={`sticky top-0  z-10 pt-1   shadow-[inset_0px_-1px_0px_0px] shadow-neutral-700 ${
            step === currentStep ? 'text-primary ' : ''
          }`}
        >
          {step + 1}
          <div
            className={` ${step === currentStep ? ' bg-primary rounded' : 'bg-secondary'} w-10 h-0.5 mx-1 m-1`}
          ></div>
        </th>
      ))}
    </tr>
  );
};
