import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import { Users, Calendar, CheckSquare, Clock, ArrowRight, Check, X, ShieldAlert, UserPlus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const initialPendingLeaves = [
  { id: 101, name: 'Sade Afolabi', initials: 'SA', type: 'Annual Leave', dates: '15 Jul – 22 Jul 2026', days: 6, reason: 'Summer holiday with family' },
  { id: 102, name: 'Chidi Nwosu', initials: 'CN', type: 'Casual Leave', dates: '29 May 2026', days: 1, reason: 'Family medical appointment' }
];

const directReports = [
  { id: 1, name: 'Sade Afolabi', role: 'Senior Product Designer', status: 'Active', tasksDone: '8/9', reviewStatus: 'Submitted' },
  { id: 2, name: 'Chidi Nwosu', role: 'Full Stack Engineer', status: 'Active', tasksDone: '11/12', reviewStatus: 'Submitted' },
  { id: 3, name: 'Taiwo Bello', role: 'Frontend Engineer', status: 'Onboarding', tasksDone: '2/12', reviewStatus: 'Pending' },
  { id: 4, name: 'Kunle Obi', role: 'DevOps Engineer', status: 'Active', tasksDone: 'Done', reviewStatus: 'Reviewed' },
];

const ManagerDashboard = () => {
  const { user } = useAuth();
  const [pendingLeaves, setPendingLeaves] = useState(initialPendingLeaves);

  const handleApprove = (id, name) => {
    setPendingLeaves(pendingLeaves.filter(l => l.id !== id));
    toast.success(`Approved leave request for ${name}`);
  };

  const handleReject = (id, name) => {
    setPendingLeaves(pendingLeaves.filter(l => l.id !== id));
    toast.error(`Rejected leave request for ${name}`);
  };

  const managerName = user?.first_name || user?.name?.split(' ')[0] || 'David';

  return (
    <AdminLayout 
      title={<>Good day, {managerName} <span style={{ display: 'inline-block' }}>👔</span></>}
      subtitle={`Engineering Team Lead Workspace · ${new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`}
    >
      <style>
        {`
          .mgr-dash-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
          .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
          @media (max-width: 1024px) {
            .mgr-dash-grid { grid-template-columns: 1fr; }
            .metrics-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 640px) {
            .metrics-grid { grid-template-columns: 1fr; }
          }
          .card { background: white; border-radius: 16px; border: 1px solid #f3f4f6; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
          .badge { padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 700; }
        `}
      </style>

      {/* Top Metrics Row */}
      <div className="metrics-grid">
        <div className="card">
          <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Direct Reports</span>
          <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: '6px 0 2px 0' }}>8</h3>
          <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '600' }}>Product & Engineering</span>
        </div>

        <div className="card">
          <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Pending Leave Approvals</span>
          <h3 style={{ fontSize: '28px', fontWeight: '700', color: pendingLeaves.length > 0 ? '#d97706' : '#111827', margin: '6px 0 2px 0' }}>
            {pendingLeaves.length}
          </h3>
          <span style={{ fontSize: '12px', color: pendingLeaves.length > 0 ? '#d97706' : '#6b7280', fontWeight: '600' }}>
            {pendingLeaves.length > 0 ? 'Requires your decision' : 'All clear'}
          </span>
        </div>

        <div className="card">
          <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Team Out Today</span>
          <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: '6px 0 2px 0' }}>1</h3>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>Remi Kasali (Annual)</span>
        </div>

        <div className="card">
          <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Q2 Review Completion</span>
          <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#047857', margin: '6px 0 2px 0' }}>75%</h3>
          <span style={{ fontSize: '12px', color: '#047857', fontWeight: '600' }}>6 of 8 submitted</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="mgr-dash-grid">
        
        {/* Left Column: Leave Approval Queue & Team Roster */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Pending Leave Requests Queue */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 }}>Team Leave Approvals</h3>
                {pendingLeaves.length > 0 && (
                  <span style={{ background: '#fef3c7', color: '#b45309', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: '700' }}>
                    {pendingLeaves.length} pending
                  </span>
                )}
              </div>
              <Link to="/manager/leave" style={{ fontSize: '13px', fontWeight: '600', color: '#534ab7', textDecoration: 'none' }}>
                Full queue →
              </Link>
            </div>

            {pendingLeaves.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px', background: '#f8fafc', borderRadius: '10px', color: '#6b7280', fontSize: '13px' }}>
                ✓ No pending leave requests from your team right now.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {pendingLeaves.map((req) => (
                  <div key={req.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', border: '1px solid #f3f4f6', borderRadius: '10px', flexWrap: 'wrap', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#e0e7ff', color: '#534ab7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700' }}>
                        {req.initials}
                      </div>
                      <div>
                        <h4 style={{ margin: '0 0 2px 0', fontSize: '14px', fontWeight: '700', color: '#111827' }}>{req.name}</h4>
                        <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
                          <strong>{req.type}</strong> · {req.dates} ({req.days} days)
                        </p>
                        <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#4b5563', fontStyle: 'italic' }}>
                          "{req.reason}"
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleReject(req.id, req.name)}
                        style={{ padding: '6px 12px', background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <X size={14} /> Reject
                      </button>
                      <button
                        onClick={() => handleApprove(req.id, req.name)}
                        style={{ padding: '6px 14px', background: '#d1fae5', color: '#047857', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Check size={14} /> Approve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Direct Reports Overview */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 }}>My Direct Reports (Roster)</h3>
              <Link to="/manager/team" style={{ fontSize: '13px', color: '#534ab7', fontWeight: '600', textDecoration: 'none' }}>Manage team</Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {directReports.map((report) => (
                <div key={report.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: '#f9fafb', borderRadius: '10px' }}>
                  <div>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#111827' }}>{report.name}</span>
                    <span style={{ display: 'block', fontSize: '12px', color: '#6b7280' }}>{report.role}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="badge" style={{
                      background: report.status === 'Active' ? '#d1fae5' : '#fef3c7',
                      color: report.status === 'Active' ? '#047857' : '#b45309'
                    }}>
                      {report.status}
                    </span>

                    <span style={{ fontSize: '12px', color: '#6b7280' }}>
                      Review: <strong>{report.reviewStatus}</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sidebar: 1-on-1s & Team Pulse */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Upcoming 1-on-1 Meetings */}
          <div className="card">
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '0 0 14px 0' }}>Upcoming 1-on-1s</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#111827' }}>Sade Afolabi</span>
                  <span style={{ fontSize: '12px', color: '#534ab7', fontWeight: '600' }}>Tomorrow, 2:00 PM</span>
                </div>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>Topics: Q2 Review & Design Systems Roadmap</span>
              </div>

              <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#111827' }}>Taiwo Bello</span>
                  <span style={{ fontSize: '12px', color: '#534ab7', fontWeight: '600' }}>Thursday, 11:00 AM</span>
                </div>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>Topics: Week 2 Onboarding Check-in</span>
              </div>
            </div>

            <button
              onClick={() => toast.success('1-on-1 invite scheduled')}
              style={{ width: '100%', marginTop: '14px', padding: '10px', background: 'white', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: '#534ab7', cursor: 'pointer' }}
            >
              + Schedule Team 1-on-1
            </button>
          </div>

          {/* Quick Shortcuts */}
          <div className="card">
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '0 0 14px 0' }}>Manager Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link to="/manager/reviews" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#f9fafb', borderRadius: '8px', textDecoration: 'none', color: '#374151', fontSize: '13px', fontWeight: '600' }}>
                <span>Conduct Quarterly Reviews</span>
                <ArrowRight size={14} color="#6b7280" />
              </Link>
              <Link to="/manager/onboarding" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#f9fafb', borderRadius: '8px', textDecoration: 'none', color: '#374151', fontSize: '13px', fontWeight: '600' }}>
                <span>Track Department New Hires</span>
                <ArrowRight size={14} color="#6b7280" />
              </Link>
              <Link to="/employee/directory" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#f9fafb', borderRadius: '8px', textDecoration: 'none', color: '#374151', fontSize: '13px', fontWeight: '600' }}>
                <span>Browse Org Directory</span>
                <ArrowRight size={14} color="#6b7280" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

export default ManagerDashboard;
