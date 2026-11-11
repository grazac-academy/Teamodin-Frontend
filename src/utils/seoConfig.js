/**
 * SEO & Metadata configuration dictionary for all routes across HRStack.
 * Provides custom, human-crafted titles, meta descriptions, keywords, robots directives,
 * and OpenGraph metadata for every individual screen.
 */

export const DEFAULT_SEO = {
  title: 'HRStack | Modern People Ops for African SMBs',
  description: 'HRStack is an all-in-one People Operations platform tailored for African SMBs. Streamline employee directory, leave management, onboarding, payslips, and check-ins.',
  keywords: 'HR, HRStack, People Operations, African SMBs, Nigeria HR Software, Employee Directory, Leave Management, Onboarding, Payroll',
  ogType: 'website',
  ogImage: '/favicon.svg',
  noindex: false,
};

export const ROUTE_SEO_MAP = {
  // -------------------------------------------------------------
  // Public Marketing & Onboarding Routes (Indexed by Search Engines)
  // -------------------------------------------------------------
  '/': {
    title: 'HRStack — The Modern HR Operating System Built for African SMBs',
    description: 'Replace messy spreadsheets and WhatsApp chats. HRStack brings employee directories, leave approvals, onboarding, payslips, and culture check-ins into one fast platform.',
    keywords: 'HR software Africa, People Ops platform, Nigerian HR software, employee management system, SMB HR tool, Grazac, Team Odin',
    canonical: '/',
    ogType: 'website',
    noindex: false,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'HRStack',
      'applicationCategory': 'BusinessApplication',
      'operatingSystem': 'Web',
      'description': 'Modern People Operations platform tailored for African SMBs.',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD',
      },
      'creator': {
        '@type': 'Organization',
        'name': 'Team Odin at Grazac',
      },
    },
  },

  '/sign-in': {
    title: 'Sign In to Your Workspace',
    description: 'Access your HRStack company portal. Log in to manage employees, review leave requests, view payslips, or clock in.',
    keywords: 'HRStack login, sign in workspace, employee portal login',
    canonical: '/sign-in',
    noindex: false,
  },

  '/sign-up': {
    title: 'Create Your Company Workspace — Start Free',
    description: 'Set up your company workspace in under 2 minutes. Empower your African team with automated onboarding, leave tracking, and structured People Ops.',
    keywords: 'register HRStack, start free HR software, create company workspace',
    canonical: '/sign-up',
    noindex: false,
  },

  '/forgot-password': {
    title: 'Reset Your Password',
    description: 'Enter your registered email address to receive password reset instructions and securely recover your HRStack account.',
    keywords: 'HRStack password reset, recover HR account',
    canonical: '/forgot-password',
    noindex: true,
  },

  '/verify-otp': {
    title: 'Verify Your Email Address',
    description: 'Enter the 6-digit one-time verification code sent to your email to verify your HRStack account.',
    keywords: 'verify OTP, email verification',
    canonical: '/verify-otp',
    noindex: true,
  },

  '/auth/change-password': {
    title: 'Change Account Password',
    description: 'Update your security credentials and set a new password for your HRStack account.',
    noindex: true,
  },

  '/profile/setup': {
    title: 'Complete Your Profile Setup',
    description: 'Finish setting up your personal details, job title, and company preferences on HRStack.',
    noindex: true,
  },

  // -------------------------------------------------------------
  // Shared Admin & Employer Workspace (noindex to protect privacy)
  // -------------------------------------------------------------
  '/admin/dashboard': {
    title: 'Admin Dashboard — Company Overview & Operations',
    description: 'Centralized administrative workspace for Employers and Admins. Track headcount, pending leave approvals, onboarding rates, and department growth.',
    keywords: 'HR admin dashboard, company overview, employee operations',
    noindex: true,
  },

  '/admin/employees': {
    title: 'Employee Directory & Team Management',
    description: 'Search, filter, and manage all active, probation, and remote employees in your organization.',
    keywords: 'employee directory, team records, staff roster',
    noindex: true,
  },

  '/admin/employees/invite': {
    title: 'Invite Teammate & Assign Roles',
    description: 'Invite new teammates into your workspace via email and appoint them to Admin or Employee self-service roles.',
    keywords: 'invite employee, add team member, appoint admin',
    noindex: true,
  },

  '/admin/departments': {
    title: 'Departments & Organizational Structure',
    description: 'Manage departmental divisions, assign department leads, view team headcounts, and allocate departmental budgets.',
    keywords: 'company departments, organizational structure, team divisions',
    noindex: true,
  },

  '/admin/leave': {
    title: 'Leave & Time Off Management',
    description: 'Review company-wide leave applications, track employee time-off balances, and plan with the interactive team calendar.',
    keywords: 'leave management, holiday requests, employee time off',
    noindex: true,
  },

  '/admin/onboarding': {
    title: 'New Hire Onboarding Workflows',
    description: 'Monitor onboarding milestones, track task completion percentages, and send automated nudges to new hires.',
    keywords: 'employee onboarding, new hire checklist, trial period tracking',
    noindex: true,
  },

  '/admin/offboarding': {
    title: 'Employee Offboarding & Asset Recovery',
    description: 'Manage dignified, compliant employee exit workflows, retrieve company hardware assets, and revoke system access.',
    keywords: 'employee exit, offboarding, asset retrieval',
    noindex: true,
  },

  '/admin/documents': {
    title: 'Company Documents & Policy Vault',
    description: 'Store employee handbooks, compliance policies, code of conduct, and monitor digital acknowledgement rates.',
    keywords: 'HR documents, company policies, handbook compliance',
    noindex: true,
  },

  '/admin/check-ins': {
    title: 'Quarterly Performance Check-Ins',
    description: 'Launch quarterly feedback cycles, review employee self-assessments, and track goal completions across departments.',
    keywords: 'performance reviews, 1-on-1 check-ins, employee appraisals',
    noindex: true,
  },

  '/admin/surveys': {
    title: 'Employee Pulse Surveys & eNPS Analytics',
    description: 'Gather continuous anonymous sentiment, measure Employee Net Promoter Scores (eNPS), and analyze team satisfaction.',
    keywords: 'eNPS surveys, employee pulse, workplace sentiment',
    noindex: true,
  },

  '/admin/analytics': {
    title: 'People Analytics & Growth Metrics',
    description: 'Visual analytics on headcount growth, attrition rates, leave utilization, and departmental distributions.',
    keywords: 'HR analytics, people metrics, attrition charts, employee data',
    noindex: true,
  },

  '/admin/payroll': {
    title: 'Payroll Summary & Statutory Remittances',
    description: 'Review monthly gross-to-net payroll calculations, PAYE tax, pension statutory deductions, and export payment batch files.',
    keywords: 'payroll summary, PAYE deductions, Nigerian pension remittance',
    noindex: true,
  },

  '/admin/settings': {
    title: 'General Workspace Settings',
    description: 'Configure company branding, workspace URL, business address, currency, and regional timezone preferences.',
    keywords: 'company settings, workspace configuration',
    noindex: true,
  },

  '/admin/settings/security': {
    title: 'Security & Access Controls',
    description: 'Manage two-factor authentication (2FA), session timeout rules, IP whitelisting, and workspace security protocols.',
    keywords: 'security settings, 2FA, access controls',
    noindex: true,
  },

  '/admin/settings/billing': {
    title: 'Billing & Subscription Plan',
    description: 'View active workspace subscription plan, invoice receipts, seats usage, and upgrade billing tier.',
    keywords: 'billing settings, subscription plan, invoices',
    noindex: true,
  },

  '/admin/settings/notifications': {
    title: 'Notification Preferences',
    description: 'Configure automated email and in-app alerts for leave submissions, onboarding reminders, and weekly summaries.',
    keywords: 'notification settings, email alerts',
    noindex: true,
  },

  // -------------------------------------------------------------
  // Manager Portal Routes
  // -------------------------------------------------------------
  '/manager/dashboard': {
    title: 'Manager Dashboard — Team Overview',
    description: 'Manager portal for overseeing direct reports, expediting team leave requests, and reviewing 1-on-1 progress.',
    noindex: true,
  },

  '/manager/team': {
    title: 'Direct Reports & Team Roster',
    description: 'View assigned team members, schedule 1-on-1 discussions, and log private meeting notes.',
    noindex: true,
  },

  '/manager/leave': {
    title: 'Team Leave Approvals',
    description: 'Review, approve, or provide feedback on time-off applications submitted by your direct reports.',
    noindex: true,
  },

  '/manager/reviews': {
    title: 'Team Performance Reviews & Evaluations',
    description: 'Submit quarterly manager ratings and qualitative performance evaluations for your team.',
    noindex: true,
  },

  '/manager/onboarding': {
    title: 'Team Onboarding Progress',
    description: 'Track probation checklist milestones and guide new department joiners through their first 90 days.',
    noindex: true,
  },

  // -------------------------------------------------------------
  // Employee Self-Service Routes
  // -------------------------------------------------------------
  '/employee/dashboard': {
    title: 'My Employee Workspace & Clock-In',
    description: 'Personal self-service dashboard: clock in/out for daily attendance, view remaining leave balance, and check assigned tasks.',
    noindex: true,
  },

  '/employee/leave': {
    title: 'My Time Off & Leave Applications',
    description: 'Submit vacation, sick, or casual leave requests and track real-time approval status from your employer.',
    noindex: true,
  },

  '/employee/tasks': {
    title: 'My Onboarding Checklist & Tasks',
    description: 'View and complete your trial period milestones, document uploads, and company setup tasks.',
    noindex: true,
  },

  '/employee/payslips': {
    title: 'My Payslips & Compensation Slips',
    description: 'Access monthly salary payment summaries, tax deductions breakdown, and download official PDF payslips.',
    noindex: true,
  },

  '/employee/documents': {
    title: 'Company Policies & Signed Agreements',
    description: 'Read and digitally sign official company handbooks, compliance guidelines, and code of conduct.',
    noindex: true,
  },

  '/employee/reviews': {
    title: 'My Performance Self-Assessment',
    description: 'Complete quarterly self-evaluations, document personal accomplishments, and align on upcoming goals.',
    noindex: true,
  },

  '/employee/directory': {
    title: 'Company Team Directory',
    description: 'Look up coworker contact details, job titles, and departmental teams across the company.',
    noindex: true,
  },

  '/employee/profile': {
    title: 'My Personal Profile & Details',
    description: 'Update your emergency contacts, residential address, bank payment details, and bio information.',
    noindex: true,
  },
};

/**
 * Resolves SEO metadata for a given path, handling dynamic route patterns
 * (e.g., `/admin/employees/42` or `/invite/abc123token`).
 *
 * @param {string} pathname - Current window pathname
 * @returns {Object} SEO metadata object
 */
export function getSEOForPath(pathname) {
  // 1. Direct exact match
  if (ROUTE_SEO_MAP[pathname]) {
    return ROUTE_SEO_MAP[pathname];
  }

  // 2. Dynamic matching: Employee detail page (/admin/employees/:id)
  if (/^\/admin\/employees\/[^/]+$/.test(pathname)) {
    return {
      title: 'Employee File & Records',
      description: 'Complete employee dossier including profile details, leave balance history, performance appraisals, and assigned company assets.',
      keywords: 'employee details, personnel file, staff record',
      noindex: true,
    };
  }

  // 3. Dynamic matching: Invite onboarding (/invite/:token)
  if (/^\/invite\/[^/]+$/.test(pathname)) {
    return {
      title: 'Join Your Team Workspace — Complete Onboarding',
      description: 'Accept your invitation to join HRStack. Set your account password and access your new company workspace.',
      keywords: 'accept invite, join team, employee onboarding',
      noindex: true,
    };
  }

  // 4. Fallback to default
  return DEFAULT_SEO;
}
