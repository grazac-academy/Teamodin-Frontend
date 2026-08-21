import React, { createContext, useState, useCallback, useEffect } from 'react';
import { apiClient, authAPI, userAPI } from '../utils/api';
import { STORAGE_KEYS } from '../utils/constants';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
        // Optionally validate token with backend
        loadUserProfile();
      } catch (err) {
        console.error('Failed to initialize auth state:', err);
        clearAuth();
      }
    }
    setLoading(false);
  }, []);

  const clearAuth = useCallback(() => {
    apiClient.clearAuthTokens();
    localStorage.removeItem(STORAGE_KEYS.WORKSPACE_DATA);
    setUser(null);
    setWorkspace(null);
    setIsAuthenticated(false);
    setError(null);
  }, []);

  const loadUserProfile = useCallback(async () => {
    try {
      const response = await userAPI.getProfile();
      if (response.success) {
        setUser(response.data);
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data));
      }
    } catch (err) {
      console.error('Failed to load user profile:', err);
    }
  }, []);

  const loadWorkspace = useCallback(async () => {
    try {
      const response = await userAPI.getWorkspace();
      if (response.success) {
        setWorkspace(response.data);
        localStorage.setItem(STORAGE_KEYS.WORKSPACE_DATA, JSON.stringify(response.data));
      }
    } catch (err) {
      console.error('Failed to load workspace:', err);
    }
  }, []);

  const signIn = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.signIn(email, password);

      if (!response.success) {
        throw new Error(response.error || 'Sign in failed');
      }

      const { access_token, refresh_token, user: userData } = response.data;

      apiClient.setAuthToken(access_token);
      apiClient.setRefreshToken(refresh_token);
      setUser(userData);
      setIsAuthenticated(true);

      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));

      await loadWorkspace();

      return { success: true, data: userData };
    } catch (err) {
      const errorMessage = err.message || 'Failed to sign in';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [loadWorkspace]);

  const signUp = useCallback(
    async (companyName, workspaceUrl, email, password) => {
      setLoading(true);
      setError(null);

      try {
        const response = await authAPI.signUp(
          companyName,
          workspaceUrl,
          email,
          password
        );

        if (!response.success) {
          throw new Error(response.error || 'Sign up failed');
        }

        return { success: true, data: response.data };
      } catch (err) {
        const errorMessage = err.message || 'Failed to sign up';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const verifyOTP = useCallback(async (email, otpCode) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.verifyOTP(email, otpCode);

      if (!response.success) {
        throw new Error(response.error || 'OTP verification failed');
      }

      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.message || 'Failed to verify OTP';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (email, otpCode, newPassword) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.resetPassword(email, otpCode, newPassword);

      if (!response.success) {
        throw new Error(response.error || 'Password reset failed');
      }

      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.message || 'Failed to reset password';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const changePassword = useCallback(
    async (currentPassword, newPassword) => {
      setLoading(true);
      setError(null);

      try {
        const response = await authAPI.changePassword(
          currentPassword,
          newPassword
        );

        if (!response.success) {
          throw new Error(response.error || 'Password change failed');
        }

        return { success: true, data: response.data };
      } catch (err) {
        const errorMessage = err.message || 'Failed to change password';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    setLoading(true);

    try {
      await authAPI.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      clearAuth();
      setLoading(false);
    }
  }, [clearAuth]);

  const value = {
    // State
    user,
    workspace,
    loading,
    error,
    isAuthenticated,

    // Methods
    signIn,
    signUp,
    verifyOTP,
    resetPassword,
    changePassword,
    logout,
    loadUserProfile,
    loadWorkspace,
    clearAuth,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
