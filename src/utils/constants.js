// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Auth Endpoints
export const AUTH_ENDPOINTS = {
  SIGN_IN: `${API_BASE_URL}/auth/login`,
  SIGN_UP: `${API_BASE_URL}/auth/register`,
  VERIFY_OTP: `${API_BASE_URL}/auth/verify-otp`,
  SEND_OTP: `${API_BASE_URL}/auth/send-otp`,
  FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  CHANGE_PASSWORD: `${API_BASE_URL}/auth/change-password`,
  REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh-token`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
};

// User Endpoints
export const USER_ENDPOINTS = {
  GET_PROFILE: `${API_BASE_URL}/users/profile`,
  UPDATE_PROFILE: `${API_BASE_URL}/users/profile/update`,
  ACCEPT_INVITE: `${API_BASE_URL}/users/accept-invite`,
  GET_WORKSPACE: `${API_BASE_URL}/users/workspace`,
};

// Admin Endpoints
export const ADMIN_ENDPOINTS = {
  INVITE_EMPLOYEE: `${API_BASE_URL}/admin/employees/invite`,
  GET_EMPLOYEES: `${API_BASE_URL}/admin/employees`,
  GET_EMPLOYEE: (id) => `${API_BASE_URL}/admin/employees/${id}`,
  UPDATE_EMPLOYEE: (id) => `${API_BASE_URL}/admin/employees/${id}`,
  DELETE_EMPLOYEE: (id) => `${API_BASE_URL}/admin/employees/${id}`,
  IMPORT_EMPLOYEES_CSV: `${API_BASE_URL}/admin/employees/import-csv`,
  EXPORT_EMPLOYEES_CSV: `${API_BASE_URL}/admin/employees/export-csv`,
  
  // Departments
  GET_DEPARTMENTS: `${API_BASE_URL}/admin/departments`,
  CREATE_DEPARTMENT: `${API_BASE_URL}/admin/departments`,
  UPDATE_DEPARTMENT: (id) => `${API_BASE_URL}/admin/departments/${id}`,
  DELETE_DEPARTMENT: (id) => `${API_BASE_URL}/admin/departments/${id}`,

  // Leave Management
  GET_LEAVE_REQUESTS: `${API_BASE_URL}/admin/leaves`,
  GET_LEAVE_BALANCES: `${API_BASE_URL}/admin/leaves/balances`,
  SUBMIT_LEAVE_REQUEST: `${API_BASE_URL}/admin/leaves/request`,
  APPROVE_LEAVE: (id) => `${API_BASE_URL}/admin/leaves/${id}/approve`,
  REJECT_LEAVE: (id) => `${API_BASE_URL}/admin/leaves/${id}/reject`,
  GET_LEAVE_CALENDAR: `${API_BASE_URL}/admin/leaves/calendar`,
  GET_LEAVE_POLICIES: `${API_BASE_URL}/admin/leaves/policies`,

  // Onboarding & Offboarding
  GET_ONBOARDING_LIST: `${API_BASE_URL}/admin/onboarding`,
  UPDATE_ONBOARDING_TASK: (id) => `${API_BASE_URL}/admin/onboarding/tasks/${id}`,
  SEND_ONBOARDING_NUDGE: (id) => `${API_BASE_URL}/admin/onboarding/${id}/nudge`,
  GET_OFFBOARDING_LIST: `${API_BASE_URL}/admin/offboarding`,
  INITIATE_OFFBOARDING: `${API_BASE_URL}/admin/offboarding/initiate`,
  UPDATE_OFFBOARDING_TASK: (id) => `${API_BASE_URL}/admin/offboarding/tasks/${id}`,

  // Check-ins & Performance
  GET_CHECKIN_CYCLES: `${API_BASE_URL}/admin/check-ins/cycles`,
  CREATE_CHECKIN_CYCLE: `${API_BASE_URL}/admin/check-ins/cycles`,
  SUBMIT_CHECKIN: `${API_BASE_URL}/admin/check-ins/submit`,
  GET_CHECKIN_RESPONSES: (cycleId) => `${API_BASE_URL}/admin/check-ins/cycles/${cycleId}/responses`,

  // Surveys
  GET_SURVEYS: `${API_BASE_URL}/admin/surveys`,
  CREATE_SURVEY: `${API_BASE_URL}/admin/surveys`,
  GET_SURVEY_RESULTS: (id) => `${API_BASE_URL}/admin/surveys/${id}/results`,
  SUBMIT_SURVEY_RESPONSE: (id) => `${API_BASE_URL}/admin/surveys/${id}/respond`,

  // Documents
  GET_DOCUMENTS: `${API_BASE_URL}/admin/documents`,
  UPLOAD_DOCUMENT: `${API_BASE_URL}/admin/documents/upload`,
  DELETE_DOCUMENT: (id) => `${API_BASE_URL}/admin/documents/${id}`,
  ACKNOWLEDGE_DOCUMENT: (id) => `${API_BASE_URL}/admin/documents/${id}/acknowledge`,

  // Settings
  GET_SETTINGS: `${API_BASE_URL}/admin/settings/general`,
  UPDATE_SETTINGS: `${API_BASE_URL}/admin/settings/general/update`,
  GET_SECURITY_SETTINGS: `${API_BASE_URL}/admin/settings/security`,
  UPDATE_SECURITY_SETTINGS: `${API_BASE_URL}/admin/settings/security/update`,
  GET_BILLING_SETTINGS: `${API_BASE_URL}/admin/settings/billing`,
  UPDATE_BILLING_SETTINGS: `${API_BASE_URL}/admin/settings/billing/update`,
  GET_NOTIFICATION_SETTINGS: `${API_BASE_URL}/admin/settings/notifications`,
  UPDATE_NOTIFICATION_SETTINGS: `${API_BASE_URL}/admin/settings/notifications/update`,

  // Payroll
  GET_PAYROLL_SUMMARY: `${API_BASE_URL}/payroll/summary`,
  RUN_PAYROLL: `${API_BASE_URL}/payroll/run`,
  EXPORT_PAYROLL_BATCH: `${API_BASE_URL}/payroll/export`,

  // Manager Portal Endpoints
  GET_DIRECT_REPORTS: `${API_BASE_URL}/manager/reports`,
  SAVE_1ON1_NOTES: (id) => `${API_BASE_URL}/manager/reports/${id}/1on1-notes`,
  GET_TEAM_LEAVES: `${API_BASE_URL}/manager/leaves`,
  APPROVE_TEAM_LEAVE: (id) => `${API_BASE_URL}/manager/leaves/${id}/approve`,
  REJECT_TEAM_LEAVE: (id) => `${API_BASE_URL}/manager/leaves/${id}/reject`,
  SUBMIT_MANAGER_EVALUATION: (id) => `${API_BASE_URL}/manager/reviews/${id}/evaluate`,

  // Employee Portal Endpoints
  CLOCK_IN: `${API_BASE_URL}/employee/attendance/clock-in`,
  CLOCK_OUT: `${API_BASE_URL}/employee/attendance/clock-out`,
  GET_MY_LEAVE_BALANCES: `${API_BASE_URL}/employee/leaves/balances`,
  GET_MY_LEAVES: `${API_BASE_URL}/employee/leaves`,
  APPLY_MY_LEAVE: `${API_BASE_URL}/employee/leaves/apply`,
  CANCEL_MY_LEAVE: (id) => `${API_BASE_URL}/employee/leaves/${id}/cancel`,
  GET_MY_TASKS: `${API_BASE_URL}/employee/tasks`,
  TOGGLE_MY_TASK: (id) => `${API_BASE_URL}/employee/tasks/${id}/toggle`,
  GET_MY_PAYSLIPS: `${API_BASE_URL}/employee/payslips`,
  DOWNLOAD_PAYSLIP_PDF: (id) => `${API_BASE_URL}/employee/payslips/${id}/pdf`,
  ACKNOWLEDGE_POLICY_DOC: (id) => `${API_BASE_URL}/employee/documents/${id}/acknowledge`,
  SUBMIT_MY_REVIEW: `${API_BASE_URL}/employee/reviews/self-assessment`,
  UPDATE_MY_PROFILE: `${API_BASE_URL}/employee/profile/update`,
};

// Validation Rules
export const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 128,
  REQUIRE_UPPERCASE: true,
  REQUIRE_LOWERCASE: true,
  REQUIRE_NUMBER: true,
  REQUIRE_SPECIAL: true,
  SPECIAL_CHARS: '!@#$%^&*()',
};

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[\]{};':"\\|,.<>/?]).{8,128}$/;

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
};

// Invite Status
export const INVITE_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  DECLINED: 'declined',
  EXPIRED: 'expired',
};

// Notification Types
export const NOTIFICATION_TYPES = {
  LEAVE_REQUEST_SUBMITTED: 'leave_request_submitted',
  LEAVE_APPROVED_DECLINED: 'leave_approved_declined',
  WEEKLY_ANALYTICS: 'weekly_analytics',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'hrstack_auth_token',
  REFRESH_TOKEN: 'hrstack_refresh_token',
  USER_DATA: 'hrstack_user_data',
  WORKSPACE_DATA: 'hrstack_workspace_data',
  PREFERENCES: 'hrstack_preferences',
};

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PASSWORD: 'Password does not meet requirements',
  PASSWORDS_NOT_MATCH: 'Passwords do not match',
  INVALID_OTP: 'Invalid or expired OTP code',
  EMAIL_ALREADY_EXISTS: 'Email address is already in use',
  INVALID_CREDENTIALS: 'Invalid email or password',
  NETWORK_ERROR: 'Network error. Please try again',
  SERVER_ERROR: 'Server error. Please try again later',
  SESSION_EXPIRED: 'Your session has expired. Please sign in again',
  UNAUTHORIZED: 'You are not authorized to perform this action',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  SIGN_UP_SUCCESS: 'Account created successfully. Please verify your email.',
  PASSWORD_RESET_SUCCESS: 'Password has been reset successfully.',
  PASSWORD_CHANGED_SUCCESS: 'Password has been changed successfully.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  INVITE_SENT: 'Invitation sent successfully.',
  SETTINGS_SAVED: 'Settings saved successfully.',
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};
