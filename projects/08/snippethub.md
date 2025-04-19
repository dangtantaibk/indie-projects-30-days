# 🧠 GitHub Copilot Instructions for SnippetHub - Code Snippet Manager

## 📌 Project Overview
**SnippetHub** is a cloud-based web platform for developers to store, tag, organize, and retrieve their personal code snippets. It supports syntax highlighting, metadata tagging, full-text search, and snippet sharing via link. Users can create accounts to manage private libraries and optionally collaborate with teams.

## 🛠️ Key Features
- User authentication and personal accounts
- Create/edit/delete code snippets
- Tag snippets with language, topics, and descriptions
- Full-text and tag-based search
- Syntax highlighting per language
- Sharable public or private links
- Premium options: storage limits, team sharing

## 🧭 Copilot Instructions
Use these instructions to keep Copilot development on track with SnippetHub’s architecture and feature goals:

### 🔹 User Authentication
```plaintext
Implement user registration, login, and JWT-based authentication. Secure API endpoints to ensure users can only access their own data.
```

### 🔹 Snippet CRUD Operations
```plaintext
Create API endpoints to add, read, update, and delete code snippets. Each snippet should store title, code content, language, tags, and visibility (private/public).
```

### 🔹 Frontend UI (React or Vue)
```plaintext
Build a responsive UI with components for snippet editor, tag filter, language dropdown, and snippet detail view. Use Ace Editor or CodeMirror for syntax highlighting.
```

### 🔹 Search & Filtering
```plaintext
Add full-text search functionality for snippet content and title. Enable tag-based filters and language dropdowns to refine results.
```

### 🔹 Snippet Sharing
```plaintext
Implement route-based links for public snippets (e.g., /snippet/:id). Enforce visibility settings so private snippets are not publicly accessible.
```

### 🔹 Data Storage
```plaintext
Use MongoDB or PostgreSQL to store user and snippet data. Index fields like tags and language for efficient search.
```

### 🔹 Monetization & Limits
```plaintext
Track number of snippets per user. Free tier has limits (e.g., 100 snippets). Paid users unlock higher limits, team folders, or private group sharing.
```

### 🔹 UI/UX Enhancements
```plaintext
Provide light/dark mode toggle, copy-to-clipboard buttons, and quick tag management. Keep interface distraction-free but powerful for productivity.
```

## 🧪 Example User Flow
1. User signs up and logs in
2. Clicks “New Snippet”, fills title, code, selects language and tags
3. Saves snippet → visible in dashboard
4. User filters by “Python” and “API” → relevant snippets shown
5. Clicks “Share” → receives public link for team

## ✅ Suggested Tech Stack
- Frontend: React + Tailwind CSS + CodeMirror or Monaco Editor
- Backend: Node.js + Express
- Database: MongoDB or PostgreSQL
- Auth: JWT + bcrypt
- Deployment: Vercel (frontend) + Render or Railway (backend)

## 📁 Suggested Project Structure
```bash
/ (root)
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   └── App.jsx
├── server/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── index.js
├── shared/
│   └── utils/
├── README.md
└── package.json
```

## 🔗 Future Enhancements
- Snippet versioning
- Browser extension for quick save
- Markdown rendering in descriptions
- Team-based snippet folders and commenting
- AI-generated snippet suggestions

---
Use this Copilot-aligned instruction set to guide your development of **SnippetHub**, enabling a robust and user-centric snippet management experience.