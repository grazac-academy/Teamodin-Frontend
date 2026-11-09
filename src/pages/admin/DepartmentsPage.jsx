import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';
import { 
  Building2, Users, Plus, Search, MoreVertical, 
  ArrowRight, Briefcase, DollarSign, X, Check, Edit2, Trash2 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';

const DepartmentsPage = () => {
  const { departments, employees, addDepartment, updateDepartment, deleteDepartment } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDeptForMembers, setSelectedDeptForMembers] = useState(null);

  // New department form state
  const [newDept, setNewDept] = useState({
    name: '',
    code: '',
    lead: '',
    description: '',
    budget: '$50,000/mo',
    headcountTarget: 20
  });

  const filteredDepts = useMemo(() => {
    return departments.filter(d => 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.lead.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [departments, searchQuery]);

  const totalHeadcount = useMemo(() => {
    return departments.reduce((acc, d) => acc + (d.headcount || 0), 0);
  }, [departments]);

  const totalOpenRoles = useMemo(() => {
    return departments.reduce((acc, d) => acc + (d.openRoles || 0), 0);
  }, [departments]);

  const handleCreateDepartment = (e) => {
    e.preventDefault();
    if (!newDept.name || !newDept.code) {
      toast.error('Please fill in department name and code');
      return;
    }

    const created = {
      id: Date.now(),
      name: newDept.name,
      code: newDept.code.toUpperCase(),
      lead: newDept.lead || 'Unassigned',
      leadInitials: (newDept.lead || 'UN').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
      headcount: 0,
      openRoles: 0,
      budget: newDept.budget || '$30,000/mo',
      description: newDept.description || 'Newly added organizational department.'
    };

    addDepartment(created);
    toast.success(`Department "${created.name}" created!`);
    setIsAddModalOpen(false);
    setNewDept({ name: '', code: '', lead: '', description: '', budget: '$50,000/mo', headcountTarget: 20 });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete the ${name} department?`)) {
      deleteDepartment(id);
      toast.success(`${name} department removed.`);
    }
  };

  // Get members of the currently selected department for viewing
  const departmentMembers = useMemo(() => {
    if (!selectedDeptForMembers) return [];
    return employees.filter(emp => {
      const empDept = (emp.dept || '').toLowerCase();
      const targetDept = selectedDeptForMembers.name.toLowerCase();
      return empDept.includes(targetDept) || targetDept.includes(empDept);
    });
  }, [employees, selectedDeptForMembers]);

  return (
    <AdminLayout title="Departments" subtitle="Manage your teams, reporting lines, and organizational structure.">
      <style>
        {`
          .dept-container { max-width: 1280px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
          .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
          @media (max-width: 1024px) { .metrics-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 640px) { .metrics-grid { grid-template-columns: 1fr; } }
          .metric-card { background: white; border: 1px solid #f3f4f6; border-radius: 12px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
          .dept-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
          @media (max-width: 1024px) { .dept-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 700px) { .dept-grid { grid-template-columns: 1fr; } }
          .dept-card { background: white; border: 1px solid #f3f4f6; border-radius: 16px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; gap: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); transition: transform 0.2s, box-shadow 0.2s; }
          .dept-card:hover { transform: translateY(-2px); box-shadow: 0 8px 16px rgba(0,0,0,0.06); }
          .dept-badge { padding: 4px 8px; background: #eef2ff; color: #4338ca; border-radius: 6px; font-size: 12px; font-weight: 700; }
          .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 16px; }
          .modal-box { background: white; border-radius: 16px; width: 100%; max-width: 500px; padding: 32px; max-height: 90vh; overflow-y: auto; }
          .form-input { width: 100%; padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; outline: none; margin-top: 4px; box-sizing: border-box; }
          .dept-search-box { position: relative; flex: 1; max-width: 360px; min-width: 240px; }
          @media (max-width: 640px) {
            .modal-box { padding: 20px 16px; }
            .dept-card { padding: 18px 16px; }
            .dept-search-box { max-width: 100%; width: 100%; }
          }
        `}
      </style>

      <div className="dept-container">
        
        {/* KPI Metrics */}
        <div className="metrics-grid">
          <div className="metric-card">
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 6px 0', fontWeight: '500' }}>Departments</p>
            <h3 style={{ fontSize: '26px', fontWeight: '700', color: '#111827', margin: 0 }}>{departments.length}</h3>
            <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '600' }}>Active divisions</span>
          </div>
          <div className="metric-card">
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 6px 0', fontWeight: '500' }}>Total Headcount</p>
            <h3 style={{ fontSize: '26px', fontWeight: '700', color: '#111827', margin: 0 }}>{totalHeadcount}</h3>
            <span style={{ fontSize: '12px', color: '#534ab7', fontWeight: '600' }}>Across all offices</span>
          </div>
          <div className="metric-card">
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 6px 0', fontWeight: '500' }}>Open Requisitions</p>
            <h3 style={{ fontSize: '26px', fontWeight: '700', color: '#111827', margin: 0 }}>{totalOpenRoles}</h3>
            <span style={{ fontSize: '12px', color: '#d97706', fontWeight: '600' }}>Roles hiring now</span>
          </div>
          <div className="metric-card">
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 6px 0', fontWeight: '500' }}>Avg Team Size</p>
            <h3 style={{ fontSize: '26px', fontWeight: '700', color: '#111827', margin: 0 }}>
              {departments.length ? Math.round(totalHeadcount / departments.length) : 0}
            </h3>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Members / Dept</span>
          </div>
        </div>

        {/* Action & Filter Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div className="dept-search-box">
            <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text"
              placeholder="Search departments or leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '10px 14px 10px 36px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', background: 'white' }}
            />
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
              backgroundColor: '#534ab7', color: 'white', border: 'none', borderRadius: '8px',
              fontSize: '14px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            <Plus size={18} /> Add Department
          </button>
        </div>

        {/* Departments Grid */}
        <div className="dept-grid">
          {filteredDepts.map((dept) => (
            <motion.div 
              key={dept.id} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="dept-card"
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f3f0ff', color: '#534ab7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Building2 size={20} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 }}>{dept.name}</h3>
                      <span className="dept-badge">{dept.code}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(dept.id, dept.name)}
                    style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: '4px' }}
                    title="Delete Department"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 16px 0', lineHeight: '1.5', minHeight: '38px' }}>
                  {dept.description}
                </p>

                {/* Lead */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: '#f9fafb', borderRadius: '8px', marginBottom: '16px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#e0e7ff', color: '#534ab7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700' }}>
                    {dept.leadInitials || 'LD'}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '11px', color: '#6b7280', fontWeight: '500' }}>Department Lead</p>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#111827' }}>{dept.lead}</p>
                  </div>
                </div>

                {/* Headcount bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                    <span style={{ color: '#4b5563', fontWeight: '500' }}>{dept.headcount} Team Members</span>
                    {dept.openRoles > 0 && (
                      <span style={{ color: '#047857', fontWeight: '600', background: '#ecfdf5', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>
                        +{dept.openRoles} hiring
                      </span>
                    )}
                  </div>
                  <div style={{ height: '6px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${Math.min(100, (dept.headcount / 50) * 100)}%`, background: '#534ab7', borderRadius: '4px' }} />
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f3f4f6', paddingTop: '16px' }}>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>
                  Budget: <strong style={{ color: '#111827' }}>{dept.budget}</strong>
                </span>
                <button
                  onClick={() => setSelectedDeptForMembers(dept)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none',
                    color: '#534ab7', fontSize: '13px', fontWeight: '600', cursor: 'pointer', padding: 0
                  }}
                >
                  View Team <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Department Modal */}
        <AnimatePresence>
          {isAddModalOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-backdrop">
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="modal-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>Add New Department</h2>
                  <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleCreateDepartment} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Department Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Customer Success & Support" 
                      value={newDept.name} 
                      onChange={(e) => setNewDept({ ...newDept, name: e.target.value })} 
                      className="form-input" 
                      required 
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Short Code</label>
                      <input 
                        type="text" 
                        placeholder="e.g. CSS" 
                        value={newDept.code} 
                        onChange={(e) => setNewDept({ ...newDept, code: e.target.value })} 
                        className="form-input" 
                        required 
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Department Lead</label>
                      <select 
                        value={newDept.lead} 
                        onChange={(e) => setNewDept({ ...newDept, lead: e.target.value })} 
                        className="form-input"
                      >
                        <option value="">Select a team lead...</option>
                        {employees.map(e => (
                          <option key={e.id} value={e.name}>{e.name} ({e.title})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Description & Scope</label>
                    <textarea 
                      rows="3" 
                      placeholder="What is this team responsible for?" 
                      value={newDept.description} 
                      onChange={(e) => setNewDept({ ...newDept, description: e.target.value })} 
                      className="form-input" 
                      style={{ resize: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Monthly Budget Allocation</label>
                    <input 
                      type="text" 
                      placeholder="$45,000/mo" 
                      value={newDept.budget} 
                      onChange={(e) => setNewDept({ ...newDept, budget: e.target.value })} 
                      className="form-input" 
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '16px', justifyContent: 'flex-end' }}>
                    <button 
                      type="button" 
                      onClick={() => setIsAddModalOpen(false)}
                      style={{ padding: '10px 16px', background: 'white', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      style={{ padding: '10px 16px', background: '#534ab7', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                    >
                      Create Department
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View Department Members Drawer / Modal */}
        <AnimatePresence>
          {selectedDeptForMembers && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-backdrop">
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="modal-box" style={{ maxWidth: '600px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>
                      {selectedDeptForMembers.name} Team
                    </h2>
                    <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0 0 0' }}>
                      {departmentMembers.length} active employees in this department
                    </p>
                  </div>
                  <button onClick={() => setSelectedDeptForMembers(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                    <X size={20} />
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '420px', overflowY: 'auto' }}>
                  {departmentMembers.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '32px 16px', color: '#6b7280', fontSize: '14px' }}>
                      No direct employees assigned to this department yet.
                    </div>
                  ) : (
                    departmentMembers.map(emp => (
                      <div 
                        key={emp.id} 
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#f9fafb', borderRadius: '8px' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#e0e7ff', color: '#534ab7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700' }}>
                            {emp.initials}
                          </div>
                          <div>
                            <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#111827' }}>{emp.name}</p>
                            <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>{emp.title || emp.role}</p>
                          </div>
                        </div>

                        <Link 
                          to={`/admin/employees/${emp.id}`}
                          style={{ fontSize: '12px', fontWeight: '600', color: '#534ab7', textDecoration: 'none', padding: '6px 10px', background: 'white', borderRadius: '6px', border: '1px solid #e5e7eb' }}
                        >
                          View Profile
                        </Link>
                      </div>
                    ))
                  )}
                </div>

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button 
                    onClick={() => setSelectedDeptForMembers(null)}
                    style={{ padding: '8px 16px', background: '#f3f4f6', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: '#374151' }}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </AdminLayout>
  );
};

export default DepartmentsPage;
