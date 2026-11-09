import { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { UserCheck, CheckCircle2, Clock, Send, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const departmentHires = [
  { id: 1, name: 'Taiwo Bello', role: 'Frontend Engineer', started: 'May 19, 2026', progress: 35, status: 'Needs Attention', managerTasks: [
    { title: 'Conduct Intro 1:1 meeting', done: true },
    { title: 'Assign onboarding buddy & mentor', done: true },
    { title: 'Review 30-day trial milestones', done: false }
  ]},
  { id: 2, name: 'Sade Afolabi', role: 'Senior Product Designer', started: 'May 18, 2026', progress: 85, status: 'On Track', managerTasks: [
    { title: 'Conduct Intro 1:1 meeting', done: true },
    { title: 'Share design system repo access', done: true },
    { title: 'Introduce to PM & Product Leads', done: true }
  ]}
];

const ManagerOnboardingPage = () => {
  const [hires, setHires] = useState(departmentHires);

  const toggleManagerTask = (hireId, taskIndex) => {
    setHires(hires.map(h => {
      if (h.id === hireId) {
        const updatedTasks = [...h.managerTasks];
        updatedTasks[taskIndex].done = !updatedTasks[taskIndex].done;
        return { ...h, managerTasks: updatedTasks };
      }
      return h;
    }));
    toast.success('Manager task status updated');
  };

  const handleNudge = (name) => {
    toast.success(`Nudge reminder sent to ${name}!`);
  };

  return (
    <AdminLayout title="Team Onboarding" subtitle="Track the onboarding progress of new members joining your department and complete your managerial setup tasks.">
      <style>
        {`
          .onboarding-mgr-container { max-width: 1100px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
          .card { background: white; border-radius: 16px; border: 1px solid #f3f4f6; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
          .badge { padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 700; }
        `}
      </style>

      <div className="onboarding-mgr-container">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>Active Department New Hires</h3>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#6b7280' }}>Employees within their first 30 days in Engineering & Product.</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {hires.map((hire) => (
            <div key={hire.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 }}>{hire.name}</h3>
                    <span className="badge" style={{
                      background: hire.progress >= 70 ? '#d1fae5' : '#fef3c7',
                      color: hire.progress >= 70 ? '#047857' : '#b45309'
                    }}>
                      {hire.status}
                    </span>
                  </div>
                  <span style={{ fontSize: '13px', color: '#6b7280' }}>{hire.role} · Started {hire.started}</span>
                </div>

                <button
                  onClick={() => handleNudge(hire.name)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: 'white', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: '#534ab7', cursor: 'pointer' }}
                >
                  <Send size={14} /> Send Friendly Nudge
                </button>
              </div>

              {/* Progress Bar */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                  <span style={{ color: '#6b7280' }}>Overall Checklist Progress</span>
                  <span style={{ fontWeight: '700', color: '#534ab7' }}>{hire.progress}%</span>
                </div>
                <div style={{ height: '8px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${hire.progress}%`, height: '100%', background: hire.progress >= 70 ? '#10b981' : '#f59e0b', borderRadius: '4px' }} />
                </div>
              </div>

              {/* Manager Tasks for this hire */}
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Your Responsibilities as Manager:
                </span>
                <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {hire.managerTasks.map((t, idx) => (
                    <div
                      key={idx}
                      onClick={() => toggleManagerTask(hire.id, idx)}
                      style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px' }}
                    >
                      <div style={{
                        width: '18px', height: '18px', borderRadius: '4px',
                        background: t.done ? '#534ab7' : 'white',
                        border: t.done ? 'none' : '1px solid #cbd5e1',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        {t.done && <Check size={12} color="white" />}
                      </div>
                      <span style={{ color: t.done ? '#6b7280' : '#111827', textDecoration: t.done ? 'line-through' : 'none' }}>
                        {t.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </AdminLayout>
  );
};

export default ManagerOnboardingPage;
