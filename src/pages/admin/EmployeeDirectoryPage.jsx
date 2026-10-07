import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';
import { Search, Plus } from 'lucide-react';

const employees = [
  { id: 1, initials: 'KO', name: 'Kunle Obi', role: 'Software Engineer · Engineering', status: 'Active', statusColor: '#10b981', statusBg: '#d1fae5', 
    email: 'kunle.obi@company.com', dept: 'Engineering', title: 'Software Engineer', manager: 'David Bello', 
    startDate: '12 Jan 2023', type: 'Full-time', location: 'Lagos, Nigeria', empId: 'EMP-00042',
    leaves: [
      { type: 'Annual', used: 12, total: 20, color: '#534ab7' },
      { type: 'Sick', used: 3, total: 14, color: '#10b981' },
      { type: 'Casual', used: 2, total: 4, color: '#d97706' }
    ]
  },
  { id: 2, initials: 'SA', name: 'Sade Afolabi', role: 'Product Designer · Product', status: 'New hire', statusColor: '#534ab7', statusBg: '#e0e7ff' },
  { id: 3, initials: 'TF', name: 'Tolu Fashola', role: 'Sales Lead · Sales', status: 'Active', statusColor: '#10b981', statusBg: '#d1fae5' },
  { id: 4, initials: 'EM', name: 'Emeka Madu', role: 'Backend Engineer · Engineering', status: 'Active', statusColor: '#10b981', statusBg: '#d1fae5' },
  { id: 5, initials: 'CN', name: 'Chidi Nwosu', role: 'DevOps Engineer · Engineering', status: 'New hire', statusColor: '#534ab7', statusBg: '#e0e7ff' },
  { id: 6, initials: 'RK', name: 'Remi Kasali', role: 'Finance Analyst · Finance', status: 'Active', statusColor: '#10b981', statusBg: '#d1fae5' },
  { id: 7, initials: 'DB', name: 'David Bello', role: 'Engineering Manager · Engineering', status: 'Active', statusColor: '#10b981', statusBg: '#d1fae5' },
];

const EmployeeDirectoryPage = () => {
  const [selectedId, setSelectedId] = useState(1);
  const [filter, setFilter] = useState('All');
  const selectedEmp = employees.find(e => e.id === selectedId) || employees[0];

  const filteredEmployees = employees.filter(emp => {
    if (filter === 'All') return true;
    if (filter === 'Active') return emp.status === 'Active';
    if (filter === 'New hire') return emp.status === 'New hire';
    if (filter === 'Inactive') return emp.status === 'Inactive';
    return true;
  });

  return (
    <AdminLayout 
      title={<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>People <span style={{ fontSize: '13px', fontWeight: '500', color: '#6b7280', backgroundColor: '#f3f4f6', padding: '4px 10px', borderRadius: '12px' }}>142 employees</span></div>} 
    >
      <style>
        {`
          .emp-list-item {
            display: flex; align-items: center; justify-content: space-between;
            padding: 16px; border-radius: 8px; cursor: pointer; transition: all 0.2s;
            margin-bottom: 4px;
          }
          .emp-list-item:hover { background-color: #f9fafb; }
          .emp-list-item.selected { background-color: #f3f0ff; }
          .segmented-control {
            display: flex; background: #f3f4f6; border-radius: 8px; padding: 4px; gap: 4px;
          }
          .segment-btn {
            flex: 1; padding: 6px; border: none; background: transparent; color: #4b5563;
            border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s;
          }
          .segment-btn.active {
            background: white; color: #534ab7; box-shadow: 0 1px 2px rgba(0,0,0,0.05); font-weight: 600;
          }
          .split-pane {
            display: flex; gap: 24px; background-color: white; border-radius: 12px; border: 1px solid #f3f4f6; overflow: hidden; min-height: 600px;
          }
          .pane-left {
            width: 340px; border-right: 1px solid #f3f4f6; display: flex; flex-direction: column;
          }
          .pane-right {
            flex: 1; padding: 32px; display: flex; flex-direction: column;
          }
          .info-grid {
            display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 48px;
          }
          @media (max-width: 1024px) {
            .split-pane { flex-direction: column; }
            .pane-left { width: 100%; border-right: none; border-bottom: 1px solid #f3f4f6; }
            .pane-right { padding: 20px; }
            .info-grid { grid-template-columns: 1fr; gap: 20px; }
          }
        `}
      </style>

      {/* Top Actions */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '-64px', marginBottom: '32px', position: 'relative', zIndex: 10 }}>
        <button style={{ padding: '10px 16px', backgroundColor: 'white', color: '#534ab7', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
          Import CSV
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', backgroundColor: '#534ab7', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
          <Plus size={16} /> Add employee
        </button>
      </div>

      <div className="split-pane">
        
        {/* Left Pane - List */}
        <div className="pane-left">
          <div style={{ padding: '24px', borderBottom: '1px solid #f3f4f6' }}>
            <div style={{ position: 'relative', marginBottom: '16px' }}>
              <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" placeholder="Search by name or dept..." 
                style={{ width: '100%', padding: '10px 16px 10px 36px', borderRadius: '8px', border: '1px solid #e5e7eb', backgroundColor: '#f9fafb', outline: 'none', fontSize: '14px' }}
              />
            </div>
            
            <div className="segmented-control">
              {['All', 'Active', 'New hire', 'Inactive'].map(opt => (
                <button key={opt} className={`segment-btn ${filter === opt ? 'active' : ''}`} onClick={() => setFilter(opt)}>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
            <AnimatePresence>
              {filteredEmployees.map(emp => (
                <motion.div 
                  key={emp.id}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className={`emp-list-item ${selectedId === emp.id ? 'selected' : ''}`}
                  onClick={() => setSelectedId(emp.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: emp.statusBg, color: emp.statusColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '600' }}>
                      {emp.initials}
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: selectedId === emp.id ? '#111827' : '#374151', margin: '0 0 2px 0' }}>{emp.name}</p>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{emp.role}</p>
                    </div>
                  </div>
                  <span style={{ backgroundColor: emp.statusBg, color: emp.statusColor, padding: '4px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {emp.status}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Pane - Details */}
        <div className="pane-right">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              {/* Profile Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: selectedEmp.statusBg, color: selectedEmp.statusColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '600' }}>
                    {selectedEmp.initials}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                      <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: 0 }}>{selectedEmp.name}</h2>
                      <span style={{ backgroundColor: selectedEmp.statusBg, color: selectedEmp.statusColor, padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                        {selectedEmp.status}
                      </span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#4b5563', margin: '0 0 12px 0' }}>{selectedEmp.role}</p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{ padding: '6px 12px', backgroundColor: '#f3f0ff', color: '#534ab7', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Message</button>
                      <button style={{ padding: '6px 12px', backgroundColor: 'white', color: '#534ab7', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Edit profile</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Grid */}
              {selectedEmp.email ? (
                <>
                  <div className="info-grid">
                    <div>
                      <p style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px 0' }}>Email</p>
                      <p style={{ fontSize: '14px', color: '#111827', margin: 0 }}>{selectedEmp.email}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px 0' }}>Department</p>
                      <p style={{ fontSize: '14px', color: '#111827', margin: 0 }}>{selectedEmp.dept}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px 0' }}>Job Title</p>
                      <p style={{ fontSize: '14px', color: '#111827', margin: 0 }}>{selectedEmp.title}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px 0' }}>Manager</p>
                      <p style={{ fontSize: '14px', color: '#111827', margin: 0 }}>{selectedEmp.manager}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px 0' }}>Start Date</p>
                      <p style={{ fontSize: '14px', color: '#111827', margin: 0 }}>{selectedEmp.startDate}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px 0' }}>Employment Type</p>
                      <p style={{ fontSize: '14px', color: '#111827', margin: 0 }}>{selectedEmp.type}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px 0' }}>Location</p>
                      <p style={{ fontSize: '14px', color: '#111827', margin: 0 }}>{selectedEmp.location}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px 0' }}>Employee ID</p>
                      <p style={{ fontSize: '14px', color: '#111827', margin: 0 }}>{selectedEmp.empId}</p>
                    </div>
                  </div>

                  {/* Leave Balances */}
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0' }}>Leave Balances</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {selectedEmp.leaves.map((leave, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                          <div style={{ width: '60px', fontSize: '13px', color: '#4b5563', fontWeight: '500' }}>{leave.type}</div>
                          <div style={{ flex: 1, height: '8px', backgroundColor: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                            <motion.div 
                              initial={{ width: 0 }} animate={{ width: `${(leave.used / leave.total) * 100}%` }}
                              transition={{ duration: 1, delay: 0.1 * i }}
                              style={{ height: '100%', backgroundColor: leave.color, borderRadius: '4px' }} 
                            />
                          </div>
                          <div style={{ width: '80px', fontSize: '13px', color: '#6b7280', textAlign: 'right' }}>
                            <span style={{ fontWeight: '600', color: '#111827' }}>{leave.used}</span> / {leave.total} days
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
                  Detailed profile data is not available for this mock user.
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Bottom Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '32px', borderTop: '1px solid #f3f4f6' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ padding: '8px 16px', backgroundColor: 'white', color: '#534ab7', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>View in org chart</button>
              <button style={{ padding: '8px 16px', backgroundColor: 'white', color: '#534ab7', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Leave history</button>
            </div>
            <button style={{ padding: '8px 16px', backgroundColor: 'white', color: '#ef4444', border: '1px solid #fca5a5', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Deactivate</button>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default EmployeeDirectoryPage;

