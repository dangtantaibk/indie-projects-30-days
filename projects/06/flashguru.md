# 🧠 GitHub Copilot Instructions for FlashGuru - Flashcard Assistant

## 📌 Project Overview
**FlashGuru** is a simple flashcard tool that allows users to quickly create, flip through, and track their own study decks. Users input a list of terms and definitions (or questions and answers), and the app turns them into interactive flashcards for active recall.

## 🛠️ Key Features
- Create flashcards with term–definition or question–answer pairs
- Flip cards on click/tap for interactive self-testing
- Mark cards as “learned” to track progress
- Support for multiple decks
- Store data in browser (localStorage) or sync via backend (optional)

## 🧭 Copilot Instructions
Use these guidance prompts to shape Copilot-generated code:

### 🔹 Flashcard Data Input
```plaintext
Create a simple form or textarea input where users can add multiple term-definition pairs (e.g., line-separated or CSV-style). Provide buttons to add/remove/edit cards.
```

### 🔹 Flashcard Display Logic
```plaintext
Render flashcards one by one or in a list/grid. Clicking a card should flip it to reveal the definition/answer using a smooth animation.
```

### 🔹 Progress Tracking
```plaintext
Add a checkbox or button on each card to mark it as “learned.” Optionally display statistics (e.g., 3/10 learned).
```

### 🔹 Deck Management (Optional)
```plaintext
Allow users to create, name, and switch between different decks. Store each deck separately in localStorage.
```

### 🔹 Save & Persist Data
```plaintext
Use browser `localStorage` to persist flashcard data. Optionally allow users to export/import decks as JSON.
```

### 🔹 UI & UX
```plaintext
Use React or Vue for smooth interaction. Ensure mobile responsiveness. Provide a clean, focused layout with minimal distractions.
```

### 🔹 Monetization (Optional)
```plaintext
Keep core features free. Offer premium features such as cloud sync (via Firebase or Supabase), deck sharing, spaced repetition mode, or dark mode.
```

### 🔹 Error Handling
```plaintext
Validate input for empty fields or duplicate entries. Alert users when data is malformed during import/export.
```

## 🧪 Example User Flow
1. User enters:
   - Term: “HTTP” → Definition: “HyperText Transfer Protocol”
   - Term: “OOP” → Definition: “Object-Oriented Programming”
2. User clicks [Start Review]
3. Flashcards appear one-by-one; user flips each and marks known cards
4. At the end, summary: “You mastered 7/10 cards.”

## ✅ Suggested Tech Stack
- Frontend: React + Tailwind CSS or Vue 3 + Vite
- Persistence: localStorage (MVP), Firebase/Supabase (optional)

## 📁 Suggested Project Structure
```bash
/ (root)
├── public/
│   └── index.html
├── src/
│   ├── components/Flashcard.vue or Flashcard.jsx
│   ├── components/DeckManager.vue
│   └── App.vue or App.jsx
├── styles/
│   └── main.css
├── README.md
├── LICENSE
└── package.json
```

## 🔗 Future Enhancements
- Spaced repetition algorithm integration
- Import/Export decks to share with classmates
- Cloud sync with authentication
- Flashcard quiz mode (multiple choice)

---
Use this Copilot instruction file to keep development for **FlashGuru** focused on speed, usability, and personal learning customization.
