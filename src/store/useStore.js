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

export const useStore = create((set) => ({
  employees: initialEmployees,
  pendingInvites: initialPendingInvites,
  
  // Actions
  addEmployee: (employee) => set((state) => ({ 
    employees: [employee, ...state.employees] 
  })),
  
  updateEmployeeStatus: (id, status, statusBg, statusColor) => set((state) => ({
    employees: state.employees.map(emp => 
      emp.id === id ? { ...emp, status, statusBg, statusColor } : emp
    )
  })),

  addInvite: (invite) => set((state) => ({
    pendingInvites: [invite, ...state.pendingInvites]
  })),

  revokeInvite: (id) => set((state) => ({
    pendingInvites: state.pendingInvites.filter(invite => invite.id !== id)
  })),
  
  // Replace all employees (e.g. bulk CSV import)
  setEmployees: (newEmployees) => set({ employees: newEmployees })
}));
