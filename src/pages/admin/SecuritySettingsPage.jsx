import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button/Button';
import '../pages.css';

const SecuritySettingsPage = () => {
  const [twoFaEnabled, setTwoFaEnabled] = useState(false);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', minHeight: '100vh', backgroundColor: 'var(--bg-secondary)' }}>
      {/* Sidebar */}
      <div style={{ backgroundColor: 'var(--bg-primary)', borderRight: '1px solid var(--border-color)', padding: 'var(--spacing-lg)' }}>
        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
          <div className="auth-logo">
            <span className="logo-icon">HR</span>
            <span>HRStack</span>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
          <Link to="/admin/dashboard" style={{ padding: 'var(--spacing-md) var(--spacing-lg)', color: 'var(--text-secondary)', textDecoration: 'none' }}>
            Dashboard
          </Link>
        </nav>

        <div style={{ borderTop: '1px solid var(--border-color)', marginTop: 'var(--spacing-xl)', paddingTop: 'var(--spacing-lg)' }}>
          <Link to="/admin/settings" style={{ padding: 'var(--spacing-md) var(--spacing-lg)', color: 'var(--text-secondary)', textDecoration: 'none', display: 'block' }}>
            Settings
          </Link>
          <Link to="/admin/settings/security" style={{ padding: 'var(--spacing-md) var(--spacing-lg)', color: 'var(--primary)', textDecoration: 'none', backgroundColor: 'var(--primary-light)', borderRadius: 'var(--radius-md)', display: 'block' }}>
            Security
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: 'var(--spacing-2xl)' }}>
        <div style={{ maxWidth: '900px' }}>
          <h1 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-md)' }}>Security</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-2xl)' }}>Manage your password, session preferences, and understand how the workspace email works for admin accounts.</p>

          {/* Password Section */}
          <div style={{ backgroundColor: 'var(--bg-primary)', padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--spacing-xl)' }}>
            <h2 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-md)' }}>Password</h2>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>Change the password for this admin account. Required when a new admin takes over the workspace.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--spacing-xs)' }}>Admin password</p>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', margin: 0 }}>Last changed 3 months ago. Changing this is the first thing a new admin should do.</p>
              </div>
              <Link to="/auth/change-password">
                <Button variant="secondary" size="sm">Change password</Button>
              </Link>
            </div>
          </div>

          {/* Two-Factor Auth */}
          <div style={{ backgroundColor: 'var(--bg-primary)', padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--spacing-xl)' }}>
            <h2 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-md)' }}>Two-factor authentication</h2>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>Adds an extra layer of security with an OTP sent to your email on every sign-in.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', cursor: 'pointer' }}>
                <input type="checkbox" checked={twoFaEnabled} onChange={(e) => setTwoFaEnabled(e.target.checked)} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                <span style={{ fontSize: 'var(--font-size-sm)' }}>Enable 2FA</span>
              </label>
            </div>
          </div>

          {/* Active Sessions */}
          <div style={{ backgroundColor: 'var(--bg-primary)', padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)' }}>
            <h2 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-lg)' }}>Active sessions</h2>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>All devices currently signed in to this admin account.</p>

            {['Chrome on MacBook Pro', 'Safari on iPhone'].map((device, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-lg)', borderBottom: idx === 0 ? '1px solid var(--border-color)' : 'none' }}>
                <div>
                  <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', margin: 0 }}>{device}</p>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', margin: 0, marginTop: 'var(--spacing-xs)' }}>Lagos, Nigeria · Last active just now {idx === 0 ? '(Current session)' : ''}</p>
                </div>
                {idx > 0 && <Button variant="ghost" size="sm">Revoke</Button>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettingsPage;
