# 🧠 GitHub Copilot Instructions for PantryChef Chatbot

## 📌 Project Overview
**PantryChef** is a simple chatbot that helps users decide what to cook based on ingredients they already have at home. Users enter a list of available ingredients, and the chatbot returns relevant recipe suggestions. The interface can be a web-based chat or a messaging platform like Telegram.

## 🛠️ Key Features
- Chat interface for user to input available ingredients
- Return 2–5 recipe suggestions based on input
- Optional: filter by dietary preferences (vegan, low-carb, etc.)
- Deployable on web (chat widget) or messaging apps (Telegram, WhatsApp, etc.)

## 🧭 Copilot Instructions
Use the following guidance to help Copilot generate useful and targeted code for this chatbot project:

### 🔹 Chat UI (Web)
```plaintext
Create a basic chat-style UI with a message input field, send button, and message display area using HTML/CSS/JS or React. Ensure messages from user and bot are visually distinct.
```

### 🔹 Telegram Bot Setup (Optional)
```plaintext
Use `python-telegram-bot` or similar libraries to deploy on Telegram. Respond to `/start` and free-text messages with recipe suggestions.
```

### 🔹 Ingredient Parsing
```plaintext
Implement a function that tokenizes and normalizes user input (e.g., "eggs, milk, tomato") into a clean array of ingredients.
```

### 🔹 Recipe Suggestion Engine
```plaintext
Use OpenAI API or a static recipe dataset. Match recipes based on overlapping ingredients. Prefer recipes that require the fewest additional ingredients.
```

### 🔹 API Integration (Optional)
```plaintext
Optionally connect to a public recipe API like Spoonacular or Edamam. Query recipes based on provided ingredients and return structured response.
```

### 🔹 Personalization (Optional)
```plaintext
Allow user to specify dietary preferences or cooking time (e.g., quick meals). Filter recipe results accordingly.
```

### 🔹 Monetization Ideas
```plaintext
Show affiliate links to buy missing ingredients. Premium users can save favorite recipes or receive weekly meal plans.
```

### 🔹 Error Handling
```plaintext
Detect when no valid ingredients are entered or if no recipes are found. Respond with helpful fallback suggestions (e.g., "Try adding a protein source").
```

## 🧪 Example User Flow
1. User enters: "I have eggs, spinach, and cheese"
2. Bot responds:
   - "🥗 Spinach Omelet"
   - "🍳 Cheesy Egg Muffins"
   - "🧀 Baked Spinach Egg Cups"

## ✅ Suggested Libraries & Tools
- Chat frontend: Vanilla JS or React
- Telegram Bot: `python-telegram-bot`
- AI integration: OpenAI API (GPT) or recipe APIs (Spoonacular)
- Hosting: Vercel, Netlify, or Replit (for MVP)

## 📁 Suggested Project Structure
```bash
/ (root)
├── public/
│   └── index.html (chat UI)
├── src/
│   ├── chat-ui.js
│   ├── bot-logic.js
│   ├── recipes.json or apiClient.js
├── styles/
│   └── style.css
├── README.md
├── LICENSE
└── package.json
```

## 🔗 Future Enhancements
- Store user history and preferences (with optional login)
- Weekly meal planner feature
- Grocery list auto-generator for missing items
- Voice input support

---
Use this Copilot-aligned instruction document to build and iterate on **PantryChef Chatbot**, ensuring a fun, helpful, and lightweight cooking assistant experience.
