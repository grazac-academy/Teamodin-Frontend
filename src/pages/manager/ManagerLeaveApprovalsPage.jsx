import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';
import { Check, X, Calendar, Clock, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const initialPending = [
  { id: 201, name: 'Sade Afolabi', initials: 'SA', role: 'Senior Product Designer', type: 'Annual Leave', dates: '15 Jul 2026 – 22 Jul 2026', days: 6, reason: 'Summer holiday with family and resting', submitted: 'Yesterday', handoff: 'Chidi Nwosu' },
  { id: 202, name: 'Chidi Nwosu', initials: 'CN', role: 'Full Stack Engineer', type: 'Casual Leave', dates: '29 May 2026', days: 1, reason: 'Family medical check-up', submitted: '2 days ago', handoff: 'Taiwo Bello' }
];

const initialHistory = [
  { id: 101, name: 'Sade Afolabi', initials: 'SA', role: 'Senior Product Designer', type: 'Annual Leave', dates: '26 May 2026 – 30 May 2026', days: 5, decision: 'Approved', decisionDate: '11 May 2026', note: 'Coverage by Chidi confirmed.' },
  { id: 102, name: 'Kunle Obi', initials: 'KO', role: 'DevOps Engineer', type: 'Sick Leave', dates: '02 May 2026', days: 1, decision: 'Approved', decisionDate: '02 May 2026', note: 'Get well soon.' },
  { id: 103, name: 'Tolu Fashola', initials: 'TF', role: 'QA Automation', type: 'Casual Leave', dates: '14 Apr 2026', days: 1, decision: 'Approved', decisionDate: '10 Apr 2026', note: 'Approved.' }
];

const ManagerLeaveApprovalsPage = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [pendingList, setPendingList] = useState(initialPending);
  const [historyList, setHistoryList] = useState(initialHistory);

  const [rejectingItem, setRejectingItem] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleApprove = (item) => {
    setPendingList(pendingList.filter(p => p.id !== item.id));
    setHistoryList([
      { id: item.id, name: item.name, initials: item.initials, role: item.role, type: item.type, dates: item.dates, days: item.days, decision: 'Approved', decisionDate: 'Just now', note: 'Direct approval.' },
      ...historyList
    ]);
    toast.success(`Approved ${item.type} for ${item.name}!`);
  };

  const handleConfirmReject = (e) => {
    e.preventDefault();
    if (!rejectionReason) {
      toast.error('Please provide a reason for rejection');
      return;
    }

    setPendingList(pendingList.filter(p => p.id !== rejectingItem.id));
    setHistoryList([
      { id: rejectingItem.id, name: rejectingItem.name, initials: rejectingItem.initials, role: rejectingItem.role, type: rejectingItem.type, dates: rejectingItem.dates, days: rejectingItem.days, decision: 'Rejected', decisionDate: 'Just now', note: rejectionReason },
      ...historyList
    ]);
    toast.error(`Rejected leave request for ${rejectingItem.name}.`);
    setRejectingItem(null);
    setRejectionReason('');
  };

  return (
    <AdminLayout title="Team Leave Approvals" subtitle="Review and approve time off requests submitted by members of your department.">
      <style>
        {`
          .approvals-container { max-width: 1100px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
          .tab-nav { display: flex; gap: 20px; border-bottom: 1px solid #e5e7eb; }
          .tab-btn { padding: 10px 4px; font-size: 14px; font-weight: 600; color: #6b7280; background: none; border: none; border-bottom: 2px solid transparent; cursor: pointer; transition: all 0.2s; }
          .tab-btn.active { color: #534ab7; border-bottom-color: #534ab7; }
          .card { background: white; border-radius: 16px; border: 1px solid #f3f4f6; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
          .leave-card { padding: 20px; border: 1px solid #f3f4f6; border-radius: 12px; margin-bottom: 12px; background: white; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
          .badge { padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 700; }
          .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 16px; }
          .modal-box { background: white; border-radius: 16px; width: 100%; max-width: 480px; padding: 28px; }
        `}
      </style>

      <div className="approvals-container">
        
        {/* Navigation Tabs */}
        <div className="tab-nav">
          <button className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`} onClick={() => setActiveTab('pending')}>
            Pending Requests ({pendingList.length})
          </button>
          <button className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
            Approval History ({historyList.length})
          </button>
        </div>

        {/* Tab 1: Pending */}
        {activeTab === 'pending' && (
          <div>
            {pendingList.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '48px 20px' }}>
                <Check size={36} color="#10b981" style={{ margin: '0 auto 12px auto' }} />
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: '0 0 6px 0' }}>All Caught Up!</h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>There are no pending leave requests from your team.</p>
              </div>
            ) : (
              <div>
                {pendingList.map((item) => (
                  <div key={item.id} className="leave-card">
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#e0e7ff', color: '#534ab7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: '700', flexShrink: 0 }}>
                        {item.initials}
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#111827' }}>{item.name}</h4>
                          <span style={{ fontSize: '12px', color: '#6b7280' }}>({item.role})</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '6px 0', fontSize: '13px' }}>
                          <span style={{ fontWeight: '700', color: '#534ab7' }}>{item.type}</span>
                          <span>·</span>
                          <span style={{ color: '#374151', fontWeight: '500' }}>{item.dates}</span>
                          <span>·</span>
                          <span style={{ fontWeight: '600', color: '#111827' }}>{item.days} workdays</span>
                        </div>

                        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#4b5563' }}>
                          <strong>Reason:</strong> "{item.reason}"
                        </p>
                        <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#6b7280' }}>
                          <strong>Handoff:</strong> {item.handoff} · Submitted: {item.submitted}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button
                        onClick={() => setRejectingItem(item)}
                        style={{ padding: '8px 16px', background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        <X size={16} /> Reject
                      </button>
                      <button
                        onClick={() => handleApprove(item)}
                        style={{ padding: '8px 20px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        <Check size={16} /> Approve Leave
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: History */}
        {activeTab === 'history' && (
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#111827', margin: 0 }}>Decision Log</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {historyList.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #f3f4f6', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <span style={{ fontWeight: '700', color: '#111827' }}>{item.name}</span>
                    <span style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
                      {item.type} · {item.dates} ({item.days} days)
                    </span>
                    <span style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>
                      Note: {item.note} · Decision made {item.decisionDate}
                    </span>
                  </div>

                  <span className="badge" style={{
                    background: item.decision === 'Approved' ? '#d1fae5' : '#fee2e2',
                    color: item.decision === 'Approved' ? '#047857' : '#b91c1c'
                  }}>
                    {item.decision}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Reject Reason Modal */}
      <AnimatePresence>
        {rejectingItem && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-backdrop">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="modal-box">
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#111827', margin: '0 0 6px 0' }}>
                Decline Leave Request
              </h3>
              <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#6b7280' }}>
                Provide feedback to {rejectingItem.name} explaining why their request cannot be accommodated.
              </p>

              <form onSubmit={handleConfirmReject}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                    Reason for declining
                  </label>
                  <textarea
                    rows="4"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="e.g. Critical release sprint scheduled for these dates. Please consider rescheduling..."
                    style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', resize: 'none' }}
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setRejectingItem(null)}
                    style={{ padding: '8px 16px', background: 'white', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ padding: '8px 20px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                  >
                    Confirm Rejection
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

export default ManagerLeaveApprovalsPage;
