import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';
import { Search, Plus, Download, Upload, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import Papa from 'papaparse';
import toast from 'react-hot-toast';

const initialEmployees = [
  { id: 1, initials: 'KO', name: 'Kunle Obi', role: 'Software Engineer · Engineering', status: 'Active', statusColor: '#10b981', statusBg: '#d1fae5', 
    email: 'kunle.obi@company.com', dept: 'Engineering', title: 'Software Engineer', manager: 'David Bello', 
    startDate: '12 Jan 2023', type: 'Full-time', location: 'Lagos, Nigeria', empId: 'EMP-00042',
    leaves: [
      { type: 'Annual', used: 12, total: 20, color: '#534ab7' },
      { type: 'Sick', used: 3, total: 14, color: '#10b981' },
      { type: 'Casual', used: 2, total: 4, color: '#d97706' }
    ]
  },
  { id: 2, initials: 'SA', name: 'Sade Afolabi', role: 'Product Designer · Product', status: 'New hire', statusColor: '#534ab7', statusBg: '#e0e7ff',
    email: 'sade.afolabi@company.com', dept: 'Product', title: 'Product Designer', manager: 'Jane Doe', startDate: '18 May 2026', type: 'Full-time', location: 'Lagos, Nigeria', empId: 'EMP-00043',
    leaves: [{ type: 'Annual', used: 0, total: 20, color: '#534ab7' }, { type: 'Sick', used: 0, total: 14, color: '#10b981' }]
  },
  { id: 3, initials: 'TF', name: 'Tolu Fashola', role: 'Sales Lead · Sales', status: 'Active', statusColor: '#10b981', statusBg: '#d1fae5',
    email: 'tolu.fashola@company.com', dept: 'Sales', title: 'Sales Lead', manager: 'Michael Boss', startDate: '04 Mar 2022', type: 'Full-time', location: 'Remote', empId: 'EMP-00021',
    leaves: [{ type: 'Annual', used: 5, total: 20, color: '#534ab7' }]
  },
  { id: 4, initials: 'EM', name: 'Emeka Madu', role: 'Backend Engineer · Engineering', status: 'Active', statusColor: '#10b981', statusBg: '#d1fae5',
    email: 'emeka.madu@company.com', dept: 'Engineering', title: 'Backend Engineer', manager: 'David Bello', startDate: '11 Nov 2024', type: 'Full-time', location: 'Lagos, Nigeria', empId: 'EMP-00035',
    leaves: [{ type: 'Annual', used: 10, total: 20, color: '#534ab7' }]
  },
  { id: 5, initials: 'CN', name: 'Chidi Nwosu', role: 'DevOps Engineer · Engineering', status: 'New hire', statusColor: '#534ab7', statusBg: '#e0e7ff',
    email: 'chidi.nwosu@company.com', dept: 'Engineering', title: 'DevOps Engineer', manager: 'David Bello', startDate: '12 May 2026', type: 'Full-time', location: 'Remote', empId: 'EMP-00044',
    leaves: [{ type: 'Annual', used: 0, total: 20, color: '#534ab7' }]
  },
  { id: 6, initials: 'RK', name: 'Remi Kasali', role: 'Finance Analyst · Finance', status: 'Active', statusColor: '#10b981', statusBg: '#d1fae5',
    email: 'remi.kasali@company.com', dept: 'Finance', title: 'Finance Analyst', manager: 'Sarah CFO', startDate: '09 Sep 2021', type: 'Full-time', location: 'Lagos, Nigeria', empId: 'EMP-00014',
    leaves: [{ type: 'Annual', used: 18, total: 20, color: '#534ab7' }]
  },
  { id: 7, initials: 'DB', name: 'David Bello', role: 'Engineering Manager · Engineering', status: 'Active', statusColor: '#10b981', statusBg: '#d1fae5',
    email: 'david.bello@company.com', dept: 'Engineering', title: 'Engineering Manager', manager: 'VP Eng', startDate: '01 Jan 2020', type: 'Full-time', location: 'Lagos, Nigeria', empId: 'EMP-00003',
    leaves: [{ type: 'Annual', used: 15, total: 20, color: '#534ab7' }]
  }
];


const EmployeeDirectoryPage = () => {
  const { employees, addEmployee, updateEmployeeStatus } = useStore();
  const [selectedId, setSelectedId] = useState(employees[0]?.id || 1);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const fileInputRef = useRef(null);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleImportCSVClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImportCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = results.data;
        if (parsedData.length > 0) {
          let count = 0;
          parsedData.forEach(row => {
            if (row.name && row.email) {
              const newEmp = {
                id: Date.now() + Math.random(),
                initials: row.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase(),
                name: row.name,
                role: `${row.title || 'Employee'} · ${row.department || 'General'}`,
                status: 'New hire',
                statusColor: '#534ab7',
                statusBg: '#e0e7ff',
                email: row.email,
                dept: row.department || 'General',
                title: row.title || 'Employee',
                manager: row.manager || 'Unassigned',
                startDate: row.startDate || 'Today',
                type: row.type || 'Full-time',
                location: row.location || 'Remote',
                empId: `EMP-${Math.floor(Math.random() * 1000)}`,
                leaves: [{ type: 'Annual', used: 0, total: 20, color: '#534ab7' }]
              };
              addEmployee(newEmp);
              count++;
            }
          });
          toast.success(`Imported ${count} employees from CSV!`);
        } else {
          toast.error("CSV file is empty or improperly formatted.");
        }
        // Reset file input
        e.target.value = null;
      },
      error: () => {
        toast.error("Failed to parse CSV file.");
      }
    });
  };

  const handleExportCSV = () => {
    const csvData = employees.map(emp => ({
      name: emp.name,
      email: emp.email,
      department: emp.dept,
      title: emp.title,
      manager: emp.manager,
      startDate: emp.startDate,
      type: emp.type,
      location: emp.location,
      status: emp.status
    }));
    
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'employees_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Exported employees to CSV!');
  };

  const selectedEmp = employees.find(e => e.id === selectedId) || employees[0];

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || emp.role.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;
      
      if (filter === 'All') return true;
      if (filter === 'Active') return emp.status === 'Active';
      if (filter === 'New hire') return emp.status === 'New hire';
      if (filter === 'Inactive') return emp.status === 'Inactive';
      return true;
    });
  }, [employees, searchQuery, filter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredEmployees.slice(start, start + itemsPerPage);
  }, [filteredEmployees, currentPage, itemsPerPage]);

  const handleDeactivate = () => {
    if (!selectedEmp) return;
    updateEmployeeStatus(selectedId, 'Inactive', '#f3f4f6', '#6b7280');
  };

  const handleAddDemoEmployee = () => {
    setIsAdding(true);
    setTimeout(() => {
      const newEmp = {
        id: Date.now(), initials: 'JD', name: 'John Doe', role: 'Marketing Specialist · Marketing', status: 'New hire', statusColor: '#534ab7', statusBg: '#e0e7ff',
        email: 'john.doe@company.com', dept: 'Marketing', title: 'Marketing Specialist', manager: 'CMO', startDate: 'Today', type: 'Contract', location: 'Remote', empId: `EMP-000${Math.floor(Math.random() * 100)}`,
        leaves: [{ type: 'Annual', used: 0, total: 20, color: '#534ab7' }]
      };
      addEmployee(newEmp);
      setSelectedId(newEmp.id);
      setIsAdding(false);
    }, 1000);
  };

  const titleTabs = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginTop: '8px' }}>
      <Link to="/admin/employees" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#111827', textDecoration: 'none', borderBottom: '2px solid #111827', paddingBottom: '4px', fontWeight: '700', fontSize: '18px' }}>
        People 
      </Link>
      <Link to="/admin/employees/invite" style={{ color: '#6b7280', textDecoration: 'none', borderBottom: '2px solid transparent', paddingBottom: '4px', fontWeight: '500', fontSize: '18px' }}>
        Invite teammate
      </Link>
    </div>
  );

  return (
    <AdminLayout title={titleTabs}>
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
            display: flex; flex-wrap: wrap; background: #f3f4f6; border-radius: 8px; padding: 4px; gap: 4px;
          }
          .segment-btn {
            flex: 1 1 auto; white-space: nowrap; padding: 6px 12px; border: none; background: transparent; color: #4b5563;
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
            .top-actions-container { margin-top: 0 !important; justify-content: flex-start !important; }
          }
          .top-actions-container {
            display: flex; justify-content: flex-end; gap: 12px; 
            margin-bottom: 32px; position: relative; z-index: 10;
          }
        `}
      </style>



      <div className="top-actions-container">
        <input 
          type="file" 
          accept=".csv" 
          ref={fileInputRef} 
          onChange={handleImportCSV} 
          style={{ display: 'none' }} 
        />
        <button onClick={handleExportCSV} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', backgroundColor: 'white', color: '#534ab7', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>
          <Download size={16} /> Export
        </button>
        <button onClick={handleImportCSVClick} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', backgroundColor: 'white', color: '#534ab7', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>
          <Upload size={16} /> Import
        </button>
        <button 
          onClick={handleAddDemoEmployee}
          disabled={isAdding}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', backgroundColor: isAdding ? '#9ca3af' : '#534ab7', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: isAdding ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}
        >
          {isAdding ? 'Adding...' : <><Plus size={16} /> Add employee</>}
        </button>
      </div>

      <div className="split-pane">
        
        {/* Left Pane - List */}
        <div className="pane-left">
          <div style={{ padding: '24px', borderBottom: '1px solid #f3f4f6' }}>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', padding: '10px 16px 10px 36px', borderRadius: '8px', border: '1px solid #e5e7eb', backgroundColor: '#f9fafb', outline: 'none', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>
            </div>
            
            <div className="segmented-control">
              {['All', 'Active', 'New hire', 'Inactive'].map(opt => (
                <button key={opt} className={`segment-btn ${filter === opt ? 'active' : ''}`} onClick={() => setFilter(opt)}>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1 }}>
              <AnimatePresence>
                {paginatedEmployees.map(emp => (
                  <motion.div 
                    key={emp.id}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                    className={`emp-list-item ${selectedId === emp.id ? 'selected' : ''}`}
                    onClick={() => setSelectedId(emp.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: emp.statusBg, color: emp.statusColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '600', flexShrink: 0 }}>
                        {emp.initials}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: '14px', fontWeight: '600', color: selectedId === emp.id ? '#111827' : '#374151', margin: '0 0 2px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{emp.name}</p>
                        <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{emp.role}</p>
                      </div>
                    </div>
                    <span style={{ backgroundColor: emp.statusBg, color: emp.statusColor, padding: '4px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', whiteSpace: 'nowrap', flexShrink: 0, marginLeft: '8px' }}>
                      {emp.status}
                    </span>
                  </motion.div>
                ))}
                {filteredEmployees.length === 0 && (
                  <div style={{ padding: '24px', textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
                    No employees found.
                  </div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 12px', borderTop: '1px solid #f3f4f6', marginTop: 'auto' }}>
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', backgroundColor: 'white', color: currentPage === 1 ? '#9ca3af' : '#4b5563', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', fontWeight: '500', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                >
                  <ChevronLeft size={16} /> Prev
                </button>
                <span style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>
                  Page {currentPage} of {totalPages}
                </span>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', backgroundColor: 'white', color: currentPage === totalPages ? '#9ca3af' : '#4b5563', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', fontWeight: '500', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Pane - Details */}
        <div className="pane-right">
          <AnimatePresence mode="wait">
            {selectedEmp ? (
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
                        {selectedEmp.leaves?.map((leave, i) => (
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
                
                {/* Bottom Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '32px', borderTop: '1px solid #f3f4f6' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{ padding: '8px 16px', backgroundColor: 'white', color: '#534ab7', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>View in org chart</button>
                    <button style={{ padding: '8px 16px', backgroundColor: 'white', color: '#534ab7', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Leave history</button>
                  </div>
                  <button 
                    onClick={handleDeactivate}
                    disabled={selectedEmp.status === 'Inactive'}
                    style={{ padding: '8px 16px', backgroundColor: 'white', color: selectedEmp.status === 'Inactive' ? '#9ca3af' : '#ef4444', border: `1px solid ${selectedEmp.status === 'Inactive' ? '#d1d5db' : '#fca5a5'}`, borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: selectedEmp.status === 'Inactive' ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}>
                    {selectedEmp.status === 'Inactive' ? 'Deactivated' : 'Deactivate'}
                  </button>
                </div>
              </motion.div>
            ) : (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
                Select an employee to view details.
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </AdminLayout>
  );
};

export default EmployeeDirectoryPage;

