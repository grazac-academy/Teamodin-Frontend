import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';

// Mock Data
const stats = [
  { title: 'Total Employees', value: '142', subtext: '+4 this month', subcolor: '#10b981' },
  { title: 'Onboarding Rate', value: '94%', subtext: 'Above target', subcolor: '#10b981' },
  { title: 'eNPS Score', value: '42', subtext: 'Last survey May 10', subcolor: '#534ab7' }
];

const initialPendingLeaves = [
  { id: 1, initials: 'KO', name: 'Kunle Obi', type: 'Annual leave - May 26–30', color: '#e0e7ff', textColor: '#534ab7' },
  { id: 2, initials: 'TF', name: 'Tolu Fashola', type: 'Sick leave - May 21', color: '#ffedd5', textColor: '#ea580c' },
  { id: 3, initials: 'EM', name: 'Emeka Madu', type: 'Annual leave - Jun 2–6', color: '#dbeafe', textColor: '#2563eb' }
];

const headcount = [
  { dept: 'Engineering', count: 48, max: 50, color: '#534ab7' },
  { dept: 'Product', count: 22, max: 50, color: '#818cf8' },
  { dept: 'Sales', count: 31, max: 50, color: '#a5b4fc' },
  { dept: 'Operations', count: 19, max: 50, color: '#c7d2fe' },
  { dept: 'Finance', count: 12, max: 50, color: '#e0e7ff' }
];

const onboarding = [
  { initials: 'CN', name: 'Chidi Nwosu', desc: 'Started May 12 · 11/12 tasks', status: 'On track', statusColor: '#10b981', statusBg: '#d1fae5', avatarBg: '#d1fae5', avatarText: '#047857' },
  { initials: 'SA', name: 'Sade Afolabi', desc: 'Started May 18 · 6/12 tasks', status: 'In progress', statusColor: '#d97706', statusBg: '#fef3c7', avatarBg: '#fef3c7', avatarText: '#b45309' },
  { initials: 'TB', name: 'Taiwo Bello', desc: 'Started May 19 · 2/12 tasks', status: 'Needs nudge', statusColor: '#e11d48', statusBg: '#ffe4e6', avatarBg: '#ffe4e6', avatarText: '#be123c' }
];

const outToday = [
  { initials: 'RK', name: 'Remi Kasali', desc: 'Annual leave · Returns May 22', avatarBg: '#d1fae5', avatarText: '#047857' },
  { initials: 'NN', name: 'Ngozi Nwankwo', desc: 'Sick leave · Today only', avatarBg: '#ffedd5', avatarText: '#c2410c' }
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const AdminDashboard = () => {
  const [leaves, setLeaves] = useState(initialPendingLeaves);

  const handleApprove = (id) => {
    setLeaves(leaves.filter(l => l.id !== id));
  };

  return (
    <AdminLayout 
      title={<>Good morning, Amaka <span style={{ display: 'inline-block', animation: 'wave 2s infinite', transformOrigin: '70% 70%' }}>👋</span></>} 
      subtitle="Wednesday, 20 May 2026"
    >
      <style>
        {`
          @keyframes wave {
            0% { transform: rotate(0deg); }
            10% { transform: rotate(14deg); }
            20% { transform: rotate(-8deg); }
            30% { transform: rotate(14deg); }
            40% { transform: rotate(-4deg); }
            50% { transform: rotate(10deg); }
            60% { transform: rotate(0deg); }
            100% { transform: rotate(0deg); }
          }
          .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
          @media (max-width: 1024px) {
            .dashboard-grid {
              grid-template-columns: 1fr;
            }
          }
          .stat-card {
            background: white; padding: 24px; border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05); border: 1px solid #f3f4f6;
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .stat-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
          }
          .panel-card {
            background: white; padding: 24px; border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05); border: 1px solid #f3f4f6;
          }
          .btn-approve {
            background: #d1fae5; color: #059669; border: none; padding: 6px 12px;
            border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;
            transition: background 0.2s;
          }
          .btn-approve:hover { background: #a7f3d0; }
        `}
      </style>

      <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          <motion.div variants={itemVariants} className="stat-card">
            <h3 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: '0 0 8px 0' }}>142</h3>
            <p style={{ fontSize: '13px', fontWeight: '600', color: '#4b5563', margin: '0 0 4px 0' }}>Total Employees</p>
            <p style={{ fontSize: '12px', color: '#10b981', margin: 0, fontWeight: '500' }}>+4 this month</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="stat-card">
            <h3 style={{ fontSize: '32px', fontWeight: '700', color: '#f59e0b', margin: '0 0 8px 0' }}>{leaves.length}</h3>
            <p style={{ fontSize: '13px', fontWeight: '600', color: '#4b5563', margin: '0 0 4px 0' }}>Pending Leaves</p>
            <p style={{ fontSize: '12px', color: '#f59e0b', margin: 0, fontWeight: '500' }}>Needs attention</p>
          </motion.div>

          {stats.slice(1).map((stat, i) => (
            <motion.div key={i} variants={itemVariants} className="stat-card">
              <h3 style={{ fontSize: '32px', fontWeight: '700', color: stat.title === 'Onboarding Rate' ? '#10b981' : '#534ab7', margin: '0 0 8px 0' }}>
                {stat.value}
              </h3>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#4b5563', margin: '0 0 4px 0' }}>{stat.title}</p>
              <p style={{ fontSize: '12px', color: stat.subcolor, margin: 0, fontWeight: '500' }}>{stat.subtext}</p>
            </motion.div>
          ))}
        </div>

        <div className="dashboard-grid">
          
          {/* Pending Leave Requests */}
          <motion.div variants={itemVariants} className="panel-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>Pending leave requests</h3>
              <a href="#" style={{ fontSize: '13px', color: '#534ab7', fontWeight: '500', textDecoration: 'none' }}>View all</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <AnimatePresence>
                {leaves.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '24px 0', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>
                    All caught up! No pending leave requests.
                  </motion.div>
                )}
                {leaves.map((leave, i) => (
                  <motion.div 
                    key={leave.id} 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: i !== leaves.length - 1 ? '16px' : '0', borderBottom: i !== leaves.length - 1 ? '1px solid #f3f4f6' : 'none' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: leave.color, color: leave.textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '600' }}>
                        {leave.initials}
                      </div>
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: '0 0 2px 0' }}>{leave.name}</p>
                        <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>{leave.type}</p>
                      </div>
                    </div>
                    <button className="btn-approve" onClick={() => handleApprove(leave.id)}>Approve</button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Department Headcount */}
          <motion.div variants={itemVariants} className="panel-card">
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 24px 0' }}>Department headcount</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {headcount.map((dept, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '80px', fontSize: '13px', color: '#4b5563', fontWeight: '500' }}>{dept.dept}</div>
                  <div style={{ flex: 1, height: '8px', backgroundColor: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(dept.count / dept.max) * 100}%` }}
                      transition={{ duration: 1, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
                      style={{ height: '100%', backgroundColor: dept.color, borderRadius: '4px' }} 
                    />
                  </div>
                  <div style={{ width: '20px', fontSize: '13px', fontWeight: '600', color: '#111827', textAlign: 'right' }}>{dept.count}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* New Hire Onboarding */}
          <motion.div variants={itemVariants} className="panel-card">
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 24px 0' }}>New hire onboarding</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {onboarding.map((hire, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: i !== onboarding.length - 1 ? '16px' : '0', borderBottom: i !== onboarding.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: hire.avatarBg, color: hire.avatarText, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '600' }}>
                      {hire.initials}
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: '0 0 2px 0' }}>{hire.name}</p>
                      <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>{hire.desc}</p>
                    </div>
                  </div>
                  <span style={{ backgroundColor: hire.statusBg, color: hire.statusColor, padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                    {hire.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Who's out today */}
          <motion.div variants={itemVariants} className="panel-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>Who's out today</h3>
              <a href="#" style={{ fontSize: '13px', color: '#534ab7', fontWeight: '500', textDecoration: 'none' }}>Team calendar</a>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
              {outToday.map((person, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid #f3f4f6' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: person.avatarBg, color: person.avatarText, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '600' }}>
                    {person.initials}
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: '0 0 2px 0' }}>{person.name}</p>
                    <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>{person.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: '#f9fafb', padding: '12px', borderRadius: '8px', textAlign: 'center', marginTop: '16px' }}>
              <span style={{ fontSize: '13px', fontWeight: '500', color: '#4b5563' }}>2 people out · 140 available today</span>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminDashboard;
