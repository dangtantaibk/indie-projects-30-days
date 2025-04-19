# 🧠 GitHub Copilot Instructions for BudgetBuddy - Personal Budget Tracker

## 📌 Project Overview
**BudgetBuddy** is a cross-platform app that allows users to manage income and expenses, categorize spending, and visualize financial trends. The app provides charts and alerts to help users understand and control their budgets better.

## 🛠️ Key Features
- Add recurring or one-time income and expenses
- Categorize transactions (e.g., Food, Travel, Utilities)
- Show budget summary and remaining balance
- Visual reports (pie charts, bar graphs)
- Monthly overspending alerts
- Optional: Bank integration (premium)

## 🧭 Copilot Instructions
Use the following guidance prompts to align development:

### 🔹 Transaction Entry
```plaintext
Create forms for users to input income or expense entries. Support recurring frequency (daily/weekly/monthly) and category selection.
```

### 🔹 Budget Calculation Logic
```plaintext
Automatically compute total income, total expenses, and balance. Detect when expense exceeds defined limits and trigger alert.
```

### 🔹 Visualization & Reporting
```plaintext
Use a chart library like Chart.js or Recharts to show:
- Pie chart of expenses by category
- Bar chart of income/expenses over time
```

### 🔹 User Management
```plaintext
Allow account creation, login/logout, and secure storage of personal finance data. Implement JWT or Firebase Auth.
```

### 🔹 Data Persistence
```plaintext
Use SQLite for mobile or PostgreSQL/MySQL for web apps. Enable syncing to cloud if multi-device access is needed.
```

### 🔹 Monetization
```plaintext
Free version allows manual entry and basic charts. Premium unlocks bank sync, detailed analytics, export to CSV, and financial coaching tips.
```

## ✅ Suggested Tech Stack
- Web: React + Node.js/Express + PostgreSQL
- Mobile: Flutter + SQLite + Firebase (optional for cloud sync)
- Charts: Chart.js, Recharts, or Victory Native

## 📁 Suggested Project Structure
```bash
/ (root)
├── client/ (for web)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
├── mobile/ (optional Flutter app)
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
- Budget planning assistant (e.g., suggest spending limits)
- CSV import/export
- Cross-device sync and offline mode
- Notifications for bill due dates or expense spikes

---
This Copilot-aligned guide helps developers build