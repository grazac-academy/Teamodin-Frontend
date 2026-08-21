import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { validateOTP } from '../../utils/validation';
import Button from '../../components/common/Button/Button';
import '../pages.css';

const OTPVerifyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOTP } = useAuth();
  const email = location.state?.email || '';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpBackspace = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');

    const otpCode = otp.join('');
    const validation = validateOTP(otpCode);

    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setIsLoading(true);

    try {
      const result = await verifyOTP(email, otpCode);

      if (!result.success) {
        setError(result.error || 'Failed to verify OTP');
        setIsLoading(false);
        return;
      }

      // Navigate to profile setup
      navigate('/profile/setup', { replace: true });
    } catch (err) {
      setError('An unexpected error occurred');
      setIsLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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

          <h1 className="auth-title">Check your email</h1>
          <p className="auth-subtitle">
            We sent a 6-digit code to {email}. Enter it below to continue.
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

          <form onSubmit={handleVerifyOTP} className="auth-form">
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', marginBottom: 'var(--spacing-lg)' }}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpBackspace(index, e)}
                  style={{
                    width: '48px',
                    height: '48px',
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    border: `2px solid var(--${digit ? 'primary' : 'border-color'})`,
                    borderRadius: 'var(--radius-md)',
                    transition: 'all var(--transition-fast)',
                  }}
                />
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 'var(--font-size-sm)',
                marginBottom: 'var(--spacing-lg)',
                color: 'var(--text-secondary)',
              }}
            >
              <span>Code expires in {formatTime(timeLeft)}</span>
              <button
                type="button"
                onClick={() => setTimeLeft(300)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary)',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                }}
              >
                Resend code
              </button>
            </div>

            <Button
              variant="primary"
              size="md"
              fullWidth
              type="submit"
              loading={isLoading}
            >
              Verify code
            </Button>
          </form>

          <p
            style={{
              fontSize: 'var(--font-size-xs)',
              color: 'var(--text-secondary)',
              backgroundColor: 'var(--neutral-50)',
              padding: 'var(--spacing-md)',
              borderRadius: 'var(--radius-md)',
              marginTop: 'var(--spacing-lg)',
            }}
          >
            Didn't get the email? Check your spam folder, or confirm{' '}
            <button
              type="button"
              onClick={() => navigate(-1)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              {email}
            </button>{' '}
            is correct.
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
            Every sign-in and password reset is verified by email — no one can access
            your workspace without confirming it's really you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerifyPage;
