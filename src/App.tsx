import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "@/routes/AppRoutes";
import { AuthProvider } from "@/context/AuthContext";
import { WalletProvider } from "@/context/WalletContext";
import { NotificationProvider } from "@/context/NotificationContext";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <WalletProvider>
            <AppRoutes />
          </WalletProvider>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
