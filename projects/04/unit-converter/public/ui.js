/**
 * UI Handler Module
 * Handles all user interface interactions for the Unit Converter
 */

const UI = {
    // DOM Elements
    elements: {
        sourceValue: document.getElementById('source-value'),
        targetValue: document.getElementById('target-value'),
        sourceUnit: document.getElementById('source-unit'),
        targetUnit: document.getElementById('target-unit'),
        categoryButtons: document.querySelectorAll('.category-btn'),
        swapButton: document.querySelector('.swap-btn'),
        copyButton: document.getElementById('copy-btn'),
        clearButton: document.getElementById('clear-btn'),
        alertBox: document.getElementById('alert'),
        alertMessage: document.getElementById('alert-message'),
        closeAlert: document.querySelector('.close-alert'),
        proVersion: document.getElementById('pro-version')
    },

    // Current state
    state: {
        currentCategory: 'length',
        currentConverter: lengthConverter
    },

    // Initialize the UI
    init: function() {
        this.bindEvents();
        this.loadCategory('length');
    },

    // Bind event listeners
    bindEvents: function() {
        const self = this;

        // Category buttons
        this.elements.categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.dataset.category;
                self.loadCategory(category);
                
                // Update active button
                self.elements.categoryButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
            });
        });

        // Source value input
        this.elements.sourceValue.addEventListener('input', () => {
            this.updateConversion();
        });

        // Unit selectors
        this.elements.sourceUnit.addEventListener('change', () => {
            this.updateConversion();
        });
        
        this.elements.targetUnit.addEventListener('change', () => {
            this.updateConversion();
        });

        // Swap button
        this.elements.swapButton.addEventListener('click', () => {
            this.swapUnits();
        });

        // Copy button
        this.elements.copyButton.addEventListener('click', () => {
            this.copyResult();
        });

        // Clear button
        this.elements.clearButton.addEventListener('click', () => {
            this.clearInputs();
        });

        // Close alert
        this.elements.closeAlert.addEventListener('click', () => {
            this.hideAlert();
        });

        // Pro version link
        this.elements.proVersion.addEventListener('click', (e) => {
            e.preventDefault();
            this.showAlert('Pro version coming soon!');
        });
    },

    // Load a specific category
    loadCategory: function(category) {
        this.state.currentCategory = category;
        
        // Set the current converter based on the category
        switch (category) {
            case 'length':
                this.state.currentConverter = lengthConverter;
                break;
            case 'weight':
                this.state.currentConverter = weightConverter;
                break;
            case 'temperature':
                this.state.currentConverter = temperatureConverter;
                break;
            case 'currency':
                this.state.currentConverter = currencyConverter;
                
                // Try to fetch latest currency rates if needed
                if (currencyConverter.shouldUpdateRates()) {
                    currencyConverter.fetchRates()
                        .then(success => {
                            if (success) {
                                this.showAlert('Currency rates updated successfully!');
                                this.updateConversion();
                            }
                        });
                }
                break;
            default:
                this.state.currentConverter = lengthConverter;
        }

        // Update the units in dropdowns
        this.populateUnitDropdowns();
        
        // Clear inputs when changing category
        this.clearInputs();
    },

    // Populate unit dropdown menus based on current category
    populateUnitDropdowns: function() {
        const units = this.state.currentConverter.units;
        
        // Clear existing options
        this.elements.sourceUnit.innerHTML = '';
        this.elements.targetUnit.innerHTML = '';
        
        // Add new options
        units.forEach((unit, index) => {
            const sourceOption = document.createElement('option');
            sourceOption.value = unit.id;
            sourceOption.textContent = unit.name;
            this.elements.sourceUnit.appendChild(sourceOption);
            
            const targetOption = document.createElement('option');
            targetOption.value = unit.id;
            targetOption.textContent = unit.name;
            this.elements.targetUnit.appendChild(targetOption);
            
            // Select second unit by default for target (or first if only one unit)
            if (index === 1 || (units.length === 1 && index === 0)) {
                targetOption.selected = true;
            }
        });
    },

    // Update the conversion result
    updateConversion: function() {
        const sourceValue = this.elements.sourceValue.value;
        const sourceUnit = this.elements.sourceUnit.value;
        const targetUnit = this.elements.targetUnit.value;
        
        if (sourceValue && sourceUnit && targetUnit) {
            const result = this.state.currentConverter.convert(sourceValue, sourceUnit, targetUnit);
            this.elements.targetValue.value = result;
        } else {
            this.elements.targetValue.value = '';
        }
    },

    // Swap source and target units
    swapUnits: function() {
        const tempUnit = this.elements.sourceUnit.value;
        this.elements.sourceUnit.value = this.elements.targetUnit.value;
        this.elements.targetUnit.value = tempUnit;
        
        // Swap values too if target has a value
        if (this.elements.targetValue.value) {
            const tempValue = this.elements.sourceValue.value;
            this.elements.sourceValue.value = this.elements.targetValue.value;
            this.updateConversion(); // Recalculate
        } else {
            this.updateConversion();
        }
    },

    // Copy result to clipboard
    copyResult: function() {
        const result = this.elements.targetValue.value;
        if (result) {
            navigator.clipboard.writeText(result)
                .then(() => {
                    this.showAlert('Result copied to clipboard!');
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                    this.showAlert('Failed to copy text', true);
                });
        }
    },

    // Clear all inputs
    clearInputs: function() {
        this.elements.sourceValue.value = '';
        this.elements.targetValue.value = '';
        this.elements.sourceValue.focus();
    },

    // Show alert message
    showAlert: function(message, isError = false) {
        this.elements.alertMessage.textContent = message;
        this.elements.alertBox.style.display = 'flex';
        
        if (isError) {
            this.elements.alertBox.classList.add('error');
        } else {
            this.elements.alertBox.classList.remove('error');
        }
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            this.hideAlert();
        }, 3000);
    },

    // Hide alert message
    hideAlert: function() {
        this.elements.alertBox.style.display = 'none';
    }
};