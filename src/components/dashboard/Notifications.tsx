import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import { useNotification } from "@/context/NotificationContext";
import { NotificationType } from "@/types";

const Notifications = () => {
  const { notifications, removeNotification } = useNotification();

  const getIcon = (type: NotificationType["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-400" />;
      default:
        return null;
    }
  };

  const getBgColor = (type: NotificationType["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-50";
      case "error":
        return "bg-red-50";
      case "info":
        return "bg-blue-50";
      default:
        return "bg-gray-50";
    }
  };

  const getTextColor = (type: NotificationType["type"]) => {
    switch (type) {
      case "success":
        return "text-green-800";
      case "error":
        return "text-red-800";
      case "info":
        return "text-blue-800";
      default:
        return "text-gray-800";
    }
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999999] space-y-2 w-full max-w-sm mx-auto">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${getBgColor(
            notification.type
          )} p-4 rounded-md shadow-lg transform transition-all duration-300 hover:scale-105`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">{getIcon(notification.type)}</div>
            <div className="ml-3 w-0 flex-1">
              <p
                className={`text-sm font-medium ${getTextColor(
                  notification.type
                )}`}
              >
                {notification.message}
              </p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className={`bg-transparent rounded-md inline-flex ${getTextColor(
                  notification.type
                )} hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#06347C]`}
                onClick={() => removeNotification(notification.id)}
              >
                <span className="sr-only">Close</span>
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
