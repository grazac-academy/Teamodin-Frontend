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

---

## ✨ Core Modules

HRStack does five things exceptionally well:

1. 👥 **Employee Directory**
   - Searchable profiles with role, department, and manager reporting lines.
   - CSV import for bulk onboarding.
2. 🏖️ **Leave Management**
   - Live balance tracking with automatic public holiday checks.
   - One-click approvals for managers with full team-calendar context.
3. 🚀 **Onboarding Workflows**
   - Tasks grouped by week and assigned to specific owners (New Hire, IT, Manager).
   - Automated nudges to ensure nothing falls through the cracks.
4. 🔄 **Performance Check-ins**
   - Structured quarterly cycles featuring both self-assessments and manager reviews.
5. 📊 **Analytics & Pulse Surveys**
   - Headcount trends, 90-day attrition, and leave utilization in a single dashboard.
   - Anonymous eNPS (Employee Net Promoter Score) surveys with a privacy-first 5-response threshold.

---

## 🔐 Access Model (Roles)

HRStack is strictly **invite-only**. There is no open sign-up. One workspace, three simple roles:

- **Admin** (Head of People / Founder): Sets up the workspace, manages billing/integrations, and invites teammates.
- **Manager**: Approves leave for their direct reports, runs check-ins, and views team availability.
- **Employee**: Requests leave, completes onboarding tasks, and submits self check-ins. (Employees land directly in their assigned role upon accepting an invite—no setup required).

---

## 🛠 Tech Stack & Architecture

- **Frontend Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Styling**: **Pure CSS (No Tailwind)**. The project strictly uses standard CSS files and inline styles to maintain complete control over the design system and avoid utility-class bloat.

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

- **CSS Rule**: **Do not use Tailwind CSS**. All styling must be written in standard CSS files (e.g., `theme.css`, `App.css`, `pages.css`) using BEM-like naming conventions or standard component scoping.
- **Mock Data**: Currently, the application uses sophisticated mock data and state management within components to simulate a live database environment for the MVP demo.

---
