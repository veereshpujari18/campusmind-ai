# StudentOS — Everything a Student Needs, in One Place

StudentOS is a modern, responsive, all-in-one web platform built specifically for engineering college students to manage academics, scholarships, internships, placement preparation, coding practice, and college department resources.

Designed with a clean, high-performance SaaS aesthetic, StudentOS replaces fragmented spreadsheets and disjointed messaging groups with a unified operating system.

---

## 🌟 Key Features

1. **Intelligent Dashboard Overview**
   - Real-time cumulative CGPA & semester trajectory charts.
   - DSA syllabus completion metrics (solved vs. attempted).
   - Internship application pipeline status (Wishlist, Applied, OA, Interview, Selected, Rejected).
   - Priority upcoming deadlines (scholarships, lab submissions, online assessments).

2. **Academics & Semester Management**
   - Semester switcher (Semesters 1 through 8).
   - Continuous Internal Evaluation (CIE) and end-semester marks tracking.
   - Attendance monitoring with automatic 75% cutoff compliance warnings.
   - Accurate dynamic Semester GPA (SGPA) and cumulative CGPA calculation.

3. **Scholarship Finder & Eligibility Engine**
   - Filter grants by State, Category (General, OBC, SC/ST, EWS, Girls Only), Family Income, Course, and Year of Study.
   - Interactive Eligibility Checker: evaluates student criteria against verified grants.
   - Direct links to official submission portals and document checklists.

4. **Internship Application Tracker**
   - Dual-mode view: Interactive Kanban Board and structured Data Table.
   - Pipeline stages: *Wishlist*, *Applied*, *Online Assessment (OA)*, *Interview*, *Selected*, *Rejected*.
   - Application statistics: conversion rate, active pipeline, and deadline countdowns.

5. **Placement Preparation Hub**
   - 11 Core engineering modules: DSA, Java, Python, SQL, OOP, DBMS, Operating Systems, Computer Networks, System Design, Quantitative Aptitude, and HR Behavioral (STAR method).
   - "Recommended Next Step" advice and core concept cheat sheets.

6. **DSA Problem Tracker**
   - 11 Fundamental topics: Arrays, Strings, Linked Lists, Stacks, Queues, Binary Search, Trees, Graphs, Dynamic Programming, Greedy, Recursion.
   - Difficulty tracking (Easy, Medium, Hard) and problem statuses (Not Started, Attempted, Solved, Revision).
   - Direct LeetCode & GFG links, solution approach notes, and completion celebrations.

7. **CGPA & SGPA Calculator**
   - Multi-semester simulation with configurable grading scales (10-point UGC/AICTE standard and 4.0 US scale).
   - Mathematical formula breakdown display.
   - Result report card generator (printable/downloadable).

8. **Study Planner & Deep Work Timer**
   - Task organization categorized by Assignments, Exam Prep, Lab Work, and DSA Practice.
   - Integrated Pomodoro focus timer (25m Focus / 5m Break / 15m Rest).

9. **College Resources Hub**
   - Curated repository for lecture notes, university previous year question papers (PYQs), lab manuals, timetables, and official announcements.
   - Search by subject or instructor and preview document outlines.

10. **AI Study Assistant**
    - Conversational assistant for computer science theory, operating system scheduling, database normalization, and customized study schedules.
    - Formatted code snippets with one-click copy.

11. **Student Profile & Settings**
    - Academic profile with skills, GitHub, LinkedIn, and resume management.
    - Global command palette (`Cmd+K` / `Ctrl+K`).
    - Dark mode toggle with persistent preferences.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations & Effects**: Motion, Canvas Confetti
- **State & Storage**: React Context + Local Storage abstraction (`src/services/storage.ts`)

---

## 📂 Project Structure

```
├── src/
│   ├── components/
│   │   ├── academics/          # Semester marks, subjects, attendance tables
│   │   ├── assistant/          # AI Study Assistant chatbot
│   │   ├── auth/               # Login, Sign Up, and Demo Auth modals
│   │   ├── cgpa/               # CGPA & SGPA multi-semester calculator
│   │   ├── common/             # Logo, Header, Sidebar, Global Search, Notifications
│   │   ├── dashboard/          # KPI stats, trajectory charts, upcoming deadlines
│   │   ├── dsa/                # DSA problem tracker and solution notes
│   │   ├── internships/        # Kanban board and table tracker
│   │   ├── landing/            # Startup landing page, testimonials, and FAQ
│   │   ├── placement/          # Placement modules and interview cheat sheets
│   │   ├── planner/            # Task planner and Pomodoro focus timer
│   │   ├── profile/            # Student profile, resume, and skills
│   │   ├── resources/          # Notes, PYQs, and lab manuals hub
│   │   └── settings/           # Theme, grading scale, and data export
│   ├── context/
│   │   ├── AppContext.tsx      # Global state and persistent storage handlers
│   │   └── ToastContext.tsx    # Toast notification system
│   ├── data/
│   │   └── mockData.ts         # Realistic engineering demo data
│   ├── services/
│   │   ├── aiService.ts        # AI study assistant endpoint and fallback engine
│   │   └── storage.ts          # LocalStorage CRUD and export utilities
│   ├── types/
│   │   └── index.ts            # TypeScript definitions for the entire application
│   ├── App.tsx                 # Root layout & view routing
│   ├── index.css               # Global Tailwind CSS and typography tokens
│   └── main.tsx                # React application entry point
├── package.json
└── vite.config.ts
```

---

## 🚀 Running Locally

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd studentos
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser.

---

## 🔒 Security Best Practices

- **Zero Secrets on Client**: No API keys or tokens are stored in client-side code.
- **Server-Side AI Proxy**: When connecting Gemini or other LLMs, calls are routed via server-side endpoints (`/api/ai/ask`) to ensure credentials remain secure.
- **Data Privacy**: Workspace data is stored locally in the student's browser and can be exported as a JSON backup or cleared at any time.

---

## 🏛️ Future Backend Architecture

StudentOS is designed with clean boundaries separating UI components, state management, and service calls. To connect to an enterprise production backend:

- **Frontend**: React SPA (Vite / Next.js)
- **Backend API**: Java Spring Boot (REST / GraphQL) or Node.js / Express
- **Database**: PostgreSQL (with Drizzle or JPA / Hibernate ORM)
- **Authentication**: JWT authentication with OAuth 2.0 (Google Workspace Single Sign-On)
- **AI Integration**: Server-side Google Gemini SDK via secure API routes
- **Cloud Infrastructure**: AWS (ECS / Fargate, RDS PostgreSQL, S3 for student notes and resumes) or Google Cloud Run
