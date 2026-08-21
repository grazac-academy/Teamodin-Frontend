import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import './styles/theme.css';
import './App.css';

// Pages
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import OTPVerifyPage from './pages/auth/OTPVerifyPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ChangePasswordPage from './pages/auth/ChangePasswordPage';
import ProfileSetupPage from './pages/auth/ProfileSetupPage';
import InviteOnboardingPage from './pages/auth/InviteOnboardingPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import InviteEmployeePage from './pages/admin/InviteEmployeePage';
import SettingsPage from './pages/admin/SettingsPage';
import SecuritySettingsPage from './pages/admin/SecuritySettingsPage';

// Protected Route Component
const ProtectedRoute = ({ children, isAuthenticated, requiredRole }) => {
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-otp" element={<OTPVerifyPage />} />
          <Route path="/invite/:inviteToken" element={<InviteOnboardingPage />} />

          {/* Protected Routes */}
          <Route
            path="/profile/setup"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <ProfileSetupPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/auth/change-password"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <ChangePasswordPage />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute isAuthenticated={true} requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/employees/invite"
            element={
              <ProtectedRoute isAuthenticated={true} requiredRole="admin">
                <InviteEmployeePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute isAuthenticated={true} requiredRole="admin">
                <SettingsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/settings/security"
            element={
              <ProtectedRoute isAuthenticated={true} requiredRole="admin">
                <SecuritySettingsPage />
              </ProtectedRoute>
            }
          />

          {/* Catch all - redirect to landing page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
