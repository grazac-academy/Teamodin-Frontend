import { useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';

const initialRequests = [
  { type: 'Annual leave', dates: 'Mar 10–14 · 5 days', status: 'Approved', statusBg: '#d1fae5', statusColor: '#047857' },
  { type: 'Sick leave', dates: 'Feb 3 · 1 day', status: 'Approved', statusBg: '#d1fae5', statusColor: '#047857' },
  { type: 'Annual leave', dates: 'Dec 23–Jan 2 · 8 days', status: 'Approved', statusBg: '#d1fae5', statusColor: '#047857' },
];

const LeaveRequestPage = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leaveType, setLeaveType] = useState('Annual leave');
  const [startDate, setStartDate] = useState('Mon, 26 May 2026');
  const [endDate, setEndDate] = useState('Fri, 30 May 2026');
  
  const [balances, setBalances] = useState({
    annual: { used: 12, total: 20 },
    sick: { used: 3, total: 14 },
    casual: { used: 2, total: 4 }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setRequests([{
        type: leaveType,
        dates: `${startDate.split(', ')[1].split(' 2026')[0]} - ${endDate.split(', ')[1].split(' 2026')[0]} · 5 days`,
        status: 'Pending',
        statusBg: '#fef3c7',
        statusColor: '#b45309'
      }, ...requests]);
      
      if (leaveType === 'Annual leave') {
        setBalances(prev => ({...prev, annual: { ...prev.annual, used: prev.annual.used + 5 }}));
      } else if (leaveType === 'Sick leave') {
        setBalances(prev => ({...prev, sick: { ...prev.sick, used: prev.sick.used + 5 }}));
      } else {
        setBalances(prev => ({...prev, casual: { ...prev.casual, used: prev.casual.used + 5 }}));
      }
      
      setIsSubmitting(false);
    }, 1500);
  };

  const getAvailableDays = () => {
    if (leaveType === 'Annual leave') return balances.annual.total - balances.annual.used;
    if (leaveType === 'Sick leave') return balances.sick.total - balances.sick.used;
    return balances.casual.total - balances.casual.used;
  };

  return (
    <AdminLayout title="Leave" subtitle="Manage your time off and team availability">
      <style>
        {`
          .card { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); border: 1px solid #f3f4f6; }
          .balance-card { display: flex; align-items: center; justify-content: space-between; padding: 16px; background: #f3f0ff; border-radius: 8px; margin-bottom: 24px; transition: all 0.3s ease; }
          .input-field { width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; outline: none; margin-top: 6px; }
          .form-label { font-size: 13px; font-weight: 600; color: #4b5563; text-transform: uppercase; letter-spacing: 0.5px; }
          .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
          @media (max-width: 768px) { .grid-2 { grid-template-columns: 1fr; } .layout-grid { grid-template-columns: 1fr !important; } }
        `}
      </style>

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
                disabled={isSubmitting || getAvailableDays() < 5}
                className="auth-btn-primary" 
                style={{ 
                  width: '100%', padding: '14px', 
                  backgroundColor: isSubmitting ? '#9ca3af' : (getAvailableDays() < 5 ? '#f87171' : '#534ab7'), 
                  color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', 
                  cursor: isSubmitting || getAvailableDays() < 5 ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {isSubmitting ? 'Submitting...' : (getAvailableDays() < 5 ? 'Insufficient Balance' : 'Submit request')}
              </button>
            </form>
          </motion.div>

          {/* Recent Requests */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card">
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 20px 0' }}>My recent requests</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {requests.map((req, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: i !== requests.length - 1 ? '16px' : '0', borderBottom: i !== requests.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: '0 0 4px 0' }}>{req.type}</p>
                    <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>{req.dates}</p>
                  </div>
                  <span style={{ backgroundColor: req.statusBg, color: req.statusColor, padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Leave Balances */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card">
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 20px 0' }}>My leave balances</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { type: 'Annual', used: balances.annual.used, total: balances.annual.total, color: '#534ab7' },
                { type: 'Sick', used: balances.sick.used, total: balances.sick.total, color: '#10b981' },
                { type: 'Casual', used: balances.casual.used, total: balances.casual.total, color: '#d97706' }
              ].map((leave, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                    <span style={{ color: '#4b5563', fontWeight: '500' }}>{leave.type}</span>
                    <span style={{ color: '#6b7280' }}><span style={{ color: '#111827', fontWeight: '600' }}>{leave.used}</span> / {leave.total} days</span>
                  </div>
                  <div style={{ height: '8px', backgroundColor: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(leave.used/leave.total)*100}%` }} transition={{ duration: 1 }} style={{ height: '100%', backgroundColor: leave.color, borderRadius: '4px' }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Team out this week */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="card">
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 20px 0' }}>Team out this week</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { initials: 'RK', name: 'Remi Kasali', dates: 'May 20–22', bg: '#d1fae5', color: '#047857' },
                { initials: 'NN', name: 'Ngozi Nwankwo', dates: 'May 20 only', bg: '#ffedd5', color: '#c2410c' }
              ].map((person, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: person.bg, color: person.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '600' }}>{person.initials}</div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: '0 0 2px 0' }}>{person.name}</p>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{person.dates}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#f9fafb', padding: '10px', borderRadius: '8px', textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#4b5563' }}>
              Your dates: no conflicts found
            </div>
          </motion.div>

          {/* Approval Flow */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="card">
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 20px 0' }}>Approval flow</h3>
            <div style={{ position: 'relative', paddingLeft: '24px' }}>
              <div style={{ position: 'absolute', left: '7px', top: '8px', bottom: '8px', width: '2px', backgroundColor: '#e5e7eb' }}></div>
              {[
                { title: 'You submit', desc: 'Request sent instantly', active: true },
                { title: 'David Bello approves', desc: 'Your line manager', active: false },
                { title: 'You get notified', desc: 'Email + in-app', active: false }
              ].map((step, i) => (
                <div key={i} style={{ position: 'relative', marginBottom: i !== 2 ? '24px' : '0' }}>
                  <div style={{ position: 'absolute', left: '-24px', top: '2px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: step.active ? '#534ab7' : '#e5e7eb', border: '3px solid white' }}></div>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: step.active ? '#111827' : '#6b7280', margin: '0 0 4px 0' }}>{step.title}</p>
                  <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default LeaveRequestPage;

