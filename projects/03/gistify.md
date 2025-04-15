# 🧠 GitHub Copilot Instructions for Gistify CLI

## 📌 Project Overview
**Gistify CLI** is a command-line tool that allows developers to instantly create a GitHub Gist from one or more code files and receive the shareable URL in return. It eliminates the need to manually open GitHub in a browser, streamlining code sharing.

## 🛠️ Key Features
- Create Gists with a single command
- Support for multiple files
- Return shareable Gist URL after creation
- Options for setting title, description, and visibility (public/private)
- GitHub authentication via personal access token
- Easy installation via npm or pip

## 🧭 Copilot Instructions
Here are instructions to guide GitHub Copilot in assisting with this project:

### 🔹 CLI Setup
```plaintext
Write a CLI command using Node.js (with yargs or commander) or Python (with argparse or click) that accepts file paths and optional flags for title, description, and visibility.
```

### 🔹 Authentication Handling
```plaintext
Check for a GitHub personal access token from an environment variable or config file. If not found, prompt the user to input one and save it securely.
```

### 🔹 Gist Creation via API
```plaintext
Send a POST request to GitHub's Gist API endpoint with the provided file content, title, description, and public flag. On success, return the Gist URL.
```

### 🔹 File Handling
```plaintext
Read the contents of the given file(s). Ensure UTF-8 encoding and escape characters properly before sending to the API.
```

### 🔹 Error Handling
```plaintext
Catch and log any API errors or file read errors. Provide user-friendly messages and suggestions for common issues (e.g., invalid token, no internet).
```

### 🔹 Configuration File
```plaintext
Optionally support a `.gistifyrc` file to store default values like description, visibility, or default GitHub token.
```

### 🔹 Package Publishing
```plaintext
Prepare the tool for publishing to npm (Node.js) or PyPI (Python). Include setup files like `package.json` or `setup.py`, README, license, and entry points.
```

## 🧪 Example CLI Usage
```bash
# Create a private gist with default settings
gistify myscript.py

# Create a public gist with title and description
gistify index.js --title "Quick Sort Example" --description "Sorting algorithm in JS" --public
```

## ✅ GitHub API Reference
- [Gist API v3](https://docs.github.com/en/rest/gists/gists?apiVersion=2022-11-28)

## 📁 Suggested Project Structure
```bash
/ (root)
├── bin/
│   └── gistify.js or gistify.py
├── src/
│   └── core logic modules
├── .gistifyrc (optional config)
├── README.md
├── package.json / setup.py
└── LICENSE
```

---
Use this instruction file to keep GitHub Copilot aligned with the design goals and behavior expectations for Gistify CLI.
