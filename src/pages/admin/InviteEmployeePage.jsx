import { useState } from 'react';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/layout/AdminLayout';

import { 
  
  Info, 
  Clock,
  RotateCw,
  XCircle,
  Building2,
  Briefcase,
  User,
  ShieldAlert
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';

const InviteEmployeePage = () => {
  const { pendingInvites, addInvite, revokeInvite } = useStore();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    department: '',
    manager: '',
    role: 'employee'
  });


  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (role) => {
    setFormData(prev => ({ ...prev, role }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newInvite = {
        id: Date.now(),
        name: formData.firstName || formData.email.split('@')[0],
        email: formData.email,
        department: formData.department || 'Unassigned',
        role: formData.role.charAt(0).toUpperCase() + formData.role.slice(1),
        invitedDaysAgo: 0
      };
      addInvite(newInvite);
      setFormData({ firstName: '', lastName: '', email: '', jobTitle: '', department: '', manager: '', role: 'employee' });
      setIsSubmitting(false);
      toast.success(`Invite sent to ${newInvite.email}`);
    }, 1000);
  };

  const handleRevoke = (id) => {
    revokeInvite(id);
    toast.success('Invite revoked');
  };

  const roles = [
    {
      id: 'admin', title: 'Admin', description: 'Full workspace access — can invite others, manage settings and data',
      color: '#faf5ff', borderColor: '#e9d5ff', activeBorder: '#9333ea', icon: ShieldAlert
    },
    {
      id: 'manager', title: 'Manager', description: 'Approves leave, views direct reports, runs check-ins',
      color: '#f0fdf4', borderColor: '#bbf7d0', activeBorder: '#16a34a', icon: Briefcase
    },
    {
      id: 'employee', title: 'Employee', description: 'Submits leave, completes tasks, views their own profile',
      color: '#fff7ed', borderColor: '#fed7aa', activeBorder: '#f97316', icon: User
    }
  ];

  const titleTabs = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginTop: '8px' }}>
      <Link to="/admin/employees" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', textDecoration: 'none', borderBottom: '2px solid transparent', paddingBottom: '4px', fontWeight: '500', fontSize: '18px' }}>
        People 
      </Link>
      <Link to="/admin/employees/invite" style={{ color: '#111827', textDecoration: 'none', borderBottom: '2px solid #111827', paddingBottom: '4px', fontWeight: '700', fontSize: '18px' }}>
        Invite teammate
      </Link>
    </div>
  );

  return (
    <AdminLayout title={titleTabs} subtitle="Set their role here — they won't be able to choose it themselves.">
      <style>
        {`
          .card { background: white; padding: 24px; border-radius: 12px; border: 1px solid #f3f4f6; }
          .input-field { width: 100%; padding: 10px 16px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; outline: none; margin-top: 6px; box-sizing: border-box; }
          .input-field:focus { border-color: #534ab7; }
          .form-label { font-size: 13px; font-weight: 500; color: #374151; }
          .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
          .role-card { display: flex; align-items: flex-start; padding: 16px; border: 1px solid #e5e7eb; border-radius: 12px; cursor: pointer; transition: all 0.2s; margin-bottom: 12px; background: white; }
          .role-card:hover { border-color: #d1d5db; }
          .split-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 32px; align-items: start; }
          @media (max-width: 1024px) { .split-layout { grid-template-columns: 1fr; } .grid-2 { grid-template-columns: 1fr; } }
          
          .info-banner { background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 16px; display: flex; align-items: flex-start; gap: 12px; margin-bottom: 32px; }
          .preview-card { background-color: #312e81; border-radius: 16px; padding: 24px; color: white; position: sticky; top: 24px; overflow: hidden; }
        `}
      </style>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        <div className="info-banner">
          <Info size={20} color="#3b82f6" style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ fontSize: '14px', color: '#1d4ed8', margin: 0, lineHeight: '1.5' }}>
            Only Admins can create new accounts. Invitees receive an email link, set a password, and land directly in the role and department you assign — no self sign-up, no role picker on their end.
          </p>
        </div>

        <div className="split-layout">
          
          {/* Form Area */}
          <div className="card">
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 24px 0' }}>Invite details</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid-2" style={{ marginBottom: '16px' }}>
                <div>
                  <label className="form-label">First name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="e.g. Tunde" className="input-field" />
                </div>
                <div>
                  <label className="form-label">Last name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="e.g. Adeyemi" className="input-field" />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label className="form-label">Work email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="tunde@acme.com" className="input-field" required />
                <p style={{ fontSize: '12px', color: '#6b7280', margin: '6px 0 0 0' }}>The invite link is sent here and only this address can accept it.</p>
              </div>

              <div className="grid-2" style={{ marginBottom: '16px' }}>
                <div>
                  <label className="form-label">Job title</label>
                  <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="e.g. Sales Associate" className="input-field" />
                </div>
                <div>
                  <label className="form-label">Department</label>
                  <select name="department" value={formData.department} onChange={handleChange} className="input-field" style={{ appearance: 'none', backgroundColor: 'white' }}>
                    <option value="">Select</option>
                    <option value="engineering">Engineering</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label className="form-label">Reports to (manager)</label>
                <select name="manager" value={formData.manager} onChange={handleChange} className="input-field" style={{ appearance: 'none', backgroundColor: 'white' }}>
                  <option value="">No manager / reports to you</option>
                  <option value="amaka">Amaka Okonkwo</option>
                  <option value="sarah">Sarah Jenkins</option>
                </select>
              </div>

              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: '0 0 12px 0' }}>Role</h3>
              <div style={{ marginBottom: '32px' }}>
                {roles.map((r) => {
                  const isSelected = formData.role === r.id;
                  return (
                    <div 
                      key={r.id} 
                      className="role-card"
                      style={{ 
                        borderColor: isSelected ? r.activeBorder : '#e5e7eb',
                        backgroundColor: isSelected ? r.color : 'white',
                      }}
                      onClick={() => handleRoleChange(r.id)}
                    >
                      <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: isSelected ? 'rgba(255,255,255,0.6)' : '#f9fafb', marginRight: '12px' }}>
                        <r.icon size={20} color={isSelected ? r.activeBorder : '#9ca3af'} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '14px', fontWeight: '500', color: isSelected ? '#111827' : '#374151', margin: '0 0 4px 0' }}>{r.title}</p>
                        <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{r.description}</p>
                      </div>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${isSelected ? r.activeBorder : '#d1d5db'}`, backgroundColor: isSelected ? r.activeBorder : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '16px', flexShrink: 0 }}>
                        {isSelected && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'white' }}></div>}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ paddingTop: '24px', borderTop: '1px solid #f3f4f6', display: 'flex', gap: '12px' }}>
                <button type="submit" disabled={isSubmitting} style={{ padding: '10px 24px', backgroundColor: isSubmitting ? '#9ca3af' : '#534ab7', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
                  {isSubmitting ? 'Sending...' : 'Send invite'}
                </button>
                <button type="button" style={{ padding: '10px 24px', backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* Right Panel - Preview */}
          <div className="preview-card">
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', filter: 'blur(20px)' }}></div>
            
            <p style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '1px', color: '#a5b4fc', textTransform: 'uppercase', marginBottom: '24px' }}>Invite Preview</p>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', wordBreak: 'break-all', margin: '0 0 4px 0' }}>
                {formData.email || 'teammate@acme.com'}
              </h3>
              <p style={{ fontSize: '14px', color: '#a5b4fc', margin: '0 0 16px 0' }}>
                {formData.jobTitle || 'Job title not set'}
              </p>
              
              <div style={{ display: 'inline-flex', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '500', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', textTransform: 'capitalize' }}>
                {formData.role}
              </div>

              <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: '#e0e7ff' }}>
                  <Building2 size={16} color="rgba(255,255,255,0.7)" style={{ marginRight: '12px' }} />
                  {formData.department ? <span style={{ textTransform: 'capitalize' }}>{formData.department}</span> : 'Department not set'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: '#e0e7ff' }}>
                  <User size={16} color="rgba(255,255,255,0.7)" style={{ marginRight: '12px' }} />
                  {formData.manager ? <span style={{ textTransform: 'capitalize' }}>{formData.manager}</span> : 'No manager assigned'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: '#e0e7ff' }}>
                  <Clock size={16} color="rgba(255,255,255,0.7)" style={{ marginRight: '12px' }} />
                  Link expires in 7 days
                </div>
              </div>

              <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px' }}>
                  <p style={{ fontSize: '11px', color: '#a5b4fc', margin: '0 0 4px 0' }}>Invite link (sent by email)</p>
                  <p style={{ fontSize: '12px', color: '#e0e7ff', fontFamily: 'monospace', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    app.hrstack.com/invite/1jf2a91c4
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Invites */}
        <div className="card" style={{ marginTop: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>Pending invites:</h2>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>awaiting response</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {pendingInvites.length === 0 ? (
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>No pending invites.</p>
            ) : (
              pendingInvites.map((invite) => (
                <div key={invite.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid #f3f4f6', borderRadius: '12px', transition: 'all 0.2s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', fontWeight: '500', textTransform: 'capitalize' }}>
                      {invite.name[0]}
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827', margin: '0 0 2px 0' }}>{invite.email}</p>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                        <span style={{ textTransform: 'capitalize' }}>{invite.department}</span> · {invite.role} · Invited {invite.invitedDaysAgo} {invite.invitedDaysAgo === 1 ? 'day' : 'days'} ago
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '500', backgroundColor: '#fff7ed', color: '#c2410c', border: '1px solid #ffedd5' }}>
                      Pending
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid #e5e7eb', paddingLeft: '16px' }}>
                      <button style={{ fontSize: '12px', fontWeight: '500', color: '#534ab7', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <RotateCw size={14} /> Resend
                      </button>
                      <button onClick={() => handleRevoke(invite.id)} style={{ fontSize: '12px', fontWeight: '500', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <XCircle size={14} /> Revoke
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default InviteEmployeePage;
