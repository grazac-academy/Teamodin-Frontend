import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';
import { Download, FileText, CheckCircle2, ChevronRight, Eye, X, Building2, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';

const mockPayslips = [
  { id: 'PS-2026-04', month: 'April 2026', payDate: '28 Apr 2026', gross: '₦1,050,000.00', tax: '₦142,000.00', pension: '₦68,000.00', net: '₦840,000.00', status: 'Paid', account: 'Stanbic IBTC (••• 4892)' },
  { id: 'PS-2026-03', month: 'March 2026', payDate: '27 Mar 2026', gross: '₦1,050,000.00', tax: '₦142,000.00', pension: '₦68,000.00', net: '₦840,000.00', status: 'Paid', account: 'Stanbic IBTC (••• 4892)' },
  { id: 'PS-2026-02', month: 'February 2026', payDate: '27 Feb 2026', gross: '₦1,050,000.00', tax: '₦142,000.00', pension: '₦68,000.00', net: '₦840,000.00', status: 'Paid', account: 'Stanbic IBTC (••• 4892)' },
  { id: 'PS-2026-01', month: 'January 2026', payDate: '28 Jan 2026', gross: '₦1,050,000.00', tax: '₦142,000.00', pension: '₦68,000.00', net: '₦840,000.00', status: 'Paid', account: 'Stanbic IBTC (••• 4892)' },
];

const EmployeePayslipsPage = () => {
  const [selectedSlip, setSelectedSlip] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = (id) => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      toast.success(`Payslip ${id}.pdf downloaded successfully!`);
    }, 1200);
  };

  return (
    <AdminLayout title="My Payslips & Compensation" subtitle="View and download your monthly salary statements, tax withholdings, and pension contributions.">
      <style>
        {`
          .payslips-container { max-width: 1100px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
          .summary-card { background: white; border-radius: 16px; border: 1px solid #f3f4f6; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
          .summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
          @media (max-width: 768px) { .summary-grid { grid-template-columns: 1fr; } }
          .table-wrapper { overflow-x: auto; -webkit-overflow-scrolling: touch; }
          .slip-table { width: 100%; min-width: 600px; border-collapse: collapse; text-align: left; }
          .slip-table th { padding: 12px 16px; background: #f9fafb; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; border-bottom: 1px solid #f3f4f6; }
          .slip-table td { padding: 16px; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827; vertical-align: middle; }
          .badge { padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 700; }
          .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 16px; }
          .modal-box { background: white; border-radius: 16px; width: 100%; max-width: 520px; padding: 28px; max-height: 90vh; overflow-y: auto; }
        `}
      </style>

      <div className="payslips-container">
        
        {/* Top Summary Cards */}
        <div className="summary-card">
          <div className="summary-grid">
            <div>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Latest Net Payout</span>
              <h3 style={{ fontSize: '26px', fontWeight: '700', color: '#111827', margin: '4px 0 2px 0' }}>₦840,000.00</h3>
              <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '600' }}>✓ Disbursed 28 Apr 2026</span>
            </div>

            <div>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Designated Bank Account</span>
              <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '8px 0 2px 0' }}>Stanbic IBTC Bank</h4>
              <span style={{ fontSize: '13px', color: '#6b7280' }}>Account: •••• 4892 · Verified</span>
            </div>

            <div>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Tax / Pension IDs</span>
              <div style={{ marginTop: '6px', fontSize: '12px', color: '#4b5563', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span><strong>TIN:</strong> 2389104-0001</span>
                <span><strong>RSA Pension:</strong> PEN-1092837482</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payslips Table */}
        <div className="summary-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #f3f4f6' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 }}>Payment Records</h3>
          </div>

          <div className="table-wrapper">
            <table className="slip-table">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Payment Date</th>
                  <th>Gross Earnings</th>
                  <th>Deductions (Tax + Pension)</th>
                  <th>Net Take-Home</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockPayslips.map((slip) => (
                  <tr key={slip.id}>
                    <td>
                      <span style={{ fontWeight: '700', color: '#111827' }}>{slip.month}</span>
                      <span style={{ display: 'block', fontSize: '11px', color: '#9ca3af' }}>{slip.id}</span>
                    </td>
                    <td>{slip.payDate}</td>
                    <td style={{ fontWeight: '600' }}>{slip.gross}</td>
                    <td style={{ color: '#ef4444' }}>- ₦210,000.00</td>
                    <td>
                      <span style={{ fontWeight: '700', color: '#047857', fontSize: '15px' }}>{slip.net}</span>
                    </td>
                    <td>
                      <span className="badge" style={{ background: '#d1fae5', color: '#047857' }}>
                        {slip.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          onClick={() => setSelectedSlip(slip)}
                          style={{ padding: '6px 10px', background: '#f3f0ff', color: '#534ab7', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Eye size={14} /> View
                        </button>
                        <button
                          onClick={() => handleDownload(slip.id)}
                          style={{ padding: '6px 10px', background: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Download size={14} /> PDF
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Payslip Detail Modal */}
      <AnimatePresence>
        {selectedSlip && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-backdrop">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="modal-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>Payslip — {selectedSlip.month}</h3>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>Reference: {selectedSlip.id}</span>
                </div>
                <button onClick={() => setSelectedSlip(null)} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>

              {/* Earnings Breakdown */}
              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#6b7280', letterSpacing: '0.5px' }}>Earnings</span>
                <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span>Basic Salary</span>
                    <span style={{ fontWeight: '600' }}>₦650,000.00</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span>Housing Allowance</span>
                    <span style={{ fontWeight: '600' }}>₦250,000.00</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span>Transport & Utility</span>
                    <span style={{ fontWeight: '600' }}>₦150,000.00</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '700', borderTop: '1px solid #f3f4f6', paddingTop: '8px' }}>
                    <span>Total Gross Pay</span>
                    <span>{selectedSlip.gross}</span>
                  </div>
                </div>
              </div>

              {/* Deductions Breakdown */}
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#ef4444', letterSpacing: '0.5px' }}>Deductions & Taxes</span>
                <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span>PAYE Income Tax</span>
                    <span style={{ fontWeight: '600', color: '#ef4444' }}>- {selectedSlip.tax}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span>Pension Scheme (8%)</span>
                    <span style={{ fontWeight: '600', color: '#ef4444' }}>- {selectedSlip.pension}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '700', borderTop: '1px solid #f3f4f6', paddingTop: '8px', color: '#ef4444' }}>
                    <span>Total Deductions</span>
                    <span>- ₦210,000.00</span>
                  </div>
                </div>
              </div>

              {/* Net Payout Banner */}
              <div style={{ padding: '16px', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#16a34a', textTransform: 'uppercase' }}>Net Direct Deposit</span>
                  <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#4b5563' }}>Paid to {selectedSlip.account}</p>
                </div>
                <span style={{ fontSize: '22px', fontWeight: '800', color: '#15803d' }}>{selectedSlip.net}</span>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setSelectedSlip(null)}
                  style={{ padding: '8px 16px', background: 'white', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                >
                  Close
                </button>
                <button
                  onClick={() => handleDownload(selectedSlip.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 20px', background: '#534ab7', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                >
                  <Download size={16} /> Download PDF Slip
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};

export default EmployeePayslipsPage;
