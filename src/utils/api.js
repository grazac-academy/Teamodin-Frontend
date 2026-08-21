import { STORAGE_KEYS, HTTP_STATUS } from './constants';

class APIClient {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
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
    const headers = {
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
    };

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

    const headers = {
      Authorization: `Bearer ${this.getAuthToken()}`,
    };

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
  inviteEmployee: (inviteData) =>
    apiClient.post('/admin/employees/invite', inviteData),

  getEmployees: (filters = {}) =>
    apiClient.get('/admin/employees', { params: filters }),

  getSettings: () =>
    apiClient.get('/admin/settings/general'),

  updateSettings: (settingsData) =>
    apiClient.put('/admin/settings/general/update', settingsData),

  getSecuritySettings: () =>
    apiClient.get('/admin/settings/security'),

  updateSecuritySettings: (securityData) =>
    apiClient.put('/admin/settings/security/update', securityData),
};
