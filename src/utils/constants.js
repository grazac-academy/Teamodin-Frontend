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
  GET_SETTINGS: `${API_BASE_URL}/admin/settings/general`,
  UPDATE_SETTINGS: `${API_BASE_URL}/admin/settings/general/update`,
  GET_SECURITY_SETTINGS: `${API_BASE_URL}/admin/settings/security`,
  UPDATE_SECURITY_SETTINGS: `${API_BASE_URL}/admin/settings/security/update`,
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

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\[\]{};':"\\|,.<>\/?]).{8,128}$/;

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
