
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
import EmployeeDetailPage from './pages/admin/EmployeeDetailPage';
import DepartmentsPage from './pages/admin/DepartmentsPage';
import LeaveRequestPage from './pages/admin/LeaveRequestPage';
import OnboardingPage from './pages/admin/OnboardingPage';
import OffboardingPage from './pages/admin/OffboardingPage';
import CompanyDocumentsPage from './pages/admin/CompanyDocumentsPage';
import InviteEmployeePage from './pages/admin/InviteEmployeePage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import CheckInsPage from './pages/admin/CheckInsPage';
import SurveysPage from './pages/admin/SurveysPage';
import SettingsPage from './pages/admin/SettingsPage';
import SecuritySettingsPage from './pages/admin/SecuritySettingsPage';
import BillingSettingsPage from './pages/admin/BillingSettingsPage';
import NotificationsSettingsPage from './pages/admin/NotificationsSettingsPage';
import AdminPayrollPage from './pages/admin/AdminPayrollPage';

// Manager Pages
import ManagerDashboard from './pages/manager/ManagerDashboard';
import ManagerTeamPage from './pages/manager/ManagerTeamPage';
import ManagerLeaveApprovalsPage from './pages/manager/ManagerLeaveApprovalsPage';
import ManagerReviewsPage from './pages/manager/ManagerReviewsPage';
import ManagerOnboardingPage from './pages/manager/ManagerOnboardingPage';

// Employee Portal Pages
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import EmployeeLeavePage from './pages/employee/EmployeeLeavePage';
import EmployeeTasksPage from './pages/employee/EmployeeTasksPage';
import EmployeePayslipsPage from './pages/employee/EmployeePayslipsPage';
import EmployeeDocumentsPage from './pages/employee/EmployeeDocumentsPage';
import EmployeeReviewsPage from './pages/employee/EmployeeReviewsPage';
import EmployeeDirectoryPortalPage from './pages/employee/EmployeeDirectoryPortalPage';
import EmployeeProfilePage from './pages/employee/EmployeeProfilePage';

import { useAuth } from './hooks/useAuth';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, currentRole, isEmployer, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  // Employer & Admin share the admin dashboard and administration routes
  if (requiredRole === 'admin') {
    const hasAdminAccess = isEmployer || isAdmin || currentRole === 'employer' || currentRole === 'admin';
    if (!hasAdminAccess) {
      return <Navigate to="/employee/dashboard" replace />;
    }
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
            path="/admin/employees/:id"
            element={
              <ProtectedRoute isAuthenticated={true} requiredRole="admin">
                <EmployeeDetailPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/departments"
            element={
              <ProtectedRoute isAuthenticated={true} requiredRole="admin">
                <DepartmentsPage />
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
            path="/admin/offboarding"
            element={
              <ProtectedRoute isAuthenticated={true} requiredRole="admin">
                <OffboardingPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/documents"
            element={
              <ProtectedRoute isAuthenticated={true} requiredRole="admin">
                <CompanyDocumentsPage />
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

          <Route
            path="/admin/settings/billing"
            element={
              <ProtectedRoute isAuthenticated={true} requiredRole="admin">
                <BillingSettingsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/settings/notifications"
            element={
              <ProtectedRoute isAuthenticated={true} requiredRole="admin">
                <NotificationsSettingsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/payroll"
            element={
              <ProtectedRoute isAuthenticated={true} requiredRole="admin">
                <AdminPayrollPage />
              </ProtectedRoute>
            }
          />

          {/* Manager Routes */}
          <Route
            path="/manager/dashboard"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <ManagerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manager/team"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <ManagerTeamPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manager/leave"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <ManagerLeaveApprovalsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manager/reviews"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <ManagerReviewsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manager/onboarding"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <ManagerOnboardingPage />
              </ProtectedRoute>
            }
          />

          {/* Employee Self-Service Routes */}
          <Route
            path="/employee/dashboard"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employee/leave"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <EmployeeLeavePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employee/tasks"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <EmployeeTasksPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employee/payslips"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <EmployeePayslipsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employee/documents"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <EmployeeDocumentsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employee/reviews"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <EmployeeReviewsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employee/directory"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <EmployeeDirectoryPortalPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employee/profile"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <EmployeeProfilePage />
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
