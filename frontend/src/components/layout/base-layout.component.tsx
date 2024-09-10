import { Sidebar } from '../navigation/sidebar/sidebar.component';
import { Topbar } from '../navigation/topbar/topbar.component';

interface BaseLayoutProps {
  children: React.ReactNode;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Topbar />
        <main className='flex-1 overflow-y-auto p-6 bg-gray-800'>{children}</main>
      </div>
    </div>
  );
};
