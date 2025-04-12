// Utility functions for color manipulation
function hexToHSL(hex) {
    let r = parseInt(hex.substr(1,2), 16) / 255;
    let g = parseInt(hex.substr(3,2), 16) / 255;
    let b = parseInt(hex.substr(5,2), 16) / 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function HSLToHex(h, s, l) {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c/2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Generate random color
function getRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}

// Generate harmony colors from base color
function generateHarmonyColors(baseColor) {
    const hsl = hexToHSL(baseColor);
    const colors = [];
    
    // Complementary
    colors.push(HSLToHex((hsl.h + 180) % 360, hsl.s, hsl.l));
    
    // Analogous
    colors.push(HSLToHex((hsl.h + 30) % 360, hsl.s, hsl.l));
    colors.push(HSLToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l));
    
    // Split Complementary
    colors.push(HSLToHex((hsl.h + 150) % 360, hsl.s, hsl.l));
    // colors.push(HSLToHex((hsl.h - 150 + 360) % 360, hsl.s, hsl.l));

    return colors;
}

// Create color box element
function createColorBox(color) {
    const div = document.createElement('div');
    div.className = 'color-box';
    div.setAttribute('data-color', color);
    
    div.innerHTML = `
        <div class="color-preview" style="background-color: ${color}"></div>
        <div class="color-info">
            <span class="color-hex">${color}</span>
            <div class="color-actions">
                <button class="copy-btn">Copy</button>
                <button class="analyze-btn" title="Analyze Color (Premium)">
                    <svg viewBox="0 0 24 24" width="14" height="14">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    
    return div;
}

// Update palette container
function updatePalette(colors) {
    const container = document.querySelector('.palette-container');
    container.innerHTML = '';
    
    colors.forEach(color => {
        container.appendChild(createColorBox(color));
    });
}

// Initialize design resources
function initializeDesignResources() {
    const resources = [
        { name: 'Unsplash', url: 'https://unsplash.com' },
        { name: 'Freepik', url: 'https://www.freepik.com' },
        { name: 'Behance', url: 'https://www.behance.net' },
        { name: 'Dribbble', url: 'https://dribbble.com' }
    ];

    const container = document.querySelector('.resource-links');
    resources.forEach(resource => {
        const link = document.createElement('a');
        link.href = resource.url;
        link.target = '_blank';
        link.textContent = resource.name;
        container.appendChild(link);
    });
}

// Premium features - Palette Storage and Management
const PremiumFeatures = {
    isPremium: localStorage.getItem('isPremium') === 'true',
    
    init() {
        // Initialize premium status from localStorage
        const premiumToggle = document.getElementById('premiumToggle');
        premiumToggle.checked = this.isPremium;
        
        // Add toggle event listener
        premiumToggle.addEventListener('change', (e) => {
            this.isPremium = e.target.checked;
            localStorage.setItem('isPremium', this.isPremium);
            this.updatePremiumUI();
            
            if (this.isPremium) {
                this.showSuccessMessage('Premium features activated! ✨');
            } else {
                this.showSuccessMessage('Premium features deactivated');
            }
        });

        // Load saved palettes
        const saved = localStorage.getItem('savedPalettes');
        this.savedPalettes = saved ? JSON.parse(saved) : [];
        
        // Initialize premium UI
        this.updatePremiumUI();
    },
    
    savePalette(name = null) {
        if (!this.isPremium) {
            this.showUpgradeModal();
            return;
        }
        
        const colors = Array.from(document.querySelectorAll('.color-box'))
            .map(box => box.getAttribute('data-color'));
            
        const palette = {
            id: Date.now(),
            name: name || `Palette ${this.savedPalettes.length + 1}`,
            colors,
            created: new Date().toISOString()
        };
        
        this.savedPalettes.push(palette);
        this.saveToBrowser();
        this.showSuccessMessage('Palette saved successfully!');
    },
    
    deletePalette(id) {
        if (!this.isPremium) {
            this.showUpgradeModal();
            return;
        }
        
        this.savedPalettes = this.savedPalettes.filter(p => p.id !== id);
        this.saveToBrowser();
        this.showSuccessMessage('Palette deleted!');
    },
    
    saveToBrowser() {
        localStorage.setItem('savedPalettes', JSON.stringify(this.savedPalettes));
    },
    
    showSavedPalettes() {
        if (!this.isPremium) {
            this.showUpgradeModal();
            return;
        }
        
        const modal = document.createElement('div');
        modal.className = 'saved-palettes-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Saved Palettes</h3>
                <div class="palettes-grid">
                    ${this.savedPalettes.map(palette => `
                        <div class="saved-palette" data-id="${palette.id}">
                            <h4>${palette.name}</h4>
                            <div class="color-strip">
                                ${palette.colors.map(color => 
                                    `<div class="color-preview" style="background-color: ${color}"></div>`
                                ).join('')}
                            </div>
                            <div class="palette-actions">
                                <button class="load-palette">Load</button>
                                <button class="delete-palette">Delete</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button class="close-modal">Close</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners for the modal
        modal.querySelector('.close-modal').onclick = () => modal.remove();
        
        modal.addEventListener('click', (e) => {
            const paletteEl = e.target.closest('.saved-palette');
            if (!paletteEl) return;
            
            const paletteId = parseInt(paletteEl.dataset.id);
            const palette = this.savedPalettes.find(p => p.id === paletteId);
            
            if (e.target.classList.contains('load-palette')) {
                updatePalette(palette.colors);
                modal.remove();
            } else if (e.target.classList.contains('delete-palette')) {
                this.deletePalette(paletteId);
                paletteEl.remove();
                if (!this.savedPalettes.length) {
                    modal.remove();
                }
            }
        });
    },
    
    showUpgradeModal() {
        const modal = document.createElement('div');
        modal.className = 'upgrade-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Upgrade to Premium</h3>
                <p>Get access to premium features:</p>
                <ul>
                    <li>✓ Save unlimited palettes</li>
                    <li>✓ Organize and manage your palettes</li>
                    <li>✓ Advanced color analysis</li>
                    <li>✓ Export in multiple formats</li>
                </ul>
                <button id="upgradeBtn" class="premium-btn">Upgrade Now</button>
                <button class="close-modal">Maybe Later</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.close-modal').onclick = () => modal.remove();
        modal.querySelector('#upgradeBtn').onclick = () => {
            // Implement upgrade flow here
            window.open('https://example.com/upgrade', '_blank');
            modal.remove();
        };
    },
    
    showSuccessMessage(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    },
    
    updatePremiumUI() {
        const savePaletteBtn = document.getElementById('savePalette');
        const viewSavedBtn = document.getElementById('viewSaved');
        const exportPaletteBtn = document.getElementById('exportPalette');
        
        if (this.isPremium) {
            savePaletteBtn.classList.add('premium-active');
            viewSavedBtn.classList.add('premium-active');
            exportPaletteBtn.classList.add('premium-active');
        }
    },

    exportPalette(format) {
        if (!this.isPremium) {
            this.showUpgradeModal();
            return;
        }
        
        const colors = Array.from(document.querySelectorAll('.color-box'))
            .map(box => box.getAttribute('data-color'));
        
        let output = '';
        const filename = `palette-${Date.now()}`;
        
        switch (format) {
            case 'css':
                output = `:root {\n${colors.map((c, i) => `    --color-${i + 1}: ${c};`).join('\n')}\n}`;
                this.downloadFile(`${filename}.css`, output);
                break;
                
            case 'scss':
                output = `${colors.map((c, i) => `$color-${i + 1}: ${c};`).join('\n')}`;
                this.downloadFile(`${filename}.scss`, output);
                break;
                
            case 'json':
                output = JSON.stringify({ colors }, null, 2);
                this.downloadFile(`${filename}.json`, output);
                break;
                
            case 'tailwind':
                const tailwindConfig = {
                    theme: {
                        extend: {
                            colors: {
                                palette: colors.reduce((acc, c, i) => {
                                    acc[`color-${i + 1}`] = c;
                                    return acc;
                                }, {})
                            }
                        }
                    }
                };
                output = JSON.stringify(tailwindConfig, null, 2);
                this.downloadFile('tailwind.config.json', output);
                break;
        }
    },
    
    downloadFile(filename, content) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        this.showSuccessMessage(`Exported as ${filename}`);
    },

    showExportModal() {
        if (!this.isPremium) {
            this.showUpgradeModal();
            return;
        }
        
        const modal = document.createElement('div');
        modal.className = 'export-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Export Palette</h3>
                <p>Choose export format:</p>
                <div class="export-buttons">
                    <button onclick="PremiumFeatures.exportPalette('css')">CSS Variables</button>
                    <button onclick="PremiumFeatures.exportPalette('scss')">SCSS Variables</button>
                    <button onclick="PremiumFeatures.exportPalette('json')">JSON</button>
                    <button onclick="PremiumFeatures.exportPalette('tailwind')">Tailwind Config</button>
                </div>
                <button class="close-modal">Close</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.querySelector('.close-modal').onclick = () => modal.remove();
    }
};

// Color Analysis Features
const ColorAnalysis = {
    // Basic color names mapping
    colorNames: {
        '#FF0000': 'Red',
        '#00FF00': 'Lime',
        '#0000FF': 'Blue',
        '#FFFF00': 'Yellow',
        '#FF00FF': 'Magenta',
        '#00FFFF': 'Cyan',
        '#000000': 'Black',
        '#FFFFFF': 'White',
        // Add more color mappings as needed
    },

    // Calculate relative luminance for contrast ratio
    getLuminance(r, g, b) {
        let [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    },

    // Calculate contrast ratio between two colors
    getContrastRatio(color1, color2) {
        const rgb1 = this.hexToRGB(color1);
        const rgb2 = this.hexToRGB(color2);
        
        const l1 = this.getLuminance(rgb1.r, rgb1.g, rgb1.b);
        const l2 = this.getLuminance(rgb2.r, rgb2.g, rgb2.b);
        
        const lighter = Math.max(l1, l2);
        const darker = Math.min(l1, l2);
        
        return (lighter + 0.05) / (darker + 0.05);
    },

    // Convert hex to RGB
    hexToRGB(hex) {
        const r = parseInt(hex.substr(1,2), 16);
        const g = parseInt(hex.substr(3,2), 16);
        const b = parseInt(hex.substr(5,2), 16);
        return { r, g, b };
    },

    // Get accessibility rating
    getAccessibilityRating(ratio) {
        if (ratio >= 7) return 'AAA';
        if (ratio >= 4.5) return 'AA';
        if (ratio >= 3) return 'Pass (Large Text)';
        return 'Fail';
    },

    // Generate shades and tints
    generateVariations(color) {
        const hsl = hexToHSL(color);
        const variations = [];
        
        // Generate 5 shades (darker)
        for (let i = 1; i <= 5; i++) {
            variations.push(HSLToHex(
                hsl.h,
                hsl.s,
                Math.max(0, hsl.l - i * 10)
            ));
        }
        
        // Generate 5 tints (lighter)
        for (let i = 1; i <= 5; i++) {
            variations.push(HSLToHex(
                hsl.h,
                Math.max(0, hsl.s - i * 10),
                Math.min(100, hsl.l + i * 10)
            ));
        }
        
        return variations;
    },

    // Analyze a color palette
    analyzePalette(colors) {
        const analysis = {
            colors: colors.map(color => ({
                hex: color,
                name: this.findClosestColorName(color),
                contrastWithWhite: this.getContrastRatio(color, '#FFFFFF'),
                contrastWithBlack: this.getContrastRatio(color, '#000000'),
                variations: this.generateVariations(color)
            })),
            accessibility: {}
        };

        // Analyze contrast ratios between all colors
        for (let i = 0; i < colors.length; i++) {
            for (let j = i + 1; j < colors.length; j++) {
                const ratio = this.getContrastRatio(colors[i], colors[j]);
                analysis.accessibility[`${colors[i]}_${colors[j]}`] = {
                    ratio: ratio.toFixed(2),
                    rating: this.getAccessibilityRating(ratio)
                };
            }
        }

        return analysis;
    },

    // Find the closest named color
    findClosestColorName(hex) {
        if (this.colorNames[hex.toUpperCase()]) {
            return this.colorNames[hex.toUpperCase()];
        }
        
        // Basic distance-based color name finding
        const rgb1 = this.hexToRGB(hex);
        let minDistance = Infinity;
        let closestName = 'Custom';
        
        Object.entries(this.colorNames).forEach(([nameHex, name]) => {
            const rgb2 = this.hexToRGB(nameHex);
            const distance = Math.sqrt(
                Math.pow(rgb1.r - rgb2.r, 2) +
                Math.pow(rgb1.g - rgb2.g, 2) +
                Math.pow(rgb1.b - rgb2.b, 2)
            );
            
            if (distance < minDistance) {
                minDistance = distance;
                closestName = name;
            }
        });
        
        return closestName;
    },

    // Show color analysis in modal
    showAnalysis(colors) {
        if (!PremiumFeatures.isPremium) {
            PremiumFeatures.showUpgradeModal();
            return;
        }

        const analysis = this.analyzePalette(colors);
        
        const modal = document.createElement('div');
        modal.className = 'color-analysis-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Color Analysis</h3>
                <div class="analysis-grid">
                    ${analysis.colors.map(color => `
                        <div class="color-analysis-card">
                            <div class="color-header" style="background-color: ${color.hex}"></div>
                            <div class="color-details">
                                <p><strong>Hex:</strong> ${color.hex}</p>
                                <p><strong>Name:</strong> ${color.name}</p>
                                <p><strong>Contrast Ratio:</strong></p>
                                <ul>
                                    <li>with White: ${color.contrastWithWhite.toFixed(2)} 
                                        (${this.getAccessibilityRating(color.contrastWithWhite)})</li>
                                    <li>with Black: ${color.contrastWithBlack.toFixed(2)}
                                        (${this.getAccessibilityRating(color.contrastWithBlack)})</li>
                                </ul>
                                <div class="variations-strip">
                                    ${color.variations.map(v => 
                                        `<div class="variation" style="background-color: ${v}" title="${v}"></div>`
                                    ).join('')}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button class="close-modal">Close</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.querySelector('.close-modal').onclick = () => modal.remove();
    }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const baseColorInput = document.getElementById('baseColor');
    const generateRandomBtn = document.getElementById('generateRandom');
    const generateHarmonyBtn = document.getElementById('generateHarmony');
    const savePaletteBtn = document.getElementById('savePalette');
    const viewSavedBtn = document.getElementById('viewSaved');

    // Initialize with random colors
    updatePalette([...Array(5)].map(() => getRandomColor()));
    
    // Initialize design resources
    initializeDesignResources();

    // Generate random palette
    generateRandomBtn.addEventListener('click', () => {
        updatePalette([...Array(5)].map(() => getRandomColor()));
    });

    // Generate harmony palette
    generateHarmonyBtn.addEventListener('click', () => {
        const baseColor = baseColorInput.value;
        const harmonyColors = generateHarmonyColors(baseColor);
        updatePalette([baseColor, ...harmonyColors]);
    });

    // Copy color to clipboard
    document.querySelector('.palette-container').addEventListener('click', (e) => {
        if (e.target.classList.contains('copy-btn')) {
            const color = e.target.closest('.color-box').getAttribute('data-color');
            navigator.clipboard.writeText(color).then(() => {
                const originalText = e.target.textContent;
                e.target.textContent = 'Copied!';
                setTimeout(() => {
                    e.target.textContent = originalText;
                }, 1500);
            });
        }
    });

    // Initialize premium features
    PremiumFeatures.init();

    // Premium feature buttons
    
    savePaletteBtn.addEventListener('click', () => {
        PremiumFeatures.savePalette();
    });

    viewSavedBtn.addEventListener('click', () => {
        PremiumFeatures.showSavedPalettes();
    });

    exportPaletteBtn.addEventListener('click', () => {
        PremiumFeatures.showExportModal();
    });

    // Update premium UI
    PremiumFeatures.updatePremiumUI = function() {
        if (this.isPremium) {
            savePaletteBtn.classList.add('premium-active');
            viewSavedBtn.classList.add('premium-active');
            exportPaletteBtn.classList.add('premium-active');
        } else {
            savePaletteBtn.classList.remove('premium-active');
            viewSavedBtn.classList.remove('premium-active');
            exportPaletteBtn.classList.remove('premium-active');
        }
    };

    // Initial UI update
    PremiumFeatures.updatePremiumUI();

    // Add analyze color functionality
    document.querySelector('.palette-container').addEventListener('click', (e) => {
        if (e.target.closest('.analyze-btn')) {
            const colors = Array.from(document.querySelectorAll('.color-box'))
                .map(box => box.getAttribute('data-color'));
            ColorAnalysis.showAnalysis(colors);
        }
    });

    // Add export button to premium features section
    const premiumFeatures = document.querySelector('.premium-features');
    const exportBtn = document.createElement('button');
    exportBtn.id = 'exportPalette';
    exportBtn.className = 'premium-btn';
    exportBtn.textContent = 'Export Palette';
    premiumFeatures.insertBefore(exportBtn, viewSavedBtn.nextSibling);
    
    // Export button event listener
    exportBtn.addEventListener('click', () => {
        PremiumFeatures.showExportModal();
    });
    
    // Update premium UI function to include export button
    PremiumFeatures.updatePremiumUI = function() {
        const savePaletteBtn = document.getElementById('savePalette');
        const viewSavedBtn = document.getElementById('viewSaved');
        const exportPaletteBtn = document.getElementById('exportPalette');
        
        if (this.isPremium) {
            savePaletteBtn.classList.add('premium-active');
            viewSavedBtn.classList.add('premium-active');
            exportPaletteBtn.classList.add('premium-active');
        }
    };
});