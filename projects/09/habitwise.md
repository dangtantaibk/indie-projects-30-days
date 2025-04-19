# 🧠 GitHub Copilot Instructions for HabitWise - Daily Habit Tracker App

## 📌 Project Overview
**HabitWise** is a mobile application that helps users build and track daily habits. Users set custom habit goals (e.g., "drink 8 glasses of water") and mark their progress each day. The app uses visual motivation like streak chains, badges, and progress charts to keep users engaged.

## 🛠️ Key Features
- Create, edit, and delete custom habits
- Daily check-in interface for marking progress
- Visual streak tracking (e.g., calendar chains)
- Simple line/bar charts to show weekly/monthly habit progress
- Daily reminders via push notifications
- Optional cloud sync, multi-device access, and social features (Premium)

## 🧭 Copilot Instructions
Use the following guidance to keep GitHub Copilot focused on HabitWise’s cross-platform mobile app architecture:

### 🔹 Habit Creation & Management
```plaintext
Create UI and backend logic for adding new habits with fields like title, frequency (daily, weekly), goal type (boolean or numeric), and reminder time.
```

### 🔹 Daily Tracking & Streaks
```plaintext
Implement a daily checklist view where users can mark habits as completed. Calculate and visually show streaks—consecutive days of success—per habit.
```

### 🔹 Charts & Progress Visualization
```plaintext
Use a charting library (like charts_flutter or react-native-chart-kit) to render weekly/monthly graphs of habit completion rate.
```

### 🔹 Local Storage & Cloud Sync
```plaintext
Store data locally using SQLite or local storage. For premium users, sync to Firebase Firestore or Realtime Database under their account.
```

### 🔹 Push Notifications
```plaintext
Use Firebase Cloud Messaging or local notification APIs to send daily reminders to check-in on habits. Allow users to set notification time per habit.
```

### 🔹 Rewards System
```plaintext
Assign virtual badges or achievements when users hit streak milestones (e.g., 7 days, 30 days). Store badge data in user profile.
```

### 🔹 UI & Theming
```plaintext
Build a clean and motivational mobile UI with toggles, calendars, charts, and habit cards. Include light/dark themes. Consider animations for reward feedback.
```

### 🔹 Monetization
```plaintext
Free users have basic habit tracking and local data. Premium users can unlock cloud sync, multiple device access, unlimited habits, and social challenge mode.
```

## 🧪 Example User Flow
1. User installs the app and creates a habit: “Workout – 30 mins daily”
2. App sends a reminder every evening at 7 PM
3. User marks it complete for 5 days straight → streak appears
4. On day 7, user unlocks “One Week Warrior” badge
5. User views progress chart showing 5/7 days completed

## ✅ Suggested Tech Stack
- Cross-platform: Flutter or React Native
- Local storage: SQLite, Hive (Flutter), or AsyncStorage (RN)
- Cloud: Firebase Auth + Firestore (for sync and storage)
- Notifications: Firebase Messaging or local_notifications
- Charts: `charts_flutter`, `react-native-chart-kit`, or `victory-native`

## 📁 Suggested Project Structure
```bash
/ (root)
├── lib/ or src/
│   ├── screens/
│   ├── components/
│   ├── models/
│   ├── services/
│   ├── database/
│   └── main.dart or App.js
├── assets/
│   └── icons, badges
├── android/ and ios/
├── pubspec.yaml or package.json
└── README.md
```

## 🔗 Future Enhancements
- Social features (habit groups, challenges)
- AI habit suggestions based on patterns
- CSV export/import of habit logs
- Widget support (Android/iOS home screens)

---
Use this Copilot-aligned instruction file to guide development of **HabitWise**, ensuring a clean, motivational, and scalable habit-tracking experience for mobile users.