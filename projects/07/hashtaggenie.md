# 🧠 GitHub Copilot Instructions for HashtagGenie - Hashtag Suggestion Tool

## 📌 Project Overview
**HashtagGenie** is a lightweight web tool that suggests relevant and trending hashtags based on a user-provided keyword or topic. It helps content creators and marketers enhance social media reach by offering curated hashtags along with their popularity metrics.

## 🛠️ Key Features
- Input a keyword or topic
- Return a list of related hashtags
- Show popularity score (relative or absolute usage)
- Copy-to-clipboard functionality for each hashtag
- Optional: Daily usage limits for free users / unlimited for premium

## 🧭 Copilot Instructions
These prompts will guide Copilot-generated code to align with HashtagGenie’s feature scope:

### 🔹 Input UI
```plaintext
Create a form with a search input where users can type a keyword or topic (e.g., "travel", "fitness"). On submit, fetch and display hashtag results.
```

### 🔹 Hashtag Lookup
```plaintext
Query a static JSON dataset of hashtags or call an external API if available. Match hashtags related to the input keyword using keyword expansion or fuzzy match.
```

### 🔹 Popularity Score Display
```plaintext
For each suggested hashtag, display a popularity metric (e.g., usage volume or a visual indicator like stars, bars, or score out of 100).
```

### 🔹 Copy to Clipboard
```plaintext
Add a button next to each hashtag to allow users to quickly copy it for use in their posts.
```

### 🔹 UI & Styling
```plaintext
Use Tailwind CSS or basic CSS Grid/Flexbox to build a modern, responsive layout. Cards or tag-style badges for each hashtag.
```

### 🔹 Usage Limits (Optional Monetization)
```plaintext
Implement a daily free limit (e.g., 5 searches/day). Offer unlimited use via login or API key (mocked or real). Track usage in localStorage or backend.
```

### 🔹 Error Handling & Fallbacks
```plaintext
Display helpful messages when no hashtags are found or if the input is empty. Suggest alternative popular categories.
```

## 🧪 Example User Flow
1. User enters: `fitness`
2. App responds with:
   - #fitness (92/100)
   - #workout (87/100)
   - #fitlife (73/100)
   - Copy buttons for each hashtag

## ✅ Suggested Tech Stack
- Frontend: React + Tailwind CSS / Vanilla JS
- Data source: Static JSON or real-time hashtag API (if available)
- Backend (optional): Node.js/Express or Python Flask for API query logic

## 📁 Suggested Project Structure
```bash
/ (root)
├── public/
│   └── index.html
├── src/
│   ├── components/HashtagCard.jsx
│   ├── data/hashtags.json
│   ├── api/lookup.js
│   └── main.js or App.jsx
├── styles/
│   └── style.css
├── README.md
├── LICENSE
└── package.json
```

## 🔗 Future Enhancements
- Advanced filtering (platform-specific: Instagram/Twitter/etc.)
- Group hashtags by category (e.g., trending, evergreen, niche)
- Save hashtag sets and reuse later
- Offer performance analytics via backend for premium users

---
Use this file to ensure GitHub Copilot suggestions are well-aligned with building **HashtagGenie**, focusing on speed, simplicity, and actionable hashtag discovery.
