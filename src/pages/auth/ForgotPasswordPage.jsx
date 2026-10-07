import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ShieldCheck, RefreshCw, Check, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import '../pages.css';

const StepIndicator = ({ number, label, active, completed }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <div style={{
        width: '28px', height: '28px', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: completed ? 'none' : active ? '1.5px solid #534ab7' : '1.5px solid #d1d5db',
        backgroundColor: completed ? '#10b981' : 'transparent',
        color: completed ? 'white' : active ? '#534ab7' : '#9ca3af',
        fontSize: '13px', fontWeight: '600'
      }}>
        {completed ? <Check size={16} strokeWidth={3} /> : number}
      </div>
      <span style={{ fontSize: '11px', fontWeight: '600', color: completed ? '#10b981' : active ? '#534ab7' : '#9ca3af' }}>{label}</span>
    </div>
  );
};

const Stepper = ({ currentStep }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '40px', marginTop: '24px' }}>
      <StepIndicator number={1} label="Email" active={currentStep >= 1} completed={currentStep > 1} />
      <div style={{ height: '1.5px', width: '50px', backgroundColor: currentStep > 1 ? '#10b981' : '#e5e7eb', margin: '0 4px', alignSelf: 'flex-start', marginTop: '13px' }} />
      <StepIndicator number={2} label="Verify OTP" active={currentStep >= 2} completed={currentStep > 2} />
      <div style={{ height: '1.5px', width: '50px', backgroundColor: currentStep > 2 ? '#10b981' : '#e5e7eb', margin: '0 4px', alignSelf: 'flex-start', marginTop: '13px' }} />
      <StepIndicator number={3} label="New Password" active={currentStep >= 3} completed={currentStep > 3} />
    </div>
  );
};

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 500);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 500);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(4);
    }, 500);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const isPasswordMatch = password && confirmPassword && password === confirmPassword;

  const rightPanelContent = {
    1: {
      icon: <Mail size={24} />,
      title: "Secure by default",
      subtitle: "Every password reset is verified by email — no one can access your workspace without confirming it is really you."
    },
    2: {
      icon: <Mail size={24} />,
      title: "Secure by default",
      subtitle: "Every password reset is verified by email — no one can access your workspace without confirming it is really you."
    },
    3: {
      icon: <ShieldCheck size={24} />,
      title: "Almost there",
      subtitle: "Once your password is set, you will be signed in automatically and taken to your workspace."
    },
    4: {
      icon: <RefreshCw size={24} />,
      title: "All set",
      subtitle: "Your account is protected with the new credentials and ready for your next sign-in."
    }
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
          
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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

          <Stepper currentStep={step} />

          {/* Step 1: Email */}
          {step === 1 && (
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '0 0 12px 0' }}>
                Forgot your password?
              </h1>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 32px 0', lineHeight: '1.5' }}>
                Enter the email address linked to your HRStack account. We will send you a 6-digit verification code.
              </p>

              <form onSubmit={handleSendCode} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Work email</label>
                  <input 
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="amaka@acme.com"
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '15px' }} 
                    required
                  />
                </div>

                <button type="submit" disabled={isLoading} className="auth-btn-primary" style={{
                  marginTop: '8px', padding: '14px', backgroundColor: '#534ab7', color: 'white', border: 'none',
                  borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                  Send verification code
                </button>

                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                  <Link to="/sign-in" style={{ color: '#534ab7', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
                    &larr; Back to sign in
                  </Link>
                </div>
              </form>
            </div>
          )}

          {/* Step 2: Verify OTP */}
          {step === 2 && (
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '0 0 24px 0' }}>
                Check your email
              </h1>
              
              <div style={{ backgroundColor: '#f3f0ff', padding: '16px', borderRadius: '8px', marginBottom: '32px', display: 'flex', gap: '12px' }}>
                <Mail size={20} color="#534ab7" style={{ flexShrink: 0, marginTop: '2px' }} />
                <p style={{ fontSize: '14px', color: '#4c42a5', margin: 0, lineHeight: '1.5' }}>
                  We sent a 6-digit code to <strong>{email || 'amaka@acme.com'}</strong>. It expires in 10 minutes.
                </p>
              </div>

              <form onSubmit={handleVerifyCode} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ textAlign: 'center' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '16px' }}>Enter your 6-digit code</label>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', marginBottom: '12px' }}>
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        style={{
                          width: '100%', maxWidth: '48px', height: '56px', fontSize: '24px', fontWeight: '600', textAlign: 'center',
                          borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', color: '#111827'
                        }}
                        required
                      />
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '0 10px' }}>
                    <span style={{ color: '#9ca3af' }}>Code expires in 1:52</span>
                    <button type="button" style={{ background: 'none', border: 'none', color: '#534ab7', fontWeight: '600', cursor: 'pointer', padding: 0 }}>
                      Resend code
                    </button>
                  </div>
                </div>

                <div style={{ backgroundColor: '#eff6ff', padding: '16px', borderRadius: '8px', display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <div style={{ flexShrink: 0, marginTop: '2px', color: '#3b82f6' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </div>
                  <p style={{ fontSize: '13px', color: '#1d4ed8', margin: 0, lineHeight: '1.5' }}>
                    Did not get the email? Check your spam folder or confirm the address above is correct.
                  </p>
                </div>

                <button type="submit" disabled={isLoading} className="auth-btn-primary" style={{
                  marginTop: '8px', padding: '14px', backgroundColor: '#534ab7', color: 'white', border: 'none',
                  borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                }}>
                  <RefreshCw size={18} /> Verify code
                </button>

                <div style={{ textAlign: 'center', marginTop: '8px' }}>
                  <button type="button" onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#534ab7', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                    &larr; Change email address
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '0 0 12px 0' }}>
                Set a new password
              </h1>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 32px 0', lineHeight: '1.5' }}>
                Your identity is verified. Choose a strong new password for your account.
              </p>

              <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>New password</label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <input 
                      type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                      style={{ width: '100%', padding: '12px 48px 12px 16px', borderRadius: '8px', border: password ? '1px solid #10b981' : '1px solid #d1d5db', outline: 'none', fontSize: '15px' }} 
                      required
                    />
                    <div style={{ position: 'absolute', right: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {password && <Check size={18} color="#10b981" />}
                      <div onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer', color: '#9ca3af', display: 'flex' }}>
                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '16px', borderRadius: '8px' }}>
                  <p style={{ fontSize: '11px', fontWeight: '700', color: '#166534', margin: '0 0 12px 0', letterSpacing: '0.5px' }}>PASSWORD REQUIREMENTS</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      { label: 'Between 8 and 12 characters', valid: password.length >= 8 && password.length <= 12 },
                      { label: 'At least 1 uppercase letter (A-Z)', valid: /[A-Z]/.test(password) },
                      { label: 'At least 1 lowercase letter (a-z)', valid: /[a-z]/.test(password) },
                      { label: 'At least 1 number (0-9)', valid: /[0-9]/.test(password) },
                      { label: 'At least 1 special character (!@#$%^&*)', valid: /[!@#$%^&*]/.test(password) },
                      { label: 'No spaces allowed', valid: password.length > 0 && !/\s/.test(password) }
                    ].map((req, i) => {
                      const isError = password.length > 0 && !req.valid;
                      return (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: req.valid ? '#15803d' : (isError ? '#ef4444' : '#6b7280'), transition: 'color 0.2s ease' }}>
                          {req.valid ? (
                            <CheckCircle2 size={14} color="#22c55e" />
                          ) : (
                            <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: isError ? '1.5px solid #ef4444' : '1.5px solid #9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s ease' }} />
                          )}
                          <span style={{ cursor: 'default' }}>{req.label}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', borderTop: '1px solid #bbf7d0', paddingTop: '12px' }}>
                    <span style={{ fontSize: '13px', color: '#166534' }}>Password strength</span>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#166534' }}>
                      {(() => {
                        const score = [
                          password.length >= 8,
                          /[A-Z]/.test(password),
                          /[a-z]/.test(password),
                          /[0-9]/.test(password),
                          /[!@#$%^&*]/.test(password),
                          !/\s/.test(password)
                        ].filter(Boolean).length;
                        if (password.length === 0) return 'None';
                        if (score === 6) return 'Strong';
                        if (score >= 4) return 'Good';
                        return 'Weak';
                      })()}
                    </span>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Re-enter new password</label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <input 
                      type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••"
                      style={{ width: '100%', padding: '12px 48px 12px 16px', borderRadius: '8px', border: isPasswordMatch ? '1px solid #10b981' : '1px solid #d1d5db', outline: 'none', fontSize: '15px' }} 
                      required
                    />
                    <div style={{ position: 'absolute', right: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {isPasswordMatch && <Check size={18} color="#10b981" />}
                      <div onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ cursor: 'pointer', color: '#9ca3af', display: 'flex' }}>
                        {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                      </div>
                    </div>
                  </div>
                  {isPasswordMatch && (
                    <p style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#10b981', margin: '6px 0 0 0' }}>
                      <Check size={14} /> Passwords match
                    </p>
                  )}
                </div>

                <button type="submit" disabled={isLoading} className="auth-btn-primary" style={{
                  marginTop: '8px', padding: '14px', backgroundColor: '#534ab7', color: 'white', border: 'none',
                  borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                }}>
                  <ShieldCheck size={18} /> Reset password
                </button>
              </form>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: '#d1fae5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <Check size={32} color="#10b981" strokeWidth={3} />
              </div>
              <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '0 0 12px 0' }}>
                Password reset successfully
              </h1>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 32px 0', lineHeight: '1.5', maxWidth: '300px' }}>
                Your new password is active. You can now sign in with your updated credentials.
              </p>
              <button onClick={() => navigate('/sign-in')} className="auth-btn-primary" style={{
                width: '100%', padding: '14px', backgroundColor: '#534ab7', color: 'white', border: 'none',
                borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                  <polyline points="10 17 15 12 10 7"></polyline>
                  <line x1="15" y1="12" x2="3" y2="12"></line>
                </svg>
                Go to sign in
              </button>
            </div>
          )}

        </div>

        {/* Right Side: Visual */}
        <div className="auth-panel-right">
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            
            <div style={{ 
              width: '64px', height: '64px', backgroundColor: 'rgba(255,255,255,0.1)', 
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
              marginBottom: '32px'
            }}>
              {rightPanelContent[step].icon}
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: '600', color: 'white', textAlign: 'center', marginBottom: '16px', lineHeight: '1.3' }}>
              {rightPanelContent[step].title}
            </h2>

            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', margin: '0', lineHeight: '1.5', maxWidth: '320px', textAlign: 'center' }}>
              {rightPanelContent[step].subtitle}
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ForgotPasswordPage;
