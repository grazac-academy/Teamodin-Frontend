import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import { validateEmail, validatePassword } from '../../utils/validation';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import '../pages.css';

const SignInPage = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [apiError, setApiError] = useState('');

  const validationSchema = {
    email: (value) => validateEmail(value),
    password: (value) => validatePassword(value),
  };

  const handleSubmitSignIn = async (values) => {
    setApiError('');

    try {
      const result = await signIn(values.email, values.password);

      if (!result.success) {
        setApiError(result.error || 'Failed to sign in');
        return;
      }

      // Redirect to dashboard or workspace
      navigate('/admin/dashboard', { replace: true });
    } catch (error) {
      setApiError('An unexpected error occurred');
      console.error('Sign in error:', error);
    }
  };

  const form = useForm(
    { email: '', password: '' },
    handleSubmitSignIn,
    validationSchema
  );

  return (
    <div className="auth-page">
      <div className="auth-form-section">
        <div className="auth-form-container">
          {/* Logo */}
          <div className="auth-logo">
            <span className="logo-icon">HR</span>
            <span>HRStack</span>
          </div>

          {/* Heading */}
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">
            Sign in to your workspace to continue.
          </p>

          {/* API Error */}
          {apiError && (
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
              {apiError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={form.handleSubmit} className="auth-form">
            <Input
              label="Work email"
              name="email"
              type="email"
              value={form.values.email}
              placeholder="hr@acme.com"
              error={form.errors.email}
              touched={form.touched.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={form.values.password}
              placeholder="••••••••"
              error={form.errors.password}
              touched={form.touched.password}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              showPasswordToggle
              required
            />

            {/* Remember Me & Forgot Password */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-md)',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  name="remember"
                  onChange={form.handleChange}
                />
                <span>Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                style={{
                  color: 'var(--primary)',
                  textDecoration: 'none',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              variant="primary"
              size="md"
              fullWidth
              type="submit"
              loading={form.isSubmitting}
            >
              Sign in
            </Button>
          </form>

          {/* OR Divider */}
          <div className="auth-divider">OR</div>

          {/* Google Sign In */}
          <Button
            variant="secondary"
            size="md"
            fullWidth
            type="button"
            icon="🔍"
          >
            Continue with Google
          </Button>

          {/* Footer */}
          <p className="auth-footer-text">
            Do not have a workspace yet?{' '}
            <Link to="/sign-up">Sign up</Link>
          </p>
        </div>
      </div>

      {/* Visual Section */}
      <div className="auth-visual-section">
        <div>
          <h2
            style={{
              fontSize: 'var(--font-size-xl)',
              marginBottom: 'var(--spacing-lg)',
            }}
          >
            Run HR for your whole team from one place
          </h2>
          <p
            style={{
              fontSize: 'var(--font-size-base)',
              opacity: 0.9,
              lineHeight: 1.6,
            }}
          >
            Leave, onboarding, performance, and people data — without the
            spreadsheets.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 'var(--spacing-xl)',
              marginTop: 'var(--spacing-2xl)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: 'var(--font-size-lg)',
                  marginBottom: 'var(--spacing-sm)',
                }}
              >
                30–200
              </h3>
              <p>Employees</p>
            </div>
            <div>
              <h3
                style={{
                  fontSize: 'var(--font-size-lg)',
                  marginBottom: 'var(--spacing-sm)',
                }}
              >
                4
              </h3>
              <p>Countries</p>
            </div>
            <div>
              <h3
                style={{
                  fontSize: 'var(--font-size-lg)',
                  marginBottom: 'var(--spacing-sm)',
                }}
              >
                99.9%
              </h3>
              <p>Uptime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
