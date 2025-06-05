// NotificationContext.tsx - Fixed version
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { NotificationType } from "../types";

interface NotificationContextType {
  notifications: NotificationType[];
  addNotification: (
    type: "success" | "error" | "info",
    message: string
  ) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  // Memoize addNotification to prevent infinite re-renders in dependent components
  const addNotification = useCallback(
    (type: "success" | "error" | "info", message: string) => {
      const newNotification = {
        id: uuidv4(),
        type,
        message,
      };
      setNotifications((prev) => [...prev, newNotification]);
    },
    []
  );

  // Memoize removeNotification
  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  // Auto-remove notifications after 5 seconds
  useEffect(() => {
    if (notifications.length === 0) return;

    const timer = setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 5000);

    return () => clearTimeout(timer);
  }, [notifications.length]); // Only depend on length, not the entire array

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
