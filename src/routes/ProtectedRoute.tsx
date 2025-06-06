import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.token && user?.user?.userType !== "admin") {
      navigate("/login", { replace: true });
    }
  }, [user?.token, navigate]);

  if (!user?.token || user?.user?.userType !== "admin") {
    return null;
  }

  return children;
};

export default ProtectedRoute;
