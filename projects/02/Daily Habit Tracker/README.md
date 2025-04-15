# Daily Habit Tracker

A minimalist web application to help users build and maintain positive daily habits.

## Features

- 🔑 User Authentication (Email + Password)
- ✅ Daily Habit Tracking
- 🔄 Streak Counting
- 📊 Progress Visualization (Premium)
- 🔔 Daily Reminders (Premium)
- 🎨 Customizable Themes (Premium)
- ∞ Unlimited Habits (Premium)

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- TailwindCSS for styling
- Firebase (Authentication & Firestore)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Email/Password authentication:
     - Go to Authentication > Sign-in method
     - Enable Email/Password provider
   - Create a Firestore database:
     - Go to Firestore Database
     - Create database (start in test mode)
   - Get your Firebase configuration:
     - Go to Project Settings > General
     - Scroll down to "Your apps"
     - Click the web icon (</>)
     - Register app and copy the configuration

4. Configure environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Firebase configuration values:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
     ```

5. Deploy Firestore Security Rules:
   - Install Firebase CLI: `npm install -g firebase-tools`
   - Login to Firebase: `firebase login`
   - Initialize Firebase: `firebase init`
     - Select Firestore
     - Choose your project
     - Accept the default security rules file
   - Deploy rules: `firebase deploy --only firestore:rules`

6. Run the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
  ├── app/                   # App Router pages
  │   ├── auth/             # Authentication pages
  │   ├── habits/           # Habit management pages
  │   └── premium/          # Premium features page
  ├── components/           # React components
  │   ├── auth/            # Authentication components
  │   ├── habits/          # Habit-related components
  │   └── ui/              # Shared UI components
  ├── config/              # Configuration files
  ├── lib/                 # Utility functions and contexts
  └── types/               # TypeScript type definitions
```

## Features Implementation

### Free Tier
- Users can track up to 3 habits
- Basic habit tracking with daily reset
- Streak counting
- Email/Password authentication

### Premium Tier ($2.99/month)
- Unlimited habits
- Theme customization (light/dark mode + color schemes)
- Progress visualization
- Daily reminders (coming soon)

## Theme Customization

Premium users can customize their experience with:
- Light/Dark/System theme modes
- Color schemes: Indigo, Emerald, Rose, or Amber
- Persistent preferences saved to localStorage

## Security

The application implements several security measures:
- Firebase Authentication for user management
- Firestore security rules for data protection
- Protected routes using Next.js middleware
- Input validation and error handling

## License

MIT
