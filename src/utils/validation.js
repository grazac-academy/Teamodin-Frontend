import { 
  EMAIL_REGEX, 
  PASSWORD_REGEX, 
  PASSWORD_REQUIREMENTS,
  ERROR_MESSAGES 
} from './constants';

export const validateEmail = (email) => {
  if (!email) return { valid: false, error: 'Email is required' };
  if (!EMAIL_REGEX.test(email)) return { valid: false, error: ERROR_MESSAGES.INVALID_EMAIL };
  return { valid: true };
};

export const validatePassword = (password) => {
  if (!password) return { valid: false, error: 'Password is required' };
  if (password.length < PASSWORD_REQUIREMENTS.MIN_LENGTH) {
    return { 
      valid: false, 
      error: `Password must be at least ${PASSWORD_REQUIREMENTS.MIN_LENGTH} characters` 
    };
  }
  if (!PASSWORD_REGEX.test(password)) {
    return { 
      valid: false, 
      error: ERROR_MESSAGES.INVALID_PASSWORD,
      requirements: getPasswordRequirements(password)
    };
  }
  return { valid: true };
};

export const validatePasswordMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return { valid: false, error: ERROR_MESSAGES.PASSWORDS_NOT_MATCH };
  }
  return { valid: true };
};

export const validateOTP = (otp) => {
  if (!otp) return { valid: false, error: 'OTP is required' };
  if (!/^\d{6}$/.test(otp)) {
    return { valid: false, error: 'OTP must be 6 digits' };
  }
  return { valid: true };
};

export const validateCompanyName = (name) => {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Company name is required' };
  }
  if (name.length < 2) {
    return { valid: false, error: 'Company name must be at least 2 characters' };
  }
  return { valid: true };
};

export const validateWorkspaceUrl = (url) => {
  if (!url || url.trim().length === 0) {
    return { valid: false, error: 'Workspace URL is required' };
  }
  if (!/^[a-z0-9-]{3,}$/.test(url)) {
    return { 
      valid: false, 
      error: 'Workspace URL must be at least 3 characters and contain only lowercase letters, numbers, and hyphens' 
    };
  }
  return { valid: true };
};

export const validateFullName = (name) => {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Full name is required' };
  }
  if (name.length < 2) {
    return { valid: false, error: 'Full name must be at least 2 characters' };
  }
  if (name.length > 100) {
    return { valid: false, error: 'Full name cannot exceed 100 characters' };
  }
  return { valid: true };
};

export const validatePhoneNumber = (phone) => {
  if (!phone) return { valid: false, error: 'Phone number is required' };
  if (!/^[\d\s\-\+\(\)]{7,}$/.test(phone.replace(/\s/g, ''))) {
    return { valid: false, error: 'Please enter a valid phone number' };
  }
  return { valid: true };
};

export const validateJobTitle = (title) => {
  if (!title || title.trim().length === 0) {
    return { valid: false, error: 'Job title is required' };
  }
  if (title.length > 100) {
    return { valid: false, error: 'Job title cannot exceed 100 characters' };
  }
  return { valid: true };
};

export const validateDepartment = (department) => {
  if (!department || department.trim().length === 0) {
    return { valid: false, error: 'Department is required' };
  }
  return { valid: true };
};

export const getPasswordRequirements = (password = '') => {
  return {
    minLength: password.length >= PASSWORD_REQUIREMENTS.MIN_LENGTH,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: new RegExp(`[${PASSWORD_REQUIREMENTS.SPECIAL_CHARS.replace(/[\[\]\\]/g, '\\$&')}]`).test(password),
    noSpaces: !/\s/.test(password),
  };
};

export const getPasswordStrength = (password) => {
  const requirements = getPasswordRequirements(password);
  const metRequirements = Object.values(requirements).filter(Boolean).length;
  
  if (metRequirements <= 2) return { level: 'weak', score: 1 };
  if (metRequirements <= 4) return { level: 'medium', score: 2 };
  return { level: 'strong', score: 3 };
};

export const validateForm = (formData, validationSchema) => {
  const errors = {};
  
  Object.keys(validationSchema).forEach((field) => {
    const validator = validationSchema[field];
    const result = validator(formData[field]);
    
    if (!result.valid) {
      errors[field] = result.error;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
