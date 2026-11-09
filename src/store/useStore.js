import { create } from 'zustand';

// Initial Mock Data
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
  },
];

const initialPendingInvites = [
  { id: 1, name: 'funke', email: 'funke@acme.com', department: 'Marketing', role: 'Employee', invitedDaysAgo: 2 },
  { id: 2, name: 'ife', email: 'ife@acme.com', department: 'Engineering', role: 'Manager', invitedDaysAgo: 5 },
  { id: 3, name: 'segun', email: 'segun@acme.com', department: 'Sales', role: 'Employee', invitedDaysAgo: 1 }
];

const initialDepartments = [
  { id: 1, name: 'Engineering', code: 'ENG', lead: 'David Bello', leadInitials: 'DB', headcount: 48, openRoles: 3, budget: '$120,000/mo', description: 'Core product engineering, infrastructure, security, and developer tooling.' },
  { id: 2, name: 'Product & Design', code: 'PROD', lead: 'Jane Doe', leadInitials: 'JD', headcount: 22, openRoles: 2, budget: '$65,000/mo', description: 'Product management, user experience design, and customer research.' },
  { id: 3, name: 'Sales & Revenue', code: 'SALES', lead: 'Tolu Fashola', leadInitials: 'TF', headcount: 31, openRoles: 4, budget: '$80,000/mo', description: 'Enterprise sales, account executives, business development, and partnerships.' },
  { id: 4, name: 'Operations & People', code: 'OPS', lead: 'Amaka Okonkwo', leadInitials: 'AO', headcount: 19, openRoles: 1, budget: '$45,000/mo', description: 'People operations, recruitment, workplace management, and compliance.' },
  { id: 5, name: 'Finance & Legal', code: 'FIN', lead: 'Sarah CFO', leadInitials: 'SC', headcount: 12, openRoles: 0, budget: '$35,000/mo', description: 'Financial planning, accounting, treasury, audits, and legal counsel.' },
  { id: 6, name: 'Marketing & Brand', code: 'MKT', lead: 'Funke Davies', leadInitials: 'FD', headcount: 10, openRoles: 1, budget: '$30,000/mo', description: 'Growth marketing, brand narrative, content, and public relations.' },
];

const initialLeaveRequests = [
  { id: 1, employeeId: 1, employeeName: 'Kunle Obi', initials: 'KO', avatarColor: '#e0e7ff', avatarText: '#534ab7', dept: 'Engineering', type: 'Annual leave', startDate: '26 May 2026', endDate: '30 May 2026', days: 5, reason: 'Family vacation & recharge', status: 'Pending', submittedAt: 'Yesterday' },
  { id: 2, employeeId: 3, employeeName: 'Tolu Fashola', initials: 'TF', avatarColor: '#ffedd5', avatarText: '#ea580c', dept: 'Sales', type: 'Sick leave', startDate: '21 May 2026', endDate: '21 May 2026', days: 1, reason: 'Medical appointment', status: 'Pending', submittedAt: '2 days ago' },
  { id: 3, employeeId: 4, employeeName: 'Emeka Madu', initials: 'EM', avatarColor: '#dbeafe', avatarText: '#2563eb', dept: 'Engineering', type: 'Annual leave', startDate: '02 Jun 2026', endDate: '06 Jun 2026', days: 5, reason: 'Travel overseas', status: 'Pending', submittedAt: '3 days ago' },
  { id: 4, employeeId: 6, employeeName: 'Remi Kasali', initials: 'RK', avatarColor: '#d1fae5', avatarText: '#047857', dept: 'Finance', type: 'Casual leave', startDate: '15 May 2026', endDate: '16 May 2026', days: 2, reason: 'Personal errands', status: 'Approved', submittedAt: '1 week ago' },
  { id: 5, employeeId: 5, employeeName: 'Chidi Nwosu', initials: 'CN', avatarColor: '#ede9fe', avatarText: '#6d28d9', dept: 'Engineering', type: 'Sick leave', startDate: '10 May 2026', endDate: '11 May 2026', days: 2, reason: 'Flu recovery', status: 'Approved', submittedAt: '2 weeks ago' },
];

const initialDocuments = [
  { id: 1, title: 'Company Employee Handbook 2026', category: 'Policies & Handbooks', format: 'PDF', size: '2.4 MB', targetDept: 'All Staff', uploadedAt: '15 Jan 2026', acknowledgedCount: 138, totalCount: 142, mandatory: true },
  { id: 2, title: 'Standard Employment Agreement & NDA', category: 'Legal & Tax', format: 'PDF', size: '1.1 MB', targetDept: 'All Staff', uploadedAt: '10 Jan 2026', acknowledgedCount: 142, totalCount: 142, mandatory: true },
  { id: 3, title: 'Remote Work & Equipment Stipend Policy', category: 'Policies & Handbooks', format: 'DOCX', size: '540 KB', targetDept: 'All Staff', uploadedAt: '01 Feb 2026', acknowledgedCount: 129, totalCount: 142, mandatory: true },
  { id: 4, title: 'Health Insurance Plan & HMO Providers (AXA Mansard)', category: 'Benefits', format: 'PDF', size: '3.8 MB', targetDept: 'Nigeria (NG)', uploadedAt: '12 Jan 2026', acknowledgedCount: 110, totalCount: 120, mandatory: false },
  { id: 5, title: 'Engineering Onboarding & Code Review Standards', category: 'Templates', format: 'PDF', size: '820 KB', targetDept: 'Engineering', uploadedAt: '20 Mar 2026', acknowledgedCount: 48, totalCount: 48, mandatory: true },
  { id: 6, title: 'Code of Conduct & Anti-Harassment Guidelines', category: 'Policies & Handbooks', format: 'PDF', size: '1.5 MB', targetDept: 'All Staff', uploadedAt: '05 Jan 2026', acknowledgedCount: 141, totalCount: 142, mandatory: true },
];

const initialOffboarding = [
  { id: 1, employeeId: 101, name: 'Kehinde Adeleke', role: 'Frontend Engineer', dept: 'Engineering', lastDay: '31 May 2026', stage: 'Asset Handover', status: 'In Progress', statusColor: '#b45309', statusBg: '#fef3c7', 
    tasks: [
      { id: 't1', title: 'Conduct Exit Interview with HR', done: true },
      { id: 't2', title: 'Knowledge Transfer & Repository Handover', done: true },
      { id: 't3', title: 'Retrieve Laptop, Monitor & Access Pass', done: false },
      { id: 't4', title: 'Deactivate Google Workspace, Slack & GitHub Access', done: false },
      { id: 't5', title: 'Calculate Final Settlement, Leave Encashment & Severance', done: false },
      { id: 't6', title: 'Issue Work Certificate / Reference Letter', done: false },
    ]
  },
  { id: 2, employeeId: 102, name: 'Bimbo Ojo', role: 'Account Executive', dept: 'Sales', lastDay: '15 Jun 2026', stage: 'Notice Period', status: 'Scheduled', statusColor: '#4338ca', statusBg: '#e0e7ff',
    tasks: [
      { id: 't1', title: 'Conduct Exit Interview with HR', done: false },
      { id: 't2', title: 'Client Account Handover to Segun', done: true },
      { id: 't3', title: 'Retrieve Company Phone & Laptop', done: false },
      { id: 't4', title: 'Deactivate CRM & Email Access', done: false },
      { id: 't5', title: 'Calculate Final Commission & Salary', done: false },
      { id: 't6', title: 'Issue Work Certificate / Reference Letter', done: false },
    ]
  }
];

export const useStore = create((set) => ({
  employees: initialEmployees,
  pendingInvites: initialPendingInvites,
  departments: initialDepartments,
  leaveRequests: initialLeaveRequests,
  documents: initialDocuments,
  offboardingList: initialOffboarding,
  
  // Actions - Employees
  addEmployee: (employee) => set((state) => ({ 
    employees: [employee, ...state.employees] 
  })),
  
  updateEmployee: (id, updatedFields) => set((state) => ({
    employees: state.employees.map(emp => 
      emp.id === id ? { ...emp, ...updatedFields } : emp
    )
  })),

  updateEmployeeStatus: (id, status, statusBg, statusColor) => set((state) => ({
    employees: state.employees.map(emp => 
      emp.id === id ? { ...emp, status, statusBg, statusColor } : emp
    )
  })),

  deleteEmployee: (id) => set((state) => ({
    employees: state.employees.filter(emp => emp.id !== id)
  })),

  addInvite: (invite) => set((state) => ({
    pendingInvites: [invite, ...state.pendingInvites]
  })),

  revokeInvite: (id) => set((state) => ({
    pendingInvites: state.pendingInvites.filter(invite => invite.id !== id)
  })),
  
  // Replace all employees (e.g. bulk CSV import)
  setEmployees: (newEmployees) => set({ employees: newEmployees }),

  // Actions - Departments
  addDepartment: (dept) => set((state) => ({
    departments: [dept, ...state.departments]
  })),

  updateDepartment: (id, updatedFields) => set((state) => ({
    departments: state.departments.map(d => d.id === id ? { ...d, ...updatedFields } : d)
  })),

  deleteDepartment: (id) => set((state) => ({
    departments: state.departments.filter(d => d.id !== id)
  })),

  // Actions - Leave Requests
  approveLeaveRequest: (id) => set((state) => ({
    leaveRequests: state.leaveRequests.map(req => 
      req.id === id ? { ...req, status: 'Approved' } : req
    )
  })),

  rejectLeaveRequest: (id, reason) => set((state) => ({
    leaveRequests: state.leaveRequests.map(req => 
      req.id === id ? { ...req, status: 'Rejected', rejectionReason: reason } : req
    )
  })),

  addLeaveRequest: (newRequest) => set((state) => ({
    leaveRequests: [newRequest, ...state.leaveRequests]
  })),

  // Actions - Documents
  addDocument: (doc) => set((state) => ({
    documents: [doc, ...state.documents]
  })),

  deleteDocument: (id) => set((state) => ({
    documents: state.documents.filter(doc => doc.id !== id)
  })),

  acknowledgeDocument: (id) => set((state) => ({
    documents: state.documents.map(doc => 
      doc.id === id ? { ...doc, acknowledgedCount: Math.min(doc.totalCount, doc.acknowledgedCount + 1) } : doc
    )
  })),

  // Actions - Offboarding
  addOffboarding: (entry) => set((state) => ({
    offboardingList: [entry, ...state.offboardingList]
  })),

  toggleOffboardingTask: (offboardingId, taskId) => set((state) => ({
    offboardingList: state.offboardingList.map(item => {
      if (item.id === offboardingId) {
        return {
          ...item,
          tasks: item.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t)
        };
      }
      return item;
    })
  })),
}));

