import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import { Bell, Mail, MessageSquare, Check, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const NotificationsSettingsPage = () => {
  const [preferences, setPreferences] = useState({
    leaveSubmitted: true,
    leaveDecision: true,
    newHireJoined: true,
    weeklyDigest: true,
    surveyReminders: true,
    slackConnected: true,
    slackChannel: '#general-announcements',
    whatsappUrgent: false
  });

  const toggle = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    toast.success('Notification preferences updated!');
  };

  return (
    <AdminLayout title="Settings">
      <style>
        {`
          .settings-container { max-width: 960px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; width: 100%; box-sizing: border-box; }
          .settings-tabs { display: flex; gap: 20px; border-bottom: 1px solid #e5e7eb; overflow-x: auto; -webkit-overflow-scrolling: touch; padding-bottom: 4px; }
          .settings-tabs::-webkit-scrollbar { height: 4px; }
          .settings-tabs::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
          .settings-tab { padding: 10px 0; color: #6b7280; font-size: 14px; font-weight: 500; text-decoration: none; border-bottom: 2px solid transparent; transition: all 0.2s; white-space: nowrap; flex-shrink: 0; }
          .settings-tab:hover { color: #374151; }
          .settings-tab.active { color: #534ab7; border-bottom-color: #534ab7; font-weight: 600; }
          .card-section { background: white; padding: 24px; border-radius: 12px; border: 1px solid #f3f4f6; box-shadow: 0 1px 3px rgba(0,0,0,0.05); box-sizing: border-box; }
          @media (max-width: 640px) {
            .card-section { padding: 16px; }
            .settings-tabs { gap: 16px; margin-bottom: 16px; }
            .settings-tab { font-size: 13px; }
            .toggle-row { gap: 12px; }
          }
          .card-title { font-size: 16px; font-weight: 600; margin: 0 0 6px 0; color: #111827; }
          .card-desc { font-size: 13px; color: #6b7280; margin: 0 0 20px 0; }
          .toggle-row { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; border-bottom: 1px solid #f9fafb; gap: 16px; }
        `}
      </style>

      <div className="settings-container">
        
        {/* Navigation Tabs */}
        <div className="settings-tabs">
          <Link to="/admin/settings" className="settings-tab">General settings</Link>
          <Link to="/admin/settings/security" className="settings-tab">Security</Link>
          <Link to="/admin/settings/billing" className="settings-tab">Billing & Plan</Link>
          <Link to="/admin/settings/notifications" className="settings-tab active">Notifications</Link>
        </div>

        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px', color: '#111827' }}>Notifications & Integrations</h1>
          <p style={{ color: '#6b7280', marginBottom: '24px', fontSize: '14px' }}>Choose which alerts you and your team receive across email, Slack, and messaging.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Email Notifications */}
            <div className="card-section">
              <h2 className="card-title">Email Notifications</h2>
              <p className="card-desc">Sent to workspace admins and employee work inboxes.</p>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="toggle-row">
                  <div>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#111827' }}>Leave Request Alerts</p>
                    <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#6b7280' }}>Immediate email when an employee submits time off for review.</p>
                  </div>
                  <input type="checkbox" checked={preferences.leaveSubmitted} onChange={() => toggle('leaveSubmitted')} style={{ width: '18px', height: '18px', accentColor: '#534ab7' }} />
                </div>

                <div className="toggle-row">
                  <div>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#111827' }}>Approval & Decision Notices</p>
                    <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#6b7280' }}>Notify teammates when their manager approves or rejects their request.</p>
                  </div>
                  <input type="checkbox" checked={preferences.leaveDecision} onChange={() => toggle('leaveDecision')} style={{ width: '18px', height: '18px', accentColor: '#534ab7' }} />
                </div>

                <div className="toggle-row">
                  <div>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#111827' }}>New Teammate Onboarding Welcomes</p>
                    <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#6b7280' }}>Send welcome emails with first-day checklist when an employee is invited.</p>
                  </div>
                  <input type="checkbox" checked={preferences.newHireJoined} onChange={() => toggle('newHireJoined')} style={{ width: '18px', height: '18px', accentColor: '#534ab7' }} />
                </div>

                <div className="toggle-row" style={{ borderBottom: 'none' }}>
                  <div>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#111827' }}>Weekly People Ops Digest</p>
                    <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#6b7280' }}>Monday morning briefing with upcoming birthdays, leaves, and new hires.</p>
                  </div>
                  <input type="checkbox" checked={preferences.weeklyDigest} onChange={() => toggle('weeklyDigest')} style={{ width: '18px', height: '18px', accentColor: '#534ab7' }} />
                </div>
              </div>
            </div>

            {/* Slack Integration */}
            <div className="card-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h2 className="card-title" style={{ margin: 0 }}>Slack Workspace Integration</h2>
                  <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#6b7280' }}>Post announcements and daily out-of-office updates directly to Slack.</p>
                </div>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#047857', background: '#d1fae5', padding: '4px 10px', borderRadius: '12px' }}>
                  Connected
                </span>
              </div>

              <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                  Target Slack Channel for Leaves & Announcements
                </label>
                <select 
                  value={preferences.slackChannel}
                  onChange={(e) => setPreferences({ ...preferences, slackChannel: e.target.value })}
                  style={{ width: '100%', maxWidth: '320px', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', background: 'white' }}
                >
                  <option value="#general-announcements">#general-announcements</option>
                  <option value="#people-ops">#people-ops</option>
                  <option value="#team-updates">#team-updates</option>
                </select>
              </div>
            </div>

            {/* WhatsApp Integration */}
            <div className="card-section">
              <h2 className="card-title">WhatsApp & SMS Alerts</h2>
              <p className="card-desc">Send immediate SMS alerts for urgent approvals or system security notices.</p>

              <div className="toggle-row" style={{ borderBottom: 'none' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#111827' }}>Urgent Security & Access Codes via SMS</p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#6b7280' }}>Fallback to SMS if email OTP is delayed in low-bandwidth areas.</p>
                </div>
                <input type="checkbox" checked={preferences.whatsappUrgent} onChange={() => toggle('whatsappUrgent')} style={{ width: '18px', height: '18px', accentColor: '#534ab7' }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={handleSave}
                style={{ padding: '10px 24px', background: '#534ab7', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
              >
                Save Preferences
              </button>
            </div>

          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default NotificationsSettingsPage;
