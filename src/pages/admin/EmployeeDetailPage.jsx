import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';
import { 
  ArrowLeft, Mail, Phone, MapPin, Calendar, Briefcase, 
  UserCheck, Shield, Clock, FileText, Laptop, Edit3, 
  CheckCircle2, XCircle, AlertCircle, Plus, ChevronRight
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';

const EmployeeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees, updateEmployee, updateEmployeeStatus } = useStore();

  const employee = useMemo(() => {
    return employees.find((emp) => String(emp.id) === String(id)) || employees[0];
  }, [employees, id]);

  const [activeTab, setActiveTab] = useState('overview'); // overview, leave, performance, assets
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  // Edit form state
  const [formData, setFormData] = useState({
    name: employee?.name || '',
    title: employee?.title || '',
    dept: employee?.dept || '',
    manager: employee?.manager || '',
    location: employee?.location || '',
    email: employee?.email || '',
    phone: employee?.phone || '+234 803 456 7890',
    type: employee?.type || 'Full-time',
    status: employee?.status || 'Active'
  });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (employee) {
      updateEmployee(employee.id, {
        name: formData.name,
        title: formData.title,
        dept: formData.dept,
        manager: formData.manager,
        location: formData.location,
        email: formData.email,
        type: formData.type,
        role: `${formData.title} · ${formData.dept}`,
        initials: formData.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
      });
      toast.success('Employee details updated successfully!');
      setIsEditModalOpen(false);
    }
  };

  const handleStatusToggle = () => {
    if (!employee) return;
    const newStatus = employee.status === 'Active' ? 'Inactive' : 'Active';
    const newBg = newStatus === 'Active' ? '#d1fae5' : '#fee2e2';
    const newColor = newStatus === 'Active' ? '#047857' : '#b91c1c';
    updateEmployeeStatus(employee.id, newStatus, newBg, newColor);
    toast.success(`Employee marked as ${newStatus}`);
  };

  if (!employee) {
    return (
      <AdminLayout title="Employee Not Found">
        <div style={{ textAlign: 'center', padding: '64px 20px' }}>
          <h2 style={{ fontSize: '20px', color: '#111827', marginBottom: '12px' }}>Employee record not found</h2>
          <p style={{ color: '#6b7280', marginBottom: '24px' }}>The requested employee profile does not exist or has been removed.</p>
          <Link to="/admin/employees" style={{ padding: '10px 20px', backgroundColor: '#534ab7', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: '600' }}>
            Back to Directory
          </Link>
        </div>
      </AdminLayout>
    );
  }

  const leaves = employee.leaves || [
    { type: 'Annual', used: 12, total: 20, color: '#534ab7' },
    { type: 'Sick', used: 3, total: 14, color: '#10b981' },
    { type: 'Casual', used: 2, total: 4, color: '#d97706' }
  ];

  return (
    <AdminLayout>
      <style>
        {`
          .detail-container { max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; width: 100%; box-sizing: border-box; }
          .breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #6b7280; margin-bottom: 8px; }
          .breadcrumb a { color: #534ab7; text-decoration: none; font-weight: 500; }
          .breadcrumb a:hover { text-decoration: underline; }
          .profile-card { background: white; border-radius: 16px; border: 1px solid #f3f4f6; box-shadow: 0 1px 3px rgba(0,0,0,0.05); padding: 32px; display: flex; flex-direction: column; gap: 24px; box-sizing: border-box; }
          @media (max-width: 640px) {
            .profile-card { padding: 20px 16px; }
            .profile-name { font-size: 20px !important; }
            .info-panel { padding: 18px 16px !important; }
          }
          .profile-header { display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
          .profile-avatar { width: 80px; height: 80px; border-radius: 20px; background: #e0e7ff; color: #534ab7; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 700; flex-shrink: 0; }
          .profile-title-group { display: flex; flex-direction: column; gap: 4px; }
          .profile-name { font-size: 24px; font-weight: 700; color: #111827; margin: 0; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
          .profile-meta-row { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; color: #6b7280; font-size: 13px; margin-top: 8px; }
          .profile-meta-item { display: flex; align-items: center; gap: 6px; }
          .tab-nav { display: flex; gap: 20px; border-bottom: 1px solid #e5e7eb; overflow-x: auto; -webkit-overflow-scrolling: touch; padding-bottom: 4px; }
          .tab-nav::-webkit-scrollbar { height: 4px; }
          .tab-nav::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
          .tab-btn { padding: 12px 4px; font-size: 14px; font-weight: 600; color: #6b7280; background: none; border: none; border-bottom: 2px solid transparent; cursor: pointer; white-space: nowrap; transition: all 0.2s; flex-shrink: 0; }
          .tab-btn:hover { color: #111827; }
          .tab-btn.active { color: #534ab7; border-bottom-color: #534ab7; }
          .card-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
          @media (max-width: 900px) { .card-grid { grid-template-columns: 1fr; gap: 16px; } }
          .info-panel { background: white; border-radius: 16px; border: 1px solid #f3f4f6; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); box-sizing: border-box; }
          .panel-title { font-size: 16px; font-weight: 700; color: #111827; margin: 0 0 20px 0; display: flex; align-items: center; justify-content: space-between; }
          .field-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #f9fafb; font-size: 14px; gap: 12px; }
          .field-label { color: #6b7280; font-weight: 500; }
          .field-val { color: #111827; font-weight: 600; text-align: right; }
          .balance-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; }
          .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 16px; }
          .modal-box { background: white; border-radius: 16px; width: 100%; max-width: 540px; padding: 28px; max-height: 90vh; overflow-y: auto; box-sizing: border-box; }
          .form-input { width: 100%; padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; outline: none; margin-top: 4px; box-sizing: border-box; }
          .form-input:focus { border-color: #534ab7; ring: 2px solid #534ab7; }
        `}
      </style>

      <div className="detail-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/admin/employees">Directory</Link>
          <ChevronRight size={14} />
          <span>{employee.name}</span>
        </div>

        {/* Header Profile Card */}
        <div className="profile-card">
          <div className="profile-header">
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div className="profile-avatar">
                {employee.initials || 'EM'}
              </div>
              <div className="profile-title-group">
                <h1 className="profile-name">
                  {employee.name}
                  <span style={{ 
                    fontSize: '12px', fontWeight: '600', padding: '4px 10px', borderRadius: '12px', 
                    backgroundColor: employee.statusBg || '#d1fae5', color: employee.statusColor || '#047857' 
                  }}>
                    {employee.status || 'Active'}
                  </span>
                </h1>
                <p style={{ margin: 0, fontSize: '15px', color: '#4b5563', fontWeight: '500' }}>
                  {employee.title || 'Team Member'} · <span style={{ color: '#534ab7', fontWeight: '600' }}>{employee.dept || 'Engineering'}</span>
                </p>
                <div className="profile-meta-row">
                  <div className="profile-meta-item"><Mail size={15} /> {employee.email}</div>
                  <div className="profile-meta-item"><MapPin size={15} /> {employee.location || 'Lagos, Nigeria'}</div>
                  <div className="profile-meta-item"><Briefcase size={15} /> {employee.type || 'Full-time'}</div>
                  <div className="profile-meta-item"><Calendar size={15} /> Started {employee.startDate || '12 Jan 2023'}</div>
                </div>
              </div>
            </div>

            {/* Top Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button
                onClick={() => setIsEditModalOpen(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px',
                  backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db',
                  borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer'
                }}
              >
                <Edit3 size={16} /> Edit Profile
              </button>
              <button
                onClick={handleStatusToggle}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px',
                  backgroundColor: employee.status === 'Active' ? '#fff1f2' : '#ecfdf5',
                  color: employee.status === 'Active' ? '#be123c' : '#047857',
                  border: `1px solid ${employee.status === 'Active' ? '#fecdd3' : '#a7f3d0'}`,
                  borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer'
                }}
              >
                {employee.status === 'Active' ? 'Deactivate' : 'Reactivate'}
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="tab-nav">
            <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
              Overview & Details
            </button>
            <button className={`tab-btn ${activeTab === 'leave' ? 'active' : ''}`} onClick={() => setActiveTab('leave')}>
              Time Off & Balances
            </button>
            <button className={`tab-btn ${activeTab === 'performance' ? 'active' : ''}`} onClick={() => setActiveTab('performance')}>
              Performance & Check-ins
            </button>
            <button className={`tab-btn ${activeTab === 'assets' ? 'active' : ''}`} onClick={() => setActiveTab('assets')}>
              Assets & Documents
            </button>
          </div>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="card-grid">
            <div className="info-panel">
              <h2 className="panel-title">Employment & Organization</h2>
              <div className="field-row">
                <span className="field-label">Employee ID</span>
                <span className="field-val">{employee.empId || 'EMP-00042'}</span>
              </div>
              <div className="field-row">
                <span className="field-label">Department</span>
                <span className="field-val">{employee.dept || 'Engineering'}</span>
              </div>
              <div className="field-row">
                <span className="field-label">Job Title</span>
                <span className="field-val">{employee.title || 'Software Engineer'}</span>
              </div>
              <div className="field-row">
                <span className="field-label">Reporting Manager</span>
                <span className="field-val" style={{ color: '#534ab7' }}>{employee.manager || 'David Bello'}</span>
              </div>
              <div className="field-row">
                <span className="field-label">Employment Type</span>
                <span className="field-val">{employee.type || 'Full-time'}</span>
              </div>
              <div className="field-row">
                <span className="field-label">Work Location</span>
                <span className="field-val">{employee.location || 'Lagos, Nigeria'}</span>
              </div>
              <div className="field-row">
                <span className="field-label">Start Date</span>
                <span className="field-val">{employee.startDate || '12 Jan 2023'}</span>
              </div>
            </div>

            <div className="info-panel">
              <h2 className="panel-title">Personal & Emergency Contact</h2>
              <div className="field-row">
                <span className="field-label">Work Email</span>
                <span className="field-val">{employee.email}</span>
              </div>
              <div className="field-row">
                <span className="field-label">Phone Number</span>
                <span className="field-val">+234 803 456 7890</span>
              </div>
              <div className="field-row">
                <span className="field-label">Emergency Contact Name</span>
                <span className="field-val">Grace Obi (Spouse)</span>
              </div>
              <div className="field-row">
                <span className="field-label">Emergency Contact Phone</span>
                <span className="field-val">+234 802 998 1122</span>
              </div>
              <div className="field-row">
                <span className="field-label">Nationality & Tax ID</span>
                <span className="field-val">Nigerian · TIN-8942109</span>
              </div>
              <div className="field-row">
                <span className="field-label">Payroll Status</span>
                <span className="field-val" style={{ color: '#10b981' }}>Enrolled (Monthly WAT)</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Leave & Time Off */}
        {activeTab === 'leave' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              {leaves.map((leave, idx) => (
                <div key={idx} className="balance-box">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{leave.type} Leave</span>
                    <span style={{ fontSize: '13px', color: '#6b7280' }}>{leave.total - leave.used} days left</span>
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: leave.color, margin: '8px 0' }}>
                    {leave.used} <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '400' }}>/ {leave.total} used</span>
                  </div>
                  <div style={{ height: '6px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(leave.used / leave.total) * 100}%`, background: leave.color }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="info-panel">
              <h2 className="panel-title">Recent Leave Requests</h2>
              <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table style={{ width: '100%', minWidth: '550px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e5e7eb', color: '#6b7280', whiteSpace: 'nowrap' }}>
                      <th style={{ padding: '12px 8px' }}>Leave Type</th>
                      <th style={{ padding: '12px 8px' }}>Period</th>
                      <th style={{ padding: '12px 8px' }}>Duration</th>
                      <th style={{ padding: '12px 8px' }}>Reason</th>
                      <th style={{ padding: '12px 8px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #f9fafb' }}>
                      <td style={{ padding: '14px 8px', fontWeight: '600', color: '#111827' }}>Annual leave</td>
                      <td style={{ padding: '14px 8px', color: '#4b5563' }}>26 May 2026 – 30 May 2026</td>
                      <td style={{ padding: '14px 8px' }}>5 working days</td>
                      <td style={{ padding: '14px 8px', color: '#6b7280' }}>Family vacation & recharge</td>
                      <td style={{ padding: '14px 8px' }}>
                        <span style={{ background: '#fef3c7', color: '#b45309', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                          Pending Approval
                        </span>
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f9fafb' }}>
                      <td style={{ padding: '14px 8px', fontWeight: '600', color: '#111827' }}>Sick leave</td>
                      <td style={{ padding: '14px 8px', color: '#4b5563' }}>03 Feb 2026</td>
                      <td style={{ padding: '14px 8px' }}>1 day</td>
                      <td style={{ padding: '14px 8px', color: '#6b7280' }}>Flu & doctors checkup</td>
                      <td style={{ padding: '14px 8px' }}>
                        <span style={{ background: '#d1fae5', color: '#047857', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                          Approved
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '14px 8px', fontWeight: '600', color: '#111827' }}>Annual leave</td>
                      <td style={{ padding: '14px 8px', color: '#4b5563' }}>23 Dec 2025 – 02 Jan 2026</td>
                      <td style={{ padding: '14px 8px' }}>8 working days</td>
                      <td style={{ padding: '14px 8px', color: '#6b7280' }}>End of year holidays</td>
                      <td style={{ padding: '14px 8px' }}>
                        <span style={{ background: '#d1fae5', color: '#047857', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                          Approved
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Performance */}
        {activeTab === 'performance' && (
          <div className="card-grid">
            <div className="info-panel">
              <h2 className="panel-title">Q2 2026 Performance Check-in</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ background: '#e0e7ff', color: '#4338ca', padding: '6px 12px', borderRadius: '8px', fontWeight: '700', fontSize: '16px' }}>
                  4.8 / 5.0
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>Exceeds Expectations</h3>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Reviewed by {employee.manager || 'David Bello'}</p>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#374151', lineHeight: '1.6', background: '#f9fafb', padding: '14px', borderRadius: '8px', margin: '0 0 16px 0' }}>
                "{employee.name} has shown outstanding leadership in optimizing our production architecture and consistently unblocking junior teammates. Exceptional cross-functional collaboration with Product."
              </p>
              <div className="field-row">
                <span className="field-label">Review Cycle</span>
                <span className="field-val">Q2 2026 (Completed)</span>
              </div>
              <div className="field-row">
                <span className="field-label">Self-Assessment Submitted</span>
                <span className="field-val" style={{ color: '#10b981' }}>Yes (14 May 2026)</span>
              </div>
            </div>

            <div className="info-panel">
              <h2 className="panel-title">Goals & Key Results (OKRs)</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                    <span style={{ fontWeight: '600', color: '#111827' }}>Reduce API p99 latency to &lt; 200ms</span>
                    <span style={{ color: '#10b981', fontWeight: '600' }}>100% Achieved</span>
                  </div>
                  <div style={{ height: '6px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '100%', background: '#10b981' }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                    <span style={{ fontWeight: '600', color: '#111827' }}>Mentorship of 2 Associate Engineers</span>
                    <span style={{ color: '#534ab7', fontWeight: '600' }}>75% On Track</span>
                  </div>
                  <div style={{ height: '6px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '75%', background: '#534ab7' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Assets & Documents */}
        {activeTab === 'assets' && (
          <div className="card-grid">
            <div className="info-panel">
              <h2 className="panel-title">Assigned Hardware & Assets</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
                  <Laptop size={24} color="#534ab7" />
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#111827' }}>MacBook Pro 14" M3 Pro</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Tag: AST-2024-042 · Serial: C02G7823MD6R</p>
                  </div>
                  <span style={{ fontSize: '12px', background: '#d1fae5', color: '#047857', padding: '2px 8px', borderRadius: '6px', fontWeight: '600' }}>
                    Assigned
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
                  <Shield size={24} color="#10b981" />
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#111827' }}>YubiKey 5C NFC Security Key</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Tag: KEY-9812 · Hardware 2FA token</p>
                  </div>
                  <span style={{ fontSize: '12px', background: '#d1fae5', color: '#047857', padding: '2px 8px', borderRadius: '6px', fontWeight: '600' }}>
                    Active
                  </span>
                </div>
              </div>
            </div>

            <div className="info-panel">
              <h2 className="panel-title">Signed Contracts & IDs</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
                  <FileText size={24} color="#3b82f6" />
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#111827' }}>Full-time Employment Contract (PDF)</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Signed via DocuSign on 10 Jan 2023</p>
                  </div>
                  <button style={{ padding: '6px 12px', fontSize: '12px', background: 'white', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', color: '#374151' }}>
                    View
                  </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
                  <FileText size={24} color="#3b82f6" />
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#111827' }}>National ID / International Passport</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Verified KYC document</p>
                  </div>
                  <button style={{ padding: '6px 12px', fontSize: '12px', background: 'white', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', color: '#374151' }}>
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        <AnimatePresence>
          {isEditModalOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-backdrop">
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="modal-box">
                <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: '0 0 16px 0' }}>Edit Employee Profile</h2>
                <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Full Name</label>
                    <input 
                      type="text" 
                      value={formData.name} 
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                      className="form-input" 
                      required 
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Job Title</label>
                      <input 
                        type="text" 
                        value={formData.title} 
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                        className="form-input" 
                        required 
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Department</label>
                      <input 
                        type="text" 
                        value={formData.dept} 
                        onChange={(e) => setFormData({ ...formData, dept: e.target.value })} 
                        className="form-input" 
                        required 
                      />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Reporting Manager</label>
                      <input 
                        type="text" 
                        value={formData.manager} 
                        onChange={(e) => setFormData({ ...formData, manager: e.target.value })} 
                        className="form-input" 
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Location</label>
                      <input 
                        type="text" 
                        value={formData.location} 
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })} 
                        className="form-input" 
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Work Email</label>
                    <input 
                      type="email" 
                      value={formData.email} 
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                      className="form-input" 
                      required 
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '16px', justifyContent: 'flex-end' }}>
                    <button 
                      type="button" 
                      onClick={() => setIsEditModalOpen(false)}
                      style={{ padding: '10px 16px', background: 'white', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      style={{ padding: '10px 16px', background: '#534ab7', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};

export default EmployeeDetailPage;
