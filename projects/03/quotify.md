# 🧠 GitHub Copilot Instructions for Quotify - Quote Image Generator

## 📌 Project Overview
**Quotify** is a simple web application that allows users to input a short quote or message and instantly generate a visually appealing image containing that quote. The tool supports basic customization like choosing a background image, font style, and layout, making it ideal for fast, no-design-needed social media content.

## 🛠️ Key Features
- Input quote text via simple UI
- Select background style (preset image or color)
- Choose font, text color, alignment
- Generate quote image using HTML5 Canvas or Fabric.js
- Download the image locally
- Optional: show gallery of user-created images (client-side only)

## 🧭 Copilot Instructions
Use these instructions to align Copilot behavior with Quotify’s design goals:

### 🔹 Quote Input & UI Controls
```plaintext
Create a form with a textarea for the quote and controls (dropdowns/buttons) for selecting background, font, font size, text alignment, and color.
```

### 🔹 Canvas or Image Rendering
```plaintext
Use HTML5 Canvas or Fabric.js to render the quote text onto a selected background image or color. Make sure text wraps properly and is centered or aligned as chosen.
```

### 🔹 Font & Style Options
```plaintext
Offer a few curated font choices (e.g., serif, sans-serif, script) and allow font size and color to be selected. Use Google Fonts for variety.
```

### 🔹 Background Handling
```plaintext
Provide a set of preloaded background images or allow the user to select a flat color. Backgrounds should be scaled to canvas size.
```

### 🔹 Image Export
```plaintext
Add a 'Download Image' button that triggers Canvas’s `.toDataURL()` or `.toBlob()` and downloads the image as PNG.
```

### 🔹 Monetization Options (Optional)
```plaintext
Offer a "Pro" mode with premium backgrounds, advanced styling (shadows, gradients), or watermark-free downloads.
```

### 🔹 Responsiveness & UX
```plaintext
Ensure the layout works well on both desktop and mobile. Use Tailwind CSS or minimal custom styling for a polished but lightweight UI.
```

## 🧪 Example UI Flow
1. User enters quote in a textarea
2. Selects background, font, color, alignment
3. Clicks “Generate” → Image preview rendered
4. Clicks “Download” → PNG downloaded to device

## ✅ Suggested Libraries
- Canvas rendering: `HTML5 Canvas API`, `Fabric.js`
- Fonts: `Google Fonts`
- UI Styling: `Tailwind CSS`

## 📁 Suggested Project Structure
```bash
/ (root)
├── public/
│   └── backgrounds/
├── src/
│   ├── index.html
│   ├── styles.css
│   └── main.js
├── README.md
├── LICENSE
└── package.json
```

## 🔗 Future Enhancements
- Enable user to upload custom background images
- Save and share quote templates via browser localStorage or backend
- Social sharing buttons (Twitter, Instagram, LinkedIn)

---
This instruction set is designed to keep GitHub Copilot on track during the development of Quotify – ensuring simplicity, visual quality, and fast user interaction.
