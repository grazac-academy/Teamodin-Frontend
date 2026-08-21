import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { validatePassword, validatePasswordMatch } from '../../utils/validation';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import '../pages.css';

const InviteOnboardingPage = () => {
  const navigate = useNavigate();
  const { inviteToken } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [inviteData, setInviteData] = useState({
    fullName: 'Tunde Adeyemi',
    email: 'tunde@acme.com',
    jobTitle: 'Sales Associate',
    department: 'Sales',
    role: 'employee',
    password: '',
    confirmPassword: '',
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setInviteData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStep1Continue = (e) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handleStep2Continue = async (e) => {
    e.preventDefault();
    setError('');

    const passwordValidation = validatePassword(inviteData.password);
    if (!passwordValidation.valid) {
      setError(passwordValidation.error);
      return;
    }

    const matchValidation = validatePasswordMatch(
      inviteData.password,
      inviteData.confirmPassword
    );
    if (!matchValidation.valid) {
      setError(matchValidation.error);
      return;
    }

    setCurrentStep(3);
  };

  const handleAcceptInvite = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Call API to accept invite
      // const result = await userAPI.acceptInvite(inviteToken, inviteData.password);
      
      // For now, just navigate to complete
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError('Failed to accept invite');
      setIsLoading(false);
    }
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

          <h1 className="auth-title">You've been invited to Acme</h1>
          <p className="auth-subtitle">
            Your account details have already been set up by your Admin.
            Confirm them below to continue — your role can't be changed
            from here.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 'var(--spacing-md)',
              marginBottom: 'var(--spacing-lg)',
              fontSize: 'var(--font-size-xs)',
            }}
          >
            {[1, 2, 3].map((step) => (
              <div key={step} style={{ flex: 1 }}>
                <div
                  style={{
                    width: '100%',
                    height: '4px',
                    backgroundColor:
                      step <= currentStep
                        ? 'var(--primary)'
                        : 'var(--neutral-200)',
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
              <div
                style={{
                  padding: 'var(--spacing-lg)',
                  backgroundColor: 'var(--success-light)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: 'var(--spacing-lg)',
                  fontSize: 'var(--font-size-sm)',
                }}
              >
                <p style={{ color: 'var(--success)' }}>
                  ✓ Amaka Okonkwo (Admin) invited you to join the Acme workspace.
                </p>
              </div>

              <div className="auth-form-group">
                <label style={{ fontWeight: 'bold', marginBottom: 'var(--spacing-md)', display: 'block' }}>
                  Full name
                </label>
                <div
                  style={{
                    padding: 'var(--spacing-md) var(--spacing-lg)',
                    backgroundColor: 'var(--neutral-50)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {inviteData.fullName}
                </div>
              </div>

              <div className="auth-form-group">
                <label style={{ fontWeight: 'bold', marginBottom: 'var(--spacing-md)', display: 'block' }}>
                  Work email
                </label>
                <div
                  style={{
                    padding: 'var(--spacing-md) var(--spacing-lg)',
                    backgroundColor: 'var(--neutral-50)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {inviteData.email}
                </div>
              </div>

              <div className="auth-form-group">
                <label style={{ fontWeight: 'bold', marginBottom: 'var(--spacing-md)', display: 'block' }}>
                  Job title & department
                </label>
                <div
                  style={{
                    padding: 'var(--spacing-md) var(--spacing-lg)',
                    backgroundColor: 'var(--neutral-50)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {inviteData.jobTitle} • {inviteData.department}
                </div>
              </div>

              <div className="auth-form-group">
                <label style={{ fontWeight: 'bold', marginBottom: 'var(--spacing-md)', display: 'block' }}>
                  Your role
                </label>
                <div
                  style={{
                    padding: 'var(--spacing-md) var(--spacing-lg)',
                    backgroundColor: 'var(--danger-light)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--danger)',
                  }}
                >
                  {inviteData.role}
                </div>
                <p
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--text-secondary)',
                    marginTop: 'var(--spacing-sm)',
                  }}
                >
                  Set by your Admin. Ask them if this needs to change.
                </p>
              </div>

              <Button
                variant="primary"
                size="md"
                fullWidth
                type="submit"
              >
                Continue
              </Button>
            </form>
          )}

          {currentStep === 2 && (
            <form onSubmit={handleStep2Continue} className="auth-form">
              <div
                style={{
                  paddingBottom: 'var(--spacing-lg)',
                  borderBottom: '1px solid var(--border-color)',
                  marginBottom: 'var(--spacing-lg)',
                }}
              >
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
                  Step 2 of 3 — Set password
                </p>
              </div>

              <Input
                label="Password"
                name="password"
                type="password"
                value={inviteData.password}
                placeholder="••••••••"
                onChange={handlePasswordChange}
                showPasswordToggle
                required
              />

              <Input
                label="Confirm password"
                name="confirmPassword"
                type="password"
                value={inviteData.confirmPassword}
                placeholder="••••••••"
                onChange={handlePasswordChange}
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
                >
                  Continue
                </Button>
              </div>
            </form>
          )}

          {currentStep === 3 && (
            <form onSubmit={handleAcceptInvite} className="auth-form">
              <div
                style={{
                  paddingBottom: 'var(--spacing-lg)',
                  borderBottom: '1px solid var(--border-color)',
                  marginBottom: 'var(--spacing-lg)',
                }}
              >
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
                  Step 3 of 3 — You're in
                </p>
              </div>

              <div
                style={{
                  textAlign: 'center',
                  padding: 'var(--spacing-2xl)',
                  backgroundColor: 'var(--success-light)',
                  borderRadius: 'var(--radius-lg)',
                  marginBottom: 'var(--spacing-lg)',
                }}
              >
                <div
                  style={{
                    fontSize: '48px',
                    marginBottom: 'var(--spacing-md)',
                  }}
                >
                  ✓
                </div>
                <h2 style={{ color: 'var(--success)', marginBottom: 'var(--spacing-md)' }}>
                  You're all set
                </h2>
                <p style={{ color: 'var(--success)', fontSize: 'var(--font-size-sm)' }}>
                  Your account is set up and you're ready to log in and start working.
                </p>
              </div>

              <Button
                variant="primary"
                size="md"
                fullWidth
                type="submit"
                loading={isLoading}
              >
                Go to dashboard
              </Button>
            </form>
          )}
        </div>
      </div>

      <div className="auth-visual-section">
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '120px',
              height: '120px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              margin: '0 auto var(--spacing-xl)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
            }}
          >
            TA
          </div>
          <h2
            style={{
              fontSize: 'var(--font-size-lg)',
              marginBottom: 'var(--spacing-sm)',
            }}
          >
            {inviteData.fullName}
          </h2>
          <p style={{ opacity: 0.8, marginBottom: 'var(--spacing-lg)' }}>
            {inviteData.jobTitle}
          </p>

          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: 'var(--spacing-lg)',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'left',
            }}
          >
            <p
              style={{
                fontSize: 'var(--font-size-xs)',
                opacity: 0.7,
                marginBottom: 'var(--spacing-sm)',
              }}
            >
              INVITE RECORD
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-md)',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              <div>
                <p style={{ opacity: 0.7 }}>Invited by</p>
                <p style={{ fontWeight: 'bold' }}>Amaka Okonkwo (Admin)</p>
              </div>
              <div>
                <p style={{ opacity: 0.7 }}>Invited on</p>
                <p style={{ fontWeight: 'bold' }}>28 Jun 2026</p>
              </div>
              <div>
                <p style={{ opacity: 0.7 }}>Link expires</p>
                <p style={{ fontWeight: 'bold' }}>5 Jul 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteOnboardingPage;
