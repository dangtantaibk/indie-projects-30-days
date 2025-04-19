# 🧠 GitHub Copilot Instructions for AdCraft AI - AI-Powered Ad Content Generator

## 📌 Project Overview
**AdCraft AI** is a web-based tool that generates marketing copy using AI. Users input structured information about their product or service, and the app produces compelling ad titles and descriptions tailored for platforms like Facebook Ads, Google Ads, or social media.

## 🛠️ Key Features
- Structured form input: product name, highlights, tone, audience
- AI-generated ad copy: headlines and body content
- Multiple versions for each request
- History of past generations (for registered users)
- Usage limits for free users / unlimited with paid plan

## 🧭 Copilot Instructions
### 🔹 Input Interface
```plaintext
Design a form with fields for product name, value propositions, target audience, and tone of voice (e.g., casual, professional, bold).
```

### 🔹 AI Prompt & Request Logic
```plaintext
Construct a structured prompt from user inputs and call a language generation API (e.g., OpenAI GPT-4) to generate 3–5 ad variations.
```

### 🔹 Output Display & Copy Buttons
```plaintext
Display generated outputs in card or list format with copy-to-clipboard buttons. Optionally allow users to mark favorites.
```

### 🔹 History Tracking (Registered Users)
```plaintext
For logged-in users, store generated results in a database with timestamps, titles, and input metadata.
```

### 🔹 Freemium Usage Management
```plaintext
Implement daily generation limits for anonymous or free users. Unlock higher limits and advanced features via premium subscription.
```

### 🔹 Stack Suggestion
- Frontend: React + Tailwind CSS
- Backend: Node.js + Express (or Python + FastAPI)
- Database: PostgreSQL or Firebase (for storing generations & users)
- Auth: Firebase Auth, Clerk, or Auth0
- AI: OpenAI GPT-4 or similar LLM API

## 🧪 Example User Flow
1. User visits the site, enters:
   - Product: “SmartWater Bottle”
   - Highlights: “Tracks water intake, syncs with phone”
   - Audience: “Health-conscious millennials”
   - Tone: “Playful”
2. Clicks “Generate” → receives 5 ad copy samples
3. Copies one, or signs in to save favorites

## 📁 Suggested Project Structure
```bash
/ (root)
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
├── server/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── index.js
├── shared/
│   └── prompts/
├── database/
│   └── schema.sql or firebase-config.js
├── README.md
└── package.json
```

## 🔗 Future Enhancements
- Export results as CSV or PDF
- A/B testing recommendations based on performance
- Language localization / translation
- Integration with ad platforms (meta, Google)

---
This Copilot-aligned spec ensures the development of **AdCraft AI** stays focused on providing fast, useful, and high-quality AI-generated advertising content.
