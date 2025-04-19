import { fabric } from 'fabric';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables
    let canvas = null;
    let currentImageUrl = null;
    let textAlignment = 'center';
    let generatedQuotes = [];

    // DOM elements
    const quoteText = document.getElementById('quote-text');
    const authorInput = document.getElementById('author');
    const backgroundSelect = document.getElementById('background-select');
    const backgroundColorInput = document.getElementById('background-color');
    const fontSelect = document.getElementById('font-select');
    const fontColorInput = document.getElementById('font-color');
    const fontSizeInput = document.getElementById('font-size');
    const textAlignButtons = document.querySelectorAll('.text-align-btn');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const galleryContainer = document.getElementById('gallery');
    const emptyGalleryMessage = document.getElementById('empty-gallery-message');
    const canvasContainer = document.getElementById('canvas-container');
    const quoteCanvas = document.getElementById('quote-canvas');

    // Background images
    const backgroundImages = {
        bg1: '/backgrounds/nature.jpg',
        bg2: '/backgrounds/abstract.jpg', 
        bg3: '/backgrounds/gradient.jpg',
        bg4: '/backgrounds/minimalist.jpg'
    };

    // Initialize canvas
    initializeCanvas();

    // Add event listeners
    setupEventListeners();

    // Load saved quotes from localStorage
    loadSavedQuotes();

    // Initialize Fabric.js canvas
    function initializeCanvas() {
        // Set canvas dimensions based on container
        const containerWidth = canvasContainer.clientWidth;
        const aspectRatio = 1; // Square canvas
        const canvasSize = Math.min(containerWidth, 800);
        
        // Initialize Fabric.js canvas
        canvas = new fabric.Canvas('quote-canvas', {
            width: canvasSize,
            height: canvasSize,
            backgroundColor: backgroundColorInput.value
        });
        
        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            resizeCanvas();
        });
        
        resizeCanvas();
    }
    
    // Resize canvas to fit container while maintaining aspect ratio
    function resizeCanvas() {
        const containerWidth = canvasContainer.clientWidth;
        const canvasSize = Math.min(containerWidth, 800);
        
        canvas.setDimensions({
            width: canvasSize,
            height: canvasSize
        });
        
        canvas.renderAll();
    }

    // Set up event listeners for all controls
    function setupEventListeners() {
        // Background select change
        backgroundSelect.addEventListener('change', () => {
            const selectedOption = backgroundSelect.value;
            
            // Show/hide color picker based on selection
            if (selectedOption === 'color') {
                document.getElementById('color-picker-container').style.display = 'block';
            } else {
                document.getElementById('color-picker-container').style.display = 'none';
            }
        });
        
        // Text alignment buttons
        textAlignButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Remove active class from all buttons
                textAlignButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                e.target.classList.add('active');
                // Update alignment variable
                textAlignment = e.target.getAttribute('data-align');
            });
        });
        
        // Generate button
        generateBtn.addEventListener('click', generateQuoteImage);
        
        // Download button
        downloadBtn.addEventListener('click', downloadQuoteImage);
    }

    // Generate quote image
    async function generateQuoteImage() {
        const quote = quoteText.value.trim();
        const author = authorInput.value.trim();
        
        if (!quote) {
            alert('Please enter a quote');
            return;
        }
        
        // Clear canvas
        canvas.clear();
        
        // Set background
        await setCanvasBackground();
        
        // Add quote text
        addQuoteText(quote, author);
        
        // Enable download button
        downloadBtn.disabled = false;
    }
    
    // Set canvas background (color or image)
    async function setCanvasBackground() {
        return new Promise((resolve) => {
            const backgroundType = backgroundSelect.value;
            
            if (backgroundType === 'color') {
                // Set solid color background
                canvas.backgroundColor = backgroundColorInput.value;
                canvas.renderAll();
                resolve();
            } else {
                // Load background image
                const imgPath = backgroundImages[backgroundType];
                
                fabric.Image.fromURL(imgPath, (img) => {
                    // Scale image to fill canvas
                    const canvasWidth = canvas.width;
                    const canvasHeight = canvas.height;
                    
                    const scaleX = canvasWidth / img.width;
                    const scaleY = canvasHeight / img.height;
                    const scale = Math.max(scaleX, scaleY);
                    
                    img.set({
                        scaleX: scale,
                        scaleY: scale,
                        originX: 'center',
                        originY: 'center',
                        left: canvasWidth / 2,
                        top: canvasHeight / 2
                    });
                    
                    // Make sure image covers entire canvas
                    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
                    resolve();
                }, { crossOrigin: 'Anonymous' });
            }
        });
    }
    
    // Add quote text to canvas
    function addQuoteText(quote, author) {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const padding = canvasWidth * 0.1; // 10% padding
        const maxWidth = canvasWidth - (padding * 2);
        
        const fontSize = parseInt(fontSizeInput.value);
        const fontFamily = fontSelect.value;
        const fontColor = fontColorInput.value;
        
        // Create quote text
        const quoteTextObj = new fabric.Textbox(quote, {
            width: maxWidth,
            fontSize: fontSize,
            fontFamily: fontFamily,
            fill: fontColor,
            textAlign: textAlignment,
            originX: 'center',
            originY: 'center',
            left: canvasWidth / 2,
            top: (canvasHeight / 2) - (author ? fontSize : 0)
        });
        
        // Add quote to canvas
        canvas.add(quoteTextObj);
        
        // Add author if provided
        if (author) {
            const authorTextObj = new fabric.Textbox(`— ${author}`, {
                width: maxWidth,
                fontSize: fontSize * 0.6, // Author text is smaller
                fontFamily: fontFamily,
                fill: fontColor,
                textAlign: textAlignment,
                originX: 'center',
                originY: 'center',
                left: canvasWidth / 2,
                top: (canvasHeight / 2) + fontSize * 1.5
            });
            
            canvas.add(authorTextObj);
        }
        
        canvas.renderAll();
        
        // Save to gallery
        saveToGallery();
    }
    
    // Download quote image
    function downloadQuoteImage() {
        // Convert canvas to data URL
        const dataURL = canvas.toDataURL({
            format: 'png',
            quality: 1
        });
        
        // Create download link
        const link = document.createElement('a');
        link.download = 'quote-image.png';
        link.href = dataURL;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    // Save to gallery
    function saveToGallery() {
        const dataURL = canvas.toDataURL({
            format: 'png',
            quality: 0.8
        });
        
        const quote = quoteText.value.trim();
        const author = authorInput.value.trim();
        
        const quoteObj = {
            id: Date.now(),
            quote,
            author,
            dataURL,
            timestamp: new Date().toISOString()
        };
        
        // Add to generated quotes array
        generatedQuotes.unshift(quoteObj); // Add to beginning of array
        
        // Limit gallery to 12 items
        if (generatedQuotes.length > 12) {
            generatedQuotes.pop();
        }
        
        // Save to localStorage
        localStorage.setItem('quotify-gallery', JSON.stringify(generatedQuotes));
        
        // Update gallery display
        updateGalleryDisplay();
    }
    
    // Load saved quotes from localStorage
    function loadSavedQuotes() {
        const savedQuotes = localStorage.getItem('quotify-gallery');
        
        if (savedQuotes) {
            generatedQuotes = JSON.parse(savedQuotes);
            updateGalleryDisplay();
        }
    }
    
    // Update gallery display
    function updateGalleryDisplay() {
        // Clear gallery
        galleryContainer.innerHTML = '';
        
        // Hide/show empty gallery message
        if (generatedQuotes.length === 0) {
            emptyGalleryMessage.style.display = 'block';
        } else {
            emptyGalleryMessage.style.display = 'none';
            
            // Add quotes to gallery
            generatedQuotes.forEach(quoteObj => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                
                const img = document.createElement('img');
                img.src = quoteObj.dataURL;
                img.alt = quoteObj.quote;
                
                const overlay = document.createElement('div');
                overlay.className = 'overlay';
                overlay.textContent = quoteObj.quote.substring(0, 50) + (quoteObj.quote.length > 50 ? '...' : '');
                
                galleryItem.appendChild(img);
                galleryItem.appendChild(overlay);
                
                // Add click event to reload this quote
                galleryItem.addEventListener('click', () => {
                    quoteText.value = quoteObj.quote;
                    authorInput.value = quoteObj.author || '';
                    generateBtn.click();
                });
                
                galleryContainer.appendChild(galleryItem);
            });
        }
    }
});