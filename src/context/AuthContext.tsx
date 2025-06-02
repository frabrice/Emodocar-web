import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Mock admin user for demo purposes
  useEffect(() => {
    const mockUser: User = {
      id: '1',
      email: 'admin@emodocar.com',
      name: 'Admin User',
      role: 'admin',
    };
    setCurrentUser(mockUser);
    setIsAuthenticated(true);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login functionality
    // In a real app, this would make an API call
    const mockUser: User = {
      id: '1',
      email,
      name: 'Admin User',
      role: 'admin',
    };
    setCurrentUser(mockUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};