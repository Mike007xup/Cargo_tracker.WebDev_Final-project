import { Route, Routes, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminRoute } from "./components/AdminRoute";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import PublicTrackingPage from "./pages/PublicTrackingPage/PublicTrackingPage";

import DashboardPage from "./pages/DashboardPage/DashboardPage";
import CargoDetailsPage from "./pages/CargoDetailsPage/CargoDetailsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

import AdminDashboardPage from "./pages/AdminDashboardPage/AdminDashboardPage";
import AdminVesselsPage from "./pages/AdminVesselsPage/AdminVesselsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/track/:trackingCode" element={<PublicTrackingPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/shipments/:id"
        element={
          <ProtectedRoute>
            <CargoDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboardPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/vessels"
        element={
          <AdminRoute>
            <AdminVesselsPage />
          </AdminRoute>
        }
      />

      <Route path="/client/home" element={<Navigate to="/" replace />} />
      <Route path="/admin/dashboard" element={<Navigate to="/admin" replace />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

