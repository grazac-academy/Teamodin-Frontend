import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { validatePassword, getPasswordRequirements, getPasswordStrength } from '../../utils/validation';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import '../pages.css';

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const { changePassword } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const passwordRequirements = getPasswordRequirements(newPassword);
  const passwordStrength = getPasswordStrength(newPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!currentPassword) {
      setError('Current password is required');
      return;
    }

    const newPwdValidation = validatePassword(newPassword);
    if (!newPwdValidation.valid) {
      setError(newPwdValidation.error);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const result = await changePassword(currentPassword, newPassword);

      if (!result.success) {
        setError(result.error || 'Failed to change password');
        setIsLoading(false);
        return;
      }

      navigate('/admin/settings', { replace: true });
    } catch (err) {
      setError('An unexpected error occurred');
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form-section">
        <div className="auth-form-container">
          <div className="auth-logo">
            <span className="logo-icon">HR</span>
            <span>HRStack</span>
          </div>

          <h1 className="auth-title">Change password</h1>
          <p className="auth-subtitle">
            Enter your current password first, then choose a new one that meets all the requirements below.
          </p>

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

          <form onSubmit={handleSubmit} className="auth-form">
            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)' }}>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-md)' }}>CURRENT PASSWORD</p>
              <Input
                name="currentPassword"
                type="password"
                value={currentPassword}
                placeholder="••••••••"
                onChange={(e) => setCurrentPassword(e.target.value)}
                showPasswordToggle
                required
              />
            </div>

            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)' }}>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-md)' }}>NEW PASSWORD</p>
              <Input
                name="newPassword"
                type="password"
                value={newPassword}
                placeholder="••••••••"
                onChange={(e) => setNewPassword(e.target.value)}
                showPasswordToggle
                required
              />
            </div>

            {newPassword && (
              <div style={{ backgroundColor: 'var(--bg-secondary)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-lg)' }}>
                <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'bold', marginBottom: 'var(--spacing-md)', color: 'var(--text-secondary)' }}>PASSWORD REQUIREMENTS</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                  {[
                    { label: 'Between 8 and 12 characters', met: passwordRequirements.minLength },
                    { label: 'At least 1 uppercase letter (A-Z)', met: passwordRequirements.hasUppercase },
                    { label: 'At least 1 lowercase letter (a-z)', met: passwordRequirements.hasLowercase },
                    { label: 'At least 1 number (0-9)', met: passwordRequirements.hasNumber },
                    { label: 'At least 1 special character (!@#$%^&*)', met: passwordRequirements.hasSpecialChar },
                    { label: 'No spaces allowed', met: passwordRequirements.noSpaces },
                  ].map((req, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)' }}>
                      <span style={{ color: req.met ? 'var(--success)' : 'var(--text-muted)' }}>
                        {req.met ? '✓' : '○'}
                      </span>
                      <span style={{ color: req.met ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'bold' }}>
                  Password strength:{' '}
                  <span style={{ color: passwordStrength.score === 1 ? 'var(--danger)' : passwordStrength.score === 2 ? 'var(--warning)' : 'var(--success)' }}>
                    {passwordStrength.level}
                  </span>
                </div>
              </div>
            )}

            <Input
              label="Confirm new password"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              placeholder="••••••••"
              onChange={(e) => setConfirmPassword(e.target.value)}
              showPasswordToggle
              required
            />

            <Button
              variant="primary"
              size="md"
              fullWidth
              type="submit"
              loading={isLoading}
              icon="🔐"
            >
              Update password
            </Button>
          </form>
        </div>
      </div>

      <div className="auth-visual-section">
        <div>
          <h2
            style={{
              fontSize: 'var(--font-size-xl)',
              marginBottom: 'var(--spacing-lg)',
            }}
          >
            Keep your account secure
          </h2>
          <p
            style={{
              fontSize: 'var(--font-size-base)',
              opacity: 0.9,
              lineHeight: 1.6,
            }}
          >
            We recommend changing your password regularly, never sharing it with anyone, including HRStack support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
