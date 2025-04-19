# 🧠 GitHub Copilot Instructions for Topic-Specific Flashcard Web App

## 📌 Project Overview
This is a focused web-based flashcard app designed to help users learn a specific topic, such as beginner vocabulary in a new language, common programming terms, or key historical events. Unlike generic flashcard apps, it aims to deliver curated learning content tailored to a niche audience.

## 🛠️ Key Features
- Display one deck of flashcards for a chosen topic (e.g., "Top 100 English Words" or "JavaScript Terms")
- Interactive flashcard flipping experience
- Ability to mark flashcards as "learned" or "need review"
- Track progress across sessions (local storage)

### Premium Features (optional)
- Unlock new topic decks via in-app purchase or subscription
- Enable spaced repetition learning mode
- Save user progress to the cloud

## 🧭 Copilot Instructions
### 🔹 Flashcard Structure
```plaintext
Create a JSON structure with fields: id, front (term/question), back (definition/answer), topicTag, learned (boolean).
```

### 🔹 Flashcard UI
```plaintext
Build a UI component for flipping flashcards. On click/tap, toggle between front and back. Animate transition for smooth UX.
```

### 🔹 Topic Navigation
```plaintext
Provide a topic selector or URL-based routing to load different flashcard decks. Decks can be static files or fetched from a simple backend.
```

### 🔹 Progress Tracking
```plaintext
Use localStorage to track which cards have been marked as "learned." Display progress bar or count (e.g., 20/50 cards learned).
```

### 🔹 Deck Monetization (Premium)
```plaintext
Lock some decks behind a premium wall. Use mock paywall or Stripe integration to unlock decks. Optional account system for access management.
```

## ✅ Suggested Tech Stack
- Framework: React + Tailwind CSS (or Vanilla JS + HTML/CSS for MVP)
- Flashcard logic: State-based (React hooks) or global store (Redux/Zustand)
- Data source: Local JSON or backend API (Express or Firebase Functions)

## 📁 Suggested Project Structure
```bash
/ (root)
├── public/
│   └── decks/ (JSON files for topics)
├── src/
│   ├── components/Flashcard.jsx
│   ├── components/DeckSelector.jsx
│   ├── pages/
│   ├── utils/storage.js
│   └── App.jsx
├── styles/
│   └── index.css
├── README.md
└── package.json
```

## 🔗 Future Enhancements
- Daily practice reminders (via browser notifications)
- Quiz mode (multiple choice / true-false from flashcards)
- Dark mode & accessibility options
- Leaderboard or progress sharing (optional social features)

---
This Copilot guide is designed to support development of a **topic-focused flashcard web app** that is lightweight, learner-centric, and easily expandable into a monetizable platform.