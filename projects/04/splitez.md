# 🧠 GitHub Copilot Instructions for SplitEZ - Group Expense Splitter

## 📌 Project Overview
**SplitEZ** is a simple and intuitive web app that helps groups of friends or colleagues fairly split shared expenses after events or trips. Users input who paid for what, and the app calculates how much each person owes or is owed so that everyone ends up paying equally.

## 🛠️ Key Features
- Input multiple expenses with payer, amount, and description
- Automatically calculate final balances per person
- Display who owes whom and how much (settlement suggestions)
- Simple, mobile-friendly interface
- Optional: save expense history or group sessions (requires backend)

## 🧭 Copilot Instructions
Use these guidance points to keep Copilot aligned with project goals:

### 🔹 Expense Input System
```plaintext
Allow users to dynamically add expenses: each entry should include who paid, how much, and an optional description. Maintain a list of all participants.
```

### 🔹 Balance Calculation Logic
```plaintext
Write a function that calculates the total per person, then determines how much each person needs to pay or be reimbursed. Use a minimum-settlement algorithm to reduce the number of transactions.
```

### 🔹 Result Display
```plaintext
Show a summary table with each person’s balance and a list of suggested payments to settle the debts efficiently.
```

### 🔹 UI & Interaction
```plaintext
Design a clean form-based UI to enter expenses and show real-time calculations. Use vanilla JS or lightweight React for state handling. Ensure mobile responsiveness.
```

### 🔹 Group Management (Optional)
```plaintext
Enable creating and naming groups. Store each session temporarily in localStorage. Later versions can use backend storage (Node.js + MongoDB or SQLite).
```

### 🔹 Monetization Ideas
```plaintext
Keep free as MVP. Later add premium features like group debt history, notifications, recurring events, or export to PDF/Excel.
```

### 🔹 Error Handling
```plaintext
Validate amounts, ensure at least two people involved, and prevent missing data in expense forms. Display warnings or disable the 'calculate' button if invalid.
```

## 🧪 Example Flow
1. User adds members (e.g., Alice, Bob, Charlie)
2. Inputs 3–5 expense items (e.g., Alice paid 60 for dinner, Bob paid 40 for gas)
3. App calculates balances and suggests: "Charlie owes Alice $20, Bob owes Alice $10"

## ✅ Suggested Tech Stack
- Frontend: Vanilla JS + HTML/CSS or React + Tailwind CSS
- Backend (optional): Node.js + Express + MongoDB or SQLite

## 📁 Suggested Project Structure
```bash
/ (root)
├── public/
│   └── index.html
├── src/
│   ├── components/ (if using React)
│   ├── utils/calculateSettlements.js
│   └── main.js
├── styles/
│   └── styles.css
├── README.md
├── LICENSE
└── package.json
```

## 🔗 Future Enhancements
- Save/load session state
- Share link with friends for collaborative input
- PDF export of settlement report
- Multi-currency support

---
Use this file to guide GitHub Copilot suggestions when developing **SplitEZ**, ensuring the project remains focused on simplicity, fairness, and a great user experience.
