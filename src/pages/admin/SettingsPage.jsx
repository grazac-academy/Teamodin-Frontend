import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { validateCompanyName } from '../../utils/validation';
import Button from '../../components/common/Button/Button';
import AdminLayout from '../../components/layout/AdminLayout';

const SettingsPage = () => {
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState(false);

  const validationSchema = {
    companyName: (value) => validateCompanyName(value),
  };

  const handleSubmit = async (values) => {
    console.log(values);
    setApiError('');
    setApiSuccess(true);
    setTimeout(() => setApiSuccess(false), 3000);
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
          
          .form-section { margin-bottom: 40px; }
          .form-title { font-size: 16px; font-weight: 600; margin: 0 0 8px 0; color: #111827; }
          .form-desc { font-size: 13px; color: #6b7280; margin: 0 0 24px 0; }
          
          .form-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
          @media (min-width: 768px) { .form-grid { grid-template-columns: 1fr 1fr; } }
          
          .form-label { font-size: 13px; font-weight: 500; display: block; margin-bottom: 8px; color: #374151; }
          .form-input-group { display: flex; align-items: center; gap: 8px; }
          .form-prefix { font-size: 13px; color: #6b7280; }
          .form-input { flex: 1; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 8px; width: 100%; box-sizing: border-box; }
          .form-select { width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 8px; background: white; box-sizing: border-box; }
        `}
      </style>

      <div className="settings-container">
        
        {/* Tabs */}
        <div className="settings-tabs">
          <Link to="/admin/settings" className="settings-tab active">General settings</Link>
          <Link to="/admin/settings/security" className="settings-tab">Security</Link>
        </div>

        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px', color: '#111827' }}>General settings</h1>
          <p style={{ color: '#6b7280', marginBottom: '32px', fontSize: '14px' }}>Manage your workspace details, branding, and regional preferences.</p>

          {apiError && <div style={{ padding: '12px', backgroundColor: '#fef2f2', color: '#dc2626', borderRadius: '8px', marginBottom: '24px', fontSize: '14px' }}>{apiError}</div>}

          <form onSubmit={form.handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            
            <div className="form-section">
              <h2 className="form-title">Workspace details</h2>
              <p className="form-desc">This is how your company appears to all employees inside HRStack.</p>

              <div className="form-grid">
                <div>
                  <label className="form-label">Company name</label>
                  <input type="text" name="companyName" value={form.values.companyName} onChange={form.handleChange} className="form-input" />
                  {form.errors.companyName && form.touched.companyName && <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block' }}>{form.errors.companyName}</span>}
                </div>
                <div>
                  <label className="form-label">Workspace URL</label>
                  <div className="form-input-group">
                    <span className="form-prefix">hrstack.app/</span>
                    <input type="text" value={form.values.workspaceUrl} className="form-input" disabled style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-section" style={{ borderTop: '1px solid #f3f4f6', paddingTop: '32px' }}>
              <h2 className="form-title">Regional preferences</h2>
              <p className="form-desc">Affects date format, public holidays calendars, and local policy defaults.</p>

              <div className="form-grid">
                <div>
                  <label className="form-label">Primary country</label>
                  <select className="form-select" name="primaryCountry" value={form.values.primaryCountry} onChange={form.handleChange}>
                    <option>Nigeria (NG)</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Date format</label>
                  <select className="form-select" name="dateFormat" value={form.values.dateFormat} onChange={form.handleChange}>
                    <option>DD / MM / YYYY</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '24px' }}>
                <label className="form-label">Timezone</label>
                <select className="form-select" name="timezone" value={form.values.timezone} onChange={form.handleChange}>
                  <option>Africa/Lagos (WAT, UTC+1)</option>
                </select>
              </div>
            </div>

            <div>
              <Button variant="primary" size="md" onClick={() => form.handleSubmit({ preventDefault: () => {} })} style={{ backgroundColor: apiSuccess ? '#10b981' : undefined }}>
                {apiSuccess ? '✓ Saved' : 'Save changes'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
