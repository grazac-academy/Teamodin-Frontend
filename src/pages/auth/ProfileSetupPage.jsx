import { useState } from 'react';
import '../pages.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProfileSetupPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Dummy data based on design
  const initialName = user?.full_name || 'Amaka Okonkwo';
  const email = user?.email || 'amaka@acme.com';

  const [formData, setFormData] = useState({
    fullName: initialName,
    jobTitle: '',
    department: '',
    phoneNumber: '',
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = (e) => {
    e.preventDefault();
    // In a real app we'd validate and go to next steps.
    // Since we only have design for step 1, we can either mock steps or complete.
    // For now, let's just complete to dashboard since all fields are here.
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      navigate('/admin/dashboard', { replace: true });
    }
  };

  // Helper for input styles
  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    fontSize: '14px',
    color: '#111827',
    outline: 'none'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '6px'
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      
      {/* Main Card */}
      <div style={{
        display: 'flex',
        width: '100%',
        maxWidth: '1000px',
        minHeight: '650px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        
        {/* Left Side: Form */}
        <div style={{ flex: '1', padding: '48px 56px', display: 'flex', flexDirection: 'column' }}>
          
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{ backgroundColor: '#534ab7', color: 'white', padding: '6px 8px', borderRadius: '6px', fontWeight: 'bold', fontSize: '14px' }}>
              HR
            </div>
            <span style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>HRStack</span>
          </div>

          {/* Stepper */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
            {[
              { num: 1, label: 'Your details' },
              { num: 2, label: 'Your role' },
              { num: 3, label: 'Notifications' },
              { num: 4, label: 'All done' }
            ].map((step, index) => (
              <div key={step.num}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', fontWeight: '600',
                    border: currentStep === step.num ? '2px solid #534ab7' : '1px solid #d1d5db',
                    color: currentStep === step.num ? '#534ab7' : '#9ca3af',
                    backgroundColor: 'white'
                  }}>
                    {step.num}
                  </div>
                  <span style={{ fontSize: '12px', color: currentStep === step.num ? '#534ab7' : '#9ca3af', fontWeight: '500', textAlign: 'center', width: '60px' }}>
                    {step.label}
                  </span>
                </div>
                {index < 3 && (
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb', margin: '0 8px', position: 'relative', top: '-14px' }} />
                )}
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <span style={{ display: 'inline-block', backgroundColor: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', marginBottom: '12px' }}>
              Pre-filled from registration
            </span>
            <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', margin: '0 0 8px 0' }}>
              Finish setting up your profile
            </h1>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, lineHeight: '1.5' }}>
              We pre-filled what we already know. Add your role details to complete your profile.
            </p>
          </div>

          {currentStep === 1 ? (
            <form onSubmit={handleContinue} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div>
                <label style={labelStyle}>Full name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} style={{ ...inputStyle, backgroundColor: '#f9fafb' }} required />
              </div>

              <div>
                <label style={labelStyle}>Work email</label>
                <input type="email" value={email} readOnly style={{ ...inputStyle, backgroundColor: '#f9fafb', color: '#6b7280' }} />
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Job title</label>
                  <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} style={inputStyle} required />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Department</label>
                  <input type="text" name="department" value={formData.department} onChange={handleChange} style={inputStyle} required />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Phone number</label>
                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} style={inputStyle} required />
              </div>

              <button type="submit" style={{
                marginTop: '12px', padding: '14px', backgroundColor: '#534ab7', color: 'white', border: 'none',
                borderRadius: '8px', fontSize: '15px', fontWeight: '500', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                Continue
              </button>

            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Setup Complete</h2>
              <button onClick={() => navigate('/admin/dashboard', { replace: true })} style={{
                padding: '12px 24px', backgroundColor: '#534ab7', color: 'white', border: 'none',
                borderRadius: '8px', fontSize: '15px', fontWeight: '500', cursor: 'pointer'
              }}>
                Go to Dashboard
              </button>
            </div>
          )}

        </div>

        {/* Right Side: Visual Profile Summary */}
        <div style={{ width: '340px', backgroundColor: '#383287', padding: '48px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', fontWeight: '600', color: '#383287', marginBottom: '16px',
            marginTop: '32px'
          }}>
            {formData.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'AO'}
          </div>

          <h2 style={{ fontSize: '18px', fontWeight: '500', color: 'white', margin: '0 0 16px 0', textAlign: 'center' }}>
            {formData.fullName || 'Amaka Okonkwo'}
          </h2>

          <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', color: 'white', marginBottom: '48px' }}>
            {formData.jobTitle || 'Role not set'}
          </div>

          <div style={{ width: '100%' }}>
            <p style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em', marginBottom: '16px' }}>
              PROFILE RECORD
            </p>

            <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px', marginBottom: '12px' }}>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: '0 0 4px 0' }}>Email</p>
              <p style={{ fontSize: '14px', color: 'white', margin: 0 }}>{email}</p>
            </div>

            <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px', marginBottom: '12px' }}>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: '0 0 4px 0' }}>Join date</p>
              <p style={{ fontSize: '14px', color: 'white', margin: 0 }}>9 Jul 2026</p>
            </div>

            <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px' }}>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: '0 0 4px 0' }}>Status</p>
              <p style={{ fontSize: '14px', color: '#4ade80', margin: 0 }}>Active</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ProfileSetupPage;
