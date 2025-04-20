# PantryChef - Cook with what you have! 👨‍🍳

<div align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
  <br/>
  <em>Tell us what ingredients you have, we'll suggest what to cook!</em>
</div>

## 📋 Introduction

PantryChef is a web application that helps users find delicious recipes based on the ingredients they already have in their pantry. Simply input what ingredients you have available, and PantryChef will suggest suitable recipes you can make right now.

![PantryChef Preview](https://via.placeholder.com/800x450.png?text=PantryChef+Preview)

## ✨ Features

- 🍳 **Ingredient-based Recipe Suggestions**: Input your available ingredients and get instant recipe ideas
- 🥗 **Dietary Preference Filters**: Filter recipes by dietary preferences (vegetarian, vegan, gluten-free, low-carb)
- 💬 **Chat-style Interface**: Easy and intuitive chat interface for a conversational experience
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🔍 **Smart Ingredient Parsing**: Intelligently extracts ingredients from natural language input
- 🧮 **Recipe Matching Algorithm**: Scores and ranks recipes based on your ingredients
- 🏷️ **Recipe Tags**: Each recipe includes tags for meal type, cuisine style, and preparation time

## 🚀 Technologies Used

- **HTML5**: Web page structure
- **CSS3**: Styling and animations
- **JavaScript**: Recipe matching logic and user interactions
- **Font Awesome**: Graphic icons
- **Google Fonts**: Typography

## 🛠️ How to Use

1. Open the PantryChef web application in your browser
2. Type the ingredients you have in your pantry or refrigerator into the chat input
3. (Optional) Select any dietary preferences using the checkboxes
4. Press send to get your personalized recipe suggestions
5. Browse through the suggested recipes based on your available ingredients

## 📦 Project Structure

```
pantrychef/
├── public/
│   └── index.html     # Main application page
├── src/
│   ├── bot-logic.js   # Recipe matching algorithm and response logic
│   └── chat-ui.js     # Chat interface management
└── styles/
    └── style.css      # Styling and animations
```

## 📝 Installation and Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/taidang/pantrychef.git
   cd pantrychef
   ```

2. Open the project folder
   - Navigate to the project directory in your file explorer or terminal

3. Start the application using one of these methods:
   - **Simple method**: Open the `public/index.html` file directly in a web browser
   - **Using a local server** (recommended for development):
     ```bash
     # If you have Python installed
     # Python 3
     python -m http.server
     # OR Python 2
     python -m SimpleHTTPServer
     ```
     Then open `http://localhost:8000/public/` in your browser
   
   - **Using Node.js live-server**:
     ```bash
     # Install live-server globally if you haven't already
     npm install -g live-server
     # Run server from project root
     live-server
     ```

4. The application should now be running and accessible in your browser!

## 🔍 Future Development Features

- [ ] **Expanded Recipe Database**: Add thousands more recipes across different cuisines
- [ ] **AI Integration**: Connect with OpenAI API for more intelligent recipe suggestions
- [ ] **User Accounts**: Save favorite recipes and ingredient lists
- [ ] **Shopping List Generator**: Create shopping lists for missing ingredients
- [ ] **Recipe Details**: Add full instructions, nutrition information, and cooking times
- [ ] **Meal Planning**: Plan meals for a week based on your available ingredients
- [ ] **Image Recognition**: Upload photos of ingredients to automatically identify them
- [ ] **Voice Input**: Use voice commands to tell PantryChef what ingredients you have
- [ ] **Social Sharing**: Share found recipes on social media platforms
- [ ] **Multi-language Support**: Translate recipes and interface to different languages
- [ ] **Mobile App Versions**: Native apps for iOS and Android
- [ ] **Telegram Bot Integration**: Access PantryChef from Telegram
- [ ] **Substitution Suggestions**: Recommend ingredient substitutions for recipes
- [ ] **Customizable Portion Sizes**: Adjust recipes for different numbers of servings
- [ ] **Video Tutorials**: Link to cooking technique videos for complex recipes

## 📜 License

MIT License

## 👤 Author

- **Tai Dang** - [GitHub](https://github.com/taidang)

---

<p align="center">Made with ingredients of love ❤️</p>