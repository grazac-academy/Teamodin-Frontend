import { useState, useMemo } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Search, Mail, Building2, MapPin, Phone, MessageSquare } from 'lucide-react';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';

const EmployeeDirectoryPortalPage = () => {
  const { employees } = useStore();
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const departments = ['All', 'Engineering', 'Product', 'Sales', 'Operations', 'Finance'];

  const filtered = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = 
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        (emp.role || '').toLowerCase().includes(search.toLowerCase()) ||
        (emp.dept || '').toLowerCase().includes(search.toLowerCase());
      
      const matchesDept = selectedDept === 'All' || (emp.dept || '').toLowerCase() === selectedDept.toLowerCase();

      return matchesSearch && matchesDept;
    });
  }, [employees, search, selectedDept]);

  const copyEmail = (email) => {
    navigator.clipboard.writeText(email);
    toast.success(`Copied ${email} to clipboard!`);
  };

  return (
    <AdminLayout title="Team Directory" subtitle="Connect with your colleagues, view reporting lines, and find teammates across departments.">
      <style>
        {`
          .dir-container { max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
          .member-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
          @media (max-width: 1024px) { .member-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 640px) { .member-grid { grid-template-columns: 1fr; } }
          .member-card { background: white; border-radius: 16px; border: 1px solid #f3f4f6; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); display: flex; flex-direction: column; justify-content: space-between; gap: 16px; transition: transform 0.2s, box-shadow 0.2s; }
          .member-card:hover { transform: translateY(-2px); box-shadow: 0 8px 16px rgba(0,0,0,0.06); }
        `}
      </style>

      <div className="dir-container">
        
        {/* Search & Department Filters */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          
          <div style={{ position: 'relative', width: '320px', maxWidth: '100%' }}>
            <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by name, role, department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '10px 14px 10px 36px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', background: 'white', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                style={{
                  padding: '6px 14px', borderRadius: '20px', border: '1px solid #e5e7eb',
                  background: selectedDept === dept ? '#534ab7' : 'white',
                  color: selectedDept === dept ? 'white' : '#4b5563',
                  fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s'
                }}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Member Cards Grid */}
        <div className="member-grid">
          {filtered.map((emp) => (
            <div key={emp.id} className="member-card">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '14px', background: '#e0e7ff',
                  color: '#534ab7', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '16px', fontWeight: '700', flexShrink: 0
                }}>
                  {emp.initials}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ margin: '0 0 2px 0', fontSize: '15px', fontWeight: '700', color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {emp.name}
                  </h4>
                  <p style={{ margin: '0 0 6px 0', fontSize: '13px', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {emp.title || emp.role}
                  </p>
                  <span style={{ padding: '2px 8px', background: '#f3f4f6', color: '#4b5563', borderRadius: '6px', fontSize: '11px', fontWeight: '600' }}>
                    {emp.dept}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#6b7280', borderTop: '1px solid #f3f4f6', paddingTop: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Building2 size={13} color="#9ca3af" />
                  <span>Manager: <strong>{emp.manager || 'David Babatunde'}</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={13} color="#9ca3af" />
                  <span>{emp.location || 'Lagos HQ / Remote'}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => copyEmail(emp.email)}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    padding: '8px', background: '#f3f0ff', color: '#534ab7', border: 'none',
                    borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer'
                  }}
                >
                  <Mail size={14} /> Email
                </button>
                <button
                  onClick={() => toast.success(`Opening Slack DM with ${emp.name.split(' ')[0]}...`)}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    padding: '8px', background: 'white', color: '#374151', border: '1px solid #d1d5db',
                    borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer'
                  }}
                >
                  <MessageSquare size={14} /> Slack
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </AdminLayout>
  );
};

export default EmployeeDirectoryPortalPage;
