import { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Notifications from './Notifications';
import { useNotification } from '@/context/NotificationContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { notifications } = useNotification();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
      {notifications.length > 0 && <Notifications />}
    </div>
  );
};

export default Layout