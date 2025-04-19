# 🧠 GitHub Copilot Instructions for Simple Project Management Tool (Web App)

## 📌 Project Overview
This project is a **mid-complexity web application** designed for individuals and small teams to manage tasks, track deadlines, and visualize project progress. It aims to offer the core features of project management in a simplified, user-friendly format — making it a lightweight alternative to larger tools like Jira or Asana.

## 🛠️ Key Features
- Create, edit, delete tasks with titles, descriptions, due dates, and status
- Visualize workflow using a basic Kanban board (e.g., Todo, In Progress, Done)
- Task deadlines with color indicators and optional notifications
- Project and task filtering/sorting by date or status
- User authentication and basic access control

### Premium Features (for monetization)
- Team collaboration (invite members to a project)
- File attachments to tasks
- Advanced project views (e.g., Gantt charts)
- Custom tags, priorities, and task dependencies
- Subscription billing model (monthly/annual plans)

## 🧭 Copilot Instructions
### 🔹 Task & Project Management
```plaintext
Create REST API endpoints for managing projects and tasks (CRUD). Each task should support title, status, deadline, description, and tags.
```

### 🔹 Kanban View
```plaintext
Use `react-beautiful-dnd` to create a drag-and-drop Kanban board. Support column reordering and task movement across columns.
```

### 🔹 Authentication & Authorization
```plaintext
Implement user authentication with JWT or Firebase Auth. Associate projects and tasks with users or teams.
```

### 🔹 Notifications & Deadlines
```plaintext
Implement due date highlighting (e.g., red if overdue, yellow if due soon). Optional: integrate email reminders using NodeMailer or Firebase Cloud Messaging.
```

### 🔹 Premium Feature Gating
```plaintext
Add middleware to check for premium status before enabling collaboration, file uploads, or advanced views. Integrate Stripe for subscription billing.
```

### 🔹 UI/UX
```plaintext
Design a responsive UI using Tailwind CSS or similar. Create components for TaskCard, ProjectSidebar, KanbanColumn, and DeadlineAlerts.
```

## ✅ Suggested Tech Stack
- **Frontend**: React, Tailwind CSS, react-beautiful-dnd
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (or MongoDB if preferred)
- **Auth**: JWT or Firebase Auth
- **Payment**: Stripe (for premium tier)
- **Hosting**: Vercel (frontend), Render/Railway (backend)

## 📁 Suggested Project Structure
```bash
/ (root)
├── client/                   # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/api.js
│   │   └── App.jsx
├── server/                  # Node Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── index.js
├── database/
│   └── schema.sql
├── README.md
└── package.json
```

## 🔗 Future Enhancements
- Real-time collaboration with WebSockets
- Export reports to CSV or PDF
- AI assistant for task estimation and planning
- Public project view links for clients/stakeholders

---
This Copilot instruction file guides development of a clean, functional project management tool that can scale from personal use to small teams with premium collaboration needs.