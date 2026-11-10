<div align="center">
  <div style="background-color: #534ab7; display: inline-block; padding: 12px 18px; border-radius: 12px; margin-bottom: 16px;">
    <h1 style="color: white; margin: 0; font-family: sans-serif; font-size: 28px; letter-spacing: -0.5px;">HRStack</h1>
  </div>
  <h3>Your Modern HR Operating System — Tailored for Scaling African SMBs.</h3>
  <p>Built by <b>Team Odin</b> at Grazac.</p>
</div>

---

## 📖 What is HRStack?

**HRStack** is a full-featured People Operations (People Ops) platform designed specifically for Small and Medium-sized Businesses (SMBs) across Africa.

Most enterprise HR software (like BambooHR or Workday) is prohibitively expensive, bloated with foreign compliance modules, and hard to deploy. Scaling companies hit a wall around 20–100 employees—often managing critical employee records, leave approvals, and onboarding on scattered spreadsheets and WhatsApp chats.

**HRStack solves this by delivering an all-in-one, role-based platform covering:**

- **Admin Workspace**: Employee records, company departments, policy vault, leave approvals, offboarding, pulse surveys, analytics, and payroll disbursements.
- **Manager Portal**: Direct reports overview, fast team leave approvals, 1-on-1 notes logging, and quarterly review evaluations.
- **Employee Self-Service**: Attendance clock-in/out, time-off balances, onboarding checklist, monthly payslips, and policy signing.

---

## 🗺️ Where to Find API Endpoints & Client Utilities

The frontend is architected to give backend engineers a direct, 1-to-1 blueprint of every API route, payload, and client method:

| Area                             | File Path                                                                                                                  | Description                                                                                                                                                                                                     |
| :------------------------------- | :------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **API Endpoints Dictionary**     | [`src/utils/constants.js`](file:///Users/mac/Documents/Github/GitHub/Teamodin-Frontend/src/utils/constants.js)             | Centralized URL constants (`AUTH_ENDPOINTS`, `USER_ENDPOINTS`, `ADMIN_ENDPOINTS`, `API_ENDPOINTS`, `STORAGE_KEYS`, `USER_ROLES`).                                                                               |
| **API Client & Request Methods** | [`src/utils/api.js`](file:///Users/mac/Documents/Github/GitHub/Teamodin-Frontend/src/utils/api.js)                         | `APIClient` class with automatic JWT `Bearer` token attachment, error interceptors, timeout handling, and pre-built API wrappers (`authAPI`, `adminAPI`, `userAPI`, `payrollAPI`, `managerAPI`, `employeeAPI`). |
| **Global State Store**           | [`src/store/useStore.js`](file:///Users/mac/Documents/Github/GitHub/Teamodin-Frontend/src/store/useStore.js)               | Lightweight [Zustand](https://github.com/pmndrs/zustand) store managing employees, departments, leave requests, documents, offboarding list, and pending invites.                                               |
| **Auth & Active Role Context**   | [`src/contexts/AuthContext.jsx`](file:///Users/mac/Documents/Github/GitHub/Teamodin-Frontend/src/contexts/AuthContext.jsx) | Handles JWT session tokens, user profile, workspace metadata, and instant in-app role switching (`switchRole`).                                                                                                 |
| **Route Definitions**            | [`src/App.jsx`](file:///Users/mac/Documents/Github/GitHub/Teamodin-Frontend/src/App.jsx)                                   | Protected route tree with authentication gates for Admin, Manager, and Employee pages.                                                                                                                          |

---

## 📡 Complete API Endpoints Specification

All endpoints are prefixed with `API_BASE_URL` (configured via `VITE_API_URL`, defaults to `http://localhost:3000/api` or `/api/v1`).

### 1. Authentication & Session (`/auth/*`)

Defined in [`src/utils/constants.js`](file:///Users/mac/Documents/Github/GitHub/Teamodin-Frontend/src/utils/constants.js#L4-L16) and consumed by `authAPI`:

| Method | Endpoint                | Description                                                                                    |
| :----- | :---------------------- | :--------------------------------------------------------------------------------------------- |
| `POST` | `/auth/login`           | Authenticate with email & password. Returns `access_token`, `refresh_token`, and user profile. |
| `POST` | `/auth/register`        | Register new company workspace and root admin account.                                         |
| `POST` | `/auth/send-otp`        | Send verification OTP to user's registered email.                                              |
| `POST` | `/auth/verify-otp`      | Verify 6-digit OTP code during registration or password reset.                                 |
| `POST` | `/auth/forgot-password` | Request password reset email instructions.                                                     |
| `POST` | `/auth/reset-password`  | Set new password using reset token.                                                            |
| `POST` | `/auth/change-password` | Update password for authenticated user (requires current password).                            |
| `POST` | `/auth/refresh-token`   | Exchange valid refresh token for a fresh access token.                                         |
| `POST` | `/auth/logout`          | Revoke session and invalidate tokens.                                                          |

---

### 2. User & Workspace Profile (`/users/*`)

Defined in [`src/utils/constants.js`](file:///Users/mac/Documents/Github/GitHub/Teamodin-Frontend/src/utils/constants.js#L18-L24) and consumed by `userAPI`:

| Method | Endpoint                | Description                                                    |
| :----- | :---------------------- | :------------------------------------------------------------- |
| `GET`  | `/users/profile`        | Retrieve the authenticated user's profile and permissions.     |
| `PUT`  | `/users/profile/update` | Update user personal details (name, phone, avatar).            |
| `POST` | `/users/accept-invite`  | Complete invited teammate registration (token + password).     |
| `GET`  | `/users/workspace`      | Get current workspace details (name, slug, subscription plan). |

---

### 3. Admin: Employees & Directory (`/admin/employees/*`)

Defined in [`src/utils/constants.js`](file:///Users/mac/Documents/Github/GitHub/Teamodin-Frontend/src/utils/constants.js#L26-L34) and consumed by `adminAPI`:

| Method   | Endpoint                      | Description                                                                          |
| :------- | :---------------------------- | :----------------------------------------------------------------------------------- |
| `POST`   | `/admin/employees/invite`     | Send role-based email invite (Admin, Manager, or Employee) with assigned department. |
| `GET`    | `/admin/employees`            | List all employees with support for search, department, and status filters.          |
| `GET`    | `/admin/employees/:id`        | Get single employee complete file (Overview, Balances, Reviews, Assets).             |
| `PUT`    | `/admin/employees/:id`        | Update employee information or toggle status (`Active` / `Inactive`).                |
| `DELETE` | `/admin/employees/:id`        | Remove employee record from directory.                                               |
| `POST`   | `/admin/employees/import-csv` | Bulk upload employee records via CSV file (multipart/form-data).                     |
| `GET`    | `/admin/employees/export-csv` | Download employee directory CSV backup.                                              |

---

### 4. Admin: Departments & Org Structure (`/admin/departments/*`)

Defined in [`src/utils/constants.js`](file:///Users/mac/Documents/Github/GitHub/Teamodin-Frontend/src/utils/constants.js#L36-L40) and consumed by `adminAPI`:

| Method   | Endpoint                 | Description                                                                    |
| :------- | :----------------------- | :----------------------------------------------------------------------------- |
| `GET`    | `/admin/departments`     | Get list of all company departments, leads, headcount, and budget allocations. |
| `POST`   | `/admin/departments`     | Create new department division.                                                |
| `PUT`    | `/admin/departments/:id` | Update department name, lead, code, or budget.                                 |
| `DELETE` | `/admin/departments/:id` | Remove department (and reassign team members).                                 |

---

### 5. Admin: Company Leave & Time Off (`/admin/leaves/*`)

Defined in [`src/utils/constants.js`](file:///Users/mac/Documents/Github/GitHub/Teamodin-Frontend/src/utils/constants.js#L42-L49) and consumed by `adminAPI`:

| Method | Endpoint                    | Description                                                            |
| :----- | :-------------------------- | :--------------------------------------------------------------------- |
| `GET`  | `/admin/leaves`             | List all company leave requests (Pending, Approved, Rejected).         |
| `GET`  | `/admin/leaves/balances`    | Company-wide leave balance utilization metrics.                        |
| `POST` | `/admin/leaves/request`     | Submit leave request on behalf of an employee.                         |
| `POST` | `/admin/leaves/:id/approve` | Approve leave request and notify employee.                             |
| `POST` | `/admin/leaves/:id/reject`  | Decline leave request with mandatory rejection reason note.            |
| `GET`  | `/admin/leaves/calendar`    | Out-of-office team calendar feed by month and year.                    |
| `GET`  | `/admin/leaves/policies`    | Company statutory leave policies (Annual 20d, Sick 14d, Parental 60d). |

---

### 6. Admin: Onboarding & Offboarding (`/admin/onboarding/*`, `/admin/offboarding/*`)

Defined in [`src/utils/constants.js`](file:///Users/mac/Documents/Github/GitHub/Teamodin-Frontend/src/utils/constants.js#L51-L57) and consumed by `adminAPI`:

| Method  | Endpoint                       | Description                                                                  |
| :------ | :----------------------------- | :--------------------------------------------------------------------------- |
| `GET`   | `/admin/onboarding`            | Active new hires checklist completion rates and status.                      |
| `PATCH` | `/admin/onboarding/tasks/:id`  | Update onboarding task status (`done` / `pending`).                          |
| `POST`  | `/admin/onboarding/:id/nudge`  | Trigger reminder notification (Email/Slack) to new hire.                     |
| `GET`   | `/admin/offboarding`           | View active and archived exit workflows.                                     |
| `POST`  | `/admin/offboarding/initiate`  | Initiate employee offboarding (exit date, asset return, account revocation). |
| `PATCH` | `/admin/offboarding/tasks/:id` | Check off asset recovery, NDA reminder, or final settlement task.            |

---

### 7. Admin: Check-ins, Surveys & Documents (`/admin/*`)

Defined in [`src/utils/constants.js`](file:///Users/mac/Documents/Github/GitHub/Teamodin-Frontend/src/utils/constants.js#L59-L75) and consumed by `adminAPI`:

| Method   | Endpoint                                | Description                                                     |
| :------- | :-------------------------------------- | :-------------------------------------------------------------- |
| `GET`    | `/admin/check-ins/cycles`               | List active and archived quarterly performance check-in cycles. |
| `POST`   | `/admin/check-ins/cycles`               | Launch a new company-wide or departmental review cycle.         |
| `GET`    | `/admin/check-ins/cycles/:id/responses` | Get submission rates and self-assessment answers.               |
| `GET`    | `/admin/surveys`                        | List pulse surveys and eNPS sentiment scores.                   |
| `POST`   | `/admin/surveys`                        | Create and launch an anonymous pulse survey.                    |
| `GET`    | `/admin/surveys/:id/results`            | View aggregated promoter, passive, and detractor breakdown.     |
| `GET`    | `/admin/documents`                      | List company policies and acknowledgement progress.             |
| `POST`   | `/admin/documents/upload`               | Upload new handbook/policy PDF file (multipart/form-data).      |
| `DELETE` | `/admin/documents/:id`                  | Archive or remove policy document.                              |

---

### 8. Payroll & Statutory Remittances (`/payroll/*`)

Defined in [`src/utils/constants.js`](file:///Users/mac/Documents/Github/GitHub/Teamodin-Frontend/src/utils/constants.js#L87-L89) and consumed by `payrollAPI`:

| Method | Endpoint           | Description                                                        |
| :----- | :----------------- | :----------------------------------------------------------------- |
| `GET`  | `/payroll/summary` | Get monthly payroll totals (Gross, PAYE Tax, Pension 8%+10%, Net). |
| `POST` | `/payroll/run`     | Authorize monthly payroll batch disbursement.                      |
| `GET`  | `/payroll/export`  | Download bank payment batch CSV (NIP / Direct debit format).       |

---

### 9. Manager Portal (`/manager/*`)

Defined in [`src/utils/constants.js`](file:///Users/mac/Documents/Github/GitHub/Teamodin-Frontend/src/utils/constants.js#L92-L97) and consumed by `managerAPI`:

| Method | Endpoint                          | Description                                                     |
| :----- | :-------------------------------- | :-------------------------------------------------------------- |
| `GET`  | `/manager/reports`                | List direct reports assigned to authenticated manager.          |
| `POST` | `/manager/reports/:id/1on1-notes` | Save private discussion points, feedback, and action items.     |
| `GET`  | `/manager/leaves`                 | List pending and historical leave requests from direct reports. |
| `POST` | `/manager/leaves/:id/approve`     | Fast 1-click approve team leave.                                |
| `POST` | `/manager/leaves/:id/reject`      | Decline team leave with feedback note.                          |
| `POST` | `/manager/reviews/:id/evaluate`   | Submit manager evaluation rating (1–5) and written feedback.    |

---

### 10. Employee Self-Service (`/employee/*`)

Defined in [`src/utils/constants.js`](file:///Users/mac/Documents/Github/GitHub/Teamodin-Frontend/src/utils/constants.js#L100-L113) and consumed by `employeeAPI`:

| Method   | Endpoint                              | Description                                                                     |
| :------- | :------------------------------------ | :------------------------------------------------------------------------------ |
| `POST`   | `/employee/attendance/clock-in`       | Record daily work presence with location (`Remote`, `Office`, `Site`).          |
| `POST`   | `/employee/attendance/clock-out`      | Record clock-out and calculate total session hours.                             |
| `GET`    | `/employee/leaves/balances`           | Get personal leave balance remaining (Annual, Sick, Casual, Parental).          |
| `GET`    | `/employee/leaves`                    | Get personal leave history and real-time approval status pills.                 |
| `POST`   | `/employee/leaves/apply`              | Apply for time off with start date, end date, reason, and handoff teammate.     |
| `DELETE` | `/employee/leaves/:id/cancel`         | Cancel an unapproved pending leave request.                                     |
| `GET`    | `/employee/tasks`                     | Get personal onboarding / trial period task checklist.                          |
| `PATCH`  | `/employee/tasks/:id/toggle`          | Check off completed onboarding milestone.                                       |
| `GET`    | `/employee/payslips`                  | List monthly salary payment slips and net take-home breakdown.                  |
| `GET`    | `/employee/payslips/:id/pdf`          | Download official PDF copy of monthly payslip.                                  |
| `POST`   | `/employee/documents/:id/acknowledge` | Sign and acknowledge mandatory policy/handbook with digital timestamp.          |
| `POST`   | `/employee/reviews/self-assessment`   | Submit quarterly self-evaluation (Accomplishments, Blockers, Goals, 1–5 score). |
| `PUT`    | `/employee/profile/update`            | Update emergency contacts, bank payout details, and home address.               |

---

## 🔐 The 3 Roles & In-App Role Switcher

HRStack implements a 3-tier access model. A **Role Switcher** is embedded directly into the top navigation header (`Viewing as: 👑 Admin ▾`, `👔 Manager ▾`, `👤 Employee ▾`) so developers and stakeholders can test all three perspectives without multiple test accounts:

```
                      ┌────────────────────────────┐
                      │    ACTIVE WORKSPACE ROLE   │
                      └─────────────┬──────────────┘
            ┌───────────────────────┼───────────────────────┐
            ▼                       ▼                       ▼
      👑 ADMIN               👔 MANAGER              👤 EMPLOYEE
  Full Workspace Ops       Team Oversight &        Self-Service Workspace
  • Directory & Org        • Direct Reports        • Clock-In / Attendance
  • Offboarding Vault      • Leave Approvals       • Time-Off Balances
  • Company Approvals      • 1-on-1 Notes Logs     • Onboarding Tasks
  • Reviews & Surveys      • Team Reviews          • Monthly Payslips
  • Payroll Disbursements  • Team Onboarding       • Policy Signing
  • Settings & Billing     • Shared Directory      • Profile & Banking
```

Role state is automatically saved in `localStorage.getItem('hrstack_active_role')` (`'admin' | 'manager' | 'employee'`).

---

## 📂 Project Directory Structure

```text
Teamodin-Frontend/
├── public/                 # Static assets, favicon, manifest
├── src/
│   ├── components/         # Reusable presentation components
│   │   ├── auth/           # Auth form cards and OTP input widgets
│   │   ├── layout/
│   │   │   └── AdminLayout.jsx   # Universal responsive layout with role-aware sidebar & Role Switcher
│   │   └── ui/             # Buttons, modals, input elements
│   ├── contexts/
│   │   └── AuthContext.jsx # Authentication state, JWT tokens, and switchRole logic
│   ├── hooks/
│   │   ├── useAuth.js      # useAuth() consumer hook
│   │   └── useDebounce.js  # Debounce hook for search inputs
│   ├── pages/
│   │   ├── admin/          # Admin Suite (12 pages: Employees, Detail, Depts, Leave,
│   │   │                   #   Onboarding, Offboarding, Docs, Check-ins, Surveys,
│   │   │                   #   Analytics, Payroll, Settings, Security, Billing, Notifications)
│   │   ├── manager/        # Manager Portal (5 pages: Dashboard, Team Roster,
│   │   │                   #   Leave Approvals, Reviews & Evaluations, Team Onboarding)
│   │   ├── employee/       # Employee Self-Service (8 pages: Dashboard/Attendance,
│   │   │                   #   Leave, Tasks, Payslips, Documents, Reviews, Directory, Profile)
│   │   ├── auth/           # Auth Flow (Sign-in, Sign-up, OTP, Reset, Invite acceptance)
│   │   └── landing/        # Landing page with SEO metadata
│   ├── store/
│   │   └── useStore.js     # Zustand global store (employees, departments, leaves, docs, invites)
│   ├── styles/
│   │   └── theme.css       # Color palette, spacing tokens, and typography
│   ├── utils/
│   │   ├── api.js          # API client & modular HTTP methods
│   │   ├── constants.js    # Endpoint constants, storage keys, and regex validators
│   │   └── helpers.js      # Formatters for currency (₦), dates, initials, and percentages
│   ├── App.jsx             # React Router routing tree & ProtectedRoute
│   ├── index.css           # Global resets and CSS variables
│   └── main.jsx            # Application entrypoint
├── package.json            # Dependencies and scripts
└── vite.config.js          # Vite build configuration and dev server
```

---

## 🛠 Tech Stack & Dependencies

- **Core Framework**: [React 18](https://react.dev/)
- **Build System**: [Vite 6](https://vitejs.dev/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **Global State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Toast Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **Micro-Animations**: [Framer Motion](https://www.framer-motion.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **CSV Import & Export Engine**: [PapaParse](https://www.papaparse.com/)
- **Styling Paradigm**: **Strictly Pure CSS (NO Tailwind CSS)**. Uses modular component styles, flexbox/grid layout systems, and CSS variables defined in `theme.css`.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Setup & Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-org/Teamodin-Frontend.git
   cd Teamodin-Frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:

   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

   _(If omitted, the app defaults to `http://localhost:3000/api`)_.

4. **Start the local development server**:

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   ```
   Outputs optimized, production-ready static assets to the `dist/` directory.

---

## 🎨 Design Tokens & Color Palette

| Token               | Hex Value             | Usage                                                |
| :------------------ | :-------------------- | :--------------------------------------------------- |
| **Primary Brand**   | `#534ab7`             | Buttons, active navigation links, primary indicators |
| **Primary Dark**    | `#383287`             | Button hover states, dark gradients, active headers  |
| **Accent Green**    | `#10b981` / `#047857` | Approved status, on-track indicators, promotions     |
| **Warning Amber**   | `#f59e0b` / `#b45309` | Pending reviews, in-progress checklists              |
| **Danger Red**      | `#ef4444` / `#b91c1c` | Rejected leaves, offboarding revocation, deductions  |
| **Background Gray** | `#f9fafb`             | Application background canvas                        |
| **Card Surface**    | `#ffffff`             | Elevated cards, tables, and modal backgrounds        |

---

## 📄 License & Team

Built with ❤️ by **Sammyloaded in Team Odin** at **Grazac**. All rights reserved.
