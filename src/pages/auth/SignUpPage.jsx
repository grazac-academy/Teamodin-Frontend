import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import {
  validateCompanyName,
  validateWorkspaceUrl,
  validateEmail,
  validatePassword,
  validatePasswordMatch,
} from '../../utils/validation';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import '../pages.css';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [apiError, setApiError] = useState('');

  const [stepOneData, setStepOneData] = useState({
    companyName: '',
    workspaceUrl: '',
  });

  const [stepTwoData, setStepTwoData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Step 1 Validation
  const step1Schema = {
    companyName: (value) => validateCompanyName(value),
    workspaceUrl: (value) => validateWorkspaceUrl(value),
  };

  const handleStep1Submit = async (values) => {
    setStepOneData(values);
    setCurrentStep(2);
  };

  const form1 = useForm(stepOneData, handleStep1Submit, step1Schema);

  // Step 2 Validation
  const step2Schema = {
    email: (value) => validateEmail(value),
    password: (value) => validatePassword(value),
    confirmPassword: (value) => {
      const passwordCheck = validatePassword(stepTwoData.password);
      if (!passwordCheck.valid) return passwordCheck;
      return validatePasswordMatch(stepTwoData.password, value);
    },
  };

  const handleStep2Submit = async (values) => {
    setStepTwoData(values);
    setCurrentStep(3);
  };

  const form2 = useForm(
    stepTwoData,
    handleStep2Submit,
    currentStep === 2 ? step2Schema : null
  );

  // Step 3 - Final Submission
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    try {
      const result = await signUp(
        stepOneData.companyName,
        stepOneData.workspaceUrl,
        stepTwoData.email,
        stepTwoData.password
      );

      if (!result.success) {
        setApiError(result.error || 'Failed to create account');
        return;
      }

      navigate('/verify-otp', {
        state: { email: stepTwoData.email },
        replace: true,
      });
    } catch (error) {
      setApiError('An unexpected error occurred');
      console.error('Sign up error:', error);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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

          <h1 className="auth-title">Create your workspace</h1>
          <p className="auth-subtitle">
            Set up HRStack for your company in under 15 minutes.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 'var(--spacing-md)',
              marginBottom: 'var(--spacing-lg)',
              fontSize: 'var(--font-size-xs)',
              color: 'var(--text-secondary)',
            }}
          >
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-sm)',
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:
                      step <= currentStep
                        ? 'var(--primary)'
                        : 'var(--neutral-200)',
                    color: step <= currentStep ? 'white' : 'var(--text-secondary)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'bold',
                  }}
                >
                  {step}
                </div>
              </div>
            ))}
          </div>

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

          {currentStep === 1 && (
            <form onSubmit={form1.handleSubmit} className="auth-form">
              <div
                style={{
                  paddingBottom: 'var(--spacing-lg)',
                  borderBottom: '1px solid var(--border-color)',
                  marginBottom: 'var(--spacing-lg)',
                }}
              >
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
                  Step 1 of 3 — Workspace details
                </p>
              </div>

              <Input
                label="Company name"
                name="companyName"
                type="text"
                value={form1.values.companyName}
                placeholder="Acme Technologies Ltd"
                error={form1.errors.companyName}
                touched={form1.touched.companyName}
                onChange={form1.handleChange}
                onBlur={form1.handleBlur}
                required
              />

              <Input
                label="Workspace URL"
                name="workspaceUrl"
                type="text"
                value={form1.values.workspaceUrl}
                placeholder="acme-tech"
                error={form1.errors.workspaceUrl}
                touched={form1.touched.workspaceUrl}
                onChange={form1.handleChange}
                onBlur={form1.handleBlur}
                hint="This is your team's unique login link."
                required
              />

              <Button
                variant="primary"
                size="md"
                fullWidth
                type="submit"
                loading={form1.isSubmitting}
              >
                Continue
              </Button>
            </form>
          )}

          {currentStep === 2 && (
            <form onSubmit={form2.handleSubmit} className="auth-form">
              <div
                style={{
                  paddingBottom: 'var(--spacing-lg)',
                  borderBottom: '1px solid var(--border-color)',
                  marginBottom: 'var(--spacing-lg)',
                }}
              >
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
                  Step 2 of 3 — Account details
                </p>
              </div>

              <Input
                label="Work email"
                name="email"
                type="email"
                value={form2.values.email}
                placeholder="hr@acme.com"
                error={form2.errors.email}
                touched={form2.touched.email}
                onChange={form2.handleChange}
                onBlur={form2.handleBlur}
                required
              />

              <Input
                label="Password"
                name="password"
                type="password"
                value={form2.values.password}
                placeholder="••••••••"
                error={form2.errors.password}
                touched={form2.touched.password}
                onChange={form2.handleChange}
                onBlur={form2.handleBlur}
                showPasswordToggle
                required
              />

              <Input
                label="Re-enter password"
                name="confirmPassword"
                type="password"
                value={form2.values.confirmPassword}
                placeholder="••••••••"
                error={form2.errors.confirmPassword}
                touched={form2.touched.confirmPassword}
                onChange={form2.handleChange}
                onBlur={form2.handleBlur}
                showPasswordToggle
                required
              />

              <div
                style={{
                  display: 'flex',
                  gap: 'var(--spacing-md)',
                }}
              >
                <Button
                  variant="secondary"
                  size="md"
                  fullWidth
                  type="button"
                  onClick={goBack}
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  type="submit"
                  loading={form2.isSubmitting}
                >
                  Continue
                </Button>
              </div>
            </form>
          )}

          {currentStep === 3 && (
            <form onSubmit={handleFinalSubmit} className="auth-form">
              <div
                style={{
                  paddingBottom: 'var(--spacing-lg)',
                  borderBottom: '1px solid var(--border-color)',
                  marginBottom: 'var(--spacing-lg)',
                }}
              >
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
                  Step 3 of 3 — Review & create
                </p>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  padding: 'var(--spacing-lg)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: 'var(--spacing-lg)',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gap: 'var(--spacing-md)',
                    fontSize: 'var(--font-size-sm)',
                  }}
                >
                  <div>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xs)' }}>
                      Company name
                    </p>
                    <p style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>
                      {stepOneData.companyName}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xs)' }}>
                      Workspace URL
                    </p>
                    <p style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>
                      hrstack.app/{stepOneData.workspaceUrl}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xs)' }}>
                      Admin email
                    </p>
                    <p style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>
                      {stepTwoData.email}
                    </p>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: 'var(--spacing-md)',
                }}
              >
                <Button
                  variant="secondary"
                  size="md"
                  fullWidth
                  type="button"
                  onClick={goBack}
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  type="submit"
                  loading={false}
                >
                  Create workspace
                </Button>
              </div>
            </form>
          )}

          <p className="auth-footer-text">
            Already have a workspace?{' '}
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
            Everything your People Ops team needs
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-lg)',
              marginTop: 'var(--spacing-xl)',
            }}
          >
            <div>
              <h3 style={{ marginBottom: 'var(--spacing-xs)', fontSize: 'var(--font-size-base)' }}>
                📋 Employee directory
              </h3>
              <p style={{ fontSize: 'var(--font-size-sm)', opacity: 0.9 }}>
                Searchable profiles, org chart, CSV import.
              </p>
            </div>

            <div>
              <h3 style={{ marginBottom: 'var(--spacing-xs)', fontSize: 'var(--font-size-base)' }}>
                📅 Leave management
              </h3>
              <p style={{ fontSize: 'var(--font-size-sm)', opacity: 0.9 }}>
                Request, approve, balances update instantly.
              </p>
            </div>

            <div>
              <h3 style={{ marginBottom: 'var(--spacing-xs)', fontSize: 'var(--font-size-base)' }}>
                🚀 Onboarding workflows
              </h3>
              <p style={{ fontSize: 'var(--font-size-sm)', opacity: 0.9 }}>
                Tasks grouped by week and assigned to specific owners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
