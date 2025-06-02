import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Vehicles from "@/pages/Vehicles";
import Bookings from "@/components/dashboard/Bookings";
import Login from "@/pages/Login";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/dashboard/Layout";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

// Layout wrapper for public pages
const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

const AppRoutes = () => {
  const location = useLocation();

  // Check if we're on a dashboard route
  const isDashboardRoute =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/vehicles") ||
    location.pathname.startsWith("/bookings");

  return (
    <Routes>
      {/* Public routes with layout */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />
      <Route
        path="/about"
        element={
          <PublicLayout>
            <About />
          </PublicLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <PublicLayout>
            <Contact />
          </PublicLayout>
        }
      />
      <Route
        path="/terms"
        element={
          <PublicLayout>
            <Terms />
          </PublicLayout>
        }
      />
      <Route
        path="/privacy"
        element={
          <PublicLayout>
            <Privacy />
          </PublicLayout>
        }
      />

      {/* Login route (no layout) */}
      <Route path="/login" element={<Login />} />

      {/* Protected dashboard routes */}
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path="/vehicles"
        element={
          <Layout>
            <Vehicles />
          </Layout>
        }
      />
      <Route
        path="/bookings"
        element={
          <Layout>
            <Bookings />
          </Layout>
        }
      />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
