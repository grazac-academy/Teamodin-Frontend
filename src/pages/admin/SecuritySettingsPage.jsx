import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button/Button';
import AdminLayout from '../../components/layout/AdminLayout';

const SecuritySettingsPage = () => {
  const [twoFaEnabled, setTwoFaEnabled] = useState(false);
  const [activeSession, setActiveSession] = useState(true);

  return (
    <AdminLayout title="Settings">
      <style>
        {`
          .settings-container {
            max-width: 900px;
            margin: 0 auto;
          }
          .settings-tabs {
            display: flex; gap: 24px; border-bottom: 1px solid #e5e7eb; margin-bottom: 32px; overflow-x: auto;
          }
          .settings-tab {
            padding: 12px 0; color: #6b7280; font-size: 14px; font-weight: 500; text-decoration: none; border-bottom: 2px solid transparent; transition: all 0.2s; white-space: nowrap;
          }
          .settings-tab:hover { color: #374151; }
          .settings-tab.active { color: #534ab7; border-bottom-color: #534ab7; }
          
          .card-section {
            background: white; padding: 24px; border-radius: 12px; border: 1px solid #f3f4f6; box-shadow: 0 1px 3px rgba(0,0,0,0.05); margin-bottom: 24px;
          }
          .card-title { font-size: 16px; font-weight: 600; margin: 0 0 8px 0; color: #111827; }
          .card-desc { font-size: 13px; color: #6b7280; margin: 0 0 24px 0; }
          
          .session-row {
            display: flex; justify-content: space-between; align-items: center; padding: 16px 0;
          }
          .session-row:not(:last-child) { border-bottom: 1px solid #f3f4f6; }
          
          @media (max-width: 640px) {
            .session-row { flex-direction: column; align-items: flex-start; gap: 12px; }
            .session-action { align-self: flex-start; }
            .password-header { flex-direction: column; align-items: flex-start !important; gap: 16px; }
          }
        `}
      </style>

      <div className="settings-container">
        
        {/* Tabs */}
        <div className="settings-tabs">
          <Link to="/admin/settings" className="settings-tab">General settings</Link>
          <Link to="/admin/settings/security" className="settings-tab active">Security</Link>
        </div>

        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px', color: '#111827' }}>Security</h1>
          <p style={{ color: '#6b7280', marginBottom: '32px', fontSize: '14px' }}>Manage your password, session preferences, and admin accounts.</p>

          {/* Password Section */}
          <div className="card-section">
            <h2 className="card-title">Password</h2>
            <p className="card-desc">Change the password for this admin account.</p>
            <div className="password-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#374151', margin: '0 0 4px 0' }}>Admin password</p>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Last changed 3 months ago.</p>
              </div>
              <Link to="/auth/change-password" style={{ textDecoration: 'none' }}>
                <Button variant="secondary" size="sm">Change password</Button>
              </Link>
            </div>
          </div>

          {/* Two-Factor Auth */}
          <div className="card-section">
            <h2 className="card-title">Two-factor authentication</h2>
            <p className="card-desc">Adds an extra layer of security with an OTP sent to your email on every sign-in.</p>
            <div>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <div style={{ position: 'relative', width: '40px', height: '24px', backgroundColor: twoFaEnabled ? '#10b981' : '#e5e7eb', borderRadius: '12px', transition: 'background-color 0.2s' }}>
                  <div style={{ position: 'absolute', top: '2px', left: twoFaEnabled ? '18px' : '2px', width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}></div>
                  <input type="checkbox" checked={twoFaEnabled} onChange={(e) => setTwoFaEnabled(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
                </div>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>{twoFaEnabled ? 'Enabled' : 'Disabled'}</span>
              </label>
            </div>
          </div>

          {/* Active Sessions */}
          <div className="card-section">
            <h2 className="card-title">Active sessions</h2>
            <p className="card-desc">All devices currently signed in to this admin account.</p>

            <div>
              <div className="session-row">
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: '0 0 4px 0' }}>Chrome on MacBook Pro</p>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Lagos, Nigeria · Last active just now <span style={{ color: '#059669', fontWeight: '500' }}>(Current session)</span></p>
                </div>
              </div>
              
              {activeSession && (
                <div className="session-row">
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: '0 0 4px 0' }}>Safari on iPhone</p>
                    <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Lagos, Nigeria · Last active 2 hours ago</p>
                  </div>
                  <div className="session-action">
                    <button onClick={() => setActiveSession(false)} style={{ padding: '6px 12px', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '6px', color: '#ef4444', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>Revoke</button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </AdminLayout>
  );
};

export default SecuritySettingsPage;
