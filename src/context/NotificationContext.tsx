import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { NotificationType } from '../types';

interface NotificationContextType {
  notifications: NotificationType[];
  addNotification: (type: 'success' | 'error' | 'info', message: string) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const addNotification = (type: 'success' | 'error' | 'info', message: string) => {
    const newNotification = {
      id: uuidv4(),
      type,
      message,
    };
    setNotifications(prev => [...prev, newNotification]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Auto-remove notifications after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (notifications.length > 0) {
        setNotifications(prev => prev.slice(1));
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [notifications]);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};