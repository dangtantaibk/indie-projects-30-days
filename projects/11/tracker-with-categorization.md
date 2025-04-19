# 🧠 GitHub Copilot Instructions for Basic Expense Tracker with Categorization (Web App)

## 📌 Project Overview
**Basic Expense Tracker** is a mid-complexity web application that allows users to input and categorize personal expenses. It offers visual reports of spending over time and across categories. It targets users who want a simple yet effective tool to control their financial habits.

## 🛠️ Key Features
- Add and manage expenses with date, amount, category, and description
- Predefined and custom categories (Food, Travel, Bills, etc.)
- View reports filtered by time period (weekly, monthly, custom)
- Pie and bar charts showing breakdown by category or date range
- User registration and secure login

### Premium Features (for monetization)
- Auto-sync with bank accounts (via third-party APIs like Plaid)
- Budget planning per category/month
- Export data to CSV or PDF
- Advanced analytics: monthly trends, alerts for overspending
- No ads for premium users

## 🧭 Copilot Instructions
### 🔹 Expense Input & Categorization
```plaintext
Create a form to input expenses with fields: amount, date, category (dropdown), and optional note. Validate entries and store them per user.
```

### 🔹 Reports & Analytics
```plaintext
Use charting libraries like Chart.js or Recharts to show:
- Pie chart of expense distribution by category
- Line or bar chart of expenses over time
Add filters for date range and category.
```

### 🔹 User Authentication
```plaintext
Implement secure user authentication with JWT or Firebase Auth. Store each user’s expenses privately.
```

### 🔹 Premium Gating
```plaintext
Add feature flags for premium users. Integrate Stripe for subscription billing. Restrict features like auto-sync or detailed analytics behind paywall.
```

### 🔹 Data Model Suggestion
```plaintext
Tables or collections:
- users (id, name, email, password_hash)
- expenses (id, user_id, amount, date, category, note)
- categories (id, user_id, name, is_custom)
- subscriptions (user_id, plan, active_status)
```

## ✅ Suggested Tech Stack
- **Frontend**: React + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: PostgreSQL or MongoDB
- **Authentication**: JWT or Firebase
- **Charts**: Chart.js, Recharts, or Victory
- **Payments**: Stripe

## 📁 Suggested Project Structure
```bash
/ (root)
├── client/
│   ├── src/components/ExpenseForm.jsx
│   ├── src/pages/Dashboard.jsx
│   ├── src/pages/Reports.jsx
│   └── App.jsx
├── server/
│   ├── routes/expenses.js
│   ├── controllers/expenseController.js
│   ├── models/Expense.js
│   └── index.js
├── database/schema.sql or seed.js
├── README.md
└── package.json
```

## 🔗 Future Enhancements
- Push/email alerts for overspending
- Recurring expense tracking (e.g., subscriptions)
- AI-generated budget suggestions
- Multi-currency support
- Mobile app sync (React Native)

---
This Copilot instruction file helps guide development of a modern, user-friendly expense tracking app that balances simplicity with useful financial insights, and is monetizable through premium features.
