import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { validateCompanyName } from '../../utils/validation';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import '../pages.css';

const SettingsPage = () => {
  const [apiError, setApiError] = useState('');
  const [activeTab, setActiveTab] = useState('general');

  const validationSchema = {
    companyName: (value) => validateCompanyName(value),
  };

  const handleSubmit = async (values) => {
    setApiError('');
    // In real app, would call updateSettings API
    console.log('Updating settings:', values);
  };

  const form = useForm(
    {
      companyName: 'Acme Technologies Ltd',
      workspaceUrl: 'acme-tech',
      industry: 'Technology',
      primaryCountry: 'Nigeria (NG)',
      dateFormat: 'DD / MM / YYYY',
      timezone: 'Africa/Lagos (WAT, UTC+1)',
    },
    handleSubmit,
    validationSchema
  );

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
          <Link to="/admin/dashboard" style={{ padding: 'var(--spacing-md) var(--spacing-lg)', color: 'var(--text-secondary)', textDecoration: 'none', borderRadius: 'var(--radius-md)', transition: 'all var(--transition-fast)' }}>
            Dashboard
          </Link>
          <Link to="/admin/employees" style={{ padding: 'var(--spacing-md) var(--spacing-lg)', color: 'var(--text-secondary)', textDecoration: 'none', borderRadius: 'var(--radius-md)' }}>
            Employee Directory
          </Link>
          <Link to="/admin/leave" style={{ padding: 'var(--spacing-md) var(--spacing-lg)', color: 'var(--text-secondary)', textDecoration: 'none', borderRadius: 'var(--radius-md)' }}>
            Leave
          </Link>
          <Link to="/admin/onboarding" style={{ padding: 'var(--spacing-md) var(--spacing-lg)', color: 'var(--text-secondary)', textDecoration: 'none', borderRadius: 'var(--radius-md)' }}>
            Onboarding
          </Link>
          <Link to="/admin/check-ins" style={{ padding: 'var(--spacing-md) var(--spacing-lg)', color: 'var(--text-secondary)', textDecoration: 'none', borderRadius: 'var(--radius-md)' }}>
            Check-ins
          </Link>
          <Link to="/admin/analytics" style={{ padding: 'var(--spacing-md) var(--spacing-lg)', color: 'var(--text-secondary)', textDecoration: 'none', borderRadius: 'var(--radius-md)' }}>
            Analytics
          </Link>
        </nav>

        <div style={{ borderTop: '1px solid var(--border-color)', marginTop: 'var(--spacing-xl)', paddingTop: 'var(--spacing-lg)' }}>
          <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 'var(--spacing-md)' }}>Settings</p>
          <Link to="/admin/settings" style={{ padding: 'var(--spacing-md) var(--spacing-lg)', color: 'var(--primary)', textDecoration: 'none', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary-light)', display: 'block', marginBottom: 'var(--spacing-sm)' }}>
            Settings
          </Link>
          <Link to="/admin/settings/security" style={{ padding: 'var(--spacing-md) var(--spacing-lg)', color: 'var(--text-secondary)', textDecoration: 'none', borderRadius: 'var(--radius-md)', display: 'block' }}>
            Sign out
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: 'var(--spacing-2xl)' }}>
        <div style={{ maxWidth: '900px' }}>
          <h1 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-xl)' }}>General settings</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-2xl)' }}>Manage your workspace details, branding, and regional preferences.</p>

          {apiError && <div style={{ padding: 'var(--spacing-md)', backgroundColor: 'var(--danger-light)', color: 'var(--danger)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-lg)' }}>{apiError}</div>}

          <form onSubmit={form.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
            <div>
              <h2 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-lg)' }}>Workspace details</h2>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>This is how your company appears to all employees inside HRStack.</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)' }}>
                <Input label="Company name" name="companyName" value={form.values.companyName} onChange={form.handleChange} error={form.errors.companyName} touched={form.touched.companyName} />
                <div>
                  <label style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', display: 'block', marginBottom: 'var(--spacing-sm)' }}>Workspace URL</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                    <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>hrstack.app/</span>
                    <input value={form.values.workspaceUrl} style={{ flex: 1, padding: 'var(--spacing-md)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }} disabled />
                  </div>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 'var(--spacing-xl)' }}>
              <h2 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-lg)' }}>Regional preferences</h2>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>Affects date format, public holidays calendars, and local policy defaults.</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)' }}>
                <div>
                  <label style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', display: 'block', marginBottom: 'var(--spacing-sm)' }}>Primary country</label>
                  <select style={{ width: '100%', padding: 'var(--spacing-md)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }} value={form.values.primaryCountry} onChange={form.handleChange}>
                    <option>Nigeria (NG)</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', display: 'block', marginBottom: 'var(--spacing-sm)' }}>Date format</label>
                  <select style={{ width: '100%', padding: 'var(--spacing-md)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }} value={form.values.dateFormat}>
                    <option>DD / MM / YYYY</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: 'var(--spacing-lg)' }}>
                <label style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', display: 'block', marginBottom: 'var(--spacing-sm)' }}>Timezone</label>
                <select style={{ width: '100%', padding: 'var(--spacing-md)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }} value={form.values.timezone}>
                  <option>Africa/Lagos (WAT, UTC+1)</option>
                </select>
              </div>
            </div>

            <Button variant="primary" size="md" onClick={() => form.handleSubmit({ preventDefault: () => {} })}>Save</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
