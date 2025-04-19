# 🧠 GitHub Copilot Instructions for QR Code Generator Web Tool

## 📌 Project Overview
**QR Code Generator** is a simple web-based utility that allows users to quickly generate QR codes for various purposes such as website links, plain text, contact info, or event details. The tool can be monetized via ads or a premium version offering customization and analytics.

## 🛠️ Key Features
- Generate QR codes from text, URL, email, or contact info
- Allow user input and dynamic QR rendering
- Option to download or copy QR code image
- Responsive design for mobile and desktop use

### Premium Features (optional monetization)
- Customize QR style: color, size, logo embedding
- Scan analytics and unique tracking URLs
- History of generated codes for registered users

## 🧭 Copilot Instructions
### 🔹 QR Code Generation
```plaintext
Use a QR code library (e.g., `qrcode.react`, `qrcode.js`, or `qr-code-styling`) to generate QR images from user input.
```

### 🔹 Input Handling
```plaintext
Provide a simple form for users to enter a URL, text, email, or vCard. Validate input types and sanitize them appropriately.
```

### 🔹 QR Download/Export
```plaintext
Add a download button that lets users export the generated QR as PNG or SVG. Include a preview before download.
```

### 🔹 UI and Styling
```plaintext
Use Tailwind CSS or other modern CSS frameworks to make the interface clean and responsive. Consider light/dark modes.
```

### 🔹 Customization Options (Premium)
```plaintext
Provide options to customize QR appearance: color, error correction level, embedded logo, shape. Store settings for future use (optional login).
```

### 🔹 Tracking and Analytics (Premium)
```plaintext
Track scan counts via redirect URLs managed by the backend. Log timestamp, browser, and approximate location (IP-based).
```

### 🔹 Ads & Monetization
```plaintext
Display lightweight, non-intrusive ads on the free version. Use freemium gating for advanced features like styling and analytics.
```

## ✅ Suggested Tech Stack
- Frontend: React + Tailwind CSS or Vanilla JS
- QR Libraries: `qrcode.react`, `qr-code-styling`, or `QRCode.js`
- Backend (optional for premium): Node.js + Express + MongoDB
- Analytics (premium): Redis or PostgreSQL for scan logging

## 📁 Suggested Project Structure
```bash
/ (root)
├── public/
│   └── index.html
├── src/
│   ├── components/QRCodeCanvas.jsx
│   ├── pages/Home.jsx
│   └── App.jsx
├── server/ (optional)
│   ├── routes/qrTracker.js
│   └── models/Scan.js
├── styles/
│   └── main.css
├── README.md
└── package.json
```

## 🔗 Future Enhancements
- Upload logo image to embed inside QR
- REST API to generate QR via POST request
- QR code themes or templates
- Analytics dashboard with charts

---
This Copilot-aligned instruction guide will help you build and iterate on the **QR Code Generator**, combining simplicity, wide usability, and extensibility for premium services.