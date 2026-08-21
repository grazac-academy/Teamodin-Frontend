import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../../utils/api';
import { validateEmail } from '../../utils/validation';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import '../pages.css';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validation = validateEmail(email);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setIsLoading(true);

    try {
      const result = await authAPI.forgotPassword(email);

      if (!result.success) {
        setError(result.error || 'Failed to send verification code');
        setIsLoading(false);
        return;
      }

      // Navigate to OTP verification with email
      navigate('/verify-otp', {
        state: { email, isForgotPassword: true },
        replace: true,
      });
    } catch (err) {
      setError('An unexpected error occurred');
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form-section">
        <div className="auth-form-container">
          <Link to="/sign-in" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)', color: 'var(--text-secondary)', textDecoration: 'none' }}>
            ← Back to sign in
          </Link>

          <div className="auth-logo">
            <span className="logo-icon">HR</span>
            <span>HRStack</span>
          </div>

          <h1 className="auth-title">Forgot your password?</h1>
          <p className="auth-subtitle">
            Enter the email address linked to your HRStack account. We will send you a 6-digit verification code.
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
            <Input
              label="Work email"
              name="email"
              type="email"
              value={email}
              placeholder="amaka@acme.com"
              onChange={(e) => setEmail(e.target.value)}
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
              Send verification code
            </Button>
          </form>

          <p className="auth-footer-text">
            Remember your password?{' '}
            <Link to="/sign-in">Sign in</Link>
          </p>
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
            Secure by default
          </h2>
          <p
            style={{
              fontSize: 'var(--font-size-base)',
              opacity: 0.9,
              lineHeight: 1.6,
            }}
          >
            Every password reset is verified by email — no one can access your workspace without confirming it's really you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
