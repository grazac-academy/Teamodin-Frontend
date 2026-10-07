import React, { useState } from 'react';
import '../pages.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Check, EyeOff, Eye, Users, CalendarCheck, BarChart3 } from 'lucide-react';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  
  const [formData, setFormData] = useState({
    companyName: '',
    workspaceUrl: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Bypass the actual API call for UI testing purposes
    setTimeout(() => {
      setIsLoading(false);
      navigate('/verify-otp', { state: { email: formData.email }, replace: true });
    }, 500);
  };

  const isPasswordMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;

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
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
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

          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: '0 0 8px 0' }}>
            Create your workspace
          </h1>
          <p style={{ color: '#6b7280', fontSize: '15px', margin: '0 0 32px 0' }}>
            Set up HRStack for your company in under 15 minutes.
          </p>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <div style={{ height: '4px', flex: 1, backgroundColor: '#534ab7', borderRadius: '2px' }}></div>
            <div style={{ height: '4px', flex: 1, backgroundColor: '#f3f4f6', borderRadius: '2px' }}></div>
            <div style={{ height: '4px', flex: 1, backgroundColor: '#f3f4f6', borderRadius: '2px' }}></div>
          </div>
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: '0 0 32px 0' }}>
            Step 1 of 3 — Workspace details
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Company Name */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Company name</label>
              <div style={{ position: 'relative' }}>
                <input 
                  name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Acme Technologies Ltd"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: formData.companyName ? '1px solid #10b981' : '1px solid #d1d5db', outline: 'none', fontSize: '15px' }} 
                  required
                />
                {formData.companyName && <Check size={18} color="#10b981" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)' }} />}
              </div>
            </div>

            {/* Workspace URL */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Workspace URL</label>
              <div style={{ display: 'flex', alignItems: 'center', border: formData.workspaceUrl ? '1px solid #10b981' : '1px solid #d1d5db', borderRadius: '8px', overflow: 'hidden' }}>
                <span style={{ padding: '12px 0 12px 16px', color: '#9ca3af', fontSize: '15px', background: 'transparent' }}>hrstack.app/</span>
                <input 
                  name="workspaceUrl" value={formData.workspaceUrl} onChange={handleChange} placeholder="acme-tech"
                  style={{ flex: 1, padding: '12px 16px 12px 4px', border: 'none', outline: 'none', fontSize: '15px', color: '#111827' }} 
                  required
                />
              </div>
              <p style={{ fontSize: '12px', color: '#9ca3af', margin: '6px 0 0 0' }}>This is your team's unique login link.</p>
            </div>

            {/* Work email */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Work email</label>
              <div style={{ position: 'relative' }}>
                <input 
                  name="email" type="email" value={formData.email} onChange={handleChange} placeholder="hr@acme.com"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: formData.email ? '1px solid #10b981' : '1px solid #d1d5db', outline: 'none', fontSize: '15px' }} 
                  required
                />
                {formData.email && <Check size={18} color="#10b981" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)' }} />}
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Password</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input 
                  type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="••••••••"
                  style={{ width: '100%', padding: '12px 48px 12px 16px', borderRadius: '8px', border: formData.password ? '1px solid #10b981' : '1px solid #d1d5db', outline: 'none', fontSize: '15px' }} 
                  required
                />
                <div style={{ position: 'absolute', right: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {formData.password && <Check size={18} color="#10b981" />}
                  <div onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer', color: '#9ca3af', display: 'flex' }}>
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </div>
                </div>
              </div>
            </div>

            {/* Re-enter Password */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Re-enter password</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input 
                  type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••"
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

            <button type="submit" disabled={isLoading} style={{
              marginTop: '8px', padding: '14px', backgroundColor: '#534ab7', color: 'white', border: 'none',
              borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}>
              Continue <span>&rarr;</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '8px 0' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
              <span style={{ fontSize: '13px', color: '#9ca3af' }}>OR</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
            </div>

            <button type="button" style={{
              padding: '14px', backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db',
              borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'
            }}>
              <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign up with Google
            </button>
            
            <p style={{ textAlign: 'center', fontSize: '12px', color: '#9ca3af', lineHeight: '1.5' }}>
              By continuing, you agree to HRStack's <a href="#" style={{ color: '#534ab7', textDecoration: 'none' }}>Terms of Service</a> and <a href="#" style={{ color: '#534ab7', textDecoration: 'none' }}>Privacy Policy</a>.
            </p>

            <p style={{ textAlign: 'center', fontSize: '14px', color: '#6b7280', margin: 0 }}>
              Already have a workspace? <Link to="/sign-in" style={{ color: '#534ab7', textDecoration: 'none', fontWeight: '500' }}>Sign in</Link>
            </p>

          </form>
        </div>

        {/* Right Side: Visual */}
        <div className="auth-panel-right">
          
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: 'white', textAlign: 'center', marginBottom: '48px', lineHeight: '1.3' }}>
            Everything your People Ops team needs
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '64px' }}>
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                <Users size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'white', margin: '0 0 4px 0' }}>Employee directory</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>Searchable profiles, org chart, CSV import.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                <CalendarCheck size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'white', margin: '0 0 4px 0' }}>Leave management</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>Request, approve, balances update instantly.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                <BarChart3 size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'white', margin: '0 0 4px 0' }}>Workforce analytics</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>Headcount, attrition, and eNPS in one view.</p>
              </div>
            </div>

          </div>

          <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', padding: '24px', borderRadius: '12px' }}>
            <p style={{ fontSize: '14px', color: 'white', fontStyle: 'italic', margin: '0 0 12px 0', lineHeight: '1.5' }}>
              "We replaced three spreadsheets and a WhatsApp group in one afternoon."
            </p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
              — Head of People, 80-person fintech startup
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SignUpPage;
