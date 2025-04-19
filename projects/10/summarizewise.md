# 🧠 GitHub Copilot Instructions for SummarizeWise - AI Text Summarizer

## 📌 Project Overview
**SummarizeWise** is a web-based AI-powered tool that summarizes long text, articles, or uploaded documents into concise overviews. It helps users extract key information quickly using bullet points or brief paragraphs. Useful for students, researchers, and busy professionals, the tool leverages advanced NLP models (like OpenAI’s GPT) to produce context-aware summaries.

## 🛠️ Key Features
- Paste long text or URL to summarize
- Upload documents (PDF, TXT, DOCX)
- Output concise summary + bullet points of key ideas
- Set summary length or level (brief, medium, detailed)
- Optional: user accounts and usage tracking

## 🧭 Copilot Instructions
Use these prompts to help Copilot contribute effectively to the project:

### 🔹 Text Input
```plaintext
Create a textarea or rich text input for users to paste text. Include validation for minimum and maximum length (e.g., 100–5000 words).
```

### 🔹 File Upload Support
```plaintext
Allow users to upload PDF, DOCX, or TXT files. Use file readers or libraries (e.g., `pdf-parse`, `mammoth`, `textract`) to extract text content for summarization.
```

### 🔹 Summary API Call
```plaintext
Call a backend endpoint that integrates with OpenAI API or other NLP summarization models. Send text input and return summarized content.
```

### 🔹 Bullet Point Extraction
```plaintext
Ask the AI to return summary results in bullet format (optional toggle) so users can quickly scan key points.
```

### 🔹 Summary Length Selection
```plaintext
Add user control (dropdown or slider) to choose between short, medium, or detailed summaries. Pass this as context to the backend summarization call.
```

### 🔹 Result Display
```plaintext
Display summary result in a scrollable container. Support copy-to-clipboard and optional download as `.txt` or `.md`.
```

### 🔹 User Limits (Optional Monetization)
```plaintext
Free users can summarize X words/day. Track usage per IP or per login. Premium users unlock more capacity, file uploads, and saved history.
```

## 🧪 Example User Flow
1. User pastes 2,000-word article and selects “Short + Bullet Points”
2. SummarizeWise returns a paragraph summary + 5 bullet points
3. User copies or downloads result
4. If limit reached, user prompted to upgrade or try again tomorrow

## ✅ Suggested Tech Stack
- Frontend: React + Tailwind CSS
- File parsing: `pdf-parse`, `mammoth`, `textract`
- Backend: Node.js or Python (Flask/FastAPI)
- AI: OpenAI GPT-4 API or similar model
- Auth/Usage: Firebase Auth or Supabase + quota tracking

## 📁 Suggested Project Structure
```bash
/ (root)
├── client/
│   ├── src/components/
│   ├── src/pages/
│   ├── src/api/
│   └── App.jsx
├── server/
│   ├── routes/summarize.js
│   ├── services/openaiClient.js
│   └── index.js
├── uploads/
├── README.md
└── package.json
```

## 🔗 Future Enhancements
- Summarize from web URLs directly (crawl + parse content)
- Save summary history with account login
- Multi-language support
- Browser extension for summarizing content in-place

---
Use this Copilot instruction file to guide development of **SummarizeWise**, ensuring a clear, scalable, and user-friendly AI summarization platform.