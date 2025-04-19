# 🧠 GitHub Copilot Instructions for Simple Web Pomodoro Timer (Fun Non-Monetized Project)

## 📌 Project Overview
This is a personal/fun web project to build a **clean and simple Pomodoro timer app**. It implements the popular Pomodoro Technique for time management (typically 25 minutes work, 5 minutes break) and focuses on providing a distraction-free interface. This app is perfect for showcasing your UI/UX and JavaScript timer logic skills.

## 🛠️ Key Features
- Default 25-minute work session and 5-minute break session
- Ability to customize durations (e.g., long break every 4 Pomodoros)
- Visual countdown timer with start/pause/reset controls
- Optional notification or sound alert when time is up
- Clean, minimalist design with responsive layout
- Footer link to your monetized or portfolio projects

## 🧭 Copilot Instructions
### 🔹 Timer Logic
```plaintext
Use JavaScript's setInterval or setTimeout to create countdown functionality. Allow pausing and resuming. Auto-switch between work and break periods.
```

### 🔹 State Handling
```plaintext
Use React or Vanilla JS state to track time, session type (work/break), round count, and timer running status.
```

### 🔹 UI Elements
```plaintext
Create a central timer display (MM:SS), start/pause/reset buttons, and labels for session type. Optionally, show a progress bar or cycle tracker.
```

### 🔹 Audio/Notifications (Optional)
```plaintext
Add browser notifications and/or a short audio tone when a Pomodoro or break ends. Ask for notification permission on load.
```

### 🔹 Styling
```plaintext
Use Tailwind CSS or basic CSS for a modern, clean UI. Support dark mode toggle for bonus polish.
```

### 🔹 Footer Link
```plaintext
Add a small footer section with a link to your GitHub or monetized projects. Make it subtle but accessible.
```

## ✅ Suggested Tech Stack
- **Frontend**: React or Vanilla JS + HTML/CSS
- **Styling**: Tailwind CSS, Styled Components, or SCSS
- **Hosting**: GitHub Pages, Vercel, or Netlify (free tier)

## 📁 Suggested Project Structure
```bash
/ (root)
├── public/
│   └── index.html
├── src/
│   ├── components/TimerDisplay.jsx
│   ├── App.jsx or main.js
│   └── styles.css
├── assets/sounds/notification.mp3
├── README.md
└── package.json
```

## 🔗 Future Enhancements (Optional)
- Long break every 4 Pomodoros
- Pomodoro history/tracking chart
- Background sound (e.g., rain or focus music)
- PWA support (installable offline app)

---
This Copilot instruction file provides structure and clarity for developing a well-crafted Pomodoro timer app that’s great for portfolio showcasing and creative learning.