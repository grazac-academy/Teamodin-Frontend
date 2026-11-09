import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';
import { 
  UserMinus, CheckCircle2, Clock, AlertTriangle, 
  Plus, Laptop, ShieldAlert, FileText, ChevronRight, 
  Calendar, Check, X, ArrowRight
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';

const OffboardingPage = () => {
  const { offboardingList, employees, addOffboarding, toggleOffboardingTask } = useStore();
  const [selectedOffboardingId, setSelectedOffboardingId] = useState(offboardingList[0]?.id || 1);
  const [isInitiateModalOpen, setIsInitiateModalOpen] = useState(false);

  // Form state
  const [initiateData, setInitiateData] = useState({
    employeeId: '',
    lastDay: '',
    reason: 'Career Opportunity',
    notes: ''
  });

  const activeEntry = useMemo(() => {
    return offboardingList.find(item => item.id === selectedOffboardingId) || offboardingList[0];
  }, [offboardingList, selectedOffboardingId]);

  const handleInitiateSubmit = (e) => {
    e.preventDefault();
    const emp = employees.find(e => String(e.id) === String(initiateData.employeeId));
    if (!emp) {
      toast.error('Please select an employee');
      return;
    }

    const newOffboarding = {
      id: Date.now(),
      employeeId: emp.id,
      name: emp.name,
      role: emp.title || emp.role,
      dept: emp.dept || 'Engineering',
      lastDay: initiateData.lastDay || '30 Jun 2026',
      stage: 'Notice Period',
      status: 'In Progress',
      statusColor: '#b45309',
      statusBg: '#fef3c7',
      tasks: [
        { id: 't1', title: 'Conduct Exit Interview with HR', done: false },
        { id: 't2', title: 'Knowledge Transfer & Project Documentation', done: false },
        { id: 't3', title: 'Retrieve Laptop, Monitor & ID Badge', done: false },
        { id: 't4', title: 'Deactivate Google Workspace, Slack & GitHub Access', done: false },
        { id: 't5', title: 'Calculate Final Settlement, Leave Encashment & Severance', done: false },
        { id: 't6', title: 'Issue Work Certificate / Reference Letter', done: false },
      ]
    };

    addOffboarding(newOffboarding);
    setSelectedOffboardingId(newOffboarding.id);
    toast.success(`Offboarding initiated for ${emp.name}`);
    setIsInitiateModalOpen(false);
    setInitiateData({ employeeId: '', lastDay: '', reason: 'Career Opportunity', notes: '' });
  };

  const completedCount = activeEntry?.tasks?.filter(t => t.done).length || 0;
  const totalCount = activeEntry?.tasks?.length || 6;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const handleCompleteOffboarding = () => {
    toast.success(`Offboarding complete for ${activeEntry.name}! Accounts scheduled for archive.`);
  };

  return (
    <AdminLayout title="Offboarding" subtitle="Manage departures, asset collections, account revocations, and settlements.">
      <style>
        {`
          .offboarding-container { max-width: 1280px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
          .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
          @media (max-width: 1024px) { .metrics-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 640px) { .metrics-grid { grid-template-columns: 1fr; } }
          .metric-card { background: white; border: 1px solid #f3f4f6; border-radius: 12px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
          .layout-split { display: grid; grid-template-columns: 340px 1fr; gap: 24px; }
          @media (max-width: 900px) { .layout-split { grid-template-columns: 1fr; } }
          .panel-card { background: white; border: 1px solid #f3f4f6; border-radius: 16px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
          .exit-item { padding: 16px; border: 1px solid #f3f4f6; border-radius: 10px; cursor: pointer; transition: all 0.2s; margin-bottom: 8px; background: white; }
          .exit-item:hover { border-color: #d1d5db; }
          .exit-item.active { border-color: #534ab7; background: #f3f0ff; }
          .task-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; border: 1px solid #f3f4f6; border-radius: 10px; margin-bottom: 8px; background: white; cursor: pointer; transition: background 0.2s; }
          .task-row:hover { background: #fafafa; }
          .task-row.done { background: #f9fafb; opacity: 0.85; }
          .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 20px; }
          .modal-box { background: white; border-radius: 16px; width: 100%; max-width: 500px; padding: 32px; max-height: 90vh; overflow-y: auto; }
          .form-input { width: 100%; padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; outline: none; margin-top: 4px; box-sizing: border-box; }
        `}
      </style>

      <div className="offboarding-container">
        
        {/* KPI Metrics */}
        <div className="metrics-grid">
          <div className="metric-card">
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 6px 0', fontWeight: '500' }}>Active Exits</p>
            <h3 style={{ fontSize: '26px', fontWeight: '700', color: '#111827', margin: 0 }}>{offboardingList.length}</h3>
            <span style={{ fontSize: '12px', color: '#b45309', fontWeight: '600' }}>In progress</span>
          </div>
          <div className="metric-card">
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 6px 0', fontWeight: '500' }}>Pending Asset Returns</p>
            <h3 style={{ fontSize: '26px', fontWeight: '700', color: '#111827', margin: 0 }}>3 Devices</h3>
            <span style={{ fontSize: '12px', color: '#dc2626', fontWeight: '600' }}>Laptops & Badges</span>
          </div>
          <div className="metric-card">
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 6px 0', fontWeight: '500' }}>Exits Completed (YTD)</p>
            <h3 style={{ fontSize: '26px', fontWeight: '700', color: '#111827', margin: 0 }}>7</h3>
            <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '600' }}>Archived clean</span>
          </div>
          <div className="metric-card">
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 6px 0', fontWeight: '500' }}>Avg Notice Period</p>
            <h3 style={{ fontSize: '26px', fontWeight: '700', color: '#111827', margin: 0 }}>14 Days</h3>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Standard contract</span>
          </div>
        </div>

        {/* Top Action */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => setIsInitiateModalOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px',
              backgroundColor: '#534ab7', color: 'white', border: 'none', borderRadius: '8px',
              fontSize: '14px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            <Plus size={18} /> Initiate Employee Exit
          </button>
        </div>

        {/* Main Split Layout */}
        <div className="layout-split">
          
          {/* Left: Departures List */}
          <div className="panel-card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#111827', margin: '0 0 16px 0' }}>
              Pending Departures ({offboardingList.length})
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {offboardingList.map((item) => (
                <div 
                  key={item.id}
                  className={`exit-item ${item.id === selectedOffboardingId ? 'active' : ''}`}
                  onClick={() => setSelectedOffboardingId(item.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <p style={{ margin: 0, fontWeight: '700', fontSize: '14px', color: '#111827' }}>{item.name}</p>
                    <span style={{ 
                      fontSize: '11px', fontWeight: '600', padding: '2px 8px', borderRadius: '8px',
                      background: item.statusBg, color: item.statusColor 
                    }}>
                      {item.stage}
                    </span>
                  </div>
                  <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#6b7280' }}>
                    {item.role} · {item.dept}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#4b5563' }}>
                    <Calendar size={13} /> Last day: <strong>{item.lastDay}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Detailed Checklist */}
          {activeEntry ? (
            <div className="panel-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: 0 }}>
                      {activeEntry.name} — Exit Checklist
                    </h2>
                    <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', background: activeEntry.statusBg, color: activeEntry.statusColor }}>
                      {activeEntry.stage}
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0 0 0' }}>
                    {activeEntry.role} ({activeEntry.dept}) · Last working day: <strong>{activeEntry.lastDay}</strong>
                  </p>
                </div>

                <button
                  onClick={handleCompleteOffboarding}
                  style={{
                    padding: '8px 16px', background: progressPercent === 100 ? '#10b981' : '#f3f4f6',
                    color: progressPercent === 100 ? 'white' : '#374151', border: 'none',
                    borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer'
                  }}
                >
                  Finalize & Archive
                </button>
              </div>

              {/* Progress */}
              <div style={{ marginBottom: '24px', background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '600', color: '#111827' }}>
                    Offboarding Tasks ({completedCount} of {totalCount} completed)
                  </span>
                  <span style={{ fontWeight: '700', color: '#534ab7' }}>{progressPercent}%</span>
                </div>
                <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${progressPercent}%`, background: '#534ab7', transition: 'width 0.3s ease' }} />
                </div>
              </div>

              {/* Checklist items */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {activeEntry.tasks.map((task) => (
                  <div 
                    key={task.id}
                    className={`task-row ${task.done ? 'done' : ''}`}
                    onClick={() => toggleOffboardingTask(activeEntry.id, task.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        width: '20px', height: '20px', borderRadius: '4px', 
                        border: task.done ? 'none' : '2px solid #d1d5db', 
                        background: task.done ? '#10b981' : 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        {task.done && <Check size={14} color="white" />}
                      </div>
                      <span style={{ 
                        fontSize: '14px', fontWeight: '500', 
                        color: task.done ? '#6b7280' : '#111827',
                        textDecoration: task.done ? 'line-through' : 'none' 
                      }}>
                        {task.title}
                      </span>
                    </div>

                    <span style={{ fontSize: '12px', color: task.done ? '#10b981' : '#9ca3af', fontWeight: '600' }}>
                      {task.done ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="panel-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
              Select a departure record from the left to view their checklist.
            </div>
          )}

        </div>

        {/* Initiate Modal */}
        <AnimatePresence>
          {isInitiateModalOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-backdrop">
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="modal-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>Initiate Employee Exit</h2>
                  <button onClick={() => setIsInitiateModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleInitiateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Select Employee</label>
                    <select 
                      value={initiateData.employeeId}
                      onChange={(e) => setInitiateData({ ...initiateData, employeeId: e.target.value })}
                      className="form-input"
                      required
                    >
                      <option value="">Choose an employee...</option>
                      {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.name} ({emp.dept})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Last Working Day</label>
                    <input 
                      type="date" 
                      value={initiateData.lastDay}
                      onChange={(e) => setInitiateData({ ...initiateData, lastDay: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Departure Reason</label>
                    <select 
                      value={initiateData.reason}
                      onChange={(e) => setInitiateData({ ...initiateData, reason: e.target.value })}
                      className="form-input"
                    >
                      <option value="Career Opportunity">New Career Opportunity</option>
                      <option value="Relocation">Relocation / Emigration</option>
                      <option value="Personal Reasons">Personal / Health Reasons</option>
                      <option value="Further Studies">Further Education</option>
                      <option value="Involuntary / Redundancy">End of Contract / Redundancy</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Handover Notes & Comments</label>
                    <textarea 
                      rows="3" 
                      placeholder="Notes for hiring replacement, client handover, or settlement terms..."
                      value={initiateData.notes}
                      onChange={(e) => setInitiateData({ ...initiateData, notes: e.target.value })}
                      className="form-input"
                      style={{ resize: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px', justifyContent: 'flex-end' }}>
                    <button 
                      type="button" 
                      onClick={() => setIsInitiateModalOpen(false)}
                      style={{ padding: '10px 16px', background: 'white', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      style={{ padding: '10px 16px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                    >
                      Start Offboarding
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

export default OffboardingPage;
