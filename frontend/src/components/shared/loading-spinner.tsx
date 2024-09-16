export const LoadingSpinner: React.FC = () => {
  return (
    // <div className='flex justify-center items-center h-screen'>
    <div
      className='w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full'
      style={{
        animation: 'spin 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite'
      }}
    ></div>
    // </div>
  );
};
