# Random Quote Generator

A simple, elegant web application that displays random inspirational, funny, and thought-provoking quotes from various categories.

## Features

- 📝 Display random quotes from a curated collection
- 🏷️ Filter quotes by category (motivation, wisdom, humor, creativity)
- 🔄 Get a new random quote with a button click
- 📋 Copy quotes to clipboard with a single click
- 📱 Share quotes directly to Twitter and LinkedIn
- 🎨 Beautiful, responsive UI with smooth animations
- 🌙 Card-style quote display with modern design

## How to Use

### Setting up a local server

The project uses ES6 modules which require running on a web server due to CORS policy restrictions. You cannot simply open the HTML file directly in a browser. Here's how to set it up:

#### Option 1: Using Node.js and http-server

1. Install Node.js if you haven't already (https://nodejs.org/)
2. Install http-server globally:
   ```
   npm install -g http-server
   ```
3. Navigate to the project root directory in your terminal:
   ```
   cd path/to/random-quote-generator
   ```
4. Start the server:
   ```
   http-server -p 8080
   ```
5. Open your browser and visit:
   ```
   http://localhost:8080/public/
   ```

#### Option 2: Using Python's built-in HTTP server

1. Open a terminal and navigate to the project root:
   ```
   cd path/to/random-quote-generator
   ```
2. Start a Python HTTP server:
   - For Python 3:
     ```
     python -m http.server 8080
     ```
   - For Python 2:
     ```
     python -m SimpleHTTPServer 8080
     ```
3. Open your browser and visit:
   ```
   http://localhost:8080/public/
   ```

#### Option 3: Using VS Code Live Server extension

1. Install the "Live Server" extension in VS Code
2. Right-click on the `public/index.html` file
3. Select "Open with Live Server"
4. The app will open in your default browser

### Using the application

1. Once running on a server, a random quote will be displayed automatically
2. Use the category filter dropdown to see quotes from a specific category
3. Click "New Quote" to display another random quote
4. Click the "Copy" button to copy the current quote to your clipboard
5. Use the social media icons to share the quote on Twitter or LinkedIn

## Technologies Used

- HTML5
- CSS3 with animations
- JavaScript (ES6+)
- TailwindCSS for styling
- Font Awesome icons

## Project Structure

```
/
├── public/
│   └── index.html
├── src/
│   ├── data/
│   │   └── quotes.json
│   └── main.js
├── styles/
│   └── style.css
└── README.md
```

## Future Enhancements

- Dark/light mode toggle
- Daily quote widget
- Voice playback of quotes
- More animated transitions
- Additional quote categories

## Created For

This project was created as a learning exercise for working with JavaScript, HTML, and CSS. It's part of a 30-day coding challenge focused on building small, useful applications.

## License

This project is for educational purposes only.