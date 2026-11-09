import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import { 
  Calendar, CheckCircle2, Clock, MapPin, 
  ArrowRight, FileText, CreditCard, ChevronRight, Check
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [clockedIn, setClockedIn] = useState(false);
  const [workLocation, setWorkLocation] = useState('Remote (Home)');
  const [clockInTime, setClockInTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Timer for clocked in hours
  useEffect(() => {
    let interval = null;
    if (clockedIn) {
      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [clockedIn]);

  const formatTimer = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleToggleClock = () => {
    if (!clockedIn) {
      setClockedIn(true);
      setClockInTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      toast.success(`Clocked in at ${workLocation}! Have a great workday.`);
    } else {
      setClockedIn(false);
      toast.success(`Clocked out. Total session: ${formatTimer(elapsedSeconds)}`);
      setElapsedSeconds(0);
      setClockInTime(null);
    }
  };

  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete onboarding profile setup', done: true },
    { id: 2, text: 'Review & sign Employee Handbook 2026', done: false },
    { id: 3, text: 'Submit Q2 Performance Self-Assessment', done: false },
    { id: 4, text: 'Confirm payroll bank details for June', done: true },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
    toast.success('Task status updated');
  };

  const completedCount = tasks.filter(t => t.done).length;

  const currentHour = new Date().getHours();
  let greeting = 'Good morning';
  if (currentHour >= 12 && currentHour < 17) greeting = 'Good afternoon';
  else if (currentHour >= 17) greeting = 'Good evening';

  const employeeName = user?.first_name || user?.name?.split(' ')[0] || 'Sade';

  return (
    <AdminLayout 
      title={<>{greeting}, {employeeName} <span style={{ display: 'inline-block' }}>✨</span></>} 
      subtitle={`Welcome to your personal workspace · ${new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`}
    >
      <style>
        {`
          .emp-dash-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
          .metrics-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
          .card { background: white; border-radius: 16px; border: 1px solid #f3f4f6; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); box-sizing: border-box; }
          @media (max-width: 1024px) {
            .emp-dash-grid { grid-template-columns: 1fr; }
          }
          @media (max-width: 640px) {
            .metrics-row { grid-template-columns: 1fr; gap: 12px; }
            .card { padding: 18px 16px; }
          }
          .task-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; border: 1px solid #f3f4f6; border-radius: 10px; margin-bottom: 8px; cursor: pointer; transition: background 0.15s; }
          .task-row:hover { background: #f9fafb; }
          .badge { padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 700; }
        `}
      </style>

      {/* Top Attendance & Clock-In Banner */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ marginBottom: '24px', background: clockedIn ? 'linear-gradient(135deg, #1e1b4b, #312e81)' : 'white', color: clockedIn ? 'white' : '#111827' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: clockedIn ? '#10b981' : '#9ca3af', boxShadow: clockedIn ? '0 0 10px #10b981' : 'none' }} />
              <span style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: clockedIn ? '#a5b4fc' : '#6b7280' }}>
                {clockedIn ? 'Currently Clocked In' : 'Attendance & Time Tracking'}
              </span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 4px 0' }}>
              {clockedIn ? `Session Active: ${formatTimer(elapsedSeconds)}` : 'You have not clocked in today'}
            </h2>
            <p style={{ margin: 0, fontSize: '13px', color: clockedIn ? '#c7d2fe' : '#6b7280' }}>
              {clockedIn ? `Started at ${clockInTime} · Working from ${workLocation}` : 'Record your daily presence and track work hours seamlessly.'}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {!clockedIn && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f3f4f6', padding: '6px 12px', borderRadius: '8px', fontSize: '13px' }}>
                <MapPin size={14} color="#6b7280" />
                <select 
                  value={workLocation} 
                  onChange={(e) => setWorkLocation(e.target.value)}
                  style={{ background: 'transparent', border: 'none', outline: 'none', fontWeight: '600', color: '#374151', cursor: 'pointer' }}
                >
                  <option value="Remote (Home)">Remote (Home)</option>
                  <option value="Lagos HQ Office">Lagos HQ Office</option>
                  <option value="Client Site / Travel">Client Site / Travel</option>
                </select>
              </div>
            )}

            <button
              onClick={handleToggleClock}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
                background: clockedIn ? '#ef4444' : '#534ab7', color: 'white', border: 'none',
                borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <Clock size={16} />
              {clockedIn ? 'Clock Out' : 'Clock In Now'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="emp-dash-grid">
        
        {/* Left Column: Balances & Requests */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Time Off Balances */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#111827', margin: 0 }}>My Time Off & Balances</h3>
              <Link to="/employee/leave" style={{ fontSize: '13px', fontWeight: '600', color: '#534ab7', textDecoration: 'none' }}>
                Request Leave →
              </Link>
            </div>

            <div className="metrics-row">
              <div className="card" style={{ borderLeft: '4px solid #534ab7' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Annual Leave</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0 4px 0' }}>
                  <span style={{ fontSize: '26px', fontWeight: '700', color: '#111827' }}>8</span>
                  <span style={{ fontSize: '13px', color: '#9ca3af' }}>/ 20 days left</span>
                </div>
                <div style={{ height: '6px', background: '#f3f4f6', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '60%', height: '100%', background: '#534ab7' }} />
                </div>
                <span style={{ fontSize: '11px', color: '#6b7280', marginTop: '6px', display: 'block' }}>12 days used this year</span>
              </div>

              <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Sick Leave</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0 4px 0' }}>
                  <span style={{ fontSize: '26px', fontWeight: '700', color: '#111827' }}>11</span>
                  <span style={{ fontSize: '13px', color: '#9ca3af' }}>/ 14 days left</span>
                </div>
                <div style={{ height: '6px', background: '#f3f4f6', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '21%', height: '100%', background: '#10b981' }} />
                </div>
                <span style={{ fontSize: '11px', color: '#6b7280', marginTop: '6px', display: 'block' }}>3 days used</span>
              </div>

              <div className="card" style={{ borderLeft: '4px solid #f59e0b' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Casual / Personal</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0 4px 0' }}>
                  <span style={{ fontSize: '26px', fontWeight: '700', color: '#111827' }}>2</span>
                  <span style={{ fontSize: '13px', color: '#9ca3af' }}>/ 4 days left</span>
                </div>
                <div style={{ height: '6px', background: '#f3f4f6', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '50%', height: '100%', background: '#f59e0b' }} />
                </div>
                <span style={{ fontSize: '11px', color: '#6b7280', marginTop: '6px', display: 'block' }}>2 days remaining</span>
              </div>
            </div>
          </div>

          {/* Recent Leave Requests */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 }}>My Recent Leave Submissions</h3>
              <Link to="/employee/leave" style={{ fontSize: '13px', color: '#534ab7', fontWeight: '600', textDecoration: 'none' }}>View all</Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { type: 'Annual Leave', dates: '26 May – 30 May 2026', days: '5 workdays', status: 'Approved', statusBg: '#d1fae5', statusColor: '#047857' },
                { type: 'Casual Leave', dates: '12 Apr 2026', days: '1 workday', status: 'Approved', statusBg: '#d1fae5', statusColor: '#047857' },
                { type: 'Sick Leave', dates: '14 Feb 2026', days: '2 workdays', status: 'Approved', statusBg: '#d1fae5', statusColor: '#047857' },
              ].map((req, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: '#f9fafb', borderRadius: '10px' }}>
                  <div>
                    <p style={{ margin: '0 0 2px 0', fontSize: '14px', fontWeight: '600', color: '#111827' }}>{req.type}</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>{req.dates} · {req.days}</p>
                  </div>
                  <span className="badge" style={{ background: req.statusBg, color: req.statusColor }}>{req.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Company Documents To Sign */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 }}>Company Policies & Compliance</h3>
              <Link to="/employee/documents" style={{ fontSize: '13px', color: '#534ab7', fontWeight: '600', textDecoration: 'none' }}>View vault</Link>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', border: '1px solid #fef3c7', background: '#fffbeb', borderRadius: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FileText size={18} color="#b45309" />
                  <div>
                    <p style={{ margin: '0 0 2px 0', fontSize: '13px', fontWeight: '700', color: '#92400e' }}>Employee Code of Conduct 2026</p>
                    <p style={{ margin: 0, fontSize: '11px', color: '#b45309' }}>Annual acknowledgement required</p>
                  </div>
                </div>
                <Link to="/employee/documents" style={{ padding: '6px 12px', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '700', textDecoration: 'none' }}>
                  Sign Now
                </Link>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: '#f9fafb', borderRadius: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FileText size={18} color="#10b981" />
                  <div>
                    <p style={{ margin: '0 0 2px 0', fontSize: '13px', fontWeight: '600', color: '#111827' }}>Remote Work & Security Policy</p>
                    <p style={{ margin: 0, fontSize: '11px', color: '#6b7280' }}>Signed on 18 May 2026</p>
                  </div>
                </div>
                <span className="badge" style={{ background: '#d1fae5', color: '#047857' }}>✓ Signed</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Sidebar: Tasks, Payslips & Teammates Out */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Action Tasks Widget */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 }}>My Action Items</h3>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#534ab7' }}>{completedCount}/{tasks.length} Done</span>
            </div>

            <div>
              {tasks.map((task) => (
                <div key={task.id} className="task-row" onClick={() => toggleTask(task.id)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ 
                      width: '18px', height: '18px', borderRadius: '4px',
                      background: task.done ? '#534ab7' : 'transparent',
                      border: task.done ? 'none' : '1px solid #d1d5db',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {task.done && <Check size={12} color="white" />}
                    </div>
                    <span style={{ fontSize: '13px', color: task.done ? '#9ca3af' : '#111827', textDecoration: task.done ? 'line-through' : 'none' }}>
                      {task.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/employee/tasks" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '14px', fontSize: '13px', fontWeight: '600', color: '#534ab7', textDecoration: 'none' }}>
              View full onboarding checklist <ArrowRight size={14} />
            </Link>
          </div>

          {/* Quick Payslip Snapshot */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 }}>Latest Payslip</h3>
              <Link to="/employee/payslips" style={{ fontSize: '13px', color: '#534ab7', fontWeight: '600', textDecoration: 'none' }}>All slips</Link>
            </div>
            
            <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>Period: April 2026</span>
                <span className="badge" style={{ background: '#d1fae5', color: '#047857' }}>Paid</span>
              </div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
                ₦840,000.00
              </div>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>Net direct deposit to Stanbic IBTC</span>
            </div>

            <Link to="/employee/payslips" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', background: '#f3f0ff', color: '#534ab7', borderRadius: '8px', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}>
              <CreditCard size={16} /> View Payslip & Deductions Breakdown
            </Link>
          </div>

          {/* Department Teammates Out Today */}
          <div className="card">
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '0 0 14px 0' }}>Who's Out Today</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ffedd5', color: '#c2410c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700' }}>RK</div>
                <div>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#111827' }}>Remi Kasali</p>
                  <p style={{ margin: 0, fontSize: '11px', color: '#6b7280' }}>Annual Leave · Returns May 22</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#dbeafe', color: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700' }}>NN</div>
                <div>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#111827' }}>Ngozi Nwankwo</p>
                  <p style={{ margin: 0, fontSize: '11px', color: '#6b7280' }}>Sick Leave · Today only</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

export default EmployeeDashboard;
