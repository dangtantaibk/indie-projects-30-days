// DOM elements
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');
const copyQuoteBtn = document.getElementById('copy-quote-btn');
const categorySelect = document.getElementById('category-select');
const twitterShare = document.getElementById('twitter-share');
const linkedinShare = document.getElementById('linkedin-share');

// Store quotes data
let quotes = [];

// Current quote
let currentQuote = null;

// Load quotes data using fetch
async function loadQuotes() {
    try {
        const response = await fetch('../src/data/quotes.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch quotes: ${response.status}`);
        }
        quotes = await response.json();
        // Initialize with a random quote once data is loaded
        displayQuote(getRandomQuote());
    } catch (error) {
        console.error('Error loading quotes:', error);
        quoteText.textContent = 'Failed to load quotes. Please try again later.';
    }
}

// Filter quotes by category
function getFilteredQuotes() {
    const selectedCategory = categorySelect.value;
    return selectedCategory === 'all' 
        ? quotes 
        : quotes.filter(quote => quote.category === selectedCategory);
}

// Get random quote
function getRandomQuote() {
    const filteredQuotes = getFilteredQuotes();
    if (filteredQuotes.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    return filteredQuotes[randomIndex];
}

// Display a quote
function displayQuote(quote) {
    if (!quote) {
        quoteText.textContent = 'No quotes found for this category.';
        quoteAuthor.textContent = '';
        return;
    }
    
    currentQuote = quote;
    
    // Add fade-out effect
    quoteText.classList.add('fade-out');
    quoteAuthor.classList.add('fade-out');
    
    // After a short delay, update content and fade back in
    setTimeout(() => {
        quoteText.textContent = quote.text;
        quoteAuthor.textContent = `— ${quote.author}`;
        
        quoteText.classList.remove('fade-out');
        quoteAuthor.classList.remove('fade-out');
        
        // Update share links
        updateShareLinks(quote);
    }, 300);
}

// Update social media share links
function updateShareLinks(quote) {
    const text = encodeURIComponent(`"${quote.text}" — ${quote.author}`);
    const url = encodeURIComponent(window.location.href);
    
    twitterShare.href = `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=quote,inspiration`;
    linkedinShare.href = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
}

// Copy quote to clipboard
function copyQuote() {
    if (!currentQuote) return;
    
    const textToCopy = `"${currentQuote.text}" — ${currentQuote.author}`;
    
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            // Visual feedback for copy success
            const originalText = copyQuoteBtn.innerHTML;
            copyQuoteBtn.innerHTML = '<i class="fas fa-check mr-1"></i> Copied!';
            
            setTimeout(() => {
                copyQuoteBtn.innerHTML = originalText;
            }, 2000);
        })
        .catch(err => {
            console.error('Could not copy text: ', err);
        });
}

// Event listeners
newQuoteBtn.addEventListener('click', () => displayQuote(getRandomQuote()));
copyQuoteBtn.addEventListener('click', copyQuote);
categorySelect.addEventListener('change', () => displayQuote(getRandomQuote()));

// Initialize by loading quotes
document.addEventListener('DOMContentLoaded', loadQuotes);