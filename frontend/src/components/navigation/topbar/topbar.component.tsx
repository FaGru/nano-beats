import { ThemeSelect } from '@/components/ui/theme-select';

interface TopbarProps {}

export const Topbar: React.FC<TopbarProps> = ({}) => {
  return (
    <header className='h-12 hidden md:flex justify-between items-center px-4'>
      <div></div>
      <div className='ml-auto'>
        <ThemeSelect />
      </div>
    </header>
  );
};
