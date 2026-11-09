import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';
import { 
  Check, X, Calendar, Clock, AlertCircle, 
  CheckCircle2, XCircle, ChevronLeft, ChevronRight, 
  Users, Shield, Filter 
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';

const initialRequests = [
  { type: 'Annual leave', dates: 'Mar 10–14 · 5 days', status: 'Approved', statusBg: '#d1fae5', statusColor: '#047857' },
  { type: 'Sick leave', dates: 'Feb 3 · 1 day', status: 'Approved', statusBg: '#d1fae5', statusColor: '#047857' },
  { type: 'Annual leave', dates: 'Dec 23–Jan 2 · 8 days', status: 'Approved', statusBg: '#d1fae5', statusColor: '#047857' },
];

const LeaveRequestPage = () => {
  const { leaveRequests, approveLeaveRequest, rejectLeaveRequest, addLeaveRequest } = useStore();
  const [activeTab, setActiveTab] = useState('approvals'); // approvals, request, calendar, policies
  const [requests, setRequests] = useState(initialRequests);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leaveType, setLeaveType] = useState('Annual leave');
  const [startDate, setStartDate] = useState('Mon, 26 May 2026');
  const [endDate, setEndDate] = useState('Fri, 30 May 2026');
  
  // Rejection modal
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const [balances, setBalances] = useState({
    annual: { used: 12, total: 20 },
    sick: { used: 3, total: 14 },
    casual: { used: 2, total: 4 }
  });

  const handleApprove = (id, name) => {
    approveLeaveRequest(id);
    toast.success(`Leave request for ${name} approved!`);
  };

  const handleOpenReject = (id) => {
    setRejectingId(id);
    setRejectionReason('');
  };

  const handleConfirmReject = () => {
    if (rejectingId) {
      rejectLeaveRequest(rejectingId, rejectionReason || 'Operational workload constraints');
      toast.success('Leave request rejected and reason sent to employee.');
      setRejectingId(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const newReq = {
        type: leaveType,
        dates: `${startDate.split(', ')[1]?.split(' 2026')[0] || startDate} - ${endDate.split(', ')[1]?.split(' 2026')[0] || endDate} · 5 days`,
        status: 'Pending',
        statusBg: '#fef3c7',
        statusColor: '#b45309'
      };

      setRequests([newReq, ...requests]);
      
      // Also add to global store for company-wide list
      addLeaveRequest({
        id: Date.now(),
        employeeId: 99,
        employeeName: 'Admin User',
        initials: 'AU',
        avatarColor: '#f3f0ff',
        avatarText: '#534ab7',
        dept: 'People Ops',
        type: leaveType,
        startDate: startDate,
        endDate: endDate,
        days: 5,
        reason: 'Personal leave request',
        status: 'Pending',
        submittedAt: 'Just now'
      });

      if (leaveType === 'Annual leave') {
        setBalances(prev => ({ ...prev, annual: { ...prev.annual, used: prev.annual.used + 5 } }));
      } else if (leaveType === 'Sick leave') {
        setBalances(prev => ({ ...prev, sick: { ...prev.sick, used: prev.sick.used + 5 } }));
      } else {
        setBalances(prev => ({ ...prev, casual: { ...prev.casual, used: prev.casual.used + 5 } }));
      }
      
      setIsSubmitting(false);
      toast.success('Your leave request has been submitted for approval!');
    }, 800);
  };

  const getAvailableDays = () => {
    if (leaveType === 'Annual leave') return balances.annual.total - balances.annual.used;
    if (leaveType === 'Sick leave') return balances.sick.total - balances.sick.used;
    return balances.casual.total - balances.casual.used;
  };

  const pendingCount = useMemo(() => {
    return leaveRequests.filter(r => r.status === 'Pending').length;
  }, [leaveRequests]);

  return (
    <AdminLayout title="Leave & Time Off" subtitle="Manage company leave approvals, employee time-off balances, and team calendar.">
      <style>
        {`
          .leave-container { max-width: 1280px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
          .tab-nav { display: flex; gap: 24px; border-bottom: 1px solid #e5e7eb; overflow-x: auto; }
          .tab-btn { padding: 12px 4px; font-size: 14px; font-weight: 600; color: #6b7280; background: none; border: none; border-bottom: 2px solid transparent; cursor: pointer; white-space: nowrap; transition: all 0.2s; display: flex; alignItems: center; gap: 8px; }
          .tab-btn:hover { color: #111827; }
          .tab-btn.active { color: #534ab7; border-bottom-color: #534ab7; }
          .badge-count { background: #fee2e2; color: #b91c1c; font-size: 11px; padding: 2px 8px; borderRadius: 10px; font-weight: 700; }
          .card { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); border: 1px solid #f3f4f6; }
          .balance-card { display: flex; align-items: center; justify-content: space-between; padding: 16px; background: #f3f0ff; border-radius: 8px; margin-bottom: 24px; transition: all 0.3s ease; }
          .input-field { width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; outline: none; margin-top: 6px; box-sizing: border-box; }
          .form-label { font-size: 13px; font-weight: 600; color: #4b5563; text-transform: uppercase; letter-spacing: 0.5px; }
          .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
          @media (max-width: 768px) { .grid-2 { grid-template-columns: 1fr; } .layout-grid { grid-template-columns: 1fr !important; } }
          .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 20px; }
          .modal-box { background: white; border-radius: 16px; width: 100%; max-width: 440px; padding: 24px; }
        `}
      </style>

      <div className="leave-container">
        
        {/* Navigation Tabs */}
        <div className="tab-nav">
          <button className={`tab-btn ${activeTab === 'approvals' ? 'active' : ''}`} onClick={() => setActiveTab('approvals')}>
            Company Approvals {pendingCount > 0 && <span className="badge-count">{pendingCount}</span>}
          </button>
          <button className={`tab-btn ${activeTab === 'request' ? 'active' : ''}`} onClick={() => setActiveTab('request')}>
            Request Leave & My Balances
          </button>
          <button className={`tab-btn ${activeTab === 'calendar' ? 'active' : ''}`} onClick={() => setActiveTab('calendar')}>
            Team Leave Calendar
          </button>
          <button className={`tab-btn ${activeTab === 'policies' ? 'active' : ''}`} onClick={() => setActiveTab('policies')}>
            Leave Policies
          </button>
        </div>

        {/* Tab 1: Company Approvals */}
        {activeTab === 'approvals' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Header info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>Pending Employee Leave Requests</h2>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0 0 0' }}>Review and take action on incoming team time-off applications.</p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#047857', background: '#d1fae5', padding: '6px 12px', borderRadius: '8px' }}>
                  {leaveRequests.filter(r => r.status === 'Approved').length} Approved this month
                </span>
              </div>
            </div>

            {/* Approvals Table Card */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ background: '#fafafa', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                    <th style={{ padding: '14px 20px' }}>Employee</th>
                    <th style={{ padding: '14px 20px' }}>Leave Type</th>
                    <th style={{ padding: '14px 20px' }}>Dates & Duration</th>
                    <th style={{ padding: '14px 20px' }}>Reason</th>
                    <th style={{ padding: '14px 20px' }}>Status</th>
                    <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map((req) => (
                    <tr key={req.id} style={{ borderBottom: '1px solid #f9fafb' }}>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: req.avatarColor, color: req.avatarText, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '12px' }}>
                            {req.initials}
                          </div>
                          <div>
                            <p style={{ margin: 0, fontWeight: '600', color: '#111827' }}>{req.employeeName}</p>
                            <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>{req.dept}</p>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: '16px 20px' }}>
                        <span style={{ fontWeight: '500', color: '#374151' }}>{req.type}</span>
                      </td>

                      <td style={{ padding: '16px 20px' }}>
                        <p style={{ margin: 0, color: '#111827', fontWeight: '500' }}>{req.startDate} – {req.endDate}</p>
                        <p style={{ margin: 0, fontSize: '12px', color: '#534ab7', fontWeight: '600' }}>{req.days} working days</p>
                      </td>

                      <td style={{ padding: '16px 20px', color: '#6b7280', maxWidth: '240px' }}>
                        {req.reason}
                      </td>

                      <td style={{ padding: '16px 20px' }}>
                        <span style={{ 
                          fontSize: '12px', fontWeight: '600', padding: '4px 10px', borderRadius: '12px',
                          background: req.status === 'Approved' ? '#d1fae5' : (req.status === 'Rejected' ? '#fee2e2' : '#fef3c7'),
                          color: req.status === 'Approved' ? '#047857' : (req.status === 'Rejected' ? '#b91c1c' : '#b45309')
                        }}>
                          {req.status}
                        </span>
                      </td>

                      <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                        {req.status === 'Pending' ? (
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            <button
                              onClick={() => handleApprove(req.id, req.employeeName)}
                              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 12px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                            >
                              <Check size={14} /> Approve
                            </button>
                            <button
                              onClick={() => handleOpenReject(req.id)}
                              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 12px', background: 'white', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                            >
                              <X size={14} /> Reject
                            </button>
                          </div>
                        ) : (
                          <span style={{ fontSize: '12px', color: '#9ca3af' }}>Resolved</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Request Leave & Balances (The existing interactive form) */}
        {activeTab === 'request' && (
          <div className="layout-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px', alignItems: 'start' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Request Form */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card">
                <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: '0 0 24px 0' }}>Request Leave</h2>
                
                <div className="balance-card">
                  <div>
                    <p style={{ fontSize: '13px', color: '#534ab7', margin: '0 0 4px 0', fontWeight: '600' }}>Available balance</p>
                    <p style={{ fontSize: '24px', fontWeight: '700', color: '#383287', margin: 0 }}>{getAvailableDays()} days</p>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{leaveType}</p>
                  </div>
                  <div style={{ backgroundColor: '#534ab7', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600' }}>
                    Requesting: 5d
                  </div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label className="form-label">Leave Type</label>
                    <select 
                      className="input-field" 
                      style={{ appearance: 'none', backgroundColor: 'white' }}
                      value={leaveType}
                      onChange={(e) => setLeaveType(e.target.value)}
                    >
                      <option>Annual leave</option>
                      <option>Sick leave</option>
                      <option>Casual leave</option>
                    </select>
                  </div>

                  <div className="grid-2">
                    <div>
                      <label className="form-label">Start Date</label>
                      <input type="text" value={startDate} onChange={e => setStartDate(e.target.value)} className="input-field" />
                    </div>
                    <div>
                      <label className="form-label">End Date</label>
                      <input type="text" value={endDate} onChange={e => setEndDate(e.target.value)} className="input-field" />
                    </div>
                  </div>

                  <div style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '12px 16px', borderRadius: '8px', fontSize: '13px', border: '1px solid #bfdbfe' }}>
                    No public holidays in these dates. Manager David Bello will be notified.
                  </div>

                  <div>
                    <label className="form-label">Note (Optional)</label>
                    <textarea className="input-field" rows="3" defaultValue="Family trip planned." style={{ resize: 'none' }}></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    style={{ 
                      backgroundColor: '#534ab7', color: 'white', border: 'none', 
                      borderRadius: '8px', padding: '14px', fontWeight: '600', 
                      fontSize: '14px', cursor: 'pointer', display: 'flex', 
                      justifyContent: 'center', alignItems: 'center', gap: '8px'
                    }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Right Pane: Balances & My History */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="card">
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '0 0 16px 0' }}>Your Balances (2026)</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                      <span style={{ fontWeight: '500' }}>Annual Leave</span>
                      <span style={{ color: '#6b7280' }}><strong>{balances.annual.used}</strong> / {balances.annual.total} days</span>
                    </div>
                    <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(balances.annual.used / balances.annual.total) * 100}%`, background: '#534ab7' }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                      <span style={{ fontWeight: '500' }}>Sick Leave</span>
                      <span style={{ color: '#6b7280' }}><strong>{balances.sick.used}</strong> / {balances.sick.total} days</span>
                    </div>
                    <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(balances.sick.used / balances.sick.total) * 100}%`, background: '#10b981' }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                      <span style={{ fontWeight: '500' }}>Casual Leave</span>
                      <span style={{ color: '#6b7280' }}><strong>{balances.casual.used}</strong> / {balances.casual.total} days</span>
                    </div>
                    <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(balances.casual.used / balances.casual.total) * 100}%`, background: '#f59e0b' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '0 0 16px 0' }}>Your Leave History</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {requests.map((r, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid #f3f4f6', borderRadius: '8px' }}>
                      <div>
                        <p style={{ margin: 0, fontWeight: '600', fontSize: '13px' }}>{r.type}</p>
                        <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#6b7280' }}>{r.dates}</p>
                      </div>
                      <span style={{ background: r.statusBg, color: r.statusColor, padding: '4px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '600' }}>
                        {r.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: Team Leave Calendar */}
        {activeTab === 'calendar' && (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>Team Availability — May 2026</h2>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button style={{ padding: '6px 12px', background: 'white', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}>
                  Today
                </button>
                <button style={{ padding: '6px 10px', background: 'white', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer' }}>
                  &lt;
                </button>
                <button style={{ padding: '6px 10px', background: 'white', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer' }}>
                  &gt;
                </button>
              </div>
            </div>

            {/* Out today highlights */}
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Out of Office Today (2)</h4>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#d1fae5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700' }}>
                    RK
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: '600' }}>Remi Kasali (Finance)</p>
                    <p style={{ margin: 0, fontSize: '11px', color: '#6b7280' }}>Annual leave · Returns May 22</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#ffedd5', color: '#c2410c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700' }}>
                    NN
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: '600' }}>Ngozi Nwankwo (Product)</p>
                    <p style={{ margin: 0, fontSize: '11px', color: '#6b7280' }}>Sick leave · Today only</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { name: 'Kunle Obi', role: 'Engineering', dates: '26 May – 30 May (5d)', type: 'Annual Leave', color: '#534ab7', bg: '#e0e7ff' },
                { name: 'Tolu Fashola', role: 'Sales', dates: '21 May (1d)', type: 'Sick Leave', color: '#ea580c', bg: '#ffedd5' },
                { name: 'Emeka Madu', role: 'Engineering', dates: '02 Jun – 06 Jun (5d)', type: 'Annual Leave', color: '#2563eb', bg: '#dbeafe' },
                { name: 'Sade Afolabi', role: 'Product', dates: '10 Jun – 12 Jun (3d)', type: 'Casual Leave', color: '#d97706', bg: '#fef3c7' },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', border: '1px solid #f3f4f6', borderRadius: '8px', background: 'white' }}>
                  <div>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#111827' }}>{item.name} ({item.role})</p>
                    <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#6b7280' }}>{item.dates}</p>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '600', padding: '4px 10px', borderRadius: '6px', background: item.bg, color: item.color }}>
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Policies */}
        {activeTab === 'policies' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div className="card">
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '0 0 12px 0' }}>Annual Leave Policy</h3>
              <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.6', margin: '0 0 16px 0' }}>
                All full-time staff accrue <strong>20 working days</strong> per calendar year. Maximum of 5 days can carry over into Q1 of the following year.
              </p>
              <div style={{ background: '#f9fafb', padding: '10px 12px', borderRadius: '6px', fontSize: '12px', color: '#6b7280' }}>
                Notice required: 2 weeks in advance for &gt; 3 consecutive days.
              </div>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '0 0 12px 0' }}>Sick & Medical Leave</h3>
              <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.6', margin: '0 0 16px 0' }}>
                Up to <strong>14 paid days</strong> per year. A doctor’s medical certificate from an accredited HMO/hospital is required for absences exceeding 2 consecutive days.
              </p>
              <div style={{ background: '#f9fafb', padding: '10px 12px', borderRadius: '6px', fontSize: '12px', color: '#6b7280' }}>
                Does not carry over across calendar years.
              </div>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '0 0 12px 0' }}>Maternity & Paternity</h3>
              <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.6', margin: '0 0 16px 0' }}>
                Maternity leave is <strong>90 fully paid calendar days</strong>. Paternity leave is <strong>14 fully paid calendar days</strong> upon child birth or adoption.
              </p>
              <div style={{ background: '#f9fafb', padding: '10px 12px', borderRadius: '6px', fontSize: '12px', color: '#6b7280' }}>
                Flexible return-to-work hours during the first 6 weeks.
              </div>
            </div>
          </div>
        )}

        {/* Rejection Modal */}
        <AnimatePresence>
          {rejectingId && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-backdrop">
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="modal-box">
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '0 0 8px 0' }}>Decline Leave Request</h3>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 16px 0' }}>
                  Please provide a reason for the employee so they can reschedule appropriately.
                </p>

                <textarea
                  rows="3"
                  placeholder="e.g. Core sprint release scheduled during these dates..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
                />

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '16px' }}>
                  <button 
                    onClick={() => setRejectingId(null)}
                    style={{ padding: '8px 14px', background: 'white', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleConfirmReject}
                    style={{ padding: '8px 14px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}
                  >
                    Decline Request
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </AdminLayout>
  );
};

export default LeaveRequestPage;
