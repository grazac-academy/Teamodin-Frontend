import { useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';
import { Check, CheckCircle2, Clock, UserCheck, Shield, Laptop, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';

const initialTasks = [
  { id: 1, section: 'Day 1 — Getting Started', title: 'Complete personal profile and emergency contact', category: 'HR', status: 'done', icon: UserCheck },
  { id: 2, section: 'Day 1 — Getting Started', title: 'Upload Government ID and Proof of Address', category: 'Compliance', status: 'done', icon: Shield },
  { id: 3, section: 'Day 1 — Getting Started', title: 'Set up work laptop, 2FA, and password manager', category: 'IT', status: 'done', icon: Laptop },
  { id: 4, section: 'Week 1 — Tools & Policies', title: 'Read and sign the 2026 Employee Handbook', category: 'Legal', status: 'pending', due: 'Due today', icon: BookOpen },
  { id: 5, section: 'Week 1 — Tools & Policies', title: 'Join company Slack channels (#general, #announcements, #design)', category: 'IT', status: 'done', icon: Laptop },
  { id: 6, section: 'Week 1 — Tools & Policies', title: 'Introductory 1-on-1 with manager (David Babatunde)', category: 'Team', status: 'done', icon: UserCheck },
  { id: 7, section: 'Week 2 — Systems & Workflows', title: 'Figma workspace and design system walkthrough', category: 'Team', status: 'pending', due: 'Due May 25', icon: Laptop },
  { id: 8, section: 'Week 2 — Systems & Workflows', title: 'Shadow a live sprint planning session', category: 'Team', status: 'pending', due: 'Due May 28', icon: UserCheck },
  { id: 9, section: 'First 30 Days', title: 'Complete 30-day onboarding feedback pulse survey', category: 'HR', status: 'pending', due: 'Due June 10', icon: BookOpen },
];

const EmployeeTasksPage = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'done' ? 'pending' : 'done';
        toast.success(nextStatus === 'done' ? 'Task marked complete!' : 'Task reopened');
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const completed = tasks.filter(t => t.status === 'done').length;
  const progressPercent = Math.round((completed / tasks.length) * 100);

  const sections = Array.from(new Set(tasks.map(t => t.section)));

  return (
    <AdminLayout title="My Onboarding & Checklist" subtitle="Complete your setup items and track your first 30 days at the company.">
      <style>
        {`
          .tasks-container { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
          .progress-banner { background: linear-gradient(135deg, #312e81, #534ab7); border-radius: 16px; padding: 28px; color: white; }
          .card { background: white; border-radius: 16px; border: 1px solid #f3f4f6; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
          .task-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; border: 1px solid #f3f4f6; border-radius: 10px; margin-bottom: 8px; cursor: pointer; transition: all 0.15s; background: white; }
          .task-row:hover { border-color: #cbd5e1; background: #fafafa; }
          .task-row.done { opacity: 0.75; background: #f8fafc; }
          .badge { padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 600; }
        `}
      </style>

      <div className="tasks-container">
        
        {/* Progress Banner */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="progress-banner">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#a5b4fc' }}>
                Onboarding Progress
              </span>
              <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '4px 0 6px 0' }}>
                {progressPercent}% Completed
              </h2>
              <p style={{ margin: 0, fontSize: '14px', color: '#e0e7ff' }}>
                {completed} of {tasks.length} tasks finished · You are on track for your first month!
              </p>
            </div>
            <div style={{ padding: '8px 14px', background: 'rgba(255,255,255,0.15)', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>
              Day 14 of 30
            </div>
          </div>

          <div style={{ height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', overflow: 'hidden' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 1 }} style={{ height: '100%', background: 'white' }} />
          </div>
        </motion.div>

        {/* Task Sections */}
        {sections.map((section) => {
          const sectionTasks = tasks.filter(t => t.section === section);
          const sectionDone = sectionTasks.filter(t => t.status === 'done').length;

          return (
            <div key={section} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 }}>{section}</h3>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>
                  {sectionDone}/{sectionTasks.length} Done
                </span>
              </div>

              <div>
                {sectionTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={`task-row ${task.status === 'done' ? 'done' : ''}`}
                    onClick={() => toggleTask(task.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '20px', height: '20px', borderRadius: '4px',
                        background: task.status === 'done' ? '#534ab7' : 'transparent',
                        border: task.status === 'done' ? 'none' : '2px solid #d1d5db',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                      }}>
                        {task.status === 'done' && <Check size={14} color="white" />}
                      </div>
                      <div>
                        <span style={{ 
                          fontSize: '14px', fontWeight: '500', 
                          color: task.status === 'done' ? '#6b7280' : '#111827',
                          textDecoration: task.status === 'done' ? 'line-through' : 'none'
                        }}>
                          {task.title}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px' }}>
                          <span style={{ fontSize: '11px', color: '#9ca3af', background: '#f3f4f6', padding: '1px 6px', borderRadius: '4px' }}>
                            {task.category}
                          </span>
                          {task.due && task.status !== 'done' && (
                            <span style={{ fontSize: '11px', color: '#d97706', fontWeight: '600' }}>
                              ⏱ {task.due}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      {task.status === 'done' ? (
                        <span className="badge" style={{ background: '#d1fae5', color: '#047857' }}>Completed</span>
                      ) : (
                        <span className="badge" style={{ background: '#f3f4f6', color: '#4b5563' }}>Pending</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

      </div>
    </AdminLayout>
  );
};

export default EmployeeTasksPage;
