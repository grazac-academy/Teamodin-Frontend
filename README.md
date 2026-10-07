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

## ✨ Core Modules & Features

1. 👥 **Employee Directory**
   - **Rich Profiles**: Searchable profiles with role, department, and manager reporting lines.
   - **Bulk Onboarding**: One-click **CSV Import** to rapidly load employee data. Includes instant visual feedback via toast notifications.
   - **Data Export**: Export your directory back to CSV anytime.
   - **Pagination & Filtering**: Easily navigate large teams without overwhelming the UI.

2. 🏖️ **Leave Management**
   - **Live Balances**: Track Annual, Sick, and Casual leave with clear progress bars.
   - **Approvals**: One-click approvals for managers with team-calendar context.

3. 🚀 **Onboarding Workflows**
   - **Role-based Invites**: Admins invite teammates directly to their specific role.
   - **Track Invites**: View pending invites, resend, or revoke them as needed.

4. 🔄 **Performance Check-ins**
   - Structured quarterly cycles featuring both self-assessments and manager reviews.

5. 📊 **Analytics & Pulse Surveys**
   - **Dashboard**: High-level overview of headcount, pending leave requests, and recent hires.
   - **Dynamic Greeting**: Time-aware dashboard greetings that adjust to the user's local timezone.

---

## 🔐 Access Model (Roles)

HRStack is strictly **invite-only**. There is no open sign-up. One workspace, three simple roles:

- **Admin** (Head of People / Founder): Sets up the workspace, manages billing/integrations, and invites teammates.
- **Manager**: Approves leave for their direct reports, runs check-ins, and views team availability.
- **Employee**: Requests leave, completes onboarding tasks, and submits self check-ins.

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
