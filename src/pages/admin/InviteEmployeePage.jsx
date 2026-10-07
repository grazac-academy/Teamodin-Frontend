import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Info, 
  Mail, 
  Copy,
  Clock,
  RotateCw,
  XCircle,
  Building2,
  Briefcase,
  User,
  ShieldAlert,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';

const InviteEmployeePage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    department: '',
    manager: '',
    role: 'employee'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (role) => {
    setFormData(prev => ({ ...prev, role }));
  };

  const roles = [
    {
      id: 'admin',
      title: 'Admin',
      description: 'Full workspace access — can invite others, manage settings and data',
      color: 'bg-purple-50 border-purple-200',
      activeColor: 'border-purple-600 bg-purple-50',
      icon: ShieldAlert
    },
    {
      id: 'manager',
      title: 'Manager',
      description: 'Approves leave, views direct reports, runs check-ins',
      color: 'bg-green-50 border-green-200',
      activeColor: 'border-green-600 bg-green-50',
      icon: Briefcase
    },
    {
      id: 'employee',
      title: 'Employee',
      description: 'Submits leave, completes tasks, views their own profile',
      color: 'bg-orange-50 border-orange-200',
      activeColor: 'border-orange-500 bg-orange-50',
      icon: User
    }
  ];

  const pendingInvites = [
    {
      id: 1,
      name: 'funke',
      email: 'funke@acme.com',
      department: 'Marketing',
      role: 'Employee',
      invitedDaysAgo: 2,
    },
    {
      id: 2,
      name: 'ife',
      email: 'ife@acme.com',
      department: 'Engineering',
      role: 'Manager',
      invitedDaysAgo: 5,
    },
    {
      id: 3,
      name: 'segun',
      email: 'segun@acme.com',
      department: 'Sales',
      role: 'Employee',
      invitedDaysAgo: 1,
    }
  ];

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex items-center text-sm text-gray-500 space-x-2">
          <span>People</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Invite teammate</span>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Invite a teammate</h1>
          <p className="text-gray-500 mt-1">Set their role here — they won't be able to choose it themselves.</p>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start space-x-3 mb-8">
          <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700 leading-relaxed">
            Only Admins can create new accounts. Invitees receive an email link, set a password, and land directly in the role and department you assign — no self sign-up, no role picker on their end.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Area */}
          <div className="lg:col-span-2 space-y-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Invite details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="e.g. Tunde"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="e.g. Adeyemi"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Work email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tunde@acme.com"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1.5">The invite link is sent here and only this address can accept it.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job title</label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder="e.g. Sales Associate"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-white transition-colors"
                  >
                    <option value="">Select</option>
                    <option value="engineering">Engineering</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                  </select>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-1">Reports to (manager)</label>
                <select
                  name="manager"
                  value={formData.manager}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-white transition-colors"
                >
                  <option value="">No manager / reports to you</option>
                  <option value="amaka">Amaka Okonkwo</option>
                  <option value="sarah">Sarah Jenkins</option>
                </select>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Role</h3>
              <div className="space-y-3">
                {roles.map((r) => {
                  const isSelected = formData.role === r.id;
                  return (
                    <div 
                      key={r.id}
                      onClick={() => handleRoleChange(r.id)}
                      className={`relative flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                        isSelected 
                          ? r.activeColor + ' shadow-sm' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex-1 flex items-start">
                        <div className={`p-2 rounded-lg mr-3 ${isSelected ? 'bg-white/60' : 'bg-gray-50'}`}>
                          <r.icon className={`w-5 h-5 ${isSelected ? (r.id === 'employee' ? 'text-orange-600' : r.id === 'manager' ? 'text-green-600' : 'text-purple-600') : 'text-gray-400'}`} />
                        </div>
                        <div>
                          <p className={`font-medium text-sm ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                            {r.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {r.description}
                          </p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ml-4 ${
                        isSelected 
                          ? (r.id === 'employee' ? 'border-orange-500 bg-orange-500' : r.id === 'manager' ? 'border-green-500 bg-green-500' : 'border-purple-600 bg-purple-600')
                          : 'border-gray-300'
                      }`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 flex items-center space-x-3 border-t border-gray-100">
              <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-sm">
                Send invite
              </button>
              <button className="px-6 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                Cancel
              </button>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-1">
            <div className="bg-primary-900 rounded-2xl p-6 text-white relative overflow-hidden sticky top-24 shadow-lg">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-white/10 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-primary-500/20 blur-2xl"></div>
              
              <p className="text-xs font-semibold tracking-wider text-primary-200 uppercase mb-8 relative z-10">
                Invite Preview
              </p>

              <div className="relative z-10 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold break-all">
                    {formData.email || 'teammate@acme.com'}
                  </h3>
                  <p className="text-primary-200 text-sm mt-1">
                    {formData.jobTitle || 'Job title not set'}
                  </p>
                  
                  <div className="mt-3 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-white border border-white/20 capitalize">
                    {formData.role}
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-white/10">
                  <div className="flex items-center text-sm text-primary-100">
                    <Building2 className="w-4 h-4 mr-3 opacity-70" />
                    {formData.department ? <span className="capitalize">{formData.department}</span> : 'Department not set'}
                  </div>
                  <div className="flex items-center text-sm text-primary-100">
                    <User className="w-4 h-4 mr-3 opacity-70" />
                    {formData.manager ? <span className="capitalize">{formData.manager}</span> : 'No manager assigned'}
                  </div>
                  <div className="flex items-center text-sm text-primary-100">
                    <Clock className="w-4 h-4 mr-3 opacity-70" />
                    Link expires in 7 days
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-xs text-primary-200 mb-1">Invite link (sent by email)</p>
                    <p className="text-xs text-primary-100 font-mono truncate">
                      app.hrstack.com/invite/1jf2a91c4
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Invites */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mt-8">
          <div className="flex items-center space-x-2 mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Pending invites:</h2>
            <span className="text-sm text-gray-500">awaiting response</span>
          </div>

          <div className="space-y-4">
            {pendingInvites.map((invite) => (
              <div key={invite.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-medium capitalize">
                    {invite.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{invite.email}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {invite.department} · {invite.role} · Invited {invite.invitedDaysAgo} {invite.invitedDaysAgo === 1 ? 'day' : 'days'} ago
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-orange-50 text-orange-700 border border-orange-100">
                    Pending
                  </span>
                  <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
                    <button className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors flex items-center">
                      <RotateCw className="w-3.5 h-3.5 mr-1" />
                      Resend
                    </button>
                    <button className="text-xs font-medium text-red-600 hover:text-red-700 transition-colors flex items-center">
                      <XCircle className="w-3.5 h-3.5 mr-1" />
                      Revoke
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default InviteEmployeePage;
