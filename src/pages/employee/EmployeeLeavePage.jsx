import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';
import { Calendar, Plus, Clock, CheckCircle2, AlertCircle, X, ChevronRight, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const EmployeeLeavePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterType, setFilterType] = useState('All');
  
  const [balances] = useState({
    annual: { used: 12, total: 20, color: '#534ab7' },
    sick: { used: 3, total: 14, color: '#10b981' },
    casual: { used: 2, total: 4, color: '#f59e0b' },
    parental: { used: 0, total: 60, color: '#ec4899' }
  });

  const [leaveHistory, setLeaveHistory] = useState([
    { id: 1, type: 'Annual Leave', dates: '26 May 2026 – 30 May 2026', days: 5, reason: 'Family vacation and travel', status: 'Approved', statusBg: '#d1fae5', statusColor: '#047857', approver: 'David Babatunde', appliedOn: '10 May 2026' },
    { id: 2, type: 'Casual Leave', dates: '12 Apr 2026', days: 1, reason: 'Personal errands and banking', status: 'Approved', statusBg: '#d1fae5', statusColor: '#047857', approver: 'David Babatunde', appliedOn: '08 Apr 2026' },
    { id: 3, type: 'Sick Leave', dates: '14 Feb 2026 – 15 Feb 2026', days: 2, reason: 'Flu recovery (Doctor report attached)', status: 'Approved', statusBg: '#d1fae5', statusColor: '#047857', approver: 'David Babatunde', appliedOn: '14 Feb 2026' },
    { id: 4, type: 'Annual Leave', dates: '15 Jul 2026 – 22 Jul 2026', days: 6, reason: 'Summer trip and rest', status: 'Pending', statusBg: '#fef3c7', statusColor: '#b45309', approver: 'Awaiting Manager', appliedOn: 'Yesterday' }
  ]);

  const [newRequest, setNewRequest] = useState({
    type: 'Annual Leave',
    startDate: '',
    endDate: '',
    reason: '',
    handoffTeammate: 'Chidi Nwosu'
  });

  const handleCreateRequest = (e) => {
    e.preventDefault();
    if (!newRequest.startDate || !newRequest.endDate) {
      toast.error('Please choose both start and end dates');
      return;
    }

    const start = new Date(newRequest.startDate);
    const end = new Date(newRequest.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const created = {
      id: Date.now(),
      type: newRequest.type,
      dates: `${newRequest.startDate} – ${newRequest.endDate}`,
      days: diffDays,
      reason: newRequest.reason || 'Personal time off',
      status: 'Pending',
      statusBg: '#fef3c7',
      statusColor: '#b45309',
      approver: 'David Babatunde',
      appliedOn: 'Just now'
    };

    setLeaveHistory([created, ...leaveHistory]);
    setIsModalOpen(false);
    toast.success('Your leave request was submitted for approval!');
    setNewRequest({ type: 'Annual Leave', startDate: '', endDate: '', reason: '', handoffTeammate: 'Chidi Nwosu' });
  };

  const handleCancelRequest = (id) => {
    if (window.confirm('Are you sure you want to cancel this pending request?')) {
      setLeaveHistory(leaveHistory.filter(item => item.id !== id));
      toast.success('Leave request cancelled');
    }
  };

  const filteredHistory = filterType === 'All' 
    ? leaveHistory 
    : leaveHistory.filter(item => item.type.toLowerCase().includes(filterType.toLowerCase()));

  return (
    <AdminLayout title="My Time Off & Leave" subtitle="View your leave balances, submit vacation requests, and check approval status.">
      <style>
        {`
          .leave-portal-container { max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
          .balance-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
          @media (max-width: 1024px) { .balance-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 640px) { .balance-grid { grid-template-columns: 1fr; } }
          .card { background: white; border-radius: 16px; border: 1px solid #f3f4f6; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
          .table-wrapper { overflow-x: auto; -webkit-overflow-scrolling: touch; }
          .leave-table { width: 100%; min-width: 640px; border-collapse: collapse; text-align: left; }
          .leave-table th { padding: 12px 16px; background: #f9fafb; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; border-bottom: 1px solid #f3f4f6; }
          .leave-table td { padding: 16px; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827; vertical-align: middle; }
          .badge { padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 700; white-space: nowrap; }
          .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 16px; }
          .modal-box { background: white; border-radius: 16px; width: 100%; max-width: 480px; padding: 28px; max-height: 90vh; overflow-y: auto; }
          .form-input { width: 100%; padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; outline: none; margin-top: 4px; box-sizing: border-box; }
        `}
      </style>

      <div className="leave-portal-container">
        
        {/* Balances Section */}
        <div className="balance-grid">
          
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ borderTop: '4px solid #534ab7' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Annual Leave</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0 6px 0' }}>
              <span style={{ fontSize: '28px', fontWeight: '700', color: '#111827' }}>8</span>
              <span style={{ fontSize: '13px', color: '#9ca3af' }}>days remaining</span>
            </div>
            <div style={{ height: '6px', background: '#f3f4f6', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '60%', height: '100%', background: '#534ab7' }} />
            </div>
            <span style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px', display: 'block' }}>12 of 20 days used</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card" style={{ borderTop: '4px solid #10b981' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Sick Leave</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0 6px 0' }}>
              <span style={{ fontSize: '28px', fontWeight: '700', color: '#111827' }}>11</span>
              <span style={{ fontSize: '13px', color: '#9ca3af' }}>days remaining</span>
            </div>
            <div style={{ height: '6px', background: '#f3f4f6', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '21%', height: '100%', background: '#10b981' }} />
            </div>
            <span style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px', display: 'block' }}>3 of 14 days used</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card" style={{ borderTop: '4px solid #f59e0b' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Casual Leave</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0 6px 0' }}>
              <span style={{ fontSize: '28px', fontWeight: '700', color: '#111827' }}>2</span>
              <span style={{ fontSize: '13px', color: '#9ca3af' }}>days remaining</span>
            </div>
            <div style={{ height: '6px', background: '#f3f4f6', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '50%', height: '100%', background: '#f59e0b' }} />
            </div>
            <span style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px', display: 'block' }}>2 of 4 days used</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card" style={{ borderTop: '4px solid #ec4899' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Parental / Family</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0 6px 0' }}>
              <span style={{ fontSize: '28px', fontWeight: '700', color: '#111827' }}>60</span>
              <span style={{ fontSize: '13px', color: '#9ca3af' }}>days eligible</span>
            </div>
            <div style={{ height: '6px', background: '#f3f4f6', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '0%', height: '100%', background: '#ec4899' }} />
            </div>
            <span style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px', display: 'block' }}>0 days used</span>
          </motion.div>

        </div>

        {/* Action Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', color: '#6b7280', fontWeight: '600' }}>Filter by:</span>
            {['All', 'Annual', 'Sick', 'Casual'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                style={{
                  padding: '6px 12px', borderRadius: '20px', border: '1px solid #e5e7eb',
                  background: filterType === type ? '#534ab7' : 'white',
                  color: filterType === type ? 'white' : '#4b5563',
                  fontSize: '12px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s'
                }}
              >
                {type}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
              background: '#534ab7', color: 'white', border: 'none', borderRadius: '8px',
              fontSize: '14px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <Plus size={16} /> Request Time Off
          </button>
        </div>

        {/* Leave History Table */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #f3f4f6' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 }}>My Leave History</h3>
          </div>

          <div className="table-wrapper">
            <table className="leave-table">
              <thead>
                <tr>
                  <th>Leave Type</th>
                  <th>Dates & Duration</th>
                  <th>Reason / Notes</th>
                  <th>Manager / Approver</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <span style={{ fontWeight: '600', color: '#111827' }}>{item.type}</span>
                      <span style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>Applied: {item.appliedOn}</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: '500' }}>{item.dates}</span>
                      <span style={{ display: 'block', fontSize: '12px', color: '#534ab7', fontWeight: '600', marginTop: '2px' }}>{item.days} workdays</span>
                    </td>
                    <td style={{ maxWidth: '240px', color: '#4b5563' }}>
                      {item.reason}
                    </td>
                    <td>
                      <span style={{ fontSize: '13px', fontWeight: '500' }}>{item.approver}</span>
                    </td>
                    <td>
                      <span className="badge" style={{ background: item.statusBg, color: item.statusColor }}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      {item.status === 'Pending' ? (
                        <button
                          onClick={() => handleCancelRequest(item.id)}
                          style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                        >
                          Cancel
                        </button>
                      ) : (
                        <span style={{ fontSize: '12px', color: '#9ca3af' }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Request Leave Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-backdrop">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="modal-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>Request Time Off</h3>
                <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateRequest} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Leave Type</label>
                  <select
                    className="form-input"
                    value={newRequest.type}
                    onChange={(e) => setNewRequest({ ...newRequest, type: e.target.value })}
                  >
                    <option value="Annual Leave">Annual Leave (8 days available)</option>
                    <option value="Sick Leave">Sick Leave (11 days available)</option>
                    <option value="Casual Leave">Casual Leave (2 days available)</option>
                    <option value="Parental Leave">Parental Leave (60 days eligible)</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Start Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={newRequest.startDate}
                      onChange={(e) => setNewRequest({ ...newRequest, startDate: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>End Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={newRequest.endDate}
                      onChange={(e) => setNewRequest({ ...newRequest, endDate: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Coverage / Handoff Colleague</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newRequest.handoffTeammate}
                    onChange={(e) => setNewRequest({ ...newRequest, handoffTeammate: e.target.value })}
                    placeholder="e.g. Chidi Nwosu"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Reason / Notes for Manager</label>
                  <textarea
                    rows="3"
                    className="form-input"
                    value={newRequest.reason}
                    onChange={(e) => setNewRequest({ ...newRequest, reason: e.target.value })}
                    placeholder="Briefly describe the reason for your time off..."
                    style={{ resize: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    style={{ padding: '8px 16px', background: 'white', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ padding: '8px 20px', background: '#534ab7', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};

export default EmployeeLeavePage;
