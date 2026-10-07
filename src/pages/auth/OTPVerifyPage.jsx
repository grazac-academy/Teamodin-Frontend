import { useState, useEffect } from 'react';
import '../pages.css';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const OTPVerifyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const email = location.state?.email || 'amaka@acme.com';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(272); // 04:32 in seconds
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
    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);

    // Bypass API for UI flow testing
    setTimeout(() => {
      setIsLoading(false);
      navigate('/profile/setup', { replace: true });
    }, 500);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f4f5f7',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        display: 'flex',
        width: '100%',
        maxWidth: '1000px',
        backgroundColor: '#fff',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
      }}>
        {/* Left Side: Form */}
        <div style={{ flex: '1', padding: '48px', display: 'flex', flexDirection: 'column' }}>
          
          {/* Top Logo & Back Link */}
          <div style={{ marginBottom: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <div style={{ 
                width: '32px', height: '32px', backgroundColor: '#534ab7', 
                borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' 
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>HRStack</span>
            </div>
            
            <Link to="/sign-in" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#6b7280', textDecoration: 'none', fontSize: '14px' }}>
              <span>&larr;</span> Back to sign in
            </Link>
          </div>

          {/* Main Form Content */}
          <div style={{ maxWidth: '400px', width: '100%' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', margin: '0 0 8px 0' }}>
              Check your email
            </h1>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 24px 0', lineHeight: '1.5' }}>
              We sent a 6-digit code to {email}. Enter it below to continue.
            </p>

            {error && (
              <div style={{ padding: '12px', backgroundColor: '#fef2f2', color: '#ef4444', borderRadius: '8px', fontSize: '14px', marginBottom: '16px' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleVerifyOTP}>
              
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', justifyContent: 'space-between' }}>
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
                      width: '100%',
                      maxWidth: '48px',
                      height: '56px',
                      fontSize: '20px',
                      fontWeight: '600',
                      textAlign: 'center',
                      border: digit ? '1px solid #534ab7' : '1px solid #e5e7eb',
                      backgroundColor: digit ? '#eff2ff' : '#ffffff',
                      borderRadius: '8px',
                      outline: 'none',
                      color: '#374151'
                    }}
                  />
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', fontSize: '13px' }}>
                <span style={{ color: '#9ca3af' }}>Code expires in {formatTime(timeLeft)}</span>
                <button type="button" onClick={() => setTimeLeft(300)} style={{ background: 'none', border: 'none', color: '#534ab7', fontWeight: '500', cursor: 'pointer', padding: 0 }}>
                  Resend code
                </button>
              </div>

              <button type="submit" disabled={isLoading} className="auth-btn-primary" style={{
                width: '100%', padding: '14px', backgroundColor: '#534ab7', color: 'white', border: 'none',
                borderRadius: '8px', fontSize: '15px', fontWeight: '500', cursor: 'pointer',
                marginBottom: '16px'
              }}>
                Verify code
              </button>

              <div style={{ backgroundColor: '#eef2ff', padding: '16px', borderRadius: '8px', fontSize: '13px', color: '#534ab7', lineHeight: '1.5' }}>
                Didn't get the email? Check your spam folder, or confirm <br/>
                {email} is correct.
              </div>

            </form>
          </div>
        </div>

        {/* Right Side: Visual */}
        <div className="auth-panel-right">
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '64px', height: '64px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Mail color="white" size={28} />
            </div>

            <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'white', margin: '0 0 12px 0' }}>
              Secure by default
            </h2>
            
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', textAlign: 'center', maxWidth: '320px', lineHeight: '1.5', margin: 0 }}>
              Every sign-in and password reset is verified by email — no one can access your workspace without confirming it's really you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerifyPage;

