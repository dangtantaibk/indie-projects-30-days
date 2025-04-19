# 🧠 GitHub Copilot Instructions for Unit Converter Web App

## 📌 Project Overview
**Unit Converter** is a simple and intuitive web application that helps users convert between common measurement units. It supports conversions such as length, weight, temperature, and currency, and is designed for speed and accessibility in daily life use-cases like cooking, studying, travel, and engineering.

## 🛠️ Key Features
- Convert between standard units (length, weight, temperature, currency, etc.)
- Real-time input/output updates
- Dropdown selectors for source and target units
- Mobile-friendly interface
- Monetization via ads or a premium version with extra features

## 🧭 Copilot Instructions
Use these guidelines to align Copilot behavior during development:

### 🔹 Basic Conversion Logic
```plaintext
Implement modular conversion functions for each category (length, weight, temperature, currency). Ensure accurate conversion formulas.
```

### 🔹 Unit Selection UI
```plaintext
Create two dropdowns: one for the source unit and one for the target unit. Allow dynamic updates based on selected category (e.g., switching from length to temperature).
```

### 🔹 Input/Output Fields
```plaintext
Use an input field for user-entered value and dynamically show the result in a read-only output field. Update result in real-time.
```

### 🔹 Category Tabs or Dropdown
```plaintext
Provide tabs or a dropdown to select conversion category (Length, Weight, Temperature, Currency). Update units shown accordingly.
```

### 🔹 Currency API (Optional)
```plaintext
For currency conversion, fetch real-time exchange rates using a public API (e.g., exchangerate.host or Open Exchange Rates).
```

### 🔹 Monetization Options
```plaintext
Free version includes ads and basic unit sets. Pro version removes ads and adds rare unit types (e.g., nautical miles, micrograms, Kelvin).
```

### 🔹 Error Handling
```plaintext
Validate input (numeric only), handle API failure gracefully, and provide error messages for invalid conversions.
```

## 🧪 Example UI Flow
1. User selects category: e.g., Temperature
2. Chooses source unit: Celsius → target unit: Fahrenheit
3. Enters value → output updates instantly with result
4. Clicks [Copy Result] or [Clear]

## ✅ Suggested Libraries & Tools
- UI Styling: Tailwind CSS or Bootstrap
- Currency API: `exchangerate.host`, `fixer.io`
- Framework (optional): React or plain Vanilla JS

## 📁 Suggested Project Structure
```bash
/ (root)
├── public/
│   └── index.html
├── src/
│   ├── converters/ (modular conversion logic)
│   ├── ui.js
│   └── main.js
├── styles/
│   └── styles.css
├── README.md
├── LICENSE
└── package.json
```

## 🔗 Future Enhancements
- Add copy-to-clipboard and reset buttons
- Add accessibility improvements (ARIA labels, keyboard navigation)
- Store recent conversions in localStorage
- Support localization (multi-language UI)

---
This instruction file keeps GitHub Copilot aligned with building a simple yet powerful Unit Converter web app, suitable for everyday use.
