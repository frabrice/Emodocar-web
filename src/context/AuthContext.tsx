import { createContext, useContext, ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/App/store/index";
import { LoginResponseType } from "../types/auth";
import { logOut } from "@/App/features/authSlice";

interface AuthContextType {
  user: LoginResponseType | null;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch();
  const { userInfo, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const logout = () => {
    dispatch(logOut());
  };

  const contextValue: AuthContextType = {
    user: userInfo,
    isAuthenticated,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
