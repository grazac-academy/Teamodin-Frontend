import React from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';
import { Check } from 'lucide-react';

const OnboardingPage = () => {
  return (
    <AdminLayout title="Onboarding" subtitle={null}>
      <style>
        {`
          .card { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); border: 1px solid #f3f4f6; }
          .task-item { display: flex; align-items: center; justify-content: space-between; padding: 16px; border: 1px solid #f3f4f6; border-radius: 8px; margin-bottom: 8px; background: white; }
          .task-item:hover { background: #f9fafb; cursor: pointer; }
          .task-done { opacity: 0.8; background: #f9fafb; }
          .badge { padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; }
          .stat-card { text-align: center; padding: 16px; background: white; border: 1px solid #f3f4f6; border-radius: 8px; flex: 1; }
          .grid-sidebar { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }
          @media (max-width: 1024px) { .grid-sidebar { grid-template-columns: 1fr; } }
        `}
      </style>

      {/* Top right actions */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '-64px', marginBottom: '32px', position: 'relative', zIndex: 10 }}>
        <button style={{ padding: '8px 16px', backgroundColor: 'white', color: '#534ab7', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
          Manage templates
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '20px', cursor: 'pointer' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#e0e7ff', color: '#534ab7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700' }}>SA</div>
          <span style={{ fontSize: '13px', fontWeight: '500', color: '#374151' }}>Sade A.</span>
        </div>
      </div>

      <div className="grid-sidebar">
        
        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Welcome Banner */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'linear-gradient(to right, #4338ca, #534ab7)', borderRadius: '12px', padding: '32px', color: 'white' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 8px 0' }}>Welcome to the team, Sade!</h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', margin: '0 0 32px 0' }}>You started on 18 May 2026. Here's everything you need to complete in your first week.</p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ whiteSpace: 'nowrap' }}>
                <span style={{ fontSize: '24px', fontWeight: '700' }}>6 / 12</span> <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>Tasks completed</span>
              </div>
              <div style={{ flex: 1, height: '8px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '4px', overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: '50%' }} transition={{ duration: 1 }} style={{ height: '100%', backgroundColor: 'white', borderRadius: '4px' }} />
              </div>
              <div style={{ fontSize: '14px', fontWeight: '600' }}>50%</div>
            </div>
          </motion.div>

          <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #f3f4f6', padding: '32px' }}>
            
            <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 16px 0' }}>DAY 1 — GET SET UP</h3>
            <div style={{ marginBottom: '32px' }}>
              {['Complete your profile', 'Upload ID document', 'Read and acknowledge company handbook'].map((task, i) => (
                <div key={i} className="task-item task-done">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '4px', backgroundColor: '#534ab7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={14} color="white" />
                    </div>
                    <span style={{ fontSize: '14px', color: '#4b5563', textDecoration: 'line-through' }}>{task}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>You</span>
                    <span className="badge" style={{ backgroundColor: '#d1fae5', color: '#047857' }}>✓ Done</span>
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 16px 0' }}>WEEK 1 — TOOLS & ACCESS</h3>
            <div style={{ marginBottom: '32px' }}>
              <div className="task-item task-done">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '4px', backgroundColor: '#534ab7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={14} color="white" /></div>
                  <span style={{ fontSize: '14px', color: '#4b5563', textDecoration: 'line-through' }}>Set up laptop and install tools</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><span style={{ fontSize: '12px', color: '#6b7280' }}>IT</span><span className="badge" style={{ backgroundColor: '#d1fae5', color: '#047857' }}>✓ Done</span></div>
              </div>
              <div className="task-item task-done">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '4px', backgroundColor: '#534ab7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={14} color="white" /></div>
                  <span style={{ fontSize: '14px', color: '#4b5563', textDecoration: 'line-through' }}>Join all Slack channels</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><span style={{ fontSize: '12px', color: '#6b7280' }}>You</span><span className="badge" style={{ backgroundColor: '#d1fae5', color: '#047857' }}>✓ Done</span></div>
              </div>
              <div className="task-item task-done">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '4px', backgroundColor: '#534ab7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={14} color="white" /></div>
                  <span style={{ fontSize: '14px', color: '#4b5563', textDecoration: 'line-through' }}>Meet with your manager (intro 1:1)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><span style={{ fontSize: '12px', color: '#6b7280' }}>Manager</span><span className="badge" style={{ backgroundColor: '#d1fae5', color: '#047857' }}>✓ Done</span></div>
              </div>
            </div>

            <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 16px 0' }}>WEEK 2 — LEARN & CONNECT</h3>
            <div>
              <div className="task-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '4px', border: '1px solid #d1d5db' }}></div>
                  <span style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>Complete product design onboarding doc</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '11px', color: '#6b7280', backgroundColor: '#f3f4f6', padding: '2px 8px', borderRadius: '12px' }}>You</span>
                  <span className="badge" style={{ backgroundColor: '#ffedd5', color: '#c2410c' }}>Due May 25</span>
                </div>
              </div>
              <div className="task-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '4px', border: '1px solid #d1d5db' }}></div>
                  <span style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>Shadow a user research session</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '11px', color: '#6b7280', backgroundColor: '#f3f4f6', padding: '2px 8px', borderRadius: '12px' }}>HR</span>
                  <span className="badge" style={{ backgroundColor: '#f3f4f6', color: '#4b5563' }}>Due May 27</span>
                </div>
              </div>
              <div className="task-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '4px', border: '1px solid #d1d5db' }}></div>
                  <span style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>Set up Figma workspace and review design system</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '11px', color: '#6b7280', backgroundColor: '#f3f4f6', padding: '2px 8px', borderRadius: '12px' }}>You</span>
                  <span className="badge" style={{ backgroundColor: '#ffe4e6', color: '#be123c' }}>Overdue</span>
                </div>
              </div>
            </div>

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
              <div style={{ padding: '16px', backgroundColor: '#f3f0ff', borderRadius: '8px', border: '1px solid #e0e7ff' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#e0e7ff', color: '#534ab7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700' }}>SA</div>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: '600', color: '#111827', margin: '0 0 2px 0' }}>Sade Afolabi</p>
                      <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>Started May 18</p>
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '600', color: '#b45309', backgroundColor: '#fef3c7', padding: '2px 8px', borderRadius: '12px' }}>In progress</span>
                </div>
                <div style={{ height: '4px', backgroundColor: 'rgba(83,74,183,0.1)', borderRadius: '2px' }}>
                  <div style={{ height: '100%', width: '50%', backgroundColor: '#534ab7', borderRadius: '2px' }}></div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '11px', fontWeight: '600', color: '#534ab7', marginTop: '4px' }}>50%</div>
              </div>

              <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#e0e7ff', color: '#534ab7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700' }}>CN</div>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: '600', color: '#111827', margin: '0 0 2px 0' }}>Chidi Nwosu</p>
                      <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>Started May 12</p>
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '600', color: '#047857', backgroundColor: '#d1fae5', padding: '2px 8px', borderRadius: '12px' }}>On track</span>
                </div>
                <div style={{ height: '4px', backgroundColor: '#f3f4f6', borderRadius: '2px' }}>
                  <div style={{ height: '100%', width: '92%', backgroundColor: '#059669', borderRadius: '2px' }}></div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '11px', fontWeight: '600', color: '#4b5563', marginTop: '4px' }}>92%</div>
              </div>

              <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#e0e7ff', color: '#534ab7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700' }}>TB</div>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: '600', color: '#111827', margin: '0 0 2px 0' }}>Taiwo Bello</p>
                      <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>Started May 19</p>
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '600', color: '#be123c', backgroundColor: '#ffe4e6', padding: '2px 8px', borderRadius: '12px' }}>Needs nudge</span>
                </div>
                <div style={{ height: '4px', backgroundColor: '#f3f4f6', borderRadius: '2px' }}>
                  <div style={{ height: '100%', width: '17%', backgroundColor: '#e11d48', borderRadius: '2px' }}></div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '11px', fontWeight: '600', color: '#4b5563', marginTop: '4px' }}>17%</div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="card">
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 20px 0' }}>Sade's task owners</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#e0e7ff', color: '#534ab7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700' }}>SA</div>
                  <span style={{ fontSize: '13px', color: '#4b5563' }}>Sade (self)</span>
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
            <button className="auth-btn-primary" style={{ width: '100%', padding: '10px', backgroundColor: 'white', color: '#534ab7', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              Send nudge to Taiwo
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

