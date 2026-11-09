import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import { CreditCard, Check, ArrowUpRight, Download, ShieldCheck, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const BillingSettingsPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // monthly or annual
  const [isUpdatingCard, setIsUpdatingCard] = useState(false);

  const invoices = [
    { id: 'INV-2026-005', date: '01 May 2026', amount: '$199.00', status: 'Paid', plan: 'Growth Plan (60 Seats)' },
    { id: 'INV-2026-004', date: '01 Apr 2026', amount: '$199.00', status: 'Paid', plan: 'Growth Plan (60 Seats)' },
    { id: 'INV-2026-003', date: '01 Mar 2026', amount: '$199.00', status: 'Paid', plan: 'Growth Plan (60 Seats)' },
    { id: 'INV-2026-002', date: '01 Feb 2026', amount: '$199.00', status: 'Paid', plan: 'Growth Plan (60 Seats)' },
  ];

  const handleDownloadInvoice = (id) => {
    toast.success(`Downloading invoice ${id} PDF...`);
  };

  const handleUpdatePayment = () => {
    toast.success('Payment details updated!');
    setIsUpdatingCard(false);
  };

  return (
    <AdminLayout title="Settings">
      <style>
        {`
          .settings-container { max-width: 960px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; width: 100%; box-sizing: border-box; }
          .settings-tabs { display: flex; gap: 20px; border-bottom: 1px solid #e5e7eb; overflow-x: auto; -webkit-overflow-scrolling: touch; padding-bottom: 4px; }
          .settings-tabs::-webkit-scrollbar { height: 4px; }
          .settings-tabs::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
          .settings-tab { padding: 10px 0; color: #6b7280; font-size: 14px; font-weight: 500; text-decoration: none; border-bottom: 2px solid transparent; transition: all 0.2s; white-space: nowrap; flex-shrink: 0; }
          .settings-tab:hover { color: #374151; }
          .settings-tab.active { color: #534ab7; border-bottom-color: #534ab7; font-weight: 600; }
          .card-section { background: white; padding: 24px; border-radius: 12px; border: 1px solid #f3f4f6; box-shadow: 0 1px 3px rgba(0,0,0,0.05); box-sizing: border-box; }
          @media (max-width: 640px) {
            .card-section { padding: 16px; }
            .settings-tabs { gap: 16px; margin-bottom: 16px; }
            .settings-tab { font-size: 13px; }
          }
          .card-title { font-size: 16px; font-weight: 600; margin: 0 0 6px 0; color: #111827; }
          .card-desc { font-size: 13px; color: #6b7280; margin: 0 0 20px 0; }
          .plan-badge { background: #e0e7ff; color: #4338ca; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 700; }
          .inv-table { width: 100%; min-width: 520px; border-collapse: collapse; font-size: 13px; text-align: left; }
          .inv-table th { padding: 10px 12px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600; white-space: nowrap; }
          .inv-table td { padding: 14px 12px; border-bottom: 1px solid #f9fafb; color: #374151; white-space: nowrap; }
        `}
      </style>

      <div className="settings-container">
        
        {/* Navigation Tabs */}
        <div className="settings-tabs">
          <Link to="/admin/settings" className="settings-tab">General settings</Link>
          <Link to="/admin/settings/security" className="settings-tab">Security</Link>
          <Link to="/admin/settings/billing" className="settings-tab active">Billing & Plan</Link>
          <Link to="/admin/settings/notifications" className="settings-tab">Notifications</Link>
        </div>

        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px', color: '#111827' }}>Billing & Subscription</h1>
          <p style={{ color: '#6b7280', marginBottom: '24px', fontSize: '14px' }}>Manage your workspace plan, active seats, payment method, and invoices.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Current Plan Overview */}
            <div className="card-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <h2 className="card-title" style={{ margin: 0, fontSize: '18px' }}>Growth Plan</h2>
                    <span className="plan-badge">Active</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>
                    Full suite: Employee Directory, Leave Management, Performance Check-ins, Pulse Surveys.
                  </p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>
                    $199 <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '400' }}>/ month</span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '600' }}>Next renewal: 1 Jun 2026</span>
                </div>
              </div>

              {/* Seats Usage */}
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '600', color: '#111827' }}>Seats Utilized</span>
                  <span style={{ fontWeight: '600', color: '#534ab7' }}>48 of 60 seats used (80%)</span>
                </div>
                <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '80%', background: '#534ab7', borderRadius: '4px' }} />
                </div>
                <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#6b7280' }}>
                  Need more seats? Additional seats are $3.50/seat/month.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{ padding: '8px 16px', background: '#534ab7', color: 'white', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                  Upgrade Plan
                </button>
                <button style={{ padding: '8px 16px', background: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                  Add Seats
                </button>
              </div>
            </div>

            {/* Payment Method */}
            <div className="card-section">
              <h2 className="card-title">Payment Method</h2>
              <p className="card-desc">Your card is automatically billed every month.</p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px', background: '#fafafa', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '48px', height: '32px', background: '#1e293b', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#111827' }}>Mastercard ending in 4242</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Expires 12 / 2028 · Primary card</p>
                  </div>
                </div>

                <button 
                  onClick={() => setIsUpdatingCard(!isUpdatingCard)}
                  style={{ padding: '8px 14px', background: 'white', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', fontWeight: '600', color: '#374151', cursor: 'pointer' }}
                >
                  Update Card
                </button>
              </div>

              {isUpdatingCard && (
                <div style={{ marginTop: '16px', padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>Enter New Card Details</h4>
                  <input type="text" placeholder="Card Number (4242 ...)" style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <input type="text" placeholder="MM/YY" style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                    <input type="text" placeholder="CVC" style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                  </div>
                  <button 
                    onClick={handleUpdatePayment}
                    style={{ padding: '8px 16px', background: '#534ab7', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', alignSelf: 'flex-start', cursor: 'pointer' }}
                  >
                    Save Card
                  </button>
                </div>
              )}
            </div>

            {/* Invoices */}
            <div className="card-section">
              <h2 className="card-title">Billing & Invoice History</h2>
              <p className="card-desc">Download past receipts and invoices for your accounting records.</p>

              <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table className="inv-table">
                  <thead>
                    <tr>
                      <th>Invoice Number</th>
                      <th>Date</th>
                      <th>Plan Description</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((inv) => (
                      <tr key={inv.id}>
                        <td style={{ fontWeight: '600', color: '#111827' }}>{inv.id}</td>
                        <td>{inv.date}</td>
                        <td>{inv.plan}</td>
                        <td style={{ fontWeight: '600' }}>{inv.amount}</td>
                        <td>
                          <span style={{ background: '#d1fae5', color: '#047857', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600' }}>
                            {inv.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button 
                            onClick={() => handleDownloadInvoice(inv.id)}
                            style={{ background: 'none', border: 'none', color: '#534ab7', cursor: 'pointer', fontWeight: '600', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Download size={13} /> PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default BillingSettingsPage;
