# QuickShare Extension

A simple browser extension that helps you quickly copy the title and URL of the current webpage with just one click. Perfect for sharing links or saving webpages for later reference.

![QuickShare Extension Screenshot](../../../resources/screenshots/QuickShare%20Extension.png)

## Features

- One-click copy of page title and URL
- Multiple formatting options:
  - Plain text (Title - URL)
  - Markdown ([Title](URL))
  - HTML (<a href="URL">Title</a>)
- Browser toolbar button for quick access
- Simple and intuitive interface

## Tech Stack

- HTML
- CSS
- JavaScript
- Chrome Extension API (Manifest V3)

## Development Setup

1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Project Structure

```
quickshare-extension/
├── manifest.json
├── popup/
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── background/
│   └── background.js
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

## Contributing

This is part of my 30-day indie projects challenge. Feel free to contribute by submitting issues or pull requests.