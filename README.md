<div align="center">
  <div style="background-color: #534ab7; display: inline-block; padding: 12px 16px; border-radius: 12px; margin-bottom: 16px;">
    <h1 style="color: white; margin: 0; font-family: sans-serif;">HRStack</h1>
  </div>
  <h3>Your HR Operating System without the bloat.</h3>
  <p>Built for African SMBs by <b>Team Odin</b> at Grazac.</p>
</div>

---

## 📖 What is HRStack?

**HRStack** is a modern People Operations (People Ops) MVP tailored specifically for Small and Medium-sized Businesses (SMBs) in Africa.

Most HR tools (like BambooHR or Workday) are built for enterprise budgets, bundled with complex payroll systems, and designed for Western compliance. African SMBs hit a wall at 30 employees—relying on scattered spreadsheets and WhatsApp messages.

**HRStack solves this by offering exactly what scaling teams need:** Five focused modules to manage people, time off, and culture, without the noise. 

This repository contains the **Frontend Application**, built entirely with React and standard CSS. We prioritize robust global state management, responsive UI, and immediate user feedback.

---

## ✨ Core Modules & Architecture

1. 👥 **Employee Directory & Full Profiles (`/admin/employees`, `/admin/employees/:id`)**
   - **Search & Filter**: Real-time filtering by department, status (Active, New hire, Inactive), and text search.
   - **Full Profile View**: Comprehensive view with tabs for Employment Details, Leave Balances, Performance History, and Hardware Assets.
   - **Bulk Onboarding**: One-click **CSV Import & Export** (via PapaParse) with toast feedback.
   - **Status Management**: Activate or deactivate employees with immediate global state reflection.

2. 🏢 **Departments & Org Structure (`/admin/departments`)**
   - **Department Cards**: View department leads, headcount progress, open hiring roles, and monthly budgets.
   - **Interactive Team Viewer**: Slide-out/modal view listing all members in a given department.
   - **Department CRUD**: Create, edit, and delete company divisions.

3. 🏖️ **Leave & Time Off Management (`/admin/leave`)**
   - **Company Approvals**: Admin & manager queue for pending employee leave requests with one-click Approve or Decline (with reason note).
   - **Request Leave**: Personal leave application with live balance deduction for Annual, Sick, and Casual leave.
   - **Team Leave Calendar**: Out-of-office team schedule showing who is on leave and upcoming absences.
   - **Leave Policy Rules**: Documented statutory leave allocations (Annual 20d, Sick 14d, Maternity 90d, Paternity 14d).

4. 🚀 **Onboarding & Offboarding Lifecycle (`/admin/onboarding`, `/admin/offboarding`)**
   - **Onboarding Checklist**: Step-by-step progress tracker for new hires with one-click reminder nudges.
   - **Offboarding & Exit Workflow**: Departure tracking, exit interviews, asset recovery (laptops, keycards), access revocation, and settlement calculations.
   - **Role-based Invites**: Admin invite generator with department and role assignment.

5. 📁 **Company Documents & Policies (`/admin/documents`)**
   - **Compliance Vault**: Central repository for Employee Handbooks, NDA agreements, and Health Insurance benefits.
   - **Acknowledgement Tracking**: Live progress bars tracking signed acknowledgements per document.
   - **Document Uploader**: Upload policies, set mandatory status, and target specific departments or countries.

6. 🔄 **Performance Check-ins & Review Cycles (`/admin/check-ins`)**
   - **Cycle Management**: Admin overview tracking overall submission rate (e.g. 84% completed) and department completion progress.
   - **Self-Assessment**: Questionnaire with rating scales, achievements, roadblocks, and manager sync guidelines.
   - **Cycle Launcher**: Create and launch new quarterly review cycles.

7. 📊 **Analytics & Pulse Surveys (`/admin/analytics`, `/admin/surveys`)**
   - **Workforce Analytics**: Attrition rates, tenure distribution, department ratios, and eNPS trends over time.
   - **Pulse Surveys**: Launch anonymous eNPS & culture pulse surveys with anonymized aggregated results.

8. ⚙️ **Workspace Settings & Billing (`/admin/settings/*`)**
   - **General Settings (`/admin/settings`)**: Company branding, workspace subdomain, primary country, timezone.
   - **Security (`/admin/settings/security`)**: 2FA toggle, active session audit, and password changes.
   - **Billing & Plan (`/admin/settings/billing`)**: Plan management, seats utilization, card updates, and PDF invoice downloads.
   - **Notifications (`/admin/settings/notifications`)**: Email triggers, Slack workspace channel sync, and urgent SMS toggles.

---

## 🔐 Access Model (The 3 Core Roles & Portals)

HRStack features dedicated workspaces tailored to each persona, with an in-app **Role Switcher** in the top navigation header for live testing across all roles:

### 👑 1. Admin Workspace (`/admin/*`)
* Full workspace control: Employee directory, departments, offboarding, policy vault, check-ins, surveys, and billing.
* **Payroll & Compensation (`/admin/payroll`)**: View monthly payroll runs, PAYE tax, pension deductions, and batch export.
* **Executive Analytics (`/admin/analytics`)**: Responsive SVG line charts for headcount and eNPS trends.

### 👔 2. Manager Portal (`/manager/*`)
* **Team Dashboard (`/manager/dashboard`)**: Direct reports overview, department leave requests, and scheduled 1-on-1s.
* **Direct Reports Roster (`/manager/team`)**: Individual employee files, start dates, and 1-on-1 notes modal.
* **Team Leave Approvals (`/manager/leave`)**: One-click approve/reject queue specifically for direct reports with reason notes.
* **Team Check-ins (`/manager/reviews`)**: Conduct quarterly reviews, rate performance (1–5), and provide manager feedback.
* **Team Onboarding (`/manager/onboarding`)**: Track new hires joining the manager's department and manager checklist items.

### 👤 3. Employee Self-Service Portal (`/employee/*`)
* **Employee Workspace (`/employee/dashboard`)**: Daily presence clock-in / clock-out widget with timer and work location (Remote / Office / Site), time-off balances, and teammates out today.
* **My Time Off (`/employee/leave`)**: Submit vacation requests, view balance countdowns (Annual, Sick, Casual, Parental), and track request status.
* **My Onboarding Checklist (`/employee/tasks`)**: First 30 days checklist for new hires to mark off tasks.
* **My Payslips (`/employee/payslips`)**: Monthly salary statements, PAYE tax deductions, pension contributions, and PDF downloads.
* **Company Documents (`/employee/documents`)**: Handbook & compliance policy vault with 1-click **"Acknowledge & Sign"**.
* **My Reviews (`/employee/reviews`)**: Fill out quarterly self-evaluations and read feedback from team leads.
* **Team Directory (`/employee/directory`)**: Search and contact colleagues via email or Slack.
* **My Profile (`/employee/profile`)**: Manage personal emergency contacts, direct deposit bank details, and address.

---

## 🛠 Tech Stack & Architecture

- **Frontend Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) for lightweight, fast global state (replacing local prop-drilling and mock data).
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/) for beautiful, globally accessible success/error messages.
- **CSV Processing**: [PapaParse](https://www.papaparse.com/) for fast in-browser CSV parsing and unparsing.
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Styling**: **Pure CSS (No Tailwind)**. The project strictly uses standard CSS files and inline styles to maintain complete control over the design system.

---

## 🚀 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v16 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Teamodin-Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **View the app**
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎨 Development Guidelines

- **CSS Rule**: **Do not use Tailwind CSS**. All styling must be written in standard CSS files (e.g., `theme.css`, `App.css`, `pages.css`) or using inline styles.
- **State**: The application uses `zustand` (`src/store/useStore.js`) to share data across the Employee Directory, Dashboard, and Invite screens. Ensure new features tap into this store rather than creating isolated local state for global entities.
- **SEO**: The platform is fully optimized with JSON-LD structured data and semantic HTML tags to ensure proper indexing.

---

**Developed with ❤️ by Team Odin**
