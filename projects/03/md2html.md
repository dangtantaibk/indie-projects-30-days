# 🧠 GitHub Copilot Instructions for Markdown to HTML Converter Web App

## 📌 Project Overview
**Markdown to HTML Converter** is a minimalist web tool that allows users to convert Markdown-formatted text into HTML. It's especially useful for developers, writers, and bloggers who want fast, browser-based conversion without the need to install extra tools.

## 🛠️ Key Features
- Convert Markdown input to clean HTML output
- Real-time preview of HTML rendering
- Option to copy/download the HTML code
- Clean, distraction-free interface
- Monetization via ads or pro version with advanced features

## 🧭 Copilot Instructions
These guidelines help align Copilot suggestions to the project’s goals:

### 🔹 Markdown Input Editor
```plaintext
Use a `<textarea>` or a Markdown-capable editor (e.g., CodeMirror or simple `contenteditable` div) for users to enter Markdown.
```

### 🔹 Markdown to HTML Conversion
```plaintext
Use a JavaScript Markdown parser like `marked.js` or `markdown-it` to convert Markdown input to HTML in real-time.
```

### 🔹 HTML Preview
```plaintext
Render the converted HTML live in a preview pane next to the Markdown editor using DOM manipulation. Sanitize the output before rendering.
```

### 🔹 Copy/Download Button
```plaintext
Add a button to allow users to copy the converted HTML to clipboard, and another to download it as an `.html` file.
```

### 🔹 Layout/UI Design
```plaintext
Keep the layout clean and mobile responsive. Use Tailwind CSS or similar for fast UI prototyping. Divide screen into two panels: Markdown input and HTML output.
```

### 🔹 Pro Features (Optional for Monetization)
```plaintext
Add a CSS theme selector that lets users apply different styles to the output HTML. Allow users to save past conversions locally or in browser storage.
```

### 🔹 Ad Integration (Optional)
```plaintext
Reserve a space on the page layout to integrate banner ads (e.g., Google AdSense) without disturbing core usability.
```

## 🧪 Example UI Flow
1. User types Markdown into left panel
2. Right panel updates instantly with rendered HTML
3. User clicks [Copy HTML] or [Download HTML] as needed

## ✅ Suggested Libraries
- Markdown conversion: `marked`, `markdown-it`, or `showdown`
- HTML sanitization: `DOMPurify`
- UI: Vanilla JS + Tailwind CSS (or lightweight framework like Svelte)

## 📁 Suggested Project Structure
```bash
/ (root)
├── public/
│   └── index.html
├── src/
│   ├── markdownParser.js
│   └── ui.js
├── styles/
│   └── main.css or Tailwind setup
├── README.md
├── LICENSE
└── package.json
```

## 🔗 Monetization Ideas
- Display Google Ads (non-intrusive layout)
- Pro version: enable CSS theming, save history, export presets
- Affiliate links to writing/developer tools (VS Code, blog templates, etc.)

---
Use this as a Copilot-aligned instruction reference when coding the Markdown to HTML Converter web app to keep development focused and efficient.
