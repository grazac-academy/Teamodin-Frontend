import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';
import { CreditCard, Download, Play, CheckCircle2, Building2, Search, FileText, X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';

const payrollRecords = [
  { id: 1, name: 'Sade Afolabi', role: 'Senior Product Designer', dept: 'Product', gross: '₦1,050,000', tax: '₦142,000', pension: '₦68,000', net: '₦840,000', bank: 'Stanbic IBTC', status: 'Disbursed' },
  { id: 2, name: 'Chidi Nwosu', role: 'Full Stack Engineer', dept: 'Engineering', gross: '₦1,200,000', tax: '₦168,000', pension: '₦78,000', net: '₦954,000', bank: 'Access Bank', status: 'Disbursed' },
  { id: 3, name: 'David Babatunde', role: 'Engineering Director', dept: 'Engineering', gross: '₦2,400,000', tax: '₦380,000', pension: '₦156,000', net: '₦1,864,000', bank: 'GTBank', status: 'Disbursed' },
  { id: 4, name: 'Amaka Okafor', role: 'Head of People Ops', dept: 'HR & People', gross: '₦1,850,000', tax: '₦280,000', pension: '₦120,000', net: '₦1,450,000', bank: 'Zenith Bank', status: 'Disbursed' },
  { id: 5, name: 'Kunle Obi', role: 'DevOps Engineer', dept: 'Engineering', gross: '₦1,150,000', tax: '₦158,000', pension: '₦74,000', net: '₦918,000', bank: 'UBA', status: 'Disbursed' },
  { id: 6, name: 'Tolu Fashola', role: 'QA Automation', dept: 'Engineering', gross: '₦950,000', tax: '₦125,000', pension: '₦62,000', net: '₦763,000', bank: 'Stanbic IBTC', status: 'Disbursed' }
];

const AdminPayrollPage = () => {
  const [records] = useState(payrollRecords);
  const [search, setSearch] = useState('');
  const [isRunningModalOpen, setIsRunningModalOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunPayroll = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setIsRunningModalOpen(false);
      toast.success('May 2026 Payroll successfully processed and payment files transmitted!');
    }, 1500);
  };

  const handleExportCSV = () => {
    toast.success('Payroll summary exported to CSV!');
  };

  const filtered = records.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.dept.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Payroll & Compensation" subtitle="Manage company salary disbursements, statutory deductions, pension remittances, and payroll exports.">
      <style>
        {`
          .payroll-container { max-width: 1280px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
          .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
          @media (max-width: 1024px) { .metrics-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 640px) { .metrics-grid { grid-template-columns: 1fr; } }
          .card { background: white; border-radius: 16px; border: 1px solid #f3f4f6; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
          .table-wrapper { overflow-x: auto; -webkit-overflow-scrolling: touch; }
          .payroll-table { width: 100%; min-width: 760px; border-collapse: collapse; text-align: left; }
          .payroll-table th { padding: 12px 16px; background: #f9fafb; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; border-bottom: 1px solid #f3f4f6; }
          .payroll-table td { padding: 16px; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827; vertical-align: middle; }
          .badge { padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 700; }
          .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 16px; }
          .modal-box { background: white; border-radius: 16px; width: 100%; max-width: 480px; padding: 28px; }
        `}
      </style>

      <div className="payroll-container">
        
        {/* KPI Metrics */}
        <div className="metrics-grid">
          <div className="card">
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Total Monthly Payroll</span>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '6px 0 2px 0' }}>₦8,600,000</h3>
            <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '600' }}>For 6 direct payees</span>
          </div>

          <div className="card">
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>PAYE Tax Withholding</span>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#ef4444', margin: '6px 0 2px 0' }}>₦1,256,000</h3>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>State IRS remittance</span>
          </div>

          <div className="card">
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Pension Contributions (8% + 10%)</span>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#534ab7', margin: '6px 0 2px 0' }}>₦558,000</h3>
            <span style={{ fontSize: '12px', color: '#534ab7', fontWeight: '600' }}>PenCom RSA compliance</span>
          </div>

          <div className="card">
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Next Payroll Run</span>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '6px 0 2px 0' }}>28 May 2026</h3>
            <span style={{ fontSize: '12px', color: '#d97706', fontWeight: '600' }}>Auto-disbursement scheduled</span>
          </div>
        </div>

        {/* Action Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          
          <div style={{ position: 'relative', width: '320px', maxWidth: '100%' }}>
            <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search payees by name or dept..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '10px 14px 10px 36px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', background: 'white', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleExportCSV}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', background: 'white', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: '#374151', cursor: 'pointer' }}
            >
              <Download size={16} /> Export Bank Batch (CSV)
            </button>
            <button
              onClick={() => setIsRunningModalOpen(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', background: '#534ab7', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
            >
              <Play size={16} /> Run May Payroll
            </button>
          </div>
        </div>

        {/* Payroll Table */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-wrapper">
            <table className="payroll-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Gross Salary</th>
                  <th>PAYE Tax</th>
                  <th>Pension</th>
                  <th>Net Take-Home</th>
                  <th>Disbursement Bank</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <span style={{ fontWeight: '700', color: '#111827' }}>{item.name}</span>
                      <span style={{ display: 'block', fontSize: '12px', color: '#6b7280' }}>{item.role}</span>
                    </td>
                    <td>
                      <span style={{ padding: '2px 8px', background: '#f3f4f6', borderRadius: '6px', fontSize: '11px', fontWeight: '600' }}>
                        {item.dept}
                      </span>
                    </td>
                    <td style={{ fontWeight: '600' }}>{item.gross}</td>
                    <td style={{ color: '#ef4444' }}>- {item.tax}</td>
                    <td style={{ color: '#534ab7' }}>- {item.pension}</td>
                    <td>
                      <span style={{ fontWeight: '700', color: '#047857', fontSize: '15px' }}>{item.net}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '13px', color: '#4b5563' }}>{item.bank}</span>
                    </td>
                    <td>
                      <span className="badge" style={{ background: '#d1fae5', color: '#047857' }}>
                        ✓ {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Run Payroll Confirmation Modal */}
      <AnimatePresence>
        {isRunningModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-backdrop">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="modal-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>Initiate Payroll Run</h3>
                <button onClick={() => setIsRunningModalOpen(false)} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>

              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '20px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#6b7280' }}>Pay Period:</span>
                  <span style={{ fontWeight: '700' }}>May 1 – May 31, 2026</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#6b7280' }}>Eligible Payees:</span>
                  <span style={{ fontWeight: '700' }}>{records.length} Employees</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '8px', fontSize: '14px' }}>
                  <span style={{ fontWeight: '700', color: '#111827' }}>Total Net Disbursement:</span>
                  <span style={{ fontWeight: '800', color: '#047857' }}>₦6,789,000.00</span>
                </div>
              </div>

              <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#6b7280', lineHeight: '1.5' }}>
                Transmitting this batch will trigger payment instructions via your connected corporate banking gateway and send payslip notifications to all employees.
              </p>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setIsRunningModalOpen(false)}
                  style={{ padding: '8px 16px', background: 'white', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleRunPayroll}
                  disabled={isRunning}
                  style={{ padding: '8px 24px', background: isRunning ? '#9ca3af' : '#534ab7', color: 'white', border: 'none', borderRadius: '8px', cursor: isRunning ? 'not-allowed' : 'pointer', fontWeight: '700' }}
                >
                  {isRunning ? 'Processing...' : 'Authorize Disbursement'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};

export default AdminPayrollPage;
