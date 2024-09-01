import { Sidebar } from '../navigation/sidebar/sidebar.component';
import { Topbar } from '../navigation/topbar/topbar.component';

interface BaseLayoutProps {
  children: React.ReactNode;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-full'>
        <Topbar />
        {children}
      </div>
    </div>
  );
};
