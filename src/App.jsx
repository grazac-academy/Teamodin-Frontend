
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import './styles/theme.css';
import './App.css';

// Pages
import LandingPage from './pages/landing/LandingPage';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import OTPVerifyPage from './pages/auth/OTPVerifyPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ChangePasswordPage from './pages/auth/ChangePasswordPage';
import ProfileSetupPage from './pages/auth/ProfileSetupPage';
import InviteOnboardingPage from './pages/auth/InviteOnboardingPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import EmployeeDirectoryPage from './pages/admin/EmployeeDirectoryPage';
import LeaveRequestPage from './pages/admin/LeaveRequestPage';
import OnboardingPage from './pages/admin/OnboardingPage';
import InviteEmployeePage from './pages/admin/InviteEmployeePage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import CheckInsPage from './pages/admin/CheckInsPage';
import SurveysPage from './pages/admin/SurveysPage';
import SettingsPage from './pages/admin/SettingsPage';
import SecuritySettingsPage from './pages/admin/SecuritySettingsPage';

import { useAuth } from './hooks/useAuth';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
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
            path="/admin/employees"
            element={
              <ProtectedRoute isAuthenticated={true} requiredRole="admin">
                <EmployeeDirectoryPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/leave"
            element={
              <ProtectedRoute isAuthenticated={true} requiredRole="admin">
                <LeaveRequestPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/onboarding"
            element={
              <ProtectedRoute isAuthenticated={true} requiredRole="admin">
                <OnboardingPage />
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
            path="/admin/analytics"
            element={
              <ProtectedRoute isAuthenticated={true} requiredRole="admin">
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/check-ins"
            element={
              <ProtectedRoute isAuthenticated={true} requiredRole="admin">
                <CheckInsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/surveys"
            element={
              <ProtectedRoute isAuthenticated={true} requiredRole="admin">
                <SurveysPage />
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
