import { useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';
import { Check } from 'lucide-react';

const initialUsers = [
  { id: 'SA', name: 'Sade Afolabi', initials: 'SA', started: 'May 18', progress: 50, status: 'In progress', statusColor: '#b45309', statusBg: '#fef3c7', active: true },
  { id: 'CN', name: 'Chidi Nwosu', initials: 'CN', started: 'May 12', progress: 92, status: 'On track', statusColor: '#047857', statusBg: '#d1fae5', active: false },
  { id: 'TB', name: 'Taiwo Bello', initials: 'TB', started: 'May 19', progress: 17, status: 'Needs nudge', statusColor: '#be123c', statusBg: '#ffe4e6', active: false },
];

const initialTasks = [
  { id: 1, week: 'DAY 1 — GET SET UP', title: 'Complete your profile', owner: 'You', status: 'done' },
  { id: 2, week: 'DAY 1 — GET SET UP', title: 'Upload ID document', owner: 'You', status: 'done' },
  { id: 3, week: 'DAY 1 — GET SET UP', title: 'Read and acknowledge company handbook', owner: 'You', status: 'done' },
  { id: 4, week: 'WEEK 1 — TOOLS & ACCESS', title: 'Set up laptop and install tools', owner: 'IT', status: 'done' },
  { id: 5, week: 'WEEK 1 — TOOLS & ACCESS', title: 'Join all Slack channels', owner: 'You', status: 'done' },
  { id: 6, week: 'WEEK 1 — TOOLS & ACCESS', title: 'Meet with your manager (intro 1:1)', owner: 'Manager', status: 'done' },
  { id: 7, week: 'WEEK 2 — LEARN & CONNECT', title: 'Complete product design onboarding doc', owner: 'You', status: 'pending', due: 'Due May 25', dueColor: '#c2410c', dueBg: '#ffedd5' },
  { id: 8, week: 'WEEK 2 — LEARN & CONNECT', title: 'Shadow a user research session', owner: 'HR', status: 'pending', due: 'Due May 27', dueColor: '#4b5563', dueBg: '#f3f4f6' },
  { id: 9, week: 'WEEK 2 — LEARN & CONNECT', title: 'Set up Figma workspace and review design system', owner: 'You', status: 'pending', due: 'Overdue', dueColor: '#be123c', dueBg: '#ffe4e6' },
];

const OnboardingPage = () => {
  const [users] = useState(initialUsers);
  const [selectedUserId, setSelectedUserId] = useState('SA');
  const [tasks, setTasks] = useState(initialTasks);
  const [nudgeSent, setNudgeSent] = useState(false);
  const [isManaging, setIsManaging] = useState(false);

  const activeUser = users.find(u => u.id === selectedUserId);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        return { ...t, status: t.status === 'done' ? 'pending' : 'done' };
      }
      return t;
    }));
  };

  const completedCount = tasks.filter(t => t.status === 'done').length;
  const totalCount = tasks.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const handleNudge = () => {
    setNudgeSent(true);
    setTimeout(() => setNudgeSent(false), 3000);
  };

  const handleSelectUser = (id) => {
    setSelectedUserId(id);
    setTasks(tasks.map(t => ({
      ...t,
      status: Math.random() > 0.5 ? 'done' : 'pending' // randomize a bit for demo
    })));
  };

  return (
    <AdminLayout title="Onboarding" subtitle={null}>
      <style>
        {`
          .card { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); border: 1px solid #f3f4f6; }
          .task-item { display: flex; align-items: flex-start; justify-content: space-between; padding: 16px; border: 1px solid #f3f4f6; border-radius: 8px; margin-bottom: 8px; background: white; transition: all 0.2s; flex-wrap: wrap; gap: 12px; }
          .task-item:hover { background: #f9fafb; cursor: pointer; border-color: #d1d5db; }
          .task-done { opacity: 0.8; background: #f9fafb; }
          .badge { padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; white-space: nowrap; flex-shrink: 0; }
          .stat-card { text-align: center; padding: 16px; background: white; border: 1px solid #f3f4f6; border-radius: 8px; flex: 1; }
          .grid-sidebar { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }
          .user-card { padding: 16px; border: 1px solid #f3f4f6; border-radius: 8px; margin-bottom: 8px; cursor: pointer; transition: all 0.2s; background: white; }
          .user-card:hover { border-color: #d1d5db; }
          .user-card.active { border-color: #534ab7; background: #f3f0ff; }
          .top-actions-container { display: flex; justify-content: flex-end; gap: 12px; margin-top: -64px; margin-bottom: 32px; position: relative; z-index: 10; }
          @media (max-width: 1024px) {
            .grid-sidebar { grid-template-columns: 1fr; }
            .top-actions-container { margin-top: 0 !important; justify-content: flex-start !important; }
          }
        `}
      </style>

      {/* Top right actions */}
      <div className="top-actions-container">
        <button 
          onClick={() => setIsManaging(!isManaging)}
          style={{ padding: '8px 16px', backgroundColor: 'white', color: '#534ab7', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}>
          {isManaging ? 'Done Managing' : 'Manage templates'}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '20px', cursor: 'pointer' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#e0e7ff', color: '#534ab7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700' }}>{activeUser.initials}</div>
          <span style={{ fontSize: '13px', fontWeight: '500', color: '#374151' }}>{activeUser.name.split(' ')[0]} A.</span>
        </div>
      </div>

      <div className="grid-sidebar">
        
        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Welcome Banner */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={activeUser.id} style={{ background: 'linear-gradient(to right, #4338ca, #534ab7)', borderRadius: '12px', padding: '32px', color: 'white' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 8px 0' }}>Welcome to the team, {activeUser.name.split(' ')[0]}!</h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', margin: '0 0 32px 0' }}>You started on {activeUser.started} 2026. Here's everything you need to complete in your first week.</p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ whiteSpace: 'nowrap' }}>
                <span style={{ fontSize: '24px', fontWeight: '700' }}>{completedCount} / {totalCount}</span> <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>Tasks completed</span>
              </div>
              <div style={{ flex: 1, height: '8px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '4px', overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 1 }} style={{ height: '100%', backgroundColor: 'white', borderRadius: '4px' }} />
              </div>
              <div style={{ fontSize: '14px', fontWeight: '600' }}>{progressPercent}%</div>
            </div>
          </motion.div>

          <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #f3f4f6', padding: '32px' }}>
            
            {Array.from(new Set(tasks.map(t => t.week))).map(week => (
              <div key={week}>
                <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '16px 0 16px 0' }}>{week}</h3>
                <div style={{ marginBottom: '32px' }}>
                  {tasks.filter(t => t.week === week).map((task) => (
                    <div key={task.id} className={`task-item ${task.status === 'done' ? 'task-done' : ''}`} onClick={() => toggleTask(task.id)}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ 
                          width: '20px', height: '20px', borderRadius: '4px', 
                          backgroundColor: task.status === 'done' ? '#534ab7' : 'transparent',
                          border: task.status === 'done' ? 'none' : '1px solid #d1d5db',
                          display: 'flex', alignItems: 'center', justifyContent: 'center' 
                        }}>
                          {task.status === 'done' && <Check size={14} color="white" />}
                        </div>
                        <span style={{ fontSize: '14px', color: task.status === 'done' ? '#6b7280' : '#111827', fontWeight: task.status === 'done' ? 'normal' : '500', textDecoration: task.status === 'done' ? 'line-through' : 'none' }}>
                          {task.title}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{ fontSize: '11px', color: '#6b7280', backgroundColor: '#f3f4f6', padding: '2px 8px', borderRadius: '12px' }}>{task.owner}</span>
                        {task.status === 'done' ? (
                          <span className="badge" style={{ backgroundColor: '#d1fae5', color: '#047857' }}>✓ Done</span>
                        ) : (
                          <span className="badge" style={{ backgroundColor: task.dueBg || '#f3f4f6', color: task.dueColor || '#4b5563' }}>{task.due || 'Pending'}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card">
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0' }}>All new hires</h3>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <div className="stat-card">
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>3</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Active</div>
              </div>
              <div className="stat-card" style={{ borderColor: '#d1fae5' }}>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#059669' }}>1</div>
                <div style={{ fontSize: '12px', color: '#059669' }}>On track</div>
              </div>
              <div className="stat-card" style={{ borderColor: '#ffe4e6' }}>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#be123c' }}>2</div>
                <div style={{ fontSize: '12px', color: '#be123c' }}>Need nudge</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {users.map(u => (
                <div key={u.id} className={`user-card ${selectedUserId === u.id ? 'active' : ''}`} onClick={() => handleSelectUser(u.id)}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: selectedUserId === u.id ? '#e0e7ff' : '#f3f4f6', color: selectedUserId === u.id ? '#534ab7' : '#6b7280', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700' }}>{u.initials}</div>
                      <div>
                        <p style={{ fontSize: '13px', fontWeight: '600', color: '#111827', margin: '0 0 2px 0' }}>{u.name}</p>
                        <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>Started {u.started}</p>
                      </div>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: '600', color: u.statusColor, backgroundColor: u.statusBg, padding: '4px 8px', borderRadius: '12px', whiteSpace: 'nowrap', flexShrink: 0 }}>{u.status}</span>
                  </div>
                  <div style={{ height: '4px', backgroundColor: selectedUserId === u.id ? 'rgba(83,74,183,0.1)' : '#f3f4f6', borderRadius: '2px' }}>
                    <div style={{ height: '100%', width: `${u.id === selectedUserId ? progressPercent : u.progress}%`, backgroundColor: selectedUserId === u.id ? '#534ab7' : (u.progress > 80 ? '#059669' : '#e11d48'), borderRadius: '2px' }}></div>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '11px', fontWeight: '600', color: selectedUserId === u.id ? '#534ab7' : '#4b5563', marginTop: '4px' }}>
                    {u.id === selectedUserId ? progressPercent : u.progress}%
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="card">
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 20px 0' }}>{activeUser.name.split(' ')[0]}'s task owners</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#e0e7ff', color: '#534ab7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700' }}>{activeUser.initials}</div>
                  <span style={{ fontSize: '13px', color: '#4b5563' }}>{activeUser.name.split(' ')[0]} (self)</span>
                </div>
                <span style={{ fontSize: '13px', color: '#6b7280' }}>8 tasks</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#ffedd5', color: '#c2410c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700' }}>DB</div>
                  <span style={{ fontSize: '13px', color: '#4b5563' }}>David B. (manager)</span>
                </div>
                <span style={{ fontSize: '13px', color: '#6b7280' }}>2 tasks</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#dbeafe', color: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700' }}>IT</div>
                  <span style={{ fontSize: '13px', color: '#4b5563' }}>IT team</span>
                </div>
                <span style={{ fontSize: '13px', color: '#6b7280' }}>1 task</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#f3f0ff', color: '#534ab7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700' }}>HR</div>
                  <span style={{ fontSize: '13px', color: '#4b5563' }}>HR team</span>
                </div>
                <span style={{ fontSize: '13px', color: '#6b7280' }}>1 task</span>
              </div>
            </div>
            <button 
              onClick={handleNudge}
              style={{ width: '100%', padding: '10px', backgroundColor: nudgeSent ? '#d1fae5' : 'white', color: nudgeSent ? '#059669' : '#534ab7', border: `1px solid ${nudgeSent ? '#059669' : '#d1d5db'}`, borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}>
              {nudgeSent ? '✓ Nudge Sent!' : 'Send nudge to Taiwo'}
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="card">
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 20px 0' }}>Completion this week</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ fontSize: '13px', color: '#4b5563' }}>Tasks completed on time</span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#059669' }}>94%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ fontSize: '13px', color: '#4b5563' }}>Avg days to complete</span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#2563eb' }}>11 days</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ fontSize: '13px', color: '#4b5563' }}>New hires active</span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#111827' }}>3</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', color: '#4b5563' }}>Templates in use</span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#111827' }}>2</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default OnboardingPage;


