/**
 * Main Application Script
 * Initializes and coordinates the Unit Converter application
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the UI
    UI.init();
    
    // Try to fetch currency rates on startup
    if (currencyConverter.shouldUpdateRates()) {
        currencyConverter.fetchRates();
    }
    
    // Add service worker for PWA capabilities
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.error('Service Worker registration failed:', err));
    }
    
    // Check if the app is running as PWA
    const isPWA = window.matchMedia('(display-mode: standalone)').matches || 
                 window.navigator.standalone === true;
    
    // Store conversion history in localStorage
    function saveToHistory(fromValue, fromUnit, toValue, toUnit, category) {
        const historyItem = {
            fromValue,
            fromUnit, 
            toValue,
            toUnit,
            category,
            timestamp: new Date().getTime()
        };
        
        let history = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
        
        // Limit history to 10 items
        if (history.length >= 10) {
            history.pop(); // Remove oldest item
        }
        
        history.unshift(historyItem); // Add new item at beginning
        localStorage.setItem('conversionHistory', JSON.stringify(history));
    }
    
    // Add input event listener to save history
    document.getElementById('source-value').addEventListener('change', function() {
        const fromValue = this.value;
        const fromUnit = document.getElementById('source-unit').value;
        const toValue = document.getElementById('target-value').value;
        const toUnit = document.getElementById('target-unit').value;
        
        if (fromValue && toValue) {
            saveToHistory(
                fromValue, 
                fromUnit, 
                toValue, 
                toUnit, 
                UI.state.currentCategory
            );
        }
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+C or Cmd+C to copy result
        if ((e.ctrlKey || e.metaKey) && e.key === 'c' && document.activeElement !== document.getElementById('source-value')) {
            e.preventDefault();
            UI.copyResult();
        }
        
        // Escape to clear inputs
        if (e.key === 'Escape') {
            UI.clearInputs();
        }
    });
});