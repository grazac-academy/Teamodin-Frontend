import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages.css';
import { Eye, EyeOff, Check, CheckCircle2 } from 'lucide-react';

const InviteOnboardingPage = () => {
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [inviteData, setInviteData] = useState({
    fullName: 'Tunde Adeyemi',
    email: 'tunde@acme.com',
    jobTitle: 'Sales Associate',
    department: 'Sales',
    role: 'Employee',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
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

  const handleStep2Continue = (e) => {
    e.preventDefault();
    if (inviteData.password !== inviteData.confirmPassword) return;
    setCurrentStep(3);
  };

  const handleAcceptInvite = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        navigate('/admin/dashboard', { replace: true });
      }, 1000);
    } catch {
      setIsLoading(false);
    }
  };

  const goBack = () => setCurrentStep(Math.max(1, currentStep - 1));

  const isPasswordMatch = inviteData.password && inviteData.confirmPassword && inviteData.password === inviteData.confirmPassword;

  return (
    <div className="auth-wrapper" style={{
      minHeight: '100vh',
      backgroundColor: '#f4f5f7',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div className="auth-container-mobile">
        
        {/* Left Side: Form */}
        <div className="auth-panel-left">
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
            <div style={{ 
              width: '32px', height: '32px', backgroundColor: '#534ab7', 
              borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
              fontSize: '12px', fontWeight: 'bold'
            }}>
              HR
            </div>
            <span style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>HRStack</span>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', textAlign: 'center' }}>
            {[1, 2, 3].map((step) => (
              <div key={step} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ 
                  width: '24px', height: '24px', borderRadius: '50%', 
                  backgroundColor: currentStep >= step ? '#534ab7' : '#f3f4f6',
                  color: currentStep >= step ? 'white' : '#9ca3af',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: '500'
                }}>
                  {step}
                </div>
                <span style={{ fontSize: '12px', color: currentStep >= step ? '#534ab7' : '#9ca3af', fontWeight: currentStep >= step ? '500' : 'normal' }}>
                  {step === 1 ? 'Accept invite' : step === 2 ? 'Set password' : "You're in"}
                </span>
                <div style={{ height: '2px', width: '100%', backgroundColor: currentStep > step ? '#534ab7' : '#f3f4f6', marginTop: '-18px', zIndex: -1, position: 'relative', top: '13px' }}></div>
              </div>
            ))}
          </div>

          {currentStep === 1 && (
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '0 0 8px 0' }}>
                You've been invited to Acme
              </h1>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 24px 0', lineHeight: '1.5' }}>
                Your account details have already been set up by your Admin. Confirm them below to continue — your role can't be changed from here.
              </p>

              <div style={{ 
                backgroundColor: '#f6f8ed', border: '1px solid #e1e9c2', borderRadius: '8px', 
                padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px'
              }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#cbe4c9', color: '#1b5e20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '600' }}>
                  AO
                </div>
                <p style={{ fontSize: '13px', color: '#374151', margin: 0 }}>
                  <strong>Amaka Okonkwo</strong> (Admin) invited you to join the Acme workspace.
                </p>
              </div>

              <form onSubmit={handleStep1Continue} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Full name</label>
                  <div style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', backgroundColor: '#f9fafb', color: '#6b7280', border: '1px solid #f3f4f6', fontSize: '15px' }}>
                    {inviteData.fullName}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Work email</label>
                  <div style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', backgroundColor: '#f9fafb', color: '#6b7280', border: '1px solid #f3f4f6', fontSize: '15px' }}>
                    {inviteData.email}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Job title & department</label>
                  <div style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', backgroundColor: '#f9fafb', color: '#6b7280', border: '1px solid #f3f4f6', fontSize: '15px' }}>
                    {inviteData.jobTitle} · {inviteData.department}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Your role</label>
                  <div style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', backgroundColor: '#fff7ed', color: '#c2410c', border: '1px solid #fed7aa', fontSize: '15px', fontWeight: '500' }}>
                    {inviteData.role}
                  </div>
                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: '6px 0 0 0' }}>Set by your Admin. Ask them if this needs to change.</p>
                </div>

                <button type="submit" style={{
                  marginTop: '8px', padding: '14px', backgroundColor: '#534ab7', color: 'white', border: 'none',
                  borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', width: '100%'
                }}>
                  Accept invite & continue
                </button>
              </form>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '0 0 8px 0' }}>
                Set your password
              </h1>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 32px 0' }}>
                Create a password to securely access your Acme workspace.
              </p>

              <form onSubmit={handleStep2Continue} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Password</label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <input 
                      type={showPassword ? "text" : "password"} name="password" value={inviteData.password} onChange={handleChange} placeholder="••••••••"
                      style={{ width: '100%', padding: '12px 48px 12px 16px', borderRadius: '8px', border: inviteData.password ? '1px solid #10b981' : '1px solid #d1d5db', outline: 'none', fontSize: '15px' }} 
                      required
                    />
                    <div style={{ position: 'absolute', right: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {inviteData.password && <Check size={18} color="#10b981" />}
                      <div onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer', color: '#9ca3af', display: 'flex' }}>
                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Re-enter password</label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <input 
                      type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={inviteData.confirmPassword} onChange={handleChange} placeholder="••••••••"
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

                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <button type="button" onClick={goBack} style={{
                    padding: '14px', backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db',
                    borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', width: '50%'
                  }}>
                    Back
                  </button>
                  <button type="submit" disabled={!isPasswordMatch} style={{
                    padding: '14px', backgroundColor: '#534ab7', color: 'white', border: 'none',
                    borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: isPasswordMatch ? 'pointer' : 'not-allowed', width: '50%', opacity: isPasswordMatch ? 1 : 0.7
                  }}>
                    Continue
                  </button>
                </div>
              </form>
            </div>
          )}

          {currentStep === 3 && (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                <CheckCircle2 size={64} color="#10b981" />
              </div>
              <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '0 0 8px 0' }}>
                You're all set!
              </h1>
              <p style={{ color: '#6b7280', fontSize: '15px', margin: '0 0 32px 0' }}>
                Your account is ready. Let's get you into the workspace.
              </p>

              <button onClick={handleAcceptInvite} disabled={isLoading} style={{
                padding: '14px', backgroundColor: '#534ab7', color: 'white', border: 'none',
                borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', width: '100%',
                opacity: isLoading ? 0.7 : 1
              }}>
                {isLoading ? 'Taking you there...' : 'Go to Dashboard'}
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Visual */}
        <div className="auth-panel-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
          
          <div style={{ 
            width: '96px', height: '96px', backgroundColor: '#f6d9c6', borderRadius: '50%',
            color: '#843105', fontSize: '32px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '24px', boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
          }}>
            TA
          </div>
          
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'white', margin: '0 0 4px 0' }}>
            {inviteData.fullName}
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', margin: '0 0 16px 0' }}>
            {inviteData.jobTitle} · {inviteData.department}
          </p>
          
          <div style={{ padding: '4px 16px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '999px', fontSize: '13px', color: 'white', border: '1px solid rgba(255,255,255,0.2)', marginBottom: '32px' }}>
            {inviteData.role}
          </div>

          <div style={{ width: '100%', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', marginTop: '8px' }}>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: '16px' }}>Invite record</p>
            
            <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px', marginBottom: '12px' }}>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: '0 0 4px 0' }}>Invited by</p>
              <p style={{ fontSize: '14px', color: 'white', margin: 0, fontWeight: '500' }}>Amaka Okonkwo (Admin)</p>
            </div>
            
            <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px', marginBottom: '12px' }}>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: '0 0 4px 0' }}>Invited on</p>
              <p style={{ fontSize: '14px', color: 'white', margin: 0, fontWeight: '500' }}>28 Jun 2026</p>
            </div>
            
            <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px' }}>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: '0 0 4px 0' }}>Link expires</p>
              <p style={{ fontSize: '14px', color: 'white', margin: 0, fontWeight: '500' }}>5 Jul 2026</p>
            </div>
            
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginTop: '24px' }}>
              Role and access are locked by your Admin
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InviteOnboardingPage;
