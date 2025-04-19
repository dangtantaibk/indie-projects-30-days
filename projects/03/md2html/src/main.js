// DOM Elements
const markdownInput = document.getElementById('markdownInput');
const htmlPreview = document.getElementById('htmlPreview');
const htmlSource = document.getElementById('htmlSource');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const clearBtn = document.getElementById('clearBtn');
const viewSourceBtn = document.getElementById('viewSourceBtn');
const previewTab = document.getElementById('previewTab');
const sourceTab = document.getElementById('sourceTab');
const previewPane = document.getElementById('previewPane');
const sourcePane = document.getElementById('sourcePane');

// Initialize marked with options
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: true
});

// Convert markdown to HTML and update the preview
function updatePreview() {
  const markdown = markdownInput.value;
  if (markdown) {
    // Convert markdown to HTML and sanitize
    const rawHtml = marked.parse(markdown);
    const cleanHtml = DOMPurify.sanitize(rawHtml);
    
    // Update preview and source
    htmlPreview.innerHTML = cleanHtml;
    htmlSource.textContent = cleanHtml;
  } else {
    htmlPreview.innerHTML = '<p class="text-gray-400">HTML preview will appear here...</p>';
    htmlSource.textContent = '';
  }
}

// Copy HTML to clipboard
copyBtn.addEventListener('click', () => {
  const html = htmlSource.textContent;
  if (html) {
    navigator.clipboard.writeText(html)
      .then(() => {
        showNotification('HTML copied to clipboard!');
        // Visual feedback on button
        copyBtn.classList.add('bg-blue-700');
        setTimeout(() => copyBtn.classList.remove('bg-blue-700'), 500);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        showNotification('Failed to copy HTML', 'error');
      });
  } else {
    showNotification('No HTML content to copy', 'warning');
  }
});

// Download HTML as file
downloadBtn.addEventListener('click', () => {
  const html = htmlSource.textContent;
  if (html) {
    // Create a full HTML document
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Converted HTML</title>
</head>
<body>
${html}
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('HTML file downloaded!');
  } else {
    showNotification('No HTML content to download', 'warning');
  }
});

// Clear markdown input
clearBtn.addEventListener('click', () => {
  if (markdownInput.value) {
    if (confirm('Are you sure you want to clear the markdown input?')) {
      markdownInput.value = '';
      updatePreview();
    }
  }
});

// Toggle between preview and source tabs
previewTab.addEventListener('click', () => {
  previewTab.classList.add('active', 'bg-white');
  previewTab.classList.remove('bg-gray-100');
  sourceTab.classList.remove('active', 'bg-white');
  sourceTab.classList.add('bg-gray-100');
  
  previewPane.classList.remove('hidden');
  sourcePane.classList.add('hidden');
});

sourceTab.addEventListener('click', () => {
  sourceTab.classList.add('active', 'bg-white');
  sourceTab.classList.remove('bg-gray-100');
  previewTab.classList.remove('active', 'bg-white');
  previewTab.classList.add('bg-gray-100');
  
  sourcePane.classList.remove('hidden');
  previewPane.classList.add('hidden');
});

// Show notification
function showNotification(message, type = 'success') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `fixed bottom-4 right-4 p-3 rounded shadow-md transition-opacity duration-500 ${
    type === 'success' ? 'bg-green-500' : 
    type === 'warning' ? 'bg-yellow-500' :
    type === 'error' ? 'bg-red-500' : 'bg-blue-500'
  } text-white`;
  notification.textContent = message;
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Remove after delay
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 3000);
}

// Load sample markdown if input is empty
function loadSampleMarkdown() {
  if (!markdownInput.value) {
    markdownInput.value = `# Welcome to MD2HTML

## Markdown to HTML Converter

This is a **simple** tool to convert your Markdown text to HTML.

### Features:
- Real-time preview
- Copy HTML code
- Download as HTML file

> Try typing some markdown in this editor!

[Visit our website](https://example.com)

![Image Alt Text](https://via.placeholder.com/150)

\`\`\`javascript
// Sample code
function sayHello() {
  console.log("Hello, world!");
}
\`\`\`
`;
    updatePreview();
  }
}

// Event Listeners
markdownInput.addEventListener('input', updatePreview);
window.addEventListener('DOMContentLoaded', () => {
  loadSampleMarkdown();
  updatePreview();
});

// Check for previously saved content in localStorage
function checkLocalStorage() {
  const savedMarkdown = localStorage.getItem('md2html-content');
  if (savedMarkdown) {
    markdownInput.value = savedMarkdown;
    updatePreview();
  } else {
    loadSampleMarkdown();
  }
}

// Save content to localStorage on input
markdownInput.addEventListener('input', () => {
  localStorage.setItem('md2html-content', markdownInput.value);
});

// Initialize
checkLocalStorage();