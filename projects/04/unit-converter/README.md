# Unit Converter

<div align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
  <br/>
  <em>Fast and accurate unit conversion tool</em>
</div>

## 📋 Introduction

Unit Converter is a web application that helps users quickly and accurately convert between different units of measurement. The app supports various common units and is designed with an intuitive, user-friendly interface.

![Unit Converter Preview](https://via.placeholder.com/800x450.png?text=Unit+Converter+Preview)

## ✨ Features

- 🔄 Supports conversion of 4 types of units:
  - **Length**: m, km, cm, mm, inch, feet, yard, mile,...
  - **Weight**: kg, g, mg, pound, ounce, ton,...
  - **Temperature**: Celsius, Fahrenheit, Kelvin
  - **Currency**: USD, EUR, JPY, GBP,... (with automatic exchange rate updates)
  
- 🎨 User-friendly interface:
  - Modern design with smooth animations
  - Quick unit swap function
  - Conversion formula display
  
- 📜 Conversion history storage:
  - Saves the 10 most recent conversions
  - Restore previous conversions with a single click
  
- 🌙 Premium version options:
  - Dark/light mode
  - Additional specialized conversion units
  - Export conversion history
  - Ad-free experience

## 🚀 Technologies Used

- **HTML5**: Web page structure
- **CSS3**: Styling and animations
- **JavaScript**: Conversion logic and user interactions
- **Font Awesome**: Graphic icons
- **Google Fonts**: Typography
- **Animate.css**: Animation effects

## 🛠️ How to Use

1. Select the type of unit to convert (length, weight, temperature, currency)
2. Enter the source value in the input field
3. Select the source and target units
4. The conversion result will be displayed automatically
5. Use the swap button to reverse the source and target units
6. View the conversion formula displayed below
7. Recent conversions are saved in the history section

## 📦 Project Structure

```
unit-converter/
├── src/
│   ├── index.html     # Main application page
│   ├── main.js        # Application entry point
│   ├── ui.js          # User interface management
│   ├── length.js      # Length conversion handling
│   ├── weight.js      # Weight conversion handling
│   ├── temperature.js # Temperature conversion handling
│   └── currency.js    # Currency conversion handling
└── styles/
    └── styles.css     # Styling and animations
```

## 📝 Installation Guide

1. Clone the repository:
   ```bash
   git clone 
   ```

2. Open the project folder:
   ```bash
   cd unit-converter
   ```

3. Open the `src/index.html` file in a web browser or use a development server:
   ```bash
   # Use Live Server if you have the VS Code extension
   # Or any other development server like:
   npx http-server
   ```

## 🔍 Future Development Features

- [ ] Add new unit types (area, volume, speed, etc.)
- [ ] Language options (English/Vietnamese/others)
- [ ] Progressive Web App (PWA) version for offline use
- [ ] Embeddable widget for other websites
- [ ] Unit conversion API
- [ ] Mobile applications (iOS/Android)

## 📜 License

MIT License

## 👤 Author

- **Your Name** - [GitHub](https://github.com/yourusername)

---

<p align="center">Made with ❤️</p>