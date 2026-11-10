import { STORAGE_KEYS, HTTP_STATUS } from './constants';

class APIClient {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
  }

  getAuthToken() {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  setAuthToken(token) {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  }

  getRefreshToken() {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  setRefreshToken(token) {
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
  }

  clearAuthTokens() {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  }

  getHeaders(isFormData = false) {
    const headers = {};
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  async request(endpoint, options = {}) {
    const {
      method = 'GET',
      data = null,
      isFormData = false,
      timeout = 30000,
    } = options;

    const url = endpoint.startsWith('http') ? endpoint : `${this.baseURL}${endpoint}`;
    const headers = this.getHeaders(isFormData);

    const config = {
      method,
      headers,
      signal: AbortSignal.timeout(timeout),
    };

    if (data) {
      config.body = isFormData ? data : JSON.stringify(data);
    }

    try {
      const response = await fetch(url, config);
      
      // Handle 401 Unauthorized - token might be expired
      if (response.status === HTTP_STATUS.UNAUTHORIZED) {
        this.clearAuthTokens();
        window.location.href = '/sign-in';
        throw new Error('Session expired. Please sign in again.');
      }

      const responseData = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw {
          status: response.status,
          message: responseData.message || `HTTP Error: ${response.status}`,
          data: responseData,
        };
      }

      return {
        success: true,
        status: response.status,
        data: responseData,
      };
    } catch (error) {
      if (error.name === 'AbortError') {
        throw {
          success: false,
          error: 'Request timeout. Please try again.',
        };
      }

      if (error.success === false) {
        throw error;
      }

      throw {
        success: false,
        error: error.message || 'An error occurred while making the request.',
        data: error,
      };
    }
  }

  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  async post(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: 'POST', data });
  }

  async put(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: 'PUT', data });
  }

  async patch(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: 'PATCH', data });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }

  async uploadFile(endpoint, file, additionalData = {}) {
    const formData = new FormData();
    formData.append('file', file);

    Object.keys(additionalData).forEach((key) => {
      formData.append(key, additionalData[key]);
    });


    return this.request(endpoint, {
      method: 'POST',
      data: formData,
      isFormData: true,
    });
  }
}

export const apiClient = new APIClient();

// Auth API calls
export const authAPI = {
  signIn: (email, password) =>
    apiClient.post('/auth/login', { email, password }),

  signUp: (companyName, workspaceUrl, email, password) =>
    apiClient.post('/auth/register', {
      company_name: companyName,
      workspace_url: workspaceUrl,
      email,
      password,
    }),

  sendOTP: (email) =>
    apiClient.post('/auth/send-otp', { email }),

  verifyOTP: (email, otpCode) =>
    apiClient.post('/auth/verify-otp', {
      email,
      otp_code: otpCode,
    }),

  forgotPassword: (email) =>
    apiClient.post('/auth/forgot-password', { email }),

  resetPassword: (email, otpCode, newPassword) =>
    apiClient.post('/auth/reset-password', {
      email,
      otp_code: otpCode,
      new_password: newPassword,
    }),

  changePassword: (currentPassword, newPassword) =>
    apiClient.post('/auth/change-password', {
      current_password: currentPassword,
      new_password: newPassword,
    }),

  logout: () =>
    apiClient.post('/auth/logout', {}),
};

// User API calls
export const userAPI = {
  getProfile: () =>
    apiClient.get('/users/profile'),

  updateProfile: (profileData) =>
    apiClient.put('/users/profile/update', profileData),

  acceptInvite: (inviteToken, password) =>
    apiClient.post('/users/accept-invite', {
      invite_token: inviteToken,
      password,
    }),

  getWorkspace: () =>
    apiClient.get('/users/workspace'),
};

// Admin API calls
export const adminAPI = {
  // Employees
  inviteEmployee: (inviteData) =>
    apiClient.post('/admin/employees/invite', inviteData),

  getEmployees: (filters = {}) =>
    apiClient.get('/admin/employees', { params: filters }),

  getEmployeeById: (id) =>
    apiClient.get(`/admin/employees/${id}`),

  updateEmployee: (id, employeeData) =>
    apiClient.put(`/admin/employees/${id}`, employeeData),

  deleteEmployee: (id) =>
    apiClient.delete(`/admin/employees/${id}`),

  importEmployeesCSV: (file) =>
    apiClient.uploadFile('/admin/employees/import-csv', file),

  exportEmployeesCSV: (filters = {}) =>
    apiClient.get('/admin/employees/export-csv', { params: filters }),

  // Departments
  getDepartments: () =>
    apiClient.get('/admin/departments'),

  createDepartment: (deptData) =>
    apiClient.post('/admin/departments', deptData),

  updateDepartment: (id, deptData) =>
    apiClient.put(`/admin/departments/${id}`, deptData),

  deleteDepartment: (id) =>
    apiClient.delete(`/admin/departments/${id}`),

  // Leave Management
  getLeaveRequests: (filters = {}) =>
    apiClient.get('/admin/leaves', { params: filters }),

  getLeaveBalances: () =>
    apiClient.get('/admin/leaves/balances'),

  submitLeaveRequest: (leaveData) =>
    apiClient.post('/admin/leaves/request', leaveData),

  approveLeave: (id, notes = '') =>
    apiClient.post(`/admin/leaves/${id}/approve`, { notes }),

  rejectLeave: (id, reason) =>
    apiClient.post(`/admin/leaves/${id}/reject`, { reason }),

  getLeaveCalendar: (month, year) =>
    apiClient.get('/admin/leaves/calendar', { params: { month, year } }),

  getLeavePolicies: () =>
    apiClient.get('/admin/leaves/policies'),

  // Onboarding & Offboarding
  getOnboardingList: () =>
    apiClient.get('/admin/onboarding'),

  updateOnboardingTask: (id, status) =>
    apiClient.patch(`/admin/onboarding/tasks/${id}`, { status }),

  sendOnboardingNudge: (id) =>
    apiClient.post(`/admin/onboarding/${id}/nudge`),

  getOffboardingList: () =>
    apiClient.get('/admin/offboarding'),

  initiateOffboarding: (offboardingData) =>
    apiClient.post('/admin/offboarding/initiate', offboardingData),

  updateOffboardingTask: (id, status) =>
    apiClient.patch(`/admin/offboarding/tasks/${id}`, { status }),

  // Check-ins & Reviews
  getCheckInCycles: () =>
    apiClient.get('/admin/check-ins/cycles'),

  createCheckInCycle: (cycleData) =>
    apiClient.post('/admin/check-ins/cycles', cycleData),

  submitCheckIn: (responseData) =>
    apiClient.post('/admin/check-ins/submit', responseData),

  getCheckInResponses: (cycleId) =>
    apiClient.get(`/admin/check-ins/cycles/${cycleId}/responses`),

  // Surveys
  getSurveys: () =>
    apiClient.get('/admin/surveys'),

  createSurvey: (surveyData) =>
    apiClient.post('/admin/surveys', surveyData),

  getSurveyResults: (id) =>
    apiClient.get(`/admin/surveys/${id}/results`),

  submitSurveyResponse: (id, responseData) =>
    apiClient.post(`/admin/surveys/${id}/respond`, responseData),

  // Documents
  getDocuments: (category = 'all') =>
    apiClient.get('/admin/documents', { params: { category } }),

  uploadDocument: (file, metadata) =>
    apiClient.uploadFile('/admin/documents/upload', file, metadata),

  deleteDocument: (id) =>
    apiClient.delete(`/admin/documents/${id}`),

  acknowledgeDocument: (id) =>
    apiClient.post(`/admin/documents/${id}/acknowledge`),

  // Settings
  getSettings: () =>
    apiClient.get('/admin/settings/general'),

  updateSettings: (settingsData) =>
    apiClient.put('/admin/settings/general/update', settingsData),

  getSecuritySettings: () =>
    apiClient.get('/admin/settings/security'),

  updateSecuritySettings: (securityData) =>
    apiClient.put('/admin/settings/security/update', securityData),

  getBillingSettings: () =>
    apiClient.get('/admin/settings/billing'),

  updateBillingSettings: (billingData) =>
    apiClient.put('/admin/settings/billing/update', billingData),

  getNotificationSettings: () =>
    apiClient.get('/admin/settings/notifications'),

  updateNotificationSettings: (notificationData) =>
    apiClient.put('/admin/settings/notifications/update', notificationData),
};

// Payroll API calls
export const payrollAPI = {
  getSummary: () =>
    apiClient.get('/payroll/summary'),

  runPayroll: (payrollData) =>
    apiClient.post('/payroll/run', payrollData),

  exportBatchCSV: () =>
    apiClient.get('/payroll/export'),
};

// Manager API calls
export const managerAPI = {
  getDirectReports: () =>
    apiClient.get('/manager/reports'),

  save1on1Notes: (id, notes) =>
    apiClient.post(`/manager/reports/${id}/1on1-notes`, { notes }),

  getTeamLeaves: (filters = {}) =>
    apiClient.get('/manager/leaves', { params: filters }),

  approveTeamLeave: (id, notes = '') =>
    apiClient.post(`/manager/leaves/${id}/approve`, { notes }),

  rejectTeamLeave: (id, reason) =>
    apiClient.post(`/manager/leaves/${id}/reject`, { reason }),

  submitEvaluation: (id, evaluationData) =>
    apiClient.post(`/manager/reviews/${id}/evaluate`, evaluationData),
};

// Employee Self-Service API calls
export const employeeAPI = {
  clockIn: (location) =>
    apiClient.post('/employee/attendance/clock-in', { location }),

  clockOut: () =>
    apiClient.post('/employee/attendance/clock-out'),

  getMyLeaveBalances: () =>
    apiClient.get('/employee/leaves/balances'),

  getMyLeaves: () =>
    apiClient.get('/employee/leaves'),

  applyLeave: (leaveData) =>
    apiClient.post('/employee/leaves/apply', leaveData),

  cancelLeave: (id) =>
    apiClient.delete(`/employee/leaves/${id}/cancel`),

  getMyTasks: () =>
    apiClient.get('/employee/tasks'),

  toggleTask: (id, status) =>
    apiClient.patch(`/employee/tasks/${id}/toggle`, { status }),

  getMyPayslips: () =>
    apiClient.get('/employee/payslips'),

  downloadPayslipPDF: (id) =>
    apiClient.get(`/employee/payslips/${id}/pdf`),

  acknowledgeDocument: (id) =>
    apiClient.post(`/employee/documents/${id}/acknowledge`),

  submitSelfAssessment: (reviewData) =>
    apiClient.post('/employee/reviews/self-assessment', reviewData),

  updateProfile: (profileData) =>
    apiClient.put('/employee/profile/update', profileData),
};

// Employer API calls (Sole authority: Leave decisions & Admin appointments)
export const employerAPI = {
  // Admin Management (Only Employer can appoint or revoke Admins)
  getAdmins: () =>
    apiClient.get('/employer/admins'),

  appointAdmin: (employeeId, rolePayload = {}) =>
    apiClient.post(`/employer/admins/${employeeId}/appoint`, rolePayload),

  revokeAdmin: (employeeId) =>
    apiClient.post(`/employer/admins/${employeeId}/revoke`),

  // Sole Authority Leave Approvals
  approveLeave: (id, notes = '') =>
    apiClient.post(`/employer/leaves/${id}/approve`, { notes }),

  rejectLeave: (id, reason) =>
    apiClient.post(`/employer/leaves/${id}/reject`, { reason }),

  // Workspace Ownership & Billing
  getWorkspaceBilling: () =>
    apiClient.get('/employer/workspace/billing'),

  updateWorkspacePlan: (planId, billingCycle) =>
    apiClient.post('/employer/workspace/plan', { planId, billingCycle }),

  transferOwnership: (newOwnerEmail, passwordConfirmation) =>
    apiClient.post('/employer/workspace/transfer-ownership', { newOwnerEmail, passwordConfirmation }),
};
