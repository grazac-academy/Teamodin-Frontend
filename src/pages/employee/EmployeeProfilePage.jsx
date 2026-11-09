import { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { User, Phone, MapPin, Building2, CreditCard, Shield, Save } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const EmployeeProfilePage = () => {
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    firstName: user?.first_name || 'Sade',
    lastName: user?.last_name || 'Afolabi',
    email: user?.email || 'sade@acme.com',
    phone: '+234 802 345 6789',
    jobTitle: user?.title || 'Product Designer',
    department: user?.dept || 'Product & Design',
    workLocation: 'Lagos (Hybrid)',
    // Emergency Contact
    emergencyName: 'Tunde Afolabi',
    emergencyRelationship: 'Spouse',
    emergencyPhone: '+234 803 987 6543',
    // Banking
    bankName: 'Stanbic IBTC Bank',
    accountNumber: '0029384892',
    accountName: 'Sade Afolabi',
    tinNumber: 'TIN-2389104-0001',
    // Address
    address: '14 Admiralty Way, Lekki Phase 1',
    city: 'Lagos',
    state: 'Lagos State'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateUser({
      name: `${formData.firstName} ${formData.lastName}`,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      title: formData.jobTitle,
      dept: formData.department
    });
    toast.success('Your profile and payout information have been updated!');
  };

  return (
    <AdminLayout title="My Profile & Settings" subtitle="Manage your personal details, emergency contact, and direct deposit information.">
      <style>
        {`
          .profile-container { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
          .card { background: white; border-radius: 16px; border: 1px solid #f3f4f6; padding: 28px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
          .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
          @media (max-width: 640px) { .form-grid { grid-template-columns: 1fr; } }
          .input-label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; }
          .input-field { width: 100%; padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; outline: none; box-sizing: border-box; }
          .input-field:focus { border-color: #534ab7; }
        `}
      </style>

      <form onSubmit={handleSave} className="profile-container">
        
        {/* Personal Overview Card */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: '#e0e7ff', color: '#534ab7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '700' }}>
              SA
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0' }}>{formData.firstName} {formData.lastName}</h2>
              <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>{formData.jobTitle} · {formData.department}</p>
            </div>
          </div>

          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#111827', margin: '0 0 16px 0' }}>Personal & Contact Details</h3>
          <div className="form-grid">
            <div>
              <label className="input-label">First Name</label>
              <input type="text" name="firstName" className="input-field" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div>
              <label className="input-label">Last Name</label>
              <input type="text" name="lastName" className="input-field" value={formData.lastName} onChange={handleChange} required />
            </div>
            <div>
              <label className="input-label">Work Email</label>
              <input type="email" name="email" className="input-field" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <label className="input-label">Mobile Phone Number</label>
              <input type="text" name="phone" className="input-field" value={formData.phone} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Banking & Payouts */}
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#111827', margin: '0 0 6px 0' }}>Direct Deposit Bank Details</h3>
          <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 16px 0' }}>Used for monthly payroll salary disbursement.</p>

          <div className="form-grid">
            <div>
              <label className="input-label">Bank Name</label>
              <input type="text" name="bankName" className="input-field" value={formData.bankName} onChange={handleChange} />
            </div>
            <div>
              <label className="input-label">Account Number</label>
              <input type="text" name="accountNumber" className="input-field" value={formData.accountNumber} onChange={handleChange} />
            </div>
            <div>
              <label className="input-label">Account Name (Must match legal ID)</label>
              <input type="text" name="accountName" className="input-field" value={formData.accountName} onChange={handleChange} />
            </div>
            <div>
              <label className="input-label">Tax Identification Number (TIN)</label>
              <input type="text" name="tinNumber" className="input-field" value={formData.tinNumber} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#111827', margin: '0 0 6px 0' }}>Emergency Contact</h3>
          <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 16px 0' }}>Designate someone to contact in case of emergency.</p>

          <div className="form-grid">
            <div>
              <label className="input-label">Contact Name</label>
              <input type="text" name="emergencyName" className="input-field" value={formData.emergencyName} onChange={handleChange} />
            </div>
            <div>
              <label className="input-label">Relationship</label>
              <input type="text" name="emergencyRelationship" className="input-field" value={formData.emergencyRelationship} onChange={handleChange} />
            </div>
            <div>
              <label className="input-label">Contact Phone</label>
              <input type="text" name="emergencyPhone" className="input-field" value={formData.emergencyPhone} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Residential Address */}
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#111827', margin: '0 0 16px 0' }}>Residential Address</h3>
          <div className="form-grid">
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="input-label">Street Address</label>
              <input type="text" name="address" className="input-field" value={formData.address} onChange={handleChange} />
            </div>
            <div>
              <label className="input-label">City</label>
              <input type="text" name="city" className="input-field" value={formData.city} onChange={handleChange} />
            </div>
            <div>
              <label className="input-label">State</label>
              <input type="text" name="state" className="input-field" value={formData.state} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Save CTA */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '32px' }}>
          <button
            type="submit"
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 28px',
              background: '#534ab7', color: 'white', border: 'none', borderRadius: '10px',
              fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <Save size={16} /> Save Changes
          </button>
        </div>

      </form>
    </AdminLayout>
  );
};

export default EmployeeProfilePage;
