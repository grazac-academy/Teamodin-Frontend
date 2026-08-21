import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { validateFullName, validatePhoneNumber, validateJobTitle, validateDepartment } from '../../utils/validation';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import '../pages.css';

const ProfileSetupPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: user?.full_name || '',
    jobTitle: '',
    department: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStep1Continue = async (e) => {
    e.preventDefault();
    setError('');

    const fullNameValidation = validateFullName(formData.fullName);
    if (!fullNameValidation.valid) {
      setError(fullNameValidation.error);
      return;
    }

    setCurrentStep(2);
  };

  const handleStep2Continue = async (e) => {
    e.preventDefault();
    setError('');

    const jobValidation = validateJobTitle(formData.jobTitle);
    if (!jobValidation.valid) {
      setError(jobValidation.error);
      return;
    }

    const deptValidation = validateDepartment(formData.department);
    if (!deptValidation.valid) {
      setError(deptValidation.error);
      return;
    }

    setCurrentStep(3);
  };

  const handleStep3Continue = async (e) => {
    e.preventDefault();
    setError('');

    const phoneValidation = validatePhoneNumber(formData.phoneNumber);
    if (!phoneValidation.valid) {
      setError(phoneValidation.error);
      return;
    }

    // Profile setup complete - navigate to dashboard
    navigate('/admin/dashboard', { replace: true });
  };

  const goBack = () => setCurrentStep(Math.max(1, currentStep - 1));

  return (
    <div className="auth-page">
      <div className="auth-form-section">
        <div className="auth-form-container">
          <div className="auth-logo">
            <span className="logo-icon">HR</span>
            <span>HRStack</span>
          </div>

          <h1 className="auth-title">Finish setting up your profile</h1>
          <p className="auth-subtitle">
            We pre-filled what we already know. Add your role details to complete your profile.
          </p>

          <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)', fontSize: 'var(--font-size-xs)' }}>
            {[1, 2, 3, 4].map((step) => (
              <div key={step} style={{ flex: 1 }}>
                <div
                  style={{
                    width: '100%',
                    height: '4px',
                    backgroundColor: step <= currentStep ? 'var(--primary)' : 'var(--neutral-200)',
                    borderRadius: '2px',
                  }}
                />
              </div>
            ))}
          </div>

          {error && (
            <div
              style={{
                padding: 'var(--spacing-md)',
                backgroundColor: 'var(--danger-light)',
                color: 'var(--danger)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-sm)',
                marginBottom: 'var(--spacing-lg)',
              }}
            >
              {error}
            </div>
          )}

          {currentStep === 1 && (
            <form onSubmit={handleStep1Continue} className="auth-form">
              <Input
                label="Full name"
                name="fullName"
                type="text"
                value={formData.fullName}
                placeholder="Amaka Okonkwo"
                onChange={handleChange}
                required
              />
              <Button variant="primary" size="md" fullWidth type="submit">
                Continue
              </Button>
            </form>
          )}

          {currentStep === 2 && (
            <form onSubmit={handleStep2Continue} className="auth-form">
              <Input
                label="Job title"
                name="jobTitle"
                type="text"
                value={formData.jobTitle}
                placeholder="e.g. Sales Associate"
                onChange={handleChange}
                required
              />

              <div>
                <label style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'bold', marginBottom: 'var(--spacing-sm)', display: 'block' }}>
                  Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md) var(--spacing-lg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--font-size-base)',
                  }}
                >
                  <option value="">Select</option>
                  <option value="sales">Sales</option>
                  <option value="marketing">Marketing</option>
                  <option value="engineering">Engineering</option>
                  <option value="operations">Operations</option>
                  <option value="hr">HR</option>
                  <option value="finance">Finance</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                <Button variant="secondary" size="md" fullWidth type="button" onClick={goBack}>
                  Back
                </Button>
                <Button variant="primary" size="md" fullWidth type="submit">
                  Continue
                </Button>
              </div>
            </form>
          )}

          {currentStep === 3 && (
            <form onSubmit={handleStep3Continue} className="auth-form">
              <Input
                label="Phone number"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                placeholder="+234 801 234 5678"
                onChange={handleChange}
                required
              />

              <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                <Button variant="secondary" size="md" fullWidth type="button" onClick={goBack}>
                  Back
                </Button>
                <Button variant="primary" size="md" fullWidth type="submit">
                  Complete setup
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="auth-visual-section">
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '120px', height: '120px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%', margin: '0 auto var(--spacing-xl)' }}></div>
          <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-lg)' }}>
            {formData.fullName}
          </h2>
          <p style={{ opacity: 0.9, marginBottom: 'var(--spacing-lg)' }}>Role not set</p>
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: 'var(--spacing-lg)',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'left',
            }}
          >
            <p style={{ fontSize: 'var(--font-size-xs)', opacity: 0.7, marginBottom: 'var(--spacing-sm)' }}>PROFILE RECORD</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)' }}>
              <div>
                <p style={{ opacity: 0.7 }}>Email</p>
                <p style={{ fontWeight: 'bold' }}>{user?.email}</p>
              </div>
              <div>
                <p style={{ opacity: 0.7 }}>Join date</p>
                <p style={{ fontWeight: 'bold' }}>{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p style={{ opacity: 0.7 }}>Status</p>
                <p style={{ fontWeight: 'bold' }}>Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupPage;
