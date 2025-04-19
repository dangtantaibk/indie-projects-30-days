# 🧠 GitHub Copilot Instructions for Simple Landing Page Builder (Web App)

## 📌 Project Overview
**Simple Landing Page Builder** is a mid-complexity web application that allows users to easily create single-page websites (landing pages) to capture leads or promote a product/service. The app includes pre-designed templates and a visual drag-and-drop editor so that non-technical users can build marketing pages without coding.

## 🛠️ Key Features
- Drag-and-drop editor for building sections (text, image, CTA buttons, forms)
- Pre-designed templates for common use cases (e.g., product launch, lead capture)
- Export or publish landing pages to a public link
- Lead capture with form handling and storage
- Optional user account to manage and edit pages

### Premium Features (monetization)
- More templates and customization options (fonts, themes, colors)
- Custom domain support
- Integration with Google Analytics, Facebook Pixel, and email marketing tools (Mailchimp, etc.)
- Higher page limits and lead quota
- Subscription-based pricing model

## 🧭 Copilot Instructions
### 🔹 Drag-and-Drop Editor
```plaintext
Use a layout engine like `react-dnd`, `framer-motion`, or `craft.js` to enable drag-and-drop of components like headers, images, text blocks, forms, and CTAs. Save layout state as JSON.
```

### 🔹 Template System
```plaintext
Create reusable templates stored as JSON structures. Allow users to preview and load them into the editor as starting points.
```

### 🔹 Publishing and Hosting
```plaintext
Provide each saved landing page with a unique URL (e.g., app.com/page/slug). Use dynamic routing and render the stored JSON layout on the frontend.
```

### 🔹 Lead Capture Form Handling
```plaintext
Include customizable form blocks. Store submitted leads securely in a backend database. Allow users to download as CSV or integrate with Zapier or email tools.
```

### 🔹 Auth & Project Management
```plaintext
Implement login/register flow with JWT or Firebase Auth. Allow users to manage saved pages and view lead submissions.
```

### 🔹 Pricing & Monetization
```plaintext
Use Stripe or LemonSqueezy to manage subscriptions. Gate premium features and increase page/form limits based on plan.
```

## ✅ Suggested Tech Stack
- **Frontend**: React + Tailwind CSS + Craft.js or React DnD
- **Backend**: Node.js + Express or Firebase Functions
- **Database**: MongoDB or PostgreSQL (pages, users, leads)
- **Auth**: Firebase Auth or JWT-based custom system
- **Payments**: Stripe for subscriptions
- **Hosting**: Vercel (frontend) + Railway/Render/Firebase (backend)

## 📁 Suggested Project Structure
```bash
/ (root)
├── client/
│   ├── src/components/BuilderCanvas.jsx
│   ├── src/pages/Templates.jsx
│   └── App.jsx
├── server/
│   ├── routes/pages.js
│   ├── controllers/pageController.js
│   ├── models/Page.js
│   └── index.js
├── database/schema.sql or seed.js
├── public/templates/
├── README.md
└── package.json
```

## 🔗 Future Enhancements
- Live preview mode for mobile/tablet view
- A/B testing of page variants
- AI-assisted content generation for headlines and CTAs
- Collaboration tools (e.g., share editor with teammates)

---
This Copilot instruction file outlines how to build a user-friendly, visually driven landing page builder that empowers users to create professional marketing pages with ease and flexibility.
